---
status: "[ACTIVE]"
title: "Knowledge Map — dsaas-quietforge"
owner: "Norbert Wozniak"
updated: "2026-06-29"
classification: "L1 — documentation entry point"
---

# Knowledge Map — quietforge.flexgrafik.nl

> **Start here.** Single entry point for agents, Commander, and investors browsing repo docs.

---

## Authority layers

```
L0  flexgrafik-meta/docs/core/     Ecosystem constitution (LOS, modules, AS-IS)
L1  docs/canons/vision-system.md  Portfolio + personal direction
L2  docs/canons/*-rules.md        Enforceable HARD rules (short)
L3  docs/strategy/*.md             Site IA / funnel / UX canon
L3  docs/strategy/gtm/             Outbound / LinkedIn / GTM pack
L4  brain.md + src/content/*.ts    Tech memory + live copy SSoT
L5  docs/operations/handoffs/      Session history (archive)
```

**Conflict rule:** higher layer wins. See [architecture/authority-chain.md](./architecture/authority-chain.md).

---

## Agent read order (mandatory, max 10 steps)

1. This file
2. [canons/vision-system.md](./canons/vision-system.md) — direction
3. [canons/strategy-rules.md](./canons/strategy-rules.md) — IA / funnel HARD rules
4. [canons/marketing-rules.md](./canons/marketing-rules.md) — copy / proof HARD rules
5. [strategy/site-map.md](./strategy/site-map.md) — home §2 LOCKED, 8-repo map
6. [strategy/conversion-pipeline.md](./strategy/conversion-pipeline.md) — CTA tiers
7. [strategy/marketing-strategy.md](./strategy/marketing-strategy.md) — positioning detail
8. [strategy/ui-ux-principles.md](./strategy/ui-ux-principles.md) — UI detail
9. [brain.md](../brain.md) — tech stack, deploy, guardrails
10. Latest handoff in [operations/handoffs/](./operations/handoffs/) + [SESSION-ANCHOR.md](./operations/SESSION-ANCHOR.md)

**Outbound / LinkedIn add:** [strategy/gtm/README.md](./strategy/gtm/README.md) → [gtm/audits/](./strategy/gtm/audits/linkedin-audit-2026-06-29.md) for live profile baseline  
**UI work add:** [DESIGN-SYSTEM.md](../DESIGN-SYSTEM.md) + [canons/ux-rules.md](./canons/ux-rules.md)  
**Proof work add:** [canons/proof-rules.md](./canons/proof-rules.md) + `src/content/proof.ts`  
**Ecosystem truth add:** [architecture/ecosystem-bridge.md](./architecture/ecosystem-bridge.md) + meta `as-is-inventory.md`

---

## Start here by persona

### Agent (implementation)

→ Read order above → check `git status` → [SESSION-ANCHOR.md](./operations/SESSION-ANCHOR.md) → execute one module (Zasada 1-1-1).

### Commander (Dowódca)

→ [canons/vision-system.md](./canons/vision-system.md) (HITL review) → [SESSION-ANCHOR.md](./operations/SESSION-ANCHOR.md) → approve or redirect.

**Marketing / outbound:** [strategy/gtm/README.md](./strategy/gtm/README.md) — dual-brand, LinkedIn, 90-day roadmap (not site IA).

### Investor / partner

→ Live site `quietforge.flexgrafik.nl` → `/results/owner-ecosystem/` → meta [`investor-vision-angel.md`](../../flexgrafik-meta/docs/core/investor-vision-angel.md) → [`living-system-architecture.md`](../../flexgrafik-meta/docs/core/living-system-architecture.md).

---

## Folder map

| Folder | Purpose |
|--------|---------|
| [canons/](./canons/) | Vision + extracted HARD rules |
| [strategy/](./strategy/) | Detailed strategy canon (L3) — site IA + [gtm/](./strategy/gtm/README.md) outbound pack |
| [audits/](./audits/) | Active site audits (<90 dni); closed → [archive/audits/](./archive/audits/) |
| [architecture/](./architecture/) | Bridges to meta + content SSoT |
| [operations/](./operations/) | Live session pointer — see [operations/README.md](./operations/README.md) (commander, runbooks, artefacts, plans, handoffs) |
| [archive/](./archive/) | Audits, plans, legacy — **do not load by default** |
| [governance/](./governance/) | Inventory, lifecycle policy |

---

## Do NOT read (unless debugging history)

- `docs/archive/legacy/` — Filar 2 wireframes, inspiracja pro, workspace snapshots
- `docs/archive/reference/COMMANDER_PLAN.md` — stale proof capture (jadzia spearhead)
- Individual handoffs older than latest 2 — use INDEX summary only

---

## Anti-chaos rules

1. `src/app/page.tsx` change → update `strategy/site-map.md` §2 same session
2. HARD rule change → update `docs/canons/*-rules.md` + relevant skill
3. Ecosystem truth change → sync meta first, then `src/content/*`, then site copy
4. Every session ends with handoff in `docs/operations/handoffs/`

---

## Upstream constitution

- [ecosystem-blueprint.md](../../flexgrafik-meta/docs/core/ecosystem-blueprint.md)
- [living-system-architecture.md](../../flexgrafik-meta/docs/core/living-system-architecture.md)
- [global-rules.md](../../flexgrafik-meta/docs/core/global-rules.md)

*Owner: Norbert Wozniak · Established: 2026-06-25*
