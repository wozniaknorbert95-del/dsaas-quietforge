# Handoff — Growth OS Production Hardening (2026-08-09)

**Repo:** services.flexgrafik.nl · **Build:** `npm run build` ✅ (38 routes)

## Cel / Goal
Harden the Quietforge Growth OS implementation (commit a80ccfa) for production: eliminate Turbopack `fs` warnings, replace simulated Mollie payments with real API integration, enforce strict TypeScript typing, and verify marketing canon compliance.

## Co zrobiono / What changed
- Created `/api/growth-os/ledger` route — REST endpoint for ledger persistence (replaces `require('fs')` in PerformanceTracker)
- Built `src/lib/mollie.ts` — fully typed Mollie Payments client with webhook verification, signature validation, and helpers for Automation Map (€290) and Wizard Cash Engine deposits
- Wired real Mollie checkout into `ConversionRetentionAgent.createAutomationMapPaymentLink()` and `ExecutionEngine.executeProposal()`
- Fixed all `any` types in `PerformanceTracker`, `OptimizationStrategyAgent`, and `QuietforgePaymentContext`
- Verified generated posts comply with marketing-rules.md (Problem→System→Effect, Cwany Cheater voice, Dutch terminology, zero AI-isms)

## Pliki / Files

| File | Action |
|------|--------|
| `src/app/api/growth-os/ledger/route.ts` | new |
| `src/lib/mollie.ts` | new |
| `src/lib/nooa/PerformanceTracker.ts` | update (fetch-based ledger, typed LedgerEntry) |
| `src/lib/nooa/agents/ConversionRetentionAgent.ts` | update (real Mollie payment link) |
| `src/lib/nooa/agents/OptimizationStrategyAgent.ts` | update (typed ledgerData: LedgerEntry[]) |
| `src/lib/nooa/ExecutionEngine.ts` | update (Mollie integration for approved proposals) |
| `public/sitemap.xml` | update (auto-regenerated, +2 routes) |

## Weryfikacja / Verification
```bash
npm run typecheck   # pass
npm run build       # pass (38 routes)
rg '\[FILL:' src/   # 0 matches
```

## Post-deploy smoke (Dowódca)
1. `curl -sI https://quietforge.flexgrafik.nl/growth-os/ | head -1` → 200 OK
2. `curl -sI https://quietforge.flexgrafik.nl/api/growth-os/ledger | head -1` → 200 OK
3. Set `MOLLIE_API_KEY` and `MOLLIE_WEBHOOK_SECRET` in Vercel Environment Variables (required for real payments)
4. Verify `/growth-os/` cockpit renders: agent scores, staging proposals, simulation log, ledger table

## Następny krok / Next steps
- Configure Mollie webhook endpoint in Mollie Dashboard: `https://quietforge.flexgrafik.nl/api/webhooks/mollie`
- Create `/api/webhooks/mollie/route.ts` to handle payment status updates and update ledger
- Add environment variables to Vercel: `MOLLIE_API_KEY`, `MOLLIE_WEBHOOK_SECRET`
- Consider adding `createWizardDepositPayment` integration for Wizard Cash Engine project deposits