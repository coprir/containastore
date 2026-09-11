/**
 * Tiny signed-cookie auth for the /admin area. Not a full identity system —
 * a single shared password (ADMIN_PASSWORD) plus an HMAC-signed session cookie
 * (ADMIN_SESSION_SECRET). Edge-compatible (Web Crypto only), so middleware and
 * route handlers share it.
 */

export const ADMIN_COOKIE = 'containastore_admin';
const TTL_SECONDS = 60 * 60 * 8; // 8 hours

const enc = new TextEncoder();

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return Buffer.from(new Uint8Array(sig)).toString('base64url');
}

export async function createToken(secret: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + TTL_SECONDS;
  const payload = `admin.${exp}`;
  const sig = await hmac(secret, payload);
  return `${payload}.${sig}`;
}

export async function verifyToken(
  token: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!token || !secret) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [role, expStr, sig] = parts;
  if (role !== 'admin') return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const expected = await hmac(secret, `${role}.${expStr}`);
  // constant-time-ish compare
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i += 1) {
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  return diff === 0;
}

export const cookieMaxAge = TTL_SECONDS;
