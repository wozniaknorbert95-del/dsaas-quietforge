/**
 * FLEXGRAFIK WIZARD V4.0 - STEP 2 (CAR BRANDING ENGINE)
 * SPRINT-1 | P0-04: All inline styles extracted to .w2-* CSS classes in zzp-wizard.css
 * SPRINT-1 | P1-06 (preview): Emoji in tabs replaced with SVG icons
 * SPRINT-1 | P2-06 (preview): All prices use var(--wizard-secondary) cyan — no more magenta prices
 */
const ZZPStep2Engine = {
    data: [],
    activeTab: 'diy', // 'diy', 'set', 'wrap', 'magneten'
    selectedSizes: {}, // Stores default DIY sizes, e.g. { 'NA-DIY-DRZWI': 'M' }
    isDataMasterSynced: false,
    
    init: function() {
        this.bindEvents();
        this.overrideWizard();
    },

    loadData: function() {
        // 1. Hard-Merge: SSoT (JSON) is visually authoritative; WooCommerce enforces prices/ids
        let rawItems = [];
        const masterReady = (typeof ZZPWizard !== 'undefined' && ZZPWizard.masterCatalog && ZZPWizard.masterCatalog.size > 0);
        
        if (masterReady) {
            this.isDataMasterSynced = true; // SPRINT-4: Mark as successfully synced with SSoT
            Array.from(ZZPWizard.masterCatalog.entries()).forEach(([sku, sso_data]) => {
                const wp_data = (typeof WizardWooCommerceData !== 'undefined' && WizardWooCommerceData[sku]) ? WizardWooCommerceData[sku] : {};
                
                let merged = {
                    sku: sku,
                    ...sso_data, 
                    ...wp_data
                };

                // CRITICAL: Protect marketing SSoT data from empty WC overrides
                if (sso_data.vraagteken_info && (!wp_data.vraagteken_info || wp_data.vraagteken_info === '')) {
                    merged.vraagteken_info = sso_data.vraagteken_info;
                }
                if (sso_data.drie_kenmerken && (!wp_data.drie_kenmerken || wp_data.drie_kenmerken.length === 0)) {
                    merged.drie_kenmerken = sso_data.drie_kenmerken;
                }
                if (sso_data.usage_hint && (!wp_data.usage_hint || String(wp_data.usage_hint).trim() === '')) {
                    merged.usage_hint = sso_data.usage_hint;
                }
                
                // Smart fallback: use SSoT image if WooCommerce has none
                let finalImage = wp_data.image_url;
                if ((!finalImage || finalImage === '') && sso_data.grafik_bestand) {
                    const STAP_TO_KEY = {
                        1: 'wizard-1-foundation',
                        2: 'wizard-2-car-branding',
                        3: 'wizard-3-clothing',
                        4: 'wizard-4-eerste-indruk',
                        5: 'wizard-5-visibility',
                        6: 'wizard-6-tools-gadgets',
                        7: 'wizard-7-premium-extras'
                    };
                    const stepKey = STAP_TO_KEY[sso_data.wizard_stap] || 'wizard-2-car-branding';
                    if (typeof ZZPWizard !== 'undefined' && typeof ZZPWizard._resolveSsoFallbackImage === 'function') {
                        finalImage = ZZPWizard._resolveSsoFallbackImage(sku, sso_data, stepKey);
                    } else {
                        const baseUrl = (typeof ZZPWizard !== 'undefined') ? ZZPWizard.themeDir : '/wp-content/themes/flexgrafik-wizard-theme';
                        const gb = sso_data.grafik_bestand;
                        if (sso_data.wizard_stap === 1) {
                            finalImage = `${baseUrl}/assets/images/${gb}`;
                        } else {
                            finalImage = `${baseUrl}/assets/images/wizard-step2/${gb}`;
                        }
                    }
                }
                merged.image_url = finalImage;
                
                // Property normalization
                merged.wizard_step = merged.wizard_step || sso_data.wizard_stap;
                merged.offer_mode = merged.offer_mode || sso_data.offer_mode;
                merged.product_type = merged.product_type || sso_data.product_type;
                merged.active = merged.active !== undefined ? merged.active : sso_data.active;
                
                // Normalize fit_note to canonical values: bus_l, bus_xl, caddy, passenger
                let rawFit = merged.fit_note || sso_data.fit_note || "";
                merged.fit_note = String(rawFit)
                    .replace(/^bestelbus_l$/, "bus_l")
                    .replace(/^bestelbus_xl$/, "bus_xl")
                    .replace(/^bus-l$/, "bus_l")
                    .replace(/^bus-xl$/, "bus_xl")
                    .replace(/^personenauto$/, "passenger");

                rawItems.push(merged);
            });
        } else if (typeof WizardWooCommerceData !== 'undefined') {
            rawItems = Object.keys(WizardWooCommerceData).map(sku => ({sku, ...WizardWooCommerceData[sku]}));
        }

        // 2. Filter Step 2 (Car Branding) items only — skip legacy
        this.data = rawItems.filter(item => {
            const step = item.wizard_step || item.wizard_stap;
            const stepStr = String(step);
            const isBrandingStep = stepStr === '2' || stepStr === 'wizard-2-car-branding' || stepStr === 'wizard-2-car';
            const isActive = item.active !== false && item.active !== 'no';
            const isLegacy = item.legacy === true || item.legacy === 'yes';
            
            // Normalize fit_note to canonical values: bus_l, bus_xl, caddy, passenger
            if (item.fit_note) {
                item.fit_note = String(item.fit_note)
                    .replace(/^bestelbus_l$/, "bus_l")
                    .replace(/^bestelbus_xl$/, "bus_xl")
                    .replace(/^bus-l$/, "bus_l")
                    .replace(/^bus-xl$/, "bus_xl")
                    .replace(/^personenauto$/, "passenger");
            }

            return isBrandingStep && isActive && !isLegacy;
        });

        // 3. Decode S/M/L variants for DIY items
        this.data.forEach(item => {
            if (item.offer_mode === 'diy' && item.sku) {
                const parts = item.sku.split('-');
                if (parts.length > 2 && ['S', 'M', 'L'].includes(parts[parts.length - 1])) {
                    item.size = parts[parts.length - 1];
                    item.product_key = parts.slice(0, -1).join('-');
                } else {
                    item.size = 'M';
                    item.product_key = item.sku;
                }
            } else {
                item.product_key = item.sku;
            }
        });
        
        // Silent cart resync after data load (BFCache safety)
        if (typeof ZZPWizard.calculateCart === 'function') {
            ZZPWizard.calculateCart();
            ZZPWizard.updateCartWidget();
        }
    },

    bindEvents: function() {
        if(this.eventsBound) return;
        this.eventsBound = true;
        
        document.body.addEventListener('click', (e) => {
            // Tab switching
            const tabBtn = e.target.closest('.w2-tab-btn[data-tab]');
            if (tabBtn) {
                this.activeTab = tabBtn.dataset.tab;
                if (typeof ZZPWizard !== 'undefined') {
                    ZZPWizard.saveState();
                    ZZPWizard.renderStep();
                }
                return;
            }

            // Vehicle type selection
            const vehicleCard = e.target.closest('.wizard-card-vehicle-type');
            if (vehicleCard) {
                const type = vehicleCard.dataset.value;
                if (typeof ZZPWizard !== 'undefined') {
                    ZZPWizard.selections.vehicleType = type;
                    ZZPWizard.saveState();
                    ZZPWizard.renderStep();
                }
                return;
            }

            // Size radio switch for DIY items
            const sizeRadio = e.target.closest('.w2-segmented-radio');
            if (sizeRadio) {
                const productKey = sizeRadio.dataset.key;
                const newSize = sizeRadio.value;
                this.changeSize(productKey, newSize);
            }
        });
    },

    changeSize: function(productKey, newSize) {
        const items = this.data.filter(i => i.product_key === productKey && i.offer_mode === 'diy');
        
        let oldSku = null;
        let newSku = null;

        items.forEach(item => {
            if (ZZPWizard.selections.vehicleItems && ZZPWizard.selections.vehicleItems[item.sku]) {
                oldSku = item.sku;
            }
            if (item.size === newSize) {
                newSku = item.sku;
            }
        });

        if (oldSku && oldSku !== newSku && newSku) {
            const qty = ZZPWizard.selections.vehicleItems[oldSku];
            delete ZZPWizard.selections.vehicleItems[oldSku];
            ZZPWizard.selections.vehicleItems[newSku] = qty;
        }

        this.selectedSizes[productKey] = newSize;
        if (typeof ZZPWizard !== 'undefined') {
            ZZPWizard.calculateCart();
            ZZPWizard.saveState();
            ZZPWizard.renderStep();
        }
    },

    overrideWizard: function() {
        if(typeof ZZPWizard !== 'undefined') {
            ZZPWizard.renderStepVehicle = () => {
                // P0-01: Re-sync data if masterCatalog arrived late or data is empty
                const masterLateArrival = (ZZPWizard.masterCatalog && ZZPWizard.masterCatalog.size > 0 && !this.isDataMasterSynced);
                if (this.data.length === 0 || masterLateArrival) {
                    this.loadData();
                }
                return this.renderStepVehicleUI();
            };
        }
    },

    renderStepVehicleUI: function() {
        const vType = ZZPWizard.selections.vehicleType;
        
        // Section 1: Vehicle type selector (panel title lives in wizard-1-3 _renderStepPanelHeader)
        let html = `<div class="w2-section"><span class="num">1</span> Wat voor voertuig heb je?</div>`;
        html += this.renderVehicleSelector(vType);

        if (!vType || vType === 'none') {
            return html;
        }

        // Section 2: Tab navigation - P0-04 improvements
        const iconDiy   = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`;
        const iconSet   = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`;
        const iconWrap  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20h20M5 20l2-8 5 5 5-5 2 8"/></svg>`;
        const iconMagnet = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`;

        // Dynamic Tab Availability Check
        const hasDiy    = this.data.some(i => i.offer_mode === 'diy' && i.fit_note === vType);
        const hasSet    = this.data.some(i => i.offer_mode === 'set' && i.fit_note === vType);
        const hasWrap   = this.data.some(i => String(i.sku).includes('WRAP') || i.wizard_categorie === 'Wraps');
        const hasMagnet = this.data.some(i => (i.wizard_categorie === 'Magneten' || String(i.sku).includes('MAGNET')) && i.fit_note === vType);

        // Auto-switch if current tab is empty
        const availableTabs = [];
        if (hasDiy) availableTabs.push('diy');
        if (hasSet) availableTabs.push('set');
        if (hasWrap) availableTabs.push('wrap');
        if (hasMagnet) availableTabs.push('magneten');

        if (!availableTabs.includes(this.activeTab) && availableTabs.length > 0) {
            this.activeTab = availableTabs[0];
        }

        html += `
            <div class="w2-section"><span class="num">2</span> Wat wil je bereiken?</div>
            ${this.renderUpsellHook(vType)}
            <div class="w2-tabs-container w2-tabs" role="tablist" aria-label="Voertuig branding categorieën">
                ${hasDiy ? `<button type="button" id="w2-tab-diy" class="w2-tab-btn ${this.activeTab === 'diy' ? 'active' : ''}" data-tab="diy" role="tab" aria-selected="${this.activeTab === 'diy' ? 'true' : 'false'}" aria-controls="w2-tab-panel-diy">${iconDiy} Zelf Samenstellen</button>` : ''}
                ${hasSet ? `<button type="button" id="w2-tab-set" class="w2-tab-btn ${this.activeTab === 'set' ? 'active' : ''}" data-tab="set" role="tab" aria-selected="${this.activeTab === 'set' ? 'true' : 'false'}" aria-controls="w2-tab-panel-set">${iconSet} Instapklare Sets</button>` : ''}
                ${hasWrap ? `<button type="button" id="w2-tab-wrap" class="w2-tab-btn ${this.activeTab === 'wrap' ? 'active' : ''}" data-tab="wrap" role="tab" aria-selected="${this.activeTab === 'wrap' ? 'true' : 'false'}" aria-controls="w2-tab-panel-wrap">${iconWrap} Premium Wraps</button>` : ''}
                ${hasMagnet ? `<button type="button" id="w2-tab-magneten" class="w2-tab-btn ${this.activeTab === 'magneten' ? 'active' : ''}" data-tab="magneten" role="tab" aria-selected="${this.activeTab === 'magneten' ? 'true' : 'false'}" aria-controls="w2-tab-panel-magneten">${iconMagnet} Magneten</button>` : ''}
            </div>
        `;

        // P3-06: one tabpanel per tab so aria-controls always references an existing node
        // P3-06: render only the active tab body so side effects (e.g. magnet auto-select setTimeout) do not run while another tab is visible
        const tabKeys = ['diy', 'set', 'wrap', 'magneten'];
        tabKeys.forEach((tabKey) => {
            if (!availableTabs.includes(tabKey)) return;
            const active = this.activeTab === tabKey;
            html += `<div role="tabpanel" id="w2-tab-panel-${tabKey}" aria-labelledby="w2-tab-${tabKey}"${active ? '' : ' hidden'}>`;
            if (active) {
                if (tabKey === 'diy') html += this.renderDIY();
                else if (tabKey === 'set') html += this.renderSets();
                else if (tabKey === 'wrap') html += this.renderWraps(vType);
                else if (tabKey === 'magneten') html += this.renderMagneten(vType);
            }
            html += `</div>`;
        });

        return html;
    },

    /**
     * Phase 2 - Strategic Selling (AOV / conversion hooks)
     */
    renderUpsellHook: function(vType) {
        const cart = ZZPWizard.selections.vehicleItems || {};
        const skus = Object.keys(cart);
        const hasBranding = skus.some(sku => !sku.includes('MAGNET') && !sku.includes('WRAP') && !sku.includes('DESIGN'));
        const hasDesignFee = skus.some(sku => sku.includes('DESIGN'));
        const hasMagnets = skus.some(sku => sku.includes('MAGNET'));

        if (hasBranding && !hasDesignFee) {
            return `
            <div class="w2-upsell-hook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--wizard-primary)" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                <div>
                    <strong>Pro tip:</strong> Voeg een <strong>Design Fee</strong> toe voor een perfecte mockup door onze DTP'ers.
                </div>
            </div>`;
        }

        if (vType !== 'passenger' && !hasMagnets && skus.length > 0) {
            return `
            <div class="w2-upsell-hook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--wizard-secondary)" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                <div>
                    <strong>Flexibiliteit nodig?</strong> Bekijk onze <strong>Magneetplaten</strong> voor tijdelijke reclame.
                </div>
            </div>`;
        }

        return '';
    },

    _escapeHtml: function(str) {
        if (typeof ZZPWizard !== 'undefined' && typeof ZZPWizard._escapeHtml === 'function') {
            return ZZPWizard._escapeHtml(str);
        }
        return String(str).replace(/[<>&"']/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c]));
    },

    _formatVehiclePrice: function(item) {
        const price = parseFloat(item.price || item.price_suggested || 0);
        if (typeof ZZPWizard !== 'undefined' && typeof ZZPWizard._formatEurNl === 'function') {
            return ZZPWizard._formatEurNl(price);
        }
        return '€' + price.toFixed(2);
    },

    _renderVehicleKenmerken: function(sku) {
        if (typeof ZZPWizard === 'undefined' || typeof ZZPWizard.renderKenmerken !== 'function') return '';
        const raw = ZZPWizard.renderKenmerken(sku, 'list');
        if (!raw) return '';
        return raw.replace('wiz-foundation-card__features', 'wiz-vehicle-card__features');
    },

    _renderVehicleSegmented: function(variants, productKey, selectedSize) {
        const sizeOrder = { S: 1, M: 2, L: 3 };
        variants.sort((a, b) => (sizeOrder[a.size] || 0) - (sizeOrder[b.size] || 0));
        const label = this._escapeHtml(variants[0].title || variants[0].naam || productKey);
        return `
        <div class="w2-segmented wiz-vehicle-card__segmented" role="group" aria-label="Formaat ${label}">
            ${variants.map(szItem => `
                <label>
                    <input type="radio" name="size_${productKey}" class="w2-segmented-radio" data-key="${productKey}" value="${szItem.size}" ${selectedSize === szItem.size ? 'checked' : ''}>
                    <span>${szItem.size}<br><small class="w2-segmented-sub">Formaat</small></span>
                </label>
            `).join('')}
        </div>`;
    },

    /** P2-09: Foundation-parity vehicle product cards (16:9 hero, hint, kenmerken, footer stepper). */
    _renderVehicleCatalog: function(item, options) {
        options = options || {};
        const category = options.category || 'vehicleItems';
        const sku = item.sku;
        const qty = (typeof ZZPWizard !== 'undefined' && ZZPWizard.selections[category] && ZZPWizard.selections[category][sku])
            ? ZZPWizard.selections[category][sku] : 0;
        const heroTitle = item.hero_title || item.title || item.naam || sku;
        const safeName = this._escapeHtml(heroTitle);
        const wrapBadge = options.wrapBadge ? ' <span class="w2-wrap-badge wiz-vehicle-card__wrap-badge">Wrap</span>' : '';
        const mediaDark = options.darkMedia ? ' wiz-vehicle-card__media--dark' : '';

        const badge = item.focus_badge ? `<span class="wiz-vehicle-card__badge">${this._escapeHtml(item.focus_badge)}</span>` : '';

        const fallbackSvg = `<div class="wiz-vehicle-card__media-fallback" aria-hidden="true"><svg class="wiz-faded-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>`;
        const media = item.image_url
            ? `<img src="${item.image_url}" class="wiz-vehicle-card__img" alt="${safeName}" loading="lazy" decoding="async">`
            : fallbackSvg;

        const hintText = item.usage_hint || '';
        const hint = hintText ? `<p class="wiz-vehicle-card__hint">${this._escapeHtml(hintText)}</p>` : '';
        const tooltip = (typeof ZZPWizard !== 'undefined' && ZZPWizard.renderTooltip)
            ? ZZPWizard.renderTooltip(sku, true)
            : '';
        const kenmerken = this._renderVehicleKenmerken(sku);

        const segmented = (options.variants && options.productKey)
            ? this._renderVehicleSegmented(options.variants, options.productKey, this.selectedSizes[options.productKey] || 'M')
            : '';

        return `
            <div class="wizard-card wiz-vehicle-card ${qty > 0 ? 'wizard-card-active' : ''}" data-id="${sku}" data-sku="${sku}" data-category="${category}" data-selected="${qty > 0 ? 'true' : 'false'}">
                <div class="wiz-vehicle-card__media${mediaDark}">
                    ${badge}
                    ${media}
                </div>
                <div class="wiz-vehicle-card__body">
                    <div class="fg-tooltip-container wiz-vehicle-card__head">
                        <h3 class="wiz-vehicle-card__title" id="wiz-vehicle-title-${sku}">${safeName}${wrapBadge}</h3>
                        ${tooltip}
                    </div>
                    ${hint}
                    ${kenmerken}
                </div>
                <div class="wiz-vehicle-card__footer">
                    ${segmented}
                    <div class="wiz-vehicle-card__footer-row">
                        <span class="wiz-vehicle-card__price">${this._formatVehiclePrice(item)}</span>
                        <div class="wizard-stepper wiz-vehicle-stepper">
                            <button type="button" class="wizard-stepper-btn" data-action="minus" data-id="${sku}" data-category="${category}" aria-label="Verwijder één ${safeName}">−</button>
                            <span class="wizard-stepper-val">${qty}</span>
                            <button type="button" class="wizard-stepper-btn" data-action="plus" data-id="${sku}" data-category="${category}" aria-label="Voeg één ${safeName} toe">+</button>
                        </div>
                    </div>
                </div>
            </div>`;
    },

    _renderVehicleCatalogGrid: function(cardsHtml, ariaLabel) {
        return `<div class="wizard-grid wizard-grid-2 wiz-vehicle-grid" role="group" aria-label="${ariaLabel}">${cardsHtml}</div>`;
    },

    renderDIY: function() {
        const vType = ZZPWizard.selections.vehicleType;
        const items = this.data.filter(i => i.offer_mode === 'diy' && i.fit_note === vType);

        // Group by product_key (e.g. CS-DIY-DEUR)
        const grouped = {};
        items.forEach(p => {
            if(!grouped[p.product_key]) grouped[p.product_key] = [];
            grouped[p.product_key].push(p);
        });

        let cardsHtml = '';
        Object.keys(grouped).forEach(key => {
            const variants = grouped[key];
            if (!this.selectedSizes[key]) this.selectedSizes[key] = 'M';
            const activeItem = variants.find(i => i.size === this.selectedSizes[key]) || variants[0];
            cardsHtml += this._renderVehicleCatalog(activeItem, {
                variants: variants.length > 1 ? variants : null,
                productKey: key
            });
        });

        // Read section_hint from SSoT (first DIY item has it)
        let sectionHintHtml = '';
        if (items.length > 0 && items[0].section_hint) {
            const hint = items[0].section_hint;
            const linkHtml = hint.link ? `<a href="${hint.link}" class="w2-hint-link">${hint.link_text || 'Learn more →'}</a>` : '';
            sectionHintHtml = `
        <div class="w2-hint-box">
            <p><strong class="w2-text-bright">${hint.text}</strong> ${linkHtml}</p>
        </div>`;
        }

        return `${sectionHintHtml}
        ${this._renderVehicleCatalogGrid(cardsHtml, 'Zelf samenstellen producten')}`;
    },

    renderSets: function() {
        const vType = ZZPWizard.selections.vehicleType;
        const sets = this.data.filter(i => i.offer_mode === 'set' && i.fit_note === vType);

        let cardsHtml = sets.map(item => this._renderVehicleCatalog(item)).join('');

        // Read section_hint from SSoT (first Set item has it)
        let sectionHintHtml = '';
        if (sets.length > 0 && sets[0].section_hint) {
            const hint = sets[0].section_hint;
            const linkHtml = hint.link ? `<a href="${hint.link}" class="w2-hint-link">${hint.link_text || 'Learn more →'}</a>` : '';
            sectionHintHtml = `
        <div class="w2-hint-box w2-hint-box--primary">
            <p><strong class="w2-text-bright">${hint.text}</strong> ${linkHtml}</p>
        </div>`;
        }

        let html = `${sectionHintHtml}
        ${this._renderVehicleCatalogGrid(cardsHtml, 'Instapklare sets')}`;
        return html;
    },

    /** P2-09-V3-GEM-MAGNETS: per-vehicle V7 hero (12 SKU × unique grafik). */
    _resolveMagnetHeroUrl: function(sku, vType) {
        const typeBySku = {
            'MA-002': 'zijkanten',
            'MA-003': 'achter',
            'MA-005': 'set',
            'MA-002-L': 'zijkanten',
            'MA-004-L': 'achter',
            'MA-006-L': 'set',
            'MA-002-XL': 'zijkanten',
            'MA-004-XL': 'achter',
            'MA-006-XL': 'set',
            'MA-001-S': 'zijkanten',
            'MA-003-S': 'achter',
            'MA-005-S': 'set'
        };
        const vehSlugByType = {
            caddy: 'caddy',
            bus_l: 'bus-l',
            bus_xl: 'bus-xl',
            passenger: 'ps'
        };
        const magnetType = typeBySku[sku];
        const vehSlug = vehSlugByType[vType];
        if (!magnetType || !vehSlug) return '';
        const baseUrl = (typeof ZZPWizard !== 'undefined') ? ZZPWizard.themeDir : '/wp-content/themes/flexgrafik-wizard-theme';
        return baseUrl + '/assets/images/wizard-step2/wizard-step2_' + vehSlug + '_magnet_' + magnetType + '_v1.png';
    },

    /** P2-09-V3-GEM-WRAPS: per-vehicle V3 hero (3 shared SKUs × 4 fit_note). */
    _resolveWrapHeroUrl: function(sku, vType) {
        const tierBySku = {
            'NA-WRAP-BASIC': 'basic',
            'NA-WRAP-PRO': 'pro',
            'NA-WRAP-MAX': 'max'
        };
        const vehSlugByType = {
            caddy: 'caddy',
            bus_l: 'bus-l',
            bus_xl: 'bus-xl',
            passenger: 'ps'
        };
        const tier = tierBySku[sku];
        const vehSlug = vehSlugByType[vType];
        if (!tier || !vehSlug) return '';
        const baseUrl = (typeof ZZPWizard !== 'undefined') ? ZZPWizard.themeDir : '/wp-content/themes/flexgrafik-wizard-theme';
        return baseUrl + '/assets/images/wizard-step2/wizard-step2_' + vehSlug + '_wrap_' + tier + '_v1.png';
    },

    renderWraps: function(vType) {
        const wraps = this.data.filter(i => 
            (String(i.sku).includes('WRAP') || i.wizard_categorie === 'Wraps') && 
            i.fit_note && i.fit_note.includes(vType)
        );

        const cardsHtml = wraps.map(item => {
            const v3Url = this._resolveWrapHeroUrl(item.sku, vType);
            const displayItem = v3Url ? Object.assign({}, item, { image_url: v3Url }) : item;
            return this._renderVehicleCatalog(displayItem, { wrapBadge: true, darkMedia: true });
        }).join('');
        let html = this._renderVehicleCatalogGrid(cardsHtml, 'Premium wraps');
        
        // Read section_hint from SSoT (first Wrap item has it)
        if (wraps.length > 0 && wraps[0].section_hint) {
            const hint = wraps[0].section_hint;
            const linkHtml = hint.link ? `<a href="${hint.link}" class="w2-hint-link">${hint.link_text || 'Learn more →'}</a>` : '';
            html += `
        <div class="w2-hint-box w2-mt-20">
            <p><strong class="w2-text-bright">${hint.text}</strong> ${linkHtml}</p>
        </div>`;
        }

        // Hybrid wrap process info — P0-04: .w2-process-block from CSS
        const processIconSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--wizard-secondary)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`;
        const editIconSvg    = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--wizard-secondary)" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;

        html += `
        <div class="w2-process-block">
            <h4>${processIconSvg} Hybrid Wrap Proces (Ontwerp + Print + Laminaat)</h4>
            <div class="w2-process-steps">
                <div class="w2-process-step">
                    <span class="w2-process-step-num">1.</span>
                    <div><strong class="w2-text-bright">Ontzorging via FlexGrafik:</strong> Bovenstaande prijzen omvatten premium ontwerp (1 mockup + 2 correctierondes), eco-solvent full-colour print op ORAJET® 3971RA+ ProSlide én beschermend UV-laminaat.</div>
                </div>
                <div class="w2-process-step">
                    <span class="w2-process-step-num">2.</span>
                    <div><strong class="w2-text-bright">ErkaPremium Montage:</strong> Vakkundige montage wordt separaat geoffreerd. Na ontwerpgoedkeuring koppelt FlexGrafik jou aan ErkaPremium — je ontvangt binnen <strong>24 uur</strong> een montage-offerte met <strong>10% partnertarief korting</strong>.</div>
                </div>
            </div>
        </div>
        `;

        return html;
    },

    renderMagneten: function(vType) {
        // P1-05: SSoT fit_note only
        const magnets = this.data.filter(i =>
            (i.wizard_categorie === 'Magneten' || String(i.sku).includes('MAGNET')) && 
            i.fit_note === vType
        );
        
        if(magnets.length === 0) return '';

        const magnetIconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wizard-secondary)" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`;

        // P0-04: .w2-magnets-header, .w2-hint-box--dark from CSS
        let html = `
        <h3 class="wizard-section-title w2-magnets-header">
            ${magnetIconSvg}
            Kies voor flexibiliteit — Magneetplaten
        </h3>`;
        
        // Read section_hint from SSoT (first Magnet item has it)
        if (magnets.length > 0 && magnets[0].section_hint) {
            const hint = magnets[0].section_hint;
            const linkHtml = hint.link ? `<a href="${hint.link}" class="w2-hint-link">${hint.link_text || 'Learn more →'}</a>` : '';
            html += `
        <div class="w2-hint-box w2-hint-box--dark">
            <p><strong class="w2-text-bright">${hint.text}</strong> ${linkHtml}</p>
        </div>`;
        }

        let foundDefault = null;
        let cardsHtml = '';

        magnets.forEach(item => {
            const qty = (ZZPWizard.selections.vehicleItems && ZZPWizard.selections.vehicleItems[item.sku]) ? ZZPWizard.selections.vehicleItems[item.sku] : 0;
            if (item.is_default && qty === 0 && !ZZPWizard.selections.magnetenAutoSelected) {
                foundDefault = item.sku;
            }
            const v7Url = this._resolveMagnetHeroUrl(item.sku, vType);
            const displayItem = v7Url ? Object.assign({}, item, { image_url: v7Url }) : item;
            cardsHtml += this._renderVehicleCatalog(displayItem);
        });

        html += this._renderVehicleCatalogGrid(cardsHtml, 'Magneetplaten');

        const checkIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--wizard-secondary)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
        html += `
        <div class="w2-dtp-addon w2-mt-35">
            <div>
                <h4 class="w2-text-bright">${checkIcon} Anti-Kras Laminaat</h4>
                <p>Onze magneten worden standaard voorzien van hoogglans laminaat. <strong class="w2-text-bright">Gratis inbegrepen</strong></p>
            </div>
        </div>`;

        // Auto-select default magnet (race-condition safe via setTimeout)
        if (foundDefault) {
            setTimeout(() => {
                if (typeof ZZPWizard !== 'undefined' && ZZPWizard.selections) {
                    if (!ZZPWizard.selections.vehicleItems) ZZPWizard.selections.vehicleItems = {};
                    ZZPWizard.selections.vehicleItems[foundDefault] = 1;
                    ZZPWizard.selections.magnetenAutoSelected = true;
                    if (typeof ZZPWizard.trackWizardAddProduct === 'function') {
                        ZZPWizard.trackWizardAddProduct(foundDefault, 'vehicleItems');
                    }
                    ZZPWizard.calculateCart();
                    ZZPWizard.saveState();
                    ZZPWizard.renderStep();
                }
            }, 50);
        }

        return html;
    },

    renderVehicleSelector: function(vType) {
        const baseUrl = (typeof ZZPWizard !== 'undefined') ? ZZPWizard.themeDir : '/wp-content/themes/flexgrafik-wizard-theme';
        const typeCards = [
            { id: 'caddy',     label: 'Caddy / Partner',          img: `${baseUrl}/assets/images/voertuig_caddy.png`,       sub: 'Klein bestelbus' },
            { id: 'bus_l',     label: 'Bestelbus MIDDEL (L)',      img: `${baseUrl}/assets/images/voertuig_bus_l.png`,       sub: 'Vito, Transporter, Transit' },
            { id: 'bus_xl',    label: 'Bestelbus GROOT (XL)',      img: `${baseUrl}/assets/images/voertuig_bus_xl.png`,      sub: 'Sprinter, Crafter, Ducato' },
            { id: 'passenger', label: 'Personenauto / Kombi',      img: `${baseUrl}/assets/images/voertuig_passenger.png`,   sub: 'Ideaal voor subtiele raamstickers' },
            { id: 'none',      label: 'Geen voertuig',             img: `${baseUrl}/assets/images/geen_voertuig_v4.png`,     sub: 'Sla deze stap over' }
        ];
        return `
            <div class="wizard-grid wizard-vehicle-types-grid vehicle-grid" role="listbox" aria-label="Kies je voertuigtype">
                ${typeCards.map(t => `
                <div class="wizard-card wizard-card-vehicle-type ${vType === t.id ? 'wizard-option-selected' : ''}"
                     data-type="vehicle-type" data-value="${t.id}" tabindex="0" role="option" aria-selected="${vType === t.id ? 'true' : 'false'}">
                    <div class="wizard-vehicle-img-container">
                        <img src="${t.img}" alt="${t.label}" class="wizard-vehicle-img">
                    </div>
                    <div class="wizard-card-content">
                        <div class="wizard-card-title">${t.label}</div>
                        <div class="wizard-card-sub">${t.sub}</div>
                    </div>
                </div>`).join('')}
            </div>`;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('zzp-wizard-app')) {
        ZZPStep2Engine.init();
    }
});
