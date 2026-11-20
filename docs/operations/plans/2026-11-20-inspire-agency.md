# INSPIRE — kolejność odbioru

Cel: rekomendacja do zaakceptowania i przekazania grafikowi, nie ilustracja. Zakres: tylko INSPIRE, jego endpoint, budżet i testy. Implementację i testy offline kończymy przed pushem; akceptację wizualną na prawdziwym modelu wykonujemy dopiero po deployu preview. Cofanie nigdy nie zeruje historii wydatków.

## Zmiana oferty — wyłącznie wrapping

INSPIRE oferuje koncepcję reklamy wykonanej z folii na karoserii. Klient porównuje **dwa kierunki graficzne dla tego samego auta i zakresu oklejenia**, nie magnes z wrapem i nie dwa pakiety cenowe. NL: „Richting A — rustig en helder” / „Richting B — krachtig en opvallend”. Wybór prowadzi do briefu dla grafika i zapytania o wycenę oklejenia. Makieta nie jest sprzedażą folii, montażu ani pliku produkcyjnego. Nie przenosimy cen €149/€399 do nowej oferty.

1. **Najpierw wycofać Magneten z całej ścieżki INSPIRE.** Sprawdzić `index.html` (także FAQ i meta), `demo-boot.js`, paczki językowe, `panel-map.json`, etykiety kart, przykłady awaryjne i cele CTA. Usunąć rekomendację magnesów dla leasingu/prywatnego użytku, SKU `MA-005` i linki prowadzące do tego produktu. Przy leasingu zapisać „toestemming voor wrapping nog te bevestigen”. Nie zmieniać katalogu innych dem. Historyczne evidence opisuje stan **przed** zmianą.
2. **Dostosować brief, prompt i makiety.** Budżet to ograniczenie do rozmowy z grafikiem, nie przełącznik produktu. W obu promptach folia podąża za karoserią, bez prostokątnego nośnika; oryginalne logo poza modelem. Zachować 4 pojazdy × 2 kierunki. Wewnętrzne klucze `standard/premium` mogą pozostać wyłącznie dla zgodności API.
3. **Odbiór przed pushem.** W realnym UI z atrapą API przejść czat, upload, potwierdzenie, oba wyniki, wybór kierunku i fallback. Sprawdzić także mobile 375 px: zero oferty magnesów, starego SKU, cen pakietów i magnesowych CTA; oba warianty mają uzasadnienie NL oraz brief o oklejeniu. Build, typecheck, lint i kontrola sekretów → commit i push na bieżącą gałąź.
4. **Po deployu preview** powtórzyć flow na Sunburst, skalibrować strefy logo i ocenić osiem wyników wg T3/T6. Nie oznaczać jakości wizualnej jako zaakceptowanej przed tym testem.

| Bramka / cel | Działanie i pliki | Akceptacja i dowód | Wycofanie |
|---|---|---|---|
| 0–2: rozpoznać decyzję klienta | Przejście czatu, evidence/inspire-agency, dwa canons/inspire-*, ten plan | Konkretne wybory persony i luka w handoffie nazwana | Wrócić do diagnozy |
| T1: poprawić przedmiot generacji | prompt-templates.ts i generate-art.ts; usunąć flat prompt | 4 klasy × 2 warianty; brak PII; test tabelaryczny | Wyłączyć provider, nie przywracać flat |
| T2: bezpiecznie kupić raster | generate-art.ts, atomowy budżet D1 + ślad KV, konfiguracja preview | Testy odmowy i równoległości, następnie potwierdzona odpowiedź API w realnym flow; błąd lub przekroczenie = brak wywołania | Odpiąć binding/key, zachować księgę |
| T3: zachować znak marki | demo-boot.js, mockup-composer.js, panel-map.json; karoseria już w obrazie | 4/4 kalibracje na realnych wynikach, oryginalne proporcje i kontrola pustej strefy w obu wariantach; screen przed/po | Wyłączyć prezentację, jawny przykład |
| T4: oddać decyzję | index.html i demo-boot.js: karty NL, uzasadnienie z briefu, test dystansu i kopiowalny handoff | Persona wybiera i tłumaczy kompromis; grafik może wskazać brakujące pomiary bez rozmowy od zera | Wycofać obietnice wraz z kartami |
| T5: ograniczyć research | Sprawdzić pokrycie tabeli branżowej w promptach i kartach | Cztery branże i przypadek nieznany bez fikcyjnych danych; testy tekstu | Neutralna rekomendacja; research live nieaktywny |
| T6: odebrać | Realny czat, logo, API, kompozycja, karty; todos/inspire.json, evidence i handoff | 8 obrazów po inspekcji, mobile 375, build/typecheck/lint, licznik USD, skan sekretów, decyzja TAK/NIE | Bez TAK nie publikować |

Ryzyka: brak klucza/sieci → darmowy test układu lub jawny przykład, brak zaliczenia T2. Słaby model → nie publikować; najwyżej dwie regeneracje w granicach budżetu, potem STOP. Niepewne położenie logo → nie używać współrzędnych ze zdjęć szablonowych. Połowa budżetu → raport koszt/obraz + ocena jakości, pauza na decyzję. KV nie zapewnia atomowego licznika globalnego; brak wspólnej atomowej bazy = płatny adapter zamknięty. Bez deployu produkcyjnego.
