# Przejście persony — stan wejściowy, nie odbiór jakości

Na lokalnym demie w Chromium, 375 × 812, podałem „Stroom op Maat”, wybrałem Installatie/elektra → Rotterdam → Caddy/Partner → Alleen zakelijk → Strak → Bellen → Tot €150 → Strikt. Wgrałem testowy PNG i potwierdziłem brief. Karty: Magneten €149, Wrap €399 jako kierunek rozwoju. Bez API wynik kończy się uczciwym „Demo-voorbeeld — live generatie was niet beschikbaar”. To dowód ścieżki awaryjnej, nie generacji.

**Moja decyzja jako właściciela:** chcę, by sąsiad rozpoznał usługę przy następnym postoju. Nie wiem, co wyrzucić z projektu. Nie kupię droższego pakietu tylko dlatego, że wygląda bogaciej. Pytanie o użytek prywatny wyjaśnia sens zdejmowanych magnesów; rozróżnienie telefonu i strony daje rzeczywisty wybór. Ale pytanie o postój pozwala jednym kliknięciem podać samo miasto. Pytanie o telefon nie potwierdza numeru. W podsumowaniu pojawia się obca marka i liczba klientów zamiast uzasadnienia mojej hierarchii. Przykład nie pokazuje, gdzie skończy się pole folii na moim aucie.

**Za co zapłacę:** jedna decyzja o odbiorcy i sytuacji ekspozycji, dwa porównywalne warianty z kosztem i kompromisem, test czytelności, wreszcie dokument, który mogę przekazać grafikowi bez powtarzania rozmowy. Bez danych decyzję oznaczyć jako hipotezę. Test odbioru: czy potrafię wybrać wariant, wskazać powód i nazwać rzecz do sprawdzenia przed drukiem?

## Kontrole po zmianach
- `node --experimental-strip-types tests/inspire/prompts.mjs`: 8 różnych promptów, brak surowej treści branży i niepoprawnych kolorów.
- `node tests/inspire/provider.cjs`: prawdziwy handler, lokalny SQLite, atrapa transportu bez sekretu. Dwie fale po 10 równoległych żądań; w każdej przeszły cztery, sześć zatrzymano przed fetch. Brak danych usage celowo zostawia pełne rezerwy. Osobno brak klucza = 503 bez fetch. To nie jest pomiar ceny u dostawcy.
- Typecheck i build zaliczone; link checker: 0 błędów wewnętrznych. Lint: 0 błędów, 10 ostrzeżeń poza zakresem INSPIRE.
- Koszt faktyczny tej sesji 0 USD (zero płatnych wywołań). Nie znaleziono lokalnego sekretu/bindingu; środowisko nie ma sieci do API modelu. Bez deployu, bez produkcyjnego QA, bez screenów udających wynik.
- Powtórzenie ścieżki 375 px: [brief przed potwierdzeniem](inspire-brief-375.png). Widoczne techniczne `tot_150`, `MA-005`, `NA-WRAP-BASIC` i słaby kontrast „Aanpassen” to konkretne poprawki dla T4, nie dowód profesjonalizmu końcowego.
- Skan pełnego tekstowego diffu (nowe pliki uwzględnione przez intent-to-add), prefiks kluczy OpenAI: **0 trafień**. Sekretu nie kopiowano do pliku ani polecenia.

## Odbiór offline po wycofaniu oferty magnesów

Test powtarzalny: `tests/inspire/flow.mjs`, Chromium 375 × 812. W przeglądarce podano usługę „Groepenkast vervangen”, odbiorcę „Huiseigenaren”, ekspozycję w ruchu, CTA telefon, logo PNG i budżet do €150. Trzy niezależne przejścia: (1) dwie inspekcje położenia logo → dwie kompozycje PNG → wybór B → brief, (2) niedostępne API → oznaczone przykłady i działający brief, (3) odrzucenie obrazu w kontroli graficznej → oznaczone przykłady, bez rzekomego wyniku. Wszystkie bez poziomego przewijania i błędów JS. Brak nazw magnesów, dawnego SKU i cen pakietowych w wyrenderowanym UI. [Fragment briefu, test offline](inspire-wrap-brief-offline.png).

Test ścieżki pozytywnej podstawia istniejące pliki do odpowiedzi API, nie udaje inspekcji Sunburst. Osobne testy wykonują prawdziwy handler z atrapą sieci i SQLite oraz sprawdzają bank języka czterech branż i nieznanej działalności. Koszt 0 USD. Pozostaje porównać surowe i złożone obrazy w prywatnym preview zgodnie z handoffem.
