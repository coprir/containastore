'use client';

/**
 * Minimal cookie-consent store. One decision: accept or decline non-essential
 * content (currently just the OpenStreetMap embed on the contact page).
 *
 * Persisted in a first-party cookie AND localStorage. No third-party script or
 * embed may read this and load itself — components check `useConsent()` first.
 */

export type ConsentValue = 'accepted' | 'declined' | 'unset';

export const CONSENT_COOKIE = 'containastore_cookie_consent';
const MAX_AGE = 60 * 60 * 24 * 365; // 12 months
const EVENT = 'containastore:consent';

export function readConsent(): ConsentValue {
  if (typeof document === 'undefined') return 'unset';
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`));
  const value = match?.split('=')[1];
  if (value === 'accepted' || value === 'declined') return value;
  try {
    const ls = localStorage.getItem(CONSENT_COOKIE);
    if (ls === 'accepted' || ls === 'declined') return ls;
  } catch {
    /* ignore */
  }
  return 'unset';
}

export function setConsent(value: Exclude<ConsentValue, 'unset'>): void {
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
  try {
    localStorage.setItem(CONSENT_COOKIE, value);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
}

export function onConsentChange(cb: (value: ConsentValue) => void): () => void {
  const handler = () => cb(readConsent());
  window.addEventListener(EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}
