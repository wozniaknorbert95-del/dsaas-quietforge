/**
 * ==========================================
 * FLEXGRAFIK WIZARD V5.0 - EAGER CHUNK (Stappen 0-3)
 * ==========================================
 * Rebuild: 2026-04-07 | SSoT Align
 */

const ZZPWizard = {
    // === CONFIG ===
    themeDir: (typeof zzpWizardData !== 'undefined' && zzpWizardData.themeDir) ? zzpWizardData.themeDir : '/wp-content/themes/flexgrafik-wizard-theme',

    // === STATE ===
    currentState: 0,
    cartValue: 0,
    _navDirection: 'forward', // P2-03: forward | backward for step transition animation
    _skipWarned: {},        // P0-02: tracks which steps already received skip-toast
    /** GA4: last wizard step index (0–8) for which `wizard_step_view` was sent — avoids double-fires on re-render */
    _gaStepViewTrackedForIndex: null,
    /** Stable GA4 step_id per index (matches render order; 9 steps = indices 0–8) */
    _gaStepIds: [
        'step_intro',
        'step_foundation',
        'step_vehicle',
        'step_clothing',
        'step_print',
        'step_visibility',
        'step_tools',
        'step_premium',
        'step_checkout'
    ],
    /** GA4: `threshold_199_reached` fires at most once per browser session when cart crosses to ≥ €199 */
    _gaThreshold199Fired: false,
    /** Pending timeout id for step leave cross-fade (cleared on rapid navigation) */
    _stepTransitionTimer: null,
    /** Active portaled tooltip trigger button */
    _activeTooltip: null,
    /** Backdrop for sheet-mode tooltips */
    _tooltipBackdrop: null,
    /** Delayed close timer for popover hover bridge */
    _tooltipCloseTimer: null,
    _tooltipPortalBound: false,
    /** Maps internal selection bucket → GA4 `product_category` */
    _gaProductCategoryMap: {
        foundation: 'foundation',
        vehicleItems: 'vehicle',
        clothing: 'clothing',
        print: 'print',
        visibility: 'visibility',
        tools: 'tools',
        premium: 'premium'
    },
    _navIconPrev: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    _navIconNext: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    selections: {
        foundation: {},      // F-001, DF-xxx
        vehicleType: null,   // 'caddy' | 'bus_l' | 'bus_xl' | 'passenger' | 'none'
        vehicleAction: null, // 'stickers' | 'magnets' | 'wrap'
        vehicleItems: {},    // { 'sku': quantity }
        customSize: null,    // { width, height, price } or null
        clothing: {},        // { 'sku': quantity }
        print: {},           // Step 4 "Eerste Indruk"
        visibility: {},      // { 'sku': quantity }
        tools: {},           // { 'sku': quantity }
        premium: {}          // { 'sku': quantity }
    },

    // === STEP DEFINITIONS ===
    steps: [
        { id: 0, name: 'Intro', title: 'Welkom', icon: 'step-intro.svg' },
        { id: 1, name: 'Fundament', title: 'Kies je brandingprojecten — de basis van alles', icon: 'step-fundament.svg' },
        { id: 2, name: 'Voertuig', title: 'Jouw bus rijdt 100+ km per dag. Dat is gratis reclame.', icon: 'step-voertuig.svg' },
        { id: 3, name: 'Werkkleding', title: 'Kleding maakt de vakman. Letterlijk.', icon: 'step-kleding.svg' },
        { id: 4, name: 'Eerste Indruk', title: 'Fysiek presenteren met drukwerk', icon: 'step-print.svg' },
        { id: 5, name: 'Zichtbaarheid', title: 'Laat zien dat jij hier aan het werk bent', icon: 'step-zichtbaarheid.svg' },
        { id: 6, name: 'Gereedschap', title: 'Jouw gereedschap is jouw visitekaartje', icon: 'step-gereedschap.svg' },
        { id: 7, name: 'Premium', title: 'De finishing touch', icon: 'step-premium.svg' },
        { id: 8, name: 'Checkout', title: 'Samenvatting & Afrekenen', icon: 'step-checkout.svg' }
    ],

    /** Inline SVG paths for category stepper chips (1:1 wizard-stepper-icon-v2 reference) */
    _wizStepIconPaths: [
        '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
        '<path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 17l9 5 9-5"/>',
        '<path d="M3 13l1-6a2 2 0 0 1 2-2h9.5a2 2 0 0 1 1.8 1.1L21 11v6h-2"/><path d="M3 17h2"/><path d="M9 17h7"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17.5" cy="17.5" r="1.6"/><path d="M3 11h14"/>',
        '<path d="M8 3l4 2 4-2 4 3-2.5 3.5L16 9v11H8V9l-1.5.5L4 6z"/>',
        '<rect x="3" y="6" width="18" height="12" rx="1"/><path d="M7 10h4"/><path d="M7 13h2"/><circle cx="16" cy="11" r="1.6"/><path d="M14 15c.4-1 1.1-1.6 2-1.6s1.6.6 2 1.6"/>',
        '<path d="M5 21V3"/><path d="M5 4h12l-2.5 3.5L17 11H5"/>',
        '<path d="M14.7 6.3a4 4 0 0 0-5.2 5.2L3 18v3h3l6.5-6.5a4 4 0 0 0 5.2-5.2l-2.6 2.6-2-2 2.6-2.6z"/>',
        '<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3z"/>',
        '<circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M3 4h2l2.2 11a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6"/>'
    ],

    // === CATALOGS (Data-Driven by WooCommerce) ===
    foundationCatalog: [],
    stickersCatalog: { caddy: [], 'bus_l': [], 'bus_xl': [], passenger: [] },
    wrapsCatalog:    { caddy: [], 'bus_l': [], 'bus_xl': [], passenger: [] },
    magnetsCatalog:  { caddy: [], 'bus_l': [], 'bus_xl': [], passenger: [] },
    clothingCatalog: [],
    printCatalog: [],
    visibilityCatalog: [],
    toolsCatalog: [],
    premiumCatalog: [],

    // === MASTER CATALOG (FAZA 2) ===
    masterCatalog: new Map(),

    loadMasterCatalog: async function () {
        if (typeof fgMasterCatalog === 'undefined' || !fgMasterCatalog.url) return;
        
        if (this.masterCatalog.size > 0) return;

        const cacheKey = 'zzpMasterCatalog_' + fgMasterCatalog.ver;
        
        // P1-09: Aggressive cache purge for new version
        if (!localStorage.getItem(cacheKey)) {
            console.log('New version detected or cache empty. Purging old zzp storage...');
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('zzp')) {
                    localStorage.removeItem(key);
                }
            });
        }

        const cachedRaw = localStorage.getItem(cacheKey);
        
        if (cachedRaw) {
            try {
                const parsed = JSON.parse(cachedRaw);
                this.masterCatalog = new Map(parsed);
                console.log('Master Catalog loaded from localStorage.');
                return;
            } catch (e) {
                console.error('BFCache master catalog parse error:', e);
            }
        }

        try {
            const response = await fetch(fgMasterCatalog.url + '?v=' + fgMasterCatalog.ver);
            if (!response.ok) throw new Error('HTTP ' + response.status);
            const data = await response.json();
            
            const tempMap = new Map();
            data.forEach(item => {
                if(item.sku) tempMap.set(item.sku, item);
            });
            this.masterCatalog = tempMap;

            localStorage.setItem(cacheKey, JSON.stringify(Array.from(tempMap.entries())));
            
            // Cleanup old versions
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('zzpMasterCatalog_') && key !== cacheKey) {
                    localStorage.removeItem(key);
                }
            });

            console.log('Master Catalog loaded and saved to localStorage.');
        } catch (error) {
            console.error('Error loading Master Catalog from JSON:', error);
        }
    },

    loadVehicleTypes: function () {
        if (!this.masterCatalog) return [];
        const metaEntry = this.masterCatalog.get('__WIZARD_META__VEHICLE_TYPES');
        return (metaEntry && metaEntry.data) ? metaEntry.data : [];
    },

    // === STATE MANAGEMENT / BFCACHE ===
    saveState: function () {
        const stateData = {
            currentState: this.currentState,
            cartValue: this.cartValue,
            selections: this.selections
        };
        
        if (typeof ZZPStep2Engine !== 'undefined') {
            stateData.step2 = {
                activeTab: ZZPStep2Engine.activeTab,
                selectedSizes: ZZPStep2Engine.selectedSizes
            };
        }

        localStorage.setItem('zzpWizardState', JSON.stringify(stateData));
        sessionStorage.setItem('zzpWizardState', JSON.stringify(stateData));
    },

    loadState: function () {
        const raw = localStorage.getItem('zzpWizardState') || sessionStorage.getItem('zzpWizardState');
        if (raw) {
            try {
                const data = JSON.parse(raw);
                if (data && data.selections) {
                    this.currentState = data.currentState || 0;
                    this.cartValue = data.cartValue || 0;
                    this.selections = data.selections;

                    if (data.step2 && typeof ZZPStep2Engine !== 'undefined') {
                        ZZPStep2Engine.activeTab = data.step2.activeTab || 'diy';
                        ZZPStep2Engine.selectedSizes = data.step2.selectedSizes || {};
                    }
                    return true;
                }
            } catch (e) { console.error('Error loading Wizard State:', e); }
        }
        return false;
    },

    clearState: function() {
        localStorage.removeItem('zzpWizardState');
        sessionStorage.removeItem('zzpWizardState');
    },

    loadLazyScriptIfNeeded: function () {
        if (typeof this.processCheckout === 'function') {
            return Promise.resolve();
        }
        if (this._lazyLoadPromise) {
            return this._lazyLoadPromise;
        }
        // Stuck state: flag set but chunk never attached processCheckout — allow reinjection.
        if (this.lazyScriptInjected) {
            document.querySelectorAll('script[src*="wizard-4-7"]').forEach((el) => el.remove());
            this.lazyScriptInjected = false;
        }

        this._lazyLoadPromise = new Promise((resolve, reject) => {
            this.lazyScriptInjected = true;
            const script = document.createElement('script');
            script.src = (typeof zzpWizardData !== 'undefined' && zzpWizardData.lazy_js_url) ? zzpWizardData.lazy_js_url : this.themeDir + '/assets/js/wizard-4-7.js';
            script.async = true;

            const finish = (fn) => {
                this._lazyLoadPromise = null;
                fn();
            };

            script.onload = () => {
                if (typeof this.onLazyLoaded === 'function') {
                    this.onLazyLoaded();
                    this.onLazyLoaded = null;
                }
                finish(resolve);
            };
            script.onerror = (e) => {
                this.lazyScriptInjected = false;
                console.error('Failed to load wizard-4-7 script', e);
                finish(() => reject(e));
            };
            if (document.body) {
                document.body.appendChild(script);
            } else {
                document.documentElement.appendChild(script);
            }
        });

        return this._lazyLoadPromise;
    },

    /**
     * Resolve when lazy checkout chunk (processCheckout) is available.
     * Used by intro jump and E2E-critical checkout path.
     */
    waitForCheckoutChunk: function (timeoutMs) {
        const timeout = typeof timeoutMs === 'number' ? timeoutMs : 30000;
        if (typeof this.processCheckout === 'function') {
            return Promise.resolve();
        }
        return this.loadLazyScriptIfNeeded().then(() => {
            if (typeof this.processCheckout === 'function') {
                return;
            }
            return new Promise((resolve, reject) => {
                const started = Date.now();
                const tick = () => {
                    if (typeof this.processCheckout === 'function') {
                        resolve();
                        return;
                    }
                    if (Date.now() - started >= timeout) {
                        reject(new Error('wizard-4-7 checkout chunk timeout'));
                        return;
                    }
                    setTimeout(tick, 50);
                };
                tick();
            });
        });
    },

    _runCheckoutWhenReady: function () {
        this.waitForCheckoutChunk().then(() => {
            if (typeof this.processCheckout === 'function') {
                this.processCheckout();
            }
        }).catch((err) => {
            console.error('Checkout chunk load failed:', err);
            if (typeof this.showCheckoutError === 'function') {
                this.showCheckoutError('Checkout kan niet worden geladen. Vernieuw de pagina en probeer opnieuw.');
            } else {
                this.scrollToWizard();
            }
        });
    },

    /**
     * Game bridge context from PHP (validated session); no PII in payload.
     */
    _getGameBridgeContext: function () {
        if (typeof zzpWizardData === 'undefined' || !zzpWizardData.gameBridge || !zzpWizardData.gameBridge.active) {
            return null;
        }
        return zzpWizardData.gameBridge;
    },

    renderGameBridgeBanner: function () {
        const bridge = this._getGameBridgeContext();
        if (!bridge || !bridge.message) {
            return;
        }
        const anchor = document.getElementById('wizard-content-area');
        if (!anchor || document.getElementById('fg-game-bonus-banner')) {
            return;
        }
        const banner = document.createElement('div');
        banner.id = 'fg-game-bonus-banner';
        banner.className = 'game-bonus-banner';
        banner.setAttribute('role', 'status');
        banner.innerHTML = `<strong>Game-bonus actief</strong> <span>${this._escapeHtml(bridge.message)}</span>`;
        anchor.parentNode.insertBefore(banner, anchor);
        this.fgTrack('wizard_game_bridge_banner_view', {
            level: bridge.level || 0,
            coupon_only: !!bridge.couponOnly,
        });
    },

    // === INITIALIZATION ===
    init: async function () {
        this.cacheDOM();
        this.renderGameBridgeBanner();
        this.bindEvents();
        this.injectStickyCart();
        this.loadState();
        await this.loadMasterCatalog();

        window.addEventListener('pageshow', (e) => {
            if (e.persisted) {
                this.loadState();
                this.updateCartWidget();
                if (this.currentState >= 2) this.loadLazyScriptIfNeeded();

                if (this.currentState === 8 && this.$nextBtn) {
                    const canCheckout = this.cartValue >= 199;
                    this.$nextBtn.innerHTML = '<svg class="wiz-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> Afrekenen';
                    this.$nextBtn.disabled = !canCheckout;
                    this.$nextBtn.classList.toggle('is-disabled', !canCheckout);
                    this.$nextBtn.onclick = canCheckout ? (ev) => { ev.preventDefault(); this._runCheckoutWhenReady(); } : null;
                }
            }
        });

            this.$contentArea.innerHTML = `<div class="wiz-loading-container">
                <div class="wizard-spinner wiz-spinner--loading"></div>
                <p>Producten laden...</p>
            </div>`;
        if (this.$prevBtn) this.$prevBtn.style.display = 'none';
        if (this.$nextBtn) this.$nextBtn.style.display = 'none';

        this.fetchPricesFromWP().then(() => {
            if (this.$nextBtn) this.$nextBtn.style.display = 'inline-block';
            if (this.currentState >= 2) this.loadLazyScriptIfNeeded();
            this.renderStep();
            this.fgTrack('wizard_start', {});
        });
    },

    fetchPricesFromWP: function () {
        if (typeof WizardWooCommerceData !== 'undefined') {
            this.applyWpData(WizardWooCommerceData);
            return Promise.resolve();
        }

        const endpoint = (typeof zzpWizardData !== 'undefined' && zzpWizardData.rest_url)
            ? zzpWizardData.rest_url + 'fg/v1/prices'
            : '/wp-json/fg/v1/prices';

        return fetch(endpoint)
            .then(res => res.json())
            .then(prices => {
                if (prices && typeof prices === 'object') {
                    this.applyWpData(prices);
                }
            })
            .catch(err => {
                console.error('Failed to fetch prices from WP, falling back to JS defaults', err);
            });
    },

    /**
     * Append ?v=filemtime for theme asset cache-bust (matches PHP fg_wizard_resolve_theme_asset_image).
     */
    _appendThemeAssetVer: function (url, grafikBestand) {
        if (!url || url.indexOf('?v=') >= 0) {
            return url;
        }
        const vers = (typeof zzpWizardData !== 'undefined' && zzpWizardData.assetVers) ? zzpWizardData.assetVers : {};
        const key = grafikBestand ? String(grafikBestand) : '';
        const v = key ? vers[key] : null;
        return v ? url + '?v=' + v : url;
    },

    /**
     * SSoT fallback image when WooCommerce has no image_url.
     */
    _resolveSsoFallbackImage: function (sku, ssoItem, stepKey) {
        const gb = ssoItem.grafik_bestand;
        if (ssoItem.grafik_status === 'placeholder') {
            return this.themeDir + '/assets/img/placeholder/placeholder.png';
        }
        if (!gb || String(gb).indexOf('..') >= 0) {
            return '';
        }
        if (gb.startsWith('wizard-step2_')) {
            if (/\.(webp|png|jpe?g)$/i.test(gb)) {
                return this._appendThemeAssetVer(this.themeDir + '/assets/images/wizard-step2/' + gb, gb);
            }
            return this._appendThemeAssetVer(this.themeDir + '/assets/images/wizard-step2/' + gb + '.webp', gb + '.webp');
        }
        // Voertuig (Stap 2) only — Gereedschap heroes live in /assets/images/{SKU}.png (P2-11).
        if (stepKey === 'wizard-2-car-branding') {
            const staticKnolling = {
                'caddy_set_logo_contact.png': 'wizard-step2_caddy_set_logo-contact_knolling_v1.png',
                'caddy_set_services.png': 'wizard-step2_caddy_set_diensten_knolling_v1.png',
                'caddy_set_pro.png': 'wizard-step2_caddy_set_pro-zzp_knolling_v1.png',
                'caddy_design_service.png': 'wizard-step2_addon_design48h_v1.png'
            };
            if (staticKnolling[gb]) {
                const kn = staticKnolling[gb];
                return this._appendThemeAssetVer(this.themeDir + '/assets/images/wizard-step2/' + kn, kn);
            }
            return this._appendThemeAssetVer(this.themeDir + '/assets/images/wizard-step2/' + gb, gb);
        }
        return this._appendThemeAssetVer(this.themeDir + '/assets/images/' + gb, gb);
    },

    applyWpData: function (sourceData) {
        // P0-05: SSoT-First Architecture. JSON is authoritative, WC is overlay.
        const STEP_CATALOG_MAP = {
            'wizard-1-foundation': 'foundationCatalog',
            'wizard-2-car-branding': 'stickersCatalog',
            'wizard-3-clothing': 'clothingCatalog',
            'wizard-4-eerste-indruk': 'printCatalog',
            'wizard-5-visibility': 'visibilityCatalog',
            'wizard-6-tools-gadgets': 'toolsCatalog',
            'wizard-7-premium-extras': 'premiumCatalog'
        };

        const STEP_ID_MAP = {
            1: 'wizard-1-foundation',
            2: 'wizard-2-car-branding',
            3: 'wizard-3-clothing',
            4: 'wizard-4-eerste-indruk',
            5: 'wizard-5-visibility',
            6: 'wizard-6-tools-gadgets',
            7: 'wizard-7-premium-extras'
        };

        // Reset catalogs
        Object.values(STEP_CATALOG_MAP).forEach(catalogName => {
            if (Array.isArray(this[catalogName])) this[catalogName] = [];
        });

        const vehicleCatalogs = ['stickersCatalog', 'wrapsCatalog', 'magnetsCatalog'];
        vehicleCatalogs.forEach(cat => {
            this[cat] = { caddy: [], 'bus_l': [], 'bus_xl': [], passenger: [] };
        });

        if (!this.masterCatalog || this.masterCatalog.size === 0) {
            console.error('[Wizard Config] Master Catalog empty. Cannot build SSoT catalogs.');
            // P0-05 PATCH: If masterCatalog is empty, try to reload it once
            this.loadMasterCatalog().then(() => {
                if (this.masterCatalog.size > 0) this.applyWpData(sourceData);
            });
            return;
        }

        console.log(`[Wizard Config] Applying data to ${this.masterCatalog.size} SSoT items.`);
        const unknownKeys = new Set();
        let processedCount = 0;

        // FAZA 2: Iterujemy po SSoT (Sacred SKUs)
        this.masterCatalog.forEach((ssoItem, sku) => {
            try {
                const wpItem = (sourceData && sourceData[sku]) ? sourceData[sku] : null;
                
                // P0-05 PATCH: Robust active check. Only skip if explicitly false (bool or string)
                const isActive = ssoItem.active !== false && ssoItem.active !== 'false';
                const isLegacy = ssoItem.legacy === true || ssoItem.legacy === 'true' || ssoItem.legacy === 'yes';
                
                if (!isActive || isLegacy) {
                    return;
                }

                // Resolve Step Key (Priority: WC -> SSoT)
                const ssoStapRaw = ssoItem.wizard_stap || ssoItem.step;
                const ssoStap = ssoStapRaw ? parseInt(ssoStapRaw, 10) : null;
                
                let stepKey = (wpItem && wpItem.wizard_step) ? wpItem.wizard_step : (ssoStap ? STEP_ID_MAP[ssoStap] : null);
                
                if (!stepKey) {
                    return;
                }

                // Resolve Image (Foundation + grafik_status OK: SSoT theme hero; else WC -> SSoT fallback)
                let finalImage = '';
                const ssoHeroReady = ssoItem.grafik_status === 'OK' && ssoItem.grafik_bestand;
                const ssoThemeHeroReady = ssoHeroReady && (
                    stepKey === 'wizard-1-foundation' ||
                    stepKey === 'wizard-2-car-branding' ||
                    stepKey === 'wizard-3-clothing' ||
                    stepKey === 'wizard-4-eerste-indruk' ||
                    stepKey === 'wizard-6-tools-gadgets'
                );
                if (ssoThemeHeroReady) {
                    finalImage = this._resolveSsoFallbackImage(sku, ssoItem, stepKey);
                } else {
                    finalImage = (wpItem && wpItem.image_url) ? wpItem.image_url : '';
                    if (!finalImage && ssoItem.grafik_bestand) {
                        finalImage = this._resolveSsoFallbackImage(sku, ssoItem, stepKey);
                    }
                }

                const ssoUsageHint = (ssoItem.usage_hint && String(ssoItem.usage_hint).trim())
                    ? ssoItem.usage_hint
                    : '';

                const newItem = {
                    id: sku,
                    name: (wpItem && wpItem.title) ? wpItem.title : ssoItem.naam,
                    price: wpItem ? (parseFloat(wpItem.price) || 0) : (parseFloat(ssoItem.price_suggested) || 0),
                    img: finalImage,
                    desc: '',
                    usage_hint: ssoUsageHint || '',
                    group: (wpItem && wpItem.group) ? wpItem.group : (ssoItem.wizard_group || ssoItem.wizard_categorie || 'dynamic'),
                    menu_order: (wpItem && wpItem.menu_order) ? wpItem.menu_order : (ssoItem.menu_order || 0),
                    fit_note: (wpItem && wpItem.fit_note) ? wpItem.fit_note : (ssoItem.fit_note || ''),
                    focus_badge: (wpItem && wpItem.focus_badge) ? String(wpItem.focus_badge) : (ssoItem.focus_badge ? String(ssoItem.focus_badge) : '')
                };

                processedCount++;

                if (stepKey === 'wizard-2-car-branding' || stepKey === 'wizard-6-tools-gadgets') {
                    let vType = wpItem ? wpItem.v_type : ssoItem.v_type;
                    if (vType) {
                        vType = String(vType)
                            .replace(/^bestelbus_l$/, 'bus_l')
                            .replace(/^bestelbus_xl$/, 'bus_xl')
                            .replace(/^bus-l$/, 'bus_l')
                            .replace(/^bus-xl$/, 'bus_xl')
                            .replace(/^personenauto$/, 'passenger');
                    }

                    const vAction = wpItem ? wpItem.v_action : ssoItem.v_action;
                    const finalAction = vAction || (stepKey === 'wizard-6-tools-gadgets' ? 'magnets' : 'stickers');
                    const finalType = vType || 'all';

                    const targetCats = (finalAction === 'stickers') ? this.stickersCatalog :
                                     (finalAction === 'wrap') ? this.wrapsCatalog :
                                     (finalAction === 'magnets') ? this.magnetsCatalog : null;

                    if (targetCats) {
                        if (finalType === 'all' || finalType === 'all-vehicles' || finalType === 'passenger') {
                            const tKey = (finalType === 'passenger') ? 'passenger' : null;
                            if (tKey) {
                                targetCats[tKey].push(newItem);
                            } else {
                                Object.keys(targetCats).forEach(k => targetCats[k].push(newItem));
                            }
                        } else if (targetCats[finalType]) {
                            targetCats[finalType].push(newItem);
                        }
                    }
                    
                    if (stepKey === 'wizard-6-tools-gadgets' && finalAction !== 'magnets') {
                        this.toolsCatalog.push(newItem);
                    }
                } else if (STEP_CATALOG_MAP[stepKey]) {
                    const catalogName = STEP_CATALOG_MAP[stepKey];
                    if (Array.isArray(this[catalogName])) {
                        this[catalogName].push(newItem);
                    }
                } else {
                    unknownKeys.add(`Key: "${stepKey}" (SKU: ${sku})`);
                }
            } catch (err) {
                console.error(`[Wizard Config] Error processing SKU ${sku}:`, err);
            }
        });

        if (unknownKeys.size > 0) {
            console.warn('[Wizard Config] Unknown step keys detected. Items bypassed:', Array.from(unknownKeys));
        }

        const sortByOrder = (a, b) => (a.menu_order || 0) - (b.menu_order || 0);
        Object.values(STEP_CATALOG_MAP).forEach(catalogName => {
            if (Array.isArray(this[catalogName])) this[catalogName].sort(sortByOrder);
        });

        // P0-05 PATCH: If SSoT arrived late, force a re-render to show tooltips/marketing data
        if (this.isInitialized && typeof this.renderStep === 'function') {
            console.log('[Wizard Config] Late SSoT arrival detected. Forcing re-render.');
            this.renderStep();
        }
    },

    cacheDOM: function () {
        this.$app = document.getElementById('zzp-wizard-app');
        if (!this.$app) return;
        this.$progress = this.$app.querySelector('.wizard-progress-bar');
        this.$contentArea = this.$app.querySelector('#wizard-content-area');
        this.$prevBtn = this.$app.querySelector('#wizard-prev-btn');
        this.$nextBtn = this.$app.querySelector('#wizard-next-btn');
        this.$mobileCtaBar = document.getElementById('wizard-mobile-cta-bar');
        this.$mobileCtaBtn = document.getElementById('wizard-mobile-cta-btn');
        this.$mobileCtaStep = document.getElementById('wizard-mobile-cta-step');
        if (this.$mobileCtaBtn && !this._mobileCtaBound) {
            this._mobileCtaBound = true;
            this.$mobileCtaBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.currentState === 0 && typeof this.startConfiguratorFromIntro === 'function') {
                    this.startConfiguratorFromIntro();
                    return;
                }
                if (this.$nextBtn && !this.$nextBtn.disabled) {
                    this.$nextBtn.click();
                }
            });
        }
    },

    bindEvents: function () {
        if (!this.$app) return;

        this.$nextBtn.addEventListener('click', (e) => {
            if (this.currentState < this.steps.length - 1) {
                e.preventDefault();
                this.nextStep();
            }
        });

        window.addEventListener('resize', () => {
            if (!this.isInitialized) {
                return;
            }
            if (typeof this.updateMobileCtaBar === 'function') {
                this.updateMobileCtaBar();
            }
            if (this.currentState === 8 && typeof this._syncCheckoutStickyPanel === 'function') {
                this._syncCheckoutStickyPanel();
            }
            if (typeof this._repositionActiveTooltip === 'function') {
                this._repositionActiveTooltip();
            }
        });

        this.$prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.prevStep();
        });

        this.$contentArea.addEventListener('click', (e) => {
            if (!e.target.closest('.fg-info-tooltip') && !e.target.closest('.fg-info-tooltip-content.is-portaled') && !e.target.closest('.fg-info-tooltip-backdrop')) {
                this._closeAllTooltips();
            }

            const stepperBtn = e.target.closest('.wizard-stepper-btn');
            if (stepperBtn) {
                const action = stepperBtn.dataset.action;
                const id = stepperBtn.dataset.id;
                const category = stepperBtn.dataset.category;
                this.updateQuantity(category, id, action);
                return;
            }

            const tipTrigger = e.target.closest('.fg-info-tooltip');
            if (tipTrigger) {
                if (e.target.closest('a.tooltip-more-link')) return;
                e.preventDefault();
                e.stopPropagation();
                const wasOpen = tipTrigger.classList.contains('is-open');
                this._closeAllTooltips();
                if (!wasOpen) this._showTooltip(tipTrigger);
                return;
            }

            const card = e.target.closest('.wizard-card, .option-card');
            if (card) this.handleCardClick(card);
        });

        this._bindTooltipPortalEvents();

        this.$contentArea.addEventListener('keydown', (e) => {
            const card = e.target.closest('.wizard-card, .option-card');
            if (card && (e.key === 'Enter' || e.key === ' ')) {
                if (e.target.closest('button') || e.target.closest('input')) {
                    if (e.key === ' ') e.preventDefault();
                    return;
                }
                e.preventDefault();
                this.handleCardClick(card);
            }
        });

        this.$contentArea.addEventListener('input', (e) => {
            if (e.target.id === 'custom-width' || e.target.id === 'custom-height') {
                this.calcCustomSize();
            }
        });

        // P4-01: Progress bar navigation
        if (this.$progress) {
            this.$progress.addEventListener('click', (e) => {
                const stepNode = e.target.closest('.wiz-step, .wizard-progress-step');
                if (stepNode) {
                    const targetStep = parseInt(stepNode.dataset.step, 10);
                    const isDone = stepNode.dataset.state === 'done' || stepNode.classList.contains('completed');
                    if (Number.isFinite(targetStep) && (targetStep < this.currentState || isDone)) {
                        this.jumpToStep(targetStep);
                    } else if (targetStep === this.currentState + 1) {
                        this.nextStep();
                    }
                }
            });
        }
    },

    nextStep: function () {
        if (this.currentState < this.steps.length - 1) {

            // P0-02: Soft step validation — first skip shows toast, second click proceeds
            const isEmpty = this._isCurrentStepEmpty();
            if (isEmpty && !this._skipWarned[this.currentState]) {
                this._skipWarned[this.currentState] = true;
                this._showSkipToast(this.steps[this.currentState].name);
                return;
            }

            this._navDirection = 'forward';
            this.currentState++;
            if (this.currentState >= 2) this.loadLazyScriptIfNeeded();
            this.saveState();
            this.renderStep();
            this.scrollToWizard();
        }
    },

    jumpToStep: function (stepIndex) {
        if (stepIndex === this.currentState) return;
        this._navDirection = stepIndex > this.currentState ? 'forward' : 'backward';
        this.currentState = stepIndex;
        if (this.currentState >= 2) this.loadLazyScriptIfNeeded();
        this.saveState();
        this.renderStep();
        this.scrollToWizard();
    },

    // P0-02: Returns true if the current step has no selections made
    _isCurrentStepEmpty: function () {
        const s = this.selections;
        switch (this.currentState) {
            case 0: return false; // Intro: no selection required
            case 1: return Object.keys(s.foundation || {}).length === 0;
            case 2: return !s.vehicleType; // null = no selection
            case 3: return Object.keys(s.clothing || {}).length === 0;
            case 4: return Object.keys(s.print || {}).length === 0;
            case 5: return Object.keys(s.visibility || {}).length === 0;
            case 6: return Object.keys(s.tools || {}).length === 0;
            case 7: return Object.keys(s.premium || {}).length === 0;
            default: return false;
        }
    },

    // P0-02: Show an informative non-blocking toast
    _showSkipToast: function (stepName) {
        const existing = document.getElementById('wiz-skip-toast');
        if (existing) {
            existing.classList.add('removing');
            setTimeout(() => existing.remove(), 400);
        }

        const iconSvg = `<svg class="wiz-skip-toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
        const toast = document.createElement('div');
        toast.id = 'wiz-skip-toast';
        toast.className = 'wiz-skip-toast';
        toast.innerHTML = `${iconSvg}<div><strong>${stepName} overgeslagen</strong>Klik nogmaals op <em>Volgende</em> om door te gaan, of ga terug om te selecteren.</div>`;
        (document.body || document.documentElement).appendChild(toast);

        // Auto-remove after 3.2s with fade-out
        const removeTimer = setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.add('removing');
                setTimeout(() => { if (toast.parentNode) toast.remove(); }, 400);
            }
        }, 3200);

        // Remove on next navigation
        toast._removeTimer = removeTimer;
    },

    prevStep: function () {
        if (this.currentState > 0) {
            // Clear skip warning for current step when going back
            delete this._skipWarned[this.currentState];
            this._navDirection = 'backward';
            this.currentState--;
            this.renderStep();
            this.scrollToWizard();
        }
    },

    scrollToWizard: function () {
        const el = this.$app || document.getElementById('zzp-wizard-app');
        if (el) {
            const headerOffset = 80;
            const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        }
    },

    renderStep: function () {
        this._closeAllTooltips();
        const step = this.steps[this.currentState];
        let htmlContent = '';

        if (this.currentState >= 4 && typeof this.renderStepVisibility !== 'function') {
            if (this._stepTransitionTimer) {
                clearTimeout(this._stepTransitionTimer);
                this._stepTransitionTimer = null;
            }
            this.$contentArea.innerHTML = `<div class="wiz-loading-container">
                <div class="wizard-spinner wiz-spinner--loading"></div>
                <p>Laden...</p>
            </div>`;
            this.onLazyLoaded = () => this.renderStep();
            this.loadLazyScriptIfNeeded();
            return;
        }

        switch (this.currentState) {
            case 0: htmlContent = this.renderStepIntro(); break;
            case 1: htmlContent = this.renderStepFoundation(); break;
            case 2: htmlContent = this.renderStepVehicle(); break;
            case 3: htmlContent = this.renderStepClothing(); break;
            case 4: htmlContent = this.renderStepPrint(); break;
            case 5: htmlContent = this.renderStepVisibility(); break;
            case 6: htmlContent = this.renderStepTools(); break;
            case 7: htmlContent = this.renderStepPremium(); break;
            case 8: htmlContent = this.renderStepSummary(); break;
        }

        const navDir = this._navDirection || 'forward';
        this._navDirection = 'forward';

        const paintStep = () => {
            let stepTitle = step.title;
            if (this.currentState === 8 && typeof this.isQuoteModePreset === 'function' && this.isQuoteModePreset()) {
                stepTitle = 'Samenvatting & offerte';
            }

            const stepPanelHeader = this.currentState === 0
                ? ''
                : this._renderStepPanelHeader(stepTitle);

            this.$contentArea.innerHTML = `
            <div class="wizard-step-shell">
                <div class="wizard-step-container step-panel step-active" id="step-${step.id}" data-direction="${navDir}">
                    ${stepPanelHeader}
                    <div class="wizard-step-body">${htmlContent}</div>
                </div>
            </div>`;

            this.$prevBtn.style.display = this.currentState === 0 ? 'none' : 'inline-block';
            const $nav = this.$app && this.$app.querySelector('.wizard-navigation');
            if (this.$nextBtn) {
                this.$nextBtn.style.display = this.currentState === 0 ? 'none' : 'inline-block';
            }
            if ($nav) {
                $nav.style.display = this.currentState === 0 ? 'none' : '';
            }

            if (this.currentState === 8) {
                const quoteMode = typeof this.isQuoteModePreset === 'function' && this.isQuoteModePreset();
                const canCheckout = typeof this._canWizardCheckout === 'function'
                    ? this._canWizardCheckout()
                    : (!quoteMode && this.cartValue >= 199);
                const nextBtnIcon = '<svg class="wiz-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>';
                
                if (quoteMode) {
                    this.$nextBtn.innerHTML = `Offerte via WhatsApp ${this._navIconNext}`;
                    this.$nextBtn.disabled = false;
                    this.$nextBtn.classList.remove('is-disabled');
                    this.$nextBtn.onclick = (e) => {
                        e.preventDefault();
                        if (typeof this._openQuoteWhatsApp === 'function') {
                            this._openQuoteWhatsApp();
                        }
                    };
                } else if (canCheckout) {
                    this.$nextBtn.innerHTML = `${nextBtnIcon} Afrekenen`;
                    this.$nextBtn.disabled = false;
                    this.$nextBtn.classList.remove('is-disabled');
                    this.$nextBtn.onclick = (e) => { e.preventDefault(); this._runCheckoutWhenReady(); };
                } else {
                    this.$nextBtn.innerHTML = `<div class="wiz-btn-stack">
                        <span>${nextBtnIcon} Afrekenen</span>
                        <span class="wiz-btn-subtext">Nog €${(199 - this.cartValue).toFixed(0)} te gaan</span>
                    </div>`;
                    this.$nextBtn.disabled = true;
                    this.$nextBtn.classList.add('is-disabled');
                    this.$nextBtn.onclick = null;
                }
            } else {
                let subtext = '';
                const nextIcon = this._navIconNext;

                // P1-09: Inform about €199 minimum at Vehicle step — do not block navigation
                if (this.currentState === 2 && this.cartValue < 199 && this.selections.vehicleType !== 'none') {
                    subtext = `<span class="wiz-btn-subtext">Minimaal bestelbedrag is €199,-</span>`;
                }

                if (subtext !== '') {
                    this.$nextBtn.innerHTML = `<div class="wiz-btn-stack">
                        <span>Volgende ${nextIcon}</span>
                        ${subtext}
                    </div>`;
                } else if (this.currentState === 0) {
                    if (typeof this.isQuoteModePreset === 'function' && this.isQuoteModePreset()) {
                        this.$nextBtn.innerHTML = `Bekijk alle categorieën ${nextIcon}`;
                    } else if (this.activePresetId) {
                        this.$nextBtn.innerHTML = `Doorloop alle stappen ${nextIcon}`;
                    } else {
                        this.$nextBtn.innerHTML = `Start de configurator ${nextIcon}`;
                    }
                } else {
                    this.$nextBtn.innerHTML = `Volgende ${nextIcon}`;
                }

                this.$nextBtn.disabled = false;
                this.$nextBtn.classList.remove('is-disabled');
                this.$nextBtn.onclick = null;
            }
            if (this.currentState === 8 && typeof this._bindCheckoutStepUI === 'function') {
                this._bindCheckoutStepUI();
            }
            this.updateCartWidget();
            this._syncCheckoutStickyPanel();
            this.updateProgressBar();
            this.updateMobileCtaBar();
            this.trackWizardStepView();
        };

        const rapidRetrigger = !!this._stepTransitionTimer;
        if (this._stepTransitionTimer) {
            clearTimeout(this._stepTransitionTimer);
            this._stepTransitionTimer = null;
        }

        const existingShell = this.$contentArea.querySelector('.wizard-step-shell');
        if (existingShell && !rapidRetrigger) {
            existingShell.classList.add('wizard-step-shell-leave');
            this._stepTransitionTimer = setTimeout(() => {
                this._stepTransitionTimer = null;
                paintStep();
            }, 200);
        } else {
            paintStep();
        }
    },

    renderStepIntro: function () {
        return '<div class="wiz-loading-container"><div class="wizard-spinner"></div><p>Groeipaden laden&hellip;</p></div>';
    },

    _renderStepPanelHeader: function (stepTitle) {
        const step = this.steps[this.currentState];
        const stepNum = this.currentState + 1;
        const help = this._getStepPanelHelp(this.currentState);
        const safeName = this._escapeHtml(step.name);
        const safeTitle = this._escapeHtml(stepTitle);
        const safeHelp = help ? this._escapeHtml(help) : '';
        return `
            <div class="panel-eyebrow">Stap ${stepNum} · ${safeName}</div>
            <h2 class="panel-title">${safeTitle}</h2>
            ${safeHelp ? `<p class="panel-help">${safeHelp}</p>` : ''}`;
    },

    _getStepPanelHelp: function (stepIndex) {
        const copy = {
            1: 'Het fundament van je merk. F-001 is de aanbevolen basis; voeg per onderdeel een ontwerp-module toe wanneer je die nodig hebt.',
            2: 'Eerst je voertuigtype, dan wat je wilt bereiken. Prijzen en maten passen zich automatisch aan.',
            3: 'Kies kledingstukken en aantallen. Jouw logo wordt door ons genapresst — kies hieronder het formaat in Logo-bedrukking (HTV).',
            4: 'Kies papieren of sticker-visitekaartjes — 1-zijdig, 2-zijdig of met laminaat voor zware omstandigheden.',
            5: 'Borden, stickers en signing — zichtbaar op de werf en onderweg.',
            6: 'Gereedschap en accessoires met jouw branding.',
            7: 'Premium upgrades voor maximale merkbeleving.',
            8: 'Rond je configuratie af. Je betaalt pas na goedkeuring van de briefing — geen verrassingen.'
        };
        return copy[stepIndex] || '';
    },

    renderStepFoundation: function () {
        const foundationSkus = ['F-001', 'DF-004', 'DF-005', 'DF-006', 'DF-007', 'F-001-SOC'];
        const coreItems = this.foundationCatalog
            .filter(i => foundationSkus.includes(i.id))
            .sort((a, b) => foundationSkus.indexOf(a.id) - foundationSkus.indexOf(b.id));

        return this._renderFoundationCatalog(coreItems, 'foundation');
    },

    renderStepVehicle: function () {
        if (typeof ZZPStep2Engine !== 'undefined' && typeof ZZPStep2Engine.renderStepVehicleUI === 'function') {
            return ZZPStep2Engine.renderStepVehicleUI();
        }
        return `<div class="wizard-spinner"></div>`;
    },

    renderStepClothing: function () {
        const sizeBanner = `
            <div class="w2-hint-box w2-clothing-size-banner wiz-clothing-hint" role="note">
                <svg class="w2-clothing-size-banner__icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--wizard-secondary)" stroke-width="2" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="16" y2="11"/></svg>
                <div><strong>Kies de juiste maat:</strong>
                <a href="/materialen" target="_blank" rel="noopener noreferrer" class="wizard-global-mat-link">Bekijk de maattabel →</a></div>
            </div>`;

        const baseCatalog = this.clothingCatalog.filter(i => !i.id.startsWith('HT-'));
        const htvOrder = ['HT-003', 'HT-002', 'HT-001', 'HT-102', 'HT-103'];
        const htvCatalog = this.clothingCatalog
            .filter(i => i.id.startsWith('HT-'))
            .sort((a, b) => {
                const ai = htvOrder.indexOf(a.id);
                const bi = htvOrder.indexOf(b.id);
                return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
            });

        const htvHint = `
            <div class="w2-hint-box w2-hint-box--primary wiz-clothing-hint wiz-clothing-htv-hint" role="note">
                <p><strong class="wiz-white-text">Logo-bedrukking (HTV):</strong> kies het logoformaat dat bij je team past — wij persen jouw huisstijl op elk besteld kledingstuk. Branchegrafiek of pakket kan hier.</p>
            </div>`;

        const clothingBadge = (item) => this._catalogFocusBadge(item);

        return `
            ${sizeBanner}
            <div class="panel-section-title">Kleding</div>
            ${this._renderOptionCardGrid(baseCatalog, 'clothing', {
                gridClass: 'option-grid cols-3 wiz-catalog-grid wiz-clothing-catalog',
                ariaLabel: 'Kleding',
                getBadge: clothingBadge
            })}
            <div class="panel-section-title">Logo-bedrukking (HTV)</div>
            ${htvHint}
            ${this._renderOptionCardGrid(htvCatalog, 'clothing', {
                gridClass: 'option-grid cols-3 wiz-catalog-grid wiz-clothing-catalog wiz-clothing-catalog--htv',
                ariaLabel: 'Logo-bedrukking HTV',
                getBadge: clothingBadge
            })}`;
    },

    /** Yellow focus badge for catalog option-cards (steps 3–7). */
    _catalogFocusBadge: function (item) {
        return item.focus_badge
            ? `<span class="oc-badge oc-badge--focus">${this._escapeHtml(item.focus_badge)}</span>`
            : '';
    },

    /** NL euro display; amounts rounded to cents before format to avoid float drift */
    _formatEurNl: function (amount) {
        const n = Number(amount);
        if (!Number.isFinite(n)) return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(0);
        const cents = Math.round((n + Number.EPSILON) * 100) / 100;
        return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(cents);
    },

    _renderFocusBadge: function (label) {
        if (!label) return '';
        const safe = this._escapeHtml(label);
        const bolt = '<svg class="wizard-focus-badge__icon" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
        return `<span class="wizard-focus-badge" aria-label="${safe}">${bolt}<span class="wizard-focus-badge__text">${safe}</span></span>`;
    },

    _escapeHtml: function (str) {
        return String(str).replace(/[<>&"']/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c]));
    },

    _renderFoundationCatalog: function (catalog, category) {
        return this._renderOptionCardGrid(catalog, category, {
            gridClass: 'option-grid cols-3 wiz-foundation-grid',
            ariaLabel: 'Brandingprojecten',
            getBadge: (item) => this._catalogFocusBadge(item)
        });
    },

    /**
     * Shared option-card grid renderer — Fundament + steps 4–7 (POLISH-D4 parity).
     */
    _renderOptionCardGrid: function (catalog, category, options) {
        if (!catalog || catalog.length === 0) return `<p class="wiz-empty-catalog-p">Geen producten gevonden.</p>`;
        const gridClass = options.gridClass || 'option-grid cols-3 wiz-foundation-grid';
        const ariaLabel = options.ariaLabel || 'Productkeuze';
        const getBadge = typeof options.getBadge === 'function' ? options.getBadge : () => '';
        const fallbackSvg = `<div class="wiz-faded-icon" aria-hidden="true"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>`;
        const checkSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

        return `<div class="${gridClass}" role="group" aria-label="${ariaLabel}">
            ${catalog.map(item => {
            const qty = this.selections[category][item.id] || 0;
            const isSelected = qty > 0;
            const safeName = this._escapeHtml(item.name);
            const hintRaw = item.usage_hint || '';
            const hint = hintRaw ? this._escapeHtml(hintRaw) : '';
            const media = item.img
                ? `<div class="oc-media"><img src="${item.img}" alt="${safeName}" loading="lazy" decoding="async"></div>`
                : `<div class="oc-media">${fallbackSvg}</div>`;
            const tooltip = this.renderTooltip ? this.renderTooltip(item.id, true) : '';
            const kenmerken = this.renderKenmerken ? this.renderKenmerken(item.id, 'list') : '';
            const badge = getBadge(item);

            return `
                <div class="option-card" data-id="${item.id}" data-sku="${item.id}" data-category="${category}" data-selected="${isSelected ? 'true' : 'false'}">
                    <span class="oc-check" aria-hidden="true">${isSelected ? checkSvg : ''}</span>
                    ${badge}
                    ${media}
                    <span class="oc-title">${safeName}</span>
                    ${hint ? `<span class="oc-desc">${hint}</span>` : ''}
                    ${kenmerken}
                    ${tooltip}
                    <span class="oc-price">${this._formatEurNl(item.price)} <small>Excl. BTW</small></span>
                    <div class="qty-control" data-qty-row>
                        <button type="button" class="wizard-stepper-btn" data-action="minus" data-id="${item.id}" data-category="${category}" aria-label="Verwijder één ${safeName}">−</button>
                        <span class="qv">${qty}</span>
                        <button type="button" class="wizard-stepper-btn" data-action="plus" data-id="${item.id}" data-category="${category}" aria-label="Voeg één ${safeName} toe">+</button>
                    </div>
                </div>`;
        }).join('')}
        </div>`;
    },

    _renderGenericCatalog: function (catalog, category) {
        return this._renderOptionCardGrid(catalog, category, {
            gridClass: 'option-grid cols-3 wiz-catalog-grid',
            ariaLabel: 'Productkeuze',
            getBadge: (item) => this._catalogFocusBadge(item)
        });
    },

    handleCardClick: function (card) {
        if (this.currentState === 2) return;
        const id = card.dataset.id;
        const category = card.dataset.category;
        if (!id || !category) return;
        if (this.selections[category][id]) return;
        this.updateQuantity(category, id, 'plus');
    },

    updateQuantity: function (category, id, action) {
        if (!this.selections[category]) this.selections[category] = {};
        let current = this.selections[category][id] || 0;

        if (action === 'remove') {
            delete this.selections[category][id];
        } else if (action === 'plus') {
            current++;
            this.selections[category][id] = current;
            this.trackWizardAddProduct(id, category);
        } else if (action === 'minus' && current > 0) {
            current--;
            if (current === 0) delete this.selections[category][id];
            else this.selections[category][id] = current;
        }

        this.calculateCart();
        this.saveState();
        this.renderStep();
        this.updateCartWidget();
    },

    calculateCart: function () {
        const prevTotal = this.cartValue;
        let total = 0;
        const calcGroup = (group) => {
            Object.keys(group).forEach(id => {
                const item = this.findProductById(id);
                if (item) total += (item.price * group[id]);
            });
        };

        calcGroup(this.selections.foundation);
        calcGroup(this.selections.vehicleItems);
        calcGroup(this.selections.clothing);
        calcGroup(this.selections.print);
        calcGroup(this.selections.visibility);
        calcGroup(this.selections.tools);
        calcGroup(this.selections.premium);

        if (this.selections.customSize) total += this.selections.customSize.price;

        this.cartValue = Math.round(total);
        this._maybeTrackThreshold199(prevTotal);
        if (this.currentState === 8 && typeof this._updateCheckoutMinMeter === 'function') {
            this._updateCheckoutMinMeter();
        }
    },

    /**
     * GA4 `threshold_199_reached` — once per session when total crosses from below 199 to >= 199 (viable checkout).
     */
    _maybeTrackThreshold199: function (previousTotal) {
        if (this._gaThreshold199Fired) return;
        if (previousTotal >= 199) return;
        if (this.cartValue < 199) return;
        this._gaThreshold199Fired = true;
        this.fgTrack('threshold_199_reached', {
            cart_total_at_threshold: this.cartValue,
            step_index_at_threshold: this.currentState + 1
        });
    },

    findProductById: function (id) {
        if (this.masterCatalog.has(id)) {
            const item = this.masterCatalog.get(id);
            return { id: item.sku, price: item.price_suggested || 0, name: item.naam };
        }
        
        const all = [
            ...this.foundationCatalog,
            ...Object.values(this.stickersCatalog).flat(),
            ...Object.values(this.wrapsCatalog).flat(),
            ...Object.values(this.magnetsCatalog).flat(),
            ...this.clothingCatalog,
            ...this.printCatalog,
            ...this.visibilityCatalog,
            ...this.toolsCatalog,
            ...this.premiumCatalog
        ];
        return all.find(p => p.id === id);
    },

    _getStepIconUrl: function (step) {
        const file = step && step.icon ? step.icon : 'step-intro.svg';
        return this.themeDir + '/assets/images/wizard-steps/' + file;
    },

    updateProgressBar: function () {
        if (!this.$progress) return;
        const totalSteps = this.steps.length;

        if (!this.$progress.querySelector('.wiz-step')) {
            let trackHtml = '';
            for (let i = 0; i < totalSteps; i++) {
                const stepMeta = this.steps[i];
                const safeName = this._escapeHtml(stepMeta.name);
                const iconPaths = (this._wizStepIconPaths && this._wizStepIconPaths[i]) ? this._wizStepIconPaths[i] : '';
                trackHtml += `<button type="button" class="wiz-step" data-step="${i}" data-state="todo" aria-label="Stap ${i + 1}: ${safeName}">
                    <span class="wiz-step__chip"><span class="wiz-step__idx">${i + 1}</span><span class="wiz-step__ico" aria-hidden="true"><svg viewBox="0 0 24 24">${iconPaths}</svg></span></span>
                    <span class="wiz-step__label">${safeName}</span>
                </button>`;
            }
            this.$progress.className = 'wizard-progress-bar';
            this.$progress.setAttribute('role', 'tablist');
            this.$progress.setAttribute('aria-label', 'Wizard stappen');
            this.$progress.innerHTML = trackHtml;
        }

        let mobileCompact = document.getElementById('wizard-mobile-compact-progress');
        if (!mobileCompact) {
            mobileCompact = document.createElement('div');
            mobileCompact.id = 'wizard-mobile-compact-progress';
            mobileCompact.className = 'wizard-mobile-compact-progress';
            this.$progress.parentNode.appendChild(mobileCompact);
        }

        const fill = document.getElementById('wizard-progress-fill');
        if (fill) {
            const percent = totalSteps > 1 ? (this.currentState / (totalSteps - 1)) * 100 : 0;
            fill.style.width = percent + '%';
        }

        const stepNodes = this.$progress.querySelectorAll('.wiz-step');
        stepNodes.forEach((node, idx) => {
            let state = 'todo';
            let navState = 'locked';
            if (idx < this.currentState) {
                state = 'done';
                navState = 'back';
            } else if (idx === this.currentState) {
                state = 'active';
                navState = 'current';
            } else if (idx === this.currentState + 1) {
                navState = 'next';
            }
            node.dataset.state = state;
            node.dataset.nav = navState;
            node.setAttribute('aria-current', idx === this.currentState ? 'step' : 'false');
            node.setAttribute('aria-disabled', (navState === 'locked' || navState === 'current') ? 'true' : 'false');
            node.title = navState === 'locked'
                ? 'Rond eerst de vorige stap af'
                : `Ga naar stap ${idx + 1}: ${this.steps[idx].name}`;
        });

        if (mobileCompact) {
            const stepNum = this.currentState + 1;
            const stepName = this._escapeHtml(this.steps[this.currentState].name);
            mobileCompact.innerHTML = `
                <div class="mc-step-primary"><span class="mc-step-count">Stap ${stepNum} van ${totalSteps}</span></div>
                <div class="mc-step-secondary"><span class="mc-step-name">${stepName}</span></div>`;
        }
    },


    updateMobileCtaBar: function () {
        if (!this.$mobileCtaBar || !this.$mobileCtaBtn || !this.$mobileCtaStep) return;

        const showMobile = window.matchMedia('(max-width: 767px)').matches;
        if (!showMobile || this.currentState === 8 || this.currentState === 0) {
            this.$mobileCtaBar.hidden = true;
            this.$mobileCtaBar.classList.remove('is-visible');
            document.body.classList.remove('wizard-mobile-cta-active');
            return;
        }

        this.$mobileCtaBar.hidden = false;
        this.$mobileCtaBar.classList.add('is-visible');
        document.body.classList.add('wizard-mobile-cta-active');
        this.$mobileCtaStep.textContent = String(this.currentState + 1);

        let label = 'Volgende';
        if (this.currentState === 0) {
            if (typeof this.isQuoteModePreset === 'function' && this.isQuoteModePreset()) {
                label = 'Bekijk alle categorieën';
            } else if (this.activePresetId) {
                label = 'Doorloop alle stappen';
            } else {
                label = 'Start de configurator';
            }
        } else if (this.$nextBtn) {
            const labelNode = document.createElement('div');
            labelNode.innerHTML = this.$nextBtn.innerHTML;
            label = (labelNode.textContent || '').replace(/\s+/g, ' ').trim() || label;
        }

        this.$mobileCtaBtn.textContent = label;
        const disabled = !!(this.$nextBtn && this.$nextBtn.disabled);
        this.$mobileCtaBtn.disabled = disabled;
        this.$mobileCtaBtn.classList.toggle('is-disabled', disabled);
    },

    injectStickyCart: function () {
        const cartHtml = `
            <div class="wizard-sticky-cart" id="wizard-sticky-cart" role="region" aria-label="Winkelwagen overzicht">
                <div id="sc-live-summary" class="wizard-sr-only" aria-live="polite" aria-atomic="true"></div>
                <!-- Desktop: pill + €199 mini progress (Sprint 2 AOV) -->
                <div class="sc-desktop-stack">
                    <div class="sc-desktop-pill">
                        <div class="sc-icon-wrap">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                        </div>
                        <div class="sc-meta">
                            <div class="sc-value sc-value--incl" id="sc-value">€&nbsp;0,00</div>
                            <div class="sc-excl-caption" id="sc-excl-caption">Excl. BTW: €&nbsp;0,00</div>
                            <div class="sc-count" id="sc-count">0 producten</div>
                        </div>
                        <button class="sc-expand-btn" id="sc-expand-btn" aria-expanded="false" aria-controls="sc-panel" aria-label="Winkelwagen openen">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                        </button>
                    </div>
                    <div class="sc-pill-progress" aria-hidden="true">
                        <div class="sc-pill-progress-track">
                            <div class="sc-pill-progress-fill sc-progress-fill sc-fill--red" id="sc-pill-progress-fill" style="width:0%"></div>
                        </div>
                    </div>
                </div>
                <!-- Expandable panel -->
                <div class="sc-panel" id="sc-panel" aria-hidden="true">
                    <div class="sc-panel-inner">
                        <ul class="sc-item-list" id="sc-item-list"></ul>
                        <div class="sc-btw-block" id="sc-btw-block" aria-label="Prijzen exclusief en inclusief BTW">
                            <div class="sc-btw-line">
                                <span class="sc-btw-label">Totaal excl. BTW</span>
                                <span class="sc-btw-val" id="sc-btw-excl">€&nbsp;0,00</span>
                            </div>
                            <div class="sc-btw-line sc-btw-line--incl">
                                <span class="sc-btw-label">Incl. 21% BTW</span>
                                <span class="sc-btw-val sc-btw-val--incl" id="sc-btw-incl">€&nbsp;0,00</span>
                            </div>
                        </div>
                        <div class="sc-progress-wrap">
                            <div class="sc-progress-track">
                                <div class="sc-progress-fill" id="sc-progress-fill" style="width:0%"></div>
                            </div>
                            <div class="sc-progress-label" id="sc-progress-label">Nog €199 tot minimum bestelling</div>
                        </div>
                    </div>
                </div>
                <!-- Mobile bar (full-width) -->
                <div class="sc-mobile-bar">
                    <div class="sc-mobile-left">
                        <div class="sc-mobile-value sc-mobile-value--incl" id="sc-mobile-value">€&nbsp;0,00</div>
                        <div class="sc-mobile-excl" id="sc-mobile-excl">Excl. BTW: €&nbsp;0,00</div>
                        <div class="sc-mobile-count" id="sc-mobile-count">0 producten</div>
                    </div>
                    <div class="sc-mobile-progress-wrap">
                        <div class="sc-mobile-progress-track">
                            <div class="sc-mobile-progress-fill" id="sc-mobile-progress-fill" style="width:0%"></div>
                        </div>
                        <div class="sc-mobile-progress-label" id="sc-mobile-progress-label">Nog €199 tot min.</div>
                    </div>
                    <div class="sc-mobile-action" id="sc-mobile-action">
                        <button class="sc-checkout-btn" id="sc-checkout-btn-mobile" style="display:none">Afrekenen<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></button>
                    </div>
                </div>
                <!-- Contextual upsell -->
                <div class="sc-upsell" id="sc-upsell" aria-live="polite"></div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', cartHtml);
        this.$stickyCart = document.getElementById('wizard-sticky-cart');

        // Expand/collapse panel on desktop
        const expandBtn = document.getElementById('sc-expand-btn');
        const panel = document.getElementById('sc-panel');
        if (expandBtn && panel) {
            expandBtn.addEventListener('click', () => {
                const isOpen = panel.classList.toggle('sc-panel--open');
                expandBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
                expandBtn.querySelector('svg polyline').setAttribute('points', isOpen ? '18 9 12 15 6 9' : '18 15 12 9 6 15');
            });
        }

        // Mobile checkout shortcut
        const mobileCheckoutBtn = document.getElementById('sc-checkout-btn-mobile');
        if (mobileCheckoutBtn) {
            mobileCheckoutBtn.addEventListener('click', () => {
                const canCheckout = typeof this._canWizardCheckout === 'function'
                    ? this._canWizardCheckout()
                    : this.cartValue >= 199;
                if (canCheckout) {
                    this._runCheckoutWhenReady();
                }
            });
        }

        this.updateCartWidget();
    },

    // P1-01: Build flat list of all selected items with name + price
    _getCartItems: function () {
        const items = [];
        const push = (group) => {
            Object.keys(group).forEach(id => {
                const qty = group[id];
                if (!qty) return;
                const product = this.findProductById(id);
                if (product) items.push({ id, name: product.name || id, price: product.price, qty });
            });
        };
        push(this.selections.foundation);
        push(this.selections.vehicleItems);
        push(this.selections.clothing);
        push(this.selections.print);
        push(this.selections.visibility);
        push(this.selections.tools);
        push(this.selections.premium);
        if (this.selections.customSize) {
            items.push({ id: 'custom-size', name: 'Aangepaste folie', price: this.selections.customSize.price, qty: 1 });
        }
        return items;
    },

    // Sprint 2: AOV-focused contextual tips (sticky cart) — order: threshold first, then step-specific
    _getUpsellHint: function () {
        const v = this.cartValue;
        const s = this.currentState;
        const UPSELL_SVG = `<svg class="wiz-upsell-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;
        let msg = null;
        const quoteMode = typeof this.isQuoteModePreset === 'function' && this.isQuoteModePreset();
        if (quoteMode && v >= 199) {
            msg = 'Vraag een offerte — wij stemmen het traject op jouw situatie af.';
        } else if (v >= 199) {
            msg = 'Klaar om te bestellen! Verder voor de laatste details.';
        } else if (s === 1) {
            msg = 'Combineer met visitekaartjes voor een complete start.';
        } else if (s === 2) {
            msg = 'Tip: Voeg magneetplaten toe voor flexibele reclame.';
        } else if (s === 3 && v < 300) {
            msg = 'Professionele hoodies verhogen je vertrouwen bij de klant.';
        } else if (s === 4 && v < 250) {
            msg = 'Tip: 250 visitekaartjes voor een complete eerste indruk';
        } else if (s >= 5 && v < 400) {
            msg = 'Tip: premium extras voor een totaalpakket';
        }
        if (!msg) return '';
        const successClass = v >= 199 ? ' sc-upsell-inner--success' : '';
        return `<div class="sc-upsell-inner${successClass}">${UPSELL_SVG}<span>${msg}</span></div>`;
    },

    updateCartWidget: function () {
        if (!this.$stickyCart) return;

        const v = this.cartValue;
        const items = this._getCartItems();
        const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
        const MIN = 199;
        const pct = Math.min(100, Math.round((v / MIN) * 100));
        const aboveMin = v >= MIN;

        const inclRaw = Math.round((v * 1.21 + Number.EPSILON) * 100) / 100;
        const exclStr = this._formatEurNl(v);
        const inclStr = this._formatEurNl(inclRaw);

        const quoteMode = typeof this.isQuoteModePreset === 'function' && this.isQuoteModePreset();
        const progressLabel = quoteMode && aboveMin
            ? 'Vraag je vrijblijvende offerte aan'
            : aboveMin
                ? 'Klaar om af te rekenen!'
                : `Nog ${this._formatEurNl(MIN - v)} tot minimum bestelling`;

        // Sprint 2: Red <50% → Yellow 50–99% → Cyan ≥100% (toward €199 minimum)
        let fillClass = 'sc-fill--red';
        if (pct >= 100) fillClass = 'sc-fill--cyan';
        else if (pct >= 50) fillClass = 'sc-fill--yellow';

        // --- Desktop elements ---
        const scValue = document.getElementById('sc-value');
        const scCount = document.getElementById('sc-count');
        const scProgressFill = document.getElementById('sc-progress-fill');
        const scProgressLabel = document.getElementById('sc-progress-label');
        const scItemList = document.getElementById('sc-item-list');
        const scUpsell = document.getElementById('sc-upsell');
        const scPillProgressFill = document.getElementById('sc-pill-progress-fill');
        const scExclCaption = document.getElementById('sc-excl-caption');
        const scBtwExcl = document.getElementById('sc-btw-excl');
        const scBtwIncl = document.getElementById('sc-btw-incl');

        if (scValue) scValue.textContent = inclStr;
        if (scExclCaption) scExclCaption.textContent = `Excl. BTW: ${exclStr}`;
        if (scBtwExcl) scBtwExcl.textContent = exclStr;
        if (scBtwIncl) scBtwIncl.textContent = inclStr;
        if (scCount) scCount.textContent = `${itemCount} ${itemCount === 1 ? 'product' : 'producten'}`;
        if (scPillProgressFill) {
            scPillProgressFill.style.width = pct + '%';
            scPillProgressFill.className = `sc-pill-progress-fill sc-progress-fill ${fillClass}`;
        }
        if (scProgressFill) {
            scProgressFill.style.width = pct + '%';
            scProgressFill.className = `sc-progress-fill ${fillClass}`;
        }
        if (scProgressLabel) scProgressLabel.textContent = progressLabel;

        // Item list — full list on step 8; max 5 preview on other steps
        if (scItemList) {
            const showAllItems = this.currentState === 8;
            const preview = showAllItems ? items : items.slice(0, 5);
            scItemList.innerHTML = preview.map(it =>
                `<li class="sc-item"><span class="sc-item-name">${it.name}</span><span class="sc-item-price">x${it.qty} — ${this._formatEurNl(Math.round((it.price * it.qty + Number.EPSILON) * 100) / 100)} <span class="sc-item-excl">excl.</span></span></li>`
            ).join('');
            if (!showAllItems && items.length > 5) {
                scItemList.innerHTML += `<li class="sc-item sc-item--more">+${items.length - 5} meer…</li>`;
            }
        }

        // Upsell
        if (scUpsell) scUpsell.innerHTML = this._getUpsellHint();

        // --- Mobile elements ---
        const scMobileValue = document.getElementById('sc-mobile-value');
        const scMobileCount = document.getElementById('sc-mobile-count');
        const scMobileFill = document.getElementById('sc-mobile-progress-fill');
        const scMobileLabel = document.getElementById('sc-mobile-progress-label');
        const scMobileCheckout = document.getElementById('sc-checkout-btn-mobile');
        const scMobileExcl = document.getElementById('sc-mobile-excl');

        if (scMobileValue) scMobileValue.textContent = inclStr;
        if (scMobileExcl) scMobileExcl.textContent = `Excl. BTW: ${exclStr}`;
        if (scMobileCount) scMobileCount.textContent = `${itemCount} ${itemCount === 1 ? 'product' : 'producten'}`;
        if (scMobileFill) {
            scMobileFill.style.width = pct + '%';
            scMobileFill.className = `sc-mobile-progress-fill ${fillClass}`;
        }
        if (scMobileLabel) {
            scMobileLabel.textContent = quoteMode && aboveMin
                ? 'Offerte'
                : aboveMin
                    ? 'Klaar!'
                    : `Nog ${this._formatEurNl(MIN - v)}`;
        }
        if (scMobileCheckout) {
            const showStickyCheckout = typeof this._shouldShowStickyCheckout === 'function'
                ? this._shouldShowStickyCheckout()
                : aboveMin;
            scMobileCheckout.style.display = showStickyCheckout ? 'inline-flex' : 'none';
        }

        // P3-06: polite live region for cart total / count (NL announcements)
        const scLive = document.getElementById('sc-live-summary');
        if (scLive) {
            scLive.textContent = itemCount === 0
                ? 'Winkelwagen is leeg.'
                : `Winkelwagen: ${itemCount} ${itemCount === 1 ? 'product' : 'producten'}, inclusief BTW ${inclStr}. ${progressLabel}`;
        }

        // Show / hide widget
        if (itemCount > 0) {
            this.$stickyCart.classList.add('has-items');
        } else {
            this.$stickyCart.classList.remove('has-items');
            // Also close panel if empty
            const panel = document.getElementById('sc-panel');
            if (panel) panel.classList.remove('sc-panel--open');
        }

        // Above-minimum glow
        if (aboveMin) this.$stickyCart.classList.add('cart-above-min');
        else this.$stickyCart.classList.remove('cart-above-min');

        this._syncCheckoutStickyPanel();
    },

    /**
     * POLISH-D5B: on step 8 desktop auto-open sticky cart panel; close when leaving step 8.
     */
    _syncCheckoutStickyPanel: function () {
        const panel = document.getElementById('sc-panel');
        const expandBtn = document.getElementById('sc-expand-btn');
        if (!panel || !expandBtn) {
            return;
        }
        const poly = expandBtn.querySelector('svg polyline');
        const isDesktop = typeof window.matchMedia === 'function' && window.matchMedia('(min-width: 768px)').matches;

        if (this.currentState === 8 && isDesktop) {
            panel.classList.add('sc-panel--open');
            expandBtn.setAttribute('aria-expanded', 'true');
            panel.setAttribute('aria-hidden', 'false');
            if (poly) poly.setAttribute('points', '18 9 12 15 6 9');
            return;
        }
        if (this.currentState === 8 && !isDesktop) {
            panel.classList.remove('sc-panel--open');
            expandBtn.setAttribute('aria-expanded', 'false');
            panel.setAttribute('aria-hidden', 'true');
            if (poly) poly.setAttribute('points', '18 15 12 9 6 15');
            return;
        }
        if (this.currentState !== 8) {
            panel.classList.remove('sc-panel--open');
            expandBtn.setAttribute('aria-expanded', 'false');
            panel.setAttribute('aria-hidden', 'true');
            if (poly) poly.setAttribute('points', '18 15 12 9 6 15');
        }
    },

    /**
     * GA4 helper: viewport bucket — aligned with wizard mobile CSS (progress <600px).
     */
    getDeviceTypeForGa: function () {
        if (typeof window.matchMedia === 'function' && window.matchMedia('(max-width: 599px)').matches) {
            return 'mobile';
        }
        return 'desktop';
    },

    /**
     * GA4 `wizard_step_view` — once per step index per visit (re-renders on same step do not re-fire).
     */
    trackWizardStepView: function () {
        const idx = this.currentState;
        if (this._gaStepViewTrackedForIndex === idx) return;
        this._gaStepViewTrackedForIndex = idx;
        const step_index = idx + 1;
        const step_id = this._gaStepIds[idx] || ('step_' + idx);
        this.fgTrack('wizard_step_view', {
            step_index,
            step_id,
            device_type: this.getDeviceTypeForGa()
        });
    },

    /**
     * GA4 `wizard_add_product` — one event per user add action (stepper +, startpakket on, programmatic vehicle adds must call this too).
     */
    trackWizardAddProduct: function (productId, selectionCategory) {
        const product_category = this._gaProductCategoryMap[selectionCategory] || selectionCategory;
        this.fgTrack('wizard_add_product', {
            product_id: String(productId),
            product_category,
            step_index: this.currentState + 1
        });
    },

    fgTrack: function (event, params) {
        console.log(`[FG Track] ${event}`, params);
        if (typeof gtag !== 'undefined') gtag('event', event, params || {});
    },

    _sanitizeTooltipHref: function (url) {
        const u = String(url || '').trim();
        if (u.startsWith('/materialen') || u.startsWith('/materials')) {
            return u.replace(/^\/materials/, '/materialen');
        }
        if (/^https?:\/\/flexgrafik\.nl\//i.test(u)) return u;
        return '';
    },

    /** Sheet on touch or narrow viewport; popover on desktop hover */
    _tooltipMode: function () {
        if (window.innerWidth <= 767) return 'sheet';
        return window.matchMedia('(hover: none)').matches ? 'sheet' : 'popover';
    },

    _ensureTooltipBackdrop: function () {
        if (!this._tooltipBackdrop) {
            this._tooltipBackdrop = document.createElement('div');
            this._tooltipBackdrop.className = 'fg-info-tooltip-backdrop';
            this._tooltipBackdrop.setAttribute('aria-hidden', 'true');
            this._tooltipBackdrop.addEventListener('click', () => this._closeAllTooltips());
        }
        return this._tooltipBackdrop;
    },

    _scheduleTooltipClose: function () {
        if (this._tooltipCloseTimer) clearTimeout(this._tooltipCloseTimer);
        this._tooltipCloseTimer = setTimeout(() => this._closeAllTooltips(), 140);
    },

    _closeAllTooltips: function () {
        if (this._tooltipCloseTimer) {
            clearTimeout(this._tooltipCloseTimer);
            this._tooltipCloseTimer = null;
        }
        document.querySelectorAll('.fg-info-tooltip.is-open').forEach((el) => el.classList.remove('is-open'));
        if (this._tooltipBackdrop && this._tooltipBackdrop.parentNode) {
            this._tooltipBackdrop.parentNode.removeChild(this._tooltipBackdrop);
        }
        document.querySelectorAll('.fg-info-tooltip-content.is-portaled').forEach((content) => {
            const ownerId = content.dataset.tooltipOwnerId;
            const trigger = ownerId
                ? document.querySelector(`.fg-info-tooltip[data-tooltip-id="${ownerId}"]`)
                : null;
            content.classList.remove('is-portaled', 'is-sheet');
            content.style.cssText = '';
            if (trigger) {
                trigger.appendChild(content);
                delete trigger._portaledContent;
            } else {
                content.remove();
            }
        });
        this._activeTooltip = null;
    },

    _positionTooltipPopover: function (trigger, content) {
        const pad = 12;
        const gap = 10;
        const maxW = Math.min(360, window.innerWidth - pad * 2);
        content.classList.remove('is-sheet');
        content.style.width = maxW + 'px';
        content.style.maxWidth = maxW + 'px';
        content.style.right = 'auto';
        content.style.bottom = 'auto';

        const triggerRect = trigger.getBoundingClientRect();
        let left = triggerRect.right - maxW;
        let top = triggerRect.bottom + gap;

        if (left < pad) left = pad;
        if (left + maxW > window.innerWidth - pad) {
            left = Math.max(pad, window.innerWidth - pad - maxW);
        }

        content.style.visibility = 'hidden';
        content.style.display = 'block';
        const panelHeight = content.offsetHeight;
        content.style.visibility = '';
        if (top + panelHeight > window.innerHeight - pad) {
            top = triggerRect.top - gap - panelHeight;
            if (top < pad) top = pad;
        }

        content.style.left = left + 'px';
        content.style.top = top + 'px';
    },

    _positionTooltipSheet: function (content) {
        content.classList.add('is-sheet');
        content.style.left = '12px';
        content.style.right = '12px';
        content.style.bottom = '12px';
        content.style.top = 'auto';
        content.style.width = 'auto';
        content.style.maxWidth = 'none';
    },

    _repositionActiveTooltip: function () {
        if (!this._activeTooltip || !this._activeTooltip._portaledContent) return;
        const content = this._activeTooltip._portaledContent;
        const mode = this._tooltipMode();
        if (mode === 'sheet') {
            this._positionTooltipSheet(content);
            const backdrop = this._ensureTooltipBackdrop();
            if (!backdrop.parentNode) {
                document.body.appendChild(backdrop);
            }
        } else {
            if (this._tooltipBackdrop && this._tooltipBackdrop.parentNode) {
                this._tooltipBackdrop.parentNode.removeChild(this._tooltipBackdrop);
            }
            content.classList.remove('is-sheet');
            this._positionTooltipPopover(this._activeTooltip, content);
        }
    },

    _showTooltip: function (trigger) {
        if (!trigger) return;
        const content = trigger.querySelector('.fg-info-tooltip-content');
        if (!content) return;

        this._closeAllTooltips();

        if (!trigger.dataset.tooltipId) {
            trigger.dataset.tooltipId = 'tip-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
        }
        content.dataset.tooltipOwnerId = trigger.dataset.tooltipId;

        document.body.appendChild(content);
        content.classList.add('is-portaled');
        trigger._portaledContent = content;
        trigger.classList.add('is-open');
        this._activeTooltip = trigger;

        const mode = this._tooltipMode();
        if (mode === 'sheet') {
            document.body.appendChild(this._ensureTooltipBackdrop());
            this._positionTooltipSheet(content);
        } else {
            this._positionTooltipPopover(trigger, content);
        }
    },

    _bindTooltipPortalEvents: function () {
        if (this._tooltipPortalBound || !this.$contentArea) return;
        this._tooltipPortalBound = true;

        this.$contentArea.addEventListener('mouseover', (e) => {
            const trigger = e.target.closest('.fg-info-tooltip');
            if (!trigger || this._tooltipMode() !== 'popover') return;
            if (this._tooltipCloseTimer) clearTimeout(this._tooltipCloseTimer);
            if (this._activeTooltip !== trigger) this._showTooltip(trigger);
        });

        this.$contentArea.addEventListener('mouseout', (e) => {
            const trigger = e.target.closest('.fg-info-tooltip');
            if (!trigger || this._tooltipMode() !== 'popover' || this._activeTooltip !== trigger) return;
            const related = e.relatedTarget;
            if (related && (trigger.contains(related) || related.closest('.fg-info-tooltip-content.is-portaled'))) return;
            this._scheduleTooltipClose();
        });

        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.fg-info-tooltip-content.is-portaled') && this._tooltipCloseTimer) {
                clearTimeout(this._tooltipCloseTimer);
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (!e.target.closest('.fg-info-tooltip-content.is-portaled') || this._tooltipMode() !== 'popover') return;
            const related = e.relatedTarget;
            if (related && (related.closest('.fg-info-tooltip-content.is-portaled') || related.closest('.fg-info-tooltip'))) return;
            this._scheduleTooltipClose();
        });

        window.addEventListener('scroll', () => {
            if (this._activeTooltip && this._activeTooltip._portaledContent && this._tooltipMode() === 'popover') {
                this._positionTooltipPopover(this._activeTooltip, this._activeTooltip._portaledContent);
            }
        }, true);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this._closeAllTooltips();
        });
    },

    /** NL tooltip body: escape text, optional [label](url) links, paragraph breaks */
    _formatTooltipContent: function (raw) {
        const parts = [];
        const re = /\[([^\]]+)\]\(([^)]+)\)|https?:\/\/flexgrafik\.nl[^\s,)]+/gi;
        const text = String(raw || '');
        let last = 0;
        let m;
        while ((m = re.exec(text)) !== null) {
            if (m.index > last) {
                parts.push({ type: 'text', value: text.slice(last, m.index) });
            }
            if (m[0].startsWith('[')) {
                parts.push({
                    type: 'link',
                    label: m[1],
                    href: this._sanitizeTooltipHref(m[2])
                });
            } else {
                parts.push({
                    type: 'link',
                    label: 'Meer info →',
                    href: this._sanitizeTooltipHref(m[0])
                });
            }
            last = m.index + m[0].length;
        }
        if (last < text.length) {
            parts.push({ type: 'text', value: text.slice(last) });
        }

        return parts.map((p) => {
            if (p.type === 'link' && p.href) {
                return `<a href="${p.href}" class="tooltip-more-link" target="_blank" rel="noopener noreferrer">${this._escapeHtml(p.label)}</a>`;
            }
            if (p.type === 'text') {
                return this._escapeHtml(p.value)
                    .replace(/\n\n/g, '<br><br>')
                    .replace(/\n/g, ' ');
            }
            return '';
        }).join('');
    },

    renderTooltip: function (id, foundationCard) {
        const item = this.masterCatalog.get(id) || this.masterCatalog.get(String(id));
        if (!item || !item.vraagteken_info) return '';
        const safeInfo = this._formatTooltipContent(item.vraagteken_info);
        const extraClass = foundationCard ? ' fg-info-tooltip--foundation' : '';
        const describedBy = foundationCard ? ` aria-describedby="fg-tip-content-${id}"` : '';
        return `
            <button type="button" class="fg-info-tooltip${extraClass}" aria-label="Meer informatie over dit product"${describedBy}>
                <span class="fg-info-tooltip-icon" aria-hidden="true">?</span>
                <span class="fg-info-tooltip-content" id="fg-tip-content-${id}" role="tooltip">${safeInfo}</span>
            </button>`;
    },

    renderKenmerken: function (id, variant) {
        const item = this.masterCatalog.get(id) || this.masterCatalog.get(String(id));
        if (!item || !item.drie_kenmerken || item.drie_kenmerken.length === 0) return '';
        if (variant === 'list') {
            return `
            <ul class="wizard-card-features wiz-foundation-card__features">
                ${item.drie_kenmerken.map(f => `<li>${this._escapeHtml(f)}</li>`).join('')}
            </ul>`;
        }
        return `
            <div class="wizard-clothing-features">
                ${item.drie_kenmerken.map(f => `<div class="feature-tag"><span>•</span> ${this._escapeHtml(f)}</div>`).join('')}
            </div>`;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('zzp-wizard-app')) {
        ZZPWizard.init();
    }
});
