'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { SiteContent } from '@content/site';
import { LogoMark } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';

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

      {/* Utility row — nav, phone, toggle, CTA. Kept slim on purpose so the
          brand row below can be the one dominant, unmissable element. */}
      <div className="container-x flex items-center justify-between gap-2 py-2 text-sm">
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`rounded px-2 py-1.5 transition-colors hover:bg-panel-2 xl:px-3 ${
                    isActive(item.href) ? 'text-paper underline underline-offset-4' : 'text-muted'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <span className="stencil text-[10px] text-muted lg:hidden">Self Access Storage</span>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.phone.href}
            className="hidden font-mono font-semibold text-paper hover:text-accent lg:inline"
          >
            {site.phone.display}
          </a>
          <Link
            href="/contact"
            className="glow-accent hidden rounded border border-accent-strong bg-accent-strong px-4 py-1.5 font-bold text-ink hover:bg-accent lg:inline-block"
          >
            Enquire
          </Link>

          <ThemeToggle className="hidden sm:inline-flex" />

          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-line-strong lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Brand row — big and centred, per client request. This is the row
          that's meant to read from across the room. */}
      <div className="border-t border-line py-3 sm:py-4">
        <Link
          href="/"
          className="container-x flex flex-col items-center justify-center gap-1.5 text-center sm:flex-row sm:gap-4"
          aria-label="Containastore home"
        >
          <LogoMark className="h-10 w-auto shrink-0 sm:h-14 lg:h-16" />
          <span className="flex flex-col items-center leading-none sm:items-start">
            <span className="font-heading text-3xl font-extrabold tracking-tight text-paper sm:text-4xl lg:text-5xl">
              CONTAINASTORE
            </span>
            <span className="stencil mt-1 hidden text-xs text-accent sm:block">
              Self Access Storage
            </span>
          </span>
        </Link>
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
            <li className="mt-2 flex items-center justify-between gap-3 px-3 py-3 sm:hidden">
              <span className="text-sm text-muted">Light / dark mode</span>
              <ThemeToggle className="inline-flex" />
            </li>
            <li className="flex items-center gap-3 px-3 py-3">
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
