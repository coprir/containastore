# DISCREPANCIES

The live site at containastore.co.uk contradicts itself in several places. This
file records every conflict found during the 10 September 2026 content extraction,
the decision taken for the rebuild, and where it is implemented. **Every "Using"
value below needs the client to confirm before launch.**

| # | Item | Conflict on the live site | Decision (build with this) | Where it lives |
|---|------|---------------------------|----------------------------|----------------|
| 1 | 20ft price | Homepage card said **£120**; the 20ft page said **£115** | **RESOLVED 11 Sept 2026 — client confirmed £120 / month** (was built as £115 at launch) | `content/units.ts` → `20ft-storage.pricePerMonth` |
| 2 | "From" price | Hero says "from **£80**"; meta descriptions say "from **£75**"; cheapest confirmed unit is **£80** | **£80** — derived, not hard-coded: `fromPrice()` returns the lowest `pricePerMonth` across `units` | `content/units.ts` → `fromPrice()`, `src/lib/content.ts` → `getFromPrice()` |
| 3 | Contact email | `hello@containastore.co.uk` on most pages; `erica@containastore.co.uk` on the FAQ and hints pages | **hello@** — and it is read from the `CONTACT_EMAIL` env var, not committed | `.env.example`, `src/lib/env.ts`, `content/site.ts` → `contactEmail()` |
| 4 | Size range | Homepage sells **8 / 10 / 12 / 20**; About and Contact say **10 / 20 / 40**; FAQ says **8 / 20 / 40**; meta mentions **30** and **45** | List every size with a **confirmed price** (8, 10, 12, 20, 40) as full cards + detail pages, plus one **"contact us"** card covering **30ft / 45ft high cube** | `content/units.ts` → `units[]` + `enquiryOnlyUnits[]` |
| 5 | Container height | FAQ says **8ft high**; every other page and all external container dimensions say **8ft 6in** | **8ft 6in** everywhere | `content/units.ts` → `commonSpec.height`, `HEIGHT` |
| 6 | Refund terms | The 40ft page and the Contact page say unused **complete weeks** are refunded if you leave early; About and the other size pages do not mention it | **Include the weekly refund, flagged** as "please confirm current terms" — shown on the 40ft page note and the About page | `content/units.ts` → `40ft-storage.notes`, `content/pages.ts` → `aboutCopy.refundNote` |
| 7 | Facebook | Two different Facebook pages are linked from the live site | `https://www.facebook.com/profile.php?id=61579586157847` | `content/site.ts` → `social.facebook` |

## Content changes made since the launch build

- **40ft price** — changed from £170 to **£180 / month**, client-confirmed 11
  Sept 2026. (Not a source discrepancy — the live site only ever said £170; this
  is a straightforward price update.) `content/units.ts` → `40ft-storage.pricePerMonth`.
- **Anti-condensation spray — removed entirely**, client request 11 Sept 2026.
  It is no longer an offered service anywhere on the site: the `/conversions`
  page now covers weld-on lock boxes only, the homepage teaser and contact-form
  size options were updated to match, and all spray copy/prices were deleted
  from `content/conversions.ts`. The legacy URL `/conversions-condensation*`
  still 301s to `/conversions` (that redirect exists for old search rankings,
  independent of what the page now contains). If spray comes back later, the
  original copy is preserved in this file's git history (see the commit that
  removed it).

## Canonical host

The build brief said "verify bare and www hosts resolve to one canonical
origin" without saying which one wins. Originally built with the bare apex
(`containastore.co.uk`) as canonical. On 11 Sept 2026, while wiring up the real
domain in Vercel, `www.containastore.co.uk` ended up as the domain actually
connected to Production (it already had its own DNS target issued before the
apex was re-added), so the code was switched to match: **`www.containastore.co.uk`
is now canonical**, and the bare apex redirects into it (301, both at the Vercel
domain level and as an in-app fallback in `next.config.mjs`). `NEXT_PUBLIC_SITE_URL`
and `CANONICAL_HOST` reflect this. Flip it back by reversing both if preferred —
it's an equally reasonable choice either way, just needs to be one thing everywhere
(canonical tags, sitemap, JSON-LD, and the Vercel domain redirect direction).

## Other things to confirm (not strict contradictions)

- **Founded 2008** — appears only in a single meta description. **Not displayed
  anywhere** on the rebuilt site. Held in `content/site.ts` as
  `foundedUnconfirmed` for reference. Do not surface it until the client confirms.
- **8ft and 12ft dimensions** — the live site publishes none. The rebuild
  publishes none either; the spec table renders an honest "not published, contact
  us" note. Only 10ft, 20ft and 40ft have published dimensions.
- **30ft / 45ft high cube** — no price and no detail page on the live site. The
  rebuild shows a single "Contact us for pricing" card and nothing more.
- **Twitter/X** — `twitter.com/ContainastoreUK` is linked in the footer and used
  as the `twitter:site` handle. Confirm the account is still active.
- **Enquiry hours vs "site visits by appointment"** — enquiries 9am–6pm; site
  visits by appointment within those hours; container access 24/7 once allocated.
  This is consistent across the live site and is stated as-is.

## Imagery

There were no usable photographs of the yard or the containers to work from. The
container graphics on the site are **line illustrations drawn from the design
system** (`src/components/ui/ContainerFigure.tsx`) — deliberately diagrams, not
photos, so nothing misrepresents the actual premises. When the client supplies
real photos of the yard, containers, doors and lockboxes, drop them into
`public/` and swap the `<ContainerFigure>` usages on the storage pages and
homepage hero. The social-share image (`src/app/opengraph-image.tsx`) is
generated from text and the palette for the same reason.

## Legal placeholders

The privacy and cookie policy drafts contain `[SQUARE BRACKET]` tokens for every
fact only the client can supply (legal entity, ICO number, retention periods,
processor names, publication date). They render in a dashed red box on the page
so they cannot be missed. See `content/legal.ts`.
