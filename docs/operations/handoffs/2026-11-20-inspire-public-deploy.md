# Handoff — INSPIRE client polish / public Production deploy

**Branch:** `arena/54308398-dsaas-quietforge`  
**Starting SHA:** `3b8b3036c8fe6217c075610d6cf4d9b55f6387f6`  
**Scope:** INSPIRE only. Public Production deployment was explicitly ordered by the Commander. No image generation, user-flow/E2E test, or paid API call was run by the agent.

## Client-path changes prepared

- Rewrote the active opening in NL/PL/EN to explain the same-wrap A/B comparison and end with one company-name question; aligned the client fallback and locale-pack fallback.
- Changed the chat status/disclosure to identify an AI demo and removed the false promise of a live human takeover.
- Made the proposed ad line editable (60 characters). After an edit, the current line, hierarchy, recommendation, cards and downloadable/copyable brief derive from the updated briefing. Changing the service refreshes an untouched old line.
- Filtered out stale phone/website details when the customer changes the single primary CTA.
- Cards present **Richting A / B**, same wrap, no product-tier prices. Each shows the current proposed line, hierarchy and the agency recommendation; selecting a direction only updates the brief and does not open the quote form or request an email.
- The brief explicitly distinguishes INSPIRE's recommendation from the customer's chosen direction and includes current image/demo status. Copy and download read the same current textarea content.
- Clarified the concept-image boundary and demo-only quote step. Improved keyboard focus restoration and accessible descriptions/labels in the logo-placement dialog.
- Updated the generation API comment: A/B are visual directions for one wrap; `standard`/`premium` are internal provider keys.

## Isolated budget resources

- Created isolated preview KV namespace `AI_LEDGER_PREVIEW` (`949a0d9c335b499a8a52fbb30d490640`); the existing `AI_LEDGER` was not changed.
- Created D1 `inspire-image-budget-preview` (`988440fd-61b9-4a6a-bbb1-6344e154825a`) and applied `docs/operations/scripts/inspire/budget.sql`; `image_spend` exists. No generation calls or spend records were made.
- Created separate production D1 `inspire-image-budget-production` (`a50967a5-e5db-45f3-8d91-5a47ef1bee27`) and applied the schema. Its `image_spend` table has zero rows. Production and preview use distinct D1 databases and KV namespaces.
- Preview uses `AI_LEDGER_PREVIEW` and its own D1, with no `IMAGE_CALL_BOUND_CONFIRMED` or second-half approval; its paid route fails closed. Wrangler type generation confirmed the separate bindings.
- OpenAI published rates: $5/1M text input and $30/1M image output. The 1536×1024 high image-output estimate is 1,372 tokens (~$0.0412); the prompt is bounded by the code and contains no reference image. The $1.25/image reserve is >20× this estimate, so the cost assumption is confirmed for the configured dimensions/quality. Production keeps the initial D1 cap at $5; `IMAGE_SECOND_HALF_APPROVED` is unset.

## Deployment — Commander override to public Production

The previously requested private-preview gate was blocked: the existing Pages deployment for SHA `3b8b303` is `https://225c29de.dsaas-quietforge.pages.dev`, and unauthenticated `HEAD /lab/inspire/` returned **200**. A later explicit Commander order requested deployment to the public production route `https://quietforge.nl/lab/inspire/`; deployment was therefore performed directly to the Pages `main`/Production environment without merging or pushing Git `main`. Exact deployment metadata is in the session's final response. The preview remains public and was not used as a private link.

Wrangler reports an encrypted `IMAGE_API_KEY` secret in **Production**; its value was not read, displayed, or changed. Production uses `IMAGE_PROVIDER=openai`, the dedicated `IMAGE_BUDGET` ledger, and `IMAGE_CALL_BOUND_CONFIRMED=yes`; the hard cap is $5 until the Commander explicitly approves the second half. The private Preview setting is still off; Preview itself stays fail-closed because its cost-bound approval is unset.

**Preview note:** Cloudflare Dashboard → Workers & Pages → `dsaas-quietforge` → Settings → General → **Enable access policy** before treating any branch Preview as private. Production is public by explicit order.

The existing Production secret is available to the server runtime; no key was copied or read. The first owner test is protected by the $5 global D1 cap. Review/rotate the existing Production secret after acceptance as planned.

## Verification — not product acceptance

| Check | Result |
|---|---|
| `npm run typecheck` | PASS |
| `npm run lint` | PASS, 0 errors; 10 existing warnings |
| `npm run build` | PASS; existing static-export warnings about redirects/headers |
| `node --check` on changed browser JS | PASS |
| NL/PL/EN JSON parse + `git diff --check` | PASS |
| `wrangler types --env preview` | PASS |
| Chat, E2E, Generate, GPT-Image call, logo QA | **NOT RUN** — Commander owns first product test |
| Exact private Preview | **NOT DEPLOYED** — Preview Access remains off |

## Next steps

1. The first real chat + one A/B pair remains the Commander's test; this session made no generation calls.
2. Check reservations in Production D1 `image_spend` and per-call estimates in production KV `inspire:spend:<requestId>:<style>` / Pages Logs.
3. Stop at $5; do not approve the second half until the Commander reviews the first pair.
4. Do not infer output quality or logo calibration before the owner reviews the pair.
