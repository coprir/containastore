'use client';

import Link from 'next/link';
import { useState } from 'react';
import { setConsent } from '@/lib/consent';
import { useConsent } from '@/lib/useConsent';

interface MapConsentProps {
  /** OpenStreetMap bbox embed src. */
  embedSrc: string;
  linkHref: string;
  addressLines: string[];
}

export function MapConsent({ embedSrc, linkHref, addressLines }: MapConsentProps) {
  const consent = useConsent();
  const [loadOnce, setLoadOnce] = useState(false);
  const show = consent === 'accepted' || loadOnce;

  return (
    <div className="overflow-hidden rounded border border-line">
      {show ? (
        <iframe
          title="Map showing the location of Containastore near Inkberrow"
          src={embedSrc}
          loading="lazy"
          className="h-[320px] w-full border-0"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="bg-panel p-6">
          <p className="font-heading font-bold text-paper">Map not loaded</p>
          <p className="mt-2 text-sm text-muted">
            The map comes from OpenStreetMap. Loading it shares your IP address
            with OpenStreetMap. You can load it just this once, or accept
            non-essential content so it always loads.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setLoadOnce(true)}
              className="rounded border border-line-strong px-4 py-2 text-sm font-bold text-paper hover:bg-panel-2"
            >
              Load map once
            </button>
            <button
              type="button"
              onClick={() => setConsent('accepted')}
              className="rounded border border-accent-strong bg-accent-strong px-4 py-2 text-sm font-bold text-ink hover:bg-accent"
            >
              Accept &amp; always load
            </button>
            <a
              href={linkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-line-strong px-4 py-2 text-sm font-bold text-paper hover:bg-panel-2"
            >
              Open in OpenStreetMap
            </a>
          </div>
          <address className="mt-5 not-italic font-mono text-sm text-paper">
            {addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-3 text-xs text-muted">
            You can change this any time on the{' '}
            <Link href="/cookies" className="underline hover:text-paper">
              cookie policy
            </Link>{' '}
            page.
          </p>
        </div>
      )}
    </div>
  );
}
