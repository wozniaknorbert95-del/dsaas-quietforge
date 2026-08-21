# AGENTS — dsaas-quietforge

## Projekt
Standalone B2B SMB Conversion Systems Portfolio — FlexGrafik Digital (Quietforge).
Positioning: **Conversion Systems Architect** — see knowledge canons below.
Stack: Next.js 16.2.6, React 19, TypeScript, Tailwind v4, Framer Motion, Lucide React.

## Knowledge read order (mandatory before page/component work)

0. [`docs/ROADMAP.md`](docs/ROADMAP.md) — business goals SoT („Musimy"); KOKPIT = other repo
1. [`docs/README.md`](docs/README.md) — knowledge map + authority layers
2. [`docs/canons/vision-system.md`](docs/canons/vision-system.md) — direction
3. [`docs/canons/strategy-rules.md`](docs/canons/strategy-rules.md) — IA / funnel HARD rules
4. [`docs/canons/marketing-rules.md`](docs/canons/marketing-rules.md) — copy HARD rules
5. [`docs/strategy/site-map.md`](docs/strategy/site-map.md) — home §2 LOCKED, 8-repo map
6. [`docs/strategy/conversion-pipeline.md`](docs/strategy/conversion-pipeline.md) — CTA tiers
7. [`docs/strategy/marketing-strategy.md`](docs/strategy/marketing-strategy.md) — positioning detail
8. [`docs/strategy/ui-ux-principles.md`](docs/strategy/ui-ux-principles.md) — UI detail
9. [`brain.md`](brain.md) — tech stack, deploy, guardrails
10. [`docs/operations/SESSION-ANCHOR.md`](docs/operations/SESSION-ANCHOR.md) — live session pointer

**Outbound / LinkedIn add:** [`docs/strategy/gtm/README.md`](docs/strategy/gtm/README.md) → [`gtm/audits/`](docs/strategy/gtm/audits/linkedin-audit-2026-06-29.md) for profile baseline

**UI add:** [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md) + [`docs/canons/ux-rules.md`](docs/canons/ux-rules.md)  
**Proof add:** [`docs/canons/proof-rules.md`](docs/canons/proof-rules.md) + `src/content/proof.ts`  
**Ecosystem truth:** [`docs/architecture/authority-chain.md`](docs/architecture/authority-chain.md) + `flexgrafik-meta/docs/core/`

**Ops / analytics:** [`docs/canons/ops-rules.md`](docs/canons/ops-rules.md) + [`docs/architecture/ga4-property-map.md`](docs/architecture/ga4-property-map.md)

**Content sources:** `src/content/ecosystem.ts`, `src/content/proof.ts`, `src/content/conversion-copy.ts`

**Anti-chaos:** Zmiana `page.tsx` (home) = aktualizacja `site-map.md` §2 w tej samej sesji.  
**Rule change:** HARD rule edit in `docs/canons/` = update relevant skill same session.

Visual implementation: `DESIGN-SYSTEM.md` + `src/app/globals.css`. Project memory: `brain.md`.

## Workflow
- Hermes = orchestrator (planuje, deleguje, weryfikuje)
- OpenCode = executor (implementuje komponenty, pages)
- Deploy: wyłącznie ręczny krok Dowódcy; agent nie uruchamia produkcji

## Zasady
1. Jeden komponent per sesja OpenCode — nie mega-diffy. Zmiany muszą być zgodne ze strategy canon. **Batch mode:** max 3 sekcje/sesja z build gate między.
2. TypeScript strict — zero `any`.
3. Tailwind utility-first — **max 8 utility classes per element**; przekrocz → wyciągnij do `qf-*` w quietforge.css.
4. Dark theme default — CSS vars z `globals.css`.
5. Wszystkie animacje respektują `prefers-reduced-motion`.
6. Mobile-first responsive.
7. Zero secrets w plikach — `.env.local` dla kluczy (gitignored).
8. Po każdej sesji: `npm run build` musi przejść bez błędów.
9. OG image dla każdej nowej route.
10. Sitemap + robots.txt aktualizowane przy nowych stronach (sitemap via build script).
11. **JSON-LD:** Root layout — `Organization` + `Person` (Norbert Wozniak, founder, quietforge.flexgrafik.nl) + existing `WebSite`.

## Struktura
```
src/
  app/          — Next.js App Router pages
  components/   — React components (ui/ + feature components)
docs/
  canons/       — vision + HARD rules
  strategy/     — detailed marketing canon
  architecture/ — bridges to meta + content SSoT
  operations/   — SESSION-ANCHOR + handoffs
  archive/      — audits, plans, legacy (do not load by default)
public/
  og/           — Open Graph images (1200×630 SVG)
```

## Design tokens
Źródło prawdy: `src/app/globals.css` — CSS custom properties.
Nie duplikuj wartości. Importuj z tokenów.

**Globalne Kolory Korzyści (Intent Colors):**
- `--fx-time` (Czerwony) - Oszczędność czasu
- `--fx-money` (Zielony) - Przychody / zysk
- `--fx-order` (Niebieski) - Porządek i systemy
- `--fx-calm` (Żółty) - Mniej stresu i chaosu
- `--fx-efficiency` (Fiolet) - Efektywność zespołu

Tailwind v4: dostępne jako klasy np. `text-fx-money`, `bg-fx-time`.
Akcenty per repo są ładowane via atrybut `data-app="nazwa-repo"` w sekcji `<body>`.

## Testy
- `npm run build` — wymagany przed każdym commitem
- TypeScript: `npm run typecheck`

## Handoff
Każda sesja OpenCode kończy się plikiem `docs/operations/handoffs/YYYY-MM-DD-[feature].md`.
