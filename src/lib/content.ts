/**
 * Server-only content access. Reads the base content layer and merges any admin
 * overrides from data/overrides.json on top. Every page and component should read
 * content through the functions here so an admin edit is reflected everywhere.
 *
 * Notes on persistence: on a long-running Node host (e.g. Railway) admin edits
 * take effect on the next page revalidation. On a read-only serverless host
 * (e.g. Vercel) the overrides file is not writable at runtime — see README.
 */
import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';

import { site as baseSite, type SiteContent, contactEmail } from '@content/site';
import {
  units as baseUnits,
  enquiryOnlyUnits,
  rentalTerms,
  commonSpec,
  fromPrice,
  type StorageUnit,
} from '@content/units';
import { faqs as baseFaqs, type Faq } from '@content/faq';
import { conversionServices, conversionCopy } from '@content/conversions';
import { homeCopy as baseHomeCopy, aboutCopy, hintsAndTips } from '@content/pages';
import { privacyPolicy, cookiePolicy } from '@content/legal';

const OVERRIDES_PATH = path.join(process.cwd(), 'data', 'overrides.json');

export interface ContentOverrides {
  site?: DeepPartial<SiteContent>;
  units?: Record<string, Partial<StorageUnit>>;
  faqs?: Faq[];
  homeCopy?: DeepPartial<typeof baseHomeCopy>;
}

type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function deepMerge<T>(base: T, patch: unknown): T {
  if (!isObject(patch)) return base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined) continue;
    const current = out[key];
    out[key] = isObject(current) && isObject(value) ? deepMerge(current, value) : value;
  }
  return out as T;
}

let cache: { mtimeMs: number; data: ContentOverrides } | null = null;

export async function readOverrides(): Promise<ContentOverrides> {
  try {
    const stat = await fs.stat(OVERRIDES_PATH);
    if (cache && cache.mtimeMs === stat.mtimeMs) return cache.data;
    const raw = await fs.readFile(OVERRIDES_PATH, 'utf8');
    const data = JSON.parse(raw) as ContentOverrides;
    cache = { mtimeMs: stat.mtimeMs, data };
    return data;
  } catch {
    return {};
  }
}

export async function writeOverrides(next: ContentOverrides): Promise<void> {
  await fs.mkdir(path.dirname(OVERRIDES_PATH), { recursive: true });
  await fs.writeFile(OVERRIDES_PATH, JSON.stringify(next, null, 2), 'utf8');
  cache = null;
}

/* ---- Merged getters ------------------------------------------------------- */

export async function getSite(): Promise<SiteContent> {
  const o = await readOverrides();
  return deepMerge(baseSite, o.site);
}

export async function getUnits(): Promise<StorageUnit[]> {
  const o = await readOverrides();
  if (!o.units) return baseUnits;
  return baseUnits.map((u) => (o.units?.[u.slug] ? { ...u, ...o.units[u.slug] } : u));
}

export async function getUnit(slug: string): Promise<StorageUnit | undefined> {
  return (await getUnits()).find((u) => u.slug === slug);
}

export async function getFaqs(): Promise<Faq[]> {
  const o = await readOverrides();
  return o.faqs && o.faqs.length > 0 ? o.faqs : baseFaqs;
}

export async function getHomeCopy(): Promise<typeof baseHomeCopy> {
  const o = await readOverrides();
  return deepMerge(baseHomeCopy, o.homeCopy);
}

export async function getFromPrice(): Promise<number> {
  const units = await getUnits();
  const priced = units
    .map((u) => u.pricePerMonth)
    .filter((p): p is number => typeof p === 'number');
  return priced.length ? Math.min(...priced) : fromPrice();
}

/* ---- Pass-through (no overrides) ---------------------------------------- */
export {
  enquiryOnlyUnits,
  rentalTerms,
  commonSpec,
  aboutCopy,
  hintsAndTips,
  conversionServices,
  conversionCopy,
  privacyPolicy,
  cookiePolicy,
  contactEmail,
};
