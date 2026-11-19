# Handoff — INSPIRE generowanie makiet: krok A + B (2026-11-19)

**Repo:** quietforge.nl · **Build:** ✅ · **Deploy:** Cloudflare Pages CI on `main`
**Stack (decyzja Dowódcy 2026-11-19):** HYBRYDA — SDXL (OVH, darmowy) generuje grafikę wrapu; **prawdziwe logo klienta doklejane mechanicznie** (nigdy przez AI); 1 generacja/odwiedzający; zero kosztów do Fazy 2.

## Cel / Goal
INSPIRE realnie generuje makiety dla klientów — za darmo, z zachowaniem integralności logo. Faza 1 wg `todos/inspire.json` (`decided_generation_stack`).

## Co zrobiono
### Krok A — endpoint `/api/v1/generate-art` (`functions/api/v1/generate-art.ts`)
- SDXL (OVH OpenAI-compatible) generuje **2 warianty w 1 akcji** (Standard/Premium = karty €149/€399), prompt zatwierdzony przez Dowódcę (płaska grafika, bez tekstu/logo/auta)
- Weryfikacja profesjonalna (runda review): **idempotency** (`Idempotency-Key` → CONFLICT, retry nie kradnie limitu), **timeout 120 s** → `GENERATION_TIMEOUT`, limit **1 akcja/odwiedzający + cap dzienny** (KV — Durable Object niedostępny na Pages Functions, ADR-001), rollback limitu przy błędzie, provider 429 → `RATE_LIMITED`
- Klucz `OVH_API_KEY` w env Pages (nigdy w kodzie)

### Krok B — kompozycja klienta (`mockup-composer.js` + wiring)
- **Port `compose_ref.py` do canvas** (vanilla, zero deps): knockout białego tła (próg 245), `logoRect` wg oryginalnego wzoru (panel „deur", +8px, 0.75/0.45), fit + paste logo NA WIERZCHU (pełna krycie, bez deformacji), strefy wrapu z `panel-map.json` (verbatim z silnika, SHA-256), blend grafiki 0.62 (auto widoczne), fallback typograficzny
- **Wiring bez ruszania chronionych assetów:** hook przez istniejący fetch-intercept w `demo-boot.js` (FormData z realnym logo + brand colors z `dtp-design-agent.js` — plik nietknięty)
- **Honest fallback:** brak API/limit → gotowe przykłady wyraźnie oznaczone „Demo-voorbeeld — live generatie was niet beschikbaar" (użytkownik wie, że to nie jego logo)
- Limit w UI: localStorage flag + wiadomość „Je hebt je gratis generatie al gebruikt"; loading „Genereren… (±30 sec)"

## Weryfikacja
- typecheck ✓ · lint 0 błędów ✓ · build ✓ · 0 martwych linków ✓
- **QA przeglądarka (subagent, pełny E2E):** 3 scenariusze (API brak / sukces / 429) przez prawdziwy UI czatu → kompozycja → karty €149/€399 · **matematyka `logoRect` 15/15 zgodna z oryginałem** · knockout 245 dokładny · **logo nietknięte** (piksel #003366 = oryginał) · output ≤800px · 0 błędów konsoli
- Zrzuty: `%TEMP%\opencode\inspire-stepb-qa\` (fallback + live composition)

## Do pełnej produkcji (wymaga Dowódcy)
1. **Klucz `OVH_API_KEY`** w env projektu Pages (Settings → Environment) — bez tego działa tylko fallback
2. Test z realnym kluczem (jedna generacja) → weryfikacja jakości SDXL
3. Potem: ścieżka „bez-logo" + rekomendacje produktowe (reszta Fazy 1)

## Następny krok
- Test z realnym kluczem OVH (Dowódca) → akceptacja jakości grafik
- Faza 1 domknięcie: ścieżka „bez-logo", rekomendacje → potem `/results/flexgrafik/` polerka
- Faza 2 (`todos/flexgrafik-v2.json`): Mollie + mocny model + silnik grafik dla Wizarda
