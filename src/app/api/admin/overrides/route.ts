import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, verifyToken } from '@/lib/adminAuth';
import { readOverrides, writeOverrides, type ContentOverrides } from '@/lib/content';

export const runtime = 'nodejs';

async function requireAdmin(): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  return verifyToken(token, secret);
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true, overrides: await readOverrides() });
}

export async function PUT(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let body: ContentOverrides;
  try {
    body = (await request.json()) as ContentOverrides;
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid JSON.' }, { status: 400 });
  }

  try {
    await writeOverrides(body);
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'Could not write the overrides file. On a read-only host (e.g. Vercel) admin edits must be committed to the repo instead — see README.',
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
