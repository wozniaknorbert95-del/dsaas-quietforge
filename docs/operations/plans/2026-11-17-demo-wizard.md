# Plan — DEMO 1/4: Wizard (działający konfigurator) · 2026-11-17

**Cel / Goal:** kafelek „Catalog · Configure and pay" → `/lab/wizard/` = **żywy konfigurator**. Klient klika, wybiera, widzi cenę liczącą się na żywo, dochodzi do zamówienia — i zatrzymuje się na bezpiecznym „Order placed — DEMO" (firma nie funkcjonuje, nic nie wychodzi).

**Sesja:** 1 · **Priorytet:** P1 (drzwi od pieniędzy — budować pierwsze)
**Zależności:** brak (kupon z gry — obsługa już wbudowana, patrz niżej)

## Zakres
**IN:**
- `WizardDemo.tsx` (`'use client'`) — maszyna kroków: **produkt → opcje → dodatki → podsumowanie + checkout → sukces**
- Reguły cenowe frontu: baza produktu + opcje + dodatki × ilość, **cena zawsze widoczna** (sticky summary), **minimum €199** (global checkout rule), EUR
- Katalog demo (ok. 4 produkty FlexGrafik: voertuigreclame, bedrijfskleding, signing, logo package) × realne grupy opcji (rozmiar, wykończenie, ilość)
- Checkout form (imię, email, firma) → „Place order" → **ekran sukcesu DEMO**: numer referencyjny generowany client-side + komunikat „Demo — order not sent"
- **Kupon z gry:** odczyt `sessionStorage['qf-demo-coupon']` → rabat naliczany w podsumowaniu (Game → Wizard handoff, plan 3/4)
- Analytics: `wizard_demo_click` przy wejściu w demo i przy „Place order" (event istnieje)

**OUT:** prawdziwy Mollie/backend/maile · prawdziwe 167 SKU (demo katalog, ceny ilustracyjne — oznaczone „demo pricing") · edycja copy sprzedażowego poza demo

## Logika frontu (bez backendu)
1. Krok 1 — produkt (karty) → Krok 2 — opcje produktu (single/multi/liczba) → Krok 3 — dodatki (np. montaż, plik produkcyjny, tryb ekspres +15%)
2. Przy każdej zmianie: przeliczenie ceny + rozbicie (baza / opcje / dodatki / kupon / suma)
3. Walidacja checkoutu (email format, wymagane pola) — komunikaty błędów przy polu
4. „Place order" → blokada formularza → sukces DEMO (bez sieci)

## Pliki
| Plik | Akcja |
|---|---|
| `src/components/demo/WizardDemo.tsx` | new — demo konfiguratora |
| `src/lib/demo/wizard-catalog.ts` | new — katalog + reguły cenowe (typy, zero `any`) |
| `src/content/lab-demos.ts` | update — copy sekcji demo (efekty, komunikaty demo) |
| `src/app/lab/wizard/page.tsx` | update — hero + <WizardDemo/> + korzyści + CTA |
| `src/app/globals.css` | update — `qf-demo-*` (tylko tokeny) |
| `public/gratka/wizard-checkout.png` | **podmiana screena kafelka — Twoje PNG** |

## Akceptacja (Definition of Done)
- [ ] Pełny przepływ klikalny bez backendu; „Place order" zatrzymuje się na DEMO
- [ ] Cena aktualizuje się przy KAŻDEJ zmianie; rozbicie poprawne (kupon GAME nalicza rabat)
- [ ] Mobile 375px bez horizontal scroll; tap targety ≥44px
- [ ] `prefers-reduced-motion` respektowane; dark-first; sharp corners; ≤8 utils/element
- [ ] Ceny oznaczone jako demo/illustrative (MR-16 — brak fałszywych claimów)
- [ ] `npm run typecheck` ✅ `npm run lint` ✅ `npm run build` ✅ · verify + design-review + proof-check

## Materiał zewnętrzny
- Screen kafelka „Catalog" od Dowódcy (podmiana pliku PNG — bez zmian w kodzie)
