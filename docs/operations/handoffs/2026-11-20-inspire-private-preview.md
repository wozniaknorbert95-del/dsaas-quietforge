# Handoff — INSPIRE client polish / private Preview gate

**Branch:** `arena/54308398-dsaas-quietforge`  
**Starting SHA:** `3b8b3036c8fe6217c075610d6cf4d9b55f6387f6`  
**Scope:** INSPIRE only. No production merge, image generation, user-flow/E2E test, or paid API call.

## Client-path changes prepared

- Rewrote the active opening in NL/PL/EN to explain the same-wrap A/B comparison and end with one company-name question; aligned the client fallback and locale-pack fallback.
- Changed the chat status/disclosure to identify an AI demo and removed the false promise of a live human takeover.
- Made the proposed ad line editable (60 characters). After an edit, the current line, hierarchy, recommendation, cards and downloadable/copyable brief derive from the updated briefing. Changing the service refreshes an untouched old line.
- Filtered out stale phone/website details when the customer changes the single primary CTA.
- Cards present **Richting A / B**, same wrap, no product-tier prices. Each shows the current proposed line, hierarchy and the agency recommendation; selecting a direction only updates the brief and does not open the quote form or request an email.
- The brief explicitly distinguishes INSPIRE's recommendation from the customer's chosen direction and includes current image/demo status. Copy and download read the same current textarea content.
- Clarified the concept-image boundary and demo-only quote step. Improved keyboard focus restoration and accessible descriptions/labels in the logo-placement dialog.
- Updated the generation API comment: A/B are visual directions for one wrap; `standard`/`premium` are internal provider keys.

## Preview resources prepared (no deploy)

- Created isolated preview KV namespace `AI_LEDGER_PREVIEW` (`949a0d9c335b499a8a52fbb30d490640`); the existing `AI_LEDGER` was not changed.
- Created D1 `inspire-image-budget-preview` (`988440fd-61b9-4a6a-bbb1-6344e154825a`) and applied `docs/operations/scripts/inspire/budget.sql`; `image_spend` exists. No generation calls or spend records were made.
- Added `env.preview` bindings and non-secret model vars in `wrangler.toml`: `IMAGE_PROVIDER=openai`, `IMAGE_MODEL=gpt-image-2.6-sunburst`. Preview intentionally lacks `IMAGE_CALL_BOUND_CONFIRMED=yes` and `IMAGE_SECOND_HALF_APPROVED=yes`; no secret value was read or added.
- Wrangler type generation validated the preview config and showed the intended `AI`, `AI_LEDGER`, `IMAGE_BUDGET`, and model vars.

## Deployment — Commander override to public Production

The previously requested private-preview gate was blocked: the existing Pages deployment for SHA `3b8b303` is `https://225c29de.dsaas-quietforge.pages.dev`, and unauthenticated `HEAD /lab/inspire/` returned **200**. A later explicit Commander order requested deployment to the public production route `https://quietforge.nl/lab/inspire/`; deployment was therefore performed directly to the Pages `main`/Production environment without merging or pushing Git `main`. Exact deployment metadata is in the session's final response. The preview remains public and was not used as a private link.

Wrangler identity has Pages write, but no Cloudflare Access control scope. Wrangler reports an encrypted `IMAGE_API_KEY` secret in **Production**; its value was not read. The Production secret was not changed. OpenAI's current published rates are token-based ($5/1M text input; $30/1M image output); the docs do not establish a guaranteed maximum for this exact high-quality image, so the $1.25/image bound is **not confirmed**. The public Production deployment explicitly uses `IMAGE_PROVIDER=openai`, but has no `IMAGE_BUDGET` binding and sets `IMAGE_CALL_BOUND_CONFIRMED=no`; generation therefore fails closed rather than calling OpenAI or silently falling back to FLUX. `IMAGE_SECOND_HALF_APPROVED` is unset.

**Immediate Commander action:** Cloudflare Dashboard → Workers & Pages → `dsaas-quietforge` → Settings → General → **Enable access policy** for Preview deployments before any further Preview push. The public production site is already live by explicit order.

To enable a paid test later, the owner must configure the key in the intended environment and confirm the cost bound before setting `IMAGE_CALL_BOUND_CONFIRMED=yes`. Leave the second half unapproved. Review of the existing Production secret is separate; this session did not alter it.

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
| Private Preview for the new SHA | **NOT DEPLOYED** — Preview Access remains unverified/public |

## Next steps

1. Commander enables the Preview Access policy before future branch pushes.
2. If enabling paid generation, configure a secret only in the chosen environment and confirm the image-cost bound. Do not set second-half approval before the Commander's explicit decision.
3. The first real chat + one A/B pair remains the Commander's test; this session made no generation calls.
4. Check reserved spend in D1 `image_spend` and per-call estimates in server KV `inspire:spend:<requestId>:<style>` / Pages Logs. Do not infer output quality or logo calibration before the owner reviews the pair.
