# Handoff — Marketing Audit Quietforge (2026-08-02)

**Repo:** services.flexgrafik.nl · **Build:** docs-only session (no src changes)

## Cel / Goal

Execute marketing audit plan: live prod funnel check, GA4 baseline, channel scorecard, and automation-first deliverables (runbooks + LI-R10 publish pack + GA4 weekly script).

## Co zrobiono / What changed

- **Faza A audit** — prod smoke home/book-discovery/results; FB 14 followers pre-v2; LI authwall → June baseline retained
- **Scorecard** — P0/P1/P2 in main audit artefact
- **B1** — LinkedIn Featured V2 paste runbook (4 slots mirror home)
- **B2** — INSPIRE LI-R10 v3 publish pack (post-parity URLs + claim-lock)
- **B3** — Facebook launch v2.0 commander checklist
- **B4** — LinkedIn publish pipeline v1 runbook
- **B5** — GA4 weekly attribution script + ops rhythm runbook
- **Shorts** — repurpose spec for inspire/m0b 9:16 → YT/TikTok (FlexGrafik only)

## Pliki / Files

| File | Action |
|------|--------|
| `docs/operations/artefacts/2026-08-02-marketing-audit-quietforge.md` | new |
| `docs/operations/runbooks/linkedin-featured-v2-paste.md` | new |
| `docs/operations/runbooks/linkedin-publish-pipeline-v1.md` | new |
| `docs/operations/runbooks/facebook-launch-v2-commander.md` | new |
| `docs/operations/runbooks/shorts-repurpose-spec.md` | new |
| `docs/operations/runbooks/ga4-weekly-attribution-rhythm.md` | new |
| `docs/strategy/linkedin/drafts/2026-08-02-inspire-li-r10-publish-pack.md` | new |
| `scripts/ga4-weekly-attribution.py` | new |
| `package.json` | update — `ga4:weekly` script |
| `docs/operations/SESSION-ANCHOR.md` | update |

## Weryfikacja / Verification

```bash
# Docs-only — no build required for GTM artefacts
python scripts/ga4-weekly-attribution.py   # if SA credentials present
npm run ga4:weekly                           # alias
```

Prod funnel checks (browser 2026-08-02): home L3 Map PASS · book-discovery PASS · `#design-intake` PASS (prior INSPIRE session).

## Post-deploy smoke (Dowódca)

1. LinkedIn Featured V2 — 4 links open on mobile
2. Publish LI-R10 carousel — first comment UTMs live
3. FB bio v2.0 pasted — languages = NL only
4. Monday: `npm run ga4:weekly` → artefact in `docs/operations/artefacts/`

## Następny krok / Next steps

- Commander executes B1 → B2 → B3 in order (see SESSION-ANCHOR)
- Agent: optional `scripts/repurpose-shorts.mjs` v2 when Commander approves Shorts upload
- 90d success: ≥1 Map with LI utm attribution

## Key findings (one screen)

| Signal | Baseline |
|--------|----------|
| LI sessions (GA4 30d) | **0** |
| FB referral sessions | ~26 |
| book_discovery_view | 3 |
| intake_submit | 0 |
| Site funnel | **READY** |
| Bottleneck | **LinkedIn distribution** |
