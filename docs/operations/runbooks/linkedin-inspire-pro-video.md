# Runbook — INSPIRE LinkedIn pro video (M0B pipeline)

**Deliverable:** `docs/operations/media/linkedin-inspire-pro-9x16.mp4`  
**Format:** 1080×1920 · 56s · EN captions on QF panels · no voiceover  
**Campaign:** `inspire-build-in-public-v2`

---

## Pipeline

| Step | Command | Output |
|------|---------|--------|
| 1. Capture + compose | `node scripts/capture-inspire-pro-screens.mjs` | `inspire-screens/*.png` |
| 2. Render QF frames | `node scripts/render-inspire-slides.mjs` | `inspire-slides/frames/scene-*.png` |
| 3. Assemble MP4 | `node scripts/assemble-linkedin-inspire-pro.mjs` | `linkedin-inspire-pro-9x16.mp4` |

**One-shot:**

```bash
npm run media:inspire-pro
```

---

## Capture truth model

| Frame | Source |
|-------|--------|
| `inspire-00-hero.png` | **Live prod** — hero + chat header |
| `inspire-01-intake.png` | **Live prod** — NL chat intake |
| `inspire-02-confirm.png` | Composed UI — briefing card (bench path when logo API blocks automation) |
| `inspire-03-mockups.png` | Composed UI — bench mockups `inspiration-v1/schilder/bus_l-tier-v2` |
| `inspire-04-wizard.png` | Composed UI — Wizard CTA |

**Known blocker (2026-07-11):** Playwright logo upload → jadzia `chat/turn` returns `Failed to fetch` (CORS/network). Full live results capture requires jadzia fix or manual Dowódca recording.

**Banned:** `?da_fixture=results` in published video.

---

## Scenes (8 · 56s)

| Scene | Duration | EN callout |
|-------|----------|------------|
| hook | 5s | Vehicle wrap quote leak |
| pivot | 3s | INSPIRE supervised intake |
| hero | 4s | Live NL product |
| intake | 18s | Structured questions |
| confirm | 6s | Brief before mockup |
| mockups | 10s | Two directions, not print-ready |
| wizard | 5s | Wizard handoff |
| cta | 5s | PARTIAL · build in public |

---

## Publish

1. Upload `linkedin-inspire-pro-9x16.mp4` as LinkedIn post media (or carousel + video)
2. Post body from `drafts/2026-07-10-inspire-build-in-public-v2.md`
3. First comment UTM `inspire-build-in-public-v2` within 2h
