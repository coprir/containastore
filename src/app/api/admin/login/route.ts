import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, createToken, cookieMaxAge } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !secret) {
    return NextResponse.json({ ok: false, message: 'Admin not configured.' }, { status: 404 });
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  if (!body.password || body.password !== password) {
    return NextResponse.json({ ok: false, message: 'Incorrect password.' }, { status: 401 });
  }

  const token = await createToken(secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: cookieMaxAge,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
