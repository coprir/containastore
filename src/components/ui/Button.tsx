import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded px-5 py-3 text-sm font-heading font-bold transition-colors';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent-strong text-ink hover:bg-accent border border-accent-strong',
  secondary:
    'bg-transparent text-paper border border-line-strong hover:bg-panel-2',
  ghost: 'bg-transparent text-accent hover:text-paper underline underline-offset-4',
};

export function ButtonLink({
  href,
  variant = 'primary',
  children,
  className = '',
  ...rest
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = /^https?:\/\//.test(href) || href.startsWith('tel:') || href.startsWith('mailto:');
  const cls = `${base} ${variants[variant]} ${className}`;
  if (isExternal) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  ...rest
}: {
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
