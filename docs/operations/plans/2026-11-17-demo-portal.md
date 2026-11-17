# Plan — DEMO 4/4: Portal (klikalny front door) · 2026-11-17

**Cel / Goal:** kafelek „Portal · Front door" → `/lab/portal/` = **klikalny portal** FlexGrafik z guided chooserem. Klient wchodzi, mówi po co przyszedł, dostaje rekomendację — i ląduje w żywym demo (Wizard / Game / INSPIRE).

**Sesja:** 1 · **Priorytet:** P3 (hub — budować na końcu, gdy drzwi żyją) · **Zależności:** Dema 1–3/4 LIVE

## Zakres
**IN:**
- `PortalDemo.tsx` (`'use client'`) — mock portalu: header marki, hero, **4 karty drzwi** (Portal→katalog / Wizard / Game / Custom intake)
- **Guided chooser** (skryptowany dialog, „supervised"): „What are you here for?" → 2 pytania → rekomendacja karty + link do żywego demo
  - np. „I need a price" → Wizard demo · „I'm just looking" → Game demo · „Something custom" → INSPIRE demo · „Not sure" → rekomendacja skanu (CTA)
- Karty drzwi linkują do `/lab/wizard/`, `/lab/game/`, `/lab/inspire/` (żywe) + z powrotem do `/results/flexgrafik/` (kontekst case)
- Komunikat demo: „Demo portal — the FlexGrafik surfaces are offline; everything here is a safe demo"

**OUT:** prawdziwy chat/LLM (chooser = skrypt) · backend · nowe produkty poza 4 drzwiami

## Logika frontu (bez backendu)
1. Stan dialogu: drzewo pytań (2–3 poziomy) w `src/content/lab-demos.ts` (dane) + render w komponencie
2. Każda ścieżka kończy się kartą rekomendacji z linkiem do demo + jednym CTA
3. Pełna obsługa „wstecz" (wróć do pytania) — klient nie utknie

## Pliki
| Plik | Akcja |
|---|---|
| `src/components/demo/PortalDemo.tsx` | new — portal + chooser |
| `src/content/lab-demos.ts` | update — drzewo chooser + copy kart |
| `src/app/lab/portal/page.tsx` | update — hero + <PortalDemo/> + korzyści + CTA |
| `src/app/globals.css` | update — `qf-demo-portal-*` (tokeny) |
| `public/gratka/portal-assistant.png` | **podmiana screena kafelka — Twoje PNG** |

## Akceptacja (Definition of Done)
- [ ] Chooser prowadzi do poprawnych demo (3 ścieżki) + ścieżka „Not sure" → CTA skan
- [ ] Nawigacja „wstecz" działa; klient nie utknie w ślepym rogu
- [ ] Karty drzwi klikalne do żywych demo; brak martwych linków (check-links 0)
- [ ] Mobile 375px · reduced-motion · dark-first · ≤8 utils/element
- [ ] typecheck ✅ lint ✅ build ✅ · verify + design-review + proof-check

## Materiał zewnętrzny
- Screen kafelka „Portal" od Dowódcy (podmiana PNG)

---

# Kolejność i wspólne zasady (4 plany)

1. **Kolejność:** Wizard (1) → INSPIRE (2) → Game (3) → Portal (4). Game potrzebuje Wizarda (kupon), Portal potrzebuje wszystkich drzwi (hub).
2. **Wspólne:** demo-stop = bezpieczne „zamów/wyślij" + komunikat DEMO (nic nie wychodzi — firma nie funkcjonuje) · copy w `src/content/lab-demos.ts` (SSoT) · tokeny `qf-*`, ≤8 utils/element, dark-first, sharp corners · `prefers-reduced-motion` · mobile 375px · angielski (MR-11) · tier DEMO (MR-13) · ceny demo = ilustracyjne, oznaczone (MR-16) · bramki: verify + design-review + proof-check przed commitem · handoff po każdej sesji.
3. **Screeny kafelków:** przygotowuje Dowódca — podmiana = wymiana pliku PNG (bez zmian w kodzie). Moje obecne PNG-y są tymczasowe.
