import type { Metadata } from 'next';

import { pageMeta } from '@/lib/seo';
import { getSite, getUnits, enquiryOnlyUnits, contactEmail } from '@/lib/content';
import { formConfigured } from '@/lib/env';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { EnquiryForm } from '@/components/EnquiryForm';
import { MapConsent } from '@/components/MapConsent';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const revalidate = 300;

export const metadata: Metadata = pageMeta({
  title: 'Contact & enquiries',
  description:
    'Contact Containastore Self Access Storage near Inkberrow, Worcestershire. Call 07851 435867 or send an enquiry. Operating hours 6:30am to 9pm; site visits by appointment.',
  path: '/contact',
});

// The contact-page map: an OpenStreetMap embed of the Inkberrow area. It is only
// loaded after consent (see MapConsent). The "Open in OpenStreetMap" button runs
// a postcode search rather than dropping an invented pin.
const OSM_EMBED =
  'https://www.openstreetmap.org/export/embed.html?bbox=-2.06%2C52.18%2C-1.88%2C52.26&layer=mapnik';
const OSM_LINK = 'https://www.openstreetmap.org/search?query=WR7%204JH';

export default async function ContactPage() {
  const [site, units] = await Promise.all([getSite(), getUnits()]);
  const email = contactEmail();

  const sizeOptions = [
    ...units.map((u) => ({ value: u.size, label: `${u.size} unit` })),
    ...enquiryOnlyUnits.map((u) => ({ value: u.size, label: u.size })),
    { value: 'not-sure', label: 'Not sure yet' },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />

      <Section tone="ink">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]}
        />
        <SectionHeading
          eyebrow="Contact"
          title="Get in touch"
          lead="Tell us roughly what you need to store and we will help you pick the right size."
        />

        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            {!formConfigured ? (
              <p className="mb-6 rounded border border-dashed border-warn bg-panel p-4 text-sm text-muted">
                <strong className="text-paper">Note:</strong> the online form is not
                connected to a mail service on this deployment. It will check your
                details and then show you the phone number and email to use
                instead — nothing is silently lost.
              </p>
            ) : null}
            <EnquiryForm
              sizeOptions={sizeOptions}
              phoneDisplay={site.phone.display}
              phoneHref={site.phone.href}
              email={email}
            />
          </div>

          <aside className="space-y-6">
            <div className="rounded border border-line-strong bg-panel p-6">
              <h2 className="font-heading text-lg font-bold text-paper">By phone or email</h2>
              <p className="mt-3 font-mono text-paper">
                <a href={site.phone.href} className="hover:text-accent">
                  {site.phone.display}
                </a>
              </p>
              <p className="font-mono text-paper">
                <a href={`mailto:${email}`} className="hover:text-accent">
                  {email}
                </a>
              </p>
              <dl className="mt-4 space-y-2 text-sm text-muted">
                <div>
                  <dt className="inline font-semibold text-paper">Operating hours: </dt>
                  <dd className="inline">{site.hours.enquiries}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-paper">Site visits: </dt>
                  <dd className="inline">{site.hours.siteVisits}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-paper">Container access: </dt>
                  <dd className="inline">{site.hours.access}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded border border-line-strong bg-panel p-6">
              <h2 className="font-heading text-lg font-bold text-paper">Address</h2>
              <address className="mt-3 not-italic font-mono text-sm text-paper">
                <span className="block">{site.address.line1}</span>
                <span className="block">{site.address.locality}</span>
                <span className="block">
                  {site.address.city} {site.address.postcode}
                </span>
              </address>
              <p className="mt-3 text-sm text-muted">{site.directions}.</p>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="steel" ariaLabelledby="map-h">
        <SectionHeading id="map-h" eyebrow="Finding us" title="On the map" />
        <MapConsent
          embedSrc={OSM_EMBED}
          linkHref={OSM_LINK}
          addressLines={[
            site.address.line1,
            site.address.locality,
            `${site.address.city} ${site.address.postcode}`,
          ]}
        />
        <p className="mt-3 text-xs text-muted">
          The map is an OpenStreetMap embed and only loads if you allow it. It
          shows the Inkberrow area — please call for exact directions to the yard.
        </p>
      </Section>
    </>
  );
}
