# dsaas-quietforge

Active test tenant for the DSaaS platform and the operating repository for
`quietforge.flexgrafik.nl`.

## Boundary

- This repository owns QuietForge brand, content, goals, KPI, intake and tenant configuration.
- **Business roadmap (SoT):** [`docs/ROADMAP.md`](docs/ROADMAP.md) — goals from „Musimy", status, locks. Not in `zlotaskrzynia`.
- Generic decision, policy, lifecycle and agent runtime belongs to `dsaas-platform-main`.
- Client battlecards / KOKPIT tool live in `zlotaskrzynia` (separate product, separate sessions).
- Platform compatibility is pinned in `platform.lock.json`.
- Production deployment is a manual Commander action.

## Local verification

```bash
npm ci
npm run typecheck
npm run lint
npm run build
```

Start with `AGENTS.md`, `docs/README.md`, `brain.md` and `tenant-config/README.md`.
