# PROMPT DLA AGENTA-WYKONAWCY — naprawa INSPIRE (mockup-first)

> Skopiuj wszystko poniżej linii i wklej agentowi wykonawcy. Prompt jest samodzielny.

---

# ZADANIE: INSPIRE — przebudowa generowania na MOCKUP-FIRST (makiety prezentacyjne)

## TWOJA ROLA
Jesteś agentem wykonawczym (executor) w repo `dsaas-quietforge` (Next.js + Cloudflare Pages, demo INSPIRE pod `public/demo/zzpackage/inspire/` + API w `functions/api/v1/`). Realizujesz ściśle poniższy zakres. Nie projektujesz produktu — produkt jest już zdefiniowany w kanonach. Po zakończeniu robisz handoff.

## KONTEKST — CZYTAJ W TEJ KOLEJNOŚCI (obowiązkowo, przed kodem)
1. `docs/canons/inspire-product-vision.md` — WIĄŻĄCE oczekiwania produktowe (SoT)
2. `docs/canons/inspire-model-prompts.md` — WIĄŻĄCA biblioteka promptów modelu (SoT)
3. `todos/inspire.json` — `hard_rules` + `decided_generation_stack`
4. `docs/operations/handoffs/2026-11-20-inspire-deploy-verdict.md` — diagnoza obecnej porażki (B1/B2)
5. `brain.md` — stack, deploy, guardrail

## CEL BIZNESOWY
INSPIRE ma generować **piękne makiety prezentacyjne pojazdu klienta z jego prawdziwym logo** — fotorealizm studyjny, jakość min. darmowego GPT/Gemini. Makieta jest wizualizacją, na bazie której grafik tworzy potem projekt wektorowy. Klient w czacie podaje dane (firma, branża, pojazd, logo, kolory) i dostaje 2 makiety (Standard/Premium) na kartach produktów €149/€399.

## SEDNO PROBLEMU (diagnoza — nie powtarzaj błędów)
Dotychczasowy prompt kazał modelowi generować PŁASKI WZÓR (flat wrap artwork), a wynik był „komponowany" na zdjęciu szablonu przez maski/prostokąty → szare klocki, kolaże, porażka. Prawidłowo: **model generuje gotową makietę** (pojazd + design + czysta strefa logo), a my doklejamy wyłącznie prawdziwe logo mechanicznie. Jeśli wynik wymaga ratowania kompozycji = generacja zła.

## ZAKRES PRAC (T1–T6 — dokładnie, bez rozszerzania)

### T1 — Prompt builder: mockup-first
- Nowy moduł `functions/api/v1/prompt-templates.ts` — przenosi WIERNIE bibliotekę z `docs/canons/inspire-model-prompts.md` (master prompt standard/premium, słownik zmiennych, bank języków designu, sekcja NEGATIVE).
- Przepisz `buildPrompt()` w `functions/api/v1/generate-art.ts` na mockup-first: zmienne `{VEHICLE_DESCRIPTION}`, `{BRAND_COLORS}`, `{BUSINESS_CATEGORY}` z payloadu czatu; sanityzacja jak dotychczas.
- **Zakaz:** jakichkolwiek próśb o tekst/logo/flat artwork/print file w prompcie.

### T2 — Provider: profesjonalny model rastrowy za adapterem
- `callProvider()` obsługuje profesjonalny model (OpenAI-compatible image API — gpt-image / Gemini image; konfiguracja przez env: `IMAGE_PROVIDER`, `IMAGE_MODEL`, `IMAGE_API_KEY`).
- flux-1-schnell zostaje jako `IMAGE_PROVIDER=cf-flux` (dev-fallback), przełącznik w env.
- Kontrakt odpowiedzi bez zmian: `data.images[]` (2 warianty: standard/premium, base64), błędy `VALIDATION_ERROR`/`QUOTA_EXCEEDED`/`CONFLICT`/`GENERATION_FAILED` z `requestId`.
- Parametry generowania wg `inspire-model-prompts.md` §4 (landscape 3:2, quality high).
- Brak klucza/env = jawny błąd + fallback demo oznaczony jako demo (nigdy podrabiany pod wynik).

### T3 — Kompozycja: logo mechaniczne na makiecie
- `mockup-composer.js`: happy path = **makieta z modelu + prawdziwe logo** (pixel-exact, uniform scale, knockout jak dotychczas) + opcjonalna linia kontaktu (tekst z czatu, font po naszej stronie).
- Lokalizacja logo: strefa czysta na drzwiach (prompt §1 LOGO ZONE) + współrzędne per pojazd w `inspire/data/panel-map.json`. **Skalibruj 4/4 pojazdy na realnych outputach modelu** (makiety generowane mają inny kadr niż `voertuig_*.png` — kalibracja jest częścią zadania; wymuś kadr promptem: side profile, cały pojazd wycentrowany).
- Stary pipeline (flat artwork + maska + multiply) = **usunięty ze ścieżki happy path**; może zostać wyłącznie jako uczciwie oznaczony fallback demo-examples. Naprawa buga B1 (maska ładowana z `templateSrc`) = jeśli pipeline zostaje w jakimkolwiek kształcie — inaczej usuń.
- **Twardy fail-safe:** brak logo w sesji = makieta bez logo + nota; brak maski/zasobu = widoczny błąd (ZAKAZ cichych fallbacków).

### T4 — UI: karty produktów i flow
- 2 makiety (Standard „Magneten" €149 / Premium „Wrap" €399) na kartach z CTA „Offerte aanvragen".
- Przycisk regeneracji („Ander richting") = nowy wariant z banku designu (§6 biblioteki), ładowanie/error/loading-stany zgodnie z `docs/canons/ux-rules.md`.
- Copy NL, zgodne z `marketing-rules.md`; zero zmyślonych treści.

### T5 — QA i evidence (bramka jakości §7 biblioteki promptów)
- E2E **realnym flow klienta** (czat → logo → API → makiety → karty) — NIGDY osobna ścieżka testowa. QA na 4 pojazdach × 2 warianty.
- Bramka: pojazd w kadrze, zero tekstu/logo w generacji, czysta strefa logo, zero artefaktów (prostokąty/krawędzie/obce tło), kolory zgodne z marką, logo pixel-exact po kompozycji. Niespełnienie = regeneracja (max 2), potem fallback demo.
- Evidence w `docs/operations/evidence/inspire-mockups-YYYY-MM-DD/`: screen kart 1440px + 375px, outputy surowe modelu, payload request/response.
- Bramki repo: `npm run build` + `npm run typecheck` + `npm run lint` — czerwone = stop.

### T6 — Porządek i handoff
- `todos/inspire.json`: status zadań, `decided_generation_stack` = MOCKUP-FIRST (dopisz decyzję), lekcje B1/B2.
- Handoff `docs/operations/handoffs/YYYY-MM-DD-inspire-mockup-first.md` (cel, pliki, weryfikacja, smoke, next).
- Commity: małe, conventional, max 3 „rzeczy" na commit; deploy preview = push na `preview/flux-generation`; produkcja WYŁĄCZNIE na rozkaz Dowódcy (Zasada 11).

## TWARDE ZAKAZY (naruszenie = odrzucenie pracy)
1. ZAKAZ flat artwork / „design dla grafika" zamiast makiety.
2. ZAKaz przepuszczania logo klienta przez model AI (logo wyłącznie mechanicznie).
3. ZAKAZ cichych fallbacków i ukrywania błędów.
4. ZAKAZ własnych generatorów grafiki (SVG/proceduralne).
5. ZAKAZ zmian poza zakresem T1–T6 (SCOPE LOCK), ZAKAZ ruszania innych demo (wizard/game/portal).
6. ZAKAZ sekretów w repo (klucze w env), ZAKAZ deployu produkcyjnego.
7. ZAKAZ oddawania wyniku ze sztucznymi artefaktami na screenie.

## WARUNKI STOP (eskala do Dowódcy, nie kombinuj)
- Brak klucza API modelu lub budżetu → STOP z raportem.
- Model nie spełnia bramki jakości po 2 regeneracjach → STOP z evidence.
- Konflikt z kanonem (`inspire-product-vision.md`, marketing/ux rules) → STOP i pytanie.

## DEFINICJA GOTOWOŚCI (DoD)
- [ ] Makiety fotorealistyczne na 4 pojazdach × 2 warianty, z prawdziwym logo pixel-exact
- [ ] Brak artefaktów (szare prostokąty, krawędzie, obce tło) — screen = dowód
- [ ] Prompt = mockup-first wg biblioteki (kopia w kodzie spójna z docs)
- [ ] Model za adapterem `callProvider()` (env: provider/model/key), flux = dev-fallback
- [ ] E2E realnym flow; build+typecheck+lint zielone; mobile 375px OK
- [ ] Evidence + handoff + todos zsynchronizowane
- [ ] Werdykt Dowódcy (TAK/NIE) — bez niego zadanie nie jest „done"
