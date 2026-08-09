---
status: "[ACTIVE]"
title: "Marketing Rules — Enforceable Copy & Proof"
owner: "Norbert Wozniak"
updated: "2026-08-09"
classification: "L2 — HARD rules (binding)"
---

# Marketing Rules

> **Core question (immutable):** *"Can this person design and deploy a system that improves my business?"*  
> **Detail:** [marketing-strategy.md](../strategy/marketing-strategy.md)

## Agent duty

Copy sessions load this file first. If copy reads like a feature list → fail review.

---

## Positioning

**MR-01 (HARD)** — Primary label: **Conversion Systems Architect**. Forbidden as primary: Web designer, AI builder, chatbot guy, freelancer, agency.  
*Violation:* Hero H1 "AI-powered web developer".  
*Source:* marketing-strategy §2

**MR-02 (HARD)** — Supporting descriptor (one only): *Lead qualification & automation systems* — subheads/SEO only, not competing hero.  
*Source:* marketing-strategy §2

**MR-03 (HARD)** — Anti-positioning must appear on hero and `/founder/`: not web designer, not chatbot builder.  
*Source:* marketing-strategy §2

**MR-04 (HARD)** — Hero H1: no "AI-powered" headline (AI fatigue). AI = system component in sub-line.  
*Source:* marketing-strategy §2

---

## Page structure

**MR-05 (HARD)** — Every money page arc: **Problem → System → Effect**. Never Feature → Feature → Feature.  
*Violation:* Bullet list of tech stack without problem framing.  
*Source:* marketing-strategy §1, site-map §1

**MR-06 (HARD)** — One psychological goal per section (PAS framework). No feature dumps.  
*Source:* marketing-strategy, brain do's

**MR-07 (HARD)** — Pain points use hard data where possible ("12h/week", "€800–1,500/mo") — no vague "save time".  
*Source:* marketing-strategy §4

---

## ICP & objections

**MR-08 (HARD)** — ICP: NL ZZP/small BV, professional services, English-friendly, budget signal Automation Map €290+ / projects €1,200+.  
*Not for:* Enterprise procurement, design-only, sub-€199 impulse.  
*Source:* marketing-strategy §3

**MR-09 (HARD)** — Four named objections must be addressable on home (`TrustAndObjections`) — do not remove without replacement.  
*Source:* site-map §2 #12, conversion-copy.ts

**MR-10 (HARD)** — Exception handling copy: brochure-only clients told "not the right fit" before spend.  
*Source:* marketing-strategy §2

---

## Language & jargon

**MR-11 (HARD)** — Public B2B assets: English. No LangGraph, MCP, LLM pipeline in SMB-facing sections.  
*Violation:* Hero mentioning "LangGraph orchestration".  
*Source:* brain don'ts, vision-system §7

**MR-12 (HARD)** — Zero enterprise portfolio track content on quietforge (Track 3 separation).  
*Source:* vision-system §2

---

## Proof & honesty

**MR-13 (HARD)** — Proof tier labels only: **PROVEN / DEMO / PLANNED** (from `proof.ts`). No invented fourth tier.  
*Source:* proof.ts, proof-rules

**MR-14 (HARD)** — Agents never invent MRR, order counts, lead counts, uptime %, or conversion rates.  
*Source:* meta traction-honesty-framework §1

**MR-15 (HARD)** — Tech traction may be stated with AS-IS %; commercial traction = Commander-only until §2.2 filled.  
*Source:* traction-honesty §2

---

## Forbidden claims (portfolio)

**MR-16 (HARD)** — Do NOT claim without evidence:

| Forbidden | Truth |
|-----------|-------|
| "Inbox Killer is jadzia-core spearhead" | Wizard = spearhead; jadzia = COI backend |
| "Portal chat qualifies leads" | AS-IS = generic sales chat (`customer_agent`) |
| "Orders fully automated in jadzia" | order_node / WC webhook = PLANNED unless LIVE in meta |
| "9-step wizard = 7 business stages" without footnote | Unify with footnote in hero terminal |
| Fake "99.9% uptime" | No uptime claims without monitoring evidence |
| "Full autonomous COI" | HITL always; Jadzia ~partial COI vision |
| "5 systems live" without definition | Use `productionTouching` + readiness table |
| Stock photo proof | Screenshots / real artefacts only |

*Source:* portfolio truth-sync 2026-06-25, verification-audit GAPs

**MR-17 (HARD)** — Case studies: Before/After metrics required; Gratka/demo labelled DEMO not PROVEN unless measurement sourced.  
*Source:* marketing-strategy §5, proof-check skill

**MR-18 (SOFT)** — Risk reversal on every major CTA path (guarantee, no lock-in, Zasada 11 continuity).  
*Source:* marketing-strategy §6

---

## Agent Governance & Capability Layer

**MR-19 (HARD)** — Multi-client Brand-Voice Partitioning: Brand voice and copy-generation for each dSaaS tenant must strictly adhere to their respective profiles in `/dsaas-growth-os/clients/`. No mixing of Quietforge’s "Cwany Cheater" style with Flexgrafik’s "Premium Strategy-Led" authority.
*Source:* dSaaS Alignment 2026-08-09

**MR-20 (HARD)** — Capability Layer Verification: Any autonomous proposals published via the Growth OS must explicitly map to one of the 7 core capabilities (Discovery, Demand, Trust, Conversion, Retention, Knowledge, Optimization) with traceable evidence references.
*Source:* dSaaS System Design 2026-08-09

**MR-21 (HARD)** — Truth-Style Separation: Generated content cannot synthesize claims about performance or client results. All performance metrics must be drawn from either the respective client's `patchers.ttl` or verified actual metrics in `ledger.json`.
*Source:* dSaaS Integrity 2026-08-09

---

*21 rules · Commercial metrics: Commander fills traction-honesty §2.2 before investor/LinkedIn publish*
