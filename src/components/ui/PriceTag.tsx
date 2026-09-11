/** Renders a monthly price, or an honest "contact us" note when price is null. */
export function PriceTag({
  pricePerMonth,
  note = 'Contact us for pricing',
  size = 'md',
}: {
  pricePerMonth: number | null;
  note?: string;
  size?: 'md' | 'lg';
}) {
  if (typeof pricePerMonth !== 'number') {
    return <span className="text-base font-semibold text-accent">{note}</span>;
  }
  return (
    <span className="inline-flex items-baseline gap-1">
      <span
        className={`font-heading font-extrabold text-paper ${
          size === 'lg' ? 'text-4xl' : 'text-2xl'
        }`}
      >
        £{pricePerMonth}
      </span>
      <span className="text-sm text-muted">/ month</span>
    </span>
  );
}
