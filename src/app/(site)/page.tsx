import Link from 'next/link';
import type { Metadata } from 'next';

import { pageMeta } from '@/lib/seo';
import { getSite, getUnits, getFaqs, getHomeCopy, getFromPrice, enquiryOnlyUnits } from '@/lib/content';
import { Hero } from '@/components/home/Hero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { PricingGrid } from '@/components/PricingGrid';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const revalidate = 300;

export const metadata: Metadata = pageMeta({
  title: 'Containastore',
  description:
    'Secure container self storage near Inkberrow, Worcestershire. Drive-up access, 24 hour access once allocated, simple monthly terms from £80 a month. Call 07851 435867.',
  path: '/',
});

export default async function HomePage() {
  const [site, units, faqs, home, fromPrice] = await Promise.all([
    getSite(),
    getUnits(),
    getFaqs(),
    getHomeCopy(),
    getFromPrice(),
  ]);

  const faqPreview = faqs.slice(0, 4);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }])} />

      <Hero
        site={site}
        fromPrice={fromPrice}
        heading={home.hero.heading}
        sub={home.hero.sub}
      />

      {/* Three pillars */}
      <Section tone="steel" ariaLabelledby="pillars-h">
        <SectionHeading id="pillars-h" eyebrow="Why Containastore" title="Storage that stays simple" />
        <div className="grid gap-6 md:grid-cols-3">
          {home.pillars.map((p) => (
            <div key={p.title} className="rounded border border-line bg-panel p-6">
              <h3 className="font-heading text-lg font-bold text-paper">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing cards */}
      <Section tone="ink" ariaLabelledby="pricing-h">
        <SectionHeading
          id="pricing-h"
          eyebrow="Sizes & prices"
          title="Pick a size"
          lead={`Every container is 8ft wide and 8ft 6in high, ventilated, with a welded steel lockbox. Prices are per calendar month. From £${fromPrice} a month.`}
        />
        <PricingGrid units={units} enquiryOnly={enquiryOnlyUnits} />
        <p className="mt-6 text-sm text-muted">
          <Link href="/storage" className="underline hover:text-paper">
            See full dimensions and what fits in each size →
          </Link>
        </p>
      </Section>

      {/* How storage works */}
      <Section tone="steel" ariaLabelledby="how-h">
        <SectionHeading id="how-h" eyebrow="How it works" title="From enquiry to keys" />
        <ol className="grid gap-6 md:grid-cols-3">
          {home.howItWorks.map((step) => (
            <li key={step.step} className="rounded border border-line bg-panel p-6">
              <span className="stencil text-xs text-accent">Step {step.step}</span>
              <h3 className="mt-1 font-heading text-lg font-bold text-paper">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Conversions teaser */}
      <Section tone="ink" ariaLabelledby="conv-h">
        <div className="rounded border border-line bg-panel p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div className="max-w-2xl">
            <h2 id="conv-h" className="font-heading text-2xl font-bold text-paper">
              {home.conversionsTeaser.heading}
            </h2>
            <p className="mt-3 text-muted">{home.conversionsTeaser.body}</p>
          </div>
          <div className="mt-5 shrink-0 md:mt-0">
            <ButtonLink href="/conversions" variant="secondary">
              Conversions &amp; spray prices
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* FAQ preview */}
      <Section tone="steel" ariaLabelledby="faq-h">
        <SectionHeading id="faq-h" eyebrow="Good to know" title="Common questions" />
        <dl className="grid gap-6 md:grid-cols-2">
          {faqPreview.map((f) => (
            <div key={f.id} className="rounded border border-line bg-panel p-6">
              <dt className="font-heading text-base font-bold text-paper">{f.question}</dt>
              <dd className="mt-2 text-sm text-muted">
                {f.answer.length > 220 ? `${f.answer.slice(0, 217)}…` : f.answer}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-muted">
          <Link href="/faq" className="underline hover:text-paper">
            Read all questions →
          </Link>
        </p>
      </Section>

      {/* Final CTA */}
      <Section tone="ink" ariaLabelledby="cta-h">
        <div className="corrugated rounded border border-line-strong bg-panel-2 p-8 text-center md:p-12">
          <h2 id="cta-h" className="font-heading text-2xl font-extrabold text-paper md:text-3xl">
            {home.finalCta.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">{home.finalCta.body}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" variant="primary">
              Send an enquiry
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
