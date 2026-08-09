# LinkedIn publish pack — INSPIRE LI-R10 (v3 carousel, post-parity)

**Date:** 2026-08-02  
**Campaign:** `inspire-build-in-public-v3`  
**Status:** READY — claim-lock verified post dual-surface parity  
**Commander:** upload carousel + paste body + first comment (~20 min)

---

## Pre-flight (agent verified 2026-08-02)

| Gate | Status |
|------|--------|
| `#design-intake` 3-screen evidence (Intake → Direction → Offerte) | **PASS** |
| Secondary CTA → `/solutions/sales-funnel/#inspire` | **PASS** |
| PARTIAL labelled on-page | **PASS** |
| No `?da_fixture=results` | **PASS** |
| claim-lock [2026-07-gtm-claim-lock.md](../../../operations/artefacts/2026-07-gtm-claim-lock.md) | **PASS** |

---

## Media deliverables (v3 carousel — preferred)

| # | Asset | Path |
|---|-------|------|
| 1 | Hook — quote ping-pong problem | `docs/operations/media/linkedin-inspire-v3/slide-1-hook-problem.png` |
| 2 | Standard mockup | `docs/operations/media/linkedin-inspire-v3/slide-2-standard-mockup.png` |
| 3 | Premium mockup | `docs/operations/media/linkedin-inspire-v3/slide-3-premium-mockup.png` |
| 4 | End card (partial) | `docs/operations/media/linkedin-inspire-v3/slide-4-endcard-partial.png` |

**Alternate:** Video `docs/operations/media/linkedin-inspire-pro-9x16.mp4` (v2 campaign — use carousel for v3)

**Rebuild carousel:** `python scripts/build-linkedin-inspire-carousel-v3.py`  
**Rebuild video:** `npm run media:inspire-pro`

Full draft + checklist: [2026-07-14-inspire-build-in-public-v3-carousel.md](./2026-07-14-inspire-build-in-public-v3-carousel.md)

---

## Post body (copy-paste — EN)

Use body from [v3 carousel draft](./2026-07-14-inspire-build-in-public-v3-carousel.md) — hook opens with buyer problem (quote ping-pong), PARTIAL labelled 2×, no links in body.

Hashtags (exactly 3): `#B2B #buildinpublic #automation`

---

## First comment (within 2h — LI-R04 + LI-R14)

```text
Demo (NL UI, live on my site):
https://zzpackage.flexgrafik.nl/voertuigreclame-ontwerp/?utm_source=linkedin&utm_medium=organic&utm_campaign=inspire-build-in-public-v3

Book a paid Automation Map (€290, credited toward your build):
https://quietforge.flexgrafik.nl/book-discovery/?utm_source=linkedin&utm_medium=organic&utm_campaign=inspire-build-in-public-v3

Live systems — Design Intake landing (PARTIAL labelled on-page):
https://quietforge.flexgrafik.nl/results/?utm_source=linkedin&utm_medium=organic&utm_campaign=inspire-build-in-public-v3#design-intake

Wizard + Design Intake case:
https://quietforge.flexgrafik.nl/solutions/sales-funnel/?utm_source=linkedin&utm_medium=organic&utm_campaign=inspire-build-in-public-v3

DM me what you sell and how you quote today.
```

**Change from v2:** campaign `v3`, solutions URL added, Map copy says "paid" + credited.

---

## Commander checklist (20 min)

- [ ] Upload 4 carousel PNGs in order (hook → Standard → Premium → end card)
- [ ] Paste post body from v3 draft — **no links in body**
- [ ] Publish (native schedule OK)
- [ ] First comment within 2h (block above)
- [ ] Run ENGAGEMENT 15 min — [v2 ENGAGEMENT](./2026-07-10-inspire-build-in-public-v2-ENGAGEMENT.md)
- [ ] Log in [calendar.md](../calendar.md): pillar M0-B · date · `inspire-build-in-public-v3`

---

## Honesty gates (LI-R06)

- Do NOT use v1 slides (`slide-1-chat-intake-en.png`)
- Do NOT promise % uplift without measurement
- Label **PARTIAL** until prod mockup HITL bar met
- FlexGrafik = proof only in copy

---

## Post-publish measurement

Monday after publish: `npm run ga4:weekly` — expect first `linkedin / organic` sessions with `utm_campaign=inspire-build-in-public-v3`.

Pipeline: [linkedin-publish-pipeline-v1.md](../../../operations/runbooks/linkedin-publish-pipeline-v1.md)

---

## V-FILES

1. `docs/strategy/linkedin/drafts/2026-07-14-inspire-build-in-public-v3-carousel.md`
2. `docs/operations/artefacts/2026-08-02-inspire-link-ux-audit.md`
3. `docs/operations/runbooks/linkedin-inspire-pro-video.md`
4. `docs/operations/artefacts/2026-08-02-marketing-audit-quietforge.md`
