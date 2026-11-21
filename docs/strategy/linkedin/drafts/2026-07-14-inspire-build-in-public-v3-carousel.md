---
status: "[READY — Dowódca carousel]"
title: "LinkedIn Draft — INSPIRE build-in-public v3 (mockup carousel, no video)"
owner: "Norbert Wozniak"
date: "2026-07-14"
campaign: "inspire-build-in-public-v2"
pillar: "P1 Business proof + P3 Founder"
leak: "Manual quotes on complex SKUs (vehicle branding)"
proof_status: "PARTIAL"
language: "EN"
supersedes: "2026-07-10-inspire-build-in-public-v2.md (video variant retired)"
media_format: "carousel-4-png"
persona: "Schilder Janssen (ZZP schilder, bus_l)"
---

# LinkedIn Post — INSPIRE build-in-public v3 (carousel, no video)

**Profile:** https://www.linkedin.com/in/quietforge/  
**Media:** 4-slide carousel (1080×1350, PNG, no video)  
**Persona:** Schilder Janssen (NL ZZP schilder, Mercedes Vito `bus_l`)  
**Canon:** [rules.md](../rules.md) · LI-R02 · LI-R03 · LI-R04 · LI-R06 · LI-R15  
**UTM:** `utm_campaign=inspire-build-in-public-v2`

## Media files (4 slides, 1080×1350)

| Slide | Role | Source |
|-------|------|--------|
| 1 — Hook (problem) | Quote ping-pong pain | [`../../operations/media/linkedin-inspire-v3/slide-1-hook-problem.png`](../../operations/media/linkedin-inspire-v3/slide-1-hook-problem.png) |
| 2 — Standard mockup | Schilder Janssen — Standard direction (prod mockup) | [`../../operations/media/linkedin-inspire-v3/slide-2-standard-mockup.png`](../../operations/media/linkedin-inspire-v3/slide-2-standard-mockup.png) |
| 3 — Premium mockup | Schilder Janssen — Premium direction (prod mockup) | [`../../operations/media/linkedin-inspire-v3/slide-3-premium-mockup.png`](../../operations/media/linkedin-inspire-v3/slide-3-premium-mockup.png) |
| 4 — End card (effect + PARTIAL) | Effect + soft CTA + honesty badge | [`../../operations/media/linkedin-inspire-v3/slide-4-endcard-partial.png`](../../operations/media/linkedin-inspire-v3/slide-4-endcard-partial.png) |

**Rebuild all slides:** `python scripts/build-linkedin-inspire-carousel-v3.py` from `services/` repo root.  
**Do NOT publish:** v1 slides, v2 video, `?da_fixture=results` shots (LI-R06).

---

## Post body (copy-paste — EN)

```text
If you run a print-on-demand or custom product shop, you know this leak:

A client wants his van wrapped.
You ask for logo, vehicle, coverage, budget.
He replies in fragments — email, then WhatsApp, then a voice note.
You guess a direction, send a mockup, get redraw notes.
Nobody — not you, not him — knows what SKU or price he is actually buying until late.

That costs studio time, lost orders, and trust. Worst case: he ghosts, because the choices never felt clear.

I am building INSPIRE inside my own NL print business first — supervised, not a black box.

What it does today (PARTIAL, live on my real store):
→ Dutch client intake — branche, vehicle, services, logo, budget
→ confirmed design brief before any mockup is drawn
→ two clear directions: Standard and Premium — not vague "tiers"
→ generative inspiration mockups, so the client sees the direction before he pays
→ handoff into the same self-service wizard I already run

Two directions. One real client (Schilder Janssen, ZZP painter, Mercedes Vito). These are the mockups the system produced for him. Standard is the clean, cost-conscious wrap. Premium is full-coverage with brand colours. He chose before spending a euro.

For the end client: he sees direction before he commits. No more guessing if "the designer gets it".
For the shop owner: a structured lead — SKU, price, and brief — lands before quote chaos starts.

Status: PARTIAL. The pipeline runs end-to-end on prod. The mockups you see here are real. The conversation is still being tuned — I will not claim "studio-grade" until a human client run signs it off.

Building in public. If you run a print-on-demand or custom product shop with a messy quote path — or you want systems like this supervised before black-box — DM me.

#B2B #buildinpublic #automation
```

---

## First comment (publish within 2h — LI-R04 + LI-R14)

```text
Demo (NL UI, live on my site):
https://zzpackage.flexgrafik.nl/voertuigreclame-ontwerp/?utm_source=linkedin&utm_medium=organic&utm_campaign=inspire-build-in-public-v2

Book a paid Automation Map (€290, credited toward your build):
https://quietforge.flexgrafik.nl/book-discovery/?utm_source=linkedin&utm_medium=organic&utm_campaign=inspire-build-in-public-v2

Live systems — Design Intake landing (PARTIAL labelled on-page):
https://quietforge.flexgrafik.nl/results/?utm_source=linkedin&utm_medium=organic&utm_campaign=inspire-build-in-public-v2#design-intake

Wizard + Design Intake case:
https://quietforge.flexgrafik.nl/solutions/sales-funnel/?utm_source=linkedin&utm_medium=organic&utm_campaign=inspire-build-in-public-v2

DM me what you sell and how you quote today.
```

---

## Pre-publish checklist (LI-R15)

- [ ] Hook opens with buyer problem (quote ping-pong), not a system name
- [ ] Cost of the problem is clear (studio time, lost orders, trust, ghosting)
- [ ] Proof honest: PARTIAL labelled 2× in post body
- [ ] Effect line exists ("sees direction before he commits" / "structured lead lands before quote chaos")
- [ ] No links in post body
- [ ] CTA comment ready before publish, with UTM
- [ ] Max 3 hashtags — exactly `#B2B #buildinpublic #automation`
- [ ] EN only (NL only inside mockup UI — that's natural proof, not a rule break)
- [ ] FlexGrafik used only as proof ("inside my own NL print business"), not as primary identity
- [ ] No investor content
- [ ] Homepage 5-second test mobile-passed on `quietforge.flexgrafik.nl/book-discovery/` (LI-R10)
- [ ] 4 carousel PNGs uploaded in correct order (hook → Standard → Premium → end card)
- [ ] First comment published within 2h
- [ ] Dowódca ENGAGEMENT v2 (15 min) ready to run

---

## Honesty gates (LI-R06)

| Gate | Pass |
|------|------|
| Visual proof real (not fixture) | mockups = prod-mockup-standard/premium.png (Schilder Janssen, prod brief) |
| No `?da_fixture=results` in any slide | confirmed |
| No v1 slides (`slide-1-chat-intake-en.png`) | confirmed — v1 suppressed |
| PARTIAL badge visible end card | slide 4 includes `PARTIAL` + `#c47a1a` badge |
| Conversation quality not oversold | post says "conversation is still being tuned" |
| Human client sign-off not claimed | post says "I will not claim studio-grade until a human client run signs it off" |

---

## After publish

- Run [ENGAGEMENT v2](./2026-07-10-inspire-build-in-public-v2-ENGAGEMENT.md) (15 min, within 2h).
- Update [CHANGELOG.md](../CHANGELOG.md) — row: `2026-07-14 v3 carousel published (no video)`.
- Mark [v2 video draft](./2026-07-10-inspire-build-in-public-v2.md) status: `SUPERSEDED — v3 carousel`.
- Optional v4: after Dowódca manual chat HITL ≥7.0 recorded, swap slide 2 for a real chat-frame grab and drop "conversation still being tuned" → "studio-grade intake".

---

## V-FILES

1. `docs/strategy/linkedin/drafts/2026-07-14-inspire-build-in-public-v3-carousel.md` (this file)
2. `docs/strategy/linkedin/drafts/2026-07-10-inspire-build-in-public-v2-ENGAGEMENT.md`
3. `flexgrafik-inspire/docs/handoffs/2026-07-14-chat-enterprise-close.md`
4. `flexgrafik-inspire/ops/evidence/chat-audit-live-2026-07-14-post-orchestrator.json`