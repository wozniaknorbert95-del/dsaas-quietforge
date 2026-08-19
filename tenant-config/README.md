# QuietForge tenant contract

This directory contains QuietForge instances only: identity, business goals,
KPI, brand voice, budgets and integration references.

Identity lock (do not contradict): [`docs/canon/identity.md`](../docs/canon/identity.md).

- `tenant.json` — tenant identity, status and operational ownership.
- `business-profile.json` — QuietForge goals, KPI, voice, budget policy and
  integration boundaries. Public pricing: Scan €690 / implementation from €2 500 /
  maintenance from €300. Hours-given-back starts at 0.

Generic platform behavior is not copied here. Compatibility with
`dsaas-platform-main` is controlled by `../platform.lock.json`.

## Upgrade

1. Validate the target platform release and tenant schema.
2. Apply documented tenant migrations.
3. Run typecheck, lint and build locally.
4. Ask the Commander to approve any production change.

## Rollback

Restore the previous committed `platform.lock.json` and tenant migration state.
Production rollback remains a manual Commander action.
