---
status: "[ACTIVE]"
title: "GA4 weekly LI→Map attribution rhythm"
owner: "Norbert Wozniak"
updated: "2026-08-02"
classification: "L4 — GTM B5"
property: "Quietforge 543331587 · G-LY0E7MW0HF"
---

# GA4 weekly attribution rhythm

**Goal:** Every Monday, know if LinkedIn drives Map funnel — without manual GA4 UI digging.

---

## Property (canon)

| Field | Value |
|-------|-------|
| Display name | Quietforge |
| Property ID | `543331587` |
| Measurement ID | `G-LY0E7MW0HF` |
| Domain | quietforge.flexgrafik.nl |

See [ga4-property-map.md](../../architecture/ga4-property-map.md).

---

## Weekly ritual (15 min Commander + agent)

| Day | Who | Action |
|-----|-----|--------|
| **Monday 09:00** | Agent | `npm run ga4:weekly` |
| Monday | Commander | Read JSON artefact, 1 decision |
| After LI publish | Agent | Note `utm_campaign` in calendar |

---

## Command

```bash
npm run ga4:weekly
```

Writes: `docs/operations/artefacts/ga4-weekly-{YYYY-MM-DD}.json`

Requires: Application Default Credentials or service account with GA4 Data API (same as existing ga4 scripts).

---

## Report sections

1. **Sessions by source/medium** (28d rolling) — highlight `linkedin / organic`
2. **Map funnel** — `book_discovery_view` → `cta_book_map_click` → `intake_submit`
3. **Top campaigns** — `sessionCampaignName` containing `inspire`, `featured`, `objection`
4. **Delta vs prior week** — if prior JSON exists

---

## Decision rules

| Signal | Action |
|--------|--------|
| LI sessions = 0 after 2+ posts | Check first comment UTMs + Featured links |
| LI sessions > 0, Map views = 0 | Landing/mobile friction — UX audit |
| Map views > 0, submits = 0 | Form/WhatsApp path — check intake |
| Campaign X highest LI traffic | Double down pillar in calendar |

---

## Integration with ops rhythm

Add to weekly VCMS scan or SESSION-ANCHOR review:

```markdown
## GA4 gate (week of YYYY-MM-DD)
- LI sessions: N
- book_discovery_view: N
- intake_submit: N
- Decision: ...
```

---

## 90-day baseline (2026-08-02)

From marketing audit:

| Metric | 30d value |
|--------|-----------|
| linkedin sessions | **0** |
| facebook referral | ~26 |
| direct | 36 |
| book_discovery_view | 3 |
| intake_submit | 0 |

**Success:** ≥1 `intake_submit` with `utm_source=linkedin` within 90 days.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Script auth error | `gcloud auth application-default login` |
| Wrong property | Verify `GA4_PROPERTY_ID=543331587` in env |
| Events missing | Check GTM/gtag on book-discovery page |
| LinkedIn in-app browser | Use `utm_medium=organic` consistently |
