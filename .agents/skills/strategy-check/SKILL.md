---
name: strategy-check
description: Verify changes comply with the active QuietForge canon — buyer-first home order, intent colors, single-L3 rule, Problem→System→Effect arc, CTA tiers and Builder's Lab boundary. Flags drift and enforces the anti-chaos rule (update the active site-map when page.tsx changes). Invoke before/after any home, proof or money-page work.
---

# strategy-check — Strategy Canon Compliance

The canon (`docs/canons/strategy-rules.md` + `docs/canon/site-map.md`) is the single source of truth for layout, copy, nav, and CTAs. Historical `docs/strategy/site-map.md` must not override the active canon.

## When to Use This Skill

Invoke this skill when:
- Editing `src/app/page.tsx` or any home section component
- Editing a money page (`/solutions/*`, `/results/*`, `/pricing/`, `/book-discovery/`)
- Changing navigation, CTAs, or section order
- Reviewing whether a proposed change is canon-compliant before building it

## Procedure

### Step 1 — Load the relevant canon

`docs/canons/strategy-rules.md` (enforceable HARD rules), `docs/canon/site-map.md` (active IA), plus `conversion-pipeline.md` and `marketing-rules.md` / `marketing-strategy.md` as needed.

### Step 2 — Check against binding rules

**Home order:** Use the exact current order in `docs/canon/site-map.md` §Home. Do not infer section order from the historical strategy site map or removed components. Changes to `src/app/page.tsx` require the active canon to be updated in the same session.

**Page arc:** every money page is **Problem → System → Effect**, never Feature → Feature → Feature.

**Single L3 contract:** one L3 above the fold (hero primary = *Book a scan* → `/book-a-scan/`). Header CTA is always the same L3. Forbidden: "Book Strategy Call" as primary CTA. Min two proof sections before a second L3.

**Intent colors (§4):** every module card (`IntentRouter`), pain card (`PainGrid`), and results card shows ≥1 intent badge using tokens `--fx-time/money/order/calm/efficiency` (`text-fx-*`). No invented colors.

**Positioning:** Conversion Systems Architect. Reject portfolio-grid framing (`ui-ux-principles.md` §1).

### Step 3 — Enforce the anti-chaos rule

If `src/app/page.tsx` or home section order changed → **`docs/canon/site-map.md` §Home MUST be updated in the same session** (`AGENTS.md`, `README.md`). Verify the table reflects reality; update it if not.

### Step 4 — Report drift

## Output Format

```markdown
## Strategy Check — <page/component>

| Rule | Status | Note |
|------|--------|------|
| Home order (site-map §3 v3.0 LOCKED, 9 sections) | ✅ / ❌ | <deviation> |
| Page arc Problem→System→Effect | ✅ / ❌ | |
| Single L3 / header = L3 Book | ✅ / ❌ | |
| Intent badge on every card (§4) | ✅ / ❌ | |
| Positioning (Conversion Systems Architect) | ✅ / ❌ | |
| Anti-chaos: site-map.md updated w/ page.tsx | ✅ / ⚠️ N/A / ❌ | |

**Verdict:** COMPLIANT / DRIFT — <required corrections>
```

## Guardrails

- The canon wins over `brain.md` and ad-hoc notes when they disagree (`docs/architecture/authority-chain.md`).
- Never reorder or remove a home section without updating `site-map.md` §3 the same session.
- Don't delete a proof section that sits before a CTA (funnel job).
- Content lives in `src/content/*` — change copy there, not hardcoded in components.
