# Handoff — Home stale data sync (2026-08-30)

## Cel

Synchronizacja strony głównej z aktualnym procesem scanu z `/approach/` (pre-work + 60–90 min sesja + pisemny go/no-go w 2 dni), poprawka etykiety footera, nowy OG home.svg, adnotacja stawek (€40/h public methodology vs €80/h conservative), sync dokumentów cenowych (€290 → €690) oraz czyszczenie martwych komponentów i nieużywanych exportów.

## Zmienione pliki

| Plik | Zmiana |
|---|---|
| `src/app/page.tsx` | STEPS §Approach: step 1 → „Scan — pre-work, a 90-minute session, and a written go/no-go in 2 days." + lead „a decision, not a sales call" |
| `src/content/conversion-copy.ts` | `FOOTER.portfolioLink` → „Approach →"; usunięto 11 nieużywanych exportów (WHY_THIS_WORKS_PILLARS, OBJECTIONS, JADZIA_SPEARHEAD, VCMS_STRIP, WIZARD_VISUALIZER, SPEARHEAD, WHY_IT_WORKS, FINAL_CTA, PRICING_SECTION, DUAL_BRAND, FEATURED_STRIP) |
| `src/app/approach/page.tsx` | Badge „How we work" → „Approach"; adnotacja stawek pod metrykami (€80/h = conservative scenario, public methodology = €40/h) |
| `src/app/security/page.tsx` | Badge „How we work" → „Approach" |
| `public/og/home.svg` | Dolna linia: „Living Operating System - 8 repos - governance-first" → „Systems that give you back your time · you approve · you own the repo" |
| `docs/strategy/marketing-strategy.md` | §Budget signal + §8: €290 → €690; „Automation Map" → „Automation Scan" (4 wystąpienia: linie 50, 147, 286, 288) |
| `docs/strategy/ui-ux-principles.md` | Button „Pay €290 and pick a slot" → „Pay €690 and pick a slot" |
| `docs/canon/site-map.md` | §Home eyebrow → „Conversion systems architect for small businesses · EU" |
| `docs/strategy/site-map.md` | §3 v7.0: wpis o synchronizacji STEPS (anti-chaos) |
| `docs/operations/SESSION-ANCHOR.md` | Status DEPLOYED, nowy deployment ID, sekcja „Home stale data sync", NASTĘPNY KROK |
| — | Usunięto 12 martwych komponentów home + `src/components/sections/Pricing.tsx` (martwy) |

## Usunięte komponenty

`src/components/home/` — PainGrid, IntentRouter, JadziaSpearhead, VcmsTrustStrip, WizardVisualizerCompact, WhyItWorks, FinalCtaBand, DualBrandBand, FeaturedStrip, TrustAndObjections, SpearheadSpotlight, IntentFilterChips. Plus `src/components/sections/Pricing.tsx`.

## Weryfikacja

- `npm run typecheck` ✅
- `npm run build` ✅ (56 stron, sitemap 27 routes)
- ReadLints na zmienionych plikach: 0 błędów
- Smoke lokalny (port 3114): home (nowy step, footer „Approach →", brak starej etykiety), /approach/ (adnotacja €40/h + badge), /security/ (badge), OG home.svg (nowa linia), /proof/ (€40/h), /pricing/, /about/, /blog/ — wszystkie 200
- /results/ → 308 redirect na /proof/ (istniejący alias routingu, niezwiązany ze zmianami)

## Post-deploy smoke (produkcja)

- `quietforge.flexgrafik.nl/` — 200, nowy step obecny, footer „Approach" ✅
- `quietforge.flexgrafik.nl/og/home.svg` — 200, nowa linia ✅
- `quietforge.flexgrafik.nl/approach/` — 200, adnotacja stawek obecna ✅
- Deployment: `dpl_297F8gPxYsqZjMDoepVDCfjNrYc8`

## Decyzje/uwagi

- Decyzja Dowódcy z poprzedniej sesji utrzymana: licznik €40/h zostaje (public methodology). €80/h w /approach/ i sample report = conservative scenario.
- Świadomie **nie usunięto** (poza zakres planu): `HeroSection`, `HomeIntentBoundary`, `BuiltVsPlanned`, `HowIWork`, `IntentFilterSticky`, `SectionProgress.tsx` — wszystkie są nieużywane (dead), ale nie były na liście planu. Decyzja do osobnej sesji czyszczenia.
- Docs LinkedIn/GTM (strategy/linkedin/*, gtm/*) nadal zawierają €290 / „Automation Map" — to pliki oznaczone SUPERSEDED/PARKED, nie aktualizowane w tej sesji.

## Następne kroki

1. Dowódca: post-deploy smoke na produkcji (home, /approach/, OG).
2. Decyzja o czyszczeniu pozostałych martwych komponentów (HeroSection, HomeIntentBoundary, BuiltVsPlanned, HowIWork, IntentFilterSticky, SectionProgress).
3. Looker Studio dashboard wg conversion-pipeline.md §10.3.
