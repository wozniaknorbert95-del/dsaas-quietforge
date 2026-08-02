# Handoff — INSPIRE dual-surface audit + parity (2026-08-02)

**Repo:** quietforge.flexgrafik.nl · **Build:** `npm run build` ✅ (36 routes)

## Cel / Goal

Close results vs solutions INSPIRE gap; audit full Wizard/INSPIRE link graph; unify block + fix miswired CTAs.

## Co zrobiono / What changed

- Full audit artefact: inventory L01–L12, smoke, UX heuristics, parity matrix
- One SSoT: `salesFunnelInspireExtension` (+ `outcomeTitle` / `outcomeLead` / secondary)
- Shared `InspireExtensionBlock` on `/results/#design-intake` + `/solutions/sales-funnel/#inspire`
- Secondary CTA: **See solution details** → `/solutions/sales-funnel/#inspire` (removed “Wizard case study”)
- Case study bridge: Complex Quote → solutions `#inspire`
- GTM claim-lock: secondary deep story = `#inspire`, utm before hash

## Pliki / Files

| File | Action |
|------|--------|
| `docs/operations/artefacts/2026-08-02-inspire-link-ux-audit.md` | new |
| `docs/operations/artefacts/2026-07-gtm-claim-lock.md` | update |
| `src/components/solutions/InspireExtensionBlock.tsx` | new |
| `src/content/sales-funnel-case-study.ts` | update (+ bridge) |
| `src/content/results-page.ts` | re-export SSoT |
| `src/app/results/page.tsx` | shared block |
| `src/app/solutions/sales-funnel/page.tsx` | shared block + `id=inspire` |
| `src/app/results/sales-funnel/page.tsx` | INSPIRE bridge |

## Weryfikacja / Verification

```bash
npm run typecheck   # pass
npm run build       # pass (36 routes)
rg "Wizard case study" src/   # 0 matches
```

Pre-fix smoke: Design Intake EXTERNAL **PASS** (offerte, geen Wizard checkout). L02 **FAIL** → fixed in code.

## Post-deploy smoke (prod — 2026-08-02)

| Check | Result |
|-------|--------|
| Deploy HEAD `a8a9cb0` == `origin/master` | **PASS** |
| `/results/#design-intake` Flow + Limitations + PARTIAL | **PASS** |
| CTAs: Open Design Intake · See solution details · Book Map (no Wizard case study) | **PASS** |
| Secondary href → `/solutions/sales-funnel/#inspire` | **PASS** |
| Solutions `#inspire` Flow + Limitations parity | **PASS** |
| EXTERNAL Design Intake (offerte, geen Wizard) | **PASS** |
| CS bridge → `#inspire` | **PASS** |
| LI-R10 utm + `#design-intake` in viewport | **PASS** |
| L01–L12 post-deploy table | **PASS** (see audit artefact) |

Follow-up polish: strip trailing `→` from labels that use `Button withArrow` (demo + CS bridge) — avoids `→→`.

## Następny krok / Next steps

- **Phase 2 (recommended):** recapture offerte-success PNG into `evidence[]`
- LinkedIn media WIP untracked — dedicated media session
- Optional: when LI draft needs secondary deep story, use `/solutions/sales-funnel/#inspire` (primary `#design-intake` already OK)
