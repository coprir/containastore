import type { ReactNode } from 'react';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  /** Alternating band colour. */
  tone?: 'ink' | 'steel' | 'panel';
  className?: string;
  id?: string;
  ariaLabelledby?: string;
  ariaLabel?: string;
}

const toneClass: Record<NonNullable<SectionProps['tone']>, string> = {
  ink: 'bg-ink',
  steel: 'bg-steel',
  panel: 'bg-panel',
};

export function Section({
  children,
  tone = 'ink',
  className = '',
  id,
  ariaLabelledby,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      aria-label={ariaLabel}
      className={`${toneClass[tone]} border-t border-[color-mix(in_srgb,var(--line)_60%,transparent)] py-14 md:py-20 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow ? (
        <p className="stencil mb-3 text-xs text-accent">{eyebrow}</p>
      ) : null}
      <h2 id={id} className="text-2xl md:text-3xl">
        {title}
      </h2>
      {lead ? <p className="mt-3 text-muted">{lead}</p> : null}
    </div>
  );
}
