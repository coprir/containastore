import { NextResponse } from 'next/server';
import { validateEnquiry, hasErrors, type EnquiryInput } from '@/lib/validation';
import { env, formConfigured } from '@/lib/env';

export const runtime = 'nodejs';

// Very small in-memory rate limit (per warm instance). Not a substitute for a
// real WAF, but stops trivial hammering.
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: 'Too many attempts. Please wait a minute and try again.' },
      { status: 429 },
    );
  }

  let body: Partial<EnquiryInput>;
  try {
    body = (await request.json()) as Partial<EnquiryInput>;
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: a filled "company" field means a bot. Pretend success, send nothing.
  if (body.company && body.company.trim() !== '') {
    return NextResponse.json({ ok: true, delivery: 'sent' });
  }

  const errors = validateEnquiry(body);
  if (hasErrors(errors)) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const payload = {
    name: body.name!.trim(),
    email: body.email!.trim(),
    phone: body.phone?.trim() || '',
    size: body.size?.trim() || '',
    startDate: body.startDate?.trim() || '',
    message: body.message!.trim(),
    submittedAt: new Date().toISOString(),
    sourceIp: ip,
  };

  // No endpoint configured → honest fallback. Input is validated; nothing is sent.
  if (!formConfigured) {
    return NextResponse.json({ ok: true, delivery: 'not-configured' });
  }

  try {
    const res = await fetch(env.form.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(env.form.token ? { 'x-form-token': env.form.token } : {}),
      },
      body: JSON.stringify({
        _recipient: env.form.recipient,
        _subject: `Containastore enquiry — ${payload.name}`,
        ...payload,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        {
          ok: false,
          message:
            'We could not send your enquiry just now. Please call or email us — details are on this page.',
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivery: 'sent' });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          'We could not reach our mail service. Please call or email us — details are on this page.',
      },
      { status: 502 },
    );
  }
}
