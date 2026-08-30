# Handoff — 2026-08-30 dead-code cleanup + kompleksowy deploy

**Sesja:** Dead-code cleanup II (kompleksowe czyszczenie martwych komponentów/exportów/CSS) + commit + push + deploy.
**Status:** DEPLOYED ✅ (Vercel prod, dpl_9fQf6988xuANHRLREMpCThpEenua, commit `f8ac6c2`)
**Build gate:** `npm run typecheck` ✅ · `npm run build` ✅ (56 stron) · sitemap 27 routes regenerowany.

## Cel

Dowódca dał zgodę na kompleksowe dokończenie czyszczenia martwego kodu (rozpoczętego w sesji home stale-data sync) wraz z deploymentem.

## Zmienione pliki

| Plik | Zmiana |
| --- | --- |
| `src/components/home/HeroSection.tsx` | USUNIĘTY — martwy (nieużywany nigdzie) |
| `src/components/home/HomeIntentBoundary.tsx` | USUNIĘTY — martwy (jedyne użycie Providera) |
| `src/components/home/BuiltVsPlanned.tsx` | USUNIĘTY — martwy (jedyne użycie getHomeReadinessRows) |
| `src/components/home/HowIWork.tsx` | USUNIĘTY — martwy |
| `src/components/home/IntentFilterSticky.tsx` | USUNIĘTY — martwy (jedyne użycie PAIN_GRID_HEADER/INTENT_LEGEND w komponentach) |
| `src/components/layout/SectionProgress.tsx` | USUNIĘTY — martwy |
| `src/content/ecosystem.ts` | Usunięto martwe: `HOME_SECTIONS`, `HOME_SECTION_MARKERS`, `INTENT_ROUTER_HEADER`, `PainCard`, `PAIN_GRID_HEADER`, `PAIN_GRID`, `getHomeRepos`; zaktualizowano komentarze |
| `src/content/readiness.ts` | Usunięto martwe: `HOME_ROW_KEYS`, `getHomeReadinessRows`, `readinessStatusClass`; zostaje `READINESS_ROWS` + `getReadinessStatus` (używane) |
| `src/lib/home-intent.tsx` | Usunięto martwe: `HomeIntentProvider`, `matchesHomeIntent`, storage helpers (`STORAGE_KEY`, `INTENT_QUERY`, read/writeStoredIntent); zostaje `useHomeIntent` (używany przez SystemMetrics) + `parseIntentParam` |
| `src/app/globals.css` | Usunięto martwe bloki: `qf-dual-brand-*`, `qf-featured-*`, `qf-intent-sticky-*`, `qf-pain-*`, `qf-module-*`, `qf-spearhead-*`, `qf-wizard-viz-*`, `qf-why-*`, `qf-pricing-featured/badge` (~13,7 kB). Zachowano `qf-book-hero-cta`/`qf-book-fast-path` (używane przez /book-a-scan/ + WhatsAppPainPicker) i `qf-final-cta*` (używane wszędzie) |
| `docs/operations/SESSION-ANCHOR.md` | Dodano sekcję "Dead-code cleanup II" + zaktualizowano status |

## Weryfikacja

- `npm run typecheck` — 0 błędów.
- `npm run build` — 56 stron, sitemap 27 routes, 2 warningi CSS pre-existing (`--qf-fs-*` w Tailwind arbitrary values, niezwiązane z sesją).
- `npm run lint` — 3 błędy **pre-existing** (niezmodyfikowane pliki): `src/components/analytics/CookieConsent.tsx` (react-hooks/set-state-in-effect), `scripts/fix-flow-svgs.cjs` (2× no-require-imports). Poza zakresem tej sesji — do osobnej decyzji.
- Canon: `docs/canon/site-map.md` §Home order zweryfikowany 1:1 z live `page.tsx` (Hero→Counter→Systems→Approach→Fit→Discipline→Proof→About→Pricing→FAQ→CTA) — brak zmian potrzebnych.

## Post-deploy smoke

- `https://quietforge.flexgrafik.nl/` — 200, 11 sekcji, IntentSystems grid, compare table, pricing grid, FAQ, final CTA renderują się poprawnie (weryfikacja wizualna w przeglądarce).
- `/approach/` — 200, timeline + report anatomy + porównanie + metryki + FAQ + CTA kompletne.
- `/security/`, `/book-a-scan/` (w tym `qf-book-hero-cta`), `/pricing/` — 200.
- `/artefacts/automation-map-sample.pdf` — 200 `application/pdf`.
- `/og/home.svg`, `/og/approach.svg` — 200 `image/svg+xml`.
- `sitemap.xml` — 200, 27 routes, `/approach` obecne. `robots.txt` — 200.
- `/results/owner-ecosystem` → 308 redirect do `/about/` (zamierzone, zdefiniowane w `next.config.ts` redirects).

## Decyzje / Decisions

| Decyzja | Uzasadnienie |
| --- | --- |
| Usunięto `getHomeRepos` + `homeVisible` zostaje jako pole danych manifestu | `homeVisible` to dane (nie kod) — bezpieczne do użycia w przyszłości |
| Zachowano `useHomeIntent` z fallbackiem (bez Providera) | `SystemMetrics` na /results/ używa go; fallback `defaultIntentValue` wystarcza |
| Zachowano `qf-book-hero-cta` / `qf-book-fast-path` / `qf-final-cta*` | Używane przez aktywne strony (/book-a-scan/, WhatsAppPainPicker, wszystkie final CTAs) |
| `quietforge.css` (root) NIE usunięty | Legacy, nieimportowany nigdzie — decyzja Dowódcy otwarta |

## Blokery / Blockers

| Bloker | Wpływ |
| --- | --- |
| 3 pre-existing lint errors (`CookieConsent.tsx` react-hooks/set-state-in-effect; `fix-flow-svgs.cjs` 2× no-require-imports) | `npm run lint` exit 1 — nie dotyka zmian tej sesji; naprawa w osobnej sesji |
| 2 warningi CSS build (`--qf-fs-*` arbitrary value w Tailwind) | `--qf-fs-*` nie istnieje jako token — pewnie literówka w starym kodzie; do przeglądu |

## Następny krok

1. **Dowódca: post-deploy smoke** (powyżej).
2. Decyzja: `quietforge.css` (root, legacy, nieimportowany nigdzie) — usunąć czy zostawić jako archiwum.
3. Decyzja: 3 pre-existing lint errors — naprawić w osobnej sesji (CookieConsent useEffect, fix-flow-svgs require).
4. Decyzja: sample report (fikcyjna firma, Illustration) — publiczny czy PDF tylko na żądanie (z SESSION-ANCHOR).
