import type { Dimension } from '@content/units';

/** Plate-style spec table for container dimensions. Not a bullet list. */
export function SpecTable({ dimensions }: { dimensions: Dimension[] }) {
  if (dimensions.length === 0) {
    return (
      <p className="rounded border border-dashed border-line-strong bg-panel p-4 text-sm text-muted">
        Exact dimensions for this size are not published. Contact us and we will
        measure up or send a photo.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <caption className="sr-only">Container dimensions</caption>
        <thead>
          <tr className="border-b border-line-strong text-left">
            <th scope="col" className="stencil py-2 pr-4 text-[10px] text-muted">
              &nbsp;
            </th>
            <th scope="col" className="stencil py-2 pr-4 text-[10px] text-muted">Length</th>
            <th scope="col" className="stencil py-2 pr-4 text-[10px] text-muted">Width</th>
            <th scope="col" className="stencil py-2 pr-4 text-[10px] text-muted">Height</th>
            <th scope="col" className="stencil py-2 pr-4 text-[10px] text-muted">Floor area</th>
            <th scope="col" className="stencil py-2 text-[10px] text-muted">Volume</th>
          </tr>
        </thead>
        <tbody className="font-mono">
          {dimensions.map((d) => (
            <tr key={d.label} className="border-b border-line">
              <th scope="row" className="py-3 pr-4 text-left font-heading text-xs font-bold uppercase tracking-wide text-accent">
                {d.label}
              </th>
              <td className="py-3 pr-4 text-paper">{d.length}</td>
              <td className="py-3 pr-4 text-paper">{d.width}</td>
              <td className="py-3 pr-4 text-paper">{d.height}</td>
              <td className="py-3 pr-4 text-paper">{d.floorArea}</td>
              <td className="py-3 text-paper">{d.volume ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
