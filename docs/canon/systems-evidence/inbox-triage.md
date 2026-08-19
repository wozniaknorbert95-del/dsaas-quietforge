# Evidence — Inbox Triage

Public slug: `/systems/inbox-triage/`  
Status: `PROVEN IN THE LAB`  
Asset: `/systems/inbox-triage-flow.svg` (clean). Lab original `/gratka/inbox-killer-flow.svg` says “Inbox Killer” — not used on the spoke.

| Feature (client) | Internal source | Client phrasing on page | Asset |
|------------------|-----------------|-------------------------|-------|
| OAuth mailbox | `inbox-killer-case-study.ts` stack | Gmail or Microsoft 365 | new SVG |
| Four lanes | `inboxKillerLanes` | Lead / client / invoice / noise | new SVG |
| Draft never silent send | flow steps Draft | A draft. A button. | new SVG |
| Approval gate | flow step Approve | Pending: you decide | new SVG |
| Send log | flow step Send | Who sent what | new SVG |
| Noise override | lanes Noise | Newsletters not with quotes | new SVG |
| One mailbox first | solution copy | Then add the next box | — |
| 142 msgs/scan | `proof.ts` `metrics.msgsPerScan` | Test-environment process run | — |

Composite: Noordzee Supply — not a real client.  
Do not say auto-send. Do not name Jadzia.
