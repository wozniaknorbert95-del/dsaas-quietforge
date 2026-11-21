---
status: "[ACTIVE — paste into LinkedIn]"
title: "LinkedIn Profile Copy — Quietforge B2B"
owner: "Norbert Wozniak"
updated: "2026-06-30"
version: "3.0"
classification: "L3 — LinkedIn profile implementation"
profile_url: "https://www.linkedin.com/in/quietforge//"
---

# LinkedIn Profile Copy

Paste-ready copy for the live profile. **Use this file only** — do not use the OLD snapshots in `gtm/audits/assets/` (pre-v2.0, technical jargon).

Cross-check before paste: [rules.md](./rules.md) LI-R01, LI-R06, LI-R11 · [linkedin-audit-2026-06-29.md](../gtm/audits/linkedin-audit-2026-06-29.md).

---

## Implementation checklist

| # | LinkedIn field | Section below | Audit ID |
|---|----------------|---------------|----------|
| 1 | About | [About](#about) | L-B03 |
| 2 | Experience — Quietforge | [Experience: Quietforge](#experience-quietforge) | L-A06 |
| 3 | Experience — FlexGrafik | [Experience: FlexGrafik](#experience-flexgrafik) | L-A06 |
| 4 | Featured (4 slots) | See audit L-A01 — URLs in [gtm/02-channel-architecture.md](../gtm/02-channel-architecture.md) | L-A01 |
| 5 | Website / contact CTA | `https://quietforge.flexgrafik.nl/book-discovery/` | L-A05 |
| 6 | Services pricing | Automation Map €290 — not "Contact for pricing" | L-A03 |

---

## About

```text
I help ZZP and small businesses in the Netherlands turn manual lead handling into supervised conversion systems.

Most small businesses do not need "more AI".
They need fewer missed leads, faster quoting, less inbox chaos and a process they can actually control.

I design systems for:
- inbox triage and drafted replies with human approval
- guided quote flows and self-service onboarding
- websites that qualify visitors instead of only presenting information
- lead capture systems that hand over serious opportunities

Everything starts with an Automation Map: a paid 60–90 minute working session (€290, credited toward the build) where we identify the two or three biggest time-and-money leaks and decide what is worth building first.

My proof layer is FlexGrafik, my own Netherlands-based print and design business. I run the systems there before I deploy the same patterns for clients.

The principle is simple:
the system proposes, the human approves.

Book the Automation Map:
https://quietforge.flexgrafik.nl/book-discovery/
```

**Top skills (pin 3):** Conversion Systems Architecture · Process Automation · Workflow Automation

---

## Experience: Quietforge

**Title:** Conversion Systems Architect (Founder)  
**Company:** Quietforge · Self-employed  
**Dates:** May 2026 – Present · Rotterdam, South Holland, Netherlands · Remote

```text
I design and deploy supervised conversion systems for ZZP and small businesses in the Netherlands.

The work focuses on four common business leaks:
- manual quotes that create days of email ping-pong
- inbox chaos where leads, invoices and support requests sit in the same pile
- websites that get traffic but do not create qualified pipeline
- automation projects that move fast but remove too much control

Quietforge solves these problems with practical systems that qualify leads, reduce repeated admin and keep human approval on important actions.

Core systems I deliver:
- Inbox triage and drafted replies with mandatory human approval
- Guided quote flows and self-service onboarding
- Lead capture and qualification systems
- Website conversion upgrades with clear visitor paths
- Governance and approval layers so changes stay controlled
- Managed Automation for monitoring, tuning and support after launch (from €349/mo)

Every engagement starts with an Automation Map.

This is a paid 60–90 minute working session (€290, credited toward the build) where we identify the two or three biggest time-and-money leaks, score the likely ROI and decide the smallest useful system to build first.

The goal is not to automate everything.
The goal is to fix the right bottleneck first.

My principle:
the system proposes, the human approves.

I work best with Netherlands-based ZZP and small BVs that want fewer missed leads, less manual work and a controlled path from enquiry to next step.
```

**Skills:** Conversion Systems Architecture · Process Automation · Workflow Automation · AI-Assisted Development · Conversion Rate Optimization · Human-in-the-Loop Automation · Business Process Mapping · Lead Qualification

---

## Experience: FlexGrafik

**Title:** Founder  
**Company:** FLEXGRAFIK · Self-employed  
**Dates:** 2024 – Present · Rotterdam, South Holland, Netherlands · On-site

```text
Founder of FlexGrafik, a Netherlands-based print and design business that also serves as the live operating proof layer for Quietforge.

I use FlexGrafik as my self-as-client environment: before I offer a conversion system to clients, I run the pattern inside my own daily operations first.

Systems running or tested through FlexGrafik include:
- a guided quote and checkout flow for self-service ordering (167 SKUs, LIVE)
- inbox classification and drafted replies with human approval (142 messages/scan, LIVE)
- lead capture flows that move visitors toward qualified next steps
- approval gates before important sends, changes or deployments
- governance checks that reduce drift across the operating stack

This makes the Quietforge offer practical rather than theoretical.
The systems are not presented only in slides; they are built against the real mess of a small business: enquiries, files, quotes, customer questions, follow-ups and operational constraints.

FlexGrafik is not the primary offer on LinkedIn.
It is the proof layer showing that the systems I sell through Quietforge are first used in a real Netherlands business.
```

**Featured links (profile Featured section — not Experience body):**

| URL | Label |
|-----|-------|
| `https://quietforge.flexgrafik.nl/book-discovery/` | Book Automation Map — €290 |
| `https://quietforge.flexgrafik.nl/results/` | Live systems on FlexGrafik |
| `https://quietforge.flexgrafik.nl/how-it-works/` | How it works |
| `https://zzpackage.flexgrafik.nl/wizard/` | Wizard quote flow — LIVE proof only |

**Skills:** Business Operations · Graphic Design · Print Production · Digital Printing · Branding · Customer Workflow Design

---

## Proof metrics (verify before publish)

| Metric | Value | Source |
|--------|-------|--------|
| SKUs in wizard | 167 | `src/content/proof.ts` |
| Inbox messages per scan | 142 | `src/content/proof.ts` |
| Automation Map | €290, credited toward build | `src/content/pricing.ts` |
| Managed Automation | €349–€890/mo | `src/content/pricing.ts` |

Do not use "200+ SKUs" or "80% complete" — audit flagged as honesty drift.

---

*Established: 2026-06-29 · Consolidated from v2.0 profile drafts · v3.0: 2026-06-30*
