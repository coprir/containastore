import type { Metadata } from 'next';
import Image from 'next/image';

import { pageMeta } from '@/lib/seo';
import { getSite, conversionServices, conversionCopy } from '@/lib/content';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const revalidate = 300;

export const metadata: Metadata = pageMeta({
  title: 'Container conversions & lock boxes',
  description:
    'Weld-on lock boxes for shipping containers, supplied and fitted within a local radius of Redditch. For container owners and other storage businesses across the West Midlands.',
  path: '/conversions',
});

export default async function ConversionsPage() {
  const site = await getSite();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Conversions', path: '/conversions' },
        ])}
      />

      <Section tone="ink">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Conversions', path: '/conversions' },
          ]}
        />
        <SectionHeading
          eyebrow="Conversions"
          title="Container conversions"
          lead="We weld on lock boxes — for our own yard and for other storage businesses and container owners."
        />
      </Section>

      <Section tone="steel" ariaLabelledby="prices-h">
        <SectionHeading id="prices-h" eyebrow="Prices" title="Service prices" />
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-line-strong text-left">
                <th scope="col" className="py-3 pr-4 font-heading text-xs uppercase tracking-wide text-muted">
                  Service
                </th>
                <th scope="col" className="py-3 pr-4 font-heading text-xs uppercase tracking-wide text-muted">
                  Price
                </th>
                <th scope="col" className="py-3 font-heading text-xs uppercase tracking-wide text-muted">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {conversionServices.map((s) => (
                <tr key={s.name} className="border-b border-line align-top">
                  <th scope="row" className="py-3 pr-4 text-left font-semibold text-paper">
                    {s.name}
                  </th>
                  <td className="py-3 pr-4 font-mono text-paper">{s.price}</td>
                  <td className="py-3 text-muted">{s.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 space-y-2 text-sm text-muted">
          <p>{conversionCopy.lockBoxDiscount}</p>
        </div>
      </Section>

      <Section tone="ink" ariaLabelledby="lockbox-h">
        <SectionHeading id="lockbox-h" eyebrow="Lock boxes" title="Weld-on lock box specification" />
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <p className="max-w-2xl font-mono text-sm text-paper">{conversionCopy.lockBoxSpec}</p>
            <p className="mt-3 max-w-2xl text-sm text-muted">
              Supplied and fitted within a local radius of Redditch. A painted
              finish (red oxide undercoat, high build gloss top coat) is
              available. Discount for multiple boxes fitted on the same day.
            </p>
          </div>
          <figure className="overflow-hidden rounded border border-line">
            <Image
              src="/images/lock-box.jpg"
              alt="A freshly welded steel lock box with its hinge bracket, ready to be fitted to a container door"
              width={1110}
              height={903}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1024px) 480px, 100vw"
            />
            <figcaption className="border-t border-line bg-panel px-4 py-2 text-xs text-muted">
              One of our welded lock boxes, ready to fit
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section tone="steel" ariaLabelledby="conv-cta-h">
        <div className="corrugated rounded border border-line-strong bg-panel-2 p-8 text-center md:p-12">
          <h2 id="conv-cta-h" className="font-heading text-2xl font-extrabold text-paper">
            Get a quote for your containers
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Tell us how many containers, what size, and where they are, and we
            will come back with a price.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" variant="primary">
              Request a quote
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
