# HANDOFF — 2026-08-24 · ETAP 4 (plan v2.0 + wykonanie S1–S3)

## CO (zakres wykonany w repo `dsaas-quietforge`, Desktop = live)

**Plan:** `quietforge/quietforge-strona-etap4-plan.md` podniesiony do **v2.0** — audyt kodu (§A, 12 pozycji), decyzje sztabu (§B, D1–D6), sprinty z build gate.

**S1 — ścieżka pieniędzy:**
- `src/content/pricing.ts`: + warianty build/care (oferty v1) + zakres security audit.
- `src/content/conversion-copy.ts`: nowy hero lead (self-improving systems) + proofChip; PUBLIC_OFFER.buildVariants/careVariants/paymentTerms/alwaysIncluded+30 dni; REFERENCE_PROGRAM; ABOUT v2 (9 sekcji, zero duplikatów nagłówków).
- `/about` v2: 9 sekcji (hero, story 3 akapity, what I build, how I deliver z linkami /security#, currency, in numbers, off the clock, #lab, CTA + KVK 89057554).
- `/pricing` v2: scan + tabela build (ESSENTIAL/SYSTEM*/AUTONOMOUS z gates i timeline) + care (CARE/GROW*/AUTONOMY) + zasady płatności + FAQ +2 + VariantCta (event `pricing_variant_click`).
- Home: proof = „five doors” + ReferenceCta (event `reference_program_click`), prices = warianty, FAQ +2, Fit +1 wiersz, approach +1 linia, hero chip.
- `/proof` + sekcja `#reference` (warunki marketing v1 §6).
- `src/lib/analytics.ts`: +4 eventy (pricing_variant_click, reference_program_click, blog_read, about_section_scroll).

**S2 — 3 nowe spokes:**
- `systems-catalog.ts`: +3 rekordy B1–B10 (company-brain FLAGSHIP, ai-security-audit PIONEER, custom-ai-agent) — benchmarki z etykietą źródła, statusy NEW ON THE PLATFORM.
- `public/systems/*-flow.svg` ×3 (styl spójny z istniejącymi).
- `public/og/{company-brain,ai-security-audit,custom-ai-agent}.svg` (generate-og.mjs).
- `constants.ts` +3 ROUTES; `[slug]/page.tsx` OG map +3; hub H1 „Nine systems”.
- `generate-sitemap.mjs`: +3 spokes +7 blog URLs (26 routes łącznie).

**S3 — blog + marka:**
- Blog upgrade (subagent): 3 nowe wpisy (Five Pillars: BKG / model-proposes / cockpit), kategorie na hubie, schema Article.
- Marka: ośmiornica w footerze (Image 28px obok wordmarku); favicon/apple-icon JUŻ były ośmiornicą (hash identyczny z brand/quietforge-logo.png).
- Footer: +Blog (D3 — header zostaje 5 pozycji, limit canon).

**Canon sync (SR-03):** `docs/canon/site-map.md` — IA +3 spokes, /blog LIVE, nota etap-4 przy Home (kolejność sekcji nietknięta), updated 2026-08-24.

## DECYZJE (D1–D6, prawo veta Dowódcy)
- D1: eyebrow hero ZOSTAJE „System builder…” (identity.md LOCKED > plan); nowe pozycjonowanie w leadzie i /about.
- D2: 3 case slots + #reference współistnieją; licznik 0 nietknięty.
- D3: Blog w footerze, nie headerze (canon max 5).
- D4: bez portretu osoby (zdjęcia prywatne) — hero tekstowy.
- D5: KVK 89057554 w stopce /about.
- D6: zakres sprintów jak wyżej.

## ODSTĘPSTWA (jawne)
- OG images = tekstowe stuby SVG (spójne z istniejącym systemem); ośmiornica NIE wklejona w OG (asset 1:1 kwadratowy — kadrowanie 1200×630 zniszczyłoby znak; crawlers nie rasteryzują SVG). Do decyzji Dowódcy: wygenerować PNG warianty.
- `scripts/generate-sitemap.mjs`: blog changefreq monthly→weekly (rytm 1 wpis/tydz. z media plan).

## WERYFIKACJA
- `npm run typecheck` ✅ (po S1 i po S2) · `npm run build` ✅ (po S1) · finalny build po S3 w tej sesji.
- ToV sweep: zero hype-słów (trafienia = negacje „not vibe coding” i listy forbiddenWords w growth-os).

## NEXT (Dowódca)
1. Review diff → commit/push/deploy = RĘCZNY krok Dowódcy (Zasada 11).
2. Smoke: /, /about, /pricing, /proof#reference, /systems + 3 nowe spokes, /blog + 3 wpisy.
3. LinkedIn dopiero po akceptacji strony vs kim jestem (SESSION-ANCHOR).
4. Opcjonalnie: PNG OG z ośmiornicą; aktywacja portretu na /about po wyborze zdjęcia.

## LOCKS
Demand OS tool-first · W8 OFF · Zasada 11 deploy · licznik 0 · identity.md LOCKED.

## ADDENDUM (ta sama sesja)
- Eventy domknięte: `src/components/analytics/BlogReadTracker.tsx` (blog_read na wejściu we wpis) + `AboutScrollTracker.tsx` (about_section_scroll per h2, IntersectionObserver). Wpięte w `/blog/[slug]` i `/about`.
- Finalna weryfikacja po addendum: typecheck exit 0 · build exit 0 (55/55 stron).

## ADDENDUM 2 — POPRAWKI PROFESJONALNE + DEPLOY (delegowane przez Dowódcę)
**Poprawki po review:**
- Blog hub: chipy `rounded-full` → `qf-blog-chip` (UR-08 sharp corners, globals.css); CTA `bookDiscovery` → `bookAScan` (live route).
- OG ×3 (company-brain/ai-security-audit/custom-ai-agent): ośmiornica osadzona base64 (1200×630) — odstępstwo z §ODSTĘPSTWA domknięte.
- Duplikat klucza `blog` w ROUTES usunięty (istniał w sekcji legacy — TS1117).
**Deploy:** `vercel link --project flexgrafik-services` + `vercel --prod --yes` → alias services.flexgrafik.nl → 301 quietforge.flexgrafik.nl (vercel.json). Build Vercel 19 s, 9 spokes SSG.
**Smoke LIVE (12 URL, HTTP 200 + markery treści):** / (five doors) · /about (KVK) · /pricing (ESSENTIAL) · /proof (#reference) · /systems (Nine) · 3 spokes · /blog + 3 wpisy. ✓
**Status:** repo lokalnie NIE commitowane — diff gotowy do review/commit Dowódcy.
