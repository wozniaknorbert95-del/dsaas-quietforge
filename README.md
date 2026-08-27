# dsaas-quietforge

Tenant: QuietForge (quietforge.flexgrafik.nl) — this repository is the tenant instance and the operating repository that backs the public site.

## Elevator pitch

QuietForge is an autonomous operating system for small teams (SMEs). This tenant contains content, intake configuration, and the deployment artifacts that demonstrate a live QuietForge instance.

## What this repo proves

- Live tenant content and tenant-config used to power quietforge.flexgrafik.nl
- Knowledge map, governance pointers and handoffs (docs/)
- Demo-ready deploy and quick-start for evaluators

## Quick start (developer)

```bash
# install
npm ci
# typecheck, lint, build
npm run typecheck
npm run lint
npm run build
```

## Business outcome

We deliver Company Brains and multi-agent orchestration that reduce administrative overhead for small teams. Typical engagements start with a professional site & tenant scan (free pilot offers available on the public site) and deliver measurable hours-saved per month.

## How this maps to the public site

- Site: https://quietforge.flexgrafik.nl/
- This repo: tenant-config, docs/Knowledge Map and content SSoT
- Platform canonical: see `dsaas-platform-main` (platform policies & runtime)

## Security & responsible disclosure

See SECURITY.md for reporting sensitive findings and scanning policy.

---

Owner: Norbert Wozniak — QuietForge
