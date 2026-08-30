# UI/UX Principles — Quietforge Product-Consulting Standard

**Version:** 3.0  
**Status:** Canonical — post-audit layout, hierarchy, density, motion and mobile rules  
**Reference quality:** Linear clarity · Vercel proof culture · Retool utility · IBM/Google-level information hierarchy

---

## 1. Design intent

Quietforge must feel like a product company and senior systems architect, not a freelancer portfolio.

The interface should communicate:

1. this is real,
2. this is controlled,
3. this is safe,
4. this can improve my business,
5. I know what to do next.

---

## 2. UX principle: buyer cognition first

The buyer is not buying “8 repos”. The buyer is buying relief from a business leak.

Therefore:

```text
Pain → outcome → proof → architecture
```

is usually stronger than:

```text
Architecture → repos → proof → pain
```

Deep architecture is valuable, but it must be progressively disclosed.

---

## 3. Visual hierarchy

### Page structure

1. One H1 per page.
2. Eyebrow before H2: `// CATEGORY`.
3. Lead paragraph max 2 sentences.
4. Proof adjacent to claim.
5. One primary action per viewport.
6. Architecture diagrams after user understands the business value.

### Section anatomy

```text
section
  eyebrow
  H2 outcome/problem
  lead
  content: cards / diagram / proof
  effect line or trust note
  CTA row: max one primary + one secondary/text
```

---

## 4. Density rules

Quietforge uses a dense terminal/developer-tool aesthetic, but density must be controlled.

### Per section maximum

| Element | Max per section |
|---|---:|
| Primary CTA | 1 |
| Secondary CTA | 1 |
| Large diagram | 1 |
| Metrics | 4 visible before expansion |
| Table rows on home | 4 visible before expansion |
| Badges per card | 3 |
| Technical acronyms before explanation | 0 |

### Progressive disclosure

Use:

- `View full architecture`
- `Expand all systems`
- `See case study`
- `Download diagram`

Do not expose every system detail on home by default.

---

## 5. Navigation UX

### Header

- Sticky with blurred dark backdrop and thin border.
- Max 5 nav links + 1 CTA.
- CTA: `Book Automation Map`.
- Solutions dropdown uses corrected package names and prices.
- No second filled CTA in header.

### Mobile

- Full-screen menu or clean sheet.
- Tap targets min 44px.
- CTA repeated at bottom.
- Sticky CTA appears only after proof/honesty gate.
- No horizontal scroll tables.

---

## 6. Home composition

Home must follow:

1. Hero
2. Pain router
3. Compact metrics/proof strip
4. Spearhead live proof
5. Honesty gate
6. Results teaser
7. System router
8. LOS teaser
9. Governance proof
10. Method
11. Trust
12. Pricing
13. Final CTA

### Spearhead rule

Only one section on home gets full flagship treatment: **Jadzia — Operations Command Layer** (site-map §3 v5.0).

VCMS is the second proof (trust strip). Wizard Cash Engine + Design Intake are compact secondary proof — not flagship.

---

## 7. Cards

### Pain card

Required fields:

1. Plain-language pain
2. Cost of problem
3. System fix
4. One CTA

### Solution card

Required fields:

1. Problem
2. System
3. Outcome
4. Starting range
5. Link

### Result card

Required fields:

1. Problem
2. System
3. Effect
4. Status label
5. Link

### Repo/system card

Order:

1. Business outcome
2. System name
3. LOS layer / repo name
4. Proof link

---

## 8. Tables and pricing

Tables are allowed on desktop when they improve clarity.

On mobile:

- pricing tables become cards,
- Built vs Planned becomes compact status cards or accordion,
- large comparison tables must not cause horizontal scroll unless unavoidable.

Price fragments must be sourced from one content object. Never hardcode conflicting prices across components.

---

## 9. Proof and media

Allowed proof assets:

- real screenshots,
- SVG diagrams,
- terminal mocks that describe system behaviour,
- downloadable artefacts,
- labelled demo fixtures.

Forbidden:

- stock photos,
- unfinished video placeholders on public money pages,
- fake client logos,
- unlabelled demo screenshots.

If video is not ready, use a deliberate static proof block:

```text
Written walkthrough
Architecture diagram
Proof link
```

Do not write “Video is in production” as the main content of a public route.

---

## 10. Motion

Motion must teach the funnel or clarify state.

Allowed:

- fade/slide reveal,
- diagram step reveal,
- subtle terminal cursor if non-distracting,
- hover border brightening.

Forbidden:

- decorative parallax,
- infinite loops near CTAs,
- motion without `prefers-reduced-motion` fallback.

---

## 11. Accessibility

Targets:

- Lighthouse Accessibility ≥ 95.
- Visible focus state for all links/buttons/cards.
- WCAG AA contrast for text/buttons.
- Semantic landmarks: header/main/footer/section.
- Diagrams have alt text and adjacent text summary.
- All interactive cards keyboard-accessible.

---

## 12. Form UX

### Book Discovery form

The form must match the commercial promise.

If paid checkout is live:

- button: `Pay €690 and pick a slot`
- payment step visible,
- slot selection visible,
- intake after payment or before payment, but clearly labelled.

If manual fit check:

- button: `Request my Automation Map slot`
- microcopy explains payment link follows after fit check.

Never use `Send enquiry` as the main submit on the paid Map page.

---

## 13. Enterprise polish checklist

Before a page is “done”:

- [ ] One decision per section.
- [ ] One primary CTA per viewport.
- [ ] Business language before system names.
- [ ] Proof sits beside the claim.
- [ ] Pricing matches canonical matrix.
- [ ] Mobile cards replace dense tables.
- [ ] No unfinished placeholders.
- [ ] Status labels are honest.
- [ ] Focus, reduced motion and alt text are verified.

---

*Updated post-audit: 2026-06-25*
