# SEO Audit — Status

**Project:** Rhône Sécu Protection (RSP)  ·  **Type:** vitrine / local business  ·  **Stack:** Next.js 15 static export (`out/`)
**Build:** ✅ passing — 22 HTML files (21 pages + 404)  ·  **Last updated:** 2026-10-22

## ▶ Overall: ✅ COMPLETE (technical)
Every in-repo phase is done and re-verified on the build. Launch blockers remain (see bottom).

## Phases
| # | Phase | Status | Result / note |
|---|-------|:------:|---------------|
| 0  | Build & inventory                     | ✅ | 21 pages, 19 indexable (404 + mentions légales are `noindex`) |
| 1  | Per-page meta                         | ✅ | Titles 40–60 chars, unique. **Fixed 5 descriptions** (home 161, contact 179, services 166, SSIAP 167, zones 103) → 144–152. 1 H1, canonical, OG, `lang="fr-FR"` everywhere |
| 1b | On-page targeting & internal linking  | ⚠️ | Title/H1 match `research/01-brief-architecture-seo.md` on every page. `/zones-intervention/` no longer targets city queries (Villeurbanne, Vénissieux…) since the client asked for "Lyon et partout en France" only |
| 2  | Structured data (JSON-LD)             | ✅ | 68 blocks, 0 errors: Organization, WebSite, Service ×7, Article ×5, FAQPage ×13, BreadcrumbList ×19, ItemList ×2. `areaServed` = Lyon + France |
| 2c | GEO / LLM                             | ✅ | `llms.txt` updated (zone = Lyon et partout en France); AI crawlers explicitly allowed in robots.txt |
| 3  | Sitemap + robots                      | ✅ | 19 URLs = the 19 indexable pages; robots has absolute `Sitemap:` |
| 4  | OG share image                        | ✅ | `/brand/og-default.jpg` exists (1200×630) |
| 5  | Page weight / DOM size                | ✅ | Home ≈ 590 elements, 106 KB raw / 18 KB gzip |
| 6  | Images                                | ✅ | **Fixed:** photos were served at full size (unoptimized export). Added 640/960 px variants + custom `next/image` loader (`src/lib/image-loader.ts`) → real `srcset`. Hero kept full size (cover, portrait on mobile) + `fetchPriority="high"` |
| 7  | Lighthouse                            | ✅ | See scores. **Fixed** `label-content-name-mismatch` on the header logo link |
| 8  | Launch checklist + report             | ⚠️ | Operational items below can't be closed in-repo |

## Scores (Lighthouse 12, mobile, lab — local server with gzip)
| Page | Perf | A11y | Best Pr. | SEO | LCP | CLS |
|------|:----:|:----:|:--------:|:---:|:---:|:---:|
| home | 94–97 | 100 | 100 | 100 | 2.6–3.0 s | 0.03 |
| /services/securite-incendie-ssiap/ | 96 | 100 | 100 | 100 | 2.7 s | 0.02 |
| /zones-intervention/ | 99 | 100 | 100 | 100 | 2.0 s | 0 |

Home image waste: 474 KiB → 242 KiB (the remainder is the full-size hero, kept on purpose).

## Schema validation
`validate-schema.mjs` (pointed at `out/`): 68 blocks, 0 errors. Notices only: no validator for WebSite/Service; FAQ rich results limited by Google to gov/health sites.

## Blockers / open items (not closeable in-repo)
- [ ] Real domain → `site.baseUrl` (canonicals, sitemap, JSON-LD all depend on it); today the site lives on gardinage.vercel.app
- [ ] Mentions légales: legal form + capital, RCS, director of publication, host
- [ ] Street address → would switch JSON-LD to `ProfessionalService` and enable a Google Business Profile (biggest local-SEO lever)
- [ ] Google Search Console: verify property, submit sitemap, request indexing of home + service pages
- [ ] Rich Results Test on the live URL
- [ ] Real photos to replace the CC0 illustrations

## Verdict
Technical audit complete; not launched. Remaining items are client data and post-launch setup.
