# SESSION-ANCHOR — Live Session Pointer

**Updated:** 2026-09-05 · **Status:** LOCAL IMPLEMENTATION COMPLETE, NOT DEPLOYED · 57 pages, sitemap 28 routes

**Canon:** `docs/strategy/site-map.md` §3 v7.0 (home order live + STEPS synced) · `docs/strategy/conversion-pipeline.md` v3.0 (ceny €690, eventy §10)

**Handoff:** [`handoffs/2026-08-30-home-stale-data-sync.md`](handoffs/2026-08-30-home-stale-data-sync.md)

**Current handoff:** [`handoffs/2026-09-05-builder-lab-implementation.md`](handoffs/2026-09-05-builder-lab-implementation.md)

## Builder's Lab implementation (2026-09-05)

- Added canonical `/lab/` Builder's Lab route for the owner-operated FlexGrafik reference business and build laboratory.
- Added nine-stage build timeline, public test bench, private-reference states, system connection path, dSaaS platform chapter and ownership/handover wording.
- Added `src/content/lab.ts` as the dedicated Lab content source; no repository is presented as public proof unless its URL and visibility are confirmed.
- Removed public operational screenshots with token fields, local paths or tenant context; replaced them with sanitized reference art and neutral high-level diagrams.
- Removed public Mission Control/API health links and sanitized old architecture copy before release review.
- Updated active canon R7, route map, conversion pipeline, footer/About/Proof entry points and legacy `/results/owner-ecosystem/` redirect target.
- Added `/og/lab.svg`, sitemap entry and `audit:lab` smoke test.
- FlexGrafik language now separates the active business from the build laboratory; `LAB: PAUSED` is no longer used as the business status.

**Verification:** `npm run typecheck` ✅ · `npm run build` ✅ (57 pages) · targeted changed-file ESLint ✅ · `npm run audit:lab` ✅ (9 stages, mobile no overflow, console errors 0) · sensitive legacy assets 404 ✅ · sanitized fallback 200 ✅.

**Known baseline:** `npm run lint` passes with 10 non-blocking warnings in archive/legacy scripts and image/script guidance. The navigation and menu-footer audits were updated to the active canon and pass against the local production server. Next dev still reports the existing Tailwind CSS parser warning around generated `var(--qf-fs-*)`; production build/server are clean.

## CO

Zaimplementowano plan optymalizacji konwersji (audyt 2026-08-30) — wszystkie 7 todos:
- **P0 GDPR:** Consent Mode v2 + banner cookie + checkbox zgody (client+server) + /legal/ (DPA, cookies, company, retention, usunięty Calendly).
- **P0 Proof:** próbka raportu PDF + 3 bullety „what you get" + credit line na /book-a-scan/ (oraz pricing + final CTA).
- **P0 Docs:** sync €290 → €690 w conversion-pipeline + site-map; Care €300/mo.
- **P1 Home:** hero CTA w 1. viewporcie (mobile), 4 flagowce + „See all 9 systems", rename wariantów Core/Scale/Command + Keep/Grow/Unlock, framing licznika + spots tracker.
- **P1 Analytics:** eventy form_error/payment_link_click/sample_scan_download/system_page_view/whatsapp_prefill_selected, UTM na WhatsApp, spec dashboardu Looker Studio (§10.3).
- **P1 Tech:** security headers (CSP/XCTO/XFO/Referrer/Permissions) + JSON-LD (FAQPage home, Service/Offer systemy).
- **P2:** A/B WhatsApp pain-picker, start programu referencyjnego (5 spots tracker), wpis blogowy `quote-to-order-automation`.

**Audyt diagramów + deploy:**
- **Wykryto:** 6 z 9 diagramów systemów miało uszkodzony em-dash (U+0014 zamiast `—` → tofu w przeglądarce); `owner-cockpit` miał `’` zamiast `→`, `publishing-gate` backticks zamiast `·`.
- **Naprawa:** wszystkie 9 SVG czyste (em-dash `—`, brak znaków kontrolnych); skrypt naprawczy `scripts/fix-flow-svgs.cjs`.
- **Weryfikacja:** build ✅ (56 stron), 9/9 SVG 200 na produkcji bez znaków kontrolnych, nagłówki security aktywne.

**Rebuild /approach/ do standardu premium (bieżąca sesja):**
- Płaska lista 5 kroków → pełna strona konwersyjna uzasadniająca €690: hero (breadcrumb, badge, H1, meta, dual CTA), timeline „Day 0 pre-work → Day 1–2 session → Day 3–4 report", anatomia raportu (5 kart), porównanie kategoriami (free audit / generic consultant / doing nothing — MR-16, bez nazw firm), 4 źródłowane metryki (Amex 11 h/tydz., KfW 15 h/mies., Knab €81/h, 2× admin vs selling), build path 4 kroki, FAQ 6 pytań, final CTA z risk reversal.
- Metadata title bez duplikatu; nowy OG `/og/approach.svg` (1200×630, czyste UTF-8).
- Nowe klasy CSS `.qf-approach-*` / `.qf-tl-*` / `.qf-compare-*` / `.qf-metric-*` (gridy desktop → 1 kol. mobile).
- **Artefakty PDF (bug 404):** linki w constants wskazywały na nieistniejące `.pdf` (były tylko `.md`) → wygenerowano 13 PDF-ów (`npm run generate:artefacts`), wszystkie 200 `application/pdf`. Sample report ulepszony z szablonu `[brackets]` → realny deliverable (fikcyjna firma, jawnie oznaczone Illustration, pełna struktura raportu).
- **Runbook:** `docs/operations/runbooks/scan-delivery-runbook.md` — SOP dostarczenia scanu, twardy budżet €276/scan (typowy ~€100–140), zero-AI-slop gate.

**Home stale data sync (2026-08-30):**
- **STEPS §Approach:** Step 1 → „Scan — pre-work, a 90-minute session, and a written go/no-go in 2 days." + lead „a decision, not a sales call" (spójne z /approach/).
- **Footer:** `FOOTER.portfolioLink` „How we work →" → „Approach →"; badge kategorii na /approach/ i /security/ → „Approach".
- **OG home.svg:** „Living Operating System - 8 repos - governance-first" → „Systems that give you back your time · you approve · you own the repo" (czyste UTF-8).
- **Stawki:** adnotacja w /approach/ — €80/h = conservative scenario (Knab €81/h), public methodology = €40/h (licznik i /proof/ bez zmian).
- **Docs:** marketing-strategy.md §8 €290→€690 + „Automation Map"→„Automation Scan" (4 wystąpienia) + ui-ux-principles.md button €690; canon site-map §Home eyebrow → „Conversion systems architect for small businesses · EU".
- **Dead cleanup:** usunięto 12 martwych komponentów home (PainGrid, IntentRouter, JadziaSpearhead, VcmsTrustStrip, WizardVisualizerCompact, WhyItWorks, FinalCtaBand, DualBrandBand, FeaturedStrip, TrustAndObjections, SpearheadSpotlight, IntentFilterChips) + martwy sections/Pricing.tsx; z conversion-copy.ts usunięto 11 nieużywanych exportów (WHY_THIS_WORKS_PILLARS, OBJECTIONS, JADZIA_SPEARHEAD, VCMS_STRIP, WIZARD_VISUALIZER, SPEARHEAD, WHY_IT_WORKS, FINAL_CTA, PRICING_SECTION, DUAL_BRAND, FEATURED_STRIP).
- **Weryfikacja:** typecheck ✅ · build ✅ (56 stron) · smoke local + production ✅ · deploy Vercel prod dpl_297F8gPxYsqZjMDoepVDCfjNrYc8.

**Dead-code cleanup II (2026-08-30, kompleksowy):**
- **Komponenty:** usunięto ostatnie 6 martwych plików (HeroSection, HomeIntentBoundary, BuiltVsPlanned, HowIWork, IntentFilterSticky, layout/SectionProgress) — razem z poprzednią sesją wszystkie martwe home/layout komponenty usunięte.
- **Exporty content:** usunięto martwe `HOME_SECTIONS` + `HOME_SECTION_MARKERS`, `INTENT_ROUTER_HEADER`, `PAIN_GRID` + `PAIN_GRID_HEADER` + `PainCard`, `getHomeRepos` (ecosystem.ts); `HOME_ROW_KEYS`, `getHomeReadinessRows`, `readinessStatusClass` (readiness.ts); `HomeIntentProvider`, `matchesHomeIntent`, storage helpers (home-intent.tsx — zostaje `useHomeIntent` z fallbackiem, używany przez SystemMetrics).
- **CSS:** usunięto martwe bloki z globals.css — `qf-dual-brand-*`, `qf-featured-*`, `qf-intent-sticky-*`, `qf-pain-*`, `qf-module-*`, `qf-spearhead-*`, `qf-wizard-viz-*`, `qf-why-*`, `qf-pricing-featured/badge` (zachowano `qf-book-hero-cta`/`qf-book-fast-path` używane przez /book-a-scan/ i `qf-final-cta*`). ~13,7 kB CSS mniej.
- **Canon:** `docs/canon/site-map.md` §Home order zweryfikowany 1:1 z live page.tsx (Hero→Counter→Systems→Approach→Fit→Discipline→Proof→About→Pricing→FAQ→CTA).
- **Notka:** `quietforge.css` (root) to legacy nieimportowany nigdzie — zostawiony, do decyzji Dowódcy.
- **Weryfikacja:** typecheck ✅ · build ✅ (56 stron) · lint: 3 błędy pre-existing (CookieConsent.tsx react-hooks/set-state-in-effect, fix-flow-svgs.cjs require) — poza zakresem tej sesji.

Public offer: Scan €690 credited · Core €2,500 / Scale €4,500* / Command €7,900 · Keep €300 / Grow €600* / Unlock €1,000/mo.

## DECYZJE (veta Dowódcy)

D1 eyebrow hero = lock („Conversion systems architect…”); D2 slots+#reference współistnieją; D3 Blog w footerze; D4 bez portretu; D5 KVK 89057554; OG ośmiornica = decyzja otwarta.

## NASTĘPNY KROK

1. **Dowódca: post-deploy smoke** — home (nowy step 1 + footer „Approach →"), /approach/ (adnotacja stawek), OG home.svg w social post inspector.
2. **Looker Studio dashboard** — zbudować wg `conversion-pipeline.md` §10.3 (7 kart, GA4 connector).
3. Decyzja: sample report (fikcyjna firma, Illustration) zostaje jawnie publiczny czy PDF tylko na żądanie.
4. Po baseline: testy P3 (A/B cen, B-8 sticky timing, B-1 /pl/ decyzja strategiczna).
5. Luka globalna: brak canonical na wszystkich routes (SEO fix w osobnej sesji).
6. Decyzja o usunięciu artefaktu projektu Vercel `dsaas-quietforge` (błędny projekt z pierwszego deployu).

---

*Maintainer: update at end of every session*
