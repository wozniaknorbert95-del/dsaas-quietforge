# INSPIRE — biblioteka promptów dla modelu obrazkowego (SoT)

**Właściciel promptów:** orchestrator (Hermes) · **Wersja:** 2026-11-20 · **Status:** WIĄŻĄCA
**Zasada:** model generuje **GOTOWĄ MAKIETĘ** (fotorealizm studyjny, pojazd z designem, czysta strefa logo). Nigdy flat artwork. Nigdy tekstu/logo w obrazie.

Zmienne pochodzą WYŁĄCZNIE z czatu INSPIRE. `{VAR}` = podstawienie, `[[ ]]` = warunkowe.

---

## 1. MASTER PROMPT — makieta pojazdu (wariant STANDARD)

```text
Professional commercial mockup photograph for a vehicle branding presentation.

SUBJECT: A {VEHICLE_DESCRIPTION} with a complete professional vinyl wrap in a
bright photography studio, shot in exact side profile (90 degrees), the entire
vehicle visible and perfectly centered in frame, wheels straight, soft even
studio lighting, subtle floor reflection, clean light-grey seamless background.

BRAND DESIGN ON THE VEHICLE: Modern professional commercial wrap design using
exactly these brand colors: {BRAND_COLORS}. Design language: clean geometric
shapes, one bold diagonal or horizontal motion element along the vehicle line,
strong visual hierarchy, generous negative space, production-ready vinyl
graphics covering the side panels, rear and hood consistently.

LOGO ZONE: On the front door / cab door there is a large, completely clean,
flat area in one calm solid color — unobstructed by any shapes, lines or
textures — sized and positioned like a company logo placement. Nothing in that
area. [[ This area is reserved for a real logo that will be placed later. ]]

CONTEXT: The wrap is for a {BUSINESS_CATEGORY} company.

QUALITY: Photorealistic, high-end commercial studio mockup, sharp focus, crisp
graphics edges, accurate perspective, 8k detail, magazine-quality presentation
image — the kind of image a professional design agency shows a client.

NEGATIVE (must not appear): any text, letters, numbers, words, typography, any
logo, brand name, symbol, emblem, watermark, QR code, people, reflections of
photographer, other vehicles, street scenes, clutter, blur, distortions,
deformed wheels, extra wheels, cropped vehicle, floating panels, rectangular
image overlays, collage elements.
```

## 2. MASTER PROMPT — wariant PREMIUM (podmiana bloku BRAND DESIGN)

```text
BRAND DESIGN ON THE VEHICLE: Premium, sophisticated wrap design using exactly
these brand colors: {BRAND_COLORS}. Design language: elegant flowing organic
curves or layered sweeping elements along the vehicle body, refined metallic or
glossy accents, luxurious feel, balanced composition with deliberate negative
space, gallery-grade branding artwork covering the vehicle sides consistently.
```

Pozostałe bloki (SUBJECT, LOGO ZONE, CONTEXT, QUALITY, NEGATIVE) — **bez zmian**.

---

## 3. SŁOWNIK ZMIENNYCH (mapowanie z czatu → prompt)

| Zmienna | Źródło (czat) | Wartości / format |
|---|---|---|
| `{VEHICLE_DESCRIPTION}` | `vehicle` (draft) | `caddy` → "white compact commercial panel van (VW Caddy class)" · `bus_l` → "white medium commercial panel van (Renault Trafic / Opel Vivaro class)" · `bus_xl` → "white large high-roof commercial panel van (Mercedes Sprinter class)" · `passenger` → "white station wagon / estate car (Volvo V60 class)" |
| `{BRAND_COLORS}` | `brand_colors` (ekstrakt z logo) | "#RRGGBB, #RRGGBB" (max 3, posortowane udziałem); brak → "professional navy blue and white commercial palette" |
| `{BUSINESS_CATEGORY}` | `branche` (draft) | wolne słowo kluczowe, max 40 znaków (np. "electrical services", "construction", "cleaning services") |

**Sanityzacja:** tylko dozwolone wartości; tekst z czatu → `sanitizeText` (bez cudzysłowów, max długości); kolory → walidacja HEX.

## 4. PARAMETRY GENEROWANIA (kontrakt dla providera)

| Parametr | Wartość |
|---|---|
| Rozmiar | 1536×1024 (landscape 3:2 — format makiety) lub maks. dostępny u providera |
| Liczba wariantów | 2 (standard + premium) na jedno „Generuj" |
| `quality` | najwyższa dostępna (np. `high` dla gpt-image) |
| Format odpowiedzi | base64 PNG/JPEG |
| Seed | nie deterministyczny (różnorodność odświeżeń) |

## 5. REGENERACJA (przycisk „odśwież")

Ten sam master prompt + jawny wariant stylu (drugi system designu, patrz §6), NIGDY identyczny obraz. Historia wariantów w UI: „Kierunek A / Kierunek B".

## 6. BANK JĘZYKÓW DESIGNU (podmieniane w bloku BRAND DESIGN)

| ID | Język designu (linia do wstawienia) | Poziom |
|---|---|---|
| `geo-motion` | bold diagonal motion bands with a single accent stripe, geometric precision | standard |
| `clean-block` | confident asymmetric color blocks with one angled leading edge, minimal | standard |
| `flow-curve` | elegant flowing organic curves sweeping the full vehicle length | premium |
| `layer-sweep` | layered sweeping elements with refined accent lines, crafted depth | premium |
| `grid-tech` | precise technical grid patterns with bold brand fields, engineering feel | standard |
| `mono-luxe` | monochrome brand field with one metallic accent line, ultra-premium restraint | premium |

Wybór banku: variant standard → `geo-motion` / `clean-block`; premium → `flow-curve` / `layer-sweep` (rotacja przy regeneracji). Decyzja Dowódcy może przestawić mapowanie.

## 7. KONTROLA JAKOŚCI OUTPUTU (bramka przed pokazaniem klientowi)

Automat + oko agenta; **każdy warunek = twardy**:
1. Pojazd w całości w kadrze (żadnego przycięcia), ujęcie boczne.
2. Brak jakiegokolwiek tekstu/logo/wody w obrazie (wykrycie: OCR-vision lub oko).
3. Strefa logo (drzwi) = płaska i czysta — jeśli model ją zasłonił → regeneracja.
4. Brak artefaktów: prostokąty, nakładki, zdeformowane koła/szyby, obce obiekty.
5. Kolory designu zgodne z `{BRAND_COLORS}` (± odchylenia oświetlenia).
6. Po kompozycji logo: logo pixel-exact (bez rozciągnięcia), w strefie, nie wychodzi poza drzwi.

Niespełnienie któregokolwiek = **regeneracja**, max 2 próby, potem fallback demo (uczciwie oznaczony).

## 8. ZAKAZY DOTYCZĄCE PROMPTÓW

1. NIGDY nie proś modelu o tekst, logo, nazwy firm, dane kontaktowe (to doklejamy mechanicznie).
2. NIGDY nie wysyłaj logo klienta do modelu (anizielu jako referencji).
3. NIGDY nie generuj „flat design artwork", „print file", „vector" — zawsze MAKIETA (mockup photograph).
4. NIE zmieniaj bloku NEGATIVE bez zezwolenia — on chroni nas przed artefaktami.
5. Prompt zawsze ≤ limitu providera; wersja w kodzie = kopia tego pliku (spójność).
