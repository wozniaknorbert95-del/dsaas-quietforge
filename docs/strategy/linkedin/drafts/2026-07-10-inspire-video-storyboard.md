---
status: "[READY]"
title: "INSPIRE video storyboard — 60–75s (POD ICP)"
owner: "Norbert Wozniak"
date: "2026-07-10"
format: "1080×1920 (9:16) preferred · QF dark panels for hook/end"
campaign: "inspire-build-in-public-v2"
---

# Storyboard — INSPIRE prod demo (Schilder Janssen)

**Total:** 60–75s · 5 beats · copy on dark QF panels only (never burn-in on client UI)

## QF tokens (match M0B runbook)

| Token | Value |
|-------|-------|
| `--qf-bg` | `#050608` |
| `--qf-accent` | `#e8a33d` |
| `--qf-text` | `#e5e7ef` |
| `--qf-text-dim` | `#9ca3c7` |
| PARTIAL badge | `#c47a1a` |

---

## Beat map

| # | Time | Type | Visual | Callout / VO (EN hook or silent) |
|---|------|------|--------|----------------------------------|
| 1 | 0–8s | **Slide** | Dark panel hook | **Hook:** “Your shop still quotes vehicle wraps in email?” · Sub: “Clients need direction before they commit.” |
| 2 | 8–35s | **Screen** | Prod chat — intake NL | Scroll: bedrijf → auto → marketing → CTA. Show real NL consultant. No dev EN chat. |
| 3 | 35–50s | **Screen** | Summary + Bevestig | Standard + Premium labels, SKU, price. Client confirms brief. |
| 4 | 50–65s | **Screen** | Jouw 2 ontwerpen | Two mockups side-by-side or scroll. NL disclaimer visible. |
| 5 | 65–75s | **Slide** | End card | **PARTIAL** badge · “Build in public · supervised systems” · Soft: “DM if your quote path is messy” |

---

## Shot list (Dowódca)

| Shot ID | Source | Duration | Notes |
|---------|--------|----------|-------|
| S01-hook | Designed PNG / Figma | 8s | Can reuse carousel slide 1 cropped to 9:16 |
| S02-intake-open | Prod recording | 4s | Hero + chat start |
| S03-intake-scroll | Prod recording | 23s | Speed 1.1× if >30s raw |
| S04-summary | Prod recording | 15s | Pause 2s on SKU lines |
| S05-results | Prod recording | 15s | Both mockups + disclaimer |
| S06-wizard-cta | Prod recording | 5s | Hover “Start in de Wizard →” |
| S07-endcard | Designed PNG | 10s | PARTIAL + build in public |

---

## Edit notes

- **No** `?da_fixture=results` footage (LI-R06 DEMO).
- **No** tier A/B labels — only Standard / Premium in narration if any.
- Speed ramp: slow on summary SKU, fast on repetitive form fills.
- Audio: optional subtle bed; no copyrighted music.
- Export: H.264, 1080×1920, ≤100MB for LinkedIn native video.

---

## Carousel cross-use

| Storyboard beat | Carousel slide |
|-----------------|----------------|
| Beat 1 hook | Slide 1 |
| Beat 2 intake | Slide 2 (frame grab or designed fallback) |
| Beat 3 summary | Slide 3 |
| Beat 4 mockups | Slide 4 |

After recording, replace fallback PNGs in `docs/operations/media/linkedin-inspire-v2/` with prod frame grabs.
