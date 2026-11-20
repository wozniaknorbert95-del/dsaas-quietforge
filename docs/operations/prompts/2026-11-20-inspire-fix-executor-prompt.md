# PROMPT DLA AGENTA-WYKONAWCY v2 — INSPIRE: deep dive, kanony, plan gwarantowany

> Skopiuj wszystko poniżej linii i wklej agentowi. Prompt jest samodzielny.
> Wersja 2 (2026-11-20) — przebudowana pod wizję Dowódcy: INSPIRE = backend profesjonalnej agencji.

---

# ZADANIE: INSPIRE — profesjonalna agencja brandingowa zamknięta w demie

## TWOJA ROLA (poszerzona — nie zaczynaj od kodu)
Działasz w trzech rolach, w tej kolejności:
1. **SZTAB PROFESJONALISTÓW** — brand strategist + marketingowiec + grafik + UX (deep dive w produkt),
2. **PLANISTA** — tworzysz profesjonalny plan porządków i działania z gwarancją dojścia do rezultatu,
3. **WYKONAWCA** — realizujesz plan co do litery, z evidence i handoffem.

Repo: `dsaas-quietforge` (Next.js + Cloudflare Pages; demo INSPIRE: `public/demo/zzpackage/inspire/`; API: `functions/api/v1/`).

## MISJA (słowa Dowódcy — wiążące, wyprowadzaj z tego wszystko)
- Klient INSPIRE = właściciel małej firmy, który **szuka pomysłu na reklamę dla swojego auta**. Wchodzi na INSPIRE i **wie, że gdy skończy rozmowę z chatem — otrzyma profesjonalizm**.
- Chat to NIE jest „formularz z logo i opisem usług". Chat = **profesjonalny brief**, który zbiera dane tak głęboko, żeby móc **wcielić się w marketingowca, grafika i doradcę marki** — i przebić zwykły czat.
- INSPIRE ma **gwarantować backend profesjonalnej agencji marketingowej i graficznej** — klient ma WIEDZIEĆ i CZUĆ, jak głęboko poszliśmy w marketing (nawet jeśli pod spodem podpinamy research typu GPTResearcher).
- Efekt końcowy = **profesjonalna, dopasowana do branży i marki klienta reklama na aucie** + makieta, na bazie której grafik robi projekt wektorowy.
- Ktoś ma za to płacić → musi mieć pewność, że warto. INSPIRE oferuje **więcej niż sam mockup** — to jest warunek istnienia produktu.

## FAZY TWOJEJ PRACY

### FAZA 0 — EMBODIMENT (wciel się, zanim cokolwiek napiszesz)
1. **Persona użytkownika INSPIRE** — napisz ją na podstawie dema i treści w repo (kto to jest, czego szuka, job-to-be-done, obawy: „zmarnuję pieniądze", „będzie amatorskie", „nie wiem co działa w reklamie na aucie"), co sprawi, że POWIE „to jest profesjonalne, warto zapłacić".
2. **Przejdź demo jak klient** — realny flow: co widzi, co czuje, gdzie czuje głębię, gdzie czuje pustkę („zwykły chat"). Zapisz listę luk.
3. **Mapa wartości INSPIRE** — co klient dostaje POZA makietyą (brief, uzasadnienie kierunku, doradztwo, materiał dla grafika) — rozstrzygnij, co realnie przebija zwykły chat.

### FAZA 1 — DOPRECYZOWANIE KANONÓW (przebudowa 2 plików — od tego zaczynasz)
Przeredaguj oba pliki do głębi agencji (zachowaj ich rolę jako SoT, po polsku):
- `docs/canons/inspire-product-vision.md` → pełna wizja produktu: propozycja wartości (DLACZEGO warto zapłacić), **warstwy produktu** (brief → kierunek kreatywny + uzasadnienie → makieta → doradztwo → materiał dla grafika), przepływ „rozmowa = profesjonalizm", kryteria ODCZUWALNEJ jakości (klient czuje głębię), zasady uczciwości (co obiecujemy, czego nie), granice odpowiedzialności.
- `docs/canons/inspire-model-prompts.md` → rozbudowana biblioteka promptów: (a) master prompt makiety (mockup-first, jak dotychczas), (b) **język designu per branża** (jak design zmienia się dla elektryka/hydraulika/budowy/czystości itd.), (c) **generator uzasadnienia kierunku** (tekst dla klienta: „dlaczego ten design, te kolory, ta hierarchia" — po NL), (d) specyfikacja **deliverable dla grafika** (brief do ręki), (e) zasady researchu (co statyczna baza wiedzy per branża, co live research typu GPTResearcher — i kiedy).

### FAZA 2 — PROFESJONALNY PLAN PORZĄDKÓW I DZIAŁANIA
Napisz plan (osobny plik w `docs/operations/plans/`), który **gwarantuje** dojście do oczekiwanego rezultatu:
- Każdy krok = cel → działanie → pliki → kryterium akceptacji → evidence → roll-back.
- Porządek w repo: spójność `vision` ↔ `model-prompts` ↔ kod ↔ `todos/inspire.json`; usunięcie każdego rozjazdu (dotychczasowy flat-artwork pipeline = do decyzji: usunąć albo oznaczyć jako fallback demo).
- Kolejność prac T1–T6 (poniżej) rozpisana na etapy z bramkami jakości; żaden etap nie startuje bez zielonej bramki poprzedniego.
- Sekcja RYZYK (model słaby / brak klucza / jakość outputu) z planem B dla każdego.

### FAZA 3 — REALIZACJA PLANU (zakres T1–T6)
**T1 — Prompt builder mockup-first.** `functions/api/v1/prompt-templates.ts` = wierna biblioteka z kanonu (master prompt, zmienne z czatu, bank designu per branża). `buildPrompt()` przepisany. ZAKAZ próśb o tekst/logo/flat artwork.
**T2 — Provider za adapterem.** `callProvider()` = profesjonalny model rastrowy (env: `IMAGE_PROVIDER`, `IMAGE_MODEL`, `IMAGE_API_KEY`; gpt-image / Gemini image). flux = dev-fallback (`cf-flux`). Kontrakt odpowiedzi bez zmian (`data.images[]` 2 warianty, kody błędów z `requestId`). Brak env = jawny błąd + fallback demo oznaczony jako demo.
**T3 — Kompozycja.** Happy path = makieta z modelu + prawdziwe logo klienta (pixel-exact, nigdy przez AI) + opcjonalny kontakt (tekst z czatu). Lokalizacja logo: czysta strefa z promptu + `panel-map.json` skalibrowany 4/4 na realnych outputach modelu. Stary pipeline flat-artwork+maska = poza happy pathem. Twarde fail-safy (ZAKAZ cichych fallbacków).
**T4 — Warstwa „agencja" w UI (nowość wg tej wizji).** Po generacji klient widzi: makiety + **uzasadnienie kierunku** (DLACZEGO ten design dla jego branży/marki) + **mini-doradztwo** (co na aucie: hierarchia treści, czytelność z dystansu, CTA, dane kontaktowe) + **brief dla grafika** (do ręki). Copy NL, uczciwe, zgodne z `marketing-rules.md` / `ux-rules.md`.
**T5 — Research (decyzja architektoniczna w planie).** Phase 1: statyczna baza wiedzy per branża (co działa w reklamie na pojazdach w danej branży — treść w repo, wersjonowana). Phase 2 (opcja): live research typu GPTResearcher — rozstrzygnij w planie, nie wdrażaj bez decyzji Dowódcy.
**T6 — QA + evidence + porządek.** E2E REALNYM FLOW (czat → logo → API → makiety → karty). Bramka jakości: makieta fotorealistyczna, zero artefaktów, zero tekstu/logo w generacji, kolory marki, logo pixel-exact, a personowy test „czy klient czuje profesjonalizm". Evidence w `docs/operations/evidence/`; bramki `build` + `typecheck` + `lint`; handoff; sync `todos/inspire.json`.

## KRYTERIUM OSTATECZNE (od tego zależy werdykt)
**Klient kończący czat ma powiedzieć: „to zrobiła profesjonalna firma brandingowa"** — mimo że to demo. Jeśli po obejrzeniu wyniku czuć „zwykły chat z obrazkiem" = praca odrzucona.

## TWARDE ZAKAZY (naruszenie = odrzucenie pracy)
1. ZAKAZ flat artwork zamiast makiety. 2. ZAKAZ logo klienta przez AI. 3. ZAKAZ cichych fallbacków i ukrywania błędów. 4. ZAKAZ własnych generatorów grafiki. 5. ZAKAZ zmian poza zakresem planu (SCOPE LOCK) i ruszania innych demo (wizard/game/portal). 6. ZAKAZ sekretów w repo; ZAKAZ deployu produkcyjnego (Zasada 11). 7. ZAKAZ pustej deklaracji profesjonalizmu — każda obietnica w UI musi mieć pokrycie w realnym deliverable. 8. ZAKAZ oddawania wyniku z artefaktami na screenie.

## WARUNKI STOP (eskalacja do Dowódcy)
Brak klucza/budżetu modelu → STOP. Model nie spełnia bramki po 2 regeneracjach → STOP z evidence. Wątpliwość, czy deliverable „agencji" jest prawdziwy (nie-dekoracyjny) → STOP i pytanie. Konflikt z kanonem → STOP.

## DEFINICJA GOTOWOŚCI (DoD)
- [ ] Kanony przebudowane (`inspire-product-vision.md`, `inspire-model-prompts.md`) — głębia agencji, zero rozjazdów
- [ ] Profesjonalny plan w `docs/operations/plans/` — każdy krok z kryterium/evidence/roll-back
- [ ] Makiety fotorealistyczne (4 pojazdy × 2 warianty) z prawdziwym logo pixel-exact
- [ ] Klient widzi: makiety + uzasadnienie kierunku + mini-doradztwo + brief dla grafika
- [ ] Prompt mockup-first spójny docs↔kod; model za `callProvider()` (env); flux = dev-fallback
- [ ] Test persony: „profesjonalna firma brandingowa" — screen = dowód
- [ ] build+typecheck+lint zielone; mobile 375px; evidence + handoff + todos sync
- [ ] Werdykt Dowódcy (TAK/NIE) — bez niego nie jest „done"
