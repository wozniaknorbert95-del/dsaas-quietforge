/**
 * ==========================================
 * ZZPACKAGE WIZARD — STATIC DEMO BOOT LAYER
 * ==========================================
 *
 * Faithful client-side re-implementation of the PHP data/AJAX layer from
 * flexgrafik-wizard-theme/functions.php, so the ORIGINAL wizard JS
 * (wizard-1-3.js / wizard-presets.js / wizard-step-2.js / wizard-4-7.js)
 * runs unmodified against static files.
 *
 * Provides exactly the globals the PHP printed on /wizard/:
 *   - zzpWizardData        (wp_localize_script 'fg-wizard-app-script')
 *   - WizardWooCommerceData (fg_get_wizard_dynamic_inventory())
 *   - fgMasterCatalog      (SSoT JSON url + ver)
 *   - fgPresetManifest     (preset manifest url + ver)
 * and stubs the calls the JS makes:
 *   - POST admin-ajax.php action=fg_wizard_fresh_nonce  -> wp_send_json_success({nonce})
 *   - POST admin-ajax.php action=fg_wizard_add_to_cart  -> DEMO STOP (modal, order stops here)
 *   - GET  wp-json/fg/v1/prices                         -> fg_get_wizard_prices()
 *
 * DEMO STOP (the only behavioural change): the WooCommerce add-to-cart +
 * checkout redirect is replaced by a demo modal. Everything before it —
 * all steps, validation, pricing (Math.round total, €199 minimum, incl. 21%
 * BTW display, custom foil €49/m²) — is the original code path.
 */
(function () {
    'use strict';

    // ============================================================
    // 0. Config (relative paths — works from any static path root)
    // ============================================================
    var DATA_DIR = '../data/';
    var MASTER_URL = DATA_DIR + 'product-master-table.json';
    var PRESET_URL = DATA_DIR + 'preset-manifest.json';
    var IMAGES_DIR = '../images/';

    // PHP: wizard taxonomy slugs from WC product_cat (fg_get_wizard_dynamic_inventory)
    var STEP_SLUG = {
        1: 'wizard-1-foundation',
        2: 'wizard-2-car-branding',
        3: 'wizard-3-clothing',
        4: 'wizard-4-eerste-indruk',
        5: 'wizard-5-visibility',
        6: 'wizard-6-tools-gadgets',
        7: 'wizard-7-premium-extras'
    };

    // Base group keys of the step renderers (wizard-4-7.js) — the WC
    // _wizard_group meta mirror for rows whose SSoT wizard_group is empty.
    var BASE_GROUP_BY_STAP = {
        5: 'visibility',
        6: 'tools_and_gadgets',
        7: 'premium_extras'
    };

    // PHP fg_wizard_add_to_cart_callback — customSize rule: €49/m², min 1 m², ceil to euro
    var CUSTOM_FOIL_PRICE_M2 = 49;

    // ============================================================
    // 1. Game bridge / ?coupon=CODE (fg_wizard_capture_coupon_query +
    //    fg_wizard_build_game_bridge_banner_message — NL strings verbatim)
    // ============================================================
    var GAME_COUPON_LABELS = {
        'GAME10': '10% korting (GAME10)' // PHP fg_wizard_get_game_bonus_label_for_level(2)
    };

    function normalizeCoupon(raw) {
        // PHP: wc_format_coupon_code() ≈ uppercase + trim
        return String(raw === null || raw === undefined ? '' : raw).trim().toUpperCase();
    }

    function buildGameBridge() {
        var params = new URLSearchParams(window.location.search);
        var code = normalizeCoupon(params.get('coupon'));
        if (!code) {
            return { active: false };
        }
        try {
            // PHP persists the coupon in the WC session (fg_pending_wizard_coupon)
            // and applies it at checkout ("bij afrekenen").
            sessionStorage.setItem('fg_pending_wizard_coupon', code);
        } catch (e) { /* storage unavailable — banner still works */ }

        var label = GAME_COUPON_LABELS[code] || code;
        // PHP fg_wizard_build_game_bridge_banner_message() — coupon-only branch
        var message = 'Je hebt een bonus van de game! ' + label + ' wordt toegepast bij afrekenen (min. €199).';
        return {
            active: true,
            level: 2,
            bonusSku: '',
            bonusLabel: label,
            couponOnly: true,
            message: message
        };
    }

    // ============================================================
    // 2. Globals (wp_localize_script equivalents)
    // ============================================================
    window.zzpWizardData = {
        ajax_url: 'wp-admin/admin-ajax.php',   // stubbed via fetch() shim below
        nonce: 'demo',                          // wp_create_nonce('fg_wizard_checkout') — accepted by stub
        rest_url: 'wp-json/',                   // stubbed via fetch() shim below
        lazy_js_url: '../js/wizard-4-7.js',
        themeDir: '..',
        assetVers: {},                          // filemtime map — empty => no ?v= cache-bust
        gameBridge: buildGameBridge()
    };
    window.fgMasterCatalog = { url: MASTER_URL, ver: '1' };
    window.fgPresetManifest = { url: PRESET_URL, ver: '1' };
    // NOTE: window.WizardWooCommerceData is assigned the moment the master
    // JSON is fetched (see loadData below). Until then it stays undefined and
    // the wizard falls back to the /fg/v1/prices route — which our stub serves
    // from the same inventory, so both branches of fetchPricesFromWP() work.

    // ============================================================
    // 3. Inventory — fg_get_wizard_dynamic_inventory() shape
    // ============================================================
    function basename(path) {
        return String(path || '').split(/[\\/]/).pop();
    }

    function buildInventory(rows) {
        var inventory = {};
        (rows || []).forEach(function (row) {
            if (!row || !row.sku || String(row.sku).indexOf('__') === 0) return;
            var stap = parseInt(row.wizard_stap, 10);
            var slug = STEP_SLUG[stap];
            if (!slug) return;

            // PHP fg_wizard_resolve_theme_asset_image(): SSoT theme hero wins for
            // Foundation / Voertuig / Werkkleding / Eerste Indruk / Gereedschap.
            var image = '';
            var heroSteps = { 1: 1, 2: 1, 3: 1, 4: 1, 6: 1 };
            if (heroSteps[stap] && row.grafik_status === 'OK' && row.grafik_bestand) {
                image = IMAGES_DIR + basename(row.grafik_bestand);
            }

            inventory[row.sku] = {
                title: row.naam || '',
                short_description: '',
                description: '',
                image_url: image,
                price: parseFloat(row.price_suggested) || 0,
                wizard_step: slug,
                menu_order: row.menu_order || 0,
                group: row.wizard_group || BASE_GROUP_BY_STAP[stap] || 'dynamic',
                v_type: row.v_type || '',
                v_action: row.v_action || '',
                offer_mode: row.offer_mode || 'standard',
                product_type: row.product_type || 'product',
                legacy: row.legacy === true || row.legacy === 'yes',
                active: row.active !== false && row.active !== 'no',
                fit_note: row.fit_note || '',
                usage_hint: row.usage_hint || ''
            };
        });
        return inventory;
    }

    var masterRows = null;
    var inventory = null;

    var dataReady = fetch(MASTER_URL)
        .then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.json();
        })
        .then(function (rows) {
            masterRows = rows;
            inventory = buildInventory(rows);
            window.WizardWooCommerceData = inventory;
            return inventory;
        })
        .catch(function (err) {
            console.error('[demo-boot] product-master-table.json load failed:', err);
            return null;
        });

    function ssotRow(sku) {
        if (!masterRows) return null;
        for (var i = 0; i < masterRows.length; i++) {
            if (masterRows[i] && masterRows[i].sku === sku) return masterRows[i];
        }
        return null;
    }

    // ============================================================
    // 4. AJAX / REST stubs (request + response contracts of functions.php)
    // ============================================================
    function jsonResp(payload) {
        return Promise.resolve(new Response(JSON.stringify(payload), {
            status: 200,
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }));
    }

    /** The order stops here: the promise never settles (no cart, no redirect). */
    function orderStopsHere() {
        return new Promise(function () { /* intentionally pending */ });
    }

    // fg_wizard_add_to_cart_callback — mirror of the PHP line-item rules
    // (returns how many lines the WooCommerce cart would receive).
    function countAddableItems(sel) {
        var added = 0;
        var buckets = ['foundation', 'vehicleItems', 'clothing', 'print', 'visibility', 'tools', 'premium'];
        buckets.forEach(function (bucket) {
            var group = sel[bucket];
            if (!group || typeof group !== 'object') return;
            Object.keys(group).forEach(function (sku) {
                var qty = parseInt(group[sku], 10) || 0;
                if (qty < 1) return;
                var row = ssotRow(sku);
                // PHP add_sku(): WC SKU hit, or NA-CUSTOM fallback with SSoT price > 0
                if ((row && (parseFloat(row.price_suggested) || 0) > 0) || sku === 'NA-CUSTOM' || sku === 'MA-CUSTOM') {
                    added++;
                }
            });
        });

        // PHP customSize block: €49/m², min 1 m², ceil to euro (NA-CUSTOM line)
        var cs = sel.customSize;
        if (cs && typeof cs === 'object') {
            var w = parseInt(cs.width, 10) || 0;
            var h = parseInt(cs.height, 10) || 0;
            if (w >= 10 && h >= 10 && w <= 250 && h <= 100) {
                var m2 = Math.max(1, (w * h) / 10000);
                cs.price = Math.ceil(m2 * CUSTOM_FOIL_PRICE_M2); // PHP: ceil($cs_m2 * 49)
                added++;
            }
        }
        return added;
    }

    function handleAjax(init) {
        var body = (init && init.body) ? init.body : '';
        var params = new URLSearchParams(typeof body === 'string' ? body : String(body));
        var action = params.get('action');

        if (action === 'fg_wizard_fresh_nonce') {
            // PHP fg_wizard_fresh_nonce_callback()
            return jsonResp({ success: true, data: { nonce: 'demo' } });
        }

        if (action === 'fg_wizard_add_to_cart') {
            // PHP: check_ajax_referer('fg_wizard_checkout', '_ajax_nonce') — accepted here.
            var sel = {};
            try { sel = JSON.parse(params.get('selections') || '{}') || {}; } catch (e) { sel = {}; }

            if (!sel || Object.keys(sel).length === 0) {
                // PHP wp_send_json_error('Geen selecties ontvangen.')
                return jsonResp({ success: false, data: 'Geen selecties ontvangen.' });
            }
            if (countAddableItems(sel) === 0) {
                // PHP wp_send_json_error('Er konden geen producten ...')
                return jsonResp({ success: false, data: 'Er konden geen producten aan de winkelwagen worden toegevoegd. Controleer de productconfiguratie of probeer opnieuw.' });
            }

            // DEMO STOP — instead of WC()->cart + redirect to WooCommerce checkout:
            showDemoStopModal();
            return orderStopsHere();
        }

        // Unknown action: WordPress answers '0'
        return jsonResp('0');
    }

    var origFetch = window.fetch ? window.fetch.bind(window) : null;
    window.fetch = function (input, init) {
        var url = '';
        try {
            url = (typeof input === 'string') ? input : (input && input.url) || '';
        } catch (e) { /* Request not inspectable — pass through */ }

        if (/admin-ajax\.php/.test(url)) {
            return handleAjax(init);
        }
        if (/fg\/v1\/prices/.test(url)) {
            // PHP fg_get_wizard_prices() is {sku: price}; the JS feeds the
            // response to applyWpData() which expects WizardWooCommerceData
            // items — so serve the inventory shape (same data the PHP page
            // inlined as WizardWooCommerceData).
            return dataReady.then(function (inv) {
                return jsonResp(inv || {});
            });
        }
        return origFetch(input, init);
    };

    // ============================================================
    // 5. Theme asset images -> ../images/<file> (demo image pipeline)
    //    The original resolves theme assets under /assets/images/... ;
    //    the demo serves them flat from ../images/ (grafik_bestand names).
    // ============================================================
    function mapAssetUrl(url) {
        if (!url || typeof url !== 'string') return url;
        var i = url.search(/\/assets\/(?:images|img)\//);
        if (i === -1) return url;
        var rest = url.slice(i + '/assets/'.length);
        var query = '';
        var qi = rest.indexOf('?');
        if (qi !== -1) {
            query = rest.slice(qi);
            rest = rest.slice(0, qi);
        }
        return IMAGES_DIR + basename(rest) + query;
    }

    function rewriteHtmlAssetUrls(html) {
        return String(html).replace(/(src=")([^"]*)(")/g, function (m, a, url, c) {
            return a + mapAssetUrl(url) + c;
        });
    }

    // Neutral placeholder styled like the theme (dark panel, faded icon),
    // used for any image missing from the demo image set.
    var PLACEHOLDER_IMG = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180">' +
        '<rect width="320" height="180" fill="#111111"/>' +
        '<rect x="8" y="8" width="304" height="164" fill="none" stroke="#2a2a32" stroke-width="2"/>' +
        '<g fill="none" stroke="#9ca3af" stroke-width="2" opacity="0.5">' +
        '<rect x="132" y="66" width="56" height="48"/>' +
        '<circle cx="148" cy="82" r="5"/>' +
        '<polyline points="184,106 168,90 140,114"/>' +
        '</g></svg>'
    );

    window.addEventListener('error', function (e) {
        var t = e.target;
        if (!t || !t.tagName || t.tagName !== 'IMG') return;
        if (t.getAttribute('data-demo-fallback') === '1') return;
        var src = t.getAttribute('src') || '';
        // one extension retry (.png/.jpg/.webp) in case the image pipeline re-encoded
        if (/\.png$/i.test(src) && t.getAttribute('data-demo-retry') !== '1') {
            t.setAttribute('data-demo-retry', '1');
            t.src = src.replace(/\.png$/i, '.webp');
            return;
        }
        if (/\.(webp|jpe?g)$/i.test(src) && t.getAttribute('data-demo-retry') !== '1') {
            t.setAttribute('data-demo-retry', '1');
            t.src = src.replace(/\.(webp|jpe?g)$/i, '.png');
            return;
        }
        t.setAttribute('data-demo-fallback', '1');
        t.src = PLACEHOLDER_IMG;
    }, true);

    // ============================================================
    // 6. DEMO STOP modal
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
        if (!modal) return;
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
        // Restore the original "Afrekenen" button state (wizard-4-7.js resetBtn
        // markup) without re-rendering, so the checkout form keeps its input.
        var ZZP = globalRef('ZZPWizard');
        var btn = ZZP && ZZP.$nextBtn;
        if (btn) {
            btn.innerHTML = '<svg class="wiz-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> Afrekenen';
            btn.disabled = false;
            btn.style.opacity = '';
            btn.classList.remove('is-disabled');
        }
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
    // 7. Image-URL patch — runs before ZZPWizard.init() (first
    //    DOMContentLoaded listener; original scripts register theirs later).
    //    NOTE: wizard-1-3.js declares `const ZZPWizard` — a lexical global,
    //    not a window property, so it must be referenced by name.
    // ============================================================
    function globalRef(name) {
        try {
            if (name === 'ZZPWizard') return typeof ZZPWizard !== 'undefined' ? ZZPWizard : null;
            if (name === 'ZZPStep2Engine') return typeof ZZPStep2Engine !== 'undefined' ? ZZPStep2Engine : null;
            return null;
        } catch (e) {
            return null;
        }
    }

    function patchWizardImageUrls() {
        var ZZP = globalRef('ZZPWizard');
        var S2 = globalRef('ZZPStep2Engine');

        if (ZZP && typeof ZZP._resolveSsoFallbackImage === 'function' && !ZZP._resolveSsoFallbackImage._demoPatched) {
            var origSso = ZZP._resolveSsoFallbackImage.bind(ZZP);
            ZZP._resolveSsoFallbackImage = function (sku, ssoItem, stepKey) {
                return mapAssetUrl(origSso(sku, ssoItem, stepKey));
            };
            ZZP._resolveSsoFallbackImage._demoPatched = true;
        }

        if (ZZP && typeof ZZP.renderStepIntro === 'function' && !ZZP.renderStepIntro._demoPatched) {
            var origIntro = ZZP.renderStepIntro.bind(ZZP);
            ZZP.renderStepIntro = function () {
                return rewriteHtmlAssetUrls(origIntro());
            };
            ZZP.renderStepIntro._demoPatched = true;
        }

        if (S2) [
            '_resolveMagnetHeroUrl',
            '_resolveWrapHeroUrl'
        ].forEach(function (name) {
            if (typeof S2[name] !== 'function' || S2[name]._demoPatched) return;
            var orig = S2[name].bind(S2);
            S2[name] = function (sku, vType) {
                return mapAssetUrl(orig(sku, vType));
            };
            S2[name]._demoPatched = true;
        });

        if (S2 && typeof S2.renderVehicleSelector === 'function' && !S2.renderVehicleSelector._demoPatched) {
            var origSel = S2.renderVehicleSelector.bind(S2);
            S2.renderVehicleSelector = function (vType) {
                return rewriteHtmlAssetUrls(origSel(vType));
            };
            S2.renderVehicleSelector._demoPatched = true;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', patchWizardImageUrls);
    } else {
        patchWizardImageUrls();
    }
})();
