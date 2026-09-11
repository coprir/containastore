import Link from 'next/link';
import type { StorageUnit } from '@content/units';
import { SizeCode } from './SizeCode';
import { PriceTag } from './PriceTag';
import { ContainerFigure, ratioForSize } from './ContainerFigure';

/**
 * A pricing card. The header strip carries the corrugated texture and a
 * side-elevation figure of the container so the card reads as a container door.
 */
export function PricingCard({ unit }: { unit: StorageUnit }) {
  const href = unit.hasDetailPage ? `/storage/${unit.slug}` : '/contact';
  const doors = unit.doors.toLowerCase().includes('double') ? 'double' : 'single';

  return (
    <article className="flex flex-col overflow-hidden rounded border border-line bg-panel">
      <div className="corrugated relative bg-panel-2 px-5 pb-2 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-xl font-extrabold text-paper">{unit.size}</h3>
          {!unit.available ? (
            <span className="rounded border border-warn px-2 py-0.5 text-xs text-warn">
              Waiting list
            </span>
          ) : null}
        </div>
        <SizeCode code={unit.code} className="mt-1" />
        <ContainerFigure
          ratio={ratioForSize(unit.size)}
          doors={doors}
          label={`${unit.size} shipping container, ${unit.doors.toLowerCase()}`}
          className="mt-2 h-20 w-full"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <PriceTag pricePerMonth={unit.pricePerMonth} note={unit.priceNote ?? 'Contact us for pricing'} />

        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <dt className="text-muted">Floor area</dt>
            <dd className="font-mono text-paper">{unit.floorArea}</dd>
          </div>
          <div>
            <dt className="text-muted">Doors</dt>
            <dd className="text-paper">{unit.doors}</dd>
          </div>
        </dl>

        <p className="text-sm text-muted">{unit.blurb}</p>

        <div className="mt-auto pt-2">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-paper"
          >
            {unit.hasDetailPage ? `View the ${unit.size}` : 'Enquire about this size'}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
