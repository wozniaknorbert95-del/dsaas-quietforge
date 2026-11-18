# ADR-001: Backend architecture for paid AI generation & payments

**Status:** proposed — 2026-11-18 · **Task:** SH-G1-01 (QUI-271) · **Review:** required (L2, Builder≠Reviewer)
**Scope:** backend for INSPIRE paid mockups (chat proxy, gpt-image generation, Mollie payments, R2/KV storage, job lifecycle) and WIZARD paid vector print files.

## Context (repo evidence, audited 2026-11-18)

| Fact | Evidence |
|---|---|
| Static export; no Next.js API routes possible | `next.config.ts:12` `output: 'export'` (MIG-30/QUI-247); `src/app/api/` does not exist |
| **Pages Functions already live** | `functions/api/intake.ts`, `functions/api/waitlist.ts` — replaced former Next.js routes; Resend HTTP API; secrets only in Pages env; honeypot + consent + `INTAKE_DISABLED` kill-switch |
| Functions routing configured | `public/_routes.json` → `include: ["/api/*"]`; `public/_headers` + `public/_redirects` generated in `prebuild` by `scripts/generate-pages-files.mjs` |
| Deploy = Cloudflare Pages CI on push to `main` (project `dsaas-quietforge`); agent never deploys prod (Zasada 11) | `brain.md` §5; `docs/operations/handoffs/2026-11-17-four-doors-demo-previews.md` |
| CI: gitleaks on PR/push; Lighthouse manual only. No test/deploy workflow for functions | `.github/workflows/secret-scan.yml`, `lighthouse.yml` |
| Demos = static 1:1 replicas under `public/demo/` (`zzpackage`, `bouwplaats`) — front stays static | `public/demo/`, `docs/operations/SESSION-ANCHOR.md` |
| **Typed Mollie client already exists but is unused** (0 importers) | `src/lib/mollie.ts` (createPayment/getPayment/cancelPayment, webhook verify helper). Uses Node `crypto` → must be ported to Web Crypto for workerd |
| Email truth conflict: `src/lib/email.ts` = Nodemailer/SMTP (Cyberfolks, brain.md §4) vs live Functions = Resend (`RESEND_API_KEY`) | `functions/api/intake.ts:5` vs `brain.md` |
| KV/R2 not bound in repo | no `wrangler.toml` / `.dev.vars` anywhere; no KV/R2 usage in code |
| Prior plan already assumes this shape | `docs/operations/plans/2026-11-18-demo-enterprise-program.md:8-14` (`functions/api/*`: checkout, mollie/webhook, order/:id, generate, chat, vectorize + KV + R2); `linear-issues-g2-g7.json` ("functions/api/generate+KV", "functions/api/chat") |

**External systems (reuse assessment):**
- zzpackage theme (`flexgrafik-wizard-theme/functions.php`, 2,474 lines, `inc/integrations/`): payments = **WooCommerce + Mollie plugin**, inseparable from WordPress (WC sessions, order lifecycle). `fg-design-agent-api.php` = WP REST proxy to jadzia `/api/v1/design-agent/*` (key server-side, generate timeout 360 s). `fg-jadzia-order-webhook.php` = paid-order webhook to COI. **Reusable: contracts only** (order webhook shape, attribution capture); not code.
- INSPIRE engine (`flexgrafik-inspire/engine/v4/`, Python, Pillow+jsonschema): intake contract (`PHASE_FIELDS`, orchestrator, adaptive chips), prompt/template logic, QA gates — but it is a **long-running VPS service behind jadzia-core** (`api_handlers.py`), providers `stub|openrouter|gemini` (no gpt-image/OpenAI). Workers cannot host Python.

## Options

### A — Maximum reuse: static + minimal Functions (chat + checkout + webhook only)
- Evidence fit: Functions pattern proven; `_routes.json` ready.
- Effort: ~2–3 sessions. No KV/R2 → job state lives in Mollie metadata + polling; generation must run synchronously inside `/api/generate`.
- Cost: Cloudflare free tier only. Pages Functions share Workers Free **100k req/day** (verified: developers.cloudflare.com/pages/functions/pricing, 2026-09); KV/R2 free-tier figures irrelevant (not used).
- Security: good (few endpoints), but no server-side job state → weak idempotency/unlock control; paid-unlock enforced only client-side or via Mollie lookups.
- Migration cost to G2: **rework** — G2 todos explicitly require KV job state + signed URLs (R2) + download ownership. Blocking for WIZARD paid files.
### B — Minimal shared backend: Pages Functions `/api/chat`, `/api/generate`, `/api/checkout`, `/api/mollie/webhook`, `/api/order/:id`, `/api/vectorize` + **KV** (orders/jobs) + **R2** (assets, signed URLs)
- Evidence fit: extends the exact intake/waitlist pattern; `_routes.json` already routes `/api/*`; same domain → zero CORS, no new deploy surface; matches existing plan + G2/G4 todo scopes.
- Effort: ~4–6 sessions (F1 skeleton+Mollie test+R2+chat; F2 generate+job lifecycle; F3 vectorize). Ports `src/lib/mollie.ts` to Web Crypto (mechanical).
- Cost: Functions free 100k req/day shared with Workers; KV free ≈ 100k reads + 1k writes/day, 1 GB (approx — verify); R2 free ≈ 10 GB-month, 1M/10M ops, **zero egress** (approx — verify). Mollie per-transaction (iDEAL ≈ €0.29, cards %+fixed — verify), no monthly fee. gpt-image per mockup ≈ €0.3–1.0 (`2026-11-18-demo-enterprise-program.md:44`) → €19 pack margin ≈ €17. Growth risk: KV 1k writes/day caps job-state updates at low volume; QPS well within free tier at SMB scale.
- Security: secrets stay in Pages env (precedent: `INTAKE_*`); webhook signature verify (port from `mollie.ts` — note: its custom `Mollie-Signature` HMAC is **not** Mollie's actual webhook contract; implement Mollie truth = fetch payment status by id, plus our own signed order tokens); R2 signed URLs + TTL 30 d per plan; rate limits per IP/order in Functions.
- Migration cost: none from A (superset); later upgrade path = paid plan (Queues/Durable Objects) without rewrite.
### C — Dedicated backend: separate Worker/service or reuse Python INSPIRE engine on VPS
- Evidence fit: engine code exists but targets jadzia-core hosting (`api_handlers.py`), providers ≠ gpt-image; theme PHP is WordPress-bound.
- Effort: ≥8 sessions + VPS ops, second deploy surface (Zasada 11 manual deploys ×2), CORS/domain config, secret sprawl. Reuse = keeping legacy stack alive; port = rewrite Python→TS anyway.
- Cost: VPS + maintenance vs free tier; no Cloudflare-limit relief at our scale.
- Security: more surface (public origin 185.243.54.115 pattern in theme config), key handling duplicated.
- Migration cost back: high; contradicts "max efektu, min złożoności" plan goal.

## Decision: **Option B** (recommended)

1. Pages Functions are **already proven in production** in this repo — B is incremental, not new infrastructure.
2. G2 acceptance criteria (job lifecycle in KV, assets + signed URLs in R2) cannot be met by A without rework; A is a strict subset of B, so B costs little more now.
3. One deploy surface, one domain, secrets in one place, static-export build gate untouched (`npm run build` remains valid).
4. C adds ops + cost with no scale justification (SMB volume) and revives suspended legacy runtimes.

**Consequences:** port `src/lib/mollie.ts` to Web Crypto; adopt API envelope standard (SH-G1-02) before endpoints; async generate + polling (Pages Functions wall-clock/CPU constraints make synchronous generation fragile); email truth (Resend vs Nodemailer/SMTP) must be settled in F1; gitleaks already guards secrets; functions need their own tests (no CI slot today).
**Ruled out:** WordPress/WooCommerce as payment path here; live Python INSPIRE engine (kept as **spec/IP source**: PHASE_FIELDS contract, prompts, QA gates → ported to TS/data); separate backend service; Queues/Durable Objects for now (paid plan; revisit if KV write limits bind).

## Open questions for Commander (L4 / F0)

1. Secrets in Pages env (never repo): `MOLLIE_API_KEY` (test first), `OPENAI_API_KEY`, `RESEND_API_KEY` — and which email path is truth (Resend vs Nodemailer/SMTP per brain.md)?
2. R2 bucket + KV namespace binding names on `dsaas-quietforge` (prod + preview parity) — dashboard-only per Zasada 11?
3. Prices unlock (plan suggestion: mockup pack €19, WIZARD file €39) + per-order AI cost cap?
4. Accept async job + polling as UX (vs paid-plan Queues)?
5. Mollie test-mode until explicit prod unlock — confirm.

*Approximate third-party limits/fees marked "verify" must be re-checked at implementation. Figures from plan `2026-11-18-demo-enterprise-program.md` are estimates, not invoices.*
