# Handoff — INSPIRE offerte-concierge truth sync na /results/ + /solutions/sales-funnel/ (2026-08-01)

**Repo:** services.flexgrafik.nl · **Build:** `npm run build` ✅ (36 routes) · **Typecheck:** ✅
**SSoT źródło prawdy:** flexgrafik-inspire `brain/TRUTH-SNAPSHOT.json` v4.2.0 (2026-07-27, `product_confidence: PASS`)

## Cel / Goal

Sekcja `// Complex quote · PARTIAL` (`/results/#design-intake`, LI-R10 landing) opisywała pipeline, który przestał istnieć: customer path INSPIRE kończy się od 2026-07-27 na **offerte concierge** (48h quote), nie na „priced Wizard" (spec `f5b1bf1` — customer-facing Wizard link = banned; Wizard = internal fulfillment).

## Co zrobiono / What changed

- `resultsInspireLanding`: tytuł `→ 48-hour quote`; lead = realny flow (NL chat → editable brief + logo upload → Standard/Premium mockups z indicative pricing → offerte request → studio quote ≤48h); limitation: visual direction ≠ print-ready, pricing manual by design (concierge, not checkout).
- `salesFunnelInspireExtension`: lead + krok 4 (`Offerte request → personal studio quote within 48 hours`) + limitations (indicative pricing / concierge by design) zsynchronizowane; **usunięto CTA „Open Wizard checkout →"** z bloku inspire (wprowadzał w błąd po F2).
- Evidence: usunięto stale `wizard-handoff.png` (UI już nie istnieje) → 2 screeny (Intake, Direction); grid 3→2 kolumny na obu stronach.
- `proof.ts` `inspireHandoff`: `ready: false`, caption dokumentuje „recapture pending" (Phase 2).
- Etykieta **PARTIAL zostaje** (default bez decyzji Dowódcy) — z poprawionymi limitations.

## Pliki / Files

| File | Action |
|------|--------|
| `src/content/results-page.ts` | copy sync (resultsInspireLanding) |
| `src/content/sales-funnel-case-study.ts` | extension sync, wizard CTA + 3rd evidence removed |
| `src/content/proof.ts` | inspireHandoff → ready:false + recapture note |
| `src/app/results/page.tsx` | evidence grid 3→2 |
| `src/app/solutions/sales-funnel/page.tsx` | evidence grid 3→2, wizard Button removed |
| `public/sitemap.xml` | lastmod regen (build) |

## Weryfikacja / Verification

```bash
npm run typecheck   # pass
npm run build       # pass (36 routes)
# copy-polish gates: 0 new `// ` eyebrows, 0 glued copy, 0 "Book your Automation Map"
# visual: next start — /results/#design-intake + /solutions/sales-funnel/ OK (screens w Temp\opencode\)
```

## ⚠️ Znalezisko krytyczne (pre-existing, POA scope sesji) — PRIMARY CTA niewidoczny na LIVE

**Objaw:** wszystkie anchor-based `Button variant="primary"` („Book Automation Map") renderują `color == background` (akcent na akcencie) = **niewidoczny label — site-wide, także na produkcji** (potwierdzone computed style na quietforge.flexgrafik.nl).

**Root cause (dowody z live CSS):** `globals.css:250` `a { color: var(--qf-accent) }` jest **unlayered** (poz. 42582 w bundle), a Tailwind v4 utilities siedzą w `@layer utilities` (poz. 7418). Unlayered author CSS wygrywa z warstwami → nadpisuje `text-[var(--qf-bg)]` z Button primary. Skutek uboczny: wszystkie linki z utility color (`text-[var(--qf-info)]`, dim) też renderują się akcentem zamiast zamierzonych kolorów.

**Proponowany fix (wymaga GO — globals.css = risky/scope-lock):** objąć bazowe reguły elementów (`a`, `a:hover`, ewent. `p`, `h1–h3`, `::selection`) w `@layer base { }` → utilities zaczną działać zgodnie z klasami. Wymaga sweep wizualnego całej strony po zmianie (kolory linków wrócą do zamierzonych).

## Następny krok / Next steps

1. **GO Dowódcy:** fix globalnego `a` w globals.css (@layer base) + sweep → osobna sesja (risky).
2. **GO Dowódcy na płatny generate:** recapture evidence z prod (offerte panel/success, brief edit) → Phase 2, podmiana `inspireHandoff` + ewent. 3. screen w sekcji. Rate limit 1/IP/h, cap €0.50/sesja.
3. Decyzja: etykieta PARTIAL → LIVE·supervised? (gates: G_SALES_VISUAL/CHAT/OFFERTE = PASS; FAIL_PRODUCT tylko na benchmarkach G_INSPIRE_2b / G_COMP_BENCH).
4. LI-R10: przyszłe posty INSPIRE = narracja offerte concierge (48h quote), nie „priced Wizard"; stary anchor `#design-intake` działa bez zmian.
5. brain.md drift: repo nie ma już `output:'export'`/`distDir` (API routes są ƒ) — `dist/` to martwy artifact z maja; brain §2/§5 do korekty przy okazji.

## Post-deploy smoke (po ship)

1. `/results/#design-intake` — tytuł „→ 48-hour quote", 2 screeny, zero wizard-handoff
2. `/solutions/sales-funnel/` — blok inspire: krok 4 = offerte, brak CTA „Open Wizard checkout"
3. Primary CTA „Book Automation Map" — **nadal niewidoczny label** do czasu fixa (znany bug)
