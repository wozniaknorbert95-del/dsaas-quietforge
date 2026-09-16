# Handoff — Lab production live (2026-09-16)

**Repo:** dsaas-quietforge · **Branch:** `main` @ `5fb4ec0`  
**Deploy:** `dpl_rxjATdSR5mzj31kj9b7WmroWFV1q` · target **production** · project `flexgrafik-services`

## Cel / Goal

Lokalny executor: verify → (polish tylko jeśli fail) → deploy Production → smoke na `quietforge.flexgrafik.nl/lab/`.

## Co zrobiono / What changed

- Sync `main` @ `5fb4ec0` (Lab ICP 7 stages already on main).
- Verify PASS: typecheck, build (57 routes / sitemap 28), lint 0 errors / 10 pre-existing warnings.
- Grep gate Lab PASS (no DSAAS/OPA/Cedar/DMN; no old stage titles; 7 milestones; last id `platform-build`).
- Local `audit:lab` PASS → production `audit:lab` PASS.
- Polish (B): **skipped** — verify + audit green, no copy/SaaS glue.
- Deploy: `npx vercel --prod --yes` (not `vercel dist` — repo is Next server build, no `dist/` / no `output: 'export'`).
- Aliases include `quietforge.flexgrafik.nl` + `services.flexgrafik.nl`.

## Pliki / Files

| File | Action |
|------|--------|
| (app/Lab code) | unchanged this session — already on `main` |
| `docs/operations/SESSION-ANCHOR.md` | update → DEPLOYED |
| `docs/operations/handoffs/2026-09-16-lab-prod-live.md` | new |
| `.agents/workflows/handoff.md` | SESSION ANCHOR header → live |

## Weryfikacja / Verification

```bash
npm run typecheck   # pass
npm run build       # pass (57 routes, sitemap 28)
npm run lint        # 0 errors, 10 warnings (archive/legacy — non-blocking)
# grep Lab DSAAS|OPA|Cedar|DMN → 0
# milestones = 7, last = platform-build
AUDIT_BASE_URL=http://localhost:3000 npm run audit:lab   # pass
```

## Post-deploy smoke (verified live)

| Check | Result |
|-------|--------|
| `curl -sI https://quietforge.flexgrafik.nl/lab/` | HTTP 200 |
| `Governed tenant platform` count | 5 (>0) |
| `qf-lab-stage-number">0[89]` | 0 |
| Stage numbers in HTML | 01–07 only |
| `AUDIT_BASE_URL=https://quietforge.flexgrafik.nl npm run audit:lab` | **PASS** — 7 milestones, selectedTitle `Governed tenant platform`, consoleErrors `[]` |

**Inspect:** https://vercel.com/wozniaknorbert95-dels-projects/flexgrafik-services/rxjATdSR5mzj31kj9b7WmroWFV1q

## Decisions

| Decyzja | Uzasadnienie |
|---------|----------------|
| Deploy via `npx vercel --prod --yes` | brain.md `dist/` path is stale; Next has API routes + no static export |
| No polish commit | gates already green |
| No force-push / no Actions token repair this session | CLI path unblocked |

## Następny krok / Next steps

1. Optional: commit these docs (`docs(ops): lab prod live handoff`) and push `main`.
2. Optional: repair GitHub Actions `VERCEL_*` secrets so `deploy.yml` works without local CLI.
3. Optional: refresh `brain.md` deploy section (`dist/` → `vercel --prod`).
4. Manual browser spot-check: `/lab/#stage-07`, `/lab/#stage-09` alias, Book a scan CTA.
