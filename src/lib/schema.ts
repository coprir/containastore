/**
 * JSON-LD structured data. Built ONLY from confirmed values in the content layer.
 * No ratings, review counts, founding date or opening figures are emitted, because
 * those are unconfirmed or absent from the source.
 */
import { env } from './env';
import type { SiteContent } from '@content/site';
import type { StorageUnit } from '@content/units';

export function localBusinessSchema(site: SiteContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SelfStorage',
    '@id': `${env.siteUrl}/#business`,
    name: site.legalName,
    alternateName: site.name,
    slogan: site.tagline,
    url: env.siteUrl,
    telephone: site.phone.href.replace('tel:', ''),
    email: env.contactEmail,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.line1}, ${site.address.locality}`,
      addressLocality: site.address.city,
      postalCode: site.address.postcode,
      addressCountry: 'GB',
    },
    areaServed: site.areasServed.map((name) => ({ '@type': 'Place', name })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '18:00',
        description: 'Enquiry hours. Container access is 24 hours once allocated.',
      },
    ],
    sameAs: [site.social.facebook, site.social.twitter],
  };
}

export function unitOfferSchema(unit: StorageUnit) {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${unit.size} storage container`,
    description: unit.blurb,
    category: 'Self storage container',
    brand: { '@type': 'Brand', name: 'Containastore' },
  };
  if (typeof unit.pricePerMonth === 'number') {
    base.offers = {
      '@type': 'Offer',
      price: unit.pricePerMonth,
      priceCurrency: 'GBP',
      availability: unit.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${env.siteUrl}/storage/${unit.slug}`,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: unit.pricePerMonth,
        priceCurrency: 'GBP',
        unitCode: 'MON',
        billingIncrement: 1,
      },
    };
  }
  return base;
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${env.siteUrl}${item.path === '/' ? '' : item.path}`,
    })),
  };
}
