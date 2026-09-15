import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { DataPlate } from '@/components/ui/DataPlate';
import { ContainerFigure } from '@/components/ui/ContainerFigure';
import type { SiteContent } from '@content/site';

export function Hero({
  site,
  fromPrice,
  heading,
  sub,
}: {
  site: SiteContent;
  fromPrice: number;
  heading: string;
  sub: string;
}) {
  return (
    <div className="relative overflow-hidden border-b border-line bg-ink">
      <div className="corrugated absolute inset-0 opacity-40" aria-hidden="true" />
      <Container className="relative py-16 md:py-24">
        <p className="stencil reveal reveal-1 mb-4 text-xs text-accent">
          Container storage · {site.address.locality}, Worcestershire
        </p>
        <h1 className="reveal reveal-1 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
          {heading}
        </h1>
        <p className="reveal reveal-2 mt-5 max-w-2xl text-lg text-muted">{sub}</p>

        <div className="reveal reveal-3 mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/storage" variant="primary">
            See sizes &amp; prices
          </ButtonLink>
          <ButtonLink href={site.phone.href} variant="secondary">
            Call {site.phone.display}
          </ButtonLink>
        </div>

        <div className="reveal reveal-4 mt-10 max-w-2xl">
          <DataPlate
            cells={[
              { label: 'From', value: `£${fromPrice} / month` },
              { label: 'Access', value: '24 hours' },
              { label: 'Minimum term', value: '1 month' },
              { label: 'Location', value: site.address.postcode },
            ]}
          />
        </div>

        <div className="reveal reveal-4 mt-12" aria-hidden="true">
          <ContainerFigure
            ratio={5}
            doors="double"
            code="40FT · 320 SQ FT"
            label="Illustration of a 40ft shipping container"
            className="h-20 w-full opacity-90 sm:h-28 md:h-36"
          />
        </div>
      </Container>
    </div>
  );
}
