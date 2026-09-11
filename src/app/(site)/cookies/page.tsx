import type { Metadata } from 'next';

import { pageMeta } from '@/lib/seo';
import { cookiePolicy } from '@/lib/content';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { LegalDocument } from '@/components/LegalDocument';
import { CookieSettings } from '@/components/CookieSettings';

export const metadata: Metadata = pageMeta({
  title: 'Cookie policy',
  description:
    'The cookies this website uses, how consent works, and how to change your choice. Non-essential content is only loaded if you agree.',
  path: '/cookies',
  index: false,
});

export default function CookiesPage() {
  return (
    <Section tone="ink">
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Cookie policy', path: '/cookies' },
        ]}
      />
      <SectionHeading eyebrow="Legal" title={cookiePolicy.title} />
      <div className="mb-8 max-w-3xl">
        <CookieSettings />
      </div>
      <LegalDocument doc={cookiePolicy} />
    </Section>
  );
}
