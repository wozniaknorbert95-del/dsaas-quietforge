# Plan — DEMO 2/4: INSPIRE (działający custom intake) · 2026-11-17

**Cel / Goal:** kafelek „Custom intake · Exceptions stay human" → `/lab/inspire/` = **żywy intake**. Klient opisuje nietypowe zlecenie (oklejenie pojazdu), dostaje wygenerowany kierunek wizualny i podgląd mockupu — kończy na „Request the offerte" → „48h — DEMO".

**Sesja:** 1 · **Priorytet:** P1 · **Zależności:** brak

## Zakres
**IN:**
- `InspireDemo.tsx` (`'use client'`) — przepływ: **brief → generowanie kierunku → podgląd → offerte**
- Krok 1 — brief: typ pojazdu (bestelauto / vrachtwagen / personenauto), cel oklejenia, kolory (chipy), **upload logo (FileReader → podgląd client-side)**
- Krok 2 — „generowanie" kierunku (krótkie, natychmiastowe przy `prefers-reduced-motion`)
- Krok 3 — **3 kierunki** (Bold / Classic / Minimal) generowane z wyborów (kolor + pojazd + logo) + **mockup frame** z wgranym logo (obraz pojazdu + overlay) + jasna granica: „kierunek, nie plik do druku" (uczciwość z dowodu)
- Krok 4 — „Request the offerte" (imię, email, telefon opcjonalny) → sukces **DEMO**: „A human quotes within 48 hours — demo, nothing sent"
- Analytics: `lab_external_demo_click` przy kluczowych akcjach demo (event istnieje)

**OUT:** prawdziwa generacja obrazów (AI) · backend/maile · pliki produkcyjne/print-ready · integracja z Wizard

## Logika frontu (bez backendu)
1. Formularz walidowany (pojazd + cel wymagane; email format)
2. Kierunki = szablony parametryzowane (paleta, układ, nazwa kierunku) — deterministyczne, bez sieci
3. Upload logo: `FileReader` → `dataURL` w podglądzie; obsługa błędów (zły format / >2MB)
4. Offerte = bezpieczny stop DEMO (bez wysyłki)

## Pliki
| Plik | Akcja |
|---|---|
| `src/components/demo/InspireDemo.tsx` | new — demo intake |
| `src/content/lab-demos.ts` | update — copy + opcje intake (pytania zgodne z INSPIRE brief) |
| `src/app/lab/inspire/page.tsx` | update — hero + <InspireDemo/> + korzyści + CTA |
| `src/app/globals.css` | update — `qf-demo-*` (tokeny) |
| `public/gratka/inspire/intake.png` | **podmiana screena kafelka — Twoje PNG** |

## Akceptacja (Definition of Done)
- [ ] Brief → kierunek → mockup → offerte działa w całości w przeglądarce
- [ ] Upload logo działa (podgląd) + błędy obsłużone (format/rozmiar)
- [ ] Kierunki zmieniają się zależnie od wyborów (nie statyczny obrazek)
- [ ] Granica „kierunek, nie print-ready" widoczna (dowód bez przekłamania)
- [ ] Mobile 375px · reduced-motion · dark-first · ≤8 utils/element
- [ ] typecheck ✅ lint ✅ build ✅ · verify + design-review + proof-check

## Materiał zewnętrzny
- Screen kafelka „Custom intake" od Dowódcy (podmiana PNG)
