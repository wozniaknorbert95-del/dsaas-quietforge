# Handoff — Conversion Audit Plan Implementation (2026-08-30)

**Repo:** dsaas-quietforge (quietforge.flexgrafik.nl) · **Build:** `npm run build` ✅ (55 pages) · **Not deployed** (manual Vercel step remains)

## Cel / Goal

Implement the conversion audit plan (`quietforge_conversion_audit_plan_480f73c1.plan.md`) end-to-end: GDPR/consent P0, proof P0, price-sync P0, home restructure P1, funnel analytics P1, security/SEO P1, and P2 experiments (WhatsApp prefill, reference program, blog post).

## Co zrobiono / What changed

**P0 — GDPR (w1-p0-gdpr)**
- Consent Mode v2: `gtag('consent','default', denied)` queued before gtag.js; stored `granted` decision restored on return visits.
- New `CookieConsent` banner (Accept analytics / Essential only) in root layout; decision in `localStorage qf_consent_v1`.
- Required GDPR consent checkbox in the intake form (client + server-side guard in `/api/intake`, `CONSENT_REQUIRED`).
- `/legal/` rewritten: removed stale Calendly reference, added Company (KVK 89057554), Cookie Policy (`#cookies`), DPA (`#dpa`), retention.

**P0 — Proof (w1-proof)**
- `/book-a-scan/`: 3 "What you get" bullets + sample-scan PDF link (`/artefacts/automation-map-sample.pdf`) + credit + no-pressure line.
- Sample link also added to home final CTA and `/pricing/` scan card.

**P0 — Price sync (w1-docs)**
- `conversion-pipeline.md` + `site-map.md`: Automation Map €290 → €690 (credited), Care €290/mo → €300/mo, flow/pricing copy aligned with `pricing.ts`.

**P1 — Home (w2-home)**
- Hero CTA band moved directly after subline (above fold on mobile); PAS/anti/proof strip/chip moved below.
- `IntentSystems` `home` prop: default shows 4 flagship systems (Quote & Order, Inbox Triage, Company Brain, AI Security Audit) + "See all 9 systems →"; intent chips still route the full catalog.
- Variants renamed: Build ESSENTIAL/SYSTEM/AUTONOMOUS → **Core / Scale / Command**; Care CARE/GROW/AUTONOMY → **Keep / Grow / Unlock** (all surfaces incl. pricing metadata).
- Counter reframed: kicker "Hours returned · verified by clients", "first verified client case opens the count", reference-program spots tracker (`referenceSpotsOpen`).
- Copy batch: positioning label → "Conversion systems architect", proofChip → "Human-reviewed · security-scanned · gated by you", FAQ "Straight answers", CTAS "Explore the systems", About "your systems architect", approach H2.
- `site-map.md` §3 rewritten to live home order v7.0 (anti-chaos rule satisfied — `page.tsx` changed).

**P1 — Analytics (w3-analytics)**
- Events added: `form_error` (consent_missing/send_failed/network_error), `sample_scan_download`, `payment_link_click`, `system_page_view` (slug), `whatsapp_prefill_selected`.
- WhatsApp URLs UTM-tagged (`utm_source=quietforge&utm_medium=website&utm_campaign=automation-scan&utm_content=…`).
- `cta_whatsapp_click` wired to hero + final CTA via `WhatsAppLink`.
- `conversion-pipeline.md` §10 updated: full event table + funnel + Looker Studio dashboard spec (7 cards). **Dashboard itself requires Commander to build in Looker Studio.**

**P1 — Tech/SEO (w3-tech)**
- Security headers in `next.config.ts`: CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy (verified live on local prod).
- JSON-LD: FAQPage (home), Service + Offer (every `/systems/[slug]`), Person jobTitle updated to architect positioning.
- CWV/a11y audit: global `prefers-reduced-motion` + `:focus-visible` present; verified 1×H1 + nav/main/footer on 7 key routes.

**P2 — Experiments (w4-experiments)**
- WhatsApp prefill A/B: `WhatsAppPainPicker` on `/book-a-scan/` (4 leak chips → personalized "My biggest time leak is…" prefill; no pick = control). Measured via `payment_link_click` with/without `leak`.
- Reference program started: spots tracker live on home counter + `/proof/`; home CTA now "Apply — 5 spots open, scan from €0".
- New blog post `quote-to-order-automation.mdx` (pain phrase "quote-to-order automation SMB"), registered in blog index + post registry + sitemap (27 routes).

## Pliki / Files

| File | Action |
|------|--------|
| `src/components/analytics/CookieConsent.tsx` | new |
| `src/components/analytics/SampleScanLink.tsx` | new |
| `src/components/analytics/WhatsAppLink.tsx` | new |
| `src/components/analytics/WhatsAppPainPicker.tsx` | new |
| `src/app/blog/posts/quote-to-order-automation.mdx` | new |
| `src/lib/gtag.ts`, `src/types/gtag.d.ts` | update (consent API) |
| `src/lib/analytics.ts`, `src/lib/constants.ts` | update (events, UTM, WhatsApp builder) |
| `src/components/analytics/GoogleAnalytics.tsx` | update (consent defaults) |
| `src/app/layout.tsx` | update (banner, Person jobTitle) |
| `src/app/legal/page.tsx` | rewrite (DPA/cookies/company) |
| `src/app/book-a-scan/page.tsx` | update (bullets, sample, picker) |
| `src/app/book-discovery/BookDiscoveryForm.tsx` | update (consent checkbox, form_error) |
| `src/app/api/intake/route.ts` | update (server consent guard) |
| `src/app/page.tsx` | update (hero order, counter, variants, FAQ/About copy, JSON-LD) |
| `src/components/v2/IntentSystems.tsx` | update (flagships mode) |
| `src/content/conversion-copy.ts`, `src/content/hours-counter.ts` | update (variants, positioning, reference spots) |
| `src/app/pricing/page.tsx`, `src/app/proof/page.tsx`, `src/app/systems/[slug]/page.tsx`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx` | update |
| `next.config.ts` | update (security headers) |
| `scripts/generate-sitemap.mjs`, `public/sitemap.xml` | update (27 routes) |
| `docs/strategy/conversion-pipeline.md`, `docs/strategy/site-map.md` | update (price sync §8, analytics §10, home §3) |

## Weryfikacja / Verification

```bash
npm run typecheck   # pass
npm run build       # pass (55 pages, 27 sitemap routes)
# local prod smoke (next start):
#   security headers 5/5 present
#   JSON-LD: home FAQPage ✓ · system Service+Offer ✓
#   H1 audit: 1×H1 + nav/main/footer on /, /systems/, /pricing/, /book-a-scan/, /proof/, /security/, /about/
#   book-a-scan: sample link + consent checkbox + pain picker ✓
```

## Diagram audit (dodane po planie)

- **Problem:** 6 z 9 diagramów (`public/systems/*.svg`) zawierało znak kontrolny U+0014 zamiast em-dasha (`—`) → renderowało się jako tofu w przeglądarce. Dodatkowo `owner-cockpit` miał `’` zamiast `→` („Propose → you click"), a `publishing-gate` backticki zamiast `·` („price · site · PDF").
- **Naprawa:** wszystkie 6 plików przepisane z poprawnym UTF-8; skrypt naprawczy `scripts/fix-flow-svgs.cjs` (idempotentny, do ponownego użycia).
- **Weryfikacja:** 9/9 SVG — 200 na produkcji, zero znaków kontrolnych/U+FFFD, em-dash obecny; wizualnie potwierdzone w przeglądarce (naturalWidth 1200).

## Post-deploy smoke (wykonany 2026-08-30 ✅)

Deploy: `npx vercel --prod --project flexgrafik-services --yes` → `dpl_Hi6FJHDuhNBcJyCB1LRwL9CzZf26`, **READY**, alias `services.flexgrafik.nl` (live `quietforge.flexgrafik.nl`).

1. ✅ `npm run build` pass (56 pages, 27 sitemap routes).
2. ✅ Nagłówki: CSP, XCTO, XFO, Referrer-Policy, Permissions-Policy, HSTS — wszystkie obecne.
3. ✅ Diagramy systemów: 9/9 SVG 200, czyste, poprawnie renderowane.
4. ✅ `/book-a-scan/`, `/pricing/`, `/blog/quote-to-order-automation/`, `/sitemap.xml` → 200.
5. ⏳ Dowódca: Rich Results Test (FAQPage + Service/Offer) + smoke na telefonie (mobile fold, cookie banner).

## Następny krok / Next steps

- **Looker Studio dashboard** — build per `conversion-pipeline.md` §10.3 (7 kart), GA4 connector, weekly email.
- Deploy wykonany 2026-08-30 (zgoda Dowódcy). Kolejne buildy: `npx vercel --prod --project flexgrafik-services --yes`.
- Zbudować dashboard, mierzyć baseline konwersji skanu; po baseline → testy P3 (ceny, B-8 sticky timing).
- Ewentualne A/B: rozszerzyć pain-picker o `reporting`/`other` po pierwszych danych.
