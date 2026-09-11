/**
 * Conversions and anti-condensation service. SOURCE OF TRUTH.
 * Sold to other storage businesses and container owners, not only tenants.
 */

export interface ServiceItem {
  name: string;
  price: string; // string because it carries the "£" and context
  notes: string;
}

export const conversionServices: ServiceItem[] = [
  {
    name: 'Anti-condensation spray — 10ft roof',
    price: '£280',
    notes: 'All in at £3.50 per sq ft.',
  },
  {
    name: 'Anti-condensation spray — 20ft roof',
    price: '£460',
    notes: 'All in at £2.88 per sq ft.',
  },
  {
    name: 'Anti-condensation spray — 40ft roof',
    price: '£780',
    notes: 'All in at £2.44 per sq ft.',
  },
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
  sprayIncludes:
    'Spray prices include the check, prep, covering floors, spraying, clean up and local travel.',
  lockBoxDiscount:
    'Lock box fitting has a discount for multiple boxes fitted on the same day.',
  points: [
    'The coating is 1.5mm thick, so it does not eat into interior space the way spray foam does.',
    'It dries slightly grey / off-white.',
    'It incorporates a fungicide, because condensation creates ideal conditions for mould.',
    'The same coating is used on thousands of UK buildings — garages, cold stores, aircraft hangars, schools, sports facilities and warehouses.',
    'It is sprayed in situ from a mobile workshop, which saves hundreds of pounds in transport.',
    'Ready to use in 24 hours in warm weather. In wet winter months it may need force drying, and drying equipment is available to rent.',
    'The roof must be clean — no oil splatter, rust holes or flaking paint — and the floor must be empty.',
    'Corten steel roof repairs can be carried out during the same visit at extra cost.',
  ],
  lockBoxSpec:
    'Lock box specification: 5mm S275 steel, seamless, 170mm wide × 50mm deep × 120mm high.',
};
