import type { StorageUnit, EnquiryOnlyUnit } from '@content/units';
import { PricingCard } from '@/components/ui/PricingCard';
import { SizeCode } from '@/components/ui/SizeCode';
import { ButtonLink } from '@/components/ui/Button';

export function PricingGrid({
  units,
  enquiryOnly,
}: {
  units: StorageUnit[];
  enquiryOnly: EnquiryOnlyUnit[];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {units.map((unit) => (
        <PricingCard key={unit.slug} unit={unit} />
      ))}

      {enquiryOnly.map((unit) => (
        <article
          key={unit.size}
          className="flex flex-col overflow-hidden rounded border border-dashed border-line-strong bg-panel"
        >
          <div className="corrugated bg-panel-2 px-5 py-4">
            <h3 className="font-heading text-xl font-extrabold text-paper">{unit.size}</h3>
            <SizeCode code={unit.code} className="mt-1" />
          </div>
          <div className="flex flex-1 flex-col gap-4 p-5">
            <span className="text-base font-semibold text-accent">{unit.priceNote}</span>
            <p className="text-sm text-muted">{unit.blurb}</p>
            <div className="mt-auto pt-2">
              <ButtonLink href="/contact" variant="secondary" className="!px-4 !py-2 !text-sm">
                Ask about availability
              </ButtonLink>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
