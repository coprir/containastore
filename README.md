# Containastore Self Access Storage — website

Production rebuild of **containastore.co.uk** (previously on Netcetera Site
Builder). Next.js 15 (App Router) + TypeScript + Tailwind, statically generated.

---

## ⚠️ Read first — decisions the client must confirm

Everything in **[`DISCREPANCIES.md`](./DISCREPANCIES.md)** needs sign-off before
launch. The short version:

| Thing | Built with | Needs confirming |
|---|---|---|
| 20ft price | £120 / month | **confirmed** by client 11 Sept 2026 (was £115 at launch build) |
| 40ft price | £180 / month | **confirmed** by client 11 Sept 2026 (was £170 at launch build) |
| "From" price | £80 (lowest confirmed unit) | meta says £75 |
| Contact email | `hello@` (from `CONTACT_EMAIL`) | FAQ/hints pages say `erica@` |
| 30ft / 45ft | "Contact us for pricing" card, no page | no price on live site |
| 8ft & 12ft dimensions | none published | live site publishes none |
| Weekly refund on early exit | shown, flagged "confirm terms" | only on 40ft + contact pages |
| "Founded 2008" | **not shown anywhere** | only in one meta description |
| Facebook URL | `profile.php?id=61579586157847` | two different pages linked |

Also: the **privacy and cookie policies are drafts** with `[SQUARE BRACKET]`
placeholders (legal entity, ICO number, retention periods, processor names,
publication date). They render in dashed red boxes on the page. They are not
legal advice and need review.

---

## Local development

```bash
npm install
cp .env.example .env.local   # fill in what you need (all optional for dev)
npm run dev                   # http://localhost:3850
```

Other scripts: `npm run build`, `npm run start`, `npm run typecheck`, `npm run lint`.

---

## Environment variables

All configuration and every secret comes from env vars — nothing sensitive is in
source. See [`.env.example`](./.env.example) for the annotated list.

| Var | Purpose | If unset |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical origin for canonical tags, sitemap, OG | defaults to `https://containastore.co.uk` |
| `CANONICAL_HOST` | bare host; used to 301 the `www` host | `containastore.co.uk` |
| `CONTACT_EMAIL` | public contact address shown on the site | `hello@containastore.co.uk` |
| `FORM_ENDPOINT` | where the enquiry form POSTs (see below) | **form runs the honest fallback** |
| `FORM_RECIPIENT_EMAIL` | address the enquiry is delivered to | falls back to `CONTACT_EMAIL` |
| `FORM_TOKEN` | optional shared secret sent as `x-form-token` | not sent |
| `ADMIN_PASSWORD` | password for `/admin` | **`/admin` is disabled (404)** |
| `ADMIN_SESSION_SECRET` | signs the admin session cookie (any long random string) | `/admin` disabled |

---

## The enquiry form

`POST /api/enquiry` validates server-side, applies a honeypot + a small
per-instance rate limit, then:

- **`FORM_ENDPOINT` set** → forwards JSON `{ name, email, phone, size, startDate,
  message, _recipient, _subject }` to that URL. Any service that accepts a JSON
  POST works — e.g. [Web3Forms](https://web3forms.com),
  [Formspree](https://formspree.io) (use the JSON endpoint), or a small Cloud
  function that sends via the client's mailbox.
- **`FORM_ENDPOINT` unset** → the form still validates the input and then shows
  the phone number and email instead of pretending to send. Nothing is lost
  silently. The contact page shows a small notice in this state.

The form tells users replies occasionally land in spam/junk (the live site says
this).

---

## Admin (`/admin`)

Minimal, password-protected editor for prices, availability, unit descriptions,
unit dimensions, FAQs (add / edit / delete / reorder) and the homepage hero.
Contact details and company info are deliberately **not** runtime-editable (a typo
must not be able to take the phone number offline) — edit `content/site.ts` for
those.

Edits are written to `data/overrides.json` and deep-merged over the built-in
content by `src/lib/content.ts`. Public pages use `revalidate = 300`, so a change
appears within 5 minutes on a long-running host.

**On a read-only serverless host (Vercel), the overrides file cannot be written
at runtime.** The admin detects the failed write and tells you to use the
**Export JSON** button, then commit the JSON to `data/overrides.json` and
redeploy. If the client needs live editing on Vercel, back the overrides with a
KV/database store (swap the `readOverrides` / `writeOverrides` implementation in
`src/lib/content.ts`) — everything else stays the same.

To disable admin entirely, leave `ADMIN_PASSWORD` unset.

---

## Content layer

Prices and copy live in `content/` so the client's numbers change without
touching a component:

```
content/site.ts         business facts, address, phone, areas, security, socials
content/units.ts         storage units + dimensions + rental terms + fromPrice()
content/conversions.ts   lock box conversion prices and copy
content/faq.ts           the 8 FAQs
content/pages.ts         homepage / about / hints-and-tips editorial copy
content/legal.ts         privacy + cookie policy drafts (with [PLACEHOLDERS])
```

Components read through `src/lib/content.ts` (base + admin overrides merged),
never the raw files.

---

## Redirects

All legacy URLs 301 (a real 301, not 308 — `next.config.mjs` uses an explicit
`statusCode: 301` rather than Next's `permanent: true`). Verify after deploy:

```bash
curl -sI https://containastore.co.uk/about-ushtml        | grep -i location   # -> /about
curl -sI https://containastore.co.uk/20ft-Self-Storage-Container | grep -i location
curl -sI https://www.containastore.co.uk/                 | grep -iE 'HTTP|location'
```

Confirm the bare host and `www` both resolve to one canonical origin (the config
301s `www.` → bare; set the opposite in your host/DNS if the client prefers
`www`, and update `CANONICAL_HOST`).

---

## Deployment

The app needs a Node server for `/api/enquiry`, `/admin` and middleware — it is
**not** a pure static export.

### Option A — Vercel (simplest)

1. Push this repo to GitHub and import it in Vercel (framework auto-detected).
2. Project → Settings → Environment Variables: add the vars from the table above.
   At minimum set `NEXT_PUBLIC_SITE_URL`, `CANONICAL_HOST`, `CONTACT_EMAIL`, and
   the `FORM_*` vars once a mail endpoint is chosen. Add `ADMIN_PASSWORD` +
   `ADMIN_SESSION_SECRET` only if the client wants the admin.
3. Add the domain `containastore.co.uk` (and `www`) in Vercel → Domains, and
   point DNS as Vercel instructs (A / CNAME).
4. Deploy. Then run the redirect checks above.
5. Submit `https://containastore.co.uk/sitemap.xml` in Google Search Console and
   keep the old property until rankings migrate.

Note: admin edits on Vercel are export-and-commit (see Admin section).

### Option B — Node host (Railway, Render, a VPS)

```bash
npm ci
npm run build
npm run start        # serves on port 3850 (respects $PORT if your host sets it)
```

Set the same environment variables in the host's dashboard. On this kind of host
the `/admin` editor writes `data/overrides.json` directly and changes go live
within 5 minutes — make sure `data/` is on a **persistent** volume if the host
uses ephemeral storage.

### Build output

`npm run build` currently produces 23 routes: 9 content pages, 5 storage detail
pages, 404, sitemap, robots, 3 API routes, admin + admin login. All content
pages are static (ISR, 5-minute revalidate).

---

## Pre-launch checklist

- [ ] Every row in `DISCREPANCIES.md` confirmed by the client
- [ ] **Privacy policy decision** — currently removed from the site (12 Sept
      2026, client request); see `DISCREPANCIES.md` for the compliance risk
      this creates. Resolve before the enquiry form collects real customer data.
- [ ] Cookie policy `[PLACEHOLDERS]` filled in and legally reviewed
- [ ] `FORM_ENDPOINT` + `FORM_RECIPIENT_EMAIL` set and a test enquiry received
- [ ] `CONTACT_EMAIL` verified (`hello@` vs `erica@`)
- [ ] All env vars set in the host
- [ ] Domain + `www` both resolve to one origin; redirect spot-checks pass
- [ ] `sitemap.xml` submitted to Search Console
- [ ] Decide whether `/admin` is enabled in production
```
