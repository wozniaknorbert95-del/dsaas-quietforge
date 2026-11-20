# KONTYNUACJA dla agenta wykonawcy — GPT-Image-2.6 + sekrety + budżet

> Skopiuj poniżej linii i wklej agentowi (arena) jako kontynuację promptu v2.
> Zasady bezpieczeństwa są BEZWZGLĘDNE i nadrzędne wobec wszystkiego innego.

---

# KONTYNUACJA ZADANIA: INSPIRE — model GPT-Image-2.6 Sunburst (decyzja Dowódcy)

## 0. BEZPIECZEŃSTWO SEKRETÓW (przed wszystkim — bezwarunkowo)
1. Klucz API, który pojawił się na czacie, jest SKOMPROMITOWANY i UNIEWAŻNIONY przez Dowódcę. NIE używaj go, nie zapisuj, nie loguj, nie wstawiaj do żadnego pliku. Jeśli znajdziesz jego ślady w repo/env/plikach — USUŃ i zgłoś w raporcie.
2. Nowy klucz generuje Dowódca (platform.openai.com → API keys) i ustawia WYŁĄCZNIE jako zmienną środowiskową `IMAGE_API_KEY`:
   - serwer: Cloudflare Pages → Settings → Environment (Preview + Production),
   - lokalnie: `.env.local` (gitignore) — nigdy commitowany.
3. ZAKAZ na stałe: klucze w repo, kodzie, komentarzach, logach, promptach, czatach, outputach QA, zrzutach ekranu, komunikatach błędów. Klucz żyje TYLKO w env serwera; wywołania do modelu TYLKO z funkcji serwerowej (`functions/api/v1/generate-art.ts`), nigdy z przeglądarki klienta.
4. Walidacja przed każdym commitem: `git status` + grep po `sk-` w diffach = zero trafień.

## 1. MODEL (decyzja Dowódcy — nie dyskutować)
- Provider: **OpenAI · GPT-Image-2.6 Sunburst**.
- Zweryfikuj dokładny ID modelu w dokumentacji OpenAI → ustaw w env: `IMAGE_PROVIDER=openai`, `IMAGE_MODEL=<dokładne-id>`, `IMAGE_API_KEY=<sekret>`.
- Integracja: adapter `callProvider()` w `functions/api/v1/generate-art.ts` (OpenAI Images API, `b64_json`, landscape 3:2 / maks. wspierane, `quality: high`).
- `cf-flux` (flux-1-schnell) zostaje jako dev-fallback bez klucza — wyłącznie do darmowych testów układu.

## 2. ŚRODOWISKO TESTÓW PŁATNYCH
- Sandbox agenta NIE ma dostępu do `api.openai.com` — testy płatne uruchamiaj TAM, gdzie sieć jest: lokalny dev z `.env.local` albo deploy preview (`preview/flux-generation`) z env ustawionym w Cloudflare Pages.
- Preview = dozwolone. PRODUKCJA = wyłącznie na rozkaz Dowódcy (Zasada 11).

## 3. BUDŻET (twardy limit — chyba że Dowódca poda inny)
- **Cap: 10 USD łącznie** na 8 makiet + powtórki (2 warianty × 4 pojazdy + regeneracje).
- Licznik kosztu per wywołanie (requestId, model, szac. koszt) — log w serwerze + KV.
- **STOP automatyczny po osiągnięciu capu** (jawny komunikat, zero dalszych wywołań).
- Przy 50% capu: raport do Dowódcy (koszt/makieta, jakość vs oczekiwania) — decyzja: kontynuować / zmienić model / stop.

## 4. ZADANIE
Kontynuuj dokładnie wg promptu v2 (`docs/operations/prompts/2026-11-20-inspire-fix-executor-prompt.md`):
- Faza 0 (embodiment persony) → Faza 1 (przebudowa kanonów) → Faza 2 (profesjonalny plan gwarantowany) → Faza 3 (T1–T6).
- Sekcja T2 (provider) jest rozstrzygnięta w §1–§3 powyżej — reszta v2 bez zmian.
- Biblioteka promptów (`docs/canons/inspire-model-prompts.md`) ma zawierać rekomendowane parametry dla GPT-Image-2.6 (format, quality, zachowanie czystej strefy logo, negative constraints jako część promptu — bo Images API nie ma negatywów).

## 5. DODATKOWE KRYTERIUM DoD
- [ ] Zero sekretów w repo/diffach/logach (dowód: grep `sk-` = 0)
- [ ] Koszt sesji ≤ cap; licznik kosztu działa
- [ ] Reszta DoD z v2 (makiety, logo pixel-exact, test persony, evidence, handoff)
