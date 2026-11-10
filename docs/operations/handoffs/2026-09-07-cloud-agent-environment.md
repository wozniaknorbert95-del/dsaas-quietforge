# Handoff — Cloud Agent environment setup (2026-09-07)

**Repo:** quietforge.flexgrafik.nl (dsaas-quietforge) · **Build gate:** `npm run typecheck` ✅ · `npm run lint` ✅ (0 errors) · `npm run build` ✅

## Cel / Goal

Stand up a reproducible Cloud Agent development environment for this repo and prove it works end to end (install → checks → running site → API). No application behaviour changes.

## Co zrobiono / What changed

- Validated the canonical developer flow from `README.md`: `npm ci` → `npm run typecheck` → `npm run lint` → `npm run build`.
- Confirmed the production server (`npm run start`) renders every key route and the intake API runs end to end.
- Configured a **DB-managed** (dashboard) Cloud Agent environment: `install: npm ci`. `.cursor/` is gitignored in this repo, so the environment config is intentionally *not* committed — it is proposed via the environment panel for the Commander to Save.
- Snapshotted the working VM and ran a draft environment **build** (fresh checkout + `npm ci`) — build **SUCCEEDED**.

## Pliki / Files

| File | Action |
|------|--------|
| `docs/operations/handoffs/2026-09-07-cloud-agent-environment.md` | new (this handoff) |

No source or config files were committed. The environment (`install: npm ci`) is DB-managed and proposed via the dashboard, not stored in the repo (`.cursor/` gitignored).

## Weryfikacja / Verification

```bash
npm ci              # pass (718 packages, ~15s; 2nd run ~9s → idempotent)
npm run typecheck   # pass (tsc --noEmit, 0 errors)
npm run lint        # pass (0 errors, 10 pre-existing warnings in archive/legacy scripts)
npm run build       # pass (all routes prerendered; sitemap regenerated via prebuild)
npm run start       # prod server → HTTP 200 on / /pricing/ /systems/inbox-triage/ /book-a-scan/ /proof/ /about/
```

Intake API (`POST /api/intake/`) end-to-end, all branches correct:

```
invalid JSON      -> 400 {"ok":false,"error":"INVALID_JSON"}
missing consent   -> 422 {"ok":false,"error":"CONSENT_REQUIRED"}
honeypot filled   -> 422 {"ok":false,"error":"BOT_DETECTED"}
missing fields    -> 422 {"ok":false,"error":"VALIDATION"}
5th request/IP    -> 429 {"ok":false,"error":"RATE_LIMIT"}   # in-memory rate limiter (3/10min/IP) confirmed
```

Draft environment build `bld-20260907-a4af5889-...` → **SUCCEEDED** (fresh `main` checkout, `npm ci` exit 0, snapshot ready).

## Blokery / Blockers

| Bloker | Wpływ |
|--------|-------|
| `next dev` (Turbopack) throws a CSS parse error on `src/app/globals.css` (`var(--qf-fs-*)`), 500 on every page | **Pre-existing**, dev-only — Tailwind v4 scans `docs/**/*.md` handoffs that contain literal `text-[var(--qf-fs-*)]` candidates. Production `build`/`start` are clean. Fix (a `--qf-fs-*` sweep) is already tracked/deferred in prior handoffs; out of scope for env setup. Use `npm run build && npm run start` for a rendering server today. |
| Fresh-agent boot verification of the successful build | Could not run — all subagent model quotas (Claude, Grok, Composer) were exhausted this session. The build itself SUCCEEDED; only the extra fresh-boot smoke was skipped. |

## Następny krok / Next steps

1. **Commander:** click **Save** in the Environment panel to persist the proposed `install: npm ci` environment for future Cloud Agents.
2. Optional: dedicated session to fix the dev-only Tailwind `--qf-fs-*` parse issue (restrict Tailwind `@source` scanning or remove the literal candidates from `docs/`), so `npm run dev` renders. Would then justify adding a `next-dev` terminal to the environment.
