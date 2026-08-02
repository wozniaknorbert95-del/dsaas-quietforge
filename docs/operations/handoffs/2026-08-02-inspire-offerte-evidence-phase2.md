# Handoff — INSPIRE Phase 2 offerte evidence (2026-08-02)

**Repo:** quietforge.flexgrafik.nl · **Build:** pending verify

## Cel / Goal

Close audit P2: third evidence screen showing offerte concierge success (48h quote path).

## Co zrobiono / What changed

- Captured `#da-offerte-success` using **prod zzpackage CSS** + copy from `page-voertuigreclame-ontwerp.php`
- HITL reference `off-20260727-fbf2a2a6` (flexgrafik-inspire perfecto-close)
- Added `offerte-success.png` to `salesFunnelInspireExtension.evidence[]` → both surfaces via `InspireExtensionBlock`
- Grid: 3 columns on lg (`Intake` · `Direction` · `Offerte`)
- `proof.ts` `inspireHandoff` → ready:true, new asset
- Capture script: `scripts/capture-inspire-offerte-evidence.mjs` (+ source fallback HTML)

## Pliki / Files

| File | Action |
|------|--------|
| `public/gratka/inspire/offerte-success.png` | new |
| `docs/operations/media/inspire-screens/inspire-05-offerte-success.png` | new |
| `docs/operations/media/inspire-slides/offerte-evidence.html` | new (fallback) |
| `scripts/capture-inspire-offerte-evidence.mjs` | new |
| `src/content/sales-funnel-case-study.ts` | evidence +3 |
| `src/content/proof.ts` | inspireHandoff ready |
| `src/components/solutions/InspireExtensionBlock.tsx` | 3-col grid |

## Capture notes

- Full prod e2e (generate + submit) **timed out** on mockups — rate/generate window
- Final asset = prod page with `#da-results` unhidden + real theme styles (not composed mock)

## Post-deploy smoke (Dowódca)

1. `/results/#design-intake` — 3 evidence tiles ending in **Offerte**
2. `/solutions/sales-funnel/#inspire` — same 3-tile grid
3. Offerte tile shows “Bedankt — je aanvraag is binnen!” + 48 werkdagen

## Następny krok

LI-R10 publish or LinkedIn media pack (untracked WIP).
