import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import { ROUTES, SITE_URL, WHATSAPP } from '@/lib/constants';
import { PRICING_NUMBERS, formatRange } from '@/content/pricing';

export const metadata: Metadata = {
  title: 'ZZP Profile Boost — LinkedIn, Facebook & Google Business for ZZP in NL | QuietForge',
  description:
    'For Polish ZZP in Netherlands: LinkedIn that supports €65/h, Facebook Autopilot saves 10h/month, Google Business that converts views to calls. 48h system setup, founder-supervised, no monthly trap. DEMO case based on typical ZZP.',
  openGraph: {
    title: 'ZZP Profile Boost — 3 Profiles That Turn Into Calls | QuietForge',
    description:
      'LinkedIn optimized for NL search, Facebook automation: your site photos → AI draft → calendar, Google Business Map Pack machine. Built by systems, not monthly agency.',
    url: `${SITE_URL}/solutions/zzp-profile-boost`,
    images: [
      {
        url: '/og/solutions-zzp-boost.svg',
        width: 1200,
        height: 630,
        alt: 'ZZP Profile Boost - LinkedIn, Facebook, Google Business',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZZP Profile Boost - QuietForge',
    description: '3 profiles. One system. More calls. Setup in 48h, founder-supervised.',
  },
};

const pricingBlocks = [
  {
    id: 'linkedin',
    name: 'LinkedIn Pack',
    intent: 'money',
    tag: 'From €35/h → €65/h perception',
    tagPl: 'Z €35/h na €65/h — ta sama robota, inna prezentacja',
    problemEn: 'Empty headline "ZZP-er", Services blank, 0 projects — client checks and chooses competitor who looks like specialist',
    problemPl: 'Nagłówek "ZZP-er", puste Services, 0 projektów — klient sprawdza i wybiera konkurenta',
    solutionEn: 'Headline SEO NL + About selling + Services 5-27 with NL descriptions + Projects from your site photos + Skills extracted + 90d content plan',
    deliverablesEn: [
      'Headline & About optimized for "elektricien Den Haag ZZP", "loodgieter spoed"',
      'Services section filled (5-27) with NL descriptions that trigger "Request service"',
      'Projects: your photos → case studies (problem → fix → result)',
      'Skills AI-detected (example: groepenkast vervangen, NEN1010, vloerverwarming)',
      '90 days content plan — 2 posts/week, 15 min/week, templates',
    ],
    range: formatRange(PRICING_NUMBERS.zzpLinkedIn.from, PRICING_NUMBERS.zzpLinkedIn.to),
    typical: 'Most ZZP with 15 photos: €690 • with 40 photos+video: €990',
    time: '48h after call',
    ideal: 'Electrician, plumber, carpenter, painter, tiler — want higher rates',
  },
  {
    id: 'facebook',
    name: 'Facebook Autopilot',
    intent: 'time',
    tag: 'Save 10h/month',
    tagPl: 'Oszczędność 10h / miesiąc',
    problemEn: '300 photos in phone, last post March, reach -35% every 2 weeks silent, aannemer picks active competitor',
    problemPl: '300 fot w telefonie, ostatni post marzec, zasięgi -35% co 2 tyg ciszy',
    solutionEn: 'Phone photo → QuietForge panel → AI writes 3 variants in your brand tone → you approve → calendar 30-90d',
    deliverablesEn: [
      'Panel FB Autopilot — upload photo/video 30 sec from phone, no FB login needed',
      'AI writes in your tone (direct / professional / humor) — 3 variants, you pick',
      'Calendar 30-90d — drag & drop, see what goes when',
      'Hashtags + CTAs matched to your services (not #work)',
      'Insights: which post type brings inquiries (DEMO metric, not guaranteed)',
    ],
    range: formatRange(PRICING_NUMBERS.zzpFacebook.from, PRICING_NUMBERS.zzpFacebook.to),
    typical: 'Typical setup 30 photos + tone guide: €990',
    time: '+ optional €149/mo care (new templates, monitoring)',
    ideal: 'ZZP where FB brings clients but no time/system',
  },
  {
    id: 'google',
    name: 'Google Business Machine',
    intent: 'money',
    tag: 'Turn views into calls',
    tagPl: 'Zamień wyświetlenia w telefony',
    problemEn: '340 views, 4 calls vs competitor 310 views, 23 calls — same street, profile leaks revenue',
    problemPl: '340 wyświetleń, 4 telefony vs konkurent 310 i 23 — ten sam rejon, profil przecieka',
    solutionEn: 'Correct primary + 3-5 secondary categories, 15-30 SEO services NL, conversion description, photo SEO, review strategy, Posts, Q&A, NAP fix',
    deliverablesEn: [
      '5-7 min video audit BEFORE payment — screen recording showing leaks',
      'Categories: primary + secondary optimized for money keywords (e.g. "Badkamer renovatie")',
      '15-30 services with NL SEO long-tail (not "renovatie" but "vloerverwarming aanleggen Den Haag")',
      '20-50 photos optimization (SEO name, order, alt)',
      'Review strategy + 10 answer templates PL/NL + 5-10 Q&A + 4 starter Google Posts',
      '90d plan to keep top 3 Map Pack — DEMO plan, results depend on competition/distance',
    ],
    range: formatRange(PRICING_NUMBERS.zzpGoogle.from, PRICING_NUMBERS.zzpGoogle.to),
    typical: 'Typical ZZP 1 city 20 photos: €590',
    time: '+ optional €99/mo for Posts/photos/reviews upkeep',
    ideal: 'Every ZZP where Google is main "spoed" source',
  },
];

export default function ZZPProfileBoostPage() {
  const comboRange = formatRange(PRICING_NUMBERS.zzpCombo.from, PRICING_NUMBERS.zzpCombo.to);
  return (
    <>
      {/* HERO — EN primary, PL secondary clearly separated */}
      <Section padding="large">
        <div className="max-w-4xl">
          <Eyebrow>// ZZP Growth Engine — PL • NL • EN</Eyebrow>
          <h1 className="text-[var(--qf-fs-3xl)] font-bold tracking-tight leading-[var(--qf-lh-tight)] mb-4 max-w-3xl">
            3 Profiles That Turn Into Calls. <span className="text-[var(--qf-accent)]">Not Just Pretty Listings.</span>
          </h1>
          <p className="text-[var(--qf-fs-lg)] text-[var(--qf-text-dim)] mb-2 max-w-2xl">
            For Polish ZZP in Netherlands — LinkedIn that supports €65/h instead of €35, Facebook that saves 10h/month, Google Business that turns views into calls. System setup in 48h by agents I train for 2 years. Founder-supervised, no monthly trap.
          </p>
          <p className="text-sm text-[var(--qf-text-dim)] mb-2 max-w-2xl">
            <strong className="text-[var(--qf-text)]">PL dla Polskich ZZP:</strong> 3 profile które zamienią się w telefony — LinkedIn który bierze €65/h zamiast €35, FB Autopilot który oszczędza 10h/mies, Google który zamienia wyświetlenia w telefony. Bez abonamentu-pułapki.
          </p>
          <p className="font-mono text-xs text-[var(--qf-text-faint)] mb-8">
            EN primary for SEO NL/EN • PL support below • NL version available • DEMO case = illustrative, not guaranteed outcome — see proof tiers
          </p>
          <div className="flex flex-wrap gap-4 mb-3">
            <Button href={ROUTES.bookDiscovery} withArrow size="lg" analyticsEvent="cta_book_map_click" analyticsDetail={{ location: 'zzp_hero_primary' }}>
              Book Free 15-min Video Audit
            </Button>
            <Button href="#how-panel-works" variant="ghost" withArrow>
              See how panel works (7-min)
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="text-[var(--qf-text-faint)] text-xs font-mono">€290 Map credited if deep mapping needed • Pricing depends on materials — fair • No passwords needed</span>
            <Link href={WHATSAPP.url} className="text-xs font-mono text-[var(--qf-accent)] underline">Or WhatsApp photos for faster audit →</Link>
          </div>

          {/* Proof bar */}
          <div className="rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-raised)] p-4 flex flex-wrap gap-6 text-xs font-mono">
            <span className="text-[var(--qf-text-dim)]">Live proof: <strong className="text-[var(--qf-text)]">flexgrafik.nl</strong> runs same architecture</span>
            <span className="text-[var(--qf-accent)]">✓ No monthly trap</span>
            <span className="text-[var(--qf-ok)]">✓ 48h delivery after call</span>
            <span className="text-[var(--qf-text-faint)]">✓ DEMO labeled where illustrative</span>
            <span className="text-[var(--qf-text-faint)]">✓ HITL — you approve</span>
          </div>
        </div>
      </Section>

      {/* PROBLEM */}
      <Section background="surface" padding="large">
        <Eyebrow>Problem — same story in Randstad (PL + EN)</Eyebrow>
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-4 max-w-3xl">
          327 photos in phone. Last 3 weeks silence on profiles. Client sees it — and picks competitor.
        </h2>
        <p className="text-[var(--qf-text-dim)] mb-2 max-w-2xl">
          Dutch client before €3-5k order doesn’t call blind. He checks LinkedIn, Facebook, Google. If 1 of 3 looks worse than competitor 3 streets away — you lose in 7 seconds. No remarketing. No second chance.
        </p>
        <p className="text-sm text-[var(--qf-text-faint)] mb-10 max-w-2xl">PL: Holender przed zleceniem €3-5k sprawdza 3 profile. Jeśli 1 wygląda gorzej niż konkurent 3 ulice dalej — przegrywasz w 7 sekund.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-l-4 border-l-[var(--fx-money)]">
            <p className="font-mono text-xs uppercase text-[var(--fx-money)] mb-2">LinkedIn Leak — Rate</p>
            <p className="font-bold mb-2">Profile = KvK entry, not sales tool</p>
            <p className="text-sm text-[var(--qf-text-dim)] mb-3">Headline "ZZP-er", Services empty, 0 projects. Google doesn’t find you for "elektricien Den Haag". Competitor with optimization charges €65/h, you negotiate €35.</p>
            <p className="text-xs font-mono text-[var(--qf-text-faint)]">Cost: €1.200-2.000 / month in rate difference (DEMO calc, not guaranteed)</p>
          </Card>
          <Card className="p-6 border-l-4 border-l-[var(--fx-time)]">
            <p className="font-mono text-xs uppercase text-[var(--fx-time)] mb-2">Facebook Leak — Time</p>
            <p className="font-bold mb-2">Phone full of photos, 0 posts</p>
            <p className="text-sm text-[var(--qf-text-dim)] mb-3">After 10h on site, no energy to write post. Algorithm penalizes -35% every 2 weeks silent. Aannemer sees dead profile and picks active one.</p>
            <p className="text-xs font-mono text-[var(--qf-text-faint)]">Cost: 10h/month + 0 inbound from FB (paid time you could bill)</p>
          </Card>
          <Card className="p-6 border-l-4 border-l-[var(--fx-time)]">
            <p className="font-mono text-xs uppercase text-[var(--fx-time)] mb-2">Google Business Leak — Revenue</p>
            <p className="font-bold mb-2">340 views, 4 calls vs 310 views, 23 calls (illustrative DEMO)</p>
            <p className="text-sm text-[var(--qf-text-dim)] mb-3">Wrong primary "Aannemer", 3 generic services, photo 8 months old, no review strategy. 19 missed calls × €800 avg = €15.200 revenue leak example — actual varies by competition/distance.</p>
            <p className="text-xs font-mono text-[var(--qf-text-faint)]">No guarantee of #1. We make profile 90% better than wijk — PROVEN process, DEMO numbers.</p>
          </Card>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section padding="large">
        <div className="max-w-4xl">
          <Eyebrow>System — QuietForge Octopus (founder-supervised)</Eyebrow>
          <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-6">Not an agency. System of agents I train for 2 years. You stay in control.</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-[var(--qf-text-dim)] mb-6">
                Imagine octopus — each tentacle works on different profile: one extracts skills from distribution board photo, second writes FB post in your direct tone, third fixes Google categories. I supervise as commander. Nothing goes live without your approval (HITL).
              </p>
              <p className="text-sm text-[var(--qf-text-faint)] mb-6">PL: Ośmiornica — każda macka robi inne zadanie. Ja nadzoruję. Nic nie idzie live bez Twojego OK.</p>
              <div className="space-y-4">
                {[
                  { step: '01', title: '15-min call + free video audit (5-7 min screen share)', bodyEn: 'I show on screen what kills your profiles. You see what I fix before paying. No commitment.', bodyPl: 'Pokazuję na ekranie co zabija profile. Widzisz co naprawię zanim zapłacisz.' },
                  { step: '02', title: 'You send what you have (even chaos from phone)', bodyEn: 'Photos from sites, project list, short description. Can be messy — agents order it.', bodyPl: 'Zdjęcia z budów, lista projektów — może być chaos, agenci uporządkują.' },
                  { step: '03', title: 'Agents work 48h', bodyEn: 'LinkedIn: headline SEO + Services + Projects. FB: panel + calendar. Google: categories + services + photo SEO + Q&A.', bodyPl: 'LinkedIn headline SEO, Services, Projects. FB panel + kalendarz. Google kategorie + usługi.' },
                  { step: '04', title: 'You get system + panel (not PDF)', bodyEn: 'Panel where you see calendar, stats, can edit 2 words instead of TikTok scrolling.', bodyPl: 'Panel z kalendarzem i statystykami — poprawiasz 2 słowa zamiast scrollować.' },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <span className="font-mono text-[var(--qf-accent)] font-bold">{s.step}</span>
                    <div>
                      <p className="font-bold text-[var(--qf-text)]">{s.title}</p>
                      <p className="text-sm text-[var(--qf-text-dim)]">{s.bodyEn}</p>
                      <p className="text-xs text-[var(--qf-text-faint)]">{s.bodyPl}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Card className="p-6 bg-[var(--qf-bg-inset)] border-[var(--qf-accent)]">
                <p className="font-mono text-xs uppercase text-[var(--qf-accent)] mb-4">Octopus Live — what agents do (DEMO)</p>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between"><span className="text-[var(--qf-text-dim)]">Tentacle 1 → LinkedIn</span><span className="text-[var(--qf-ok)]">✓ Skills extraction</span></div>
                  <div className="flex justify-between"><span className="text-[var(--qf-text-dim)]">Tentacle 2 → LinkedIn</span><span className="text-[var(--qf-ok)]">✓ Services 5-27 SEO NL</span></div>
                  <div className="flex justify-between"><span className="text-[var(--qf-text-dim)]">Tentacle 3 → Facebook</span><span className="text-[var(--qf-ok)]">✓ Post in your tone (3 variants)</span></div>
                  <div className="flex justify-between"><span className="text-[var(--qf-text-dim)]">Tentacle 4 → Facebook</span><span className="text-[var(--qf-ok)]">✓ Calendar 30-90d + approval</span></div>
                  <div className="flex justify-between"><span className="text-[var(--qf-text-dim)]">Tentacle 5 → Google</span><span className="text-[var(--qf-ok)]">✓ Category fix + services</span></div>
                  <div className="flex justify-between"><span className="text-[var(--qf-text-dim)]">Tentacle 6 → Google</span><span className="text-[var(--qf-ok)]">✓ Photos SEO + reviews</span></div>
                  <div className="flex justify-between"><span className="text-[var(--qf-text-dim)]">Tentacle 7 → All</span><span className="text-[var(--qf-ok)]">✓ NAP consistency check</span></div>
                  <div className="flex justify-between"><span className="text-[var(--qf-text-dim)]">Tentacle 8 → Commander</span><span className="text-[var(--qf-accent)]">✦ Human approval HITL</span></div>
                </div>
                <div className="mt-6 pt-6 border-t border-[var(--qf-border)]">
                  <p className="text-sm text-[var(--qf-text)] font-bold">QuietForge is not AI slop.</p>
                  <p className="text-xs text-[var(--qf-text-dim)] mt-1">AI drafts → human (Norbert) approves → you approve. Nothing auto-publishes. DEMO numbers where shown = illustrative, not guarantee.</p>
                </div>
              </Card>
              <div id="how-panel-works">
              <Card className="p-6">
                <p className="font-mono text-xs uppercase text-[var(--qf-text-faint)] mb-2">Loom — Panel Demo (P1 TODO)</p>
                <p className="text-sm text-[var(--qf-text)] font-bold mb-2">7-min video: phone upload → 3 variants → calendar</p>
                <p className="text-xs text-[var(--qf-text-dim)] mb-3">TODO: Record Loom mock — placeholder increases trust 2x vs just text. For audit: add link to Loom when ready.</p>
                <div className="rounded bg-[var(--qf-bg-inset)] border border-[var(--qf-border)] p-3 text-xs font-mono text-[var(--qf-text-faint)]">loom placeholder — 1080p, no passwords shown</div>
              </Card>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* PACKS */}
      <Section background="surface" padding="large">
        <Eyebrow>3 Packs — pick leak to fix first (prices from pricing.ts SSoT)</Eyebrow>
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-4">Each pack is system that should earn, not just look pretty. DEMO numbers = illustrative.</h2>
        <p className="text-xs font-mono text-[var(--qf-text-faint)] mb-10">Pricing SSoT: src/content/pricing.ts → {formatRange(PRICING_NUMBERS.zzpLinkedIn.from, PRICING_NUMBERS.zzpLinkedIn.to)} etc. No invented ranges. Ranges = typical; exact after audit.</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pricingBlocks.map((pack) => (
            <div key={pack.id} id={pack.id === 'facebook' ? 'facebook-autopilot' : pack.id === 'google' ? 'google-business' : pack.id}>
              <Card className="p-6 flex flex-col h-full border-t-4 border-t-[var(--qf-accent)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase px-2 py-0.5 border border-[var(--qf-accent)] text-[var(--qf-accent)]">{pack.tag}</span>
                  <span className="text-[10px] font-mono text-[var(--qf-text-faint)]">{pack.time}</span>
                </div>
                <h3 className="text-[var(--qf-fs-xl)] font-bold mb-1">{pack.name}</h3>
                <p className="text-[11px] font-mono text-[var(--qf-text-faint)] mb-2">{pack.tagPl}</p>
                <p className="text-xs font-mono text-[var(--qf-warn)] mb-1">Problem EN: {pack.problemEn}</p>
                <p className="text-[11px] text-[var(--qf-text-faint)] mb-3">PL: {pack.problemPl}</p>
                <p className="text-sm text-[var(--qf-text-dim)] mb-4">{pack.solutionEn}</p>
                <ul className="space-y-2 mb-4 flex-1">
                  {pack.deliverablesEn.map((d) => (
                    <li key={d} className="flex gap-2 text-xs text-[var(--qf-text)]">
                      <span className="text-[var(--qf-ok)] mt-0.5">✓</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="mb-3 p-2 rounded bg-[var(--qf-bg-inset)] border border-[var(--qf-border)]">
                  <p className="text-[11px] font-mono text-[var(--qf-accent)]">Typical: {pack.typical}</p>
                </div>
                <div className="mt-auto">
                  <p className="font-mono text-xs text-[var(--qf-text-faint)] mb-1">For: {pack.ideal}</p>
                  <p className="text-[var(--qf-accent)] font-bold text-lg mb-1">{pack.range} <span className="text-xs font-normal text-[var(--qf-text-faint)]">one-time</span></p>
                  <p className="text-[10px] font-mono text-[var(--qf-text-faint)] mb-4">+ option care — you can self-manage after setup</p>
                  <Button href={ROUTES.bookDiscovery} withArrow className="w-full">Audit my {pack.name}</Button>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <Card className="mt-8 p-8 border-[var(--qf-accent)] bg-[var(--qf-bg-inset)]">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase text-[var(--qf-accent)] mb-2">Best value — ZZP Growth Engine — SSoT pricing</p>
              <h3 className="text-[var(--qf-fs-xl)] font-bold mb-3">Combo: 3 profiles, one brand voice, one system — {comboRange}</h3>
              <p className="text-sm text-[var(--qf-text-dim)] mb-2">Instead of €1.570–€4.180 separate. You save + consistent brand across 3 channels = trust = higher rate. Setup up to 72h.</p>
              <p className="text-xs text-[var(--qf-text-faint)] mb-4">PL: Zamiast osobno — oszczędzasz + spójna marka w 3 kanałach. Setup 72h.</p>
              <ul className="space-y-1 mb-6 text-xs">
                <li className="flex gap-2"><span className="text-[var(--qf-ok)]">✓</span> LinkedIn + FB Autopilot + Google Machine</li>
                <li className="flex gap-2"><span className="text-[var(--qf-ok)]">✓</span> One brand tone guide (direct / professional / humor)</li>
                <li className="flex gap-2"><span className="text-[var(--qf-ok)]">✓</span> One panel to manage all 3</li>
                <li className="flex gap-2"><span className="text-[var(--qf-ok)]">✓</span> NAP consistency + cross-linking + UTM tracking</li>
              </ul>
              <p className="text-xs font-mono text-[var(--qf-text-faint)]">Pricing depends on materials. After 15-min call exact quote. Can start with 1 pack and add rest. 2 installments possible: 50/50. DEMO savings calc.</p>
            </div>
            <div className="flex flex-col gap-3 w-full lg:w-64">
              <Button href={ROUTES.bookDiscovery} size="lg" withArrow>Book Free Video Audit</Button>
              <Button href={WHATSAPP.bookMapUrl} variant="secondary">WhatsApp — send photos</Button>
              <p className="text-[10px] font-mono text-center text-[var(--qf-text-faint)]">No spam. 15 min screen share. You see leaks before paying. UTM tracked.</p>
            </div>
          </div>
        </Card>
      </Section>

      {/* CASE STUDY — DEMO labeled */}
      <Section padding="large">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <Eyebrow>Case — Tegelzetter Den Haag // DEMO</Eyebrow>
            <h2 className="text-[var(--qf-fs-xl)] font-bold tracking-tight mb-2">Example: Tiler with many phone photos — from chaos to system (DEMO illustration).</h2>
            <p className="text-xs font-mono text-[var(--qf-warn)] mb-4">⚠️ DEMO — illustrative example based on typical ZZP. Not a specific client, not a guaranteed outcome. PROVEN requires real client permission + screenshots. Numbers below = example range, actual varies.</p>
            <p className="text-[var(--qf-text-dim)] mb-4 text-sm">Before: Example ZZP has 20-50 photos in gallery, FB last post March, LinkedIn "ZZP-er", Google 3 generic services, ~300 views / few calls (typical pattern in Randstad audit n=30).</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded border border-[var(--qf-warn)] p-3">
                <p className="font-mono text-xs text-[var(--qf-warn)]">BEFORE (typical)</p>
                <ul className="text-xs mt-2 space-y-1 text-[var(--qf-text-dim)]">
                  <li>✕ LinkedIn "ZZP-er"</li>
                  <li>✕ Services empty</li>
                  <li>✕ FB 1 post / 3 weeks</li>
                  <li>✕ Google "Aannemer" generic</li>
                  <li>✕ ~300 views / few calls</li>
                </ul>
              </div>
              <div className="rounded border border-[var(--qf-ok)] p-3">
                <p className="font-mono text-xs text-[var(--qf-ok)]">AFTER (DEMO illustrative)</p>
                <ul className="text-xs mt-2 space-y-1 text-[var(--qf-text-dim)]">
                  <li>✓ Skills extracted from photos (example)</li>
                  <li>✓ New SEO phrases (example +10-15)</li>
                  <li>✓ FB calendar 60 days, 2/wk (process)</li>
                  <li>✓ Google many services, fresh photos (process)</li>
                  <li>✓ Example: more calls than before (varies)</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-[var(--qf-text-dim)]">
              <strong className="text-[var(--qf-text)]">Process (PROVEN):</strong> ZZP sends 20-50 photos via WhatsApp. Agents extract example skills: "60x120 tegels, epoxy voeg, vloerverwarming, NEN1010 groepenkast". We fill LinkedIn + Google + set FB Autopilot. ZZP then does 30 sec photo at end of day + approve.
            </p>
            <p className="text-xs text-[var(--qf-text-faint)] mt-3">No fake testimonial. If you are that tiler and want to be PROVEN case with real numbers — DM for barter: free care for permission + screenshots.</p>
          </div>
          <Card className="p-6 bg-[var(--qf-bg-raised)]">
            <p className="font-mono text-xs uppercase text-[var(--qf-text-faint)] mb-4">Workflow — real ZZP life (PROVEN process, DEMO numbers)</p>
            <div className="space-y-6">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--qf-accent)] text-[var(--qf-bg)] flex items-center justify-center font-mono text-xs font-bold">1</div>
                <div>
                  <p className="font-bold text-sm">End of day, bathroom done (PL: Koniec dniówki)</p>
                  <p className="text-xs text-[var(--qf-text-dim)]">3 photos: before/during/after. 30 sec. No filters, authentic — client wants real work.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--qf-accent)] text-[var(--qf-bg)] flex items-center justify-center font-mono text-xs font-bold">2</div>
                <div>
                  <p className="font-bold text-sm">Upload to QuietForge panel from phone</p>
                  <p className="text-xs text-[var(--qf-text-dim)]">No FB/Google/LinkedIn login. AI sees photo and proposes drafts.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--qf-accent)] text-[var(--qf-bg)] flex items-center justify-center font-mono text-xs font-bold">3</div>
                <div>
                  <p className="font-bold text-sm">AI writes 3 variants in your tone (PL/NL/EN)</p>
                  <p className="text-xs text-[var(--qf-text-dim)]">Direct + slightly sarcastic? Not corporate. AI learns: "Client: previous guy said it should be like that. Me: ..."</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--qf-accent)] text-[var(--qf-bg)] flex items-center justify-center font-mono text-xs font-bold">4</div>
                <div>
                  <p className="font-bold text-sm">Approve → goes to calendar 30-90d</p>
                  <p className="text-xs text-[var(--qf-text-dim)]">See what goes when. In free moment, improve strategy instead of TikTok. 5 min vs 1h.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-3 rounded bg-[var(--qf-bg-inset)] border border-[var(--qf-border)]">
              <p className="text-xs font-mono text-[var(--qf-text-dim)]">Process PROVEN • Numbers DEMO illustrative • Real results depend on distance, reviews, competition, consistency. No #1 guarantee.</p>
            </div>
          </Card>
        </div>
      </Section>

      {/* PRICING FAIRNESS */}
      <Section background="surface" padding="large">
        <div className="max-w-3xl">
          <Eyebrow>Pricing — fair (SSoT)</Eyebrow>
          <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-4">Why not one price? Because I respect your time and money.</h2>
          <p className="text-[var(--qf-text-dim)] mb-2">Agency says "€600/mo" no matter if you have 5 photos or 50 projects. I don’t.</p>
          <p className="text-sm text-[var(--qf-text-faint)] mb-6">PL: Agencja powie €600/mies bez znaczenia ile masz materiałów. Ja liczę uczciwie od ilości materiałów.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <p className="font-bold mb-2">What affects price? / Co wpływa?</p>
              <ul className="text-sm text-[var(--qf-text-dim)] space-y-1">
                <li>• Amount of material: 10 vs 80 photos + video</li>
                <li>• Projects to describe: 5 vs 25 case studies</li>
                <li>• Cities / services: 1 city vs Randstad + 3 specializations</li>
                <li>• Current state: from zero vs optimization</li>
                <li>• Languages: NL only vs PL/NL/EN</li>
              </ul>
              <div className="mt-4 p-2 rounded bg-[var(--qf-bg-inset)] border border-[var(--qf-border)]">
                <p className="text-xs font-mono text-[var(--qf-accent)]">Anchor examples (most common):</p>
                <p className="text-xs text-[var(--qf-text-dim)]">LinkedIn 15 photos = €690 • 40 photos = €990 • FB Autopilot 30 photos = €990 • Google 1 city 20 photos = €590</p>
                <p className="text-[10px] text-[var(--qf-text-faint)]">PL: Najczęściej: LinkedIn 15 zdjęć = €690, 40 zdjęć = €990</p>
              </div>
            </Card>
            <Card className="p-6 border-[var(--qf-accent)]">
              <p className="font-bold mb-2">What you get before paying / Co dostajesz przed płatnością?</p>
              <ul className="text-sm text-[var(--qf-text)] space-y-1">
                <li className="flex gap-2"><span className="text-[var(--qf-ok)]">✓</span> 15-min call — I understand your business</li>
                <li className="flex gap-2"><span className="text-[var(--qf-ok)]">✓</span> 5-7 min video audit — you see what’s broken</li>
                <li className="flex gap-2"><span className="text-[var(--qf-ok)]">✓</span> Exact quote — not range, exact amount after audit</li>
                <li className="flex gap-2"><span className="text-[var(--qf-ok)]">✓</span> 48h action plan — what when you get</li>
                <li className="flex gap-2"><span className="text-[var(--qf-ok)]">✓</span> Zero obligation — if no value, we don’t proceed</li>
                <li className="flex gap-2"><span className="text-[var(--qf-ok)]">✓</span> 2 installments 50/50 possible</li>
              </ul>
            </Card>
          </div>
          <p className="text-xs font-mono text-[var(--qf-text-faint)]">
            Automation Map €290 credited if deep mapping needed for multi-city/multi-service. Otherwise straight to pack setup. Comparison: Agency €600/mo ×12 = €7.200/year for posts. This system: one-time €490-€1.900 + you own it. ROI in 1-2 jobs.
          </p>
        </div>
      </Section>

      {/* TRUST & SAFETY — NEW P0 SECTION */}
      <Section padding="large">
        <div className="max-w-3xl">
          <Eyebrow>Trust & Safety — AVG • HITL • No passwords</Eyebrow>
          <h2 className="text-[var(--qf-fs-xl)] font-bold tracking-tight mb-4">How I handle your profiles — safe, EU, you stay owner.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="p-6">
              <p className="font-bold mb-2">No passwords. Manager access only.</p>
              <ul className="text-sm text-[var(--qf-text-dim)] space-y-2">
                <li className="flex gap-2"><span className="text-[var(--qf-ok)]">✓</span> FB/Google: you add me as Manager (not Owner) for 48h. After setup you remove me. Full log.</li>
                <li className="flex gap-2"><span className="text-[var(--qf-ok)]">✓</span> LinkedIn: I give you ready texts + copy-paste guide (5 min) or screen share together. No password needed.</li>
                <li className="flex gap-2"><span className="text-[var(--qf-ok)]">✓</span> No passwords over chat — ever. Service accounts, scoped permissions.</li>
              </ul>
            </Card>
            <Card className="p-6">
              <p className="font-bold mb-2">EU + HITL + You approve</p>
              <ul className="text-sm text-[var(--qf-text-dim)] space-y-2">
                <li className="flex gap-2"><span className="text-[var(--qf-ok)]">✓</span> EU hosting, EU data processing. AVG layer ready — verwerkersovereenkomst on request.</li>
                <li className="flex gap-2"><span className="text-[var(--qf-ok)]">✓</span> Human-in-the-loop — nothing publishes without your OK. No auto-post without approval.</li>
                <li className="flex gap-2"><span className="text-[var(--qf-ok)]">✓</span> Audit trail: who approved what, when — on request.</li>
                <li className="flex gap-2"><span className="text-[var(--qf-ok)]">✓</span> No lock-in — README + handover to any dev. You own panel.</li>
              </ul>
            </Card>
          </div>
          <p className="text-xs font-mono text-[var(--qf-text-faint)]">
            Full playbook: <Link href="/trust" className="text-[var(--qf-accent)]">/trust</Link> • Data safety PDF: <Link href="/artefacts/data-safety-playbook.pdf" className="text-[var(--qf-accent)]">data-safety-playbook.pdf</Link> • Legal: <Link href="/legal" className="text-[var(--qf-accent)]">/legal</Link> — This is process description, not legal advice.
          </p>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section background="surface" padding="large">
        <Card className="p-8 sm:p-10 bg-[var(--qf-bg-raised)] border-[var(--qf-accent)] text-center">
          <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-3">Stop leaking clients. Start with free video audit (15 min, no pitch).</h2>
          <p className="text-[var(--qf-text-dim)] max-w-2xl mx-auto mb-2">
            Send me link to your LinkedIn / Facebook / Google Business. In 24h you get 5-7 min screen recording where I show what kills calls and how much it costs. DEMO numbers where shown are illustrative.
          </p>
          <p className="text-xs font-mono text-[var(--qf-text-faint)] mb-2">PL/NL/EN — I speak your language. 15 min, zero sales, pure value. No passwords needed.</p>
          <p className="text-[11px] font-mono text-[var(--qf-warn)] mb-8">Disclaimer: No guarantee of Google #1 ranking. Rankings depend on distance, reviews, competition, activity. We make profile 90% better than wijk — PROVEN process, not guaranteed outcome.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={ROUTES.bookDiscovery} size="xl" withArrow analyticsEvent="cta_book_map_click" analyticsDetail={{ location: 'zzp_final_audit' }}>Book Free Video Audit (15 min)</Button>
            <Button href={WHATSAPP.url} variant="secondary" size="lg" withArrow>WhatsApp — send links</Button>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-left max-w-3xl mx-auto">
            <div className="p-3 border border-[var(--qf-border)] rounded">
              <p className="text-[var(--qf-accent)] uppercase">Step 1 — You</p>
              <p className="text-[var(--qf-text-dim)] mt-1">Comment or DM with profile link (LinkedIn / FB / Google). Add UTM: ?utm_source=fb_group</p>
            </div>
            <div className="p-3 border border-[var(--qf-border)] rounded">
              <p className="text-[var(--qf-accent)] uppercase">Step 2 — Me</p>
              <p className="text-[var(--qf-text-dim)] mt-1">You get video audit + 12/15-point checklist + exact quote (not range) — before paying</p>
            </div>
            <div className="p-3 border border-[var(--qf-border)] rounded">
              <p className="text-[var(--qf-accent)] uppercase">Step 3 — System</p>
              <p className="text-[var(--qf-text-dim)] mt-1">If value clear — 48h setup, panel, calendar. Your profile starts answering "Should I trust this guy with €12k job?" while you sleep.</p>
            </div>
          </div>
          <p className="mt-8 text-xs text-[var(--qf-text-faint)]">
            QuietForge — Conversion Systems Architect · Live proof: <Link href="https://flexgrafik.nl" className="text-[var(--qf-accent)]">flexgrafik.nl</Link> · Owner: Norbert Wozniak · KvK: FlexGrafik Digital · NL: Rotterdam / Den Haag area, remote EU · <Link href="/legal" className="text-[var(--qf-text-faint)]">Privacy/Terms</Link>
          </p>
        </Card>
      </Section>

      {/* FAQ */}
      <Section padding="large">
        <div className="max-w-3xl">
          <Eyebrow>FAQ — straight, no corporate (PL + EN)</Eyebrow>
          <h2 className="text-[var(--qf-fs-xl)] font-bold mb-8">Najczęstsze pytania ZZP / Most common ZZP questions</h2>
          <div className="space-y-6">
            <div>
              <p className="font-bold">Czy muszę dawać hasła do FB/Google/LinkedIn? Do I need to give passwords?</p>
              <p className="text-sm text-[var(--qf-text-dim)]">Nie / No. LinkedIn: ready texts + paste guide or screen share. FB/Google: you add me as temporary Manager (not Owner) and remove after 48h. Safe, logged. No passwords over chat — ever.</p>
            </div>
            <div>
              <p className="font-bold">Czy to kolejny abonament €500/mies? Is it another €500/mo subscription?</p>
              <p className="text-sm text-[var(--qf-text-dim)]">Nie. Płacisz raz za setup. Opcjonalnie care €99-149/mies jeśli chcesz żebym trzymał posty/opinie. Możesz sam — dostajesz panel i instrukcje. No lock-in.</p>
            </div>
            <div>
              <p className="font-bold">Mam tylko 10 zdjęć, czy to wystarczy? I have only 10 photos, enough?</p>
              <p className="text-sm text-[var(--qf-text-dim)]">Tak / Yes. We start with what you have. Ranges exist for reason — 10 photos = lower bound, 80 + video = upper. Better start than wait 1 year for perfect photos.</p>
            </div>
            <div>
              <p className="font-bold">A co z językiem? Holenderski słaby? My Dutch is weak?</p>
              <p className="text-sm text-[var(--qf-text-dim)]">Piszę po holendersku który konwertuje, nie akademicki. We check samen. If you have Dutch colleague, he can approve. I provide PL for your control + NL for client.</p>
            </div>
            <div>
              <p className="font-bold">Ile czasu to ode mnie wymaga? How much time from me?</p>
              <p className="text-sm text-[var(--qf-text-dim)]">15-min call + 15 min sending photos (WhatsApp) + 10 min approving texts. Then 5 min/week: photo → approve. That’s it.</p>
            </div>
            <div>
              <p className="font-bold">Czy gwarantujesz #1 w Google? Guarantee #1?</p>
              <p className="text-sm text-[var(--qf-text-dim)]">Nie / No. That’s scam. Google depends on distance, reviews, competition. I promise profile that looks better than 90% wijk and is ready to convert when client is ready to pay. PROVEN process, DEMO illustrative numbers, not guaranteed outcome.</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
