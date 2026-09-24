'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { SiteContent } from '@content/site';
import { LogoMark } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/storage', label: 'Our storage' },
  { href: '/about', label: 'About us' },
  { href: '/faq', label: 'FAQ' },
  { href: '/hints-and-tips', label: 'Hints & tips' },
  { href: '/contact', label: 'Contact' },
];

export function Header({ site, email }: { site: SiteContent; email: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="border-b border-black/40 bg-band text-on-band">
      <div className="container-x grid items-center gap-x-6 gap-y-3 py-4 lg:grid-cols-[auto_1fr_auto]">
        {/* Logo on a white plate, as in the client's design */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            aria-label="Containastore home"
            className="block rounded-sm bg-white p-1.5"
          >
            <LogoMark className="h-10 w-auto sm:h-14 lg:h-[72px]" />
          </Link>
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle className="inline-flex" />
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-on-band/60"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Centre: the big name, then the nav pills */}
        <div className="text-center">
          <Link href="/" className="block" aria-label="Containastore Self Access Storage - home">
            <span className="block font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl xl:text-5xl">
              Containastore Self Access Storage
            </span>
          </Link>
          <nav aria-label="Primary" className="mt-3 hidden lg:block">
            <ul className="flex flex-wrap items-center justify-center gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className="nav-pill text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Right: phone + email (+ theme toggle on desktop) */}
        <div className="hidden text-center font-heading text-lg font-semibold lg:block lg:text-right">
          <a href={site.phone.href} className="block text-2xl hover:underline">
            {site.phone.display}
          </a>
          <a href={`mailto:${email}`} className="mt-2 block text-base hover:underline">
            {email}
          </a>
          <div className="mt-3 flex justify-end">
            <ThemeToggle className="inline-flex" />
          </div>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-on-band/25 lg:hidden">
          <ul className="container-x flex flex-col gap-2 py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className="nav-pill block text-center"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 text-center font-heading font-semibold">
              <a href={site.phone.href} className="block text-xl">{site.phone.display}</a>
              <a href={`mailto:${email}`} className="mt-1 block break-all text-sm">{email}</a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
