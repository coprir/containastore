'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readConsent, setConsent } from '@/lib/consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readConsent() === 'unset');
  }, []);

  if (!visible) return null;

  const choose = (value: 'accepted' | 'declined') => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-line-strong bg-steel"
    >
      <div className="container-x flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl text-sm">
          <p id="cookie-consent-title" className="font-heading font-bold text-paper">
            Cookies on this site
          </p>
          <p className="mt-1 text-muted">
            We use one essential cookie to remember this choice. We only load the
            map on our contact page (from OpenStreetMap) if you accept — declining
            changes nothing else about how the site works. See our{' '}
            <Link href="/cookies" className="underline hover:text-paper">
              cookie policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose('declined')}
            className="rounded border border-line-strong px-4 py-2 text-sm font-bold text-paper hover:bg-panel-2"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="rounded border border-accent-strong bg-accent-strong px-4 py-2 text-sm font-bold text-ink hover:bg-accent"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
