# KONTYNUACJA dla agenta wykonawcego — GPT-Image-2.6 (wersja bez blokad)

> Skopiuj ponizej linii i wklej agentowi (arena) jako kontynuacje promptu v2.
> Decyzja Dowodcy 2026-11-20: klucz autoryzowany swiadomie, zero blokad, rotacja po zakonczeniu prac.

---

# KONTYNUACJA ZADANIA: INSPIRE — model GPT-Image-2.6 Sunburst (decyzja Dowodcy)

## 0. KLUCZ API — DECYZJA DOWODCY (swiadoma, wiazaca)
1. Klucz API OpenAI jest AUTORYZOWANY DO UZYCIA w tym projekcie — Dowodca podjal swiadoma decyzje. Rotacja klucza nastapi po zakonczeniu prac (krok Dowodcy). ZADNYCH BLOKAD z tego powodu.
2. Klucz jest ustawiony jako `IMAGE_API_KEY` w srodowiskach: Cloudflare Pages (Preview + Production) oraz lokalnie (`.env.local` / `.dev.vars`, gitignored). Jesli w Twoim srodowisku go brakuje — zglosz w raporcie, nie zatrzymuj pracy.
3. Higiena inzynierska (nie blokada): nie commituj klucza do repo, nie loguj go, nie umieszczaj w outputach QA/zrzutach. Wolania do modelu wylacznie z `functions/api/v1/generate-art.ts` (strona serwera).
4. Kontrola przed commitem: grep `sk-` w diffach = zero trafien (dowod w raporcie).

## 1. MODEL (decyzja Dowodcy — nie dyskutowac)
- Provider: **OpenAI · GPT-Image-2.6 Sunburst**.
- Zweryfikuj dokladny ID modelu w dokumentacji OpenAI → env: `IMAGE_PROVIDER=openai`, `IMAGE_MODEL=<dokladne-id>`, `IMAGE_API_KEY=<sekret>`.
- Integracja: adapter `callProvider()` w `functions/api/v1/generate-art.ts` (OpenAI Images API, `b64_json`, landscape 3:2 / maks. wspierane, `quality: high`).
- `cf-flux` (flux-1-schnell) zostaje jako dev-fallback bez klucza — wylacznie do darmowych testow ukladu.

## 2. SRODOWISKO TESTOW PLATNYCH
- Sandbox agenta MOZE nie miec dostepu do `api.openai.com` — testy platne uruchamiaj TAM, gdzie siec jest: lokalny dev z `.env.local` albo deploy preview (`preview/flux-generation`) z env w Cloudflare Pages.
- Preview = dozwolone. PRODUKCJA = wylacznie na rozkaz Dowodcy (Zasada 11).

## 3. BUDZET (twardy limit — chyba ze Dowodca poda inny)
- **Cap: 10 USD lacznie** na 8 makiet + powtorki (2 warianty × 4 pojazdy + regeneracje).
- Licznik kosztu per wolanie (requestId, model, szac. koszt) — log serwera + KV.
- STOP automatyczny po osiagnieciu capu (jawny komunikat, zero dalszych wolan).
- Przy 50% capu: raport do Dowodcy (koszt/makieta, jakosc vs oczekiwania) — decyzja: kontynuowac / zmienic model / stop.

## 4. ZADANIE
Kontynuuj dokladnie wg promptu v2 (`docs/operations/prompts/2026-11-20-inspire-fix-executor-prompt.md`):
- Faza 0 (embodiment persony) → Faza 1 (przebudowa kanonow: `inspire-product-vision.md` + `inspire-model-prompts.md`) → Faza 2 (profesjonalny plan gwarantowany) → Faza 3 (T1–T6).
- Sekcja T2 (provider) rozstrzygnieta w §1–§3 powyzej — reszta v2 bez zmian.
- Biblioteka promptow (`docs/canons/inspire-model-prompts.md`) ma zawierac rekomendowane parametry dla GPT-Image-2.6 (format, quality, czysta strefa logo, negative constraints w tresci promptu — Images API nie ma negatywow).

## 5. DODATKOWE KRYTERIUM DoD
- Zero sekretow w repo/diffach/logach (dowod: grep `sk-` = 0)
- Koszt sesji ≤ cap; licznik kosztu dziala
- Reszta DoD z v2 (makiety, logo pixel-exact, test persony „profesjonalna firma brandingowa", evidence, handoff)
