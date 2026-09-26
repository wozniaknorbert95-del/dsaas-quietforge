# Chrome + home polish plan (2026-09-26)

**Repo:** dsaas-quietforge · **Live:** https://quietforge.flexgrafik.nl/  
**ICP:** Dutch SMB owner 3–15 · Funnel: post-footer calm, then home density  
**Status:** Session 0 **SHIPPED** · Production `dpl_4RdKJYtwhyw2kLWcDFSoNUWnSsku` (`47b6c45`) · S1–S5 queued

## Verdict

Footer catalog is gone (11 links). Remaining overwhelm is **chrome stacking** (cookie + sticky) and **home length** (13 FAQs + 6× Evidence →), not more footer links.

## Live verify (Production `dpl_4a6mpeDDu3MTGqBf8wGLkzb1VG8V`)

| Check | Result |
|-------|--------|
| Footer link count | 11 (budget 12) |
| Catalog | No Quote & Order / Custom AI Agent / GitHub icon |
| Privacy & terms | `/legal/` 200, H1 Legal & Privacy |
| Scan sample | `/artefacts/automation-map-sample.pdf` 200 |
| Lab | once, in platform sentence |
| Privacy tap @390 | **FAIL on live** — Sticky CTA intercepts footer links |

Session 0 below fixes the intercept. Cookie banner was not on this visit (consent already stored).

---

## Session 0 — last footer/sticky mile (this batch)

**Owner:** agent · **Timebox:** this session · **Do not touch:** home FAQ, cookie copy

1. Hide mobile sticky when `footer` enters the zone above the bar (`IntersectionObserver` + `rootMargin` −4.75rem).
2. Drop extra footer padding that existed only to fight the overlay.
3. Label `Scan sample (PDF)` — no `↓`.
4. Lab link `white-space: nowrap`.
5. WhatsApp glyph (filled mark, not Lucide `MessageCircle`).
6. Extract sticky + social to `qf-*` (≤8 utilities).

**Stop / continue:** Privacy & terms and Scan sample tappable at 390px with sticky gone. Audit still ≤12.

---

## Remaining sessions (one each)

### S1 — Cookie vs sticky stack

**ICP / pain:** first visit, two bars fight the close.  
**Promise:** one overlay at a time; footer always clickable after consent.  
**Files:** `CookieConsent.tsx`, `StickyCta.tsx`, `.qf-cookie-consent` (z-60 vs sticky z-40).  
**Change:** if cookie is visible, do not render sticky. After decide, sticky may return until footer. Optional: cookie `padding-bottom` so it does not sit on iOS home indicator.  
**CTA / events:** unchanged (`cta_whatsapp_click` sticky_mobile).  
**Threshold:** first-visit 390: cookie only; after Essential/Accept, sticky until footer; Privacy click works both states.

### S2 — Home FAQ cut

**Pain:** 13 accordions after pricing. Hick + scroll tax.  
**Keep on home (7):** website vs OS · AI vs engineering · human approval · why paid scan · FlexGrafik not a client case · hours counter 0 · don’t-automate is a win.  
**Move:** CRM / EU data / VPS / repo / if it doesn’t work / reference program → `/approach/` or `/pricing/` FAQ, keep JSON-LD in sync.  
**Files:** `src/app/page.tsx` + `docs/canon/site-map.md` §2 same session.  
**Threshold:** FAQ ≤7 on home; JSON-LD matches visible list.

### S3 — Discipline “Evidence →” ×6

**Pain:** six identical CTAs to `/security/#…`.  
**Change:** keep six facts, **one** link “Security evidence →” under the grid.  
**Files:** `page.tsx` + site-map.  
**Threshold:** one outbound from that section.

### S4 — WhatsApp + Book arrow canon

**Pain:** Home hero + final + sticky + footer all offer WhatsApp; header `Book a scan`, footer `Book a scan →`.  
**Change:** one L3 on a viewport. Sticky (mobile) **or** final row, not both visible. Header CTA no arrow; in-page fill buttons may keep `→`. Source remains `CTAS.bookAutomationMap` = `Book a scan`.  
**Do not** revive skill text “Book Automation Map”.  
**Threshold:** at most two WhatsApp surfaces on home at once (e.g. sticky **xor** final on mobile).

### S5 — Stale “Automation Scan” copy

**Pain:** Hours Engine Scan is live; leftover product name.  
**Files (copy only):** `src/app/legal/page.tsx`, `src/app/page.tsx` meta, `src/app/how-it-works/page.tsx`. Comment in `mollie.ts` optional.  
**Do not** invent prices. Keep €149 / €290 / €490 excl. VAT as already on legal.  
**Threshold:** `rg "Automation Scan" src/app` → 0 public strings.

---

## Out of plan

- LinkedIn live cadence — PARKED (tool-first).
- Hours counter stays 0.
- FlexGrafik is not a client case.
- Footer catalog must not return.
- Cookie legal copy rewrite beyond Hours Engine name.

## Measurement

| Signal | Where |
|--------|--------|
| Footer clicks | GA4 `sample_map_download` location=footer; legal pageviews |
| Sticky vs cookie | no new events required; watch bounce on `/` mobile |
| FAQ | scroll depth / FAQ expand if instrumented later |

**Owner:** Commander decides GO per session. Agent does not deploy without GO.
