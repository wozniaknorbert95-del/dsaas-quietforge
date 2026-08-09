# LinkedIn M0-B — professional video runbook

**Post:** M0-B Stop quoting by hand · UTM `module-wizard-quotes`  
**Deliverable:** `docs/operations/media/linkedin-m0b-wizard-quotes-pro-9x16.mp4`  
**Figma source (editable deck):** https://www.figma.com/design/tHinyKAOucZtyoKIet0SvJ/LinkedIn-M0B-Wizard-Quotes

**Truth model (two-phase):** Wizard configure + open price → Mollie checkout → `/bedankt/` per-order briefing form (dynamic per SKU).

---

## Pipeline (repo — production export)

| Step | Command | Output |
|------|---------|--------|
| 1. Capture live screens | `node scripts/capture-wizard-m0b-screens.mjs` | `docs/operations/media/m0b-screens/*.png` (7 files) |
| 2. Render QF-branded frames | `node scripts/render-m0b-slides.mjs` | `docs/operations/media/m0b-slides/frames/scene-*.png` (10 files) |
| 3. Assemble MP4 | `node scripts/assemble-linkedin-m0b-pro.mjs` | `linkedin-m0b-wizard-quotes-pro-9x16.mp4` |

**One-shot rebuild:**

```bash
npm run media:m0b-pro
```

---

## Art direction (Quietforge tokens)

| Token | Value | Use |
|-------|-------|-----|
| `--qf-bg` | `#050608` | Slide background |
| `--qf-bg-raised` | `#0b0d12` | Callout panels |
| `--qf-border` | `#252937` | Frames |
| `--qf-text` | `#e5e7ef` | Headlines |
| `--qf-text-dim` | `#9ca3c7` | Bullets |
| `--qf-accent` | `#e8a33d` | Eyebrows, highlights |
| `--qf-ok` | `#6fae6f` | LIVE badge dot |

**Font:** JetBrains Mono  
**Layout:** 1080×1920 · 72px safe margin · copy on dark panels only (never burn-in on wizard UI)

---

## Storyboard (43s, 10 scenes)

| # | Scene | Duration | Type | Callout |
|---|-------|----------|------|---------|
| 1 | hook | 4s | slide | Pain bullets from post |
| 2 | pivot | 3s | slide | Configure + open price → structured onboarding after order |
| 3 | intro | 4s | screen | Guided configurator — Stap 1 van 9 |
| 4 | foundation | 4s | screen | Decision logic on every card |
| 5 | vehicle | 5s | screen | Price updates live — sticky cart |
| 6 | checkout | 4s | screen | Open price, commit to order — **not** upload-first |
| 7 | bedanktChoice | 5s | screen | Fill now or secure link later |
| 8 | briefForm | 6s | screen | Per-product sections — logo, sizes, design |
| 9 | metrics | 4s | slide | + per-order briefing form subline |
| 10 | cta | 4s | slide | Map the leak (soft close) |

**Removed:** `visibility` scene — replaced by bedankt proof (moat).

---

## Capture gates

| File | Source | Gate |
|------|--------|------|
| `m0b-00-welcome.png` | Wizard intro | Stap 1 van 9 |
| `m0b-01-foundation.png` | Wizard step 1 | Option card selected |
| `m0b-02-vehicle-cart.png` | Wizard step 2 | Cart price visible |
| `m0b-08-checkout.png` | Wizard checkout | Summary ≥ €199, no PII |
| `m0b-09-bedankt-choice.png` | `/bedankt/` | `#btn-fill-now` + `#btn-fill-later` |
| `m0b-10-brief-form.png` | `/bedankt/` + mock order | ≥2 `.brief-section-heading` |

Brief form uses portfolio-safe `BRIEF_MOCK_ORDER` inline in capture script (no real customer data).

---

## HITL checklist (before LinkedIn upload)

- [ ] Post does **not** say "upload before checkout"
- [ ] Post mentions per-order briefing form after order
- [ ] Video shows **bedankt choice + brief form** (scenes 7–8)
- [ ] Checkout scene callout says commit to order, not upload-first
- [ ] Zero PII in captures
- [ ] Metrics match `src/content/proof.ts` (161 SKUs, 9 screens, 7 stages, €199)
- [ ] `sales-funnel-case-study.ts` synced with two-phase truth

---

## Publish

1. Upload `linkedin-m0b-wizard-quotes-pro-9x16.mp4` as post media
2. Paste M0-B body from `docs/strategy/linkedin/calendar.md`
3. First comment with UTM `module-wizard-quotes` within 2h

```text
If manual quoting is still your bottleneck — start with a paid Automation Map (€290, credited toward your build):
https://quietforge.flexgrafik.nl/book-discovery/?utm_source=linkedin&utm_medium=organic&utm_campaign=module-wizard-quotes

Live wizard proof:
https://quietforge.flexgrafik.nl/results/sales-funnel/?utm_source=linkedin&utm_medium=organic&utm_campaign=module-wizard-quotes
```

---

## Post copy truth (v2 — 2026-07-08)

**Pivot:** configure + open pricing in wizard → per-order briefing form after order (not email threads).

**Do not claim:** upload-heavy wizard checkout as main onboarding path; quote_mode WhatsApp path.
