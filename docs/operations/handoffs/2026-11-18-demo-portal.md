# Handoff — Demo 4/4: PORTAL = REPLIKA 1:1 front-page.php + KOMPLET (2026-11-18)

**Repo:** quietforge.nl · **Build:** ✅ · **Deploy:** Cloudflare Pages CI on `main` (`ebab4bb`) · **Zasada:** tylko zawartość repo.

## Cel / Goal
`/lab/portal/` = wierne odtworzenie strony głównej FlexGrafik (front-page.php) jako **hub spinający 3 żywe repliki**. Komplet „Four doors" domknięty.

## Co zrobiono
- `public/demo/zzpackage/portal/` — front-page.php verbatim (hero „Van anoniem naar Premium Vakman.", spec bar, Status Inspectie, „Zo werkt het" 5 kroków, ROI, 7 kafli hardware wg reguł PHP z product-master-table, „De FlexGrafik Garantie" + 6 recenzji z `google-reviews-nl.json`, „Speel Mee en Win", systems hub z `inc/home-zzp-systems-hub.php`, footer + JSON-LD) + obrazy (1,12 MB, ≤1600px).
- **Mapowanie linków (audyt w raporcie):** `/wizard` → `../wizard/` · `/voertuigreclame-ontwerp` → `../inspire/` · gra → `../../bouwplaats/` (fix ścieżki po weryfikacji) · hint kuponu → `../wizard/?coupon=` verbatim · blog/materialen/faq/legal → `#` (brak w demie — nie zmyślano).
- Strona nie ma backendu (0 XHR/fetch w JS) → bez demo-boot/modal; banner demo na górze.
- Bonus: 2 brakujące assety wspólne (`spel-icoon`, `flexgrafik-logo`) → **fix 404 w stopce Wizarda**.
- `/lab/portal/` = `DemoFrame` → iframe.

## Weryfikacja
- typecheck/lint/build ✅ · check-links 0 broken ✅
- **QA przeglądarka:** wszystkie sekcje renderują; mobile 375px bez overflow; 0 błędów konsoli, 0 braków assetów; nawigacja portal → wizard/inspire/game klikana ✓; audyt verbatim ~110 stringów (kaidy = ślad w repo); kafle hardware vs prod-verify JSON ✓. Zrzuty: `%TEMP%\opencode\portal-qa\`
- Live smoke: 200 na 4× /lab/* + portal; linki huba do 3 replik ✓

## Decyzje świadome (brak w repo = brak w demie)
- „Supervised sales chat" **nie istnieje w theme** (grep) → nie wymyślono. Cookie-consent widget pominięty (spójność z rodzeństwem). Ambigüity trzeciego posta huba opisane w raporcie agenta.

## KOMPLET — ścieżka klienta spięta
**Four doors → 4 żywe repliki 1:1** (Wizard / INSPIRE / Game / Portal), wzajemnie połączone: gra → kupon GAME10 → Wizard; portal → wszystkie. Wszystko na quietforge.nl, bez backendu, z bezpiecznym stopem „demo".

## Następny krok / Next steps
- Claim „2–4 weeks after the scan" (MR-16) — decyzja Dowódcy.
- Domain sweep (docs/SVG/GA4/vercel.json), „Three walks" treatment, screeny kafli od Dowódcy (podmiana PNG).
- Refine: cookie-consent w replikach (opcjonalnie), favicon dla demo (brak w repo).
