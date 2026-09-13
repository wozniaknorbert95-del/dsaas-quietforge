# Audit Phase 2 — GitHub Actions cost cut (dsaas-quietforge)

**Branch:** `audit/phase-2-optimize-ci-workflows`  
**Date:** 2026-09-13  
**Goal:** Stop automatic deploy and Lighthouse runs; align with `brain.md` manual deploy rule.

## Problem

- Every push to `main` ran **Deploy to Vercel** (~npm ci + typecheck + deploy) — costly and against manual-deploy policy.
- Every PR ran **Lighthouse CI** (full build + audit) — heavy minutes and failure emails on doc-only PRs.

## Changes

| Workflow | Before | After |
|----------|--------|-------|
| `deploy.yml` | Push to `main`/`master` | `workflow_dispatch` only |
| `lighthouse.yml` | Every PR + manual | `workflow_dispatch` only |

## Manual operations

- **Production deploy:** Actions → *Deploy to Vercel* → Run workflow (Commander only).
- **Lighthouse:** Actions → *Lighthouse CI* → Run workflow before major UI releases.

## Estimated impact

| Source | Before (typical month) | After |
|--------|------------------------|-------|
| Deploy on push | ~N pushes × ~3–5 min | 0 unless manual |
| Lighthouse on PR | ~M PRs × ~5–8 min | 0 unless manual |

## Rollback

Restore `on.push` / `on.pull_request` blocks from `main` history before this merge.

## Related

- Phase 1 (workflow-lab): merged PR #54 — digest 3×/week, manual security sweep, CI path filters.
