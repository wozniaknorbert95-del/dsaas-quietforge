# dsaas-quietforge

Active test tenant for the DSaaS platform and the operating repository for
`quietforge.flexgrafik.nl`.

## Boundary

- **Business roadmap tool (SoT):** private repo [`quietforge-roadmap`](https://github.com/wozniaknorbert95-del/quietforge-roadmap) — not this repo.
- This repository owns QuietForge brand site, content, intake and tenant configuration (data waiting for the platform).
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
