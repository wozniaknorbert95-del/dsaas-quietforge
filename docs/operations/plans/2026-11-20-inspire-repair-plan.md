# PLAN NAPRAWCZY — INSPIRE: porządek w plikach źródłowych + API makiety rastrowe

**Data:** 2026-11-20 · **Status:** DO AKCEPTACJI PRZEZ DOWÓDCY · **Priorytet:** P0
**Rozkaz:** zrobić porządek w plikach źródłowych INSPIRE, twarde nakazy/zakazy, a na koniec wstawić API generowania makiet rastrowych — piękne makiety w pełni wykorzystujące dane zebrane podczas czatu.

---

## 1. DIAGNOZA (fakty, zero tłumaczenia się)

| # | Fakt | Skutek |
|---|------|--------|
| D1 | Działający pipeline rastrowy jest **zacommitowany**: `749ab43` (kompozycja mechaniczna) + `01ea382`…`6058ab1` (API `/api/v1/generate-art`, flux-1-schnell, **zweryfikowane na preview** — realne obrazy + działający limit) | **Nie trzeba nic odtwarzać z pamięci** — rollback = git |
| D2 | Cały SVG-detour (generator `wrap-designer.js`, silniki „designu") leży **wyłącznie w working tree** (niecommitowany) | Cofnięcie = `git checkout --` + usunięcie 4 plików śmieci |
| D3 | `demo-boot.js` w working tree ma **podmieniony happy-path**: zamiast wywołania API → własny generator SVG | To jest regresja, o której mówi Dowódca — przywracamy wersję z gita |
| D4 | `index.html` w working tree: doładowany `wrap-designer.js` | Cofamy do wersji z gita |
| D5 | `mockup-composer.js` (working tree) zawiera 3 zmiany: (a) fix buga union-clip (realny bug — wzór wchodził tylko na ostatni panel), (b) maska karoserii + multiply z cieniami zdjęcia, (c) ARTWORK_ALPHA 0.62→1.0 | (a) = realny fix niezależny od SVG; (b) = kandydat do zostawienia; (c) = do przywrócenia (raster AI to nie kryjący winyl — blend 0.62 był udokumentowany) |
| D6 | `panel-map.json` (working tree): przeskalowane strefy pod realne szablony `voertuig_*.png` | Oryginał kładł **logo nad dachem busa** (realny bug); kalibracja wymaga weryfikacji 4/4 przed decyzją |
| D7 | Nowe pliki niecommitowane: `voertuig_*-mask.png` ×4 (maski karoserii) + 4 pliki HTML narzędziowe w `public/demo/` (`golden-sheet`, `calibration-sheet`, `final-review`, `wrap-designer.js`) | Maski = assety użytkowe (do weryfikacji K1); HTML/JS narzędzia = **śmieci w produkcji** → kosz |

**Werdykt:** generator SVG = zamknięty temat, nigdy więcej. Jakość grafiki pochodzi z **modelu rastrowego**. Nasza rola = **kompozycja mechaniczna** (pojazd + raster + prawdziwe logo) i **zbieranie danych w czacie**.

---

## 2. MAPA PLIKÓW — co się dzieje

### Do kosza (K0, natychmiast)
| Plik | Powód |
|---|---|
| `public/demo/zzpackage/inspire/wrap-designer.js` | własny generator grafiki — zakaz Z1 |
| `public/demo/zzpackage/inspire/golden-sheet.html` | śmieć narzędziowy w `public/` |
| `public/demo/zzpackage/inspire/calibration-sheet.html` | śmieć narzędziowy w `public/` |
| `public/demo/zzpackage/inspire/final-review.html` | śmieć narzędziowy w `public/` |

### Do cofnięcia z gita (K0)
| Plik | Przywracamy |
|---|---|
| `public/demo/zzpackage/inspire/demo-boot.js` | wersja `6058ab1` (happy-path: API-first + fallback) |
| `public/demo/zzpackage/inspire/index.html` | wersja `6058ab1` (kolejność skryptów) |

### Do weryfikacji przed decyzją (K1/K2 — screeny przed/po)
| Plik | Los |
|---|---|
| `inspire/mockup-composer.js` | zostaje **fix union-clip**; maska+multiply zostaje JEŚLI QA na rastrowym tle wygra; ARTWORK_ALPHA → 0.62 |
| `inspire/data/panel-map.json` | zostaje JEŚLI logo ląduje na drzwiach 4/4 szablony; inaczej revert + nowa kalibracja z pomiarem |
| `images/voertuig_*-mask.png` ×4 | zostają JEŚLI K1 wygra; inaczej kosz |

### Nietknięte (działające, nie ruszać)
`functions/api/v1/generate-art.ts` · `wrangler.toml` (AI + KV) · `mockup-composer.js` logika logo (compose_ref 15/15) · szablony `voertuig_*.png` · `todos/*.json` (SoT)

---

## 3. TWARDE NAKAZY I ZAKAZY (obowiązują wszystkie sesje INSPIRE)

### NAKAZY
1. **API-first** — jedyne źródło grafiki makiety = wywołanie `/api/v1/generate-art` (model rastrowy). Kompozycja mechaniczna nakłada prawdziwe logo.
2. **Dane z czatu = jedyny input** — nazwa firmy, branża, pojazd, kolory z logo, wybrany styl, dane kontaktowe. Zero zmyślonej treści (brand integrity + proof-rules).
3. **Logo klienta nigdy nie przechodzi przez AI** — wyłącznie `mockup-composer` (matematyka compose_ref).
4. **Gate po każdej zmianie:** `npm run build` + `npm run typecheck` + `npm run lint` — czerwone = nie ma dalszej pracy.
5. **Evidence przed werdyktem:** screenshot przed/po + viewport 375px/1440px; „wydaje mi się" nie istnieje.
6. **Jeden krok planu na raz** (K0→K5), po każdym kroku status w tym pliku.
7. **Fallback = prawda** — gdy API niedostępne, przykłady DEMO oznaczone jako demo, nigdy jako generowane.

### ZAKAZY
1. **ZAKAZ** tworzenia własnych generatorów grafiki (SVG, proceduralne, „design engine", „golden sheet") — raz nas to kosztowało sesję.
2. **ZAKAZ** podmiany happy-pathu w `demo-boot.js` poza krokami planu.
3. **ZAKAZ** nowych plików narzędziowych/dev w `public/demo/` — narzędzia QA = poza `public/` albo headless + folder evidence.
4. **ZAKAZ** zmian w `panel-map.json` bez pomiaru na szablonie + screena przed/po.
5. **ZAKAZ** wysyłania logo klienta lub surowych pikseli do API AI.
6. **ZAKAZ** commitu bez zielonego gate (N4) i bez statusu w tym pliku.
7. **ZAKAZ** ulepszania poza zakres kroku (SCOPE LOCK) — „przy okazji" = regresja.

---

## 4. KROKI NAPRAWCZE

### K0 — Porządek i rollback detour'u (30 min)
1. Usunąć 4 pliki z kosza (§2).
2. `git checkout -- public/demo/zzpackage/inspire/demo-boot.js public/demo/zzpackage/inspire/index.html`.
3. `git status` = tylko pliki do weryfikacji (K1/K2) + maski.
4. `npm run build` — gate.
- **Evidence:** `git status` przed/po + build zielony.
- **Werdykt Dowódcy:** nie wymagany (czysty rollback).

### K1 — Weryfikacja kompozytora na PRAWDZIWYM rastrze (1–2 h)
1. `mockup-composer.js`: ARTWORK_ALPHA → 0.62 (przywrócić blend).
2. QA: kompozycja z **rastrem testowym** (obraz AI z flux — `docs/operations/evidence/flux-proof-2026-11-19.jpg` lub świeży render) × 4 szablony, z maską i bez.
3. Ocena okiem: wzór na karoserii, nie na szybach/kołach/tle; cienie zdjęcia przebijają; logo pixel-exact.
4. Decyzja: maska+multiply **zostaje** albo **kosz** (wersja prosta z gita działa bez nich).
- **Evidence:** 8 screenshotów (z maską/bez × 4 pojazdy) w `docs/operations/evidence/k1-composer-2026-11-20/`.
- **Werdykt Dowódcy:** TAK/NIE dla maski+multiply.

### K2 — Weryfikacja panel-map (30 min)
1. Kompozycja 4× (per pojazd) z logo testowym → logo ma wylądować na drzwiach/klapie, nigdy na dachu/szybie.
2. 4/4 OK → zostaje; inaczej revert + nowa kalibracja z siatką pomiarową (bez commitu do czasu 4/4).
- **Evidence:** 4 screenshoty z zaznaczoną strefą logo.
- **Werdykt Dowódcy:** TAK/NIE.

### K3 — API-first: pełny flow z danymi z czatu (2–4 h) ← **SERCE PLANU**
1. `demo-boot.js` (wersja z gita) — prompt builder z danych sesji:
   - `bedrijfsnaam`, `branche`, `vehicleType`, `brandColors` (z logo), styl wybrany w czacie, panele z `sku_active_panels`
   - 2 warianty na akcję (standard/premium), jak w kontrakcie API
2. `/api/v1/generate-art` (istnieje, zweryfikowane) — bez zmian w kontrakcie; provider za adapterem `callProvider()` → **wymiana modelu = jedna funkcja** (GPT 2.6 / flux / inny — decyzja Dowódcy, klucz w env).
3. Kompozycja: raster z API → `composeFromArtwork` (logo mechanicznie, wg K1/K2) → 2 makiety na kartach €149/€399.
4. Limit Phase 1: 1 generacja/visitor (KV `AI_LEDGER`), fallback demo uczciwie oznaczony.
- **Evidence:** pełny przepływ klienta (czat → logo → 2 makiety) + payload request/response + screen kart.
- **Werdykt Dowódcy:** TAK/NIE na jakość makiety (to jest ten moment).

### K4 — E2E + bramki + commit (1 h)
1. `npm run build` + `typecheck` + `lint` zielone; 404 audit.
2. Mobile 375px: brak poziomego scrolla; stany loading/error/regeneracja.
3. Commit na `preview/flux-generation` (kolejność: K0 osobno, K1–K2 osobno, K3–K4 osobno — maks 3 „rzeczy" na commit).
4. Deploy preview = Dowódca (Zasada 11: produkcja tylko ręcznie).
- **Werdykt Dowódcy:** deploy preview.

### K5 — Porządek w plikach źródłowych opisujących INSPIRE (1 h)
1. `todos/inspire.json` — `decided_generation_stack` → **raster-first** (model = jedyne źródło grafiki; SVG-engine = odrzucony 2026-11-20); status zadań zgodnie z faktami.
2. `docs/operations/plans/2026-11-17-zzpackage-replica-spec.md` — sekcja generowania spójna z tym planem.
3. Sekcja „Nakazy/Zakazy" (§3) → wklejka do `todos/inspire.json` pole `hard_rules` (SoT dla agentów).
4. Handoff `docs/operations/handoffs/2026-11-20-inspire-repair.md`.
- **Werdykt Dowódcy:** nie wymagany (dokumentacja).

---

## 5. API GENEROWANIA MAKIET RASTROWYCH (kontrakt docelowy)

**Endpoint (istnieje):** `POST /api/v1/generate-art` · `functions/api/v1/generate-art.ts`

**Request** (dane z czatu — nic więcej):
```json
{
  "visitorToken": "uuid",              // limit 1/visitor (KV AI_LEDGER)
  "vehicleType": "medium van",         // z czatu (caddy/bus_l/bus_xl/passenger)
  "panels": ["deur","zij","achter"],   // sku_active_panels (panel-map SSoT)
  "brandColors": ["#003366","#D60075"],// ekstrakt z logo klienta
  "businessType": "elektryk"           // branża z czatu
}
```
- Nagłówek: `Idempotency-Key` (uuid/visitor) — retry bez duplikatów.
- **Logo klienta NIGDY w payloadzie** (Z5).

**Prompt = dane z czatu** (szablon w adapterze): pojazd + branża + kolory marki + typografika bez tekstu + panele (strefy) + „professional vehicle wrap mockup, studio photography, no text, no logos".

**Response 200:**
```json
{ "success": true,
  "data": { "images": [
      { "style": "standard", "format": "base64", "data": "…" },
      { "style": "premium",  "format": "base64", "data": "…" } ] },
  "meta": { "requestId": "…", "model": "…", "variants": 2 } }
```
**Błędy:** `429 QUOTA_EXCEEDED` (visitor/dzienny cap) · `409 CONFLICT` (idempotency) · `502 GENERATION_FAILED` (provider) · `503 INTAKE_DISABLED`.
**Timeout:** 120 s · **fallback klienta:** demo-examples z etykietą „demo".

**Adapter modelu (jedna funkcja `callProvider()`):** flux-1-schnell (darmowy, Phase 1) → GPT 2.6 / profesjonalny raster (klucz w env, decyzja Dowódcy). Wymiana modelu = zmiana jednej funkcji, zero zmian w demo.

**Kompozycja (klient):** raster → `mockup-composer` (K1): strefy paneli + maska karoserii + cienie zdjęcia + prawdziwe logo mechanicznie → makiety na kartach produktów.

---

## 6. DEFINICJA GOTOWOŚCI (DoD)

- [ ] 4 makiety (per pojazd) zaakceptowane okiem Dowódcy (K3 werdykt)
- [ ] Grafika wyłącznie z modelu rastrowego; 0 plików generatorów w repo
- [ ] Logo klienta pixel-exact, nigdy przez AI
- [ ] Wszystkie treści z danych czatu / repo (0 zmyśleń)
- [ ] `build` + `typecheck` + `lint` zielone; mobile 375px OK
- [ ] Fallback demo uczciwie oznaczony; limity Phase 1 działają
- [ ] Porządek: `git status` = tylko planowane pliki; `todos/inspire.json` spójny
- [ ] Handoff + evidence w `docs/operations/evidence/`

## 7. CZEGO POTRZEBUJĘ OD DOWÓDCY (minimalnie)

1. **K3 werdykt na makietach** (jakość = „piękne?" — TAK/NIE + 1 zdanie).
2. **Model rastrowy:** zostać przy darmowym flux-1-schnell (Phase 1) czy podmieniamy na GPT 2.6 (potrzebny klucz w env)? — nieblokujące, adapter jest gotowy na podmianę.

---
*SCOPE LOCK: plan nie przewiduje żadnych innych zmian. Wszystko poza K0–K5 = odrzucane.*
