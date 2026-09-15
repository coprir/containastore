import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { pageMeta } from '@/lib/seo';
import {
  getUnits,
  getFromPrice,
  enquiryOnlyUnits,
  rentalTerms,
} from '@/lib/content';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PricingGrid } from '@/components/PricingGrid';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, unitOfferSchema } from '@/lib/schema';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const from = await getFromPrice();
  return pageMeta({
    title: `Container storage sizes & prices — from £${from} a month`,
    description: `Shipping container self storage near Inkberrow, Worcestershire. 8ft, 10ft, 12ft, 20ft and 40ft containers from £${from} a month. Secure, ventilated, 24 hour access once allocated.`,
    path: '/storage',
  });
}

export default async function StoragePage() {
  const units = await getUnits();
  const from = await getFromPrice();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Storage & prices', path: '/storage' },
          ]),
          ...units.map(unitOfferSchema),
        ]}
      />

      <Section tone="ink">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Storage & prices', path: '/storage' },
          ]}
        />
        <SectionHeading
          eyebrow="Sizes & prices"
          title="Container storage sizes and prices"
          lead={`Every container is 8ft wide and 8ft 6in high, ventilated, and fitted with a welded steel lockbox. Prices are per calendar month, from £${from}.`}
        />

        <figure className="mb-8 overflow-hidden rounded border border-line">
          <Image
            src="/images/container-yard.jpg"
            alt="A row of Containastore storage containers"
            width={1536}
            height={1024}
            priority
            className="h-[220px] w-full object-cover md:h-[320px]"
            sizes="100vw"
          />
          <figcaption className="border-t border-line bg-panel px-4 py-2 text-xs text-muted">
            Our containers, ready to rent
          </figcaption>
        </figure>

        <PricingGrid units={units} enquiryOnly={enquiryOnlyUnits} />
      </Section>

      <Section tone="steel" ariaLabelledby="terms-h">
        <SectionHeading id="terms-h" eyebrow="Renting" title="Rental terms" />
        <div className="grid gap-6 md:grid-cols-2">
          <dl className="space-y-4">
            <div>
              <dt className="font-heading font-bold text-paper">Billing</dt>
              <dd className="mt-1 text-sm text-muted">{rentalTerms.billing}</dd>
            </div>
            <div>
              <dt className="font-heading font-bold text-paper">Agreement</dt>
              <dd className="mt-1 text-sm text-muted">{rentalTerms.agreement}</dd>
            </div>
            <div>
              <dt className="font-heading font-bold text-paper">Locks</dt>
              <dd className="mt-1 text-sm text-muted">{rentalTerms.lock}</dd>
            </div>
          </dl>
          <dl className="space-y-4">
            <div>
              <dt className="font-heading font-bold text-paper">First payment</dt>
              <dd className="mt-1 text-sm text-muted">{rentalTerms.firstPayment}</dd>
            </div>
            <div>
              <dt className="font-heading font-bold text-paper">Ongoing payments</dt>
              <dd className="mt-1 text-sm text-muted">{rentalTerms.ongoingPayment}</dd>
              <div className="mt-3 flex items-center gap-3">
                <Image
                  src="/images/card-payments.jpg"
                  alt=""
                  width={490}
                  height={494}
                  className="h-12 w-12 rounded object-cover"
                />
                <span className="text-xs text-muted">We accept card payments</span>
              </div>
            </div>
          </dl>
        </div>
        <p className="mt-8 text-sm text-muted">
          Not sure which size?{' '}
          <Link href="/contact" className="underline hover:text-paper">
            Tell us what you need to store
          </Link>{' '}
          and we will help you choose.
        </p>
      </Section>
    </>
  );
}
