# Handoff — Modernization Batch 2 Complete (2026-08-09)

**Repo:** services.flexgrafik.nl · **Branch:** `arena/019fe4fa-services` · **Build:** `npm run typecheck && npm run build` ✅ (38 routes)

---

## Cel / Goal

Execute Batch 2 of the Quietforge Modernization Action Plan — implement HeroSection per `site-map.md §4` Hero contract.

---

## Weryfikacja / Verification

| Check | Status |
|-------|--------|
| `npm run typecheck` | ✅ 0 errors |
| `npm run build` | ✅ 38 routes |
| `npx eslint src` | ✅ 0 errors, 0 warnings |
| `rg '\[FILL:' src/` | ✅ 0 matches |

---

## Co zrobiono / What changed

### HeroSection Verification (Existing Implementation)

The `HeroSection` component (`src/components/home/HeroSection.tsx`) already fully complies with `site-map.md §4`:

| Hero Contract Element (§4) | Implementation |
|---------------------------|----------------|
| 1. Eyebrow: `// Conversion Systems Architect for NL small business` | `HERO.eyebrow` in `conversion-copy.ts` ✅ |
| 2. H1: Outcome-first, no "AI-powered" | `HERO.headline` — "Conversion systems that qualify leads, reduce admin and keep humans in control." ✅ |
| 3. Lead: ≤2 sentences + dual-brand 1-liner | `HERO.subline` + `HERO.dualBrandLine` ✅ |
| 4. CTA band in first viewport (mobile) | Primary Book Map (€290 credited), Secondary See live systems, WhatsApp link ✅ |
| 5. Proof strip: plain-language | `HERO.proofStrip` — "Ops cockpit live · modules with honest status · you approve" ✅ |
| 6. Problem/System/Effect beats (hidden on small screens) | `HERO.beats` grid, `@media (min-width: 640px)` ✅ |
| Proof visual: Jadzia COI Commander Start | `/gratka/jadzia-commander-home.png` (197KB, live ops cockpit) ✅ |

### Content Source (SSoT)

All copy pulled from `src/content/conversion-copy.ts` → `HERO` object:
- `eyebrow`, `headline`, `subline`, `dualBrandLine`
- `primaryCta`, `primaryCtaMeta` (€290 · credited · 60–90 min)
- `secondaryCta`, `secondaryHref` (/results/)
- `whatsappCta`, `proofStrip`, `proofVisual`
- `beats` (Problem / System / Effect)

### Design System Compliance

- **Dark theme default** — CSS vars (`--qf-bg`, `--qf-text`, `--qf-accent`, `--qf-border`)
- **Sharp corners** (`--qf-radius: 2px`), **borders not shadows**, no gradients
- **Max 8 Tailwind utils/element** — uses `qf-*` classes from `globals.css`
- **No inline `style={{}}`** — Tailwind + CSS vars only
- **Reduced motion** — `useMotion()` hook, Framer Motion with `prefersReduced` guard
- **Mobile-first** — single column, grid at 640px, side-by-side at 1024px

---

## Next Steps (Batch 3)

**Batch 3 scope (per modernization action plan):**
- `PainGrid` — 9 leak cards + 5 intent chips, sticky filter, `?intent=` shareable
- `IntentRouter` — ≥7 module cards incl. VCMS + Wizard, status badges = home honesty
- `JadziaSpearhead` — Operations Command + Marketing Brain shadow F0–F3, HITL
- `WhyItWorks` — Method + safety + objections, one H2
- `Pricing` — Map Most popular · builds · Managed (per §8 price matrix)
- `FinalCtaBand` — Strong L3 Book Map + sample Map

**Commander decision required:** Proceed with Batch 3 (PainGrid) next session?

---

*Maintainer: update at end of every session*