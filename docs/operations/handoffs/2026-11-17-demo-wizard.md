# Handoff — Demo 1/4: żywy Wizard na /lab/wizard/ (2026-11-17)

**Repo:** quietforge.nl (dsaas-quietforge) · **Build:** `npm run build` ✅ · **Deploy:** Cloudflare Pages CI on `main`

## Cel / Goal
Plan 1/4 (`plans/2026-11-17-demo-wizard.md`): kafelek „Catalog" prowadzi do **działającego demo konfiguratora** — pełna logika frontu, cena liczy się na żywo, bezpieczny stop „Place order — demo" (firma nie funkcjonuje, nic nie wychodzi).

## Co zrobiono / What changed
- **`WizardDemo.tsx`** — maszyna kroków: produkt → opcje → dodatki → checkout → sukces DEMO (numer referencyjny client-side). Cena live w sticky „Your quote" (baza / opcje / dodatki / kupon / suma), **minimum €199**, ceny oznaczone „Demo pricing — illustrative".
- **`wizard-catalog.ts`** — katalog demo (4 produkty FlexGrafik × grupy opcji) + czyste reguły cenowe + kupony GAME10/15/20 (handoff z przyszłej gry przez `sessionStorage`).
- **Bezpieczny stop:** walidacja formularza (imię + email) → „Place order — demo" → „ORDER NOT SENT" + ref `DEMO-XXXX`.
- **`DoorDemoPreview`** — nowy slot `demo` (interaktywny) zastępuje galerię screenów; strony bez demo (portal/game/inspire do czasu swoich planów) zostają na screenach.
- Kafle Four doors: CTA **„Try the demo"**.
- `useSyncExternalStore` na odczyt kuponu (lint: zero setState w efektach).

## Pliki / Files
| Plik | Akcja |
|------|--------|
| `src/lib/demo/wizard-catalog.ts` | new — katalog + reguły cenowe + kupony |
| `src/components/demo/WizardDemo.tsx` | new — żywy konfigurator |
| `src/components/lab/DoorDemoPreview.tsx` | update — slot `demo` + notka demo |
| `src/content/lab-demos.ts` | update — demoTitle/demoNote |
| `src/app/lab/wizard/page.tsx` | update — <WizardDemo/> |
| `src/app/globals.css` | update — `qf-wiz-*` (tokeny) |
| `src/content/flexgrafik-company-case.ts` | update — CTA „Try the demo" ×4 |

## Weryfikacja / Verification
```bash
npm run typecheck   # pass
npm run lint        # 0 errors (10 pre-existing warnings)
npm run build       # pass, check-links 0 broken
```

**QA w przeglądarce (Edge headless, pełny przepływ klikany):**
- Produkt → opcje (Full wrap +980, Matte +120) → montaż +240 → **Total €2790 = poprawna matematyka** ✓
- „Place order" → sukces DEMO + ref `DEMO-W3IC` ✓
- Kupon **GAME10**: €870 → −€87 → **€783** ✓ (banner „−10% applied")
- Walidacja: pusty formularz → 2 błędy, blokuje wysyłkę ✓
- Konsola aplikacji: 0 błędów (poza 404 prefetchy RSC — artefakt statycznego serwera, nie kodu)

## Post-deploy smoke (Dowódca)
1. https://quietforge.nl/lab/wizard/ — przejdź konfigurator do końca (też na mobile).
2. Zrzuty ekranów kafelków — **Twoje PNG do podmiany** (podmiana pliku = bez zmian w kodzie).
3. Decyzja MR-16: claim „2–4 weeks after the scan" — zostawić / złagodzić.

## Następny krok / Next steps
- **Demo 2/4: INSPIRE** (`plans/2026-11-17-demo-inspire.md`) — żywy intake (brief → kierunek → mockup → offerte DEMO).
- Potem Game 3/4 (kupon → Wizard, logika już gotowa) i Portal 4/4 (hub).
