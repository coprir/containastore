import type { Metadata } from 'next';
import Image from 'next/image';

import { pageMeta } from '@/lib/seo';
import { getSite, aboutCopy } from '@/lib/content';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const revalidate = 300;

export const metadata: Metadata = pageMeta({
  title: 'About us',
  description:
    'Containastore Self Access Storage is a shipping container storage yard near Inkberrow, Worcestershire, with drive-up access, 24 hour access once allocated and monitored CCTV.',
  path: '/about',
});

export default async function AboutPage() {
  const site = await getSite();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />

      <Section tone="ink">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]}
        />
        <SectionHeading eyebrow="About" title={aboutCopy.heading} />
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div className="max-w-2xl space-y-4 text-muted">
            {aboutCopy.intro.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <figure className="overflow-hidden rounded border border-line">
            <Image
              src="/images/container-interior.jpg"
              alt="Looking out from inside an open, empty Containastore container across the yard"
              width={300}
              height={225}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1024px) 400px, 100vw"
            />
            <figcaption className="border-t border-line bg-panel px-4 py-2 text-xs text-muted">
              Inside one of our containers, doors open
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section tone="steel" ariaLabelledby="why-h">
        <SectionHeading id="why-h" eyebrow="What you get" title="How we do storage" />
        <div className="grid gap-6 md:grid-cols-3">
          {aboutCopy.whyUs.map((item) => (
            <div key={item.title} className="rounded border border-line bg-panel p-6">
              <h3 className="font-heading text-lg font-bold text-paper">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm text-muted">
          <strong className="text-paper">Early departures.</strong> {aboutCopy.refundNote}
        </p>
      </Section>

      <Section tone="ink" ariaLabelledby="sec-h">
        <SectionHeading id="sec-h" eyebrow="Security" title="How the yard is kept secure" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {site.security.map((item) => (
            <li key={item} className="rounded border border-line bg-panel p-4 text-sm text-muted">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="steel" ariaLabelledby="find-h">
        <SectionHeading id="find-h" eyebrow="Finding us" title="Where we are" />
        <div className="grid gap-6 md:grid-cols-2">
          <address className="not-italic text-muted">
            <span className="block font-mono text-paper">{site.address.line1}</span>
            <span className="block font-mono text-paper">{site.address.locality}</span>
            <span className="block font-mono text-paper">
              {site.address.city} {site.address.postcode}
            </span>
            <span className="mt-3 block">{site.directions}.</span>
            <span className="mt-3 block">
              Enquiries {site.hours.enquiries}. Site visits: {site.hours.siteVisits.toLowerCase()}.
              Access is {site.hours.access}.
            </span>
          </address>
          <div>
            <p className="text-sm text-muted">
              We regularly help customers across {site.areasServed.slice(0, -1).join(', ')} and{' '}
              {site.areasServed[site.areasServed.length - 1]}.
            </p>
            <div className="mt-5">
              <ButtonLink href="/contact" variant="primary">
                Arrange a visit
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
