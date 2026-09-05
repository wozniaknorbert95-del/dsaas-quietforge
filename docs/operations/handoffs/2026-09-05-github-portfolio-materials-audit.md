# Handoff - GitHub and portfolio materials audit (2026-09-05)

**Repo:** dsaas-quietforge · **Build:** not run (audit-only session)

## Cel / Goal

Audit the professional role of GitHub, the FlexGrafik reference tenant and the nine QuietForge systems before changing public copy or repository visibility.

## Co zrobiono / What changed

- Audited the active QuietForge identity, site map, marketing rules, conversion pipeline and platform boundary.
- Audited live `/systems/`, system spokes, proof, security, pricing, about and booking routes.
- Audited the public GitHub profile and confirmed mismatches between profile copy, public repositories and current site offer.
- Confirmed that FlexGrafik has multiple live, testable public surfaces that can support a dedicated Builder's Lab page.
- Flagged the wording conflict between `LAB: PAUSED` and the still-live FlexGrafik sales paths; business status and laboratory status must be separated.
- Convened five planning specialists: strategy/IA, UX/UI, proof/content, Next/SEO/analytics and dSaaS governance/ownership.
- Consolidated their recommendations into `docs/operations/plans/2026-09-05-builder-lab-implementation-plan.md`.
- Added the `/lab/` Builder's Lab proposal, timeline and canon-change requirement to the audit.
- Added a durable audit and remediation plan at `docs/audits/2026-09-05/github-portfolio-materials-audit.md`.
- No production code, GitHub repository or deployment was changed.

## Pliki / Files

| File | Action |
|---|---|
| `docs/audits/2026-09-05/github-portfolio-materials-audit.md` | new audit and plan |
| `docs/operations/plans/2026-09-05-builder-lab-implementation-plan.md` | new specialist implementation plan |
| `docs/operations/handoffs/2026-09-05-github-portfolio-materials-audit.md` | new handoff |

## Weryfikacja / Verification

```text
Audit only. No npm build or typecheck run because application code was not changed.
Live pages and public GitHub pages were inspected on 2026-09-05.
```

## Post-deploy smoke (Dowodca)

1. No deploy was performed.
2. Before the next public change, verify every repository URL from the approved truth registry.
3. Recheck the GitHub profile README after the profile cleanup; `/contact` must not be linked unless the route exists.

## Nastepny krok / Next steps

1. Approve the five Commander decisions in the audit.
2. Build the repository/system truth registry.
3. Professionalise the GitHub profile and only then sync `/systems` evidence links.
4. Fix the system JSON-LD zero-price inconsistency in a separate implementation session.
5. Decide whether the canon should allow a live FlexGrafik reference tenant page under the proposed `/lab/` route.
6. Do not begin GitHub profile planning until the website plan reaches its final verification gate.
