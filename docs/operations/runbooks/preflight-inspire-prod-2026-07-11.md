---
status: "[PASS]"
title: "Preflight — zzpackage Design Agent prod"
date: "2026-07-11"
url: "https://zzpackage.flexgrafik.nl/voertuigreclame-ontwerp/"
checked_by: "Agent (HTTP fetch + hero copy)"
---

# Preflight prod — voertuigreclame-ontwerp

**Verdict: GO for recording** (API online, correct hero, results section present)

## Checklist

| # | Gate | Expected | Result |
|---|------|----------|--------|
| 1 | Hero headline | „Ontwerp je bus — gratis” | ✅ PASS |
| 2 | Not offline placeholder | No „binnenkort live” | ✅ PASS |
| 3 | Design Agent status | Online indicator | ✅ „ZZPackage Design Agent Online” |
| 4 | Results section | „Jouw 2 ontwerpen” + disclaimer | ✅ PASS |
| 5 | Wizard CTA | „Start in de Wizard →” | ✅ PASS |
| 6 | Fixture ban | Do not use `?da_fixture=results` for „live” | ⚠️ REMINDER |

## Notes

- Page fetched 2026-07-11 — hero and results blocks render on prod HTML.
- Full chat flow not exercised in this preflight (requires browser session). Dowódca validates NL consultant greeting on first message before recording.
- If chat shows offline placeholder: STOP — diagnose jadzia VPS / `FG_DESIGN_AGENT_API_ENABLED` (separate session).

## Recording GO

Proceed with [video script NL](../../strategy/linkedin/drafts/2026-07-10-inspire-video-script-nl.md) and [storyboard](../../strategy/linkedin/drafts/2026-07-10-inspire-video-storyboard.md).
