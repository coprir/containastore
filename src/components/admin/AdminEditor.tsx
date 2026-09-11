'use client';

import { useMemo, useState } from 'react';
import type { StorageUnit, Dimension } from '@content/units';
import type { Faq } from '@content/faq';
import type { SiteContent } from '@content/site';
import type { homeCopy as HomeCopy } from '@content/pages';
import type { ContentOverrides } from '@/lib/content';

interface BaseSnapshot {
  units: StorageUnit[];
  faqs: Faq[];
  homeCopy: typeof HomeCopy;
  site: SiteContent;
}

interface Props {
  base: BaseSnapshot;
  initialOverrides: ContentOverrides;
}

interface UnitDraft {
  slug: string;
  size: string;
  price: string; // '' means "Contact us for pricing"
  priceNote: string;
  available: boolean;
  floorArea: string;
  doors: string;
  blurb: string;
  dimensionsJson: string;
}

const field =
  'w-full rounded border border-line-strong bg-ink px-3 py-2 text-sm text-paper';
const labelCls = 'mb-1 block text-xs font-semibold text-muted';

function unitToDraft(u: StorageUnit, o?: Partial<StorageUnit>): UnitDraft {
  const merged = { ...u, ...(o ?? {}) };
  return {
    slug: u.slug,
    size: u.size,
    price: typeof merged.pricePerMonth === 'number' ? String(merged.pricePerMonth) : '',
    priceNote: merged.priceNote ?? '',
    available: merged.available,
    floorArea: merged.floorArea,
    doors: merged.doors,
    blurb: merged.blurb,
    dimensionsJson: JSON.stringify(merged.dimensions, null, 2),
  };
}

export function AdminEditor({ base, initialOverrides }: Props) {
  const [units, setUnits] = useState<UnitDraft[]>(() =>
    base.units.map((u) => unitToDraft(u, initialOverrides.units?.[u.slug])),
  );
  const [faqs, setFaqs] = useState<Faq[]>(() =>
    initialOverrides.faqs && initialOverrides.faqs.length > 0
      ? initialOverrides.faqs
      : base.faqs,
  );
  const [hero, setHero] = useState({
    heading: initialOverrides.homeCopy?.hero?.heading ?? base.homeCopy.hero.heading,
    sub: initialOverrides.homeCopy?.hero?.sub ?? base.homeCopy.hero.sub,
  });

  const [status, setStatus] = useState<
    { kind: 'idle' | 'saving' | 'saved' } | { kind: 'error'; message: string }
  >({ kind: 'idle' });
  const [showJson, setShowJson] = useState(false);

  const setUnit = (slug: string, patch: Partial<UnitDraft>) =>
    setUnits((prev) => prev.map((u) => (u.slug === slug ? { ...u, ...patch } : u)));

  const moveFaq = (index: number, dir: -1 | 1) => {
    setFaqs((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const { overrides, error } = useMemo(() => buildOverrides(base, units, faqs, hero), [
    base,
    units,
    faqs,
    hero,
  ]);

  const save = async () => {
    if (error) {
      setStatus({ kind: 'error', message: error });
      return;
    }
    setStatus({ kind: 'saving' });
    try {
      const res = await fetch('/api/admin/overrides', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(overrides),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setStatus({ kind: 'error', message: data.message || 'Save failed.' });
        return;
      }
      setStatus({ kind: 'saved' });
    } catch {
      setStatus({ kind: 'error', message: 'Could not reach the server.' });
    }
  };

  return (
    <div className="space-y-10">
      {/* ---- Storage units --------------------------------------------- */}
      <section className="space-y-4">
        <h2 className="font-heading text-lg font-bold text-paper">Storage units</h2>
        <p className="text-xs text-muted">
          Adding a brand-new size needs a matching page/route added in code. Price,
          description, availability and dimensions for the existing sizes are all
          editable here. Leave price blank to show &ldquo;Contact us for
          pricing&rdquo;. Dimensions must stay valid JSON — an empty array
          <code className="font-mono"> []</code> publishes no dimensions.
        </p>
        <div className="space-y-6">
          {units.map((u) => (
            <div key={u.slug} className="rounded border border-line bg-panel p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-paper">{u.size}</h3>
                <label className="flex items-center gap-2 text-xs text-muted">
                  <input
                    type="checkbox"
                    checked={u.available}
                    onChange={(e) => setUnit(u.slug, { available: e.target.checked })}
                  />
                  Available
                </label>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Price per month (£)</label>
                  <input
                    className={field}
                    inputMode="numeric"
                    value={u.price}
                    onChange={(e) =>
                      setUnit(u.slug, { price: e.target.value.replace(/[^0-9.]/g, '') })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Price note (when price blank)</label>
                  <input
                    className={field}
                    value={u.priceNote}
                    onChange={(e) => setUnit(u.slug, { priceNote: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelCls}>Floor area</label>
                  <input
                    className={field}
                    value={u.floorArea}
                    onChange={(e) => setUnit(u.slug, { floorArea: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelCls}>Doors</label>
                  <input
                    className={field}
                    value={u.doors}
                    onChange={(e) => setUnit(u.slug, { doors: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className={labelCls}>Description</label>
                <textarea
                  className={field}
                  rows={2}
                  value={u.blurb}
                  onChange={(e) => setUnit(u.slug, { blurb: e.target.value })}
                />
              </div>
              <div className="mt-3">
                <label className={labelCls}>Dimensions (JSON)</label>
                <textarea
                  className={`${field} font-mono`}
                  rows={8}
                  value={u.dimensionsJson}
                  onChange={(e) => setUnit(u.slug, { dimensionsJson: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- FAQs ---------------------------------------------------- */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-paper">FAQs</h2>
          <button
            type="button"
            onClick={() =>
              setFaqs((p) => [
                ...p,
                { id: `faq-${Date.now()}`, question: 'New question', answer: '' },
              ])
            }
            className="rounded border border-line-strong px-3 py-1.5 text-xs font-bold text-paper hover:bg-panel-2"
          >
            Add FAQ
          </button>
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={f.id} className="rounded border border-line bg-panel p-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] text-muted">{f.id}</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => moveFaq(i, -1)}
                    disabled={i === 0}
                    aria-label="Move up"
                    className="rounded border border-line-strong px-2 py-1 text-xs text-paper disabled:opacity-40"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveFaq(i, 1)}
                    disabled={i === faqs.length - 1}
                    aria-label="Move down"
                    className="rounded border border-line-strong px-2 py-1 text-xs text-paper disabled:opacity-40"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => setFaqs((p) => p.filter((x) => x.id !== f.id))}
                    className="rounded border border-warn px-2 py-1 text-xs text-warn"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <input
                className={field}
                value={f.question}
                onChange={(e) =>
                  setFaqs((p) =>
                    p.map((x) => (x.id === f.id ? { ...x, question: e.target.value } : x)),
                  )
                }
              />
              <textarea
                className={`${field} mt-2`}
                rows={4}
                value={f.answer}
                onChange={(e) =>
                  setFaqs((p) =>
                    p.map((x) => (x.id === f.id ? { ...x, answer: e.target.value } : x)),
                  )
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* ---- Homepage hero ----------------------------------------- */}
      <section className="space-y-4">
        <h2 className="font-heading text-lg font-bold text-paper">Homepage hero</h2>
        <div>
          <label className={labelCls}>Heading</label>
          <input
            className={field}
            value={hero.heading}
            onChange={(e) => setHero((h) => ({ ...h, heading: e.target.value }))}
          />
        </div>
        <div>
          <label className={labelCls}>Sub-heading</label>
          <textarea
            className={field}
            rows={3}
            value={hero.sub}
            onChange={(e) => setHero((h) => ({ ...h, sub: e.target.value }))}
          />
        </div>
      </section>

      {/* ---- Contact & company info (read-only reference) ----------- */}
      <section className="space-y-2">
        <h2 className="font-heading text-lg font-bold text-paper">Contact &amp; company info</h2>
        <p className="text-xs text-muted">
          Phone, address and areas served are edited in{' '}
          <code className="font-mono">content/site.ts</code>. The public contact
          email comes from the <code className="font-mono">CONTACT_EMAIL</code>{' '}
          environment variable. These are deliberately kept out of the runtime
          editor so a typo cannot take the business&rsquo;s phone number offline.
        </p>
        <dl className="grid gap-2 rounded border border-line bg-panel p-4 text-sm sm:grid-cols-2">
          <div><dt className="text-muted">Phone</dt><dd className="font-mono text-paper">{base.site.phone.display}</dd></div>
          <div><dt className="text-muted">Postcode</dt><dd className="font-mono text-paper">{base.site.address.postcode}</dd></div>
          <div><dt className="text-muted">Enquiry hours</dt><dd className="text-paper">{base.site.hours.enquiries}</dd></div>
          <div><dt className="text-muted">Areas served</dt><dd className="text-paper">{base.site.areasServed.length}</dd></div>
        </dl>
      </section>

      {/* ---- Save ------------------------------------------------- */}
      <div className="sticky bottom-0 -mx-4 border-t border-line bg-steel/95 px-4 py-4 backdrop-blur">
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={save}
            disabled={status.kind === 'saving'}
            className="rounded border border-accent-strong bg-accent-strong px-5 py-2.5 text-sm font-bold text-ink hover:bg-accent disabled:opacity-60"
          >
            {status.kind === 'saving' ? 'Saving…' : 'Save changes'}
          </button>
          <button
            type="button"
            onClick={() => setShowJson((v) => !v)}
            className="rounded border border-line-strong px-4 py-2.5 text-sm font-bold text-paper hover:bg-panel-2"
          >
            {showJson ? 'Hide' : 'Export'} JSON
          </button>
          {status.kind === 'saved' ? (
            <span className="text-sm text-accent">Saved. Refresh the public site to see it.</span>
          ) : null}
          {status.kind === 'error' ? (
            <span className="text-sm text-warn">{status.message}</span>
          ) : null}
          {error ? <span className="text-sm text-warn">{error}</span> : null}
        </div>
        {showJson ? (
          <textarea
            readOnly
            className={`${field} mt-3 font-mono`}
            rows={12}
            value={JSON.stringify(overrides, null, 2)}
          />
        ) : null}
      </div>
    </div>
  );
}

/* ---- Build the overrides object from drafts ------------------------------ */
function buildOverrides(
  base: BaseSnapshot,
  units: UnitDraft[],
  faqs: Faq[],
  hero: { heading: string; sub: string },
): { overrides: ContentOverrides; error: string | null } {
  const overrides: ContentOverrides = {};
  let error: string | null = null;

  const unitOverrides: Record<string, Partial<StorageUnit>> = {};
  for (const draft of units) {
    const original = base.units.find((u) => u.slug === draft.slug)!;
    const patch: Partial<StorageUnit> = {};

    const price = draft.price.trim() === '' ? null : Number(draft.price);
    if (price !== null && !Number.isFinite(price)) {
      error = `${draft.size}: price must be a number or blank.`;
    }
    if (price !== original.pricePerMonth) patch.pricePerMonth = price;
    if (draft.priceNote !== (original.priceNote ?? '')) {
      patch.priceNote = draft.priceNote || undefined;
    }
    if (draft.available !== original.available) patch.available = draft.available;
    if (draft.floorArea !== original.floorArea) patch.floorArea = draft.floorArea;
    if (draft.doors !== original.doors) patch.doors = draft.doors;
    if (draft.blurb !== original.blurb) patch.blurb = draft.blurb;

    let parsedDims: Dimension[] | null = null;
    try {
      parsedDims = JSON.parse(draft.dimensionsJson) as Dimension[];
      if (!Array.isArray(parsedDims)) throw new Error('not an array');
    } catch {
      error = `${draft.size}: dimensions must be valid JSON (an array).`;
    }
    if (parsedDims && JSON.stringify(parsedDims) !== JSON.stringify(original.dimensions)) {
      patch.dimensions = parsedDims;
    }

    if (Object.keys(patch).length > 0) unitOverrides[draft.slug] = patch;
  }
  if (Object.keys(unitOverrides).length > 0) overrides.units = unitOverrides;

  if (JSON.stringify(faqs) !== JSON.stringify(base.faqs)) {
    overrides.faqs = faqs;
  }

  if (
    hero.heading !== base.homeCopy.hero.heading ||
    hero.sub !== base.homeCopy.hero.sub
  ) {
    overrides.homeCopy = { hero: { heading: hero.heading, sub: hero.sub } };
  }

  return { overrides, error };
}
