# Handoff — Hours Scan buyer education (2026-09-26)

**Repo:** dsaas-quietforge · **Build:** `npm run typecheck` ✅ · `npm run lint` ✅ (0 errors, 10 pre-existing warnings) · `npm run build` ✅ (58 routes, sitemap 29)

**Prior ship (same day):** FlexGrafik finished-company case `613b453` on `main` · Production `dpl_2TKESNuSHNEzSeVGeAAHFqXNkhZk` (aliases `quietforge.flexgrafik.nl` + `services.flexgrafik.nl`)

**This commit:** scan education only — not mixed with the FlexGrafik case.

## Cel / Goal

Sell the Hours Engine Scan as a paid lab result on the owner’s files, not a free strategy call. Steal the agency-page skeleton (chips, four steps, From/To, from-X SKUs, FAQ). Keep Quietforge offer: €40/h, labels, no payback, no competitor names.

## Co zrobiono / What changed

- SSoT `scan.ts`: `labHook`, `feeGoesTo` (no 60/40 cents), chips, stack+gate, four process steps, three tracks, From/To from sample, FAQ foil vs free 30-minute call.
- `/book-a-scan/`: education first (chips → pay-for → steps → illustration From/To → SKUs → FAQ) then intake.
- `/approach/`: same lab hook above SKU cards; tools remain “instrument, not a menu”; Knab €81 stays context, not engine rate.
- `/proof/methodology/`: three tracks + five labels + publish-after-verify (counter still 0).
- Sample PDF: partner one-pager — **4 h/week · €160/week · Measured hours** vs waiting **€0**; illustration, not a client.

## Pliki / Files

| File | Action |
|------|--------|
| `src/content/scan.ts` | youPayFor, tracks, process, chips, FAQ, From/To |
| `src/app/book-a-scan/page.tsx` | Idealink skeleton, Quietforge offer |
| `src/app/approach/page.tsx` | lab hook + FAQ foil |
| `src/app/proof/methodology/page.tsx` | three tracks |
| `src/components/scan/BookScanIntake.tsx` | you-send + feeGoesTo on radios |
| `src/app/globals.css` | `qf-scan-*` chips/process/fromto |
| `public/artefacts/automation-map-sample.md` + `.pdf` | executive illustration |

## Weryfikacja / Verification

```bash
npm run typecheck   # pass
npm run lint        # 0 errors (10 pre-existing warnings)
npm run build       # pass (58 routes)
rg '[FILL:' src/    # 0 matches
```

Local `next start` :3000:

- `/book-a-scan/`: H1 hours-with-label; chips from €149; stack+gate; four steps; From/To 4h/€160 Measured vs waiting €0; FAQ vs free call; intake last. Decision radio updates “Requesting: Decision Scan · €490”.
- `/approach/`: lab hook; tools not a menu; no competitor names.
- `/proof/methodology/`: three tracks; Today: 0.
- `/proof/`: still `0 hours · €0`; FlexGrafik featured; Case 01–03 OPEN.
- Sample PDF HTTP 200.

## Proof Check — scan education

| Check | Result |
|-------|--------|
| [FILL:] placeholders | ✅ 0 |
| Metrics traceable | ✅ 4h × €40 = €160 illustration in `SCAN_SAMPLE`; counter 0 |
| Superlatives have adjacent proof | ✅ illustration chip + labels |
| Competitor names | ✅ none (FAQ says “free 30-minute call”) |
| 60/40 cents public | ✅ absent |
| **Verdict** | CLEAN |

## Strategy Check — /book-a-scan + /approach

| Rule | Status | Note |
|------|--------|------|
| Home order | ⚠️ N/A | home `page.tsx` not changed |
| Page arc Problem→System→Effect | ✅ | pain (free call) → stack+gate → labelled hours |
| Single L3 / header = Book a scan | ✅ | no free strategy call |
| Positioning | ✅ | lab result, not agency workshop |
| Anti-chaos: site-map.md | ⚠️ N/A | no home `page.tsx` change |

**Verdict:** COMPLIANT

## Post-deploy smoke (Dowódca)

1. Live `/book-a-scan/` H1 = “Hours you can defend — labelled, from your files.”
2. FAQ “Why paid, not a free 30-minute call?” present; no Idealink/5c/Norvax names.
3. Sample PDF still illustration; 4 h / €160 Measured; waiting €0.
4. `/proof/` hours counter still 0. FlexGrafik featured unchanged.
5. If Git CD leaves Production on the FlexGrafik deploy: `vercel promote` the scan Preview on `flexgrafik-services`.

## Następny krok / Next steps

- LinkedIn live cadence still PARKED (tool-first).
- Runtime job Scan Measure stays HITL on the platform — out of this repo.
- Do not invent savings larger than 4 h × €40 in the illustration.
