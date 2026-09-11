import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { pageMeta } from '@/lib/seo';
import { getUnit, getUnits, getSite, rentalTerms, commonSpec } from '@/lib/content';
import { units as baseUnits } from '@content/units';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SpecTable } from '@/components/ui/SpecTable';
import { SizeCode } from '@/components/ui/SizeCode';
import { PriceTag } from '@/components/ui/PriceTag';
import { ContainerFigure, ratioForSize } from '@/components/ui/ContainerFigure';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, unitOfferSchema } from '@/lib/schema';

export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return baseUnits.filter((u) => u.hasDetailPage).map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const unit = await getUnit(slug);
  if (!unit) return {};
  const priceBit =
    typeof unit.pricePerMonth === 'number'
      ? `£${unit.pricePerMonth} a month`
      : 'monthly rental';
  return pageMeta({
    title: `${unit.size} storage unit — ${priceBit}`,
    description: `${unit.size} shipping container for self storage near Inkberrow, Worcestershire. ${unit.floorArea} of floor space, ${unit.doors.toLowerCase()}, ${priceBit}. Secure, ventilated, 24 hour access once allocated.`,
    path: `/storage/${unit.slug}`,
  });
}

export default async function UnitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const unit = await getUnit(slug);
  if (!unit || !unit.hasDetailPage) notFound();

  const site = await getSite();
  const allUnits = await getUnits();
  const others = allUnits.filter((u) => u.slug !== unit.slug && u.hasDetailPage);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Storage & prices', path: '/storage' },
            { name: `${unit.size} unit`, path: `/storage/${unit.slug}` },
          ]),
          unitOfferSchema(unit),
        ]}
      />

      <Section tone="ink">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Storage & prices', path: '/storage' },
            { name: `${unit.size} unit`, path: `/storage/${unit.slug}` },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SizeCode code={unit.code} />
            <h1 className="mt-2 text-3xl font-extrabold md:text-5xl">
              {unit.size} storage unit
            </h1>
            <p className="mt-4 max-w-xl text-muted">{unit.blurb}</p>

            {unit.notes.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {unit.notes.map((note) => (
                  <li key={note} className="flex gap-2">
                    <span aria-hidden="true" className="text-accent">
                      —
                    </span>
                    {note}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="corrugated mt-6 rounded border border-line bg-panel-2 p-4">
              <ContainerFigure
                ratio={ratioForSize(unit.size)}
                doors={unit.doors.toLowerCase().includes('double') ? 'double' : 'single'}
                code={unit.code}
                label={`Side view of a ${unit.size} shipping container with ${unit.doors.toLowerCase()}`}
                className="h-40 w-full"
              />
            </div>
          </div>

          <aside className="rounded border border-line-strong bg-panel p-6">
            <PriceTag
              pricePerMonth={unit.pricePerMonth}
              note={unit.priceNote ?? 'Contact us for pricing'}
              size="lg"
            />
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">External floor area</dt>
                <dd className="font-mono text-paper">{unit.floorArea}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Doors</dt>
                <dd className="text-paper">{unit.doors}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Width</dt>
                <dd className="font-mono text-paper">{commonSpec.width}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Height</dt>
                <dd className="font-mono text-paper">{commonSpec.height}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Availability</dt>
                <dd className="text-paper">{unit.available ? 'Enquire now' : 'Waiting list'}</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-col gap-3">
              <ButtonLink href="/contact" variant="primary">
                Enquire about the {unit.size}
              </ButtonLink>
              <ButtonLink href={site.phone.href} variant="secondary">
                Call {site.phone.display}
              </ButtonLink>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="steel" ariaLabelledby="dims-h">
        <SectionHeading id="dims-h" eyebrow="Dimensions" title={`${unit.size} container dimensions`} />
        <SpecTable dimensions={unit.dimensions} />
        <p className="mt-4 text-xs text-muted">
          {commonSpec.construction}. Measurements are approximate and can vary
          slightly between individual containers.
        </p>
      </Section>

      <Section tone="ink" ariaLabelledby="terms-h">
        <SectionHeading id="terms-h" eyebrow="Renting" title="How the rental works" />
        <div className="grid gap-4 text-sm text-muted md:grid-cols-2">
          <p>{rentalTerms.billing}</p>
          <p>{rentalTerms.lock}</p>
          <p>{rentalTerms.firstPayment}</p>
          <p>{rentalTerms.ongoingPayment}</p>
        </div>
      </Section>

      <Section tone="steel" ariaLabelledby="other-h">
        <SectionHeading id="other-h" eyebrow="Other sizes" title="Compare another size" />
        <div className="flex flex-wrap gap-3">
          {others.map((u) => (
            <Link
              key={u.slug}
              href={`/storage/${u.slug}`}
              className="rounded border border-line-strong px-4 py-2 text-sm text-paper hover:bg-panel-2"
            >
              {u.size}
              {typeof u.pricePerMonth === 'number' ? (
                <span className="ml-2 font-mono text-muted">£{u.pricePerMonth}</span>
              ) : null}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
