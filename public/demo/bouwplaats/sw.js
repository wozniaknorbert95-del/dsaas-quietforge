/** Bump when static WebP/assets change — v4: licensed BGM loop precache. */
const CACHE_VERSION = 'v4';
const STATIC_CACHE = `fg-static-${CACHE_VERSION}`;
const NAV_CACHE = `fg-nav-${CACHE_VERSION}`;
const FONT_CACHE = `fg-fonts-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/ui-logo-flexgrafik.webp',
  '/assets/ui-sublogo-zzpackage.webp',
  '/assets/bg_bouwplaats.webp',
  '/assets/bg_scaffolding.webp',
  '/assets/sprite-player-main.webp',
  '/assets/platform.webp',
  '/assets/platforms/platform-L1.webp',
  '/assets/platforms/platform-L2.webp',
  '/assets/platforms/platform-L3.webp',
  '/assets/platforms/platform-L4.webp',
  '/assets/platforms/platform-L5.webp',
  '/assets/menu/reward-hoodie.webp',
  '/assets/menu/reward-korting.webp',
  '/assets/menu/reward-stickers.webp',
  '/assets/menu/reward-tshirt.webp',
  '/assets/audio/slang_sprite.mp3',
  '/assets/audio/bgm_loop.mp3',
  '/assets/audio/bgm_loop.ogg',
];

const NAV_FALLBACK = '/index.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      await self.skipWaiting();
      const cache = await caches.open(STATIC_CACHE);
      await cache.addAll(PRECACHE_URLS);
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await self.clients.claim();
      const keep = [STATIC_CACHE, NAV_CACHE, FONT_CACHE];
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => !keep.includes(k)).map((k) => caches.delete(k)));
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.protocol !== 'https:' && url.protocol !== 'http:') return;
  if (url.origin !== self.location.origin) {
    if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
      event.respondWith(fontsStrategy(request));
    }
    return;
  }

  const path = url.pathname;

  if (path === '/' || path === '/index.html') {
    event.respondWith(navStrategy(request));
    return;
  }

  if (/\.(js|css|webp|png|jpg|jpeg|gif|svg|ico|woff2?|mp3|ogg)$/.test(path)) {
    if (/[a-f0-9]{8,}-/.test(path) || /-(?:[a-f0-9]{8,})\./.test(path)) {
      event.respondWith(immutableStrategy(request));
    } else {
      event.respondWith(staticStrategy(request));
    }
    return;
  }

  if (path.startsWith('/wp-json/') || path.startsWith('/fg-game-api.php')) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(navStrategy(request));
  }
});

async function navStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(NAV_CACHE);
      void cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    const fallback = await caches.match(NAV_FALLBACK);
    if (fallback) return fallback;
    return new Response('Offline', { status: 503 });
  }
}

async function immutableStrategy(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      void cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    return new Response('', { status: 404 });
  }
}

async function staticStrategy(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      void cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    return new Response('', { status: 404 });
  }
}

async function fontsStrategy(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(FONT_CACHE);
      void cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    return new Response('', { status: 404 });
  }
}
