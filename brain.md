# Brain — dsaas-quietforge

## Canonical project memory | v2.0 | 2026-06-25

---

## 0) READ ORDER FOR AGENTS

**Marketing, conversion, UX, and direction are NOT owned by this file.**

| Step | Document |
|------|----------|
| 1 | [`docs/README.md`](docs/README.md) — knowledge map |
| 2 | [`docs/canons/vision-system.md`](docs/canons/vision-system.md) — north star |
| 3 | [`docs/canons/*-rules.md`](docs/canons/README.md) — HARD rules |
| 4 | [`docs/strategy/`](docs/strategy/README.md) — detailed canon |
| 5 | This file — tech, deploy, guardrails only |
| 6 | [`docs/operations/SESSION-ANCHOR.md`](docs/operations/SESSION-ANCHOR.md) — live session |

**Ecosystem constitution:** `flexgrafik-meta/docs/core/` (upstream — wins on AS-IS truth)

---

## 1) IDENTITY

| | |
|---|---|
| **Domain** | `quietforge.flexgrafik.nl` (legacy: `services.flexgrafik.nl`) |
| **Repo** | `wozniaknorbert95-del/dsaas-quietforge` (active DSaaS tenant) |
| **Role** | QuietForge tenant — company operating systems for SMB |
| **Positioning** | System builder for small businesses — see [`docs/canon/identity.md`](docs/canon/identity.md) |
| **Language** | English (all public B2B assets) |
| **Audience** | ZZP, small BV, professional services + tech/investor via `/results/owner-ecosystem/` |

---

## 2) TECH STACK

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.6 (App Router) |
| React | 19.2.4 |
| TypeScript | strict, `noEmit` |
| Styling | Tailwind CSS v4 (utility-first) |
| Animation | Framer Motion + `prefers-reduced-motion` |
| Icons | Lucide React |
| Email | Nodemailer (SMTP via Cyberfolks: `s34.cyber-folks.pl:465`) |
| Deploy | Vercel static export (`output: 'export'`) |
| Build artifact | `dist/` (not `.next/`) |

---

## 3) DESIGN TOKENS

**Source of truth:** `src/app/globals.css` — CSS custom properties.

**Also read:** [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md) · [`quietforge.css`](src/app/quietforge.css)

**Rule:** No inline styles, no hardcoded colors, no CSS Modules. Tailwind + `var(--color-*)` / `qf-*` classes.

**Intent colors:** `--fx-time`, `--fx-money`, `--fx-order`, `--fx-calm`, `--fx-efficiency` — see [`ux-rules.md`](docs/canons/ux-rules.md) UR-09.

---

## 4) GUARDRAILS (HARD)

1. **`npm run build` must pass before every commit.**
2. **TypeScript strict — zero `any`.** `npm run typecheck` for verification.
3. **One primary CTA above the fold** — see [`strategy-rules.md`](docs/canons/strategy-rules.md) SR-04.
4. **Animations respect `prefers-reduced-motion`.**
5. **Mobile-first.** Tap targets ≥ 44px.
6. **Zero secrets in repo.** Keys in `.env.local` (gitignored).
7. **Deploy:** manual only by the Commander; repository work must not trigger an autonomous production deploy.
8. **OG image for every new route** — `scripts/generate-og.mjs`.
9. **Sitemap** regenerates on build — `scripts/generate-sitemap.mjs`.
10. **Handoff every session** — `docs/operations/handoffs/YYYY-MM-DD-*.md`.
11. **WhatsApp AVG:** opt-in, 90-day retention, delete webhook, privacy before agent launch.
12. **Build fail = PR blocked.** Missing prod env blocks deploy.
13. **Images:** WebP preferred; screenshots max 1600px; lazy below fold.
14. **Form intake:** BookDiscovery + Waitlist POST to `/api/intake` and `/api/waitlist` — SMTP via Nodemailer to `quietforge@flexgrafik.nl`. Honeypot + rate-limit (3/10min/IP). Env `INTAKE_DISABLED=true` kills submissions server-side.

---

## 5) DEPLOY

### Vercel

```bash
# Project: wozniaknorbert95-dels-projects/flexgrafik-services
npx vercel projects ls
npx vercel dist --prod --yes
```

**Env (production):**

| Variable | Environment | Value / status |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Production | `G-LY0E7MW0HF` (property `543331587`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Development | `G-LY0E7MW0HF` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Preview | **Dashboard** — CLI blocked; see [`vercel-ga-preview-env.ps1`](scripts/vercel-ga-preview-env.ps1) |
| `NEXT_PUBLIC_WHATSAPP_URL` | Production | WhatsApp deep link override |
| `SMTP_HOST` | Production + Preview | `s34.cyber-folks.pl` |
| `SMTP_PORT` | Production + Preview | `465` |
| `SMTP_SECURE` | Production + Preview | `true` |
| `SMTP_USER` | Production + Preview | `quietforge@flexgrafik.nl` |
| `SMTP_PASS` | Production + Preview | **Dashboard** — mailbox password (never committed) |
| `INTAKE_FROM` | Production + Preview | `quietforge@flexgrafik.nl` |
| `INTAKE_TO` | Production + Preview | `quietforge@flexgrafik.nl` |
| `INTAKE_DISABLED` | Production + Preview | `false` (set `true` to kill submissions) |

**GA weekly gate:** `npm run ga4:gate` (requires `GOOGLE_APPLICATION_CREDENTIALS` for audit step).

### DNS

- A record `services` → `76.76.21.21` OR CNAME → `cname.vercel-dns.com`
- Verify: `npx vercel domains inspect quietforge.flexgrafik.nl`

---

## 6) POST-DEPLOY VERIFICATION

```bash
curl -sI https://quietforge.flexgrafik.nl/ | head -1
npm run audit:links
npm run lighthouse:ci   # A11y <95 or Perf <85 blocks merge
```

| Checkpoint | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| Mobile 375px | No horizontal scroll |
| OG images | All main routes |

---

## 7) SOURCE OF TRUTH (quick links)

| Topic | Path |
|---|---|
| Knowledge map | `docs/README.md` |
| Vision / direction | `docs/canons/vision-system.md` |
| HARD rules | `docs/canons/*-rules.md` |
| Strategy detail | `docs/strategy/` |
| Content SSoT | `src/content/*.ts` — see `docs/architecture/content-ssot.md` |
| Routes & pricing | `src/lib/constants.ts` |
| Ecosystem meta | `flexgrafik-meta/docs/core/` |
| Handoffs | `docs/operations/handoffs/` |

---

## 8) KEY FILES

| File | Purpose |
|---|---|
| `src/app/globals.css` | Design tokens |
| `src/app/layout.tsx` | Root metadata, JSON-LD |
| `src/app/page.tsx` | Home composition — binding: site-map §2 |
| `src/content/ecosystem.ts` | Modules, repos, home sections |
| `src/content/proof.ts` | Metrics, proof manifest |
| `public/og/*.svg` | OG images |

---

## 9) COMMANDS

| Command | Purpose |
|---|---|
| `npm run build` | Static export to `dist/` |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run audit:links` | Broken link check |
| `npx vercel dist --prod` | Production deploy |

---

*Last updated: 2026-07-15 · Owner: Norbert Wozniak · Next review: quarterly or post-Phase B*
