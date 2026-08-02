---
status: "[CLOSED — post-deploy PASS]"
title: "2026-08-02 INSPIRE / Wizard — link + UX/UI audit"
owner: "Norbert Wozniak"
updated: "2026-08-02"
classification: "L4 — dual-surface parity + CTA graph"
shipped: "a8a9cb0 (+ follow-up CTA arrow polish)"
---

# Audit: INSPIRE / Wizard — linki + UX/UI

## 1. Executive scorecard (pre-fix)

| Severity | Count | Top items |
|----------|------:|-----------|
| **P0** | 2 | L02 secondary → Wizard CS without INSPIRE block; label “Wizard case study” dishonest for Complex Quote |
| **P1** | 4 | Results missing Flow/Limitations/badge (parity); CS blind end for INSPIRE; L06 CS has no Design Intake bridge; thin dual SSoT |
| **P2** | 2 | Founder → CS only (OK for Wizard story); evidence = 2 screens without offerte success (Phase 2) |

**Root cause:** dual SSoT — rich `salesFunnelInspireExtension` on solutions only; results used thin `resultsInspireLanding` + shared `evidence[]` only.

**Fix applied same session:** shared `InspireExtensionBlock`, one SSoT, secondary → `/solutions/sales-funnel/#inspire`, CS bridge, GTM note.

**Post-deploy (prod `a8a9cb0`, 2026-08-02):** all critical CTA smokes **PASS**. Residual P2 only: offerte-success PNG (Phase 2).

---

## 2. Link inventory + smoke

| ID | Surface | Label (visible) | href (code / expected) | Expected job | Pre-fix | Post-deploy smoke |
|----|---------|-----------------|------------------------|--------------|----------|-------------------|
| L01 | `/results/#design-intake` | Open Design Intake | `EXTERNAL.inspireDesignAgent` → `zzpackage…/voertuigreclame-ontwerp/` | Live Design Intake (not checkout) | OK | **PASS** — Design Agent + “geen betaling, geen Wizard” |
| L02 | `/results/#design-intake` | See solution details | `ROUTES.salesFunnel#inspire` | Deep story of **INSPIRE+Wizard offer** | **FAIL P0** (was Wizard CS) | **PASS** — label + href live; solutions `#inspire` has Flow/Limitations |
| L03 | `/results/#design-intake` | Book Automation Map | `ROUTES.bookDiscovery` | L3 qualify | OK | **PASS** |
| L04 | `/solutions/sales-funnel/#inspire` | Open Design Intake | `inspire.demoHref` | Live demo | OK | **PASS** — Flow + Limitations + PARTIAL badge |
| L05 | `/solutions/sales-funnel/#inspire` | Book Automation Map | book | L3 | OK | **PASS** |
| L06 | `/results/sales-funnel/` | See Design Intake on Sales Funnel | `ROUTES.salesFunnel#inspire` | INSPIRE bridge from Wizard CS | P1 missing | **PASS** — bridge live → `#inspire` |
| L07 | `/results/sales-funnel/` | Open zzpackage wizard / See live wizard | `zzpackageWizardPath` / root | Wizard demo | OK for Wizard-only story | **PASS** — present; not Complex Quote secondary |
| L08 | `/results/` hub card CS03 | Read full case study | `detailHref` → CS | Wizard proof | OK | **PASS** |
| L09 | Nav / footer | Sales Funnel / Wizard Cash Engine | `ROUTES.salesFunnel` | Money page | OK | **PASS** |
| L10 | Founder | See the Wizard Cash Engine | `resultsSalesFunnel` | Wizard proof | P2 OK | N/A click |
| L11 | ecosystem | `proofRoute` → resultsSalesFunnel | Consistency | P1 OK (Wizard proof) | Code OK |
| L12 | GTM / LI-R10 | `?utm_…#design-intake` | LI-R10 land | Hash after query | **PASS** drafts | **PASS** — utm land; `#design-intake` in viewport (top≈72) |

### EXTERNAL

| URL | Status | Notes |
|-----|--------|-------|
| `https://zzpackage.flexgrafik.nl/voertuigreclame-ontwerp/` | 200 | Design Intake — offerte path; site nav “Open Wizard” is WP chrome, not Quietforge CTA target |
| `https://zzpackage.flexgrafik.nl/wizard/` | 200 | Wizard SPA — correct for L07 Wizard bridges only |

### Hash / UTM

- Canonical LI-R10: `/results/?utm_source=linkedin&utm_medium=organic&utm_campaign=…#design-intake` (query before hash) — drafts OK.
- Post-fix secondary deep story for GTM: `/solutions/sales-funnel/#inspire` (not case study).

---

## 3. UX/UI findings

| Heuristic | Finding | Impact | Evidence | Suspected file (pre-fix) |
|-----------|---------|--------|----------|----------------------------|
| Job to be done | Outcome H2 clear on results; Flow/Limitations missing | P1 | Prod snapshot `#design-intake` | `results/page.tsx` |
| CTA ladder | Third CTA labeled Wizard CS → wrong surface | **P0** | Link “Wizard case study” → `/results/sales-funnel/` | `results-page.ts` |
| Label honesty | “Wizard case study” at Design Intake = misleading after Perfecto | **P0** | Visible label | `results-page.ts` |
| Parity | solutions has Flow + Limitations + badge; results did not | P1 | Side-by-side | dual SSoT |
| Hierarchy | Results thinner composition | P1 | — | — |
| Proof | 2 screens, no offerte success PNG | P2 Phase 2 | evidence[] | out of scope |
| A11y | Accessible names = visible labels | OK | snapshot | — |
| Mobile | CTAs in flex-wrap; secondary was wrong not buried | P0 link | — | — |
| Internal loops | solutions → CS → dead for INSPIRE | P1 | CS snapshot no Design Intake block | `results/sales-funnel/page.tsx` |
| Nav consistency | Footer → `ROUTES.salesFunnel` | OK | — | `navigation` |

---

## 4. Content / layout parity matrix

| Field | solutions | results (pre) | Status pre-fix | Post-fix |
|-------|-----------|---------------|-----------------|------------|
| eyebrow | Extension · PARTIAL | Complex quote · PARTIAL | diverge | **shared** (extension eyebrow) |
| title / outcomeTitle | Complex Quote & Design Intake | Design Intake → … 48-hour quote | diverge (intentional modes) | **shared** via `headingMode` |
| lead / outcomeLead | long | compact | diverge | **shared** dual fields in one object |
| statusBadge | yes | missing | missing on results | **shared** |
| steps[] | yes | missing | missing on results | **shared** |
| limitations[] | yes | missing | missing on results | **shared** |
| evidence[] | shared array | shared array | shared | shared |
| demoLabel/href | yes | yes | shared intent | shared |
| secondary | — (Map only) | Wizard case study → CS | **wrong** | See solution details → `#inspire` |
| map CTA | Book Automation Map | Book Automation Map | shared | shared |

---

## 5. Recommended fix order (executed)

1. ✅ One SSoT: `salesFunnelInspireExtension` (+ `outcomeTitle` / `outcomeLead` / `secondary*`)
2. ✅ `InspireExtensionBlock` on solutions + results `#design-intake`
3. ✅ CTA ladder: Design Intake → See solution details → Book Map; drop “Wizard case study”
4. ✅ Case study bridge → `ROUTES.salesFunnel#inspire`
5. ✅ GTM claim-lock note: secondary deep-link = solutions `#inspire`
6. ✅ Handoff + verify (ship with session)

**Out of scope / next steps:**
1. **Phase 2 (DONE 2026-08-02):** `offerte-success.png` in `evidence[]` — prod CSS capture, HITL ref `off-20260727-fbf2a2a6`.
2. LinkedIn media WIP (slides/mp4/scripts) — dedicated media session; do not mix into Quietforge product commits.
3. Optional GTM: when a draft needs *secondary* deep story past the hub strip, use `/solutions/sales-funnel/#inspire` (primary LI land stays `#design-intake` — already correct in inspire drafts).
4. Out of scope: flexgrafik-inspire engine; full results hub redesign.
