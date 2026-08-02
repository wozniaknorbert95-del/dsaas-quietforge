---
status: "[ACTIVE]"
title: "2026-07 GTM Claim Lock — LinkedIn / Facebook ↔ Quietforge"
owner: "Norbert Wozniak"
updated: "2026-08-02"
classification: "L4 — outbound ↔ site LI-R10 gate"
---

# 2026-07 GTM Claim Lock

> After site sync (P1–P7). Use before publishing or scaling INSPIRE / Module Series posts.

## LI-R10 checklist (post → landing)

| Outbound promise | Required landing | Status after sync |
|------------------|------------------|-------------------|
| Complex quote / Design Intake / INSPIRE | Primary land: `/results/?utm_…#design-intake`. Secondary deep story: `/solutions/sales-funnel/#inspire` (Flow + Limitations). Map: `/book-discovery/`. **Not** Wizard case study as Complex Quote secondary. | **SAFE TO PUBLISH** — utm before hash; see `2026-08-02-inspire-link-ux-audit.md` |
| Wizard Cash Engine / quote→checkout | `/solutions/sales-funnel/` · `/results/sales-funnel/` | SAFE |
| Automation Map €290 | `/book-discovery/` · `/pricing/` | SAFE |
| Operations Command / Jadzia ops | `/results/jadzia-coi/` · owner-ecosystem | SAFE (no autonomy claims) |
| Inbox Killer | `/solutions/inbox-killer/` | SAFE (test-environment metric wording) |
| Featured V2 strip | Home FeaturedStrip ↔ `/pricing/` ranges | SAFE if Featured URLs match Map / Results / How it works |

## Safe to publish (post-deploy)

1. INSPIRE build-in-public carousels that land on `/results/?…#design-intake` (primary) or `/solutions/sales-funnel/#inspire` (deep story)  

2. Module Series posts that match live solution pages  
3. Map €290 CTAs → `/book-discovery/`  

## Blocked until further HITL

1. Marketing OS as Quietforge agency / ads management offer  
2. Gate D / paid-order revenue traction claims  
3. “Portal qualification agent live” E2E  
4. INSPIRE as polished autonomous sales consultant (persona GO pending)  
5. Conversion uplift % from Design Intake  

## Facebook (FlexGrafik consumer)

- Wizard / print / ZZP branding funnel only  
- **No** Quietforge Automation Map bleed  
- Content themes stay in `docs/strategy/facebook/`  

## Featured V2 alignment

| Featured slot intent | Site mirror |
|----------------------|-------------|
| Automation Map | `/book-discovery/` · €290 |
| Live systems | `/results/` |
| How it works | `/how-it-works/` |
| Pricing clarity | `/pricing/` |

## Commander actions

- [ ] Paste LinkedIn Featured URLs after deploy  
- [ ] Paste profile copy if still open  
- [ ] Facebook profile remains FlexGrafik-only  

*Pointer: update SESSION-ANCHOR when deploy smoke passes.*
