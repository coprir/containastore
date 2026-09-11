import type { Metadata } from 'next';

import { pageMeta } from '@/lib/seo';
import { hintsAndTips, getSite } from '@/lib/content';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const revalidate = 300;

export const metadata: Metadata = pageMeta({
  title: 'Hints and tips for storing in a container',
  description:
    'Practical advice on choosing a storage company, packing boxes, stacking a shipping container so nothing gets damaged, and moving your things safely.',
  path: '/hints-and-tips',
});

export default async function HintsPage() {
  const site = await getSite();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Hints & tips', path: '/hints-and-tips' },
        ])}
      />

      <Section tone="ink">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Hints & tips', path: '/hints-and-tips' },
          ]}
        />
        <SectionHeading eyebrow="Hints & tips" title={hintsAndTips.heading} lead={hintsAndTips.intro} />
      </Section>

      {hintsAndTips.groups.map((group, i) => (
        <Section
          key={group.title}
          tone={i % 2 === 0 ? 'steel' : 'ink'}
          ariaLabelledby={`tip-${i}`}
        >
          <h2 id={`tip-${i}`} className="font-heading text-xl font-bold text-paper">
            {group.title}
          </h2>
          {group.intro ? <p className="mt-2 max-w-2xl text-muted">{group.intro}</p> : null}
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {group.tips.map((tip) => (
              <li key={tip} className="flex gap-2 rounded border border-line bg-panel p-4 text-sm text-muted">
                <span aria-hidden="true" className="text-accent">
                  —
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section tone="steel">
        <div className="rounded border border-line bg-panel p-8 text-center">
          <p className="mx-auto max-w-xl text-muted">
            Want a hand with the move? Ask us for a removals, man-and-van or
            self-drive hire quote.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" variant="primary">
              Ask about a quote
            </ButtonLink>
            <ButtonLink href={site.phone.href} variant="secondary">
              Call {site.phone.display}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
