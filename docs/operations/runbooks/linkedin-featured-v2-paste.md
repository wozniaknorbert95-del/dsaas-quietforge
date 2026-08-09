---
status: "[ACTIVE]"
title: "LinkedIn Featured V2 — Commander paste checklist"
owner: "Norbert Wozniak"
updated: "2026-08-02"
classification: "L4 — GTM quick win B1"
impact: "P0 — closes 1.5/5 conversion gap from LI audit"
---

# LinkedIn Featured V2 — 4 slots mirror homepage

**Profile:** [linkedin.com/in/flexgrafik-quietforge](https://www.linkedin.com/in/flexgrafik-quietforge)  
**Time:** ~15 min · **HITL only** (no API automation)

## Before you start

- [ ] Logged into LinkedIn as Norbert
- [ ] `quietforge.flexgrafik.nl` loads on mobile (5-second test)
- [ ] UTM base ready: `utm_source=linkedin&utm_medium=organic&utm_campaign=featured-v2`

---

## Slot 1 — Book Automation Map (primary revenue)

| Field | Value |
|-------|-------|
| **Title** | Book an Automation Map — €290 |
| **Description** | 90-minute working session. You get a documented automation map for your business. Fee credited toward build if we proceed. |
| **URL** | `https://quietforge.flexgrafik.nl/book-discovery/?utm_source=linkedin&utm_medium=organic&utm_campaign=featured-v2-map` |
| **Thumbnail** | Screenshot of `/book-discovery/` hero (mobile crop) |

---

## Slot 2 — Live proof: Design Intake

| Field | Value |
|-------|-------|
| **Title** | Live system: Design Intake (48h mockups) |
| **Description** | PARTIAL proof — live on my NL print business. See the flow before you book. |
| **URL** | `https://quietforge.flexgrafik.nl/results/?utm_source=linkedin&utm_medium=organic&utm_campaign=featured-v2-intake#design-intake` |
| **Thumbnail** | `inspire-03-mockups.png` or results hero crop |

---

## Slot 3 — Case study: Sales Funnel

| Field | Value |
|-------|-------|
| **Title** | Case: Wizard + Design Intake funnel |
| **Description** | How FlexGrafik (my own business) uses conversion systems — not a brochure site. |
| **URL** | `https://quietforge.flexgrafik.nl/solutions/sales-funnel/?utm_source=linkedin&utm_medium=organic&utm_campaign=featured-v2-funnel` |
| **Thumbnail** | Solutions page hero or m0b wizard screen |

---

## Slot 4 — About / positioning

| Field | Value |
|-------|-------|
| **Title** | Conversion Systems Architect — Quietforge |
| **Description** | B2B automation for NL SMB. Systems I run on my own business first. |
| **URL** | `https://quietforge.flexgrafik.nl/?utm_source=linkedin&utm_medium=organic&utm_campaign=featured-v2-home` |
| **Thumbnail** | Home hero or OG image |

---

## Also update (same session)

### Services section

| Service | Price | Description |
|---------|-------|-------------|
| Automation Map | €290 | 90-min session, credited toward build |
| Build & deploy | from €1,200 | Scoped from Map — 2-week typical |

### Experience headline

`Conversion Systems Architect · Quietforge · FlexGrafik (proof)`

### Website field

`https://quietforge.flexgrafik.nl/book-discovery/` (not flexgrafik.nl)

### Custom button

**Book Automation Map** → same URL as Slot 1

---

## Post-paste verification

- [ ] All 4 Featured links open correct pages (mobile)
- [ ] `#design-intake` scrolls to evidence grid on results
- [ ] Custom button visible on profile
- [ ] Services show €290 Map
- [ ] No flexgrafik.nl as primary website
- [ ] Screenshot saved to `docs/operations/media/` (optional proof)

---

## Rollback

Restore previous Featured from LinkedIn edit history or leave empty slots — no code deploy needed.
