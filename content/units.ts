/**
 * Storage units. SOURCE OF TRUTH — see DISCREPANCIES.md for resolved conflicts:
 *  - 20ft price is £120/month (client-confirmed 11 Sept 2026, superseding the
 *    original launch-build figure of £115)
 *  - 40ft price is £180/month (client-confirmed 11 Sept 2026, was £170)
 *  - "From" price across the site is £80 (the cheapest confirmed unit)
 *  - Every container is 8ft 6in high (the FAQ's "8ft high" is not used)
 *
 * Publish NO dimensions for the 8ft and 12ft — the live site publishes none.
 */

export interface Dimension {
  label: string; // e.g. "Internal", "External"
  length: string;
  width: string;
  height: string;
  floorArea: string;
  volume?: string;
}

export interface StorageUnit {
  slug: string; // route: /storage/[slug]
  size: string; // e.g. "20ft"
  name: string; // e.g. "20ft storage unit"
  /** Monthly price in GBP, or null when the client must supply it. */
  pricePerMonth: number | null;
  priceNote?: string; // shown when pricePerMonth is null
  floorArea: string; // headline external floor area
  doors: string;
  code: string; // stencilled ISO-style marking, e.g. "20FT · 160 SQ FT"
  hasDetailPage: boolean;
  available: boolean;
  /** Short blurb — only facts from the live site. */
  blurb: string;
  /** Empty array means "no dimensions published" — render an honest note. */
  dimensions: Dimension[];
  /** Extra facts specific to this size, straight from the live site. */
  notes: string[];
}

const WIDTH = '8ft';
const HEIGHT = '8ft 6in';

export const commonSpec = {
  width: WIDTH,
  height: HEIGHT,
  construction: 'Ventilated, with a welded steel lockbox',
};

export const units: StorageUnit[] = [
  {
    slug: '8ft-storage',
    size: '8ft',
    name: '8ft storage unit',
    pricePerMonth: 80,
    floorArea: '64 sq ft',
    doors: 'Single steel door',
    code: '8FT · 64 SQ FT',
    hasDetailPage: true,
    available: true,
    blurb:
      'Our smallest container. Room for the contents of a one or two bedroom flat, garden equipment or the overflow from a house move.',
    dimensions: [],
    notes: ['All containers are 8ft wide and 8ft 6in high.'],
  },
  {
    slug: '10ft-storage',
    size: '10ft',
    name: '10ft storage unit',
    pricePerMonth: 85,
    floorArea: '80 sq ft',
    doors: 'Single steel door',
    code: '10FT · 80 SQ FT',
    hasDetailPage: true,
    available: true,
    blurb:
      'A step up from the 8ft with the same single-door access. Suits a small house move, business stock or long-term household storage.',
    dimensions: [
      {
        label: 'Internal',
        length: '7ft 7in',
        width: '7ft 7in',
        height: '7ft 9in',
        floorArea: '58 sq ft',
        volume: '470 cu ft',
      },
      {
        label: 'External',
        length: '10ft',
        width: '8ft',
        height: '8ft 6in',
        floorArea: '80 sq ft',
      },
    ],
    notes: [],
  },
  {
    slug: '12ft-storage',
    size: '12ft',
    name: '12ft storage unit',
    pricePerMonth: 100,
    floorArea: '96 sq ft',
    doors: 'Single steel door',
    code: '12FT · 96 SQ FT',
    hasDetailPage: true,
    available: true,
    blurb:
      'A mid-size single-door container for a larger house move or a growing amount of business stock.',
    dimensions: [],
    notes: ['All containers are 8ft wide and 8ft 6in high.'],
  },
  {
    slug: '20ft-storage',
    size: '20ft',
    name: '20ft storage unit',
    pricePerMonth: 120,
    floorArea: '160 sq ft',
    doors: 'Double doors',
    code: '20FT · 160 SQ FT',
    hasDetailPage: true,
    available: true,
    blurb:
      'Our most popular size. A 20ft container holds an average three bedroom house with garden furniture. Full-width double doors make loading straightforward.',
    dimensions: [
      {
        label: 'Internal',
        length: '19ft 3in',
        width: '7ft 7in',
        height: '7ft 9in',
        floorArea: '150 sq ft',
        volume: '1,160 cu ft',
      },
      {
        label: 'External',
        length: '20ft',
        width: '8ft',
        height: '8ft 6in',
        floorArea: '160 sq ft',
      },
    ],
    notes: ['Holds an average three bedroom house with garden furniture.'],
  },
  {
    slug: '40ft-storage',
    size: '40ft',
    name: '40ft storage unit',
    pricePerMonth: 180,
    floorArea: '320 sq ft',
    doors: 'Double doors',
    code: '40FT · 320 SQ FT',
    hasDetailPage: true,
    available: true,
    blurb:
      'The largest container we rent. Double doors at one end and the floor area of a large domestic garage.',
    dimensions: [
      {
        label: 'Internal',
        length: '39ft 4in',
        width: '7ft 7in',
        height: '7ft 9in',
        floorArea: '305 sq ft',
        volume: '2,360 cu ft',
      },
      {
        label: 'External',
        length: '40ft',
        width: '8ft',
        height: '8ft 6in',
        floorArea: '320 sq ft',
      },
    ],
    notes: [
      // Flagged discrepancy: the weekly refund is stated on the 40ft page and the
      // contact page, but not on About or the other size pages. See DISCREPANCIES.md.
      'Unused complete weeks are refunded if you leave early. Please confirm current terms when you enquire.',
    ],
  },
];

/** Sizes with no detail page — shown as a "contact us" card. */
export interface EnquiryOnlyUnit {
  size: string;
  code: string;
  priceNote: string;
  blurb: string;
}

export const enquiryOnlyUnits: EnquiryOnlyUnit[] = [
  {
    size: '30ft / 45ft high cube',
    code: '30FT / 45FT HC',
    priceNote: 'Contact us for pricing',
    blurb:
      'Larger and high-cube containers are sometimes available. Get in touch to check current stock and pricing.',
  },
];

export const rentalTerms = {
  billing:
    'Rent is charged one month in advance from the day you move in. Minimum term one month, with no notice period.',
  agreement: 'A short rental agreement is signed before you move in.',
  lock:
    'A heavy duty lock is provided free against a £30 deposit, refunded when the lock is returned and the container is empty. You are welcome to add your own padlocks.',
  firstPayment:
    'The first payment is made on move-in day by cash, card or pre-arranged bank transfer.',
  ongoingPayment:
    'Ongoing payments can be made by cash, card, bank transfer or standing order.',
};

/** The single "from" price used in hero copy, meta and schema. */
export function fromPrice(): number {
  const priced = units
    .map((u) => u.pricePerMonth)
    .filter((p): p is number => typeof p === 'number');
  return Math.min(...priced);
}

export function getUnit(slug: string): StorageUnit | undefined {
  return units.find((u) => u.slug === slug);
}
