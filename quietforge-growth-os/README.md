# Quietforge Growth OS

This is the B2B Marketing Engine and Operational Architecture for **Quietforge** (`https://quietforge.flexgrafik.nl`), built using **FLEXGRAFIK** (`https://flexgrafik.nl`) as its core case study.

## Directory Structure

```
/quietforge-growth-os
├── README.md                           # Main engineering documentation
├── c1-leak-patchers/
│   └── patchers.ttl                    # Semantic definition of our 5 leak-patching systems (Turtle)
├── c2-target-matrix/
│   ├── prospects.ttl                   # Identification of Dutch SMB/ZZP target niches and leaks (Turtle)
│   └── hot-matches.ttl                 # Hot mapping connecting targets, leaks, and patchers (Turtle)
├── templates/
│   ├── brand-voice.json                # "Cwany Cheater" archetype programmable LLM parameters
│   └── prompt-templates/
│       └── linkedin_generator.json     # Template for direct attack LinkedIn copywriting
└── content-engine/
    ├── opa-policies/
    │   └── marketing_guardrails.rego   # OPA policy implementing CPA/margin economic guardrail
    └── proposals/
        ├── post_1_linkedin_inbox.md    # LinkedIn Post: The Inbox Killer for Dutch Agencies
        ├── post_2_linkedin_wizard.md   # LinkedIn Post: Wizard Cash Engine for Dutch Freelancers
        ├── post_3_linkedin_game.md     # LinkedIn Post: Lead Magnet Game for Dutch Agencies
        ├── post_4_linkedin_branding.md  # LinkedIn Post: Car Wrapping Automation Engine
        ├── post_5_linkedin_platform.md  # LinkedIn Post: Chaos of Unconnected Software Tools
        ├── post_6_fb_agencies.md       # Facebook Post: Stop Working on Rotterdam Terraces
        ├── post_7_fb_wrapping.md       # Facebook Post: Stop Wasting Vinyl and Time
        ├── post_8_fb_crafts.md         # Facebook Post: Less Paperwork, More Cold Beers
        ├── script_9_yt_intake.md       # YouTube Short Script: Manual Quoting Smasher
        └── script_10_yt_nothing.md     # YouTube Short Script: "Robię Nic, Bo Mogę"
```

## System Definitions & Tech Stacks (c1-leak-patchers)

Quietforge operates on 5 core conversion and back-office systems, represented semantically in `patchers.ttl`:

1. **Wizard Cash Engine (`qf:WizardCashEngine` - zzpackage):** Fully automated quoting and pre-payment intake.
   - *Tech Stack:* Next.js 16, React 19, Tailwind v4, Mollie SDK, Calendly API.
   - *Time Saving:* 10 hours manual quoting reduced to a 10-second client-side checkout.
2. **Inbox Killer (`qf:InboxKiller`):** Intelligent triage, lead qualification, and automated drafting.
   - *Tech Stack:* Next.js, OpenAI API, Tailwind v4, Vercel.
   - *Time Saving:* 15 hours manual email management reduced to a 2-minute automated review.
3. **Jadzia COI Backend (`qf:JadziaCOI`):** Back-office orchestrator for contract drafting and KvK lookup.
   - *Tech Stack:* Next.js, Jadzia Engine, Node.js, Webhooks.
   - *Time Saving:* 20 hours manual admin reduced to a 30-second webhook automation.
4. **Lead Magnet Game (`qf:LeadMagnetGame`):** Highly qualified gamified lead generation.
   - *Tech Stack:* React 19, Tailwind v4, GA4 Custom Events, Next.js.
   - *Time Saving:* 8 hours of cold outreach pitches reduced to 15 seconds interactive qualification.
5. **VCMS Governance Scan (`qf:VcmsScan`):** System health scan and automated conflict resolver.
   - *Tech Stack:* Next.js, Flex-vcms Assistant, Node.js.
   - *Time Saving:* 5 hours manual dependency and site health checking reduced to 5 seconds.

## Open Policy Agent Guardrail (OPA)

To safeguard marketing spending, the `marketing_guardrails.rego` policy enforces an immutable financial constraint:

$$\text{CPA}_{\text{target}} < 0.40 \times \text{Gross Margin}$$

This policy runs on our automated ad networks, blocking campaigns programmatically if target acquisition costs exceed 40% of the services gross margins.

## Brand Voice - "Cwany Cheater" (templates/brand-voice.json)

The tone represents our rogue contractor identity:
- **Time as Currency:** Wasting hours sitting inside a stuffy Rotterdam office on Friday afternoons doing manual fakturowanie instead of sitting on a terrace drinking a Heineken with friends is a financial and emotional tragedy.
- **Moje systemy działają w tle. Robię nic, bo mogę.**
- **Zero AI-isms:** Highly pragmatic, direct, unfiltered English peppered with real Dutch business terms (`KVK`, `BTW`, `Belastingdienst`, `offerte`, `administratie`).
