'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { SiteContent } from '@content/site';
import { LogoMark } from '@/components/ui/Logo';

const nav = [
  { href: '/storage', label: 'Storage & prices' },
  { href: '/conversions', label: 'Conversions' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/hints-and-tips', label: 'Hints & tips' },
  { href: '/contact', label: 'Contact' },
];

export function Header({ site }: { site: SiteContent }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur">
      <div className="corrugated-strong h-1 w-full opacity-70" aria-hidden="true" />
      <div className="container-x flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Containastore home">
          <LogoMark className="h-7 w-auto shrink-0" />
          <span className="flex flex-col leading-none">
            <span className="font-heading text-lg font-extrabold tracking-tight text-paper">
              CONTAINASTORE
            </span>
            <span className="stencil text-[10px] text-accent">Self Access Storage</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`rounded px-3 py-2 text-sm transition-colors hover:bg-panel-2 ${
                    isActive(item.href) ? 'text-paper underline underline-offset-4' : 'text-muted'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.phone.href}
            className="font-mono text-sm font-semibold text-paper hover:text-accent"
          >
            {site.phone.display}
          </a>
          <Link
            href="/contact"
            className="rounded border border-accent-strong bg-accent-strong px-4 py-2 text-sm font-bold text-ink hover:bg-accent"
          >
            Enquire
          </Link>
        </div>

        <button
          type="button"
          className="rounded border border-line-strong px-3 py-2 text-sm lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-line bg-steel lg:hidden"
        >
          <ul className="container-x flex flex-col py-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className={`block rounded px-3 py-3 ${
                    isActive(item.href) ? 'text-paper' : 'text-muted'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex items-center gap-3 px-3 py-3">
              <a href={site.phone.href} className="font-mono font-semibold text-paper">
                {site.phone.display}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
