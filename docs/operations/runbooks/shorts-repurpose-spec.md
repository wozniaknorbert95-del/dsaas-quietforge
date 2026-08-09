---
status: "[ACTIVE]"
title: "Shorts repurpose spec — INSPIRE + M0-B → YT Shorts + TikTok"
owner: "Norbert Wozniak"
updated: "2026-08-02"
classification: "L4 — GTM P2"
brand: "FlexGrafik consumer only"
---

# Shorts repurpose spec

**Rule:** FlexGrafik visual proof only. **No** Automation Map CTA in bio or overlays ([02-channel-architecture.md](../../strategy/gtm/02-channel-architecture.md)).

---

## Source assets

| Asset | Path | Format | Duration |
|-------|------|--------|----------|
| INSPIRE pro video | `docs/operations/media/linkedin-inspire-pro-9x16.mp4` | 9:16 | ~60–90s |
| M0-B wizard video | `docs/operations/media/linkedin-m0b-wizard-quotes-pro-9x16.mp4` | 9:16 | ~60–90s |
| Slide frames INSPIRE | `docs/operations/media/inspire-slides/frames/` | PNG | static fallback |
| Slide frames M0-B | `docs/operations/media/m0b-slides/frames/` | PNG | static fallback |

**Build scripts:** `scripts/assemble-linkedin-inspire-pro.mjs`, `scripts/assemble-linkedin-m0b-pro.mjs`

---

## Target platforms

| Platform | Account | Bio link | CTA in video |
|----------|---------|----------|--------------|
| YouTube Shorts | FlexGrafik channel | flexgrafik.nl or wizard | Wizard only |
| TikTok | @flexgrafik (or create) | Same | Wizard only |

**Never:** quietforge.flexgrafik.nl/book-discovery in Shorts/TikTok.

---

## Repurpose job spec

### Job: `shorts-repurpose-v1`

**Input:** `{ source: "inspire" | "m0b", platform: "youtube" | "tiktok" }`

**Steps:**

1. **Validate source** — MP4 exists, 9:16, ≤90s (Shorts limit 60s optional trim)
2. **Trim hook** — first 3s = problem hook (already in assembled pro videos)
3. **Caption file** — NL consumer copy (see templates below)
4. **Thumbnail** — first frame or `scene-hook.png` from frames/
5. **Export** — no re-encode if already H.264 9:16; else ffmpeg:
   ```bash
   ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 128k output-shorts.mp4
   ```
6. **Metadata** — title, description, hashtags, UTM in description only

### Schedule cadence

| Week | Content | Platform |
|------|---------|----------|
| 1 | INSPIRE hook + mockups clip | YT Shorts |
| 2 | Same asset | TikTok |
| 3 | M0-B wizard clip | YT Shorts |
| 4 | M0-B | TikTok |

**Frequency:** 1 Short/week max per platform (avoid spam).

---

## Caption templates

### INSPIRE (NL consumer)

```text
Offerte chaos? Bij FlexGrafik zie je richting vóór je tekent.

Wizard → mockups binnen 48u. Geen eindeloos mailen.

👉 zzpackage.flexgrafik.nl?utm_source=youtube&utm_medium=shorts&utm_campaign=inspire-v1

#belettering #voertuigreclame #rotterdam #zzp
```

### M0-B wizard (NL consumer)

```text
Hoe wij offertes maken — geen Excel, wel wizard.

Kies voertuig, formaat, afwerking. Klaar.

👉 zzpackage.flexgrafik.nl?utm_source=tiktok&utm_medium=shorts&utm_campaign=m0b-v1

#werkkleding #drukwerk #ondernemer
```

Swap `utm_source` / `utm_medium` per platform.

---

## Upload checklist

- [ ] 9:16 vertical
- [ ] ≤60s for YT Shorts badge (optional trim)
- [ ] No Quietforge / Map mention
- [ ] Wizard UTM in description
- [ ] Thumbnail readable at small size
- [ ] Commander approve caption

---

## Automation roadmap

| v1 (now) | Manual upload + this spec |
| v2 | Script `scripts/repurpose-shorts.mjs` — metadata JSON + ffmpeg trim |
| v3 | YouTube Data API + TikTok scheduler (HITL publish) |

---

## File outputs (when script built)

```
docs/operations/media/shorts-export/
  inspire-youtube-v1.mp4
  inspire-tiktok-v1.mp4
  m0b-youtube-v1.mp4
  m0b-tiktok-v1.mp4
  *.json  # title, description, tags
```

---

## Success metrics

| Metric | Tool |
|--------|------|
| Views | YT Studio / TikTok analytics |
| Wizard clicks | UTM in GA4 (FlexGrafik property if split) |
| **Not tracked on Quietforge GA4** | Consumer funnel separate |
