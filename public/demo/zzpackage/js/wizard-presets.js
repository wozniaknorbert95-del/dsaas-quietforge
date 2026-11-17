/**
 * ZZPackage Wizard — Growth path presets (Intro / Stap 0)
 * SSoT: system/data/preset-manifest.json
 */
(function () {
    'use strict';

    if (typeof ZZPWizard === 'undefined') {
        return;
    }

    const PRESET_ORDER = ['starter-zzp', 'groeier', 'professional-flota'];

    Object.assign(ZZPWizard, {
        presetManifest: null,
        activePresetId: null,
        introVehicleType: 'bus_l',
        introPresetsOpen: false,

        loadPresetManifest: async function () {
            if (this.presetManifest) {
                return;
            }
            const url = (typeof fgPresetManifest !== 'undefined' && fgPresetManifest.url)
                ? fgPresetManifest.url
                : (this.themeDir + '/../system/data/preset-manifest.json');
            const ver = (typeof fgPresetManifest !== 'undefined' && fgPresetManifest.ver) ? fgPresetManifest.ver : '1';
            try {
                const res = await fetch(url + '?v=' + ver);
                if (!res.ok) {
                    throw new Error('HTTP ' + res.status);
                }
                const data = await res.json();
                this.presetManifest = data.presets || data;
            } catch (err) {
                console.error('[Wizard Presets] Manifest load failed:', err);
                this.presetManifest = {};
            }
        },

        getPresetById: function (presetId) {
            if (!this.presetManifest || !presetId) {
                return null;
            }
            return this.presetManifest[presetId] || null;
        },

        isQuoteModePreset: function () {
            const p = this.getPresetById(this.activePresetId);
            return !!(p && p.quote_mode);
        },

        _canWizardCheckout: function () {
            return !this.isQuoteModePreset() && this.cartValue >= 199;
        },

        _shouldShowStickyCheckout: function () {
            return this._canWizardCheckout() && this.currentState === 8;
        },

        getIntroVehicleLabel: function (vehicleId) {
            const INTRO_VEHICLE_OPTIONS = this.loadVehicleTypes();
            const opt = INTRO_VEHICLE_OPTIONS.find((o) => o.id === vehicleId);
            return opt ? opt.label : (vehicleId || '');
        },

        getIntroVehicleActionLabel: function (action) {
            if (action === 'wrap') {
                return 'Partial wrap';
            }
            if (action === 'magnets') {
                return 'Magneten';
            }
            return action || '';
        },

        _getIntroVehicleHint: function () {
            const preset = this.getPresetById(this.activePresetId);
            const action = preset ? preset.vehicle_action : null;
            if (action === 'magnets') {
                return 'Kies het formaat dat past bij jouw bus of auto — de prijs van magneten past zich automatisch aan.';
            }
            if (action === 'wrap') {
                return 'Kies het formaat van jouw bus of auto — nodig voor de productie van je partial wrap.';
            }
            return 'Kies het formaat dat past bij jouw bus of auto.';
        },

        _getIntroLeadCopy: function () {
            if (this.isQuoteModePreset() && this.activePresetId) {
                return 'Dit traject is op maat voor grotere vloten. Vraag vrijblijvend een offerte aan — zonder directe online checkout.';
            }
            if (this.activePresetId && this._canWizardCheckout()) {
                return 'Je selectie staat klaar. Ga naar de samenvatting om af te rekenen, of loop alle stappen door om details aan te passen.';
            }
            if (this.activePresetId) {
                return 'Vul je traject aan tot het minimumbedrag van €199 is bereikt — daarna kun je afrekenen.';
            }
            return 'Kies een vast traject of stel zelf samen. Daarna werk je de details per categorie uit.';
        },

        _openQuoteWhatsApp: function () {
            const preset = this.getPresetById(this.activePresetId);
            const phone = (preset && preset.quote_cta && preset.quote_cta.whatsapp)
                ? preset.quote_cta.whatsapp.replace(/\D/g, '')
                : '31687286151';
            const text = encodeURIComponent(
                (preset && preset.quote_cta && preset.quote_cta.message_nl)
                    ? preset.quote_cta.message_nl
                    : 'Hoi FlexGrafik, ik wil een offerte voor Professional met Flota.'
            );
            window.open('https://wa.me/' + phone + '?text=' + text, '_blank', 'noopener,noreferrer');
        },

        _skuExistsInCatalog: function (sku) {
            if (this.masterCatalog && this.masterCatalog.has(sku)) {
                return true;
            }
            return !!this.findProductById(sku);
        },

        _resetSelectionsForPreset: function () {
            this.selections = {
                foundation: {},
                vehicleType: null,
                vehicleAction: null,
                vehicleItems: {},
                customSize: null,
                clothing: {},
                print: {},
                visibility: {},
                tools: {},
                premium: {}
            };
        },

        clearPreset: function (opts) {
            opts = opts || {};
            this.activePresetId = null;
            if (!opts.keepSelections) {
                this._resetSelectionsForPreset();
            }
            this.calculateCart();
            this.saveState();
            if (!opts.silent) {
                this.renderStep();
                this.updateCartWidget();
            }
            this.fgTrack('preset_cleared', {});
        },

        setIntroVehicleType: function (vehicleType) {
            this.introVehicleType = vehicleType;
            if (this.activePresetId) {
                this.applyPreset(this.activePresetId, { silent: true, skipTrack: true });
            }
            this.saveState();
            this.renderStep();
            this.updateCartWidget();
        },

        /** Deep link from Design Agent (/voertuigreclame-ontwerp/) */
        applyDesignAgentParams: function (params) {
            const daVehicle = params.get('da_vehicle');
            const daSkus = params.get('da_skus');
            if (!daVehicle && !daSkus) {
                return;
            }
            if (daVehicle) {
                this.introVehicleType = daVehicle;
                this.selections.vehicleType = daVehicle;
                this.introPresetsOpen = true;
            }
            if (daSkus) {
                daSkus.split(',').forEach((raw) => {
                    const sku = raw.trim();
                    if (!sku || !this._skuExistsInCatalog(sku)) {
                        return;
                    }
                    const bucket = (sku === 'DF-004' || sku === 'DF-005' || sku.startsWith('F-001'))
                        ? 'foundation'
                        : 'vehicleItems';
                    if (!this.selections[bucket]) {
                        this.selections[bucket] = {};
                    }
                    this.selections[bucket][sku] = 1;
                });
            }
            this.calculateCart();
            this.saveState();
        },

        applyPreset: function (presetId, opts) {
            opts = opts || {};
            const preset = this.getPresetById(presetId);
            if (!preset) {
                console.warn('[Wizard Presets] Unknown preset:', presetId);
                return;
            }

            this._resetSelectionsForPreset();
            this.activePresetId = presetId;
            this.introPresetsOpen = true;

            const vType = this.introVehicleType || 'bus_l';
            if (preset.vehicle_required !== false) {
                this.selections.vehicleType = vType;
                this.selections.vehicleAction = preset.vehicle_action || 'magnets';
            }

            (preset.lines || []).forEach((line) => {
                const bucket = line.bucket || 'foundation';
                const qty = line.qty || 1;
                if (!this.selections[bucket]) {
                    this.selections[bucket] = {};
                }
                if (this._skuExistsInCatalog(line.sku)) {
                    this.selections[bucket][line.sku] = qty;
                    if (!opts.skipTrack) {
                        this.trackWizardAddProduct(line.sku, this._gaProductCategoryMap[bucket] || bucket);
                    }
                } else {
                    console.warn('[Wizard Presets] SKU missing from catalog:', line.sku);
                }
            });

            if (preset.vehicle_skus && preset.vehicle_skus[vType]) {
                const magnetSku = preset.vehicle_skus[vType];
                if (this._skuExistsInCatalog(magnetSku)) {
                    this.selections.vehicleItems[magnetSku] = 1;
                    if (!opts.skipTrack) {
                        this.trackWizardAddProduct(magnetSku, 'vehicle');
                    }
                }
            }

            this.calculateCart();
            this.saveState();

            if (this.cartValue >= 199 && typeof this.loadLazyScriptIfNeeded === 'function') {
                this.loadLazyScriptIfNeeded().catch(() => {});
            }

            if (!opts.silent) {
                this.renderStep();
                this.updateCartWidget();
            }

            if (!opts.skipTrack) {
                this.fgTrack('preset_selected', {
                    preset_id: presetId,
                    merchant_id: preset.merchant_id || presetId,
                    vehicle_type: vType,
                    cart_value: this.cartValue,
                    quote_mode: !!preset.quote_mode
                });
            }
        },

        estimatePresetTotalExcl: function (presetId) {
            const preset = this.getPresetById(presetId);
            if (!preset) {
                return 0;
            }
            let total = 0;
            const vType = this.introVehicleType || 'bus_l';

            const addSku = (sku, qty) => {
                const item = this.findProductById(sku);
                if (item) {
                    total += (item.price * (qty || 1));
                } else if (this.masterCatalog.has(sku)) {
                    const mc = this.masterCatalog.get(sku);
                    total += ((mc.price_suggested || 0) * (qty || 1));
                }
            };

            (preset.lines || []).forEach((line) => addSku(line.sku, line.qty));
            if (preset.vehicle_skus && preset.vehicle_skus[vType]) {
                addSku(preset.vehicle_skus[vType], 1);
            }
            return Math.round(total);
        },

        jumpToCheckoutFromIntro: function () {
            if (this.isQuoteModePreset() || this.cartValue < 199) {
                return;
            }
            this.currentState = 8;
            this.saveState();
            const renderCheckout = () => {
                this.renderStep();
                this.scrollToWizard();
            };
            const onChunkFail = (err) => {
                console.error('jumpToCheckoutFromIntro:', err);
                renderCheckout();
                if (typeof this.showCheckoutError === 'function') {
                    this.showCheckoutError('Checkout kan niet worden geladen. Vernieuw de pagina en probeer opnieuw.');
                }
            };
            if (typeof this.waitForCheckoutChunk === 'function') {
                this.waitForCheckoutChunk().then(renderCheckout).catch(onChunkFail);
            } else {
                this.loadLazyScriptIfNeeded().then(renderCheckout).catch(onChunkFail);
            }
        },

        startConfiguratorFromIntro: function () {
            this.currentState = 1;
            this.saveState();
            this.renderStep();
            this.scrollToWizard();
            this.fgTrack('wizard_intro_start_configurator', {});
        },

        toggleIntroPresetsPanel: function () {
            this.introPresetsOpen = !this.introPresetsOpen;
            this.saveState();
            this.renderStep();
            if (this.introPresetsOpen) {
                const panel = this.$contentArea && this.$contentArea.querySelector('.wiz-intro-presets-panel');
                if (panel) {
                    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
            this.fgTrack('wizard_intro_presets_toggle', { open: this.introPresetsOpen });
        },

        _openBouwChaosGame: function () {
            this.fgTrack('wizard_game_cta_click', { source: 'wizard_intro' });
            window.open('https://app.flexgrafik.nl', '_blank', 'noopener,noreferrer');
        },

        _handleIntroClick: function (e) {
            const startBtn = e.target.closest('[data-intro-start]');
            if (startBtn) {
                e.preventDefault();
                this.startConfiguratorFromIntro();
                return;
            }

            const presetsToggle = e.target.closest('[data-intro-presets-toggle]');
            if (presetsToggle) {
                e.preventDefault();
                this.toggleIntroPresetsPanel();
                return;
            }

            const gameBtn = e.target.closest('[data-intro-game]');
            if (gameBtn) {
                e.preventDefault();
                this._openBouwChaosGame();
                return;
            }

            const vehicleBtn = e.target.closest('[data-intro-vehicle]');
            if (vehicleBtn) {
                e.preventDefault();
                this.setIntroVehicleType(vehicleBtn.dataset.introVehicle);
                return;
            }

            const presetBtn = e.target.closest('[data-preset-id]');
            if (presetBtn) {
                e.preventDefault();
                const id = presetBtn.dataset.presetId;
                if (id === this.activePresetId) {
                    this.clearPreset({});
                    return;
                }
                this.applyPreset(id);
                return;
            }

            const customBtn = e.target.closest('[data-intro-custom]');
            if (customBtn) {
                e.preventDefault();
                this.clearPreset({});
                return;
            }

            const checkoutBtn = e.target.closest('[data-intro-checkout]');
            if (checkoutBtn) {
                e.preventDefault();
                this.jumpToCheckoutFromIntro();
                return;
            }

            const quoteBtn = e.target.closest('[data-intro-quote]');
            if (quoteBtn) {
                e.preventDefault();
                this._openQuoteWhatsApp();
            }
        },

        bindIntroPresetEvents: function () {
            if (this._introPresetBound || !this.$contentArea) {
                return;
            }
            this.$contentArea.addEventListener('click', (e) => this._handleIntroClick(e));
            this._introPresetBound = true;
        },

        _escapeHtml: function (str) {
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
        },

        _formatPriceExcl: function (amount) {
            const n = Math.round(Number(amount) || 0);
            return '€' + n.toLocaleString('nl-NL');
        },

        renderStepIntro: function () {
            const checkSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';

            const INTRO_VEHICLE_OPTIONS = this.loadVehicleTypes();
            const vehicleHtml = INTRO_VEHICLE_OPTIONS.map((opt) => {
                const selected = this.introVehicleType === opt.id ? 'true' : 'false';
                return `<button type="button" class="pill" data-intro-vehicle="${opt.id}" data-selected="${selected}" aria-pressed="${this.introVehicleType === opt.id}">
                    ${this._escapeHtml(opt.label)} <small>· ${this._escapeHtml(opt.sub)}</small>
                </button>`;
            }).join('');

            const cardsHtml = PRESET_ORDER.map((presetId) => {
                const preset = this.getPresetById(presetId);
                if (!preset) {
                    return '';
                }
                const isActive = this.activePresetId === presetId;
                const accent = preset.accent || 'cyan';
                const liveTotal = this.estimatePresetTotalExcl(presetId);
                const priceLabel = preset.quote_mode
                    ? 'vanaf ' + this._formatPriceExcl(preset.display_from_excl)
                    : this._formatPriceExcl(liveTotal);
                const bullets = (preset.bullets_nl || []).map((b) =>
                    '<li><span class="sp-icon">' + checkSvg + '</span> ' + this._escapeHtml(b) + '</li>'
                ).join('');
                return `
                <article class="preset-card" data-accent="${accent}" data-selected="${isActive ? 'true' : 'false'}" data-preset-id="${presetId}">
                    ${preset.recommended ? '<span class="pc-rec">Meest gekozen</span>' : ''}
                    <span class="pc-label">${this._escapeHtml(preset.label_nl)}</span>
                    <span class="pc-tag">"${this._escapeHtml(preset.tagline_nl)}"</span>
                    <ul class="pc-bullets">${bullets}</ul>
                    <span class="pc-from">${priceLabel}<small>Excl. BTW</small></span>
                    ${preset.quote_mode ? '<span class="pc-quote">Offerte-traject</span>' : ''}
                </article>`;
            }).join('');

            const canDirectCheckout = this._canWizardCheckout() && this.activePresetId;
            const quoteActive = this.isQuoteModePreset() && this.activePresetId;
            const vehicleHint = this._getIntroVehicleHint();
            const vehicleSectionClass = this.activePresetId && this.getPresetById(this.activePresetId)
                && this.getPresetById(this.activePresetId).vehicle_action === 'wrap'
                ? ' wiz-intro-vehicle--metadata'
                : '';
            const presetsOpen = !!this.introPresetsOpen;
            const presetsCardLabel = presetsOpen ? 'Verberg pakketten' : 'Kant-en-klare pakketten';
            const introImg = (this.themeDir || '') + '/assets/images/wizard-intro/';
            const presetLead = this.activePresetId
                ? `<p class="wiz-intro-preset-lead">${this._escapeHtml(this._getIntroLeadCopy())}</p>`
                : '';
            const presetsPanelHtml = `
                <section class="wiz-intro-presets-panel" id="wiz-intro-presets-panel" aria-label="Kant-en-klare pakketten"${presetsOpen ? '' : ' hidden'}>
                    ${presetLead}
                    <section class="wiz-groeipad-grid" aria-label="Kies jouw groeipad">${cardsHtml}</section>
                    <section class="wiz-intro-vehicle${vehicleSectionClass}" aria-labelledby="wiz-intro-vehicle-title">
                        <h3 id="wiz-intro-vehicle-title" class="wiz-intro-vehicle__title">Jouw voertuig (voor dit traject)</h3>
                        <p class="wiz-intro-vehicle__hint">${this._escapeHtml(vehicleHint)}</p>
                        <div class="wiz-intro-vehicle-grid" role="group" aria-label="Voertuigtype">${vehicleHtml}</div>
                    </section>
                    <div class="wiz-intro-actions">
                        <button type="button" class="wiz-intro-link" data-intro-custom>Liever alles zelf kiezen? Start zonder pakket</button>
                        ${canDirectCheckout ? '<button type="button" class="wiz-intro-checkout" data-intro-checkout>Naar samenvatting →</button>' : ''}
                        ${quoteActive ? '<button type="button" class="wiz-intro-quote" data-intro-quote>Offerte via WhatsApp →</button>' : ''}
                    </div>
                </section>`;

            const specBarHtml = `
                <div class="wiz-intro-spec-bar" role="list" aria-label="ZZPackage statistieken">
                    <div class="wiz-intro-spec-item" role="listitem">
                        <span class="wiz-intro-spec__val">33+</span>
                        <span class="wiz-intro-spec__label">Bedrijfswagens</span>
                    </div>
                    <div class="wiz-intro-spec-item" role="listitem">
                        <span class="wiz-intro-spec__val">10</span>
                        <span class="wiz-intro-spec__label">Dagen Levertijd</span>
                    </div>
                    <div class="wiz-intro-spec-item" role="listitem">
                        <span class="wiz-intro-spec__val">€199</span>
                        <span class="wiz-intro-spec__label">Minimale bestelling</span>
                    </div>
                    <div class="wiz-intro-spec-item" role="listitem">
                        <!-- SITE-03: 4,8 synced with DA page (127 Google-reviews); front-page uses data-driven $fg_review_score -->
                        <span class="wiz-intro-spec__val">4,8</span>
                        <span class="wiz-intro-spec__label">Google-score</span>
                    </div>
                </div>`;

            const primaryCtaHtml = `
                <div class="wiz-intro-primary-cta">
                    <button type="button" class="wiz-intro-hero-cta wiz-intro-hero-cta--vca wiz-intro-hero-cta--vca--lg" data-intro-start>
                        <span>Start de Wizard</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                </div>`;

            const trustHtml = `
                <div class="wiz-intro-trust wiz-intro-trust--compact" aria-label="Vertrouwen en service">
                    <p class="wiz-intro-trust__details">
                        Gratis configureren
                        <span class="wiz-intro-trust__sep">·</span>
                        Levering in ca. 10 werkdagen
                        <span class="wiz-intro-trust__sep">·</span>
                        Eigen designs welkom
                    </p>
                </div>`;

            const partnersHtml = `
                <section class="wiz-intro-partners" aria-label="Vertrouwd door professionals">
                    <p class="wiz-intro-partners__heading">Vertrouwd door professionals</p>
                    <div class="wiz-intro-partners__logos">
                        <img class="wiz-intro-partners__logo" src="${introImg}partner-mimaki.png" width="120" height="32" alt="Mimaki" decoding="async" />
                        <img class="wiz-intro-partners__logo wiz-intro-partners__logo--orajet" src="${introImg}partner-orajet.png" width="140" height="40" alt="Orajet" decoding="async" />
                        <img class="wiz-intro-partners__logo wiz-intro-partners__logo--postnl" src="${introImg}partner-postnl.png" width="140" height="40" alt="PostNL" decoding="async" />
                        <img class="wiz-intro-partners__logo wiz-intro-partners__logo--3m" src="${introImg}partner-3m.png" width="120" height="40" alt="3M" decoding="async" />
                    </div>
                </section>`;

            const paymentHtml = `
                <div class="wiz-intro-payment">
                    <img class="wiz-intro-payment__img" src="${introImg}payment-mollie-ideal.png" width="280" height="48" alt="Mollie en iDEAL — Veilig betalen" decoding="async" />
                </div>`;

            const socialBadgeHtml = `
                <div class="wiz-intro-social-badge" role="status">
                    <svg class="wiz-intro-social-badge__star" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>4.9 Rating · 33+ ZZP'ers gecertificeerd</span>
                </div>`;

            /* WIZ-INTRO-HERO-02: Zo werkt het on hero (transparent glass) so foto + kciuk stay visible. */
            const howHtml = `
                <section class="wiz-intro-how" aria-labelledby="wiz-intro-how-title">
                    <h3 id="wiz-intro-how-title" class="wiz-intro-how__heading">Zo werkt het</h3>
                    <ol class="wiz-intro-how__list">
                        <li class="wiz-intro-how__step">
                            <span class="wiz-intro-how__num" aria-hidden="true">1</span>
                            <span class="wiz-intro-how__body">
                                <strong class="wiz-intro-how__step-title">Op jouw tempo</strong>
                                <span class="wiz-intro-how__desc">Voortgang automatisch opgeslagen.</span>
                            </span>
                        </li>
                        <li class="wiz-intro-how__step">
                            <span class="wiz-intro-how__num" aria-hidden="true">2</span>
                            <span class="wiz-intro-how__body">
                                <strong class="wiz-intro-how__step-title">Upload of hulp</strong>
                                <span class="wiz-intro-how__desc">Eigen bestanden of onze vormgevers.</span>
                            </span>
                        </li>
                        <li class="wiz-intro-how__step">
                            <span class="wiz-intro-how__num" aria-hidden="true">3</span>
                            <span class="wiz-intro-how__body">
                                <strong class="wiz-intro-how__step-title">Goedkeuring &amp; productie</strong>
                                <span class="wiz-intro-how__desc">Levering binnen ca. 10 werkdagen.</span>
                            </span>
                        </li>
                    </ol>
                </section>`;

            const cardGridHtml = `
                    <div class="wiz-intro-card-grid">
                        <button type="button" class="wiz-intro-card-btn" data-intro-presets-toggle aria-expanded="${presetsOpen}" aria-controls="wiz-intro-presets-panel">
                            <img class="wiz-intro-card-btn__img wiz-intro-card-btn__img--breathe" src="${introImg}item-branding-box.png" width="72" height="72" alt="" decoding="async" />
                            <span class="wiz-intro-card-btn__label wiz-intro-card-btn__label--cyan">${presetsCardLabel}</span>
                        </button>
                        <button type="button" class="wiz-intro-card-btn wiz-intro-card-btn--game" data-intro-game>
                            <img class="wiz-intro-card-btn__img wiz-intro-card-btn__img--jump" src="${introImg}sprite-player-main.png" width="72" height="72" alt="" decoding="async" />
                            <span class="wiz-intro-card-btn__label wiz-intro-card-btn__label--yellow">Win een bonus →</span>
                        </button>
                    </div>`;

            return `
            <div class="wizard-intro-v6">
                <div class="wiz-intro-stage">
                    <div class="wiz-intro-stage__scene" aria-hidden="true"></div>
                    <div class="wiz-intro-stage__grid">
                        <div class="wiz-intro-stage__copy">
                            ${socialBadgeHtml}
                            <section class="wiz-intro-hero" aria-labelledby="wiz-intro-hero-title">
                                <h2 id="wiz-intro-hero-title" class="wiz-intro-hero__headline">Van anoniem naar <span class="wiz-cyan">Premium</span> <span class="wiz-magenta">Vakman.</span></h2>
                            </section>
                        </div>
                        ${howHtml}
                    </div>
                </div>

                <div class="wiz-intro-content-panel">
                    ${primaryCtaHtml}
                    ${cardGridHtml}
                    ${specBarHtml}
                    ${trustHtml}
                    ${partnersHtml}
                    ${paymentHtml}
                </div>

                ${presetsPanelHtml}
            </div>`;
        }
    });

    const _origInit = ZZPWizard.init.bind(ZZPWizard);
    ZZPWizard.init = async function () {
        this.activePresetId = this.activePresetId || null;
        this.introVehicleType = this.introVehicleType || 'bus_l';
        if (typeof this.introPresetsOpen !== 'boolean') {
            this.introPresetsOpen = false;
        }

        this.cacheDOM();
        if (typeof this.renderGameBridgeBanner === 'function') {
            this.renderGameBridgeBanner();
        }
        this.bindEvents();
        this.bindIntroPresetEvents();
        this.injectStickyCart();

        const hadSavedState = this.loadState();
        if (!this.introVehicleType) {
            this.introVehicleType = 'bus_l';
        }

        await this.loadMasterCatalog();
        await this.loadPresetManifest();

        window.addEventListener('pageshow', (e) => {
            if (e.persisted) {
                this.loadState();
                this.updateCartWidget();
                if (this.currentState >= 2) {
                    this.loadLazyScriptIfNeeded();
                }
                if (this.$nextBtn) {
                    this.renderStep();
                }
            }
        });

        this.$contentArea.innerHTML = '<div class="wiz-loading-container"><div class="wizard-spinner wiz-spinner--loading"></div><p>Producten laden...</p></div>';
        if (this.$prevBtn) {
            this.$prevBtn.style.display = 'none';
        }
        if (this.$nextBtn) {
            this.$nextBtn.style.display = 'none';
        }

        this.fetchPricesFromWP().then(() => {
            const params = new URLSearchParams(window.location.search);
            const urlPreset = params.get('preset');
            const portalQualOverride = params.get('utm_source') === 'portal_qual';
            if (urlPreset && this.getPresetById(urlPreset)) {
                const differs = this.activePresetId !== urlPreset;
                const shouldApply = portalQualOverride || differs || !hadSavedState;
                if (shouldApply) {
                    if (portalQualOverride || differs) {
                        this.currentState = 0;
                    }
                    this.applyPreset(urlPreset, { silent: true, skipTrack: true });
                    this.introPresetsOpen = true;
                    if (differs || portalQualOverride) {
                        this.fgTrack('preset_url_override', {
                            preset_id: urlPreset,
                            had_saved: hadSavedState,
                            portal_qual: portalQualOverride
                        });
                    }
                }
            }

            if (typeof this.applyDesignAgentParams === 'function') {
                this.applyDesignAgentParams(params);
            }

            if (this.$nextBtn) {
                this.$nextBtn.style.display = this.currentState === 0 ? 'none' : 'inline-block';
            }
            const $nav = this.$app && this.$app.querySelector('.wizard-navigation');
            if ($nav) {
                $nav.style.display = this.currentState === 0 ? 'none' : '';
            }
            if (this.currentState >= 2) {
                this.loadLazyScriptIfNeeded();
            }
            this.renderStep();
            this.updateCartWidget();
            this.fgTrack('wizard_start', { preset_manifest: true });
        });
    };

    const _origSave = ZZPWizard.saveState.bind(ZZPWizard);
    ZZPWizard.saveState = function () {
        _origSave();
        try {
            const raw = localStorage.getItem('zzpWizardState');
            if (!raw) {
                return;
            }
            const data = JSON.parse(raw);
            data.activePresetId = this.activePresetId;
            data.introVehicleType = this.introVehicleType;
            data.introPresetsOpen = !!this.introPresetsOpen;
            delete data.isStartpakketOn;
            const serialized = JSON.stringify(data);
            localStorage.setItem('zzpWizardState', serialized);
            sessionStorage.setItem('zzpWizardState', serialized);
        } catch (e) {
            console.warn('[Wizard Presets] saveState extend failed', e);
        }
    };

    const _origLoad = ZZPWizard.loadState.bind(ZZPWizard);
    ZZPWizard.loadState = function () {
        const loaded = _origLoad();
        try {
            const raw = localStorage.getItem('zzpWizardState') || sessionStorage.getItem('zzpWizardState');
            if (raw) {
                const data = JSON.parse(raw);
                if (data.introVehicleType) {
                    this.introVehicleType = data.introVehicleType;
                }
                if (data.activePresetId) {
                    this.activePresetId = data.activePresetId;
                } else if (data.isStartpakketOn) {
                    this.activePresetId = 'starter-zzp';
                }
                if (typeof data.introPresetsOpen === 'boolean') {
                    this.introPresetsOpen = data.introPresetsOpen;
                }
            }
        } catch (e) { /* ignore */ }
        return loaded;
    };

})();
