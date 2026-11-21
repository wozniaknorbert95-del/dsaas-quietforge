/**
 * Record ecosystem montage → public/gratka/ecosystem-demo.mp4
 * Usage: node scripts/record-ecosystem-demo.mjs
 *
 * Shot list: video-production-plan-2026-06-25.md § Video 3
 * Tours quietforge owner-ecosystem + live product tabs (no fabricated metrics).
 */
import {
  launchRecordingBrowser,
  finalizeRecording,
  acceptCookiesIfPresent,
  pause,
} from './lib/video-record.mjs';

const SITE = 'https://quietforge.nl';
const TABS = [
  { url: `${SITE}/results/owner-ecosystem/`, label: 'LOS map', dwell: 5000 },
  { url: 'https://app.flexgrafik.nl/', label: 'Lead magnet', dwell: 6000 },
  { url: 'https://zzpackage.flexgrafik.nl/', label: 'Wizard', dwell: 6000 },
  { url: `${SITE}/results/inbox-killer/`, label: 'Inbox proof', dwell: 5000 },
  { url: `${SITE}/results/agent-orchestrator/`, label: 'Agent OS', dwell: 5000 },
  { url: `${SITE}/results/owner-ecosystem/#why-vcms`, label: 'VCMS', dwell: 6000 },
  { url: `${SITE}/results/`, label: 'Results hub', dwell: 4000 },
];

async function main() {
  console.log('Recording ecosystem montage…');
  const { browser, context, page } = await launchRecordingBrowser();
  try {
    for (const stop of TABS) {
      console.log(`  → ${stop.label}`);
      await page.goto(stop.url, { waitUntil: 'networkidle', timeout: 90_000 });
      await acceptCookiesIfPresent(page);
      if (stop.url.includes('#')) {
        await page.evaluate((hash) => {
          const el = document.querySelector(hash.replace(/^[^#]*/, ''));
          el?.scrollIntoView({ behavior: 'instant' });
        }, stop.url.split('#')[1] ? `#${stop.url.split('#')[1]}` : '');
      }
      await pause(page, stop.dwell);
    }
    await pause(page, 3000);
  } finally {
    const result = await finalizeRecording(context, browser, 'ecosystem-demo.mp4');
    if (!result.ready) {
      console.error('MP4 not produced — check FFmpeg.');
      process.exit(1);
    }
    console.log('✓ ecosystem-demo.mp4 ready');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
