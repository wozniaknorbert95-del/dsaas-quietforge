---
status: ACTIVE
title: QuietForge site map v2.0
owner: Norbert Wozniak
updated: 2026-09-05
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
│   ├── /systems/build-release-flow
│   ├── /systems/company-brain            NEW (etap 4, flagship)
│   ├── /systems/ai-security-audit        NEW (etap 4, pioneer)
│   └── /systems/custom-ai-agent          NEW (etap 4)
├── /approach
├── /security
├── /proof
│   ├── /proof/methodology
│   └── /proof/cases/[slug]
├── /lab                         Builder's Lab / owner-operated reference
├── /about                       Founder story + #lab bridge
├── /pricing
├── /book-a-scan
│   └── /book-a-scan/thank-you   noindex
├── /blog (+/blog/[slug])        LIVE (etap 4: 6 posts, kategorie, schema Article)
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
| Footer | Promise: “Systems that give you back your time.” · Builder's Lab reference link · “this site runs on its own integrated platform” |
| Counter | Home + /proof · start **0** · never hardcoded growth |
| Language | English ✓ / Nederlands (later) |

## Claim rules (R7)

- FlexGrafik may be shown as an owner-operated reference business and live build laboratory. It is not an external client case, does not create client-result claims and does not replace verified customer proof.
- Numbers: lab example labelled “example”, or verified case. Typical hours always with “typically”.
- Counter grows only after client verification.
- **Censors:** vibe coding, post-coding, DSAAS, agents-as-product, “we can build anything”.
- **Allowed:** managed systems, engineering discipline, human approval, one integrated platform.

## Status vocabulary

`LIVE AT CLIENT` · `PROVEN IN THE LAB` · `NEW ON THE PLATFORM` · `OWNER-OPERATED REFERENCE` · `SCAN SCHEDULED` · `OPEN — BECOME A CASE` · `LAB: PAUSED`

Until a client verifies a case, public statuses stay lab / new / open — never fake LIVE AT CLIENT.
`LAB: PAUSED` applies only to a historical laboratory that is no longer publicly active; it is not the status of the FlexGrafik business.

## 301 map (this host)

| Old | New |
|-----|-----|
| `/results/` | `/proof/` |
| `/results/sales-funnel/` | `/systems/quote-order-engine/` |
| `/results/lead-magnet/` | `/systems/lead-scout/` |
| `/results/jadzia-coi/` | `/systems/owner-cockpit/` |
| `/results/agent-orchestrator/` | `/systems/build-release-flow/` |
| `/results/owner-ecosystem/` | `/lab/` |
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

> **Etap 4 (2026-08-24):** section ORDER unchanged (SR-01). Copy refreshed: hero lead = self-improving systems + proof chip; Proof = „five doors” reference program (link /proof#reference); Prices = build/care variants (ESSENTIAL/SYSTEM*/AUTONOMOUS · CARE/GROW*/AUTONOMY); FAQ +2 (guarantee, reference program); Fit +1 row (who checks security); Approach +1 line (choose the depth).

1. Hero — H1: **Systems that give you back your time.** Eyebrow: Conversion systems architect for small businesses · EU. Anti-position under subline.
2. Counter at 0 + methodology honesty
3. Intent router (Time · Money · Calm · Team · Order)
4. Six system cards
5. Approach short (5 steps) — “two to four weeks”
6. Comparison Agency / Freelancer / QuietForge
7. Engineering discipline tiles → `/security`
8. Proof slots (open)
9. About short
10. Pricing short
11. FAQ
12. CTA band

## Spoke template (B1–B10)

TL;DR (what / typically gives back / replaces) · Cost of inaction (labelled facts + €40/h) · Composite example company · Feature gallery (6–10, repo-backed) · Flow diagram · How it works (4) · What you get · ROI (same math) · FAQ including when NOT · Works well with · CTA (scan + WhatsApp)

Status on Wizard/inbox/lead/cockpit: `PROVEN IN THE LAB`. Publishing gate + build-release: `NEW ON THE PLATFORM`. Never `LIVE AT CLIENT` until verified.

## Out of scope this sprint

`/toolbox` · `/nl/` · own domain · platform JSON counter endpoint · production deploy
