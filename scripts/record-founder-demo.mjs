/**
 * Record founder narrative montage → public/gratka/founder-demo.mp4
 * Usage: node scripts/record-founder-demo.mjs
 *
 * Shot list: video-production-plan-2026-06-25.md § Video 5
 * Screen montage only (no voice-over). Commander may replace with OBS + VO.
 */
import {
  launchRecordingBrowser,
  finalizeRecording,
  acceptCookiesIfPresent,
  pause,
} from './lib/video-record.mjs';

const SITE = 'https://quietforge.nl';

const SCENES = [
  { url: `${SITE}/founder/`, dwell: 6000 },
  { url: `${SITE}/results/`, dwell: 5000 },
  { url: `${SITE}/results/owner-ecosystem/`, dwell: 6000 },
  { url: 'https://zzpackage.flexgrafik.nl/wizard/', dwell: 7000 },
  { url: `${SITE}/results/owner-ecosystem/#why-vcms`, dwell: 6000 },
  { url: `${SITE}/results/inbox-killer/`, dwell: 5000 },
  { url: `${SITE}/results/agent-orchestrator/`, dwell: 5000 },
  { url: `${SITE}/book-discovery/`, dwell: 5000 },
  { url: `${SITE}/founder/`, dwell: 4000 },
];

async function main() {
  console.log('Recording founder montage…');
  const { browser, context, page } = await launchRecordingBrowser();
  try {
    for (const scene of SCENES) {
      console.log(`  → ${scene.url}`);
      await page.goto(scene.url, { waitUntil: 'networkidle', timeout: 90_000 });
      await acceptCookiesIfPresent(page);
      if (scene.url.includes('#why-vcms')) {
        await page.locator('#why-vcms').scrollIntoViewIfNeeded().catch(() => {});
      }
      await pause(page, scene.dwell);
    }
  } finally {
    const result = await finalizeRecording(context, browser, 'founder-demo.mp4');
    if (!result.ready) {
      console.error('MP4 not produced — check FFmpeg.');
      process.exit(1);
    }
    console.log('✓ founder-demo.mp4 ready (screen montage — optional VO re-record by Commander)');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
