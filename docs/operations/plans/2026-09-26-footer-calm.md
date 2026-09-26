# Footer calm — audit + update plan (2026-09-26)

**Repo:** dsaas-quietforge · **Live:** https://quietforge.flexgrafik.nl/  
**ICP:** Dutch SMB owner 3–15 · Funnel: end-of-page recovery, not a sitemap  
**Status:** SHIPPED locally — awaiting promote

## Verdict

Footer is a **second site map**, not a close. **29 links**. Header already has 5 + L3. Mobile sticky CTA covers the last system names. That is Hick’s law on a tired owner.

Canon job (active `docs/canon/site-map.md` Global chrome): promise + Lab sentence + platform line. Live chrome dumps 9 systems + header repeat + PDFs + GitHub.

Historical `docs/strategy/site-map.md` §10 is **stale** (Sales Funnel / Web Upgrade / LOS diagram) and must not drive the rewrite.

---

## What’s there today

| Block | Count | Problem |
|-------|------:|---------|
| Brand | octopus + wordmark, not linked | Double mark, no home exit |
| Copy | label + tagline + KVK | Fine — keep |
| Social | LI · WA · GitHub | GitHub = engineer shop; WA already on page |
| Systems | 10 (All + 9) | Catalog. Hub is `/systems/` |
| Company | 7 | Repeats header 4 + Lab twice |
| Get started | Book a scan + email | Right job, empty vs Systems |
| Resources | Privacy · Terms · Contact · 3 PDFs | Terms = Privacy (`/legal/`). Contact = email. Playbook/handover already on `/security/` |
| Bottom | Lab sentence | Third Lab mention |
| Overlay | Sticky CTA + cookie bar | Footer never fully visible on mobile |

**Duplicates:** Approach/Security/Proof/Pricing (header + footer). Lab ×2–3. Email ×2 (Get started + Contact). WhatsApp (page + footer). Privacy/Terms same href.

**Code:** `src/components/Footer.tsx` + `src/lib/navigation.ts`. `FOOTER_SOLUTIONS` maps the whole `SYSTEMS` catalog. Audit `scripts/audit-menu-footer.mjs` only checks “has Builder’s Lab + no 404” — it **passes a chaotic footer**.

---

## Nielsen (footer only)

| # | Heuristic | Status |
|---|-----------|--------|
| 2 | Match real world | Fail — 9 module names (Publishing Gate, Company Brain) to an owner who bought hours |
| 4 | Consistency | Fail — two IAs (header 5 vs footer 29); stale §10 vs live catalog |
| 6 | Recognition | Fail — Privacy vs Terms look like two policies, one URL |
| 7 | Flexibility | Over-flexible: every spoke in chrome |
| 8 | Aesthetic / minimal | Fail — density §4 says do not expose every system by default |
| 10 | Help / docs | PDFs OK, but 3 downloads next to legal is a junk drawer |

---

## Target chrome (lock this)

**Footer is close + trust + legal. Not a catalog.**

```
[mark linked home]  Conversion systems architect
Systems that give you back your time.
Rotterdam · KVK 89057554 · EN/NL
[LinkedIn] [WhatsApp]

Book a scan →     quietforge@flexgrafik.nl
About · Proof · Lab · Blog     (no header clones)

Privacy & terms · Scan sample ↓

This site runs on its own integrated platform. Builder’s Lab →
© Quietforge
```

**Counts:** ~10 links (from 29). One L3. One WA in footer. Lab once (sentence, not a third column item). GitHub stays on About / Lab, not chrome.

**Out of footer (still on site):** 9 system spokes (`/systems/`), data-safety + handover (`/security/`), GitHub.

**Keep from canon:** tagline, KVK line, platform sentence + Lab link, artefact sample.

---

## Implementation (after GO) — 1 component session

1. **SSoT** `navigation.ts`: drop `FOOTER_SOLUTIONS` catalog; `FOOTER_COMPANY` = About, Proof, Lab, Blog; `FOOTER_LEGAL` = one Privacy & terms; `FOOTER_ARTEFACTS` = scan sample only. Social: LI + WA.
2. **`Footer.tsx`**: 2 bands (brand+start | legal+sample), not 4-col sitemap. Wordmark **links home**. One octopus. Extract `qf-footer-*` (UR-07).
3. **Canon:** rewrite Global chrome footer row in `docs/canon/site-map.md`. Mark strategy §10 historical. Tighten `audit-menu-footer.mjs` to **max-link budget** (e.g. ≤12) + no duplicate header labels + Privacy≠Terms-as-two-URLs.

No home `page.tsx` change → no site-map home-order update.

**Out of scope:** cookie banner, sticky CTA (separate chrome; they *cover* the footer but are not the footer). GitHub profile.

---

## Verify

- Desktop + mobile 390: full footer visible above sticky, or sticky does not eat last links.
- `footer a` count ≤ 12.
- No 9-system list.
- Lab link = 1.
- `npm run typecheck` + build; `node scripts/audit-menu-footer.mjs` against new budget.

## Stop / continue

Ship if owner can close the page in one glance and still find Book a scan, email, Privacy, sample PDF, Lab. If Commander wants 3 flagship system names in footer, that is a **weaker** variant — still not 9.
