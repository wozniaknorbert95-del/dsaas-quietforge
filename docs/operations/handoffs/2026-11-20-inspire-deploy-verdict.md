# Handoff — 2026-11-20 — INSPIRE: deploy produkcyjny + WERDYKT NEGATYWNY (porażka)

## Werdykt Dowódcy (screen z produkcji, `quietforge.nl/lab/inspire/`)
**„Porażka totalna" — ODRZUCONE.** Makiety na kartach €149/€399 mają widoczny **szary prostokąt tła grafiki** wylewający się na samochód (dach, szyby, koła). Sesja zakończona handoffem.

## DIAGNOZA porażki (fakty, bez tłumaczenia się)

### B1 — Maska karoserii NIE działa w prawdziwym flow (główny bug)
- Szary prostokąt = tło obrazu z flux wklejone jako klockiem. Oznacza to, że `destination-in` (maska) **nie wykonał się** w realnym przebiegu czatu.
- Przyczyna: `composeFromArtwork` wywodzi ścieżkę maski z `templateSrc` (`String(templateSrc).replace(/\.png$/i,'-mask.png')`); gdy `window.daConfig.vehicleImages` podaje inny URL niż `SHARED_IMAGES_DIR + 'voertuig_X.png'`, ścieżka maski 404 → `catch → null` → kompozycja **bez maski** (cichy fallback).
- **Błąd amatorski sesji:** QA kompozycji przekazywał `maskImg` jawnie (inna ścieżka kodu niż produkt). Nigdy nie przetestowano realnego flow czat → generate → compose z realnymi payloadami. To pierwsza rzecz do naprawy.

### B2 — Grafika flux = „kolorowe kształty" (znana limitacja modelu)
- flux-1-schnell (darmowy Phase 1) generuje płaskie plamy kolorów na **szarym tle** — tło trafia w prostokąt nawet z maską (krawędzie stref). Jakość nieakceptowalna jako produkt.
- To jest ten sam werdykt co wcześniej: **jakość grafiki = model**. Flux = co najwyżej placeholder dev.

### B3 — Logo
- Prawdziwe logo wchodzi mechanicznie (widoczne na aucie) — działa, ale małe (skala wg compose_ref: `h_pct × 0.45`).

## Co zostało zrobione w sesji (nie kasować)
| Element | Status |
|---|---|
| Rollback detour'u SVG (generator skasowany, `demo-boot.js` API-first z gita) | OK — nie ruszać |
| `mockup-composer.js`: union-clip fix, multiply z cieniami zdjęcia, ARTWORK_ALPHA 1.0 | OK (sam clip/multiply = dobre) |
| `voertuig_*-mask.png` ×4 (maski karoserii — szyby/koła/lampy wykluczone, QA punktowy alphy) | Dobre assety — **niewykorzystane przez bug B1** |
| `panel-map.json` skalibrowany (logo na drzwiach 4/4 w QA) | OK |
| API `/api/v1/generate-art` (flux, adapter `callProvider()`, KV limity) — działa na produkcji | OK |
| `todos/inspire.json`: `decided_generation_stack` = RASTER-FIRST + `hard_rules` (10 pozycji) | SoT |
| Plan: `docs/operations/plans/2026-11-20-inspire-repair-plan.md` | Wykonany K0–K5 |

## NASTĘPNA SESJA — kolejność bezwzględna
1. **Naprawić B1:** maska ładowana zawsze z `SHARED_IMAGES_DIR` (nie z `templateSrc`); przy braku maski = **twardy błąd w konsoli + nie renderuj makiety** (żadnych cichych fallbacków).
2. **E2E realnym flow** (czat → logo → API → compose → karty) — QA musi iść tą samą ścieżką co klient. Dowód: screen z kart BEZ szarego prostokąta.
3. **Tło grafiki:** prompt wymusza full-bleed design bez backdropu + detekcja/kadrowanie szarego tła (luminancja rogów → wycięcie), zanim model się zmieni.
4. **Model rastrowy (L4 — decyzja Dowódcy):** podmiana `callProvider()` na profesjonalny raster (GPT 2.6) — flux nie jest produktem.
5. Dopiero potem werdykt na makietach.

## Twarde lekcje z tej sesji (dopisać do `hard_rules` przy następnej edycji)
- **QA = realny flow klienta**, nigdy równoległa ścieżka z ręcznymi parametrami.
- **Cichy fallback = bug.** Brak maski/assetu = błąd widoczny, nie „ładnie działa dalej".
- Screen Dowódcy = dowód; jeśli na screenie widać artefakt (prostokąt/krawędź/kolor tła) = koniec dyskusji, naprawiaj.

## Deploy
- Produkcja `quietforge.nl` = commit `e38458e` (main, 2026-11-20, deploy produkcyjny na rozkaz Dowódcy). Smoke: home/lab/maski/API = 200/400-kontrakt OK.
- Preview: `preview-flux-generation.dsaas-quietforge.pages.dev`.
