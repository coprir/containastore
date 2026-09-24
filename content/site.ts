/**
 * Core business facts for Containastore Self Access Storage.
 *
 * SOURCE OF TRUTH. Extracted from containastore.co.uk on 10 September 2026 and
 * verified page by page. Do not invent, extend or "improve" any value here.
 * Contradictions in the live site are resolved in DISCREPANCIES.md.
 *
 * The public email address is read from CONTACT_EMAIL at runtime so it is not
 * committed to source; `emailFallback` is only used if the env var is missing.
 */

export interface SiteContent {
  name: string;
  legalName: string;
  tagline: string;
  emailFallback: string;
  phone: { display: string; href: string };
  address: {
    line1: string;
    locality: string;
    city: string;
    postcode: string;
    country: string;
  };
  hours: {
    enquiries: string;
    access: string;
    siteVisits: string;
  };
  directions: string;
  /** Founded 2008 — appears ONLY in a meta description on the live site.
   *  Do NOT display anywhere until the client confirms. Kept here for reference. */
  foundedUnconfirmed: number;
  social: {
    facebook: string;
    twitter: string;
  };
  areasServed: string[];
  security: string[];
}

export const site: SiteContent = {
  name: 'Containastore',
  legalName: 'Containastore Self Access Storage',
  tagline: 'Your local self access storage',
  emailFallback: 'hello@containastore.co.uk',
  phone: {
    display: '07851 435867',
    href: 'tel:+447851435867',
  },
  address: {
    line1: 'Berrowsfield Farm Ltd',
    locality: 'Inkberrow',
    city: 'Worcester',
    postcode: 'WR7 4JH',
    country: 'United Kingdom',
  },
  hours: {
    enquiries: '6:30am – 9pm',
    access: '24 hours a day to your container',
    siteVisits: 'By appointment during enquiry hours',
  },
  directions: 'Easily accessible from M40 Junction 6 and the A422',
  foundedUnconfirmed: 2008,
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61579586157847',
    twitter: 'https://twitter.com/ContainastoreUK',
  },
  areasServed: [
    'Redditch',
    'Bromsgrove',
    'Droitwich',
    'Inkberrow',
    'Worcester',
    'Pershore',
    'Worcestershire',
    'Alcester',
    'Studley',
    'Alvechurch',
    'Birmingham',
    'Solihull',
    'Shirley',
    'Tanworth',
    'Earlswood',
    'Radford',
  ],
  security: [
    'Heavy duty lockboxes welded to the outside doors',
    '24 hour remotely monitored CCTV covering the yard',
    'Security lighting',
    'People on site day and night',
  ],
};

/** Resolve the public contact email: env first, committed fallback second. */
export function contactEmail(): string {
  return process.env.CONTACT_EMAIL || site.emailFallback;
}
