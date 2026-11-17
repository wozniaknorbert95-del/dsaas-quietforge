/**
 * ==========================================
 * FLEXGRAFIK WIZARD V5.0 - LAZY CHUNK (Stappen 4-7)
 * ==========================================
 * Dit bestand wordt dynamisch ingeladen bij Stap 2 om FCP te verbeteren.
 * SPRINT-1 | P0-03: _renderGenericCatalog removed from this file.
 * Master definition lives in wizard-1-3.js — single source of truth.
 */

if (typeof ZZPWizard !== 'undefined') {
    Object.assign(ZZPWizard, {
        
        renderStepPrint: function () {
            const bookSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wizard-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>';
            const stickerSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wizard-secondary)" stroke-width="2"><path d="M2 7h20v14H2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>';
            const groups = [
                { key: 'foundation', label: 'PAPIEREN VISITEKAARTJES — 1-ZIJDIG', svg: bookSvg },
                { key: 'foundation_2z', label: 'PAPIEREN VISITEKAARTJES — 2-ZIJDIG', svg: bookSvg },
                { key: 'sticker_visitekaart', label: 'STICKER-VISITEKAARTJES — ZONDER LAMINAAT (85×55 MM)', svg: stickerSvg },
                { key: 'sticker_visitekaart_lam', label: 'STICKER-VISITEKAARTJES — MÉT LAMINAAT (85×55 MM)', svg: stickerSvg }
            ];

            const existingGroupKeys = groups.map(g => g.key);
            const allGroupsInCatalog = [...new Set(this.printCatalog.map(i => i.group))];
            allGroupsInCatalog.forEach(gk => {
                if (!existingGroupKeys.includes(gk)) {
                    groups.push({
                        key: gk, label: gk.replace(/_/g, ' ').toUpperCase(),
                        svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wizard-secondary)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>'
                    });
                }
            });

            const html = groups.map(group => {
                const items = this.printCatalog
                    .filter(i => i.group === group.key)
                    .sort((a, b) => (a.menu_order || 0) - (b.menu_order || 0));
                if (items.length === 0) return '';
                return `
                <section id="print-group-${group.key}" class="wiz-print-group-anchor" aria-labelledby="print-group-${group.key}-title">
                    <div class="wiz-section-header">
                        ${group.svg}
                        <h3 id="print-group-${group.key}-title" class="wizard-section-title">${group.label}</h3>
                    </div>
                    ${this._renderOptionCardGrid(items, 'print', {
                        gridClass: 'option-grid cols-3 wiz-catalog-grid',
                        ariaLabel: group.label,
                        getBadge: (item) => this._catalogFocusBadge(item)
                    })}
                </section>
                `;
            }).join('');

            return `
                <p class="wiz-step-description">Kies papieren of sticker-visitekaartjes — 1-zijdig, 2-zijdig of met laminaat voor zware omstandigheden.</p>
                ${html}`;
        },

        renderStepVisibility: function () {
            const groups = [
                { key: 'visibility', label: 'ZICHTBAARHEID OP LOCATIE', svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wizard-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line></svg>' }
            ];

            // DYNAMIC GROUP INJECTION
            const existingGroupKeys = groups.map(g => g.key);
            const allGroupsInCatalog = [...new Set(this.visibilityCatalog.map(i => i.group))];
            allGroupsInCatalog.forEach(gk => {
                if (!existingGroupKeys.includes(gk)) {
                    groups.push({
                        key: gk,
                        label: gk.replace(/_/g, ' ').toUpperCase(),
                        svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wizard-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>'
                    });
                }
            });

            const html = groups.map(group => {
                const items = this.visibilityCatalog.filter(i => i.group === group.key);
                if (items.length === 0) return '';
                return `
                <div class="wiz-section-header">
                    ${group.svg}
                    <h3 class="wizard-section-title">${group.label}</h3>
                </div>
                ${this._renderGenericCatalog(items, 'visibility')}`;
            }).join('');

            return `
                <p class="wiz-step-description">Zorg dat iedereen ziet waar je werkt. Bouwborden, banners, vlaggen en roll-ups voor sterke zichtbaarheid op locatie en binnenpresentaties.</p>
                ${html}`;
        },

        renderStepTools: function () {
            const groups = [
                { key: 'tools_and_gadgets', label: 'BRANDING STICKERS & GEREEDSCHAP', svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wizard-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>' }
            ];

            // DYNAMIC GROUP INJECTION
            const existingGroupKeys = groups.map(g => g.key);
            const allGroupsInCatalog = [...new Set(this.toolsCatalog.map(i => i.group))];
            allGroupsInCatalog.forEach(gk => {
                if (!existingGroupKeys.includes(gk)) {
                    groups.push({
                        key: gk,
                        label: gk.replace(/_/g, ' ').toUpperCase(),
                        svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wizard-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>'
                    });
                }
            });

            return groups.map(group => {
                const items = this.toolsCatalog.filter(i => i.group === group.key);
                if (items.length === 0) return '';
                return `
                <div class="wiz-section-header">
                    ${group.svg}
                    <h3 class="wizard-section-title">${group.label}</h3>
                </div>
                ${this._renderGenericCatalog(items, 'tools')}`;
            }).join('');
        },

        renderStepPremium: function () {
            const groups = [
                { key: 'premium_extras', label: 'MERCHANDISE & GEAR (VOOR JOU EN JE TEAM)', svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wizard-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' }
            ];

            // DYNAMIC GROUP INJECTION
            const existingGroupKeys = groups.map(g => g.key);
            const allGroupsInCatalog = [...new Set(this.premiumCatalog.map(i => i.group))];
            allGroupsInCatalog.forEach(gk => {
                if (!existingGroupKeys.includes(gk)) {
                    groups.push({
                        key: gk,
                        label: gk.replace(/_/g, ' ').toUpperCase(),
                        svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wizard-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>'
                    });
                }
            });

            const html = groups.map(group => {
                const items = this.premiumCatalog.filter(i => i.group === group.key);
                if (items.length === 0) return '';
                return `
                <div class="wiz-section-header">
                    ${group.svg}
                    <h3 class="wizard-section-title">${group.label}</h3>
                </div>
                ${this._renderGenericCatalog(items, 'premium')}`;
            }).join('');

            return `
                <p class="wiz-step-description">De premium finishing touch voor jouw professionele uitstraling — op maat gepersonaliseerd.</p>
                ${html}`;
        },

        // P0-03: _renderGenericCatalog intentionally NOT defined here.
        // Master definition lives in wizard-1-3.js (SSOT).
        // All render functions delegate via this._renderGenericCatalog().

        // POLISH-D5B / WIZ-VCA-15: form-only checkout panel (line items live in sticky cart)
        renderStepSummary: function () {
            const gameBonusHint = typeof this._renderGameBonusSummaryHint === 'function'
                ? this._renderGameBonusSummaryHint()
                : '';

            const quoteMode = typeof this.isQuoteModePreset === 'function' && this.isQuoteModePreset();
            const checkSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
            const warnSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M12 2L2 22h20L12 2z"/><path d="M12 16v.01M12 8v4"/></svg>';
            const deliveryPills = this._renderCheckoutDeliveryPills();

            return `
                <div class="wiz-checkout-step">
                    <div class="quote-banner${quoteMode ? ' show' : ''}" id="wiz-quote-banner" role="status">
                        ${warnSvg}
                        Dit is een offerte-traject. Wij nemen contact op via WhatsApp i.p.v. directe checkout.
                    </div>
                    <div class="reassure" aria-label="Zekerheden">
                        <span>${checkSvg} Geen vooruitbetaling</span>
                        <span>${checkSvg} Levering ca. 10 werkdagen</span>
                        <span>${checkSvg} Veilige verbinding</span>
                    </div>
                    ${gameBonusHint}
                    <div class="panel-section-title">Contactgegevens</div>
                    <div class="field-grid">
                        <div class="field">
                            <label for="wiz-checkout-company">Bedrijfsnaam</label>
                            <input type="text" id="wiz-checkout-company" name="company" autocomplete="organization" placeholder="bv. Jansen Bouw &amp; Onderhoud">
                        </div>
                        <div class="field">
                            <label for="wiz-checkout-name">Naam</label>
                            <input type="text" id="wiz-checkout-name" name="contact_name" autocomplete="name" placeholder="Voor- en achternaam">
                        </div>
                        <div class="field">
                            <label for="wiz-checkout-email">E-mail</label>
                            <input type="email" id="wiz-checkout-email" name="email" autocomplete="email" placeholder="jij@bedrijf.nl">
                        </div>
                        <div class="field">
                            <label for="wiz-checkout-phone">Telefoon</label>
                            <input type="tel" id="wiz-checkout-phone" name="phone" autocomplete="tel" placeholder="06 ...">
                        </div>
                    </div>
                    <div class="panel-section-title">Briefing voor onze vormgevers</div>
                    <div class="field">
                        <label for="wiz-checkout-briefing">Vertel ons over je merk, kleuren en wensen</label>
                        <textarea id="wiz-checkout-briefing" name="briefing" placeholder="bv. Stoer maar strak, blauw/grijs, gespecialiseerd in dakkapellen..."></textarea>
                    </div>
                    <div class="panel-section-title">Aanlevering</div>
                    <div class="pill-row" id="wiz-checkout-delivery" role="group" aria-label="Aanlevering">${deliveryPills}</div>
                    <div class="dropzone" id="wiz-checkout-dropzone" role="button" aria-label="Bestanden uploaden" tabindex="0">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        <p>Sleep bestanden hierheen of <span class="wiz-primary-text">klik om te uploaden</span></p>
                        <p class="wiz-subtext">Logo, foto's of briefing (PDF, JPG, PNG)</p>
                    </div>
                    <div class="panel-section-title">Akkoord</div>
                    <div class="check-line">
                        <input type="checkbox" id="wiz-checkout-agree-design" name="agree_design">
                        <label for="wiz-checkout-agree-design">Ik begrijp dat productie pas start na mijn goedkeuring van het ontwerp.</label>
                    </div>
                    <div class="check-line">
                        <input type="checkbox" id="wiz-checkout-agree-terms" name="agree_terms">
                        <label for="wiz-checkout-agree-terms">Ik ga akkoord met de algemene voorwaarden en het privacybeleid.</label>
                    </div>
                    <div class="min-meter wiz-checkout-min-meter" id="wiz-checkout-min-meter">
                        <div class="mm-label">
                            <span>Minimum bestelling</span>
                            <span id="wiz-checkout-min-target">€ 199</span>
                        </div>
                        <div class="mm-bar"><div class="mm-fill" id="wiz-checkout-min-fill"></div></div>
                        <div class="mm-note" id="wiz-checkout-min-note">Nog € 199,00 tot minimum bestelling</div>
                    </div>
                </div>`;
        },

        _checkoutDeliveryOptions: [
            { id: 'self', label: 'Ik lever zelf bestanden aan' },
            { id: 'design', label: 'Onze vormgevers doen alles' },
            { id: 'mix', label: 'Combinatie' }
        ],

        _renderCheckoutDeliveryPills: function () {
            const selected = this._checkoutDelivery || 'design';
            return this._checkoutDeliveryOptions.map((opt) => {
                const isOn = opt.id === selected;
                return `<button type="button" class="pill" data-delivery-id="${opt.id}" data-selected="${isOn ? 'true' : 'false'}" aria-pressed="${isOn ? 'true' : 'false'}">${this._escapeHtml(opt.label)}</button>`;
            }).join('');
        },

        _bindCheckoutStepUI: function () {
            const root = this.$contentArea && this.$contentArea.querySelector('.wiz-checkout-step');
            if (!root) {
                return;
            }
            const deliveryRow = root.querySelector('#wiz-checkout-delivery');
            if (deliveryRow && !deliveryRow.dataset.bound) {
                deliveryRow.dataset.bound = '1';
                deliveryRow.addEventListener('click', (ev) => {
                    const pill = ev.target.closest('[data-delivery-id]');
                    if (!pill) {
                        return;
                    }
                    this._checkoutDelivery = pill.getAttribute('data-delivery-id');
                    deliveryRow.querySelectorAll('[data-delivery-id]').forEach((el) => {
                        const on = el.getAttribute('data-delivery-id') === this._checkoutDelivery;
                        el.setAttribute('data-selected', on ? 'true' : 'false');
                        el.setAttribute('aria-pressed', on ? 'true' : 'false');
                    });
                });
            }
            this._updateCheckoutMinMeter();
        },

        _formatCheckoutEuro: function (amount) {
            const n = Math.max(0, Number(amount) || 0);
            return '€ ' + n.toFixed(2).replace('.', ',');
        },

        _updateCheckoutMinMeter: function () {
            const meter = document.getElementById('wiz-checkout-min-meter');
            const fill = document.getElementById('wiz-checkout-min-fill');
            const note = document.getElementById('wiz-checkout-min-note');
            if (!meter || !fill || !note) {
                return;
            }
            const MIN = 199;
            const sub = this.cartValue;
            const pct = Math.min(100, (sub / MIN) * 100);
            fill.style.width = pct + '%';
            if (sub >= MIN) {
                meter.classList.add('reached');
                note.textContent = 'Minimum bereikt — klaar om af te ronden ✓';
            } else {
                meter.classList.remove('reached');
                note.textContent = 'Nog ' + this._formatCheckoutEuro(MIN - sub) + ' tot minimum bestelling';
            }
        },

        _areCheckoutAgreementsChecked: function () {
            const design = document.getElementById('wiz-checkout-agree-design');
            const terms = document.getElementById('wiz-checkout-agree-terms');
            return !!(design && design.checked && terms && terms.checked);
        },

        /**
         * Informative game bonus row on summary (not part of cartValue / selections).
         */
        _renderGameBonusSummaryHint: function () {
            const bridge = typeof this._getGameBridgeContext === 'function' ? this._getGameBridgeContext() : null;
            if (!bridge) {
                return '';
            }
            const badge = bridge.couponOnly ? 'KORTING' : 'BONUS';
            const label = bridge.bonusLabel || (bridge.couponOnly ? 'GAME10' : 'Game-bonus');
            const detail = bridge.couponOnly
                ? `${label} wordt toegepast bij afrekenen (min. €199).`
                : `${label} wordt toegevoegd aan je winkelwagen bij afrekenen (€0).`;
            return `<div class="wiz-summary-game-bonus" role="status">
                <span class="wiz-summary-game-bonus__badge">${badge}</span>
                <p class="wiz-summary-game-bonus__text">${this._escapeHtml(detail)}</p>
            </div>`;
        },

        /**
         * Vehicle SKUs that need a design fee (wraps / belettering), not magnets (MA-*).
         */
        _skuRequiresVehicleDesignFee: function (sku) {
            if (!sku || typeof sku !== 'string') {
                return false;
            }
            if (sku.startsWith('MA-') || sku.includes('MAGNET')) {
                return false;
            }
            if (sku.includes('DESIGN') || sku === 'DF-004') {
                return false;
            }
            if (sku.startsWith('NA-WRAP') || sku.startsWith('NA-')) {
                return true;
            }
            if (/^(BLS|BXLS|PS|CS)-/.test(sku)) {
                return true;
            }
            return false;
        },

        _hasVehicleDesignCoverage: function () {
            const buckets = ['foundation', 'vehicleItems'];
            for (let i = 0; i < buckets.length; i++) {
                const cart = this.selections[buckets[i]] || {};
                const skus = Object.keys(cart);
                if (skus.some((sku) => sku.includes('DESIGN') || sku === 'DF-004')) {
                    return true;
                }
            }
            return false;
        },

        /**
         * Phase 2 - Strategic Selling Compliance
         * Checks if branding items (stickers/wraps) are present without a design fee.
         */
        _checkAOVCompliance: function () {
            const vehicle = this.selections.vehicleItems || {};
            const needsDesignFee = Object.keys(vehicle).some((sku) => this._skuRequiresVehicleDesignFee(sku));
            if (!needsDesignFee) {
                return true;
            }
            if (this._hasVehicleDesignCoverage()) {
                return true;
            }
            if (this._designFeePrompted) {
                return true;
            }
            return false;
        },

        processCheckout: function () {
            if (typeof this.isQuoteModePreset === 'function' && this.isQuoteModePreset()) {
                this.fgTrack('wizard_blocked_checkout', { cart_value: this.cartValue, reason: 'quote_mode_preset' });
                return;
            }
            if (this.cartValue < 199) {
                this.fgTrack('wizard_blocked_checkout', { cart_value: this.cartValue });
                return;
            }
            if (!this._areCheckoutAgreementsChecked()) {
                this.fgTrack('wizard_blocked_checkout', { cart_value: this.cartValue, reason: 'agreements_unchecked' });
                this.showCheckoutError('Vink beide akkoordvelden aan om door te gaan naar afrekenen.');
                this.scrollToWizard();
                return;
            }

            // Phase 2: Strategic AOV Guard
            if (!this._checkAOVCompliance()) {
                this._designFeePrompted = true;
                this.showCheckoutError('<strong>Wacht even!</strong> Je hebt belettering gekozen maar nog geen <strong>Design Fee</strong>. Zonder dit moet je zelf drukklaar PDF aanleveren. <button onclick="ZZPWizard.renderStep()" class="wiz-btn-inline-fix">Fix dit nu</button>');
                this.scrollToWizard();
                return;
            }

            this.fgTrack('begin_checkout', { value: this.cartValue, currency: 'EUR' });
            if (typeof fbq !== 'undefined') fbq('track', 'InitiateCheckout', { value: this.cartValue, currency: 'EUR' });

            const btn = this.$nextBtn;
            btn.innerHTML = '<span class="wizard-spinner"></span> Verwerken...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            const endpoint = (typeof zzpWizardData !== 'undefined') ? zzpWizardData.ajax_url : '/wp-admin/admin-ajax.php';

            // AUD-P0-01: LiteSpeed can serve /wizard/ HTML with an expired nonce —
            // fetch a fresh one right before the checkout POST (fallback: localized nonce).
            const fetchFreshNonce = () => {
                const nonceBody = new URLSearchParams();
                nonceBody.append('action', 'fg_wizard_fresh_nonce');
                return fetch(endpoint, {
                    method: 'POST',
                    body: nonceBody,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    cache: 'no-store'
                })
                    .then(res => (res.ok ? res.json() : null))
                    .then(data => (data && data.success && data.data && data.data.nonce) ? data.data.nonce : null)
                    .catch(() => null);
            };

            const resetBtn = () => {
                btn.innerHTML = '<svg class="wiz-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> Afrekenen';
                btn.disabled = false;
                btn.classList.remove('is-disabled');
            };

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000);

            fetchFreshNonce().then((freshNonce) => {
                const payload = new URLSearchParams();
                payload.append('action', 'fg_wizard_add_to_cart');

                // Flatten vehicleItems: { sku: qty }
                const flatVehicleItems = {};
                const rawVehicle = this.selections.vehicleItems || {};
                Object.entries(rawVehicle).forEach(([sku, qty]) => {
                    if (qty > 0) flatVehicleItems[sku] = Number(qty);
                });

                // AUD-P0-01: slim payload — itemDetails only for SKUs actually in the cart
                // (was: full 166-SKU catalog with client prices, ~10 KB, WAF bait).
                const selectedSkus = {};
                ['foundation', 'clothing', 'print', 'visibility', 'tools', 'premium'].forEach((bucket) => {
                    Object.entries(this.selections[bucket] || {}).forEach(([sku, qty]) => {
                        if (qty > 0) selectedSkus[sku] = true;
                    });
                });
                Object.keys(flatVehicleItems).forEach((sku) => { selectedSkus[sku] = true; });

                const itemDetails = {};
                try {
                    [
                        ...(this.foundationCatalog || []),
                        ...(this.stickersCatalog ? Object.values(this.stickersCatalog).flat() : []),
                        ...(this.wrapsCatalog ? Object.values(this.wrapsCatalog).flat() : []),
                        ...(this.clothingCatalog || []),
                        ...(this.printCatalog || []),
                        ...(this.visibilityCatalog || []),
                        ...(this.toolsCatalog || []),
                        ...(this.premiumCatalog || [])
                    ].forEach(item => {
                        if (item && item.id && selectedSkus[item.id]) {
                            itemDetails[item.id] = { name: item.name, price: item.price };
                        }
                    });
                } catch (e) {
                    console.warn('Item details mapping skip:', e);
                }

                const selectionsPayload = Object.assign({}, this.selections, {
                    vehicleItems: flatVehicleItems,
                    itemDetails: itemDetails,
                    activePresetId: this.activePresetId || null,
                    introVehicleType: this.introVehicleType || null
                });
                payload.append('selections', JSON.stringify(selectionsPayload));

                const nonce = freshNonce || ((typeof zzpWizardData !== 'undefined') ? zzpWizardData.nonce : '');
                if (nonce) {
                    payload.append('_ajax_nonce', nonce);
                }

                fetch(endpoint, {
                    method: 'POST',
                    body: payload,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    signal: controller.signal
                })
                    .then(res => {
                        if (!res.ok) {
                            const httpErr = new Error('HTTP ' + res.status);
                            httpErr.httpStatus = res.status;
                            throw httpErr;
                        }
                        return res.json();
                    })
                    .then(data => {
                        clearTimeout(timeoutId);
                        if (data.success && data.data && data.data.redirect) {
                            btn.innerHTML = '<svg class="wiz-btn-icon wiz-success-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Doorsturen...';
                            window.location.href = data.data.redirect;
                        } else {
                            resetBtn();
                            this.fgTrack('checkout_error', { reason: 'server_rejected', detail: String(data && data.data || '').slice(0, 120) });
                            this.showCheckoutError(this._escapeHtml(String((data && data.data) || 'Onbekende fout. Probeer opnieuw.')), { support: true });
                        }
                    })
                    .catch(err => {
                        clearTimeout(timeoutId);
                        console.error('Checkout error:', err);
                        resetBtn();
                        if (err.name === 'AbortError') {
                            this.fgTrack('checkout_error', { reason: 'timeout' });
                            this.showCheckoutError('De server reageert niet. Probeer het opnieuw.', { support: true });
                        } else {
                            this.fgTrack('checkout_error', { reason: 'http_' + (err.httpStatus || 'network') });
                            this.showCheckoutError('Er ging iets mis bij het afrekenen. Probeer het opnieuw.', { support: true });
                        }
                    });
            });
        },


        showCheckoutError: function (message, opts) {
            opts = opts || {};
            // Remove existing error
            const existing = document.getElementById('wizard-checkout-error');
            if (existing) existing.remove();

            const errorDiv = document.createElement('div');
            errorDiv.id = 'wizard-checkout-error';
            errorDiv.className = 'wiz-checkout-error';
            const warnSvg = '<svg class="wiz-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
            // AUD-P0-01: transport/server failures get a persistent support path
            // instead of a bare "probeer opnieuw" dead-end.
            const supportHtml = opts.support
                ? ' <span class="wiz-checkout-error-support">Lukt het niet? <a href="https://wa.me/31687286151?text=Hoi%20FlexGrafik%2C%20afrekenen%20in%20de%20wizard%20lukt%20niet." target="_blank" rel="noopener noreferrer">WhatsApp ons — wij helpen direct</a>.</span>'
                : '';
            errorDiv.innerHTML = `<span class="wiz-checkout-error-inner">${warnSvg}<span>${message}${supportHtml}</span></span>`;

            const anchor = this.$contentArea && this.$contentArea.querySelector('.wiz-checkout-step');
            if (anchor) {
                anchor.appendChild(errorDiv);
            }

            if (!opts.support) {
                setTimeout(() => { if (errorDiv.parentNode) errorDiv.remove(); }, 8000);
            }
        }
    });

    // Call onLazyLoaded if the wizard was already waiting for this script to render step 4
    if (typeof ZZPWizard.onLazyLoaded === 'function') {
        ZZPWizard.onLazyLoaded();
    }
}
