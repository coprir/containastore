import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_COOKIE, verifyToken } from '@/lib/adminAuth';

export const config = {
  matcher: ['/admin/:path*'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Login page and its assets are always reachable.
  if (pathname === '/admin/login') return NextResponse.next();

  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  // Admin disabled entirely unless both are configured.
  if (!password || !secret) {
    return new NextResponse('Admin is not configured on this deployment.', {
      status: 404,
    });
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (await verifyToken(token, secret)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/admin/login';
  url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}
