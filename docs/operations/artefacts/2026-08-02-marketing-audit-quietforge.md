---
status: "[ACTIVE]"
title: "2026-08-02 Marketing Audit — Quietforge × FlexGrafik GTM"
owner: "Norbert Wozniak"
updated: "2026-08-02"
classification: "L4 — marketing audit + automation backlog"
method: "Prod browser smoke + GA4 MCP + canon cross-check vs 2026-06-29 LinkedIn audit"
---

# Marketing Audit — quietforge.flexgrafik.nl

## Executive scorecard

| Severity | Count | Top items |
|----------|------:|-----------|
| **P0** | 4 | LinkedIn Featured/Services still open; **0 LI sessions** in GA4 30d; feed history without Map CTA; attribution blind |
| **P1** | 5 | FB bio v2.0 not pasted; FB EN/PL languages; LI re-audit blocked (authwall); Map funnel volume tiny (n=3) |
| **P2** | 3 | Shorts/TikTok repurpose spec only; Sortlist/Clutch deferred; competitive benchmarks qualitative |

**One-line verdict:** Product + site **ready**. Marketing bottleneck = **B2B distribution infrastructure on LinkedIn**, not positioning rewrite. FlexGrafik FB = separate consumer track (14 followers, pre-v2 drift).

**Revenue priority (recommended):** **Track A — Quietforge B2B first** ([01-two-brand-model](../../strategy/gtm/01-two-brand-model.md)). FlexGrafik = proof + cashflow, not equal marketing split.

---

## 1. Site funnel audit (prod 2026-08-02)

| Surface | L1 Explore | L2 Demo | L3 Map | Verdict |
|---------|------------|---------|--------|---------|
| `/` home | See live systems | — | Header + hero Book Map €290 | **PASS** |
| `/results/#design-intake` | — | Open Design Intake (EXTERNAL) | Book Map | **PASS** (3-tile evidence post Phase 2) |
| `/solutions/sales-funnel/#inspire` | See live proof (layout) | Design Intake | Book Map | **PASS** |
| `/book-discovery/` | See live systems, sample PDF | — | Form + WhatsApp €290 path | **PASS** |
| Header global | Systems & Results | — | Book Automation Map | **PASS** |

**P1 note (known):** Book Discovery = enquiry form + WhatsApp, not instant Calendly pay — copy matches live page (roadmap P0 drift closed in UX, not payment gateway).

**Conversion pipeline alignment:** Matches [conversion-pipeline.md](../../strategy/conversion-pipeline.md) v3.0 — one primary CTA per viewport section.

---

## 2. LinkedIn audit (re-check 2026-08-02)

| Check | Baseline 2026-06-29 | Today | Status |
|-------|---------------------|-------|--------|
| Positioning copy | 4.2/5 | Not re-scraped (authwall) | **Assume unchanged — strong** |
| B2B readiness | 2.4/5 | Featured/Services not verifiable logged-out | **Likely still FAIL — P0** |
| Posts with quietforge CTA | 0/9 | Unknown without login | **Open** |
| Connections | 16 | Unknown | **Open** |
| INSPIRE landing | N/A | `#design-intake` + 3-screen proof LIVE | **PASS** |

**P0 backlog (unchanged from [linkedin-audit-2026-06-29](../../strategy/gtm/audits/linkedin-audit-2026-06-29.md)):** Featured V2 · Services pricing · Experience · website CTA → `/book-discovery/`.

**Deliverable:** [linkedin-featured-v2-paste.md](../runbooks/linkedin-featured-v2-paste.md)

---

## 3. Facebook FlexGrafik (prod 2026-08-02)

| Metric | Baseline 2026-07-01 | Live 2026-08-02 | Verdict |
|--------|---------------------|-----------------|---------|
| Followers | 14 | **14** | Stagnant |
| Reviews | 0 | **0** | — |
| Bio v2.0 NL | Not pasted | **Not verified** (page admin view) | **P1 — paste pending** |
| Languages | EN pre-rebrand | **English + Polish** visible | **P1 — set Nederlands only** |
| Category | — | Usługi poligraficzne | OK (print) |
| Recent content | May 2025 | Reel + wizard UTM link | Consumer track OK |
| Quietforge bleed | Rule: none | No Map CTA observed | **PASS** |

**Deliverable:** [facebook-launch-v2-commander.md](../runbooks/facebook-launch-v2-commander.md) + [profile-copy.md](../../strategy/facebook/profile-copy.md)

---

## 4. GA4 attribution baseline (Quietforge `543331587` · G-LY0E7MW0HF)

**Period:** last 30 days (GA4 MCP, 2026-08-02)

### Sessions by source

| Source / Medium | Sessions | Active users |
|-----------------|----------|--------------|
| (direct) / (none) | 36 | 20 |
| facebook.com / referral | 10 | 9 |
| m.facebook.com / referral | 10 | 10 |
| l.facebook.com / referral | 4 | 4 |
| lm.facebook.com / referral | 2 | 2 |
| **linkedin** | **0** | **0** |

**Insight:** Traffic is direct + Facebook referral (likely FlexGrafik page / personal profile). **LinkedIn organic not yet measurable** — confirms distribution gap, not site gap.

### Map funnel (canon steps, 30d)

| Step | Users |
|------|------:|
| `book_discovery_view` | 3 |
| `cta_book_map_click` | 0 (in funnel API window) |
| `intake_submit` | 0 |

**Insight:** Volume too low for optimization; priority = **drive qualified LI traffic** before A/B tests.

**Deliverable:** [ga4-weekly-attribution-rhythm.md](../runbooks/ga4-weekly-attribution-rhythm.md) · `npm run ga4:weekly`

---

## 5. Channel matrix (where to promote)

| Tier | Channel | Brand | Primary CTA | Automate? |
|------|---------|-------|-------------|-----------|
| **1** | LinkedIn profile + feed | Quietforge | Map €290 | Draft + schedule + first comment template |
| **1** | quietforge.flexgrafik.nl | Quietforge | Map | CD (done) |
| **1** | LinkedIn comments/DM | Quietforge | Map after qualify | Jadzia draft + HITL |
| **2** | Facebook Page | FlexGrafik | Wizard | Meta Suite schedule |
| **2** | Google Business | FlexGrafik | Call / site | Manual updates |
| **2** | YT Shorts / TikTok | FlexGrafik | Wizard bio | Repurpose pipeline |
| **3** | Sortlist / Clutch | Quietforge | Map | After 1 Map client |
| **—** | Marktplaats | — | **NIE** | — |
| **—** | TikTok B2B Map | — | **NIE** per canon | — |

### LinkedIn groups (B2B)

Lurk → comment with value → no pitch. Agent: weekly digest + 3 draft comments (HITL).

Suggested search (NL, active): *Ondernemers Nederland*, *ZZP Nederland*, *MKB*, *automatisering* (verify activity before joining).

### Facebook groups (FlexGrafik only)

ZZP / schilders / aannemers / bouw — 90% value, wizard soft CTA. **Never** Automation Map.

---

## 6. Objection playbook (P2 — 25% feed)

| # | Objection | Hook | Proof | Draft slot |
|---|-----------|------|-------|------------|
| O1 | "Another chatbot / website agency" | Anti-positioning | `/solutions/`, home | P2 text |
| O2 | "AI will send something stupid" | HITL gate | Inbox Killer, Agent OS | P1 screenshot |
| O3 | "€290 is expensive for a call" | Filter + credited doc | `/book-discovery/`, sample PDF | P2+P4 |
| O4 | "Where is the proof?" | Self-as-client | `/results/#design-intake` | P1 carousel |
| L1 | Manual quotes | Wizard + INSPIRE 48h | LI-R10 pack | M0-B |
| L2 | Inbox chaos | 142 msgs scan | Inbox Killer | Leak W2 |
| L3 | Weak capture | Game → wizard | app.flexgrafik.nl | M0-F |
| L4 | No control | VCMS + logs | `/trust/` | M0-E |

**Automation:** rotate from [linkedin/calendar.md](../../strategy/linkedin/calendar.md) + objection bank in publish pipeline runbook.

---

## 7. Automation backlog (agent-first)

| ID | Module | Priority | Owner |
|----|--------|----------|-------|
| A1 | LI Publish Pipeline v1 | P0 | Agent ✅ runbook |
| A2 | INSPIRE LI-R10 publish pack (updated) | P0 | Commander paste |
| A3 | Featured V2 paste checklist | P0 | Commander |
| A4 | FB Launch v2 paste + Post #1 | P1 | Commander |
| A5 | GA4 weekly JSON artefact | P1 | Agent ✅ script |
| A6 | Shorts repurpose spec | P2 | Agent ✅ spec |
| A7 | Group intel weekly brief | P2 | Jadzia shadow |

**Never automate:** mass FB group spam · LI auto-DM · investor posts on B2B feed.

---

## 8. Competitive sanity (qualitative)

Archetypes to **differentiate from**, not copy:

1. **Generic WordPress agency** — sells pages, no ops proof → you: live systems + Map filter
2. **AI chatbot reseller** — black box → you: HITL + named modules
3. **Zapier freelancer** — tool stack → you: conversion systems architect
4. **Big-4 style consultancy** — slow, expensive → you: €290 Map + 2-week deploy claim (honest scope)
5. **Print shop only** — consumer → FlexGrafik channel only, not LI B2B

**Moat:** dogfooding on FlexGrafik — cannot be faked without running a business.

---

## 9. 90-day success metrics

| Metric | Baseline | 90d target |
|--------|----------|------------|
| LI sessions (GA4) | 0 / 30d | ≥20 |
| Map attributed to LI | 0 | ≥1 |
| Connections ICP | 16 | 80+ |
| Posts with Map CTA comment | 0/9 hist. | 100% new posts |
| FB followers | 14 | 50+ (consumer) |
| Investor posts on B2B feed | historical | **0** |

**Roadmap sync:** [06-roadmap-90-days.md](../../strategy/gtm/06-roadmap-90-days.md)

---

## 10. Recommended execution order

1. **Commander 15 min:** LinkedIn Featured V2 paste
2. **Commander 20 min:** Publish INSPIRE carousel v3 ([publish pack](../../strategy/linkedin/drafts/2026-08-02-inspire-li-r10-publish-pack.md))
3. **Agent/cron:** `npm run ga4:weekly` every Monday
4. **Commander 30 min:** FB profile v2.0 + Post #1 pin
5. **Ongoing:** 2 LI posts/week via publish pipeline · FB 1–2/week consumer

---

*Next review: after first LI-attributed Map booking or 2026-09-02.*
