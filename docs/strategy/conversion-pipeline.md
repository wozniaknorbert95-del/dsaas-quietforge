# Conversion Pipeline — User Flow, Navigation & Qualification

**Version:** 3.0  
**Status:** Canonical — post-audit funnel, CTAs, booking logic and recovery states  
**Primary funnel:** Recognition → proof → paid Automation Map → scoped build

---

## 1. Strategic funnel

Quietforge must behave like a productised consulting system, not a contact-form agency.

```text
Visitor
  ↓
Pain recognition
  ↓
Working proof
  ↓
Trust and safety
  ↓
Commercial clarity
  ↓
Paid Automation Map
  ↓
Scoped build / no-build recommendation
```

### Site job by buyer state

| Buyer state | User question | Site job |
|---|---|---|
| Cold | “Is this for my problem?” | Show pains and outcomes in plain language |
| Interested | “Is it real?” | Show live systems, screenshots, case studies |
| Cautious | “Is this safe?” | Show HITL, AVG, EU, no lock-in, logs |
| Price-aware | “Can I afford the first step?” | Show €690 Scan and build ranges clearly |
| Ready | “What happens after I click?” | Paid booking flow with no ambiguity |

---

## 2. CTA tiers

Each viewport section gets **one primary** action.

| Tier | User intent | Label examples | Destination |
|---|---|---|---|
| L1 — Explore | Low commitment | See live systems · View results · Explore architecture | `/results/`, `/results/owner-ecosystem/` |
| L2 — Demo | See it work | Try the wizard · Watch walkthrough | external wizard / video / proof asset |
| L3 — Commit | Start qualification | Book Automation Scan · Pay €690 and pick a slot | `/book-a-scan/` |
| Support | Ask before committing | Ask on WhatsApp | WhatsApp deep link |

**Forbidden:** two filled buttons in one viewport section.

---

## 3. Header CTA

Global header CTA is always:

```text
Book Automation Map → /book-discovery/
```

Header nav provides L1 proof access via:

```text
Systems & Results → /results/
```

Do not swap the header CTA by traffic type until analytics prove the need.

---

## 4. Hero CTA rules

### Desktop

Primary: `Book Automation Map`  
Secondary: `See live systems`  
Tertiary text: `Ask on WhatsApp`

### Mobile

Before proof: primary remains `Book Automation Map`.  
After honesty gate: sticky bottom can make `Ask on WhatsApp` primary and `Book Automation Map` secondary.

Reason: Dutch SMB buyers often prefer async chat once they understand the offer.

---

## 5. Book Discovery — paid Automation Map

This is the highest-priority conversion surface.

### Professional target flow

```text
1. User understands €690 value
2. User sees what is included
3. User pays €690
4. User picks a slot
5. User completes intake
6. Confirmation email explains next steps
```

### Required copy promise

If the page says “Pay & pick a slot”, the UI must actually support payment and slot selection.

### If checkout/calendar is not live

Use this fallback language instead:

- Page title: `Request your Automation Scan slot — €690, credited`
- Primary CTA: `Request a paid Scan slot`
- Form submit: `Request my Automation Map slot`
- Microcopy: `If the fit is right, I’ll send a payment link and available times within 24 hours.`

Do **not** use `Send enquiry` as the main submit label on the paid Map page.

### Required form fields

1. Name
2. Business name
3. Email
4. Website/link
5. Biggest pain
6. Budget range or “not sure yet”
7. Preferred time zone / availability
8. Optional notes

### Required proof near form

- Automation Map sample download
- 3 bullets: what user receives
- Credit line: `The €690 fee is credited toward your first build.`
- No-pressure line: `If there is nothing worth automating, you keep the Map and stop there.`

---

## 6. Primary user flows

### Flow A — Cold visitor

```text
Home Hero
  → Pain router
  → Spearhead proof or Results card
  → Trust / pricing
  → Book Automation Map
```

### Flow B — Problem-aware visitor

```text
Solutions hub
  → Matching solution page
  → Linked case study
  → Pricing clarity
  → Book Automation Map
```

### Flow C — Proof-first visitor

```text
Results hub
  → Case study
  → Owner ecosystem / safety proof
  → Book Automation Map
```

### Flow D — Price shopper

```text
Pricing
  → Map/Build/Run explanation
  → Sample Map
  → Book Automation Map
```

### Flow E — Mobile chat-first visitor

```text
Home / Solution page on mobile
  → Scroll past proof
  → Sticky WhatsApp CTA
  → 6–8 qualification questions
  → brief to Norbert
  → paid Map or no-fit redirect
```

---

## 7. Product story flow

Use this for diagrams and proof pages, not as nav labels:

```text
Visitor → Pain route → Wizard / Assistant → Qualification → Human approval → Quote → Client
```

For animation:

```text
Lead → Wizard → AI draft → Human gate → Quote → Sale
```

All labels must be plain language. Technical names are secondary.

---

## 8. Pricing and qualification gates

### Public commercial source of truth

| Offer | Public price |
|---|---:|
| Automation Map | €690 credited |
| Inbox Killer | €1,200–€4,800 |
| Web Upgrade | €1,800–€5,500 |
| Sales Funnel / Wizard Cash Engine | €2,400–€6,500 |
| Lead Magnet Game | €2,200–€6,500 |
| Ecosystem / Multi-System Build | €3,490–€12,000 |
| Managed Automation | €349–€890/mo |

### Budget language

If budget is below project range:

> Start with the Automation Map. You will know what is worth building before committing to a larger project.

If budget is below €199:

> Start with the free guide or blog content. The Automation Map is paid strategic work, not a free sales call.

Do not promise a strategy call to unqualified traffic.

---

## 9. Failure modes and recovery

| Failure | User sees | Recovery |
|---|---|---|
| Payment unavailable | “Payment is temporarily unavailable.” | WhatsApp + email + request slot form |
| Calendar full | “Next slots are full.” | Waitlist + WhatsApp |
| Wizard down | “Wizard is temporarily unavailable.” | Results page + WhatsApp |
| WhatsApp offline | Offline notice | Email + `/book-discovery/` |
| User not fit | Honest no-fit message | Guide, blog, or referral suggestion |

Every broken flow must have one obvious next step.

---

## 10. Measurement

### 10.1 Events (GA4 — Consent Mode v2)

Analytics load `denied` by default; only `analytics_storage` becomes `granted` after explicit consent. All events below fire through `trackEvent` (`src/lib/analytics.ts`) → `gaEvent` (`src/lib/gtag.ts`).

| Event | Trigger |
|---|---|
| `cta_book_map_click` | Any Book Automation Map click |
| `cta_whatsapp_click` | WhatsApp click |
| `payment_link_click` | WhatsApp **payment** fast-path click (`WHATSAPP.bookMapUrl`, UTM-tagged) — manual-payment funnel step |
| `sample_scan_download` | Automation Map sample PDF download (replaces `sample_map_download`) |
| `sample_map_download` | Legacy alias — keep firing until GA4 data is clean |
| `wizard_demo_click` | External wizard click |
| `case_study_open` | Results card click |
| `pricing_view` | Pricing section/page view |
| `pricing_variant_click` | Build/Care variant CTA click (`value` = Core/Scale/Command · Keep/Grow/Unlock) |
| `reference_program_click` | Reference-spot CTA click |
| `system_page_view` | System detail page view (`slug` param) |
| `book_discovery_view` | Book Discovery page view |
| `book_payment_start` | Payment step begins (manual log; automatic when Mollie lands) |
| `book_payment_complete` | Payment completed (manual log; automatic when Mollie lands) |
| `intake_submit` | Intake form completed |
| `form_error` | Form failed validation/server (`reason` param: consent_missing / send_failed / network_error) |

### 10.2 Funnel

```text
visit → system_page_view → pricing_view → book_discovery_view
      → intake_submit | payment_link_click
      → book_payment_start → book_payment_complete
      → scan_delivered → build_signed
```

### 10.3 Looker Studio dashboard (weekly)

Seven cards, source = GA4 property (Consent Mode v2):

1. **Leads per week** — `intake_submit` + `payment_link_click`, split by source/medium.
2. **Funnel conversion** — view → `book_discovery_view` → `intake_submit`/`payment_link_click`.
3. **Sources/medium** — sessions vs leads by source.
4. **Top systems & intents** — `system_page_view` by slug; intent chips (via `?intent=` on home).
5. **CTA CTR** — hero, sticky, final, header (`cta_book_map_click` by location).
6. **Engagement** — bounce, engagement time, scroll depth by page.
7. **Consent rate** — sessions with `analytics_storage=granted` share (GA4 consent report).

Build steps: GA4 property → export to Looker Studio (native connector) → one page, 7 scorecards/charts, weekly email schedule to `quietforge@flexgrafik.nl`.

---

## 11. Review checklist

- [ ] One primary CTA per viewport.
- [ ] Paid Map page does not look like generic contact.
- [ ] Pricing is consistent everywhere.
- [ ] Sales Funnel and Web Upgrade are not swapped.
- [ ] Proof appears before repeated L3 pressure.
- [ ] WhatsApp is a support/async qualification path, not a random duplicate CTA.
- [ ] Draft/pilot pages are not public unless complete.

---

*Updated post-audit: 2026-06-25*
