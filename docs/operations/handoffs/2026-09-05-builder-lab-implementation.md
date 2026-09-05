# Handoff - Builder's Lab implementation (2026-09-05)

**Repo:** dsaas-quietforge · **Build:** `npm run build` passed (57 pages) · **Production:** deployed

**Release commits:** `b9a2561`, `258cc91`, `60d63ef`, `6c77ccd` · **Deployment:** `5ywfqFGtFrB4VBqSwNyUgUnW4LsL`

## Cel / Goal

Implement the approved Builder's Lab plan for `quietforge.flexgrafik.nl`: show the build path from FlexGrafik public surfaces to the QuietForge tenant and dSaaS platform without presenting FlexGrafik as an external client case.

## Co zrobiono / What changed

- Added canonical `/lab/` route with metadata, canonical URL, CollectionPage/ItemList JSON-LD and Builder's Lab OG image.
- Added nine-stage interactive timeline with deep-link hashes, keyboard-accessible buttons and reduced-motion-safe existing section behavior.
- Added public test bench with verified-public, private-reference and fallback states.
- Added system connection path, dSaaS platform chapter, tenant boundary and ownership/handover wording.
- Added dedicated `src/content/lab.ts` manifest instead of extending the nine-system catalogue.
- Updated FlexGrafik wording across home, About and Proof from `paused lab` to owner-operated reference business/build laboratory.
- Updated active IA/canon, conversion pipeline, footer, About/Proof entry points and legacy owner-ecosystem redirect target.
- Added `scripts/audit-lab-smoke.mjs` and `npm run audit:lab`.
- Removed public operational screenshots containing token fields, local paths or tenant context; replaced them with `private-reference.svg` and sanitized diagrams.
- Removed Mission Control/API health links from legacy public proof surfaces and changed the public platform wording to `Tenant Platform Core`.
- Synchronized active CTA rules and `strategy-check` with `/book-a-scan/` and the current site map.
- GitHub profile and repository changes remain deferred until the website passes post-deploy verification.
- The release was committed, pushed to `origin/main` and deployed through the existing `flexgrafik-services` Vercel project.

## Pliki / Files

| File | Action |
|---|---|
| `src/app/lab/page.tsx` | new Builder's Lab route |
| `src/components/lab/LabTimeline.tsx` | new accessible timeline |
| `src/components/lab/LabEvidenceBench.tsx` | new test bench and evidence states |
| `src/components/lab/LabPlatformChapter.tsx` | new platform boundary section |
| `src/content/lab.ts` | new Lab content manifest |
| `src/app/globals.css` | new `qf-lab-*` styles |
| `src/lib/constants.ts` | `/lab/`, external reference URLs and legacy route targets |
| `src/lib/navigation.ts` | footer Builder's Lab link |
| `src/lib/analytics.ts` | Lab interaction event types |
| `src/content/conversion-copy.ts` | FlexGrafik and About wording sync |
| `src/content/index.ts` | Lab manifest export |
| `src/app/about/page.tsx` | Lab bridge and updated metadata |
| `src/app/proof/page.tsx` | Builder's Lab proof link |
| `src/app/page.tsx` | stale paused-lab FAQ wording corrected |
| `next.config.ts` | `/results/owner-ecosystem` redirect target changed to `/lab/` |
| `docs/canon/site-map.md` | `/lab/`, R7 reference-business rule and status vocabulary |
| `docs/strategy/conversion-pipeline.md` | `/lab/` as L1 reference proof |
| `scripts/generate-sitemap.mjs` | `/lab/` route and proof priority |
| `public/og/lab.svg` | new route OG image |
| `public/sitemap.xml` | regenerated, 28 routes |
| `scripts/audit-lab-smoke.mjs` | new route smoke test |
| `package.json` | `audit:lab` script |
| `public/gratka/private-reference.svg` | sanitized private-reference fallback |
| `public/gratka/jadzia-commander-home.png` | removed sensitive public screenshot |
| `public/gratka/jadzia-commander-data-health.png` | removed sensitive public screenshot |
| `public/gratka/agent-os-mission-control.png` | removed sensitive public screenshot |
| `docs/operations/SESSION-ANCHOR.md` | current session pointer |

## Weryfikacja / Verification

```text
npm run typecheck                    PASS
npm run build                        PASS (57 pages)
npx eslint <changed files>           PASS
npm run audit:lab                    PASS
  - h1: 1
  - milestones: 9
  - timeline interaction: QuietForge Tenant selected
  - footer Lab link: present
  - mobile horizontal overflow: false
  - console errors: 0
metadata/OG/JSON-LD/sitemap          PASS (local production server)
legacy sensitive assets               404; sanitized fallback 200
```

Known baseline limitations:

- Full `npm run lint` passes with 10 non-blocking warnings in archive/legacy scripts and image/script guidance.
- `audit:navigation` and `audit:menu-footer` were synchronized with the active header, home markers and Builder's Lab contract; both pass against the local production server.
- Next dev hot reload reports an existing Tailwind CSS parser issue around generated `var(--qf-fs-*)`; the production build and local production server render `/lab/` successfully.

## Post-deploy smoke (Dowodca)

1. Open `https://quietforge.flexgrafik.nl/lab/` and confirm the H1, honesty panel and nine milestones.
2. Select stage 09 on desktop and mobile; confirm `QuietForge Tenant` appears without reload.
3. Test FlexGrafik, ZZPackage, Wizard, game and INSPIRE links manually.
4. Confirm private Jadzia/Mission Control cards do not expose internal URLs or PII.
5. Confirm `/results/owner-ecosystem/` redirects to `/lab/`.
6. Inspect `/og/lab.svg`, canonical metadata, JSON-LD and `/sitemap.xml` in production.

## Następny krok / Next steps

1. Commander performs post-deploy smoke and approves the public wording.
2. Run the evidence registry review for Jadzia, Mission Control and dSaaS platform status.
3. Repair or replace stale navigation/menu-footer audits in a separate maintenance task.
4. Only after the website passes post-deploy verification, prepare the separate GitHub profile and repository plan.

## Release command used (Commander-authorized)

After reviewing `git show --stat b9a2561`:

```powershell
git push origin main
npx vercel --prod --yes --scope wozniaknorbert95-dels-projects
```

The project uses the native Next.js build. The historical `npx vercel dist --prod --yes` command was incorrect because this repo no longer produces `dist/`.

## Post-deploy command smoke

```powershell
curl.exe -sI https://quietforge.flexgrafik.nl/lab/
curl.exe -sI https://quietforge.flexgrafik.nl/og/lab.svg
curl.exe -sI https://quietforge.flexgrafik.nl/sitemap.xml
curl.exe -sI https://quietforge.flexgrafik.nl/results/owner-ecosystem/
```

Production result: `/lab/`, OG and sitemap return 200; the legacy owner-ecosystem route redirects to `/lab/`; no public request targets Mission Control or its health endpoint; GA4 regional collection is allowed by CSP.

Final production verification: navigation PASS, menu/footer PASS, Builder's Lab PASS, console errors 0, mobile horizontal overflow false, canonical/OG/JSON-LD PASS, sensitive legacy assets 404, private-reference fallback 200.

The broken-link checker reports LinkedIn `HTTP_999`; this is LinkedIn anti-bot behavior, not a QuietForge route failure. All internal routes and assets pass.
