# Handoff — Lab production deploy (2026-09-16)

**Repo:** dsaas-quietforge · **Commit on main:** `1ab4b95`

## Cel / Goal

Kompleksowy deploy Lab ICP (7 etapów) na `quietforge.flexgrafik.nl`.

## Co zrobiono

- Merged `cursor/lab-stage06-platform-audit-4233` → `main` and pushed (`1ab4b95`).
- Vercel Git: **dsaas-quietforge** Production ✅ (new Lab live on project alias).
- Vercel Git: **flexgrafik-services** built latest **main** on git-main alias ✅ NEW content.
- Custom domain `quietforge.flexgrafik.nl` still on **previous Production** assignment → OLD 9-stage Lab.
- `gh workflow run deploy.yml` → **403** (agent cannot dispatch).
- Historical Actions “Deploy to Vercel” runs on this repo: **failure** (secrets / config).
- Local `vercel` CLI: **not logged in**.

## Status produkcji

| Surface | Lab content |
|---------|-------------|
| `https://quietforge.flexgrafik.nl/lab/` | OLD (9 stages) — **blocked** |
| `https://flexgrafik-services.vercel.app/lab/` | OLD (9 stages) |
| `https://flexgrafik-services-git-main-wozniaknorbert95-dels-projects.vercel.app/lab/` | **NEW** (7 stages, Governed tenant platform) |
| `https://dsaas-quietforge.vercel.app/lab/` | **NEW** |

## Bloker (1 klik Dowódcy)

**Vercel → flexgrafik-services → Deployments → latest `1ab4b95` / main → Promote to Production.**

To przypina `quietforge.flexgrafik.nl` do nowego buildu (git-main już ma poprawną treść).

## Post-promote smoke

```bash
curl -sL https://quietforge.flexgrafik.nl/lab/ | rg -c 'Governed tenant platform'   # >0
curl -sL https://quietforge.flexgrafik.nl/lab/ | rg 'Tenant Platform Core|Agent OS UI / Mission Control'  # expect 0 as stage titles
# or: AUDIT_BASE_URL=https://quietforge.flexgrafik.nl npm run audit:lab
```

1. `/lab/` — 7 stages  
2. `/lab/#stage-07` — Governed tenant platform  
3. `/lab/#stage-09` — alias → `#stage-07`

## Następny krok

Dowódca: **Promote to Production** (lub napraw `VERCEL_TOKEN` + Run workflow `Deploy to Vercel`). Agent wznowi smoke po promote.
