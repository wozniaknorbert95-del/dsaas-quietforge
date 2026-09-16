# Handoff — Lab ICP platform merge (2026-09-16)

**Repo:** quietforge.flexgrafik.nl (`dsaas-quietforge`) · **Build:** `npm run build` ✅

## Cel / Goal

Optymalizacja `/lab/` pod ICP oszczędności: scalenie etapów 07–09 w jeden projekt platformy + reframing copy (hours / control / mniej back-and-forth). Bez sprzedaży DSAAS jako produktu.

## Co zrobiono / What changed

- `LAB_MILESTONES`: usunięto `mission-control` / `platform` / `quietforge`; dodano `platform-build` (`07`).
- `LAB_PAGE` + `LAB_PLATFORM_FACTS`: buyer-safe most mechanizm → oszczędność właściciela.
- `LAB_CONNECTIONS` kończy się na `Platform`; JSON-LD = 7 pozycji z tablicy.
- `LabTimeline`: alias `#stage-08` / `#stage-09` → `platform-build` (+ rewrite hash na `#stage-07`).
- Smoke `audit:lab`: oczekuje 7 etapów i tytułu `Governed tenant platform`.

## Pliki / Files

| File | Action |
|------|--------|
| `src/content/lab.ts` | update |
| `src/app/lab/page.tsx` | update |
| `src/components/lab/LabTimeline.tsx` | update |
| `scripts/audit-lab-smoke.mjs` | update |
| `docs/audits/2026-09-16/lab-platform-stages-merge-audit.md` | status IMPLEMENTED |
| `docs/operations/plans/2026-09-05-builder-lab-implementation-plan.md` | supersession note |
| `docs/operations/SESSION-ANCHOR.md` | update |
| `docs/operations/handoffs/2026-09-16-lab-icp-platform-merge.md` | new |

## Weryfikacja / Verification

```bash
npm run typecheck   # pass
npm run build       # pass
rg 'DSAAS|OPA|Cedar' src/content/lab.ts src/app/lab/   # 0
# milestones: 7 — portal…jadzia, platform-build
```

## Post-deploy smoke (Dowódca)

1. `/lab/` — timeline pokazuje 7 etapów; ostatni = Governed tenant platform.
2. `/lab/#stage-07` — merged card (Problem/Built/Effect z human-stop).
3. `/lab/#stage-09` — wybiera ten sam milestone i przepisuje hash na `#stage-07`.
4. Platform chapter: 4 fakty buyer-safe; brak DSAAS/OPA.
5. CTA Book a scan + „first workflow that returns hours”.

## Następny krok / Next steps

- Dowódca: produkcyjny deploy + smoke powyżej.
- Opcjonalnie: read access do `dsaas-platform-main` na sanitized evidence pass (nie blokuje Lab).
