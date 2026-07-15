# skooped-marketing — skooped.io marketing site

Vite + React + TypeScript + Tailwind + shadcn/ui. **Deploys to skooped.io from `main` via Vercel,
automatically.** There is no working local/preview path for in-browser checks here (the dev server and
Vercel preview deploys aren't reachable for visual verification) — **verify on public prod after deploy,
fix-forward.** Not a Lovable project; edits are direct-to-repo.

## ⚠ REDIRECT DISCIPLINE — read before changing any URL

**Changing or removing a live URL slug requires a 301 redirect, shipped in the same change.** Renaming a
slug without one throws away that URL's Google ranking and 404s its backlinks; resubmitting the sitemap
does **not** fix this — only the 301 carries the equity.

- **Content edits are free** (copy, price, FAQ, sections, meta) — no redirect, no SEO cost. Edit freely.
- **Renaming/removing a live slug** → add a `301` to **`vercel.json`** (`redirects` array runs before the
  SPA `rewrites` catch-all; `"permanent": true` = 301), update **`public/sitemap.xml`**, and update internal
  links. A React `<Navigate>` is a 200+JS redirect, **not** an SEO 301 — don't use it for indexed URLs.
- **Exception:** a brand-new, not-yet-indexed page (no inbound links) has nothing to carry — a same-day
  slug change is safe. When unsure, add the redirect anyway.
- Full procedure + verification steps: **`../skooped/SEO-REDIRECT-SOP-2026-07.md`** (HQ repo).

Whenever you rename or delete a slug/route, say so explicitly and add the redirect in the same PR.

## Where things live
- **Pricing / menu content:** `src/data/menuItems.ts` (the 10 `/plans/:slug` detail pages) and
  `src/data/industryTemplates.ts` (the `/templates/:slug` pages). Both mirror the price grid in the HQ repo's
  `GROWTH-PLAN-2026-07.md §2` — keep them in sync when prices or deliverables change.
- **Routes:** `src/App.tsx` (custom routes must sit above the catch-all `*`).
- **Sitemap:** `public/sitemap.xml` (add every new public route here).
- **SEO per page:** `usePageSeo` hook sets title/description/canonical; `MenuItem.tsx` also injects
  Product/FAQPage/BreadcrumbList JSON-LD.

## Conventions
- Typecheck + build before shipping: `npx tsc --noEmit -p tsconfig.app.json && npm run build`.
- Commit messages end with: `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.
