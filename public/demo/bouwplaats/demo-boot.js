/**
 * ==========================================
 * BOUWPLAATS CHAOS — STATIC DEMO BOOT LAYER
 * ==========================================
 *
 * Faithful client-side re-implementation of the game backend (WordPress
 * mu-plugin fg-game-api.php v1.3 on zzpackage.flexgrafik.nl), so the ORIGINAL
 * built game (dist/ — the exact bundle that ran live on app.flexgrafik.nl)
 * runs unmodified against static files.
 *
 * Stubbed endpoints (same contract as fg-game-api.php +
 * src/services/storageService.ts + src/config/wizardBridge.ts):
 *   - GET  wp-json/fg/v1/start-game            -> {nonce}              (session token)
 *   - GET  wp-json/fg/v1/leaderboard?season=…  -> [{name, score, date}] (fg_leaderboard rows)
 *   - POST wp-json/fg/v1/leaderboard           -> DEMO STOP (modal) + 201 {id, rank}
 *   - POST wp-json/fg/v1/leads                 -> DEMO STOP (modal) + 201 {status: 'ok'}
 *   - POST wp-json/fg/v1/game-token            -> {token}               (HMAC bridge token)
 *
 * Demo leaderboard rows are the repo's own e2e fixtures (e2e/*.spec.ts
 * route.fulfill payloads): 'ZZP Pro' 890, 'Baseline Speler' 420,
 * 'Figma Speler' 420. Scores the game saved itself (its own localStorage key
 * flexgrafik_leaderboard_my_scores) are merged in and 'Gast (Bouwer)' is
 * excluded — both mirror fg-game-api.php (GET excludes the guest nickname;
 * POST stores the entry and answers {id, rank} with rank = better scores + 1).
 *
 * Wizard handoff (reward moment): buildWizardUrl() / buildWizardUrlWithBonus()
 * in src/config/wizardBridge.ts target https://zzpackage.flexgrafik.nl/wizard/
 * with utm + ?coupon=GAME10 + score/lvl/brand/email/token. The URL constructor
 * is patched to resolve those deep links against the local wizard replica at
 * ../zzpackage/wizard/ (which already handles ?coupon= and shows the original
 * game banner). The token POST is stubbed with a deterministic 64-hex token
 * (same e-mail => same token, like the HMAC original) so the bonus handoff
 * keeps working offline. Reward codes per level stay the game's own SSoT
 * (config/levels.ts wizardReward + config/mainMenuCopy.ts PROMO_CODES):
 * GAME10, STICKER1, TSHIRT2, WINNER.
 *
 * DEMO STOP (the only behavioural change): the two data-sending POSTs
 * (leads + leaderboard) trigger the demo modal and nothing leaves the
 * browser. Both stubs still answer locally with the original response
 * shapes, so the original UI flow (registratie → spel → game over →
 * ranglijst → Wizard-link) stays fully navigable — only the sending stops.
 *
 * Also neutralised: navigator.serviceWorker.register('/sw.js') — the live PWA
 * cache manifest is absolute-path and cannot live under a demo subpath.
 */
(function () {
    'use strict';

    // ============================================================
    // 0. Helpers
    // ============================================================
    function jsonResp(payload, status) {
        return Promise.resolve(new Response(JSON.stringify(payload), {
            status: status || 200,
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }));
    }

    function readLocalScores() {
        // The game's own storage key (storageService.ts LEADERBOARD_KEY) —
        // saveScore() writes {name, score, date} rows here before POSTing.
        try {
            var raw = localStorage.getItem('flexgrafik_leaderboard_my_scores');
            var parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            return [];
        }
    }

    // e2e fixture rows (baseline-screenshots.spec.ts / figma-wave1-r2-push.spec.ts)
    var FIXTURE_DATE = new Date().toISOString();
    var FIXTURE_ROWS = [
        { name: 'ZZP Pro', score: 890, date: FIXTURE_DATE },
        { name: 'Baseline Speler', score: 420, date: FIXTURE_DATE },
        { name: 'Figma Speler', score: 420, date: FIXTURE_DATE }
    ];

    /** GET /leaderboard shape: fg_leaderboard rows minus the guest nickname (fg-game-api.php). */
    function mergedRows() {
        var rows = FIXTURE_ROWS.concat(readLocalScores()).filter(function (r) {
            return r && r.name !== 'Gast (Bouwer)' && Number(r.score) > 0;
        });
        rows.sort(function (a, b) { return Number(b.score) - Number(a.score); });
        return rows.map(function (r) {
            return { name: r.name, score: Number(r.score), date: r.date };
        });
    }

    // ============================================================
    // 1. fetch() shim — FG API endpoints (storageService.ts builds
    //    https://zzpackage.flexgrafik.nl/wp-json/fg/v1/* in prod builds;
    //    the regex also covers the dev /wp-json/fg/v1 proxy paths).
    // ============================================================
    var demoPostId = 1001;

    function handleFgApi(url, init) {
        var method = ((init && init.method) || 'GET').toUpperCase();

        if (url.indexOf('/start-game') !== -1 && method === 'GET') {
            // fg_game_start_session(): opaque base64(nonce:ts:sig) — demo is a fixed literal.
            return jsonResp({ nonce: 'ZGVtbzoxNzAwMDAwMDAwOmRlbW8tc2ln' });
        }

        if (url.indexOf('/game-token') !== -1 && method === 'POST') {
            // fg_game_generate_token(): token = HMAC-SHA256(email) — deterministic 64-hex.
            var email = '';
            try { email = JSON.parse((init && init.body) || '{}').email || ''; } catch (e) { /* empty */ }
            return jsonResp({ token: demoTokenFor(email) });
        }

        if (url.indexOf('/leaderboard') !== -1 && method === 'GET') {
            return jsonResp(mergedRows());
        }

        if (url.indexOf('/leaderboard') !== -1 && method === 'POST') {
            // DEMO STOP: no data is sent. Answer with the PHP response shape so
            // saveScore() completes the original UI flow (snackbar + ranglijst).
            showDemoStopModal();
            var body = {};
            try { body = JSON.parse((init && init.body) || '{}') || {}; } catch (e) { /* empty */ }
            var mine = Number(body.score) || 0;
            var rank = mergedRows().filter(function (r) { return r.score > mine; }).length + 1;
            return jsonResp({ id: demoPostId++, rank: rank }, 201);
        }

        if (url.indexOf('/leads') !== -1 && method === 'POST') {
            // DEMO STOP: registration/lead POST replaced by the demo modal.
            showDemoStopModal();
            return jsonResp({ status: 'ok' }, 201);
        }

        return null; // not ours — fall through to the real fetch
    }

    /** Deterministic 64-hex demo token (djb2 x4 lanes) — same e-mail => same token. */
    function demoTokenFor(email) {
        var src = String(email || '').trim().toLowerCase();
        var lanes = [5381, 52711, 55509, 53387];
        for (var i = 0; i < src.length; i++) {
            for (var l = 0; l < 4; l++) {
                lanes[l] = ((lanes[l] * 33) ^ src.charCodeAt(i)) >>> 0;
            }
        }
        var out = '';
        for (var l2 = 0; l2 < 4; l2++) {
            out += ('00000000' + lanes[l2].toString(16)).slice(-8);
        }
        return out + out.split('').reverse().join('');
    }

    var origFetch = window.fetch ? window.fetch.bind(window) : null;
    window.fetch = function (input, init) {
        var url = '';
        try {
            url = (typeof input === 'string') ? input : ((input && input.url) || '');
        } catch (e) { /* Request not inspectable — pass through */ }

        if (/\/wp-json\/fg\/v1\/(start-game|leaderboard|leads|game-token)/.test(url)) {
            var res = handleFgApi(url, init);
            if (res) return res;
        }
        return origFetch(input, init);
    };

    // ============================================================
    // 2. DEMO STOP modal (wizard pattern — see zzpackage/wizard/demo-boot.js)
    // ============================================================
    function demoReference() {
        var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        var out = '';
        for (var i = 0; i < 4; i++) {
            out += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return 'DEMO-' + out;
    }

    var lastFocus = null;

    function showDemoStopModal() {
        var modal = document.getElementById('demo-stop-modal');
        if (!modal || !modal.hidden) return; // one modal per submit action
        lastFocus = document.activeElement;
        var ref = document.getElementById('demo-stop-ref');
        if (ref) ref.textContent = demoReference();
        modal.hidden = false;
        var closeBtn = document.getElementById('demo-stop-close');
        if (closeBtn) closeBtn.focus();
    }

    function hideDemoStopModal() {
        var modal = document.getElementById('demo-stop-modal');
        if (!modal || modal.hidden) return;
        modal.hidden = true;
        if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    }

    document.addEventListener('click', function (e) {
        if (e.target && e.target.id === 'demo-stop-close') {
            e.preventDefault();
            hideDemoStopModal();
        }
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') hideDemoStopModal();
    });

    // ============================================================
    // 3. Wizard deep-link patch (src/config/wizardBridge.ts)
    //
    //    buildWizardUrl() / buildWizardUrlWithBonus() do
    //        new URL('https://zzpackage.flexgrafik.nl/wizard/')
    //    and the result is used both as <a href> and window.location.href.
    //    Rewriting the URL constructor maps every one of those deep links
    //    (utm_source=game, utm_medium, score, lvl, brand, email, token,
    //    coupon=GAME10) onto the local wizard replica — resolved relative to
    //    the current page so the demo works from any static path root.
    // ============================================================
    var WIZARD_REPLICA = '../zzpackage/wizard/'; // -> /demo/zzpackage/wizard/ on the live host

    function mapZzpackageUrl(str) {
        if (typeof str !== 'string') return str;
        var marker = 'https://zzpackage.flexgrafik.nl';
        if (str.indexOf(marker) !== 0) return str;
        var rest = str.slice(marker.length).replace(/^\/+/, ''); // 'wizard/?…' | '?…' | ''
        var rel;
        if (rest === '' || rest.charAt(0) === '?') {
            // Landing URL (buildZzpackageLandingUrl) — the wizard replica is the
            // only ZZPackage surface in the demo (Wizard-only funnel).
            rel = WIZARD_REPLICA + rest;
        } else if (rest === 'wizard' || rest.indexOf('wizard/') === 0 || rest.indexOf('wizard?') === 0) {
            rel = '../zzpackage/' + rest;
        } else {
            return str;
        }
        return new OrigURL(rel, document.baseURI).toString();
    }

    var OrigURL = window.URL;

    function DemoURL(input, base) {
        if (typeof input === 'string') input = mapZzpackageUrl(input);
        if (base !== undefined) return new OrigURL(input, base);
        return new OrigURL(input);
    }
    DemoURL.prototype = OrigURL.prototype;
    ['createObjectURL', 'revokeObjectURL', 'canParse', 'parse'].forEach(function (name) {
        if (typeof OrigURL[name] === 'function') {
            DemoURL[name] = OrigURL[name].bind(OrigURL);
        }
    });
    window.URL = DemoURL;

    // Same-origin absolute hrefs in the bundle (e.g. /spelinstructie.html,
    // /?view=ranglijst from Footer / MONTHLY_PRIZE_COPY) would leave the demo
    // subpath — rewrite them relative at click time, keeping target semantics.
    document.addEventListener('click', function (e) {
        var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
        if (!a) return;
        var href = a.getAttribute('href') || '';
        if (/^\/(?!\/)/.test(href)) {
            var rel = href.slice(1);
            if (rel === '' || rel.charAt(0) === '?') rel = 'index.html' + rel;
            a.setAttribute('href', rel);
            return;
        }
        if (href.indexOf('https://zzpackage.flexgrafik.nl') === 0) {
            a.setAttribute('href', mapZzpackageUrl(href));
        }
    }, true);

    // ============================================================
    // 4. Service worker — live PWA cache is absolute-path ('/sw.js',
    //    '/assets/…') and cannot run under a demo subpath: answer the
    //    bundle's register() with an inert registration instead.
    // ============================================================
    if ('serviceWorker' in navigator && navigator.serviceWorker) {
        var inertRegistration = {
            installing: null,
            waiting: null,
            active: null,
            scope: document.baseURI,
            update: function () { return Promise.resolve(); },
            unregister: function () { return Promise.resolve(true); },
            addEventListener: function () { /* never fires */ },
            removeEventListener: function () { /* no-op */ },
            dispatchEvent: function () { return true; },
            onupdatefound: null
        };
        try {
            navigator.serviceWorker.register = function () {
                return Promise.resolve(inertRegistration);
            };
        } catch (e) {
            try {
                Object.defineProperty(navigator.serviceWorker, 'register', {
                    value: function () { return Promise.resolve(inertRegistration); }
                });
            } catch (e2) { /* leave as-is; the load handler's .then still settles */ }
        }
    }

    // ============================================================
    // 5. Demo banner height -> --demo-banner-h (the game is a fullscreen
    //    100dvh layout; index.html shrinks #root by the banner height).
    // ============================================================
    function syncBannerHeight() {
        var banner = document.querySelector('.demo-banner');
        if (!banner) return;
        var h = Math.ceil(banner.getBoundingClientRect().height);
        if (h > 0) document.documentElement.style.setProperty('--demo-banner-h', h + 'px');
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', syncBannerHeight);
    } else {
        syncBannerHeight();
    }
    window.addEventListener('resize', syncBannerHeight);
})();
