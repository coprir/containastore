'use client';

import { setConsent } from '@/lib/consent';
import { useConsent } from '@/lib/useConsent';

export function CookieSettings() {
  const consent = useConsent();

  return (
    <div className="rounded border border-line-strong bg-panel p-5">
      <p className="font-heading font-bold text-paper">Your current choice</p>
      <p className="mt-1 text-sm text-muted">
        {consent === 'accepted'
          ? 'You have accepted non-essential content. The contact-page map will load.'
          : consent === 'declined'
            ? 'You have declined non-essential content. The map is not loaded; the address is shown as text.'
            : 'You have not made a choice yet.'}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setConsent('accepted')}
          aria-pressed={consent === 'accepted'}
          className={`rounded border px-4 py-2 text-sm font-bold ${
            consent === 'accepted'
              ? 'border-accent-strong bg-accent-strong text-ink'
              : 'border-line-strong text-paper hover:bg-panel-2'
          }`}
        >
          Accept non-essential
        </button>
        <button
          type="button"
          onClick={() => setConsent('declined')}
          aria-pressed={consent === 'declined'}
          className={`rounded border px-4 py-2 text-sm font-bold ${
            consent === 'declined'
              ? 'border-accent-strong bg-accent-strong text-ink'
              : 'border-line-strong text-paper hover:bg-panel-2'
          }`}
        >
          Decline non-essential
        </button>
      </div>
    </div>
  );
}
