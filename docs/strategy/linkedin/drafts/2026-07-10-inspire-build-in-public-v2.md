---
status: "[SUPERSEDED — v3 carousel, 2026-07-14 — video recording retired by mockup-first proof]"
title: "LinkedIn Draft — INSPIRE build-in-public v2 (POD shop ICP)"
owner: "Norbert Wozniak"
date: "2026-07-10"
campaign: "inspire-build-in-public-v2"
pillar: "P1 Business proof + P3 Founder"
leak: "Manual quotes on complex SKUs (vehicle branding)"
proof_status: "PARTIAL"
language: "EN"
supersedes: "2026-07-10-inspire-build-in-public.md"
---

# LinkedIn Post — INSPIRE build-in-public v2

**Profile:** https://www.linkedin.com/in/quietforge/  
**Media:** 4-slide carousel **or** screen recording + cover slide  
**Video:** `docs/operations/media/linkedin-inspire-pro-9x16.mp4` (56s · QF EN captions · no VO)  
**Rebuild video:** `npm run media:inspire-pro` from `services/` repo root  
**Recording URL:** https://zzpackage.flexgrafik.nl/voertuigreclame-ontwerp/  
**Canon:** [rules.md](../rules.md) · LI-R03 · LI-R06 PARTIAL

## Media files

| Slide | File |
|-------|------|
| 1 — Hook (problem) | [`../../operations/media/linkedin-inspire-v2/slide-1-hook-problem.png`](../../operations/media/linkedin-inspire-v2/slide-1-hook-problem.png) |
| 2 — NL intake flow | [`../../operations/media/linkedin-inspire-v2/slide-2-intake-nl.png`](../../operations/media/linkedin-inspire-v2/slide-2-intake-nl.png) |
| 3 — Standard + Premium summary | [`../../operations/media/linkedin-inspire-v2/slide-3-summary-sku.png`](../../operations/media/linkedin-inspire-v2/slide-3-summary-sku.png) |
| 4 — Mockups + PARTIAL | [`../../operations/media/linkedin-inspire-v2/slide-4-mockups-partial.png`](../../operations/media/linkedin-inspire-v2/slide-4-mockups-partial.png) |

Regenerate: `python scripts/build-linkedin-inspire-carousel-v2.py` from `services/` repo root.

**Do NOT publish v1 slides** (`linkedin-inspire-build-in-public/slide-1-chat-intake-en.png` — dev chat angle).

---

## Post body (copy-paste)

```text
If you run a print-on-demand or custom product shop, you know this leak:

A client asks for vehicle branding.
You ask for logo, vehicle type, coverage, budget.
They answer in fragments across email and WhatsApp.
You guess a direction, send a mockup, get redraw notes.
Nobody is sure what SKU or price they are buying until late.

That costs studio time, lost orders, and trust.

I am building INSPIRE inside my own NL print business first — supervised, not black-box.

What it does today (PARTIAL, live on my site):
→ Dutch client intake — branche, vehicle, services, logo, budget
→ confirmed design brief before any mockup
→ two clear directions: Standard and Premium (not vague tiers)
→ generative inspiration mockups so the client sees direction before paying
→ handoff into the same self-service wizard I already run

For the end client: they see direction before they commit.
For the shop owner: structured lead, SKU, price — less quote chaos.

Status: PARTIAL. Pipeline works end-to-end. Visual bar still tuning — I will not ship mockups I would be embarrassed to show a real ZZP client.

Building in public. If you run a print-on-demand or custom product shop with a messy quote path — or you want to back supervised tools like this — DM me.

#B2B #buildinpublic #automation
```

---

## First comment (publish within 2h — LI-R04)

```text
If your shop still quotes complex vehicle jobs in email threads — start with a paid Automation Map (€290, credited toward your build):
https://quietforge.flexgrafik.nl/book-discovery/?utm_source=linkedin&utm_medium=organic&utm_campaign=inspire-build-in-public-v2

Live systems I run first in my own business:
https://quietforge.flexgrafik.nl/results/?utm_source=linkedin&utm_medium=organic&utm_campaign=inspire-build-in-public-v2#design-intake

INSPIRE demo (NL UI): https://zzpackage.flexgrafik.nl/voertuigreclame-ontwerp/?utm_source=linkedin&utm_medium=organic&utm_campaign=inspire-build-in-public-v2

Building in the open — DM me what you sell and how you quote today.
```

---

## Pre-publish checklist (LI-R15)

- [x] Hook = buyer problem (POD shop quote ping-pong)
- [x] Status PARTIAL in post + slide 4
- [x] No links in post body
- [x] Max 3 hashtags
- [x] EN only (NL only in video UI)
- [x] FlexGrafik as proof, not primary identity
- [x] Preflight prod PASS — see runbook
- [ ] Homepage 5-second test on book-discovery (mobile)
- [ ] First comment ready before publish
- [ ] Video recorded on prod (Schilder Janssen persona)
- [ ] Dowódca publish + first comment within 2h

> **RETRO 2026-07-14:** video/recording variant retired. Dowódca approved mockup-first proof. Publish via [`2026-07-14-inspire-build-in-public-v3-carousel.md`](./2026-07-14-inspire-build-in-public-v3-carousel.md) instead — 4 static PNG slides, no screen recording, no video file.

---

## After publish

Run [ENGAGEMENT v2](./2026-07-10-inspire-build-in-public-v2-ENGAGEMENT.md) (15 min).  
Update [CHANGELOG.md](../CHANGELOG.md) with date + slot.
