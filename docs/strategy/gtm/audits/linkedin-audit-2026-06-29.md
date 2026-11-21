---
status: "[ACTIVE]"
title: "LinkedIn Audit — flexgrafik-quietforge"
owner: "Norbert Wozniak"
auditor: "Agent (Chrome DevTools MCP)"
date: "2026-06-29"
profile_url: "https://www.linkedin.com/in/quietforge//"
method: "Live session — logged-in Chrome CDP, full-page scroll + Services admin view"
screenshots:
  - assets/linkedin-audit-2026-06-29-profile-full.png
  - assets/linkedin-audit-2026-06-29-contact.png
  - assets/linkedin-audit-2026-06-29-services.png
supersedes_partial: "docs/archive/audits/2026-06-23/03-linkedin-audit.md (v2 owner-paste)"
---

# LinkedIn Audit — Norbert Wozniak / Quietforge

**Profile:** [linkedin.com/in/flexgrafik-quietforge](https://www.linkedin.com/in/quietforge/)  
**Audit date:** 2026-06-29  
**Goal lens:** B2B Quietforge (Automation Map €290 → builds €1,200+) — investor track secondary

---

## Executive summary

| Dimension | Score | Verdict |
|-----------|-------|---------|
| Positioning (headline, about, banner) | **4.2 / 5** | Strong — Conversion Systems Architect + dual-brand clear |
| Visual brand | **4.5 / 5** | Banner is best-in-class (Quietforge + 8-repo diagram) |
| Profile completeness | **2.0 / 5** | Missing Featured, Experience, Skills, Education, Recommendations |
| Conversion path | **1.5 / 5** | No Featured links, no quietforge URL in posts, Services pricing hidden |
| Content vs strategy | **2.0 / 5** | Feed = founder/investor arc; zero Automation Map CTA |
| Proof honesty (site parity) | **2.5 / 5** | "80% complete", "200+ SKUs", investor asks vs honesty gate |
| Network / social proof | **1.5 / 5** | 16 connections, 17 followers, 0 reviews |
| **B2B outbound readiness** | **2.4 / 5** | Copy is ready; funnel infrastructure is not |

**One-line verdict:** Profil **wygląda jak architekt systemów** (banner + headline + About), ale **nie konwertuje** — brakuje Featured/CTA/cennika, feed mówi do inwestorów zamiast do NL SMB, a site (`quietforge.flexgrafik.nl`) nie jest podpięty ani w kodzie repo ani w postach.

---

## Analytics baseline (2026-06-29)

| Metric | Value | Notes |
|--------|-------|-------|
| Profile views (recent) | 10 | Low — early stage |
| Post impressions (7 days) | 531 | Driven by 4-post series (~863 total on series posts) |
| Search appearances (7 days) | 4 | SEO headroom |
| Connections | 16 | Below LinkedIn "reach" threshold (~50+) |
| Followers | 17 | |
| Profile language | **Nederlands** | Public posts = EN — OK for NL ICP if content stays EN |

---

## Section-by-section audit

### 1. Profile photo — PASS (4/5)

- Professional headshot, approachable, yellow background (distinctive).
- **Minor:** Yellow clashes slightly with Quietforge dark/amber banner — not blocking.

### 2. Banner / cover — EXCELLENT (5/5)

Observed live:

- **QUIETFORGE** branding: "AI GOVERNED BUSINESS SYSTEMS"
- Tagline: governance-first, HITL, single source of truth, 3 layers
- **8-module ecosystem diagram** (Governance / Products / AI-Execution)
- Footer: "FlexGrafik ecosystem · Builder · Operator · Architect · Dutch SMEs"

**Verdict:** Aligns with [vision-system.md](canons/vision-system.md) §2–§3 and site LOS narrative. **Keep.**

### 3. Headline — PASS (4/5)

**Current:**
> Conversion Systems Architect @ Quietforge | Delivering Automated Solutions

| Criterion | Status |
|-----------|--------|
| Primary label = Conversion Systems Architect | ✅ |
| Quietforge named | ✅ |
| ICP signal (NL SMB) | ⚠️ Missing — could add "Dutch ZZP & SME" |
| Anti-hype | ✅ No "AI-powered web developer" |

**Optional upgrade (not P0):**
> Conversion Systems Architect @ Quietforge | Lead qualification & automation for Dutch ZZP & SME

### 4. About — PASS with gaps (3.5/5)

**Quietforge paragraph (live):**
> At Quietforge, I serve as Conversion Systems Architect, deploying automation systems tailored for Dutch ZZP and SME owners. My work includes developing solutions such as inbox automation, self-service sales funnels, AI-driven web upgrades, and interactive lead-generation tools, all designed to streamline business processes with human oversight where necessary.

**FlexGrafik paragraph (live):**
> As the founder of FLEXGRAFIK, I built and operate a Netherlands-based digital ecosystem powered by multi-agent AI systems… process automation, multi-agent orchestration, and **prompt engineering**…

| Criterion | Status |
|-----------|--------|
| Dual-brand (Quietforge deploy / FlexGrafik proof) | ✅ |
| ICP = Dutch ZZP/SME | ✅ |
| Problem→System→Effect | ⚠️ Partial — feature list, weak effect lines |
| Matches marketing-strategy.md | ✅ Mostly |
| CTA at end | ❌ No "Book Automation Map €290" |
| MR-11 jargon | ⚠️ "prompt engineering" — weak for SMB |

**P1 fix:** Expand About (click "…more") with effect line + single CTA sentence + link `quietforge.flexgrafik.nl/book-discovery/`.

### 5. Featured — CRITICAL MISSING (0/5)

**Status:** Section **not present** on profile.

**Impact:** Highest-impact conversion surface absent. Visitors from posts have no pinned proof or booking link.

**P0 — add minimum 4 items:**

| # | URL | Label |
|---|-----|-------|
| 1 | `https://quietforge.flexgrafik.nl/` | Quietforge — conversion systems & case studies |
| 2 | `https://quietforge.flexgrafik.nl/book-discovery/` | Book Automation Map (€290) |
| 3 | `https://quietforge.flexgrafik.nl/results/owner-ecosystem/` | Owner ecosystem — live proof |
| 4 | `https://quietforge.flexgrafik.nl/results/sales-funnel/` | Wizard Cash Engine — live checkout |

### 6. Services — FAIL conversion (2/5)

**Public categories (profile card):** Custom Software Development, Print Design, Web Development, Content Strategy, Lead Generation, Mobile App Dev, Web Design, UX (UED)

**Services page (admin view, live 2026-06-29):**

| Field | Current | Canon target | Drift |
|-------|---------|--------------|-------|
| Setup wizard | **Page 1 of 3 — incomplete** | Complete | ❌ P0 |
| Overview opener | Strong FLEXGRAFIK proof + **"seeking investors and strategic partners"** | B2B-first; investor = separate | ⚠️ P1 |
| Pricing | **Contact for pricing** | Automation Map €290 + tiers | ❌ P0 |
| Reviews | **None** | 1–3 B2B reviews | ❌ P1 |
| Media / work samples | **Empty** ("Add up to 8 media") | Screenshots wizard, inbox, Agent OS | ❌ P0 |
| Response time | Not available | Set expectation | P2 |
| SKU claim | **200+ SKUs** | Site: **161 SKUs** ([proof.ts](../../src/content/proof.ts)) | ❌ P1 honesty |

**Overview excerpt (live):**
> Built FLEXGRAFIK… self-service sales configurator (200+ SKUs), inbox automation… Currently scaling the business and **seeking investors and strategic partners**.

**Verdict:** Copy quality high, but **Services page blocks B2B conversion** (no price, no media, incomplete setup) and **positions investor ask on primary service surface**.

### 7. Experience — MISSING (0/5)

**Status:** No Experience section visible.

**Impact:**
- LinkedIn All-Star / recruiter trust reduced
- FLEXGRAFIK live-ops story buried in About only
- No structured proof timeline (print ops + Quietforge consulting)

**P0 — add two roles minimum:**

1. **Quietforge** — Conversion Systems Architect (present) — bullet: Automation Map, inbox/funnel builds, HITL
2. **FLEXGRAFIK** — Founder (present) — bullet: wizard live checkout, print ops, 8-repo LOS in production

### 8. Skills — MISSING (0/5)

**Status:** No Skills section.

**P1 — add 10–15 skills, pin top 3:**
- Business Process Automation
- Lead Generation
- Systems Architecture

### 9. Education / Licenses / Recommendations — MISSING

Not present. **P2** for credibility; not blocking if Featured + Services fixed.

### 10. Contact & CTA

| Item | Status |
|------|--------|
| Vanity URL | ✅ `linkedin.com/in/flexgrafik-quietforge` |
| Location | ✅ Rotterdam, South Holland, Netherlands |
| Company link | ✅ Quietforge |
| Verified profile | ✅ |
| Website / custom button → quietforge | ❌ Not observed |
| Email in public contact | ❌ Not confirmed in audit overlay |
| Repo `LINKEDIN_URL` | ❌ Still `norbert-wozniak-172b76367` in [constants.ts](../../src/lib/constants.ts) |

**P0:** Profile contact → Website = `https://quietforge.flexgrafik.nl/book-discovery/` (or home).

### 11. Open to

- "Open to work" prompt visible — **review:** ensure not sending wrong signal (job seeker vs consultant). Prefer **Providing services** / **Finding clients** if available.

---

## Activity audit — all posts (live)

### Series 4/4 (published ~1 week ago)

| Post | Impressions | Reactions | Media | quietforge link | Primary CTA | Strategy fit |
|------|-------------|-----------|-------|-----------------|-------------|--------------|
| **POST 4/4** — funding / compute / partner | 216 | 2 | Video | ❌ | Investor + dev services | ❌ Investor-primary |
| **POST 3/4** — AI clicking / financial fast | 251 | 0 | Text | ❌ | None | ⚠️ Founder only |
| **POST 2/4** — birth of FLEXGRAFIK | 259 | 0 | Text | ❌ | None | ⚠️ Origin story |
| **POST 1/4** — Where it started | 137 | 3 | Video | ❌ | None | ⚠️ Origin story |

**Post 4 critical drift vs canon:**

- "FLEXGRAFIK is now **80% complete**" — conflicts with site honesty labels (LIVE/PARTIAL per module, not % complete)
- "I need **compute power / capital**" — valid for investor track, wrong for current B2B-primary strategy
- Hashtags: `#techstartup #indiehackers` — attracts founders/investors, not NL SMB buyers
- **No** link to Automation Map or quietforge

### Pre-series posts (still on profile)

| Post | Age | Impressions | Issue |
|------|-----|-------------|-------|
| FLEXGRAFIK video walkthrough + **#investorready** | ~1w | 146 | Investor CTA; "two months left"; no quietforge |
| Magnets product promo | ~1yr | 101 | Consumer product — wrong channel |
| flexgrafik.nl brand video | ~1yr | 44 | Consumer — belongs on FB/TikTok/GMB |
| Commercial wrapping project | ~1yr | 21 | Print portfolio — OK as proof but not B2B CTA |

**Content strategy verdict:** Feed history = **founder + investor + FlexGrafik consumer**. Zero posts with **Problem → System → Effect** + **Book Automation Map**. Confirms channel misalignment with stated priority A.

---

## Cross-audit: LinkedIn vs Quietforge site

| Claim / element | LinkedIn (live) | quietforge.flexgrafik.nl | Action |
|-----------------|-----------------|--------------------------|--------|
| Positioning | Conversion Systems Architect | ✅ Same | — |
| Automation Map €290 | ❌ Not on profile | ✅ Home, pricing, book-discovery | Fix Services + Featured |
| SKU count | 200+ (Services) | 161 (home, proof) | Sync to 161 |
| System completeness | "80%", "2 months left" | LIVE/PARTIAL/DEMO per module | Stop % claims; use status labels |
| Wizard proof video | Text + old FLEXGRAFIK video | BL-03: no Loom on site | Commander: 45s Loom both places |
| Inbox 142 msgs | Not in posts | ✅ Home metrics | Next post topic |
| Managed Automation price | Unknown on Services | €349–890/mo | Add to Services pricing |
| JSON-LD sameAs | flexgrafik-quietforge (should be) | norbert-wozniak slug in code | QF-L01 fix |
| Case studies depth | Narrative in posts | 7 CS routes — some thinner than LinkedIn claims | Parity session per repo |

---

## Priority remediation backlog

### P0 — blocks B2B conversion (this week)

| ID | Item | Owner |
|----|------|-------|
| L-A01 | Add **Featured** (4 quietforge links) | Commander |
| L-A02 | Services: **complete setup wizard** (3 pages) | Commander |
| L-A03 | Services pricing → **Automation Map from €290** + link `/pricing/` | Commander |
| L-A04 | Services **media**: 3–5 screenshots (wizard, inbox, governance) | Commander |
| L-A05 | Profile **website CTA** → `/book-discovery/` | Commander |
| L-A06 | Add **Experience** (Quietforge + FLEXGRAFIK) | Commander |
| QF-L01 | Update `LINKEDIN_URL` in constants.ts → flexgrafik-quietforge | Agent |

### P1 — trust + parity (week 2)

| ID | Item | Owner |
|----|------|-------|
| L-B01 | Services overview: remove investor lead; move to future investor post series | Commander |
| L-B02 | Fix SKU **200+ → 161** on Services | Commander |
| L-B03 | Expand About + CTA line | Commander |
| L-B04 | Add **Skills** (10+, pin 3) | Commander |
| L-B05 | **Comment under Post 4** — pivot: B2B Map primary, investor DM welcome | Commander |
| L-B06 | Pin best upcoming B2B post after W1 | Commander |
| L-B07 | Invite 1–2 clients for Services review | Commander |

### P2 — growth (week 3–4)

| ID | Item | Owner |
|----|------|-------|
| L-C01 | Archive or hide 1yr consumer posts from prominence | Commander |
| L-C02 | Headline ICP tweak (Dutch ZZP & SME) | Commander |
| L-C03 | Recommendations (1–3) | Commander |
| L-C04 | UTM on all LinkedIn links: `?utm_source=linkedin&utm_medium=organic` | Agent |
| BL-03 | Wizard Loom 45s on site + LinkedIn media | Commander |

---

## What is already strong (do not rewrite)

1. **Banner** — production-quality Quietforge + ecosystem diagram
2. **Headline** — correct primary identity
3. **About dual-brand** — matches [marketing-strategy.md](marketing-strategy.md) §11
4. **Vanity URL** — `flexgrafik-quietforge` encodes dual-brand intentionally
5. **Founder series** — authentic; keep as history, pivot **next** posts to B2B

---

## Recommended next post (immediate)

**Do not edit old posts.** Publish new:

> **Hook:** "Your inbox is not a CRM — but it behaves like one when leads sit next to invoices."
> **System:** Inbox Killer — classify, draft, human-approve before send.
> **Proof:** 142 messages/scan · LIVE in my print business.
> **CTA (comment):** Book Automation Map — €290, credited toward build. `quietforge.flexgrafik.nl/book-discovery/`

---

## Audit artifacts

Screenshots saved under `docs/strategy/gtm/audits/assets/`:

- `linkedin-audit-2026-06-29-profile-full.png` — top card + analytics + about
- `linkedin-audit-2026-06-29-contact.png` — contact overlay attempt
- `linkedin-audit-2026-06-29-services.png` — services URL 404 (use admin view instead)

**Services admin URL (owner only):** `linkedin.com/services/page/4a82bb337b60159261/admin/`

---

## Score comparison vs audit 2026-06-23 (v2)

| | v2 (owner paste) | v3 (live DevTools) |
|--|------------------|---------------------|
| Method | Text provided by owner | Live profile + activity scroll |
| Overall | 4.1/5 | **2.4/5 B2B readiness** |
| Why different | Scored copy quality only | Scored **full funnel** (Featured, posts, pricing, network) |

Copy quality remains ~4/5. **Conversion infrastructure** is what pulls score down.

---

*Next step: update GTM plan from `linkedin_quietforge_gtm` based on this report.*
