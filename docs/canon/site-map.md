---
status: ACTIVE
title: QuietForge site map v2.0
owner: Norbert Wozniak
updated: 2026-08-19
source: Desktop/aktualizacja quietforge/quietforge-mapa-strony-v2.md
---

# Site map v2 — QuietForge

**Language:** EN on the root (`<html lang="en">`). Polish stays in this canon, not on the site.  
**Host this sprint:** `https://quietforge.flexgrafik.nl` (Vercel). Own `.com` / `.nl` deferred.  
**NL locale (`/nl/`):** phase 3, only if data shows English fails for Dutch owners.

Supersedes [`docs/strategy/site-map.md`](../strategy/site-map.md) for public IA. Keep that file as historical L3 until S1–S3 land; new work follows **this** file.

## Information architecture

```
quietforge.flexgrafik.nl
├── /                            Home
├── /systems                     Hub + ?intent=time|money|calm|team|order
│   ├── /systems/quote-order-engine
│   ├── /systems/inbox-triage
│   ├── /systems/lead-scout
│   ├── /systems/owner-cockpit
│   ├── /systems/publishing-gate
│   └── /systems/build-release-flow
├── /approach
├── /security
├── /proof
│   ├── /proof/methodology
│   └── /proof/cases/[slug]
├── /about                       + #lab (FlexGrafik paused)
├── /pricing
├── /book-a-scan
│   └── /book-a-scan/thank-you   noindex
├── /toolbox                     reserved — do not build, do not link
├── /privacy  /terms  /dpa  /colophon
└── /404
```

Artefact URLs (`/artefacts/…`) stay stable.

## Global chrome

| Element | Spec |
|---------|------|
| Header | Systems · Approach · Security · Proof · Pricing · primary **Book a scan** |
| CTA | PRIMARY: Book the Automation Scan — €690 · SECONDARY: WhatsApp · TERTIARY: See the systems |
| Footer | Promise: “Systems that give you back your time.” · no FlexGrafik live-proof link · “this site runs on its own integrated platform” |
| Counter | Home + /proof · start **0** · never hardcoded growth |
| Language | English ✓ / Nederlands (later) |

## Claim rules (R7)

- Zero FlexGrafik market claims. Lab only on `/about#lab`: paused, systems still running as heritage — not a client proof.
- Numbers: lab example labelled “example”, or verified case. Typical hours always with “typically”.
- Counter grows only after client verification.
- **Censors:** vibe coding, post-coding, DSAAS, agents-as-product, “we can build anything”.
- **Allowed:** managed systems, engineering discipline, human approval, one integrated platform.

## Status vocabulary

`LIVE AT CLIENT` · `PROVEN IN THE LAB` · `NEW ON THE PLATFORM` · `SCAN SCHEDULED` · `OPEN — BECOME A CASE` · `LAB: PAUSED`

Until a client verifies a case, public statuses stay lab / new / open — never fake LIVE AT CLIENT.

## 301 map (this host)

| Old | New |
|-----|-----|
| `/results/` | `/proof/` |
| `/results/sales-funnel/` | `/systems/quote-order-engine/` |
| `/results/lead-magnet/` | `/systems/lead-scout/` |
| `/results/jadzia-coi/` | `/systems/owner-cockpit/` |
| `/results/agent-orchestrator/` | `/systems/build-release-flow/` |
| `/results/owner-ecosystem/` | `/about/#lab` |
| `/solutions/` | `/systems/` |
| `/solutions/sales-funnel/` | `/systems/quote-order-engine/` |
| `/solutions/inbox-killer/` | `/systems/inbox-triage/` |
| `/solutions/lead-magnet-game/` | `/systems/lead-scout/` |
| `/solutions/web-upgrade/` | `/systems/` |
| `/book-discovery/` | `/book-a-scan/` |
| `/trust/` | `/security/` |
| `/how-it-works/` | `/approach/` |
| `/artefacts/*.pdf` | unchanged |

## Sprints

| Sprint | Scope |
|--------|--------|
| **S1 (this session)** | Home + `/systems` + 6 spokes + 301 + Header/Footer/CTA |
| S2 | `/approach` `/security` `/about` `/pricing` + counter at 0 |
| S3 | `/book-a-scan` (full RODO form) + legal EN + sitemap/robots polish |

S1 creates **thin but honest** S2/S3 destinations so 301s do not 404. Full design of those pages is S2/S3.

## Home (S1)

1. Hero — H1: **Systems that give you back your time.** Eyebrow: Business operating systems for SMBs · EU
2. Counter at 0 + methodology honesty
3. Intent router (Time · Money · Calm · Team · Order)
4. Six system cards
5. Approach short (5 steps)
6. Comparison Agency / Freelancer / QuietForge
7. Engineering discipline tiles → `/security`
8. Proof slots (open)
9. About short
10. Pricing short
11. FAQ
12. CTA band

## Spoke template

Problem (3) · How it works (4) · What you get · ROI example labelled example · Good to know · Works well with · CTA

## Out of scope this sprint

`/toolbox` · `/nl/` · own domain · platform JSON counter endpoint · production deploy
