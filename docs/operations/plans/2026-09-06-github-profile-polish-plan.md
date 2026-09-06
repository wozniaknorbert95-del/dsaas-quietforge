# GitHub Profile Polish Plan

**Date:** 2026-09-06  
**Scope:** `wozniaknorbert95-del` profile, public repository presentation and proof path  
**Prerequisite:** security blockers remain explicit; no public promotion of `HOLD` repositories

## Audit verdict

The profile is now a credible **identity index**, not yet a finished professional proof
portfolio. The first impression is clear and the visual system map is useful. The main
remaining problem is not decoration: the account still exposes several repositories that
are under review, while no repository is approved and pinned as the first technical proof.

### Current scorecard

| Area | State | Verdict |
|---|---|---|
| Identity | Strong | `Norbert Wozniak | QuietForge` and `Conversion Systems Architect` are clear. |
| Buyer path | Strong | QuietForge, Lab and Automation Scan links are visible and valid. |
| Visual hierarchy | Good | The system-map SVG creates a distinctive anchor without badge clutter. |
| Proof | Weak/unfinished | The README explains boundaries but does not yet point to one `PROVEN` public technical artifact. |
| Repository curation | Hold | GitHub's public repository list still shows `HOLD` candidates; no pins are approved. |
| Security trust | Conditional | `jadzia` is private, but its historical Google key alert is unresolved by decision. |
| Maintenance signal | Missing | No `Current work`, release note or dated evidence update is visible above the fold. |
| Mobile/readability | Good with follow-up | The SVG scales, but the README is text-heavy after the first visual block. |

## Findings

### P0 - Do not promote an unapproved proof set

The profile README correctly says public proof repositories are in review. That is honest,
but GitHub still displays five public repositories in the account overview, including
`Flex-vcms` and `portfolio`, both marked `HOLD`. The account must not present these as
finished proof through pins, release announcements or external promotion.

**Decision:** keep zero proof pins until one candidate passes G2/G4. `jadzia` remains
private and excluded while the Google key rotation is deferred.

### P1 - Add one current-work signal

Benchmark profiles make current work visible. The README currently ends with maintainer
and review cadence, but does not answer: “What is being built now?” Add one compact block:

> **Current focus:** turning the Builder's Lab into a verified technical evidence layer;
> public proof follows sanitization, reproducible setup and ownership review.

This must be dated and removed/replaced after the next meaningful proof release.

### P1 - Tighten the first screen

The first screen currently contains identity, methodology, a large diagram and then four
equal CTA links. Keep the diagram, but make the CTA order explicit:

1. `Visit QuietForge` - primary commercial destination;
2. `Explore the Builder's Lab` - primary technical proof;
3. `Book an Automation Scan` - qualification;
4. Move `Proof boundary` into the later trust section.

Do not add badges, follower counters, language charts or contribution widgets.

### P1 - Replace the placeholder proof row

`Public proof repositories | In review` is accurate but visually reads as unfinished.
After the first candidate passes, replace it with exactly one proof card containing:

- outcome and system name;
- proof tier: `PROVEN`, `DEMO` or `PLANNED`;
- reproducible command or walkthrough link;
- what it proves and what it does not prove;
- last verified date.

Until then, keep the current honest HOLD wording rather than inventing a case study.

### P2 - Keep the visual language restrained

The system-map SVG is the right direction: one custom diagram, no generic tech logos and
no fake metrics. Future visual work should add at most:

- one compact proof-card SVG after a real proof is approved;
- one small QuietForge wordmark/monogram if GitHub rendering remains crisp;
- no second hero illustration, animated GIF, stats badges or stock imagery.

## Execution phases

### Polish P0 - Security and visibility gate

- Keep `jadzia` private while Google key rotation is deferred.
- Keep `Flex-vcms`, `portfolio`, `flexgrafik-app` and `dsaas-quietforge` out of pins.
- Re-run secret/dependency/IP review before any proof repository becomes canonical.
- Record the Commander decision if the Google key remains deferred.

### Polish P1 - Profile README v2

- Add the dated `Current focus` block below the system map.
- Reorder CTAs to QuietForge -> Lab -> Scan; move Proof boundary lower.
- Shorten `What I build` to three outcome-led lines.
- Keep ownership, licence and proof boundaries, but remove repeated wording.
- Keep the system-map alt text descriptive and the asset linked to the profile repository.

### Polish P1 - First proof candidate

- Choose exactly one candidate: `portfolio` or a new deliberate sanitized proof repository.
- Give it one business outcome, one reproducible path and one evidence owner.
- Add release/changelog signal and `last verified` date.
- Pin only after buyer, technical, truth and security tests pass.

### Polish P2 - Ongoing maintenance

- Review profile copy monthly during the first quarter.
- Update `Current focus` after each meaningful release.
- Review public repository descriptions/topics quarterly.
- Remove or privatize any repository whose proof boundary becomes unclear.

## Acceptance tests

### Five-second test

The visitor can answer: who is Norbert, who does he build for, and where is the next step?

### Thirty-second test

The visitor can distinguish QuietForge, Builder's Lab, owner-operated reference work and
private platform IP.

### Proof test

The visitor can find one reproducible or inspectable technical proof, or clearly sees why
the first proof is still marked `HOLD`.

### Trust test

No public link implies free code, client ROI, full autonomy or external client results.

### Maintenance test

The profile has a current date/evidence signal and every selected public repository has a
role, proof tier, security boundary, licence decision and review date.

## Next implementation task

The next focused session should implement **Polish P1 - Profile README v2 only**:
copy hierarchy, `Current focus`, CTA order and concise proof boundary. Do not add more
graphics until the first proof candidate is approved.
