# DESIGN QUALITY STANDARD + UX STATES (SH-G1-03)

**Status:** v1 · 2026-11-18 · lekki wspólny standard (min complexity — NIE wielki design system).
**Zasada:** agent NIE tworzy komponentów od nowa w każdym demo — reuse poniższych wzorców.

## 1. Skala i typografia
- Spacing scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 px (tylko te wartości).
- Typografia: 1 font display (nagłówki/przyciski), 1 body, 1 mono (dane). Skala 12→48 px. Line-height 1.2 display / 1.5 body.
- Button hierarchy: **primary** (1 na viewport) · **secondary** · **ghost**. Min-height 44 px (mobile 48). Etykieta = czasownik akcji.
- Input: label zawsze widoczny, error pod polem, min-height 44 px, focus ring 2 px.
- Card: 1–2 px border, ostry róg (0–4 px), cień tylko przy modalach. Modal: backdrop + 1 akcja główna.
- Breakpoints: 375 · 640 · 900 · 1280. Mobile-first.

## 2. UX STATES (obowiązkowe w każdym flow)
| Stan | Wymaganie |
|---|---|
| **Loading** | użytkownik wie, że system pracuje (skeleton/progress + etykieta „In behandeling…"), blokada podwójnego submitu |
| **Success** | wynik WIDOCZNY + jednoznaczna kolejna akcja (download / kolejna wersja / powrót) |
| **Error** | zrozumiały komunikat (co się stało + co zrobić), nie kod błędu bez tłumaczenia; zachowany stan użytkownika |
| **Recovery** | retry (z limitem), cofnięcie, bezpieczny powrót; po 3 próbach → jasna eskalacja (kontakt) |
| **Empty** | co tu będzie + jak zacząć |
| **Disabled** | dlaczego zablokowane (np. „Nog €70 tot minimum") |

## 3. Visual density („chaos na starcie")
- Powyżej foldu: **maks. 1 główna akcja + 1 drugorzędna**. Reszta treści → accordion / poniżej foldu / progressive disclosure.
- Sekcja = 1 myśl (nagłówek + ≤3 zdania + element interakcji). Bez ścian tekstu.
- Kolejność sekcji = kolejność decyzji klienta (nie kolejność implementacji).

## 4. Motion
- Tylko potwierdzające interakcję (≤200 ms). Pełne poszanowanie `prefers-reduced-motion`. Bez parallaxu/dekoracji.

## 5. Odbiór jakościowy (evidence dla tasków UI)
Screenshot przed/po × {375, 768, 1280} + stany loading/success/error. Visual regression baseline w `tests/`.
