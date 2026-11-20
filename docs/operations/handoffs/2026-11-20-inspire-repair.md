# Handoff — 2026-11-20 — INSPIRE repair (raster-first, porządek w plikach)

## Cel
Wykonać plan naprawczy `docs/operations/plans/2026-11-20-inspire-repair-plan.md` (rozkaz Dowódcy): porządek w plikach źródłowych INSPIRE, twarde nakazy/zakazy, API-first dla makiet rastrowych w pełni wykorzystujących dane z czatu.

## Co się wydarzyło (kontekst)
Sesja porzuciła budowę własnego generatora SVG (decyzja Dowódcy: „nasz generator nigdy nie dorówna modelom" — jakość grafiki pochodzi z modelu rastrowego). Detour usunięty, działający pipeline rastrowy (flux API + kompozycja mechaniczna) przywrócony z gita.

## Zmienione pliki
| Plik | Zmiana |
|---|---|
| `docs/operations/plans/2026-11-20-inspire-repair-plan.md` | NOWY — plan naprawczy + twarde nakazy/zakazy + kontrakt API |
| `public/demo/zzpackage/inspire/mockup-composer.js` | fix union-clip (wzór wchodził tylko na ostatni panel), maska karoserii (`destination-in`) + multiply z cieniami zdjęcia, ARTWORK_ALPHA 1.0 |
| `public/demo/zzpackage/inspire/data/panel-map.json` | strefy paneli skalibrowane pod realne szablony `voertuig_*.png` (logo nad dachem → logo na drzwiach) |
| `public/demo/zzpackage/images/voertuig_*-mask.png` ×4 | NOWE — maski karoserii (szyby/koła/lampy/tło wykluczone) |
| `todos/inspire.json` | `decided_generation_stack` → RASTER-FIRST (2026-11-20) + `hard_rules` (SoT dla agentów) |
| `docs/operations/evidence/k1-composer-2026-11-20/` | evidence: maska vs bez maski + logo placement 4/4 |

Usunięte (śmieci po detourze, nigdy niecommitowane): `wrap-designer.js`, `golden-sheet.html`, `calibration-sheet.html`, `final-review.html`. Przywrócone z gita: `demo-boot.js`, `index.html`.

## Weryfikacja
- `npm run build` ✅ · `npm run typecheck` ✅ · `npm run lint` ✅ (0 errors; 10 warningów pre-existing)
- K1: maska vs bez maski na prawdziwym rastrze — **maska+multiply zostają** (evidence `mask-vs-nomask.png`)
- K2: logo na drzwiach **4/4 pojazdy** (evidence `logo-placement-1/2.png`)
- K3: prompt `/api/v1/generate-art` w pełni konsumuje dane z czatu (vehicleType, brandColors, businessType, panele) + czysta strefa na logo; adapter `callProvider()` = podmiana modelu (flux → GPT 2.6) w jednym miejscu

## Post-deploy smoke (preview → produkcja)
1. `curl -sI https://<preview>/demo/zzpackage/images/voertuig_caddy-mask.png | head -1` → 200
2. `/lab/inspire/` → czat → logo → generacja → 2 makiety na kartach €149/€399
3. Konsola czysta; fallback demo uczciwie oznaczony; limit 1/visitor działa
4. Mobile 375px: brak poziomego scrolla

## Następne kroki
1. **Werdykt Dowódcy K3** na makietach z prawdziwego flow (piękne? TAK/NIE)
2. Porównanie flux vs profesjonalny model rastrowy (GPT 2.6) = podmiana `callProvider()` + klucz w env → rendery obok siebie → werdykt
3. Merge `preview/flux-generation` → `main` = decyzja Dowódcy (Zasada 11 — deploy ręczny)
4. `/results/flexgrafik/` polish (SH-G7-01) — po akceptacji generowania

## Twarde reguły dla kolejnych sesji
`todos/inspire.json` → `hard_rules` (10 pozycji). Kluczowe: ZAKAZ własnych generatorów grafiki · ZAKAZ plików dev w `public/demo/` · logo nigdy przez AI · gate build po każdej zmianie · SCOPE LOCK.
