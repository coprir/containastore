/**
 * Conversions service — weld-on lock boxes. SOURCE OF TRUTH.
 * Sold to other storage businesses and container owners, not only tenants.
 *
 * Anti-condensation spray was removed from the site at the client's request on
 * 11 Sept 2026 — it is no longer an offered service. See DISCREPANCIES.md.
 */

export interface ServiceItem {
  name: string;
  price: string; // string because it carries the "£" and context
  notes: string;
}

export const conversionServices: ServiceItem[] = [
  {
    name: 'Weld-on lock box',
    price: '£75',
    notes: 'Supplied and fitted, within a local radius of Redditch.',
  },
  {
    name: 'Weld-on lock box — painted',
    price: '£105',
    notes: 'Red oxide undercoat, high build gloss top coat.',
  },
];

export const conversionCopy = {
  lockBoxDiscount:
    'Lock box fitting has a discount for multiple boxes fitted on the same day.',
  lockBoxSpec:
    'Lock box specification: 5mm S275 steel, seamless, 170mm wide × 50mm deep × 120mm high.',
};
