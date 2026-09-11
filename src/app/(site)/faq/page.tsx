import type { Metadata } from 'next';

import { pageMeta } from '@/lib/seo';
import { getFaqs, getSite } from '@/lib/content';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';

export const revalidate = 300;

export const metadata: Metadata = pageMeta({
  title: 'Storage FAQ',
  description:
    'Answers to common questions about renting a storage container from Containastore near Inkberrow — sizes, locks, costs, terms, areas covered, payment and moving in.',
  path: '/faq',
});

export default async function FaqPage() {
  const [faqs, site] = await Promise.all([getFaqs(), getSite()]);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'FAQ', path: '/faq' },
          ]),
          faqSchema(faqs),
        ]}
      />

      <Section tone="ink">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'FAQ', path: '/faq' },
          ]}
        />
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          lead="If your question is not here, call us on the number below or send an enquiry."
        />
        <Accordion items={faqs} />
      </Section>

      <Section tone="steel">
        <div className="rounded border border-line bg-panel p-8 md:flex md:items-center md:justify-between md:gap-6">
          <p className="max-w-xl text-muted">
            Still not sure? We are happy to talk it through — enquiries {site.hours.enquiries}.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
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
