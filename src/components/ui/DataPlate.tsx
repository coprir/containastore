/**
 * The four-cell "data plate" echoing the CSC plate riveted to a real container
 * door. Used in the hero. Exactly four cells — if the data ever changes to three,
 * change this layout, do not invent a fourth value.
 */
export interface PlateCell {
  label: string;
  value: string;
}

export function DataPlate({ cells }: { cells: PlateCell[] }) {
  return (
    <dl
      className="grid grid-cols-2 overflow-hidden rounded border border-line-strong bg-panel/80 sm:grid-cols-4"
      aria-label="Key facts"
    >
      {cells.map((cell, i) => (
        <div
          key={cell.label}
          className={`border-line-strong p-4 ${i % 2 === 0 ? 'border-r' : ''} ${
            i < cells.length - 2 ? 'border-b sm:border-b-0' : ''
          } ${i > 0 ? 'sm:border-l' : ''}`}
        >
          <dt className="stencil text-[10px] text-muted">{cell.label}</dt>
          <dd className="mt-1 font-mono text-sm font-semibold text-paper">{cell.value}</dd>
        </div>
      ))}
    </dl>
  );
}
