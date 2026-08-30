# Handoff — Approach Scan €690 Premium Redesign (2026-08-30)

**Repo:** dsaas-quietforge (quietforge.flexgrafik.nl) · **Build:** `npm run build` ✅ (56 pages) · **Deploy:** prod (Vercel)

## Cel / Goal

Przebudowa `/approach/` z płaskiej listy 5 kroków do pełnej strony konwersyjnej, która uzasadnia €690 za scan: klient ma czuć 100% spokój (fixed price, fixed timeline, risk po naszej stronie), strona ma miażdżyć konkurencję kategoriami (zero nazw firm), zero AI-slop (autentyczne, źródłowane treści). Dodatkowo: naprawa artefaktów PDF (bug 404 — linki wskazywały na nieistniejące `.pdf`), realny sample report, wewnętrzny SOP dostarczenia scanu z twardym budżetem €276/scan.

## Co zrobiono / What changed

**Strona `/approach/` (pełny rebuild):**
- Hero: breadcrumb, badge, H1 „The Automation Scan — a decision, not a sales call." (format z security), tagline wyjaśniający co kupuje €690, meta strip, dual CTA (Book a scan → + WhatsApp).
- Timeline „What happens, and when": Day 0 pre-work → Day 1–2 session → Day 3–4 written report.
- „What the report contains": 5 kart anatomii raportu (scored maturity, opportunity matrix, quantified payback, 30/60/90 roadmap, go/no-go).
- „Why €690 is the calmest number in consulting": porównanie kategoriami (free audit / generic consultant / doing nothing) — MR-16, bez nazw firm.
- „The numbers behind the scan": 4 źródłowane metryki (Amex SME Barometer 11 h/tydz., KfW 15 h/mies., Knab €81/h NL, 2× admin vs selling).
- „After the scan: the build": 4 kroki (Scope → Build → You approve → Handover).
- FAQ „Good to know": 6 pytań (sales call? what do I receive? how long? credited? nothing to automate? data safety?).
- Final CTA z risk reversal (report stays yours + fee credited).
- Metadata: title bez duplikatu sufiksu, OG + Twitter z `/og/approach.svg`.

**CSS (`globals.css`):**
- Nowe klasy `.qf-approach-timeline` / `.qf-tl-*`, `.qf-approach-grid` / `.qf-approach-card-*`, `.qf-compare` / `.qf-compare-card--ours`, `.qf-approach-metrics` / `.qf-metric-*` — gridy desktop (3/2/3/4 kol.) → 1 kol. mobile.

**OG image:**
- `public/og/approach.svg` (1200×630) — nowy, w stylistyce trust.svg, z poprawnym UTF-8 (€, · — zweryfikowane skryptem Node po problemie U+FFFD przy Write).

**Artefakty PDF (bug 404 naprawiony):**
- **Wykryto:** `constants.ts` linkował do `/artefacts/*.pdf`, ale w repo istniały tylko `.md` → wszystkie 3 linki „Download (PDF)" prowadziły do 404 (footer, security, book-a-scan).
- **Naprawa:** `npm run generate:artefacts` (istniejący skrypt `scripts/generate-artefact-pdfs.mjs` + `md-to-pdf`) → wygenerowane 3 PDF-y w `public/artefacts/` + 10 w `public/gratka/`. Wszystkie serwują 200 `application/pdf`.
- **Sample report ulepszony:** `automation-map-sample.md` z szablonu z `[brackets]` → realny deliverable: fikcyjna firma „Achterhuis & Zonen", jawnie oznaczona **Illustration**, z pełną strukturą raportu (executive summary, scored maturity, opportunity matrix, quantified payback, 30/60/90, go/no-go) — zgodnie ze wzorcem eflury/aiaudit z researchu.

**Runbook (internal SOP):**
- `docs/operations/runbooks/scan-delivery-runbook.md` — proces (intake → pre-work → session → analysis → delivery), koszty max €276/scan (typowy ~€100–140; core kit Fathom €0 + NotebookLM €5 + Claude Pro €20 + Gamma €20 + Napkin €0; ProcessMind $99 tylko przy realnych logach; ekspert €50–150 na ~50% scanów), szablon raportu, źródłowane benchmarki, zero-AI-slop gate, definition of done.

## Pliki / Files

| File | Action |
|------|--------|
| `src/app/approach/page.tsx` | full rebuild (hero, timeline, report anatomy, comparison, metrics, build steps, FAQ, final CTA) |
| `src/app/globals.css` | new `.qf-approach-*`, `.qf-tl-*`, `.qf-compare-*`, `.qf-metric-*` classes |
| `public/og/approach.svg` | new OG image (1200×630, clean UTF-8) |
| `public/artefacts/*.pdf` (3 files) | **new** — fixed 404: PDFs generated from `.md` sources |
| `public/gratka/*.pdf` (10 files) | **new** — regenerated |
| `public/artefacts/automation-map-sample.md` | upgraded from template to real sample report (illustration-only) |
| `docs/operations/runbooks/scan-delivery-runbook.md` | **new** — internal scan delivery SOP + cost budget |

## Weryfikacja / Verification

```bash
npm run typecheck   # pass
npm run build       # pass (56 pages, /approach static)
npm run generate:artefacts  # pass (13 PDFs)
# local prod smoke (next start -p 3114):
#   /approach/ 200 · title bez duplikatu · H1 ×1 · 7×h2 · OG + twitter obecne
#   sekcje: timeline 3 · report 5 · compare 3 · metrics 4 · build 4 · FAQ 6 · final CTA
#   artefakty: automation-map-sample.pdf / data-safety-playbook.pdf / maintenance-handover.pdf → 200 application/pdf
#   /og/approach.svg → 200 image/svg+xml · PDF renderuje się (2 strony, %PDF header)
#   wizualnie: desktop + mobile (390px) — wszystkie gridy przechodzą do 1 kolumny
#   canonical: nieobecny na całej stronie (home + security też) — luka globalna, nie regresja tej sesji
```

## Post-deploy smoke (do wykonania po deploy)

1. `/approach/` na produkcji → 200, OG `/og/approach.svg` renderuje się na LinkedIn/FB (Rich Results / post inspector).
2. Linki artefaktów (footer „Scan sample ↓", security „Your data is yours", book-a-scan) → otwierają PDF bez 404.
3. Mobile: timeline 1-kolumnowy, compare stack, CTA w 1. viewporcie.
4. **Dowódca:** decyzja czy sample report zostaje jako jawny artefakt publiczny (fikcyjna firma, oznaczone Illustration) — tak czy dostarczać PDF tylko na żądanie.

## Następny krok / Next steps

- **Dowódca: post-deploy smoke** wg powyższej listy.
- **Looker Studio dashboard** (wciąż otwarte z poprzedniej sesji) — `conversion-pipeline.md` §10.3.
- Rozważyć fix globalnego canonical (brak na całej stronie) w osobnej sesji SEO.
- Po baseline konwersji scanu: testy P3 (A/B cen, sticky timing).
