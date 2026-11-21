# 05 — Pytania otwarte

Stan: 2026-11-21 (aktualizacja po odpowiedziach Norberta tego samego dnia, D4–D11).
Rozjazdy z audytu F1 i sprawdzenia CEO. **Naprawę wdrażamy po F3**, każdy osobno i za zgodą Norberta.

## A. Rozjazdy (fakty sprawdzone, decyzja potrzebna)

| # | Rozjazd | Dowód (2026-11-21) | Status / pytanie |
| --- | --- | --- | --- |
| R1 | Publiczny e-mail to quietforge@flexgrafik.nl, a flexgrafik.nl nie istnieje (NXDOMAIN). Na quietforge.nl działa poczta Migadu (MX/SPF/DKIM/DMARC), ale usługa zawieszona od 17.11. | https://quietforge.nl/legal/, dns.google, `02-fakty.md` | **Otwarte:** jaki adres @quietforge.nl ma być publicznym kontaktem (zależy od naprawy poczty)? |
| R2 | Nie wiadomo, czy formularz dostarcza zgłoszenia (kod: Resend albo `503 INTAKE_NOT_READY`). Nie testowano POST. | https://quietforge.nl/book-a-scan/, `functions/api/intake.ts` | Czy CEO może wysłać jedno zgłoszenie testowe? Na jaki adres mają przychodzić? |
| R3 | Tytuł /proof/ „verified by clients”, a klientów brak (jedyny przykład: FlexGrafik „NOT A CLIENT CASE”, „offline”). | https://quietforge.nl/proof/ | Zmienić tytuł /proof/ na zgodny z treścią? |
| R4 | Profil GitHub (pole blog i README) oraz README repo kierują na martwy quietforge.flexgrafik.nl; Homepage repo = stara kopia Vercel. | https://github.com/wozniaknorbert95-del, README profilu, ustawienia repo | **ROZSTRZYGNIĘTE → D6** (quietforge.nl wszędzie). |
| R5 | Stara kopia na Vercel jest publiczna i pokazuje stare ceny (€2,500–€7,900). | https://flexgrafik-services.vercel.app/pricing/ | **ROZSTRZYGNIĘTE → D5** (Vercel ma być wyłączony). |
| R6 | /legal/ podaje „hosting (Vercel)” jako podprocesora, a strona stoi na Cloudflare. | https://quietforge.nl/legal/ | Poprawić listę podprocesorów (Cloudflare, Resend, Migadu?) — kto zatwierdza treść prawną? |
| R7 | Stopka: „Service in EN and NL”, a /nl/ = 404 i brak wersji NL. Klient docelowy to firmy w NL. | https://quietforge.nl/nl/ | **ROZSTRZYGNIĘTE → D7** (EN+PL obsługa, nie NL; stopka do poprawy). |
| R8 | /privacy/, /cookies/, /contact/ = 404 (polityka jest na /legal/). | curl 2026-11-21 | Dodać przekierowania na /legal/ i /book-a-scan/? |
| R9 | /growth-os/ (strona testowa „active test tenant”) jest publiczna. | https://quietforge.nl/growth-os/ | Ukryć / przekierować? |
| R10 | Strona pokazuje 9 systemów i 3 skany, a decyzja D1 mówi „jedna prosta oferta”. | https://quietforge.nl/systems/, /pricing/ | **ROZSTRZYGNIĘTE → D10** (zostają skany + 9 systemów; doprecyzowanie 22.11 na mapie STRONA). |
| R11 | Brak pomiaru odwiedzin: w HTML nie ma ani Umami, ani GA (CSP dopuszcza GA, kod GA czeka na ID). Mapa twierdzi „Umami · odwiedziny”. UTM są tylko na linkach WhatsApp. | https://quietforge.nl/ | **ROZSTRZYGNIĘTE → D8** (ruch w Cloudflare, nie GA). |
| R12 | Zakładka STRONA w mapie mówi, że strona jest na Vercel i formularz idzie przez Cyberfolks (stan 26.10/02.11). | `mapa-quietforge/build/tools/parts/c5_eko_strona.py` | **ROZSTRZYGNIĘTE → D11** (przebudowa mapy później; poprawka treści w osobnym PR do mapy). |
| R13 | Stary `brain.md` jest wewnętrznie sprzeczny (Cloudflare w §1, stare ścieżki i „Last updated 2026-07-15” dalej). | `brain.md` | **ROZSTRZYGNIĘTE → F3** (oznaczony jako zastąpiony przez `docs/ceo/`). Usunąć kiedyś całkiem? |
| R14 | Dwa adresy LinkedIn w obiegu: /in/flexgrafik-quietforge (strona, GitHub) i /in/quietforge (indeks wyszukiwarki). Treści LinkedIn nie da się odczytać automatycznie (HTTP 999). | F1 §5 | **ROZSTRZYGNIĘTE → D9** (`/in/quietforge/`). |
| R15 | Starsze decyzje z 30.10.2026 w `mapa-quietforge/docs/decyzje/odpowiedzi-dowodcy.txt` mówią o 5 klientach/5 scanach — to koliduje z D1 (3 klientów w 90 dni). Treści pliku CEO nie czytał sam (zgłoszone w audycie 21.11). | audyt 21.11.2026 | **ROZSTRZYGNIĘTE → D4** (cel 3 klientów zastępuje 5 z 30.10). |
| R16 | README repo nadal obiecuje „free pilot offers” i „autonomous operating system”; żywa strona sprzedaje płatny skan z zatwierdzaniem przez właściciela. | `README.md` | **ROZSTRZYGNIĘTE → D6** (zgoda na quietforge.nl; treść README — osobna poprawka). |
| R17 | Poczta Migadu zawieszona po końcu trialu 17.11.2026; DNS nadal wskazuje Migadu. | `02-fakty.md`, zrzut Norberta 21.11.2026 | **Otwarte:** opłacić Migadu czy wybrać alternatywę (i kiedy zmienić DNS)? |

## B. Hipotezy z planu innego AI (`dfb293e4…txt`) — NIE są faktami ani decyzjami

Każdy punkt: **hipoteza (plan innego AI)**. Do sprawdzenia albo odrzucenia przez Norberta (nadal otwarte, chyba że w przyszłości zostanie decyzja).

### Ceny i oferta
- Trzy oferty: Business Scan „€149+”, Automation Build „wycena indywidualna”, Monthly Care „abonament miesięczny” (bez kwoty). — hipoteza (plan innego AI)
- Model przychodu: klient 1 płaci za wdrożenie i za miesięczną obsługę, kolejni kupują wdrożenia. — hipoteza (plan innego AI)
- Uwaga: abonament koliduje z decyzją z 30.10 „cen opieki nie pokazujemy” (wg mapy) i z D1 „jedna prosta oferta” (D10: skany + systemy na stronie do doprecyzowania 22.11). — pytanie

### Branże
- Start: firmy instalacyjne i klimatyzacyjne w Rotterdamie i okolicy. — hipoteza (plan innego AI)
- Dalej: panele/baterie, budowlane i remontowe, sprzątające, okna i drzwi, catering, biura instalacyjne. — hipoteza (plan innego AI)
- Agencje marketingowe jako klienci lub partnerzy. — hipoteza (plan innego AI); koliduje z mapą („agencje digital wypadają z listy klientów”, decyzja 30.10 wg mapy)

### Platformy i kanały
- Priorytet 1: Freelance.nl i LinkedIn; priorytet 2: Malt, Upwork; dalej Fiverr, Hoofdkraan. — hipoteza (plan innego AI)
- Agregatory zleceń: Freelapp, ZZP Opdrachten, ZZPPunt, MiPublic (sektor publiczny). — hipoteza (plan innego AI)
- Trzy kanały naraz: kontakt bezpośredni, platformy zleceń, partnerzy (agencje, webdesignerzy, IT). — hipoteza (plan innego AI)

### Tempo i KPI
- 7-dniowy plan: lista 50 firm, 20 pierwszych kontaktów, demo, follow-up. — hipoteza (plan innego AI)
- Dzienne KPI: 20 znalezionych firm, 15–20 kontaktów, 2–5 aplikacji, 5–10 follow-upów. — hipoteza (plan innego AI)
- Wiadomość otwierająca po niderlandzku (szablon w pliku źródłowym). — hipoteza (plan innego AI); wysyłka tylko za zgodą Norberta

### Analityka (rekomendacja innego AI)
- Własna analityka na Cloudflare (Workers + D1 + dashboard) oraz zdarzenia `book_scan_click`, `whatsapp_click`, `scan_purchase` — **hipoteza do oceny** (nie fakt; koliduje / uzupełnia D8: pomiar w Cloudflare — zakres do ustalenia).

## C. Niesprawdzone (brak dostępu lub poza zakresem 21.11)
- Czy sekrety Resend są ustawione w projekcie Pages (CEO nie czyta sekretów).
- Czy skrzynki na quietforge.nl działają po wznowieniu lub zmianie dostawcy (Migadu zawieszone — patrz R1, R17).
- Treść profili LinkedIn (HTTP 999 przy automatycznym odczycie).
- Ostatni bieg Lighthouse CI na `main`.