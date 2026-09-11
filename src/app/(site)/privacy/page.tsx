import type { Metadata } from 'next';

import { pageMeta } from '@/lib/seo';
import { privacyPolicy } from '@/lib/content';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { LegalDocument } from '@/components/LegalDocument';

export const metadata: Metadata = pageMeta({
  title: 'Privacy policy',
  description:
    'How Containastore Self Access Storage collects and uses personal information, including enquiries, rental records, payments, CCTV and website logs.',
  path: '/privacy',
  index: false,
});

export default function PrivacyPage() {
  return (
    <Section tone="ink">
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Privacy policy', path: '/privacy' },
        ]}
      />
      <SectionHeading eyebrow="Legal" title={privacyPolicy.title} />
      <LegalDocument doc={privacyPolicy} />
    </Section>
  );
}
