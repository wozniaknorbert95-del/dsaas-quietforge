# Evidence — Quote & Order Engine

Public slug: `/systems/quote-order-engine/`  
Status: `PROVEN IN THE LAB`  
Asset: `/systems/quote-order-engine-flow.svg` (clean). Lab original `/gratka/sales-funnel-journey.svg` still has the old “Conversion Systems Architect” footer — not used on the spoke.

| Feature (client) | Internal source | Client phrasing on page | Asset |
|------------------|-----------------|-------------------------|-------|
| Governed catalog | `src/content/sales-funnel-case-study.ts`, lab catalog | Impossible combos never appear | journey SVG |
| Nine guided screens | `proof.ts` `metrics.wizardSteps` = 9 | Customer finishes in one sitting | journey SVG |
| Open price before pay | sales-funnel case + journey SVG | Number you already approved | journey SVG |
| Mollie checkout | `src/lib/mollie.ts` | Paid or not paid | journey SVG |
| Uploads in the flow | sales-funnel case (9 screens) | File is on the order object | — |
| Exception gate | catalog rules / case | Queue: needs your number | — |
| Order handoff | cockpit mapping | One record instead of a thread | — |
| 167 catalog rows | `proof.ts` `metrics.skus` | Lab catalog size | — |

Composite: Van Dijk Installatie — *Illustrative composite example — not a real client*.  
Do not present zzpackage / Wizard as a QuietForge client.
