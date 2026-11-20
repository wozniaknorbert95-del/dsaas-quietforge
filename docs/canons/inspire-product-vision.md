# KANON PRODUKTU — INSPIRE: makiety prezentacyjne (SoT oczekiwań Dowódcy)

**Status:** WIĄŻĄCY · **Data:** 2026-11-20 · **Nadpisuje:** wszystkie wcześniejsze założenia o „flat wrap artwork"
**Rozkaz Dowódcy (2026-11-20):** „My generujemy makiety, na bazie których grafik tworzy projekt wektorowy. Czyli piękny mockup dla auta klienta z jego logo."

---

## 1. CO TO JEST INSPIRE (produkt)

Demo sprzedażowe FlexGrafik (quietforge.nl → „Cztery drzwi" → INSPIRE). Klient w **czacie** podaje dane swojej firmy i pojazdu, a narzędziem końcowym jest:

> **Profesjonalna makieta prezentacyjna pojazdu klienta z jego PRAWDZIWYM logo** — taka, po której klient mówi „tak, to ma być mój bus", a grafik na tej podstawie tworzy docelowy projekt wektorowy do produkcji.

Makieta jest **produktem demo** (to, co klient dostaje w demie). Projekt wektorowy = praca grafika downstream (usługa FlexGrafik, faza 2).

## 2. PRZEPŁYW PRODUKTOWY (jedyny prawidłowy)

```
CZAT (zbiera dane)                    GENEROWANIE                    PREZENTACJA
bedrijfsnaam, branche,      →   MOCKUP pojazdu klienta z     →   2 makiety na kartach
voertuig, logo*, kolory,         profesjonalnym designem            €149 / €399
kontakt                          w kolorach marki,                  + logo klienta
                                 strefa logo = czysta               mechanicznie
* logo NIGDY nie przechodzi przez AI — wyłącznie kompozycja mechaniczna (pixel-exact)
```

## 3. SEDNO ROZJAZDU (dlaczego dotychczasowa generacja była błędna)

| Było (BŁĘDNIE) | Ma być (OBOWIĄZKOWO) |
|---|---|
| Model rysuje **płaski wzór** (flat design artwork do druku) | Model generuje **gotową MAKIETĘ**: fotorealistyczny pojazd z nałożonym designem |
| My „komponujemy" wzór na zdjęciu szablonu (prostokąty, maski, blendy) | My doklejamy **tylko prawdziwe logo** (i ewentualnie kontakt) w czystą strefę makiety |
| Grafik dostaje materiał źródłowy | Grafik dostaje **wizualizację do akceptacji klienta** — na jej bazie tworzy wektor |
| Efekt: szare prostokąty, kolaże, „naklejki" | Efekt: wygląda jak sesja zdjęciowa studia graficznego |

**Reguła:** jeśli wynik generowania wymaga od nas ratowania kompozycji (maski, wytnij-tło, prostokąty) = generacja jest zła. Makieta ma wychodzić z modelu **gotowa**.

## 4. OCZEKIWANIA — BEZWZGLĘDNE (MUSI)

1. **Makieta = fotorealizm studyjny.** Jakość porównywalna z darmowym GPT/Gemini — to jest MINIMUM, nie cel.
2. **Pojazd klienta** = typ z czatu (caddy / bus_l / bus_xl / passenger) w ujęciu bocznym, cały widoczny, studio.
3. **Design na pojeździe** = profesjonalny wrap w **kolorach z logo klienta** (dane z czatu), spójny z branżą.
4. **Strefa logo = czysta** (płaskie, spokojne pole na drzwiach) — model jej nie zasłania; my wklejamy prawdziwe logo mechanicznie, pixel-exact, bez deformacji i bez przeskalowywania proporcji.
5. **Zero tekstu/logo w generacji** — model nie tworzy żadnych napisów, logotypów, znaków.
6. **2 warianty** (Standard/Premium) na kartach produktów (€149 „Magneten" / €399 „Wrap").
7. **Dane z czatu = jedyny input treści.** Zero zmyślonych nazw, klientów, realizacji.
8. **Uczciwy fallback** — brak generacji = oznaczone demo, nigdy podrabiane pod wynik.
9. **Limit Phase 1:** 1 generacja / odwiedzający (zero kosztów AI dla gości).

## 5. MODEL GENERUJĄCY

- **Produkt:** profesjonalny model rastrowy (decyzja Dowódcy: GPT 2.6 / Gemini image / inny — po porównaniu jakość/cena).
- **Integracja:** adapter `callProvider()` w `functions/api/v1/generate-art.ts` — wymiana modelu = jedna funkcja.
- **flux-1-schnell:** wyłącznie dev-fallback (jakość nieakceptowalna jako produkt — werdykt 2026-11-20).
- Prompty modelu = **biblioteka w repo** (`docs/canons/inspire-model-prompts.md`) — jedno źródło, wersjonowane.

## 6. TWARDE ZAKAZY (dotyczą wszystkich agentów)

1. ZAKAZ generowania „flat artwork" / materiału dla grafika zamiast makiety.
2. ZAKAZ przepuszczania logo klienta przez model AI.
3. ZAKAZ cichych fallbacków (brak zasobu = widoczny błąd, nie „ładnie dalej").
4. ZAKAZ własnych generatorów grafiki (SVG/proceduralne) — jakość = model.
5. ZAKAZ testowania innej ścieżki kodu niż realny flow klienta (QA = czat → API → makieta → karty).
6. ZAKAZ publikacji wyniku, który na screenie zawiera artefakt (prostokąt, krawędź, obce tło, zdeformowane logo).

## 7. POWIĄZANIA

- Prompty modelu: [`inspire-model-prompts.md`](inspire-model-prompts.md)
- HARD rules sesyjne: `todos/inspire.json` → `hard_rules`
- Repair plan (historia): `docs/operations/plans/2026-11-20-inspire-repair-plan.md`
- Kanony marketingu/konwersji: `docs/canons/marketing-rules.md`, `docs/canons/proof-rules.md`
