import type { Metadata } from 'next';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { LogoMark } from '@/components/ui/Logo';

export const metadata: Metadata = {
  title: 'Page not found | Containastore',
  description: 'That page does not exist, or it has moved.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink">
      <header className="border-b border-line">
        <div className="corrugated-strong h-1 w-full opacity-70" aria-hidden="true" />
        <div className="container-x py-3">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Containastore home">
            <LogoMark className="h-7 w-auto shrink-0" />
            <span className="flex flex-col leading-none">
              <span className="font-heading text-lg font-extrabold tracking-tight text-paper">
                CONTAINASTORE
              </span>
              <span className="stencil text-[10px] text-accent">Self Access Storage</span>
            </span>
          </Link>
        </div>
      </header>

      <div className="container-x py-20">
        <div className="mx-auto max-w-xl text-center">
          <p className="stencil text-xs text-accent">Error · 404</p>
          <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">Page not found</h1>
          <p className="mt-4 text-muted">
            That page does not exist, or it has moved. Here is where most people
            are heading:
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/storage" variant="primary">
              Sizes &amp; prices
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact us
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-muted">
            Or go back to the{' '}
            <Link href="/" className="underline hover:text-paper">
              home page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
