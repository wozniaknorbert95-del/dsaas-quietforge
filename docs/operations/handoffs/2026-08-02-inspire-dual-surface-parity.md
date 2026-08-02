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

## Post-deploy smoke (Dowódca)

1. `/results/#design-intake` — Flow + Limitations + badge; CTAs: Design Intake · See solution details · Book Map
2. “See solution details” → `/solutions/sales-funnel/#inspire` with same Flow/Limitations
3. `/results/sales-funnel/` — new Complex Quote bridge → `#inspire`
4. Open Design Intake → `voertuigreclame-ontwerp/` (not Wizard checkout)

## Następny krok / Next steps

- Phase 2 (optional): recapture offerte-success PNG into evidence
- LinkedIn drafts: prefer secondary deep-link `#inspire` when pointing past the hub strip
