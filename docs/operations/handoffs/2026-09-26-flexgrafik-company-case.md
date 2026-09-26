# Handoff — FlexGrafik finished-company case (2026-09-26)

**Repo:** dsaas-quietforge · **Build:** `npm run typecheck` ✅ · `npm run lint` ✅ (0 errors, 10 pre-existing warnings) · `npm run build` ✅ (58 routes, sitemap 29)

**Deploy:** not shipped — wait for Commander push/promote

**Local:** http://localhost:3000/proof/ · http://localhost:3000/results/flexgrafik/

## Cel / Goal

Give `/proof/` a finished-company gratka without filling client Case 01/02/03. FlexGrafik stays owner-operated reference. Hours counter stays **0**. Tenant 2 is PROVEN (Commander-lock). No MRR / GMV / orders.

## Co zrobiono / What changed

- SSoT `flexgrafik-company-case.ts`: PAS, 4 doors, 3 walks, tenant PROVEN, honesty chip. Numbers from `proof.ts` (9 UI / 7 stages / 167 SKU / 5 acts) + Mollie from €199 (existing proof language).
- Lab milestone 07: FlexGrafik Tenant 2 LIVE / PROVEN. `notProven` no longer says “remains planned”. No SaaS/MRR client claim.
- New `/results/flexgrafik/` — buyer-first, live links, Book a scan. OG `/og/results-flexgrafik.svg`.
- `/proof/` featured card above three OPEN client slots. Reference program unchanged.
- Canon + strategy site-map + sitemap include `/results/flexgrafik/` (not 301’d; `/results/` still 301s to `/proof/`).

## Pliki / Files

| File | Action |
|------|--------|
| `src/content/flexgrafik-company-case.ts` | new SSoT |
| `src/app/results/flexgrafik/page.tsx` | new route |
| `public/og/results-flexgrafik.svg` | new OG |
| `src/app/proof/page.tsx` | featured card |
| `src/content/lab.ts` | Tenant 2 LIVE / PROVEN |
| `src/lib/constants.ts` | `resultsFlexgrafik` + `inspireFlexgrafik` |
| `src/app/globals.css` | `qf-fg-*` + `qf-proof-open-grid` |
| `scripts/generate-sitemap.mjs` + `public/sitemap.xml` | + `/results/flexgrafik/` |
| `docs/canon/site-map.md` + `docs/strategy/site-map.md` | IA |
| `docs/architecture/content-ssot.md` | map row |

## Weryfikacja / Verification

```bash
npm run typecheck   # pass
npm run lint        # 0 errors (10 pre-existing warnings)
npm run build       # pass (58 routes)
rg '[FILL:' src/    # 0 matches
```

Local browser (localhost:3000 production server after rebuild):

- `/proof/`: `0 hours · €0`; honesty chip; featured FlexGrafik; Case 01/02/03 still OPEN; Book a scan.
- `/results/flexgrafik/`: PAS Before/System/Effect; 4 doors LIVE/PARTIAL; 3 walks; tenant PROVEN; no DSAAS/LangGraph; Book a scan → `/book-a-scan/`.
- OG `/og/results-flexgrafik.svg` HTTP 200.
- Hours counter file still `hoursConfirmed: 0`.

## OG Route — /results/flexgrafik/

| Item | Status |
|------|--------|
| Metadata (title/desc/openGraph) | ✅ |
| OG image present (1200×630) | ✅ |
| Route in sitemap.xml | ✅ (priority 0.8) |
| robots.txt allows | ✅ |
| site-map.md §5 updated | ✅ |
| Build pass | ✅ 58 routes |

## Proof Check — FlexGrafik company case

| Check | Result |
|-------|--------|
| [FILL:] placeholders | ✅ 0 |
| Metrics traceable to proof.ts | ✅ 9/7/167/5; €199 existing Wizard language |
| Superlatives have adjacent proof | ✅ honesty chip + notProven |
| ProofScreenSlot / VideoSlot | ✅ none (no video until ready flags) |
| Intent badges on cards | ✅ doors + walks |
| **Verdict** | CLEAN |

## Strategy Check — /proof/ + /results/flexgrafik/

| Rule | Status | Note |
|------|--------|------|
| Home order | ⚠️ N/A | home `page.tsx` not changed |
| Page arc Problem→System→Effect | ✅ | Before / System / Effect |
| Single L3 / header = Book a scan | ✅ | |
| Intent badge on every card | ✅ | |
| Positioning (not a client case) | ✅ | FlexGrafik not in Case 01–03 |
| Anti-chaos: site-map updated | ✅ | canon + strategy |

**Verdict:** COMPLIANT

## Design Review — featured + case page

| Check | Status |
|-------|--------|
| Sharp corners (--qf-radius) | ✅ |
| Borders, not shadows | ✅ |
| No gradients | ✅ |
| qf-* tokens / ≤8 utils | ✅ extracted |
| Dark-first | ✅ |
| New motion | ✅ none (Section existing) |

## Post-deploy smoke (Dowódca)

1. Live `/proof/` — counter 0; featured card; three OPEN slots still empty.
2. Live `/results/flexgrafik/` — H1 *One finished Dutch company.*; doors + walks open live URLs; Book a scan.
3. `/lab/` milestone 07 still titled *Governed tenant platform*; FlexGrafik Tenant 2 live in the platform facts.
4. `node scripts/audit-404s.mjs` — `/results/flexgrafik/` in `failed: []`.
5. Domain aliases need `vercel promote` if Git CD only built Preview (same as SKU cutover).

## Następny krok / Next steps

- **Human:** `push` / `promote` when you want this live. Agent does not deploy.
- Do not put FlexGrafik in the hours counter.
- LinkedIn live cadence still PARKED (tool-first).
