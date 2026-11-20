# INSPIRE — biblioteka decyzji projektowych

## Makieta, nie plik do druku

Master (treść angielska w `functions/api/v1/prompt-templates.ts`): fotografia studyjna jednego całego auta, dokładny profil z przodem po lewej, neutralne tło, koła prosto. Klasa z zamkniętej listy czatu. Użyj do trzech kolorów HEX; brak = neutralny szkic, nie kolory marki. Dwa projekty oklejenia folią na tym samym obszarze karoserii. A: spokojne szerokie pole i jeden akcent; B: dynamiczne pasma prowadzące wzrok wzdłuż nadwozia. Żadnych zdejmowanych tablic ani osobnych pakietów cenowych. Na przednich drzwiach zostaw płaskie, jednolite pole bez linii, z dala od klamki. Zabroń tekstu, cyfr, logo, tablic z napisem, znaków wodnych, QR, ludzi, obcych pojazdów, kolaży, prostokątnych nakładek, deformacji i kadrowania. Zakazy wpisuj w treść, nie w parametr negative_prompt. Żadnej nazwy, danych kontaktowych ani obrazu logo w żądaniu.

`POST /v1/images/generations`, `model=gpt-image-2.6-sunburst`, `size=1536x1024`, `quality=high`, `n=1`, `output_format=png`; odczyt `data[0].b64_json`. Oddzielne wywołanie na kierunek. [Model i ceny](https://developers.openai.com/api/docs/models/gpt-image-2.6-sunburst).

| Baza branżowa v1 | Gest wizualny | Hipoteza do sprawdzenia z klientem |
|---|---|---|
| Elektryk | Precyzyjny rytm dwóch równoległych linii | Rozpoznawalność przez porządek; bez błyskawicy i fikcyjnych certyfikatów. |
| Hydraulika | Jedna ciągła krzywa | Płynność prowadzi wzrok do kontaktu; bez kropli i deklaracji pogotowia. |
| Budowa | Szeroki stabilny blok | Kontrast ważniejszy niż lista robót na zapylonym aucie. |
| Czystość | Dużo jasnej przestrzeni, jedno pasmo | Spokój i czytelność; nie obiecuj sterylności. |
| Inna | Jedno pole i jeden akcent | Zacznij od charakteru marki, nie zgaduj specjalizacji. |

**Generator uzasadnienia NL:** „Voor [situatie uit de briefing] kiezen we [concrete vorm]. Daardoor zie je eerst [prioriteit]. We laten [element] weg omdat [afweging].” Każdy nawias wymaga faktu albo jawnej rekomendacji; brak → „Nog te bevestigen”. Nie opisuj cech obrazu, których nie zweryfikowano. Przykład dla elektryka: „Twee evenwijdige lijnen houden de zijkant rustig. Op een rijdende bus krijgt één dienst voorrang boven een lijst met werkzaamheden.”

**Brief do ręki (NL):** Opdrachtgever / doelgroep en dienst / gebruik en zichtmoment / voertuigklasse / gekozen richting en reden / kleurcodes / origineel logobestand / één bevestigde CTA / budgetgrens / open vragen voor de vormgever. Ostatnia rubryka zawsze obejmuje pomiar drzwi, odstęp od klamki, próbę koloru i sprawdzenie kontaktu. Plik koncepcyjny nie jest plikiem produkcyjnym.

**Research:** wersjonowana tabela to heurystyki projektowe, nie wyniki badań o firmie. Przy nietypowej działalności poproś o przykład lub priorytet. Live research tylko po osobnej decyzji: źródło, data i zgoda na zakres; bez przekazywania plików logo i kontaktu. Nie nazywaj statycznych porad analizą rynku.
