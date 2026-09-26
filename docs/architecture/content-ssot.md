---
status: "[ACTIVE]"
title: "Content SSoT Map"
owner: "Norbert Wozniak"
updated: "2026-06-25"
classification: "Architecture — src/content ownership"
---

# Content SSoT Map

**Rule:** Live UI copy and structure read from `src/content/*.ts` — not from docs. Docs point here.

---

## File ownership

| File | Owns | Binding doc |
|------|------|-------------|
| `ecosystem.ts` | Modules, ECOSYSTEM_REPOS, intents, HOME_SECTIONS, screen keys | site-map §2–§4 |
| `conversion-copy.ts` | Hero, objections, CTAs, footer, anti-positioning | marketing-strategy |
| `scan.ts` | Offer A SKUs (Hours / Both-lanes / Decision), labels, tools | oferty-v1 v1.1, QF-SCAN-ENGINE-RESEARCH |
| `proof.ts` | Metrics, screens, videos, pricing, case measurements | proof-rules |
| `readiness.ts` | Built vs Planned 8-row table | meta as-is-inventory |
| `los-copy.ts` | LOS teaser layers on home | living-system-architecture |
| `owner-ecosystem.ts` | Flow steps, disclaimers on architecture page | ecosystem-bridge |
| `metrics-display.ts` | Home metrics presentation + footnotes | proof.ts |
| `los-architecture.ts` | LOS layer IDs for badges | site-map §3 |
| `jadzia-coi.ts` | Jadzia COI case study content | module-jadzia-core |
| `*-case-study.ts` | Per-route CS + solutions ladder exports | site-map §5 |
| `web-upgrade-case-study.ts` | Web Upgrade solutions + fit exception | marketing-strategy §2 |
| `whatsapp-discovery-pilot-case-study.ts` | WhatsApp pilot custom page | conversion-pipeline §3 |
| `managed-automation-case-study.ts` | MRR solutions + FAQ | site-map §5 |
| `module-showcase.ts` | Intent router showcase data | ecosystem.ts |
| `navigation.ts` | Header nav, footer, solutions dropdown | site-map §6, conversion-pipeline §3 |

---

## Hierarchy (replaces site-map §7 legacy)

```
docs/canons/vision-system.md
    ↓
docs/canons/*-rules.md
    ↓
docs/strategy/site-map.md
    ↓
src/content/*.ts
    ↓
src/components + src/app
```

---

## Edit checklist

1. Confirm change allowed by relevant `*-rules.md`
2. Edit `src/content/*.ts`
3. If home order changes → `page.tsx` + site-map §2
4. If repo status changes → readiness.ts + meta sync
5. `npm run build` + proof-check if metrics/claims touched

---

*Visual tokens: `globals.css` + DESIGN-SYSTEM.md (not content/*.ts)*
