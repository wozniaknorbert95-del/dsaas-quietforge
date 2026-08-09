# Site Map — quietforge.flexgrafik.nl

**Version:** 2.0  
**Status:** Canonical — post-audit IA, home layout, routes, CTA hierarchy  
**Supersedes:** Site Map v1.0 home order and route exposure rules  
**Audit reference:** [`docs/audits/2026-06-25/quietforge-ux-ia.md`](../audits/2026-06-25/quietforge-ux-ia.md) · 2026-06-25

> Core decision the site must answer: **“Can this person design and deploy a system that improves my business?”**  
> Home must now lead with buyer pain and proof before deep architecture.

---

## §1 Site goal

Quietforge is a **Conversion Systems Architect** for NL small businesses and professional services.

The site does not sell isolated websites, chatbots, scripts or design work. It sells supervised conversion and operations systems that:

1. qualify leads,
2. reduce admin,
3. create a repeatable client-acquisition flow,
4. keep the human in control.

**Canonical page arc:**

```text
Problem → Working system → Proof → Safety → Price → Next step
```

Never ship a page that reads as:

```text
Feature → Feature → Feature → Contact me
```

---

## §2 Primary navigation

### Header — maximum 5 items + 1 CTA

| Label | Route | Funnel role |
|---|---|---|
| Systems & Results | `/results/` | Proof hub; shows what is already running |
| Solutions | dropdown | Problem/offer selection |
| How It Works | `/how-it-works/` | Process trust |
| Pricing | `/pricing/` | Commercial clarity |
| Founder’s System | `/founder/` | Founder credibility + interactive LOS diagram (`#system-diagram`) |
| **Book Automation Map** | `/book-discovery/` | L3 conversion |

### Solutions dropdown

> **2026-07-19:** Buyer ladder — Quote & close (Wizard spearhead) first; Inbox is operate, not “Start here”.

| Label | Route | Badge | Price display |
|---|---|---|---|
| Sales Funnel / Wizard Cash Engine | `/solutions/sales-funnel/` | Spearhead | €2,400–€6,500 |
| Web Upgrade | `/solutions/web-upgrade/` | Capture | €1,800–€5,500 |
| Lead Magnet Game | `/solutions/lead-magnet-game/` | Selective | €2,200–€6,500 |
| Inbox Killer | `/solutions/inbox-killer/` | Operate | €1,200–€4,800 |
| Managed Automation | `/solutions/managed-automation/` | Monthly | €349–€890/mo |

**Important naming fix:**

- **Web Upgrade** = website modernisation + lead capture.
- **Sales Funnel / Wizard Cash Engine** = quotes, bookings, configurator, checkout, qualification.

These must never be swapped on `/solutions/`, cards, pricing or metadata.

---

## §3 HOME — section order

> **Version 6.0 (2026-07-19):** Home prune — cash engine / governance / honesty strips **out**. IntentRouter carries module status; Jadzia = sole deep proof (Marketing Brain shadow + HITL). Pain filter polish from v5.2 kept.

| # | Section | Component(s) | Funnel job | Primary content rule |
|---|---|---|---|---|
| 1 | Hero | `HeroSection` | 5-second clarity | Who / for whom / dual-brand 1-liner / **Book Map CTA above fold** / proof strip: ops cockpit · honest module status · you approve |
| 2 | Pain router | `PainGrid` + chips (+ sticky) | Recognition + intent filter | **9 leak cards** + **5 short chips**; hide non-matches; Clear + See modules; `?intent=` shareable |
| 3 | Intent router | `IntentRouter` | Module awareness | ≥7 module cards incl. **VCMS** + Wizard; **no chips on home**; status badges = home honesty; `/solutions/` keeps chips |
| 4 | Live proof — Jadzia | `JadziaSpearhead` | Ops pearl | Operations Command + Marketing Brain **shadow** F0–F3 · HITL · no Act/autonomy claim; CTA → `/results/jadzia-coi/` |
| 5 | Why / How it works | `WhyItWorks` | Delivery + safety | Method + safety + objections — one H2 |
| 6 | Pricing | `Pricing` | Commercial | Map Most popular · builds · Managed |
| 7 | Final CTA | `FinalCtaBand` | Close | Strong L3 Book Map + sample Map |

**Removed from home (kept in repo):** `VcmsTrustStrip`, `WizardVisualizerCompact`, `BuiltVsPlanned` compact, `DualBrandBand`, `FeaturedStrip`, standalone `SystemMetrics`, Wizard-as-Spearhead.

**Still off home:** full LOS / Built vs Planned table / LivingSystemTeaser / BehindTheScenes → `/results/owner-ecosystem/`.

### Home chrome

- `SectionProgress`: Start → Pick → Proof → Close.
- `StickyCta`: mobile only, after hero exits viewport.
- Sticky mobile: **Book Automation Map** (filled) + **Ask on WhatsApp** (outline).
- Desktop primary CTA remains **Book Automation Map**.

---

## §4 Hero contract

Every home hero must include exactly these elements in order:

1. Eyebrow: `// Conversion Systems Architect for NL small business`
2. H1: outcome-first, no “AI-powered” headline.
3. Lead: max 2 sentences + dual-brand 1-liner (`Quietforge deploys · FlexGrafik is the live proof.`).
4. **CTA band first (esp. mobile):** primary Book Map with price meta, secondary See live systems, WhatsApp text link — must be in first viewport on mobile.
5. Proof strip: plain-language claims (no HITL/VCMS jargon).
6. Problem/System/Effect beats: optional below CTA; hidden on small screens to protect fold.

### Recommended hero copy

**H1**  
Conversion systems that qualify leads, reduce admin and keep humans in control.

**Lead** (live = `HERO.subline`)  
For Dutch small businesses tired of manual quotes, inbox chaos and sites that do not become pipeline.

**Proof strip**  
Ops cockpit live · modules with honest status · you approve

**Proof visual**  
Jadzia COI Commander Start (`/gratka/jadzia-commander-home.png`) — not Wizard checkout.

**CTA**  
Primary: `Book Automation Map` → `/book-discovery/`  
Secondary: `See live systems` → `/results/`  
Tertiary text: `Ask on WhatsApp` → WhatsApp deep link

---

## §5 Route map

```text
/                                → Home
/results/                        → Proof hub
/results/inbox-killer/           → Case study
/results/sales-funnel/           → Case study
/results/lead-magnet/            → Case study
/results/agent-orchestrator/     → Case study
/results/jadzia-coi/             → Case study
/results/advisory-modernisation/ → Case study, anonymised / in delivery
/results/owner-ecosystem/        → Full LOS + governance proof
/growth-os/                      → Growth OS multi-client dynamic agent cockpit and real-time ledger proof

/solutions/                      → Productised systems hub
/solutions/inbox-killer/         → Product page
/solutions/web-upgrade/          → Product page
/solutions/sales-funnel/         → Product page
/solutions/lead-magnet-game/     → Product page
/solutions/managed-automation/   → Product page

/how-it-works/                   → Process trust
/pricing/                        → Pricing clarity
/book-discovery/                 → Paid Automation Map booking
/founder/                        → Founder’s System (interactive LOS diagram `#system-diagram`; replaces video walkthrough placeholder)
/about/                          → Formal profile; footer only
/trust/                          → Safety, AVG, HITL
/legal/                          → Legal / privacy
/blog/                           → L1 nurture
```

### Draft / hidden route

`/results/whatsapp-discovery-pilot/` must be **noindex and removed from public sitemap/results hub** until it has a full case-study structure:

- Problem
- System
- 6–8 question flow
- Scoring output
- HITL gate
- Status: Pilot
- Proof asset or deliberate static walkthrough
- CTA

---

## §6 Sitemap priority guidance

| Route type | Sitemap priority | Changefreq |
|---|---:|---|
| `/` | 1.0 | weekly |
| Primary commercial: `/solutions/`, `/pricing/`, `/book-discovery/` | 0.9 | weekly |
| Proof/process: `/results/`, `/how-it-works/`, `/founder/`, `/trust/` | 0.8 | weekly |
| Solution detail pages | 0.75 | weekly |
| Case studies | 0.7 | monthly |
| Blog | 0.5 | monthly |
| Legal/About utility | 0.3 | yearly/monthly |
| Draft/pilot incomplete pages | noindex; not in sitemap | — |

---

## §7 Eight repos — public presentation rule

Data source remains `src/content/ecosystem.ts` → `ECOSYSTEM_REPOS`.

Public-facing cards must use this hierarchy:

```text
Business outcome first
System name second
Tech/repo name third
```

| Repo key | Public outcome label | System label | LOS layers | Proof route |
|---|---|---|---|---|
| `zzpackage` | Quote, price and checkout in one guided flow | Wizard Cash Engine | Sense · Act | `/results/sales-funnel/` |
| `app.flexgrafik.nl` | Turn cold traffic into qualified handoffs | Lead magnet game | Sense | `/results/lead-magnet/` |
| `jadzia-core` | Know which leads, orders and ops need action | Jadzia COI | Think · Act | `/results/jadzia-coi/` |
| `agent-os` | Build and test changes through a fixed agent workflow | Agent OS | Orchestrate · Act | `/results/agent-orchestrator/` |
| `flex-vcms` | Stop content and repo drift before deploy | Governance layer | Sense · Guard | `/results/owner-ecosystem/#why-vcms` |
| `flexgrafik-nl` | Give visitors a trustworthy conversion portal | Trust Portal | Sense | `/solutions/web-upgrade/` |
| `flexgrafik-meta` | Start every project with a written operating map | Method / Automation Map | Guard · Memory | `/how-it-works/` |
| `agent-os-ui` | See tasks, approvals, history and cost | Mission Control | Orchestrate | `/trust/` |

---

## §8 Price source of truth

All pages must use the same commercial matrix.

| Offer | Public price |
|---|---:|
| Automation Map | €290, credited toward first project |
| Inbox Killer | €1,200–€4,800 |
| Web Upgrade | €1,800–€5,500 |
| Sales Funnel / Wizard Cash Engine | €2,400–€6,500 |
| Lead Magnet Game | €2,200–€6,500 |
| Single System Build | from €1,490, only when scope is smaller than a named package |
| Ecosystem / Multi-System Build | €3,490–€12,000 |
| Managed Automation | €349–€890/mo |

Forbidden live price fragments:

- `from €99/mo` for Managed Automation (live range is €349–€890/mo)
- `from €290/mo` for Maintenance, unless the whole pricing matrix is changed
- mismatched Sales Funnel/Web Upgrade ranges
- “contact for price” on named offers

---

## §9 Book Discovery route contract

`/book-discovery/` is a paid Automation Map conversion page.

The page must not mix paid-booking language with a generic enquiry form.

### Required flow

```text
Understand value → See what is included → Pay €290 → Pick slot → Intake → Confirmation
```

If payment/calendar is not technically live, the page must switch copy to **Request Automation Map slot** and clearly state that a payment link follows after fit check.

### Preferred professional target

Primary CTA: `Pay €290 and pick a slot`  
Secondary: `Download sample Map`  
Fallback: `Ask a question on WhatsApp`

Form submit must never say only “Send enquiry” while the page promises payment and slot selection.

---

## §10 Footer

Footer may expose more links than the header, but must preserve hierarchy.

**Company:** Systems & Results · How It Works · Pricing · Trust · Founder · About · Blog  
**Solutions:** Sales Funnel (spearhead) · Web Upgrade · Lead Magnet Game · Inbox Killer · Managed Automation · Ops Command Layer (multi-system)  
**Artefacts:** Automation Map sample · Data safety playbook · LOS diagram · Handover policy  
**Legal:** Privacy · Terms · Contact

WhatsApp appears once in social/contact area, not repeated in every footer column.

---

## §11 Home implementation checklist

Before shipping home:

- [ ] Pain appears before deep architecture.
- [ ] Hero has one primary action.
- [ ] Pricing matches §8 everywhere.
- [ ] Web Upgrade and Sales Funnel are not swapped.
- [ ] Built vs Planned is compact on home and detailed on owner ecosystem page.
- [ ] Every proof card uses Problem → System → Effect.
- [x] Founder `/founder/` — interactive LOS diagram replaces unfinished video placeholder.
- [ ] `/results/whatsapp-discovery-pilot/` is hidden or complete.
- [ ] Mobile has no horizontal overflow.
- [ ] Sticky CTA appears only after enough proof.

---

*Owner: Norbert Wozniak · Updated post-audit: 2026-06-25*
