/**
 * FlexGrafik Dynamic Brief Form v5.1
 * Fired on /bedankt/?order_id=XXX&key=ORDER_KEY (WooCommerce order key)
 * Features: Live Preview / FlexGrafik +€29 / eigen bestand, SSoT SKU prefixes, dynamic sections
 * Sprint 2: inline SVG icons (Brand §4.2) — stroke 2 / line-cap round
 */
var BRIEF_SVG = {
    ruler: '<svg class="brief-inline-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
    gift: '<svg class="brief-inline-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>',
    palette: '<svg class="brief-inline-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
    check: '<svg class="brief-inline-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
    loader: '<svg class="brief-inline-svg brief-inline-svg--spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2v4"/><path d="M12 18v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="m16.24 16.24 2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="m16.24 7.76 2.83-2.83"/></svg>',
    success: '<svg class="wiz-brief-success-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    image: '<svg class="brief-section-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>',
    fileText: '<svg class="brief-section-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    truck: '<svg class="brief-section-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 17h4V5H4v12h2"/><path d="M20 17h2v-5l-3-3h-5v8"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>',
    layers: '<svg class="brief-section-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    flag: '<svg class="brief-section-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
    type: '<svg class="brief-section-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',
    tag: '<svg class="brief-section-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    creditCard: '<svg class="brief-section-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
    tool: '<svg class="brief-section-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    link: '<svg class="brief-section-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    users: '<svg class="brief-section-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    star: '<svg class="brief-section-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    messageSquare: '<svg class="brief-section-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
};

var briefFieldUid = 0;

function briefSectionHeading(n, iconKey, title) {
    return `<h3 class="brief-section-heading">${BRIEF_SVG[iconKey] || ''}<span>SECTIE ${n}: ${title}</span></h3>`;
}

function briefFieldId(name) {
    briefFieldUid += 1;
    return 'bf-' + String(name).replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + briefFieldUid;
}

function wireBriefFieldLabels(root) {
    if (!root) return;
    root.querySelectorAll('.field.brief-field, .brief-field').forEach(function(wrap) {
        var control = wrap.querySelector('input:not([type=radio]):not([type=checkbox]), textarea, select');
        if (!control || control.id) return;
        var label = null;
        wrap.querySelectorAll('label').forEach(function(l) {
            if (label) return;
            if (l.classList.contains('design-radio-option')) return;
            if (l.classList.contains('wiz-brief-check-label')) return;
            if (l.classList.contains('wiz-brief-radio-label')) return;
            if (l.getAttribute('for')) return;
            label = l;
        });
        if (!label) return;
        var name = control.getAttribute('name') || 'field';
        control.id = briefFieldId(name);
        label.setAttribute('for', control.id);
    });
}

function showBriefSubmitError(form, btn, message) {
    const prevErr = form.querySelector('.fg-submit-error');
    if (prevErr) prevErr.remove();
    const errBanner = document.createElement('div');
    errBanner.className = 'fg-submit-error wiz-brief-form-error';
    const warnSvg = '<svg class="wiz-brief-warn-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
    errBanner.innerHTML = warnSvg + message;
    form.insertBefore(errBanner, form.firstChild);
    btn.innerHTML = '<span>Gegevens verzenden &amp; Start order</span>';
    btn.style.opacity = '1';
    btn.disabled = false;
}

function validateClothingSizeMatrices(form) {
    const tables = form.querySelectorAll('.size-matrix-table[data-qty]');
    for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        const expected = parseInt(table.getAttribute('data-qty'), 10);
        const itemName = table.getAttribute('data-item-name') || 'werkkleding';
        let sum = 0;
        table.querySelectorAll('.size-matrix-input').forEach(function(input) {
            sum += parseInt(input.value, 10) || 0;
        });
        if (sum !== expected) {
            return 'De maten voor ' + itemName + ' moeten samen ' + expected + ' stuks zijn (nu: ' + sum + ').';
        }
    }
    return null;
}

function validateLogoAddonVariants(form) {
    const panel = form.querySelector('#logo-addon-variants');
    if (!panel) return null;
    if (panel.querySelectorAll('input[name="logo_addon_variants[]"]:checked').length === 0) {
        return 'Selecteer minimaal één logo-variant.';
    }
    return null;
}

function setDesignPanelRequired(panel, active) {
    if (!panel) return;
    panel.querySelectorAll('[required]').forEach(function(el) {
        if (active) {
            if (el.dataset.vizWasRequired === '1') {
                el.setAttribute('required', '');
            }
        } else {
            if (el.hasAttribute('required')) {
                el.dataset.vizWasRequired = '1';
                el.removeAttribute('required');
            }
        }
    });
}

function syncVisCardGlobalFields(form) {
    form.querySelectorAll('[id^="viscard-fields-"]').forEach(function(vcf) {
        var sku = vcf.id.replace('viscard-fields-', '');
        var checked = form.querySelector('[name="design_method_' + sku + '"]:checked');
        var show = checked && checked.value === 'flexgrafik';
        vcf.style.display = show ? 'block' : 'none';
        setDesignPanelRequired(vcf, show);
    });
}

function validateVisualizerSelections(form) {
    var pending = [];
    form.querySelectorAll('[name^="design_method_"]').forEach(function(radio) {
        if (!radio.checked || radio.value !== 'visualizer') return;
        var sku = radio.name.replace('design_method_', '');
        var meta = form.querySelector('input[name="design_viz_' + sku + '"]');
        if (!meta || !meta.value || !vizBlobMap.has(sku)) {
            pending.push(sku);
        }
    });
    if (pending.length === 0) return null;
    return 'Keur eerst je Live Preview ontwerp goed voor: ' + pending.join(', ') + '.';
}

function clearVisualizerState(sku) {
    vizBlobMap.delete(sku);
    var hiddenInput = document.querySelector('input[name="design_viz_' + sku + '"]');
    if (hiddenInput) hiddenInput.value = '';
    var approved = document.getElementById('viz-approved-' + sku);
    if (approved) approved.style.display = 'none';
    var editor = document.getElementById('viz-editor-' + sku);
    if (editor) editor.style.display = 'flex';
}

function getVisualizerBgColor(panel, svg) {
    var bgEl = svg.querySelector('[data-field="bg_color"]');
    if (bgEl) {
        var fill = bgEl.getAttribute('fill');
        if (fill && /^#[0-9a-fA-F]{6}$/.test(fill)) return fill;
    }
    var hexInput = panel.querySelector('.viz-hex-input');
    if (hexInput && /^#[0-9a-fA-F]{6}$/.test(hexInput.value)) return hexInput.value;
    var activeSwatch = panel.querySelector('.color-swatch.active');
    return activeSwatch ? activeSwatch.dataset.color : '';
}

function showVisualizerApproveError(panel, message) {
    var existing = panel.querySelector('.viz-approve-error');
    if (existing) existing.remove();
    var err = document.createElement('p');
    err.className = 'viz-approve-error wiz-brief-form-error';
    err.setAttribute('role', 'alert');
    err.textContent = message;
    var btn = panel.querySelector('.svg-approve-btn');
    if (btn && btn.parentNode) btn.parentNode.insertBefore(err, btn.nextSibling);
}

document.addEventListener('DOMContentLoaded', function() {
    if (!window.briefFormOrderId || briefFormOrderId === "0") {
        document.getElementById('brief-loader').innerHTML =
            '<div style="color:#ff4b4b;">Kan de bestelling niet identificeren. Geen order ID gevonden.</div>';
        return;
    }

    fetch(briefFormAjaxUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            'action':      'fg_get_order_details',
            'order_id':    briefFormOrderId,
            'order_key':   typeof briefFormOrderKey !== 'undefined' ? briefFormOrderKey : '',
            '_ajax_nonce': briefFormDetailsNonce
        })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) buildDynamicForm(data.data);
        else document.getElementById('brief-loader').innerHTML =
            '<div style="color:#ff4b4b;">Fout: ' + data.data + '</div>';
    })
    .catch(() => {
        document.getElementById('brief-loader').innerHTML =
            '<div style="color:#ff4b4b;">Verbindingsfout bij ophalen van ordergegevens.</div>';
    });
});

// ─── SKU GROUP HELPERS ────────────────────────────────────────────────

const SKU = {
    isLogoProduct:   s => s === 'F-001',
    isLogoAddon:     s => s === 'F-001-ADD',
    isSocialDesign:  s => s === 'F-001-SOC',
    isOfferteDoc:    s => ['DF-006', 'DF-007', 'DF-SET-B2B'].includes(s),
    isVehicleDesign: s => s === 'DF-004' || s === 'DF-005',
    isDigitalDoc:    s => SKU.isOfferteDoc(s) || SKU.isVehicleDesign(s),
    isWrap:          s => s.startsWith('NA-WRAP-'),
    isVehicleSticker:s =>
        s.startsWith('BLS-') || s.startsWith('BXLS-') || s.startsWith('PS-') ||
        s.startsWith('CS-') ||
        (s.startsWith('NA-') && !s.startsWith('NA-WRAP-')),
    isMagnet:        s => s.startsWith('MA-'),
    isCustomSize:    s => s === 'NA-CUSTOM' || s === 'MA-CUSTOM',
    isTextSticker:   s => ['NS-004','NS-005'].includes(s) || s.startsWith('TB-'),
    isBanner:        s => s.startsWith('BA-') || s.startsWith('VL-') || s.startsWith('SB-'),
    isVisCard:       s => s.startsWith('NW-') || s.startsWith('VK-'),
    isToolSimple:    s => ['NS-006','NSP-001','NSP-002','NSP-003','NSP-004'].includes(s),
    isQR:            s => s === 'NSP-005',
    isBedankt:       s => s === 'NSP-006',
    isStandardSticker:s => s.startsWith('NS-') && !['NS-004','NS-005','NS-006'].includes(s),
    isClothing:      s => s.startsWith('OC-') || s.startsWith('OA-'),
    isHTV:           s => s.startsWith('HT-'),
    isPremiumAcc:    s => s.startsWith('AP-'),

    needsDesignChoice: s =>
        SKU.isVehicleSticker(s) || SKU.isMagnet(s) || SKU.isBanner(s) ||
        SKU.isVisCard(s) || SKU.isStandardSticker(s)
};

// ─── VISUALIZER STATE ────────────────────────────────────────────────
var vizBlobMap = new Map();

// ─── DESIGN METHOD BLOCK (reusable per SKU) ───────────────────────────

function designMethodBlock(productName, sku, vizData) {
    var vizRadio = '';
    var vizPanel = '';
    if (vizData && vizData.svg_template) {
        vizRadio = `
            <label class="design-radio-option design-radio-option--viz">
                <input type="radio" name="design_method_${sku}" value="visualizer">
                <span>
                    <strong>Ontwerp maken (Live Preview)</strong><br>
                    <small class="wiz-brief-text-muted">Plaats je logo, voeg tekst toe en keur het ontwerp direct goed</small>
                </span>
            </label>`;
        vizPanel = `
        <div class="design-panel" data-panel="visualizer" style="display:none;"
             data-svg-template="${vizData.svg_template}"
             data-canvas-w="${vizData.canvas_width_cm || 0}"
             data-canvas-h="${vizData.canvas_height_cm || 0}"
             data-viz-sku="${sku}">
            <div class="viz-editor" id="viz-editor-${sku}">
                <div class="viz-preview-wrap">
                    <div class="svg-preview-container" id="svg-container-${sku}"></div>
                </div>
                <div class="viz-controls">
                    <div class="svg-control-row">
                        <label>Tekst regel 1</label>
                        <input type="text" class="brief-input viz-input" data-viz-field="line1" maxlength="25" placeholder="Bedrijfsnaam">
                    </div>
                    <div class="svg-control-row">
                        <label>Tekst regel 2</label>
                        <input type="text" class="brief-input viz-input" data-viz-field="line2" maxlength="25" placeholder="Slogan of telefoonnummer">
                    </div>
                    ${vizData.svg_template === 'visitekaartje' ? `
                    <div class="svg-control-row">
                        <label>Telefoon</label>
                        <input type="text" class="brief-input viz-input" data-viz-field="phone" maxlength="25" placeholder="06 - 12 34 56 78">
                    </div>
                    <div class="svg-control-row">
                        <label>E-mail</label>
                        <input type="text" class="brief-input viz-input" data-viz-field="email" maxlength="30" placeholder="info@jouwbedrijf.nl">
                    </div>
                    <div class="svg-control-row">
                        <label>Website</label>
                        <input type="text" class="brief-input viz-input" data-viz-field="website" maxlength="30" placeholder="www.jouwbedrijf.nl">
                    </div>` : ''}
                    <div class="svg-control-row">
                        <label>Achtergrondkleur</label>
                        <div class="svg-color-swatches" data-viz-field="bg_color">
                            <span class="color-swatch active" data-color="${vizData.svg_template === 'visitekaartje' ? '#ffffff' : '#1a1a2e'}" style="background:${vizData.svg_template === 'visitekaartje' ? '#ffffff' : '#1a1a2e'}"></span>
                            <span class="color-swatch" data-color="#000000" style="background:#000000"></span>
                            <span class="color-swatch" data-color="#009fe3" style="background:#009fe3"></span>
                            <span class="color-swatch" data-color="#e8175d" style="background:#e8175d"></span>
                            <span class="color-swatch" data-color="#0057b8" style="background:#0057b8"></span>
                            <span class="color-swatch" data-color="#eab308" style="background:#eab308"></span>
                            <input type="text" class="brief-input viz-hex-input" maxlength="7" placeholder="#hex" style="width:80px">
                        </div>
                    </div>
                    <div class="viz-logo-hint" id="viz-logo-hint-${sku}">
                        <small>Logo wordt automatisch overgenomen uit Sectie 1</small>
                    </div>
                    ${sku.indexOf('VL-') === 0 ? `
                    <div class="viz-vlag-hint">
                        <small>Vul hieronder ook orientatie en afwerking van je vlag in — nodig voor productie.</small>
                    </div>` : ''}
                    <button type="button" class="svg-approve-btn" id="viz-approve-${sku}">Goedkeuren</button>
                </div>
            </div>
            <div class="svg-approved-preview" id="viz-approved-${sku}" style="display:none;">
                <img class="viz-thumb" alt="Goedgekeurd ontwerp">
                <span class="viz-check-badge">${BRIEF_SVG.check} Goedgekeurd</span>
                <button type="button" class="viz-edit-btn">Wijzigen</button>
            </div>
            <input type="hidden" name="design_viz_${sku}" value="">
        </div>`;
    }
    return `
    <div class="brief-design-choice" data-sku="${sku}">
        <p class="brief-line-head">
            ${BRIEF_SVG.ruler}<span>Hoe wil je het ontwerp aanleveren voor <em>${productName}</em>?</span>
        </p>
        <div class="design-radio-group">${vizRadio}
            <label class="design-radio-option">
                <input type="radio" name="design_method_${sku}" value="file" required>
                <span>
                    <strong>Mijn eigen bestand (Gratis)</strong><br>
                    <small class="wiz-brief-text-muted">Upload een drukklaar PDF / EPS / AI bestand</small>
                </span>
            </label>
            <label class="design-radio-option">
                <input type="radio" name="design_method_${sku}" value="flexgrafik">
                <span>
                    <strong>FlexGrafik ontwerpt het (+€29)</strong><br>
                    <small class="wiz-brief-text-muted">Wij verwerken jouw wensen tot een professioneel ontwerp</small>
                </span>
            </label>
        </div>
        <!-- Conditional panels (shown/hidden by JS) -->
        <div class="design-panel" data-panel="file" style="display:none;">
            <div class="field brief-field">
                <label for="design_file_${sku}">Upload jouw bestand <span class="req">*</span></label>
                <input type="file" id="design_file_${sku}" name="design_file_${sku}[]" class="brief-input" accept=".pdf,.eps,.ai,.svg" multiple>
                <span class="brief-help">PDF/EPS/AI — minimaal 300dpi, incl. 3mm spaden. Max 25MB.</span>
            </div>
            <div class="field brief-field">
                <label class="wiz-flex-center-gap8">
                    <input type="checkbox" name="confirm_bleed_${sku}" required>
                    <span>Ik bevestig dat mijn bestand de juiste afmetingen en spaden heeft</span>
                </label>
            </div>
        </div>
        <div class="design-panel" data-panel="flexgrafik" style="display:none;">
            <div class="wiz-brief-info-box wiz-brief-info--flex">
                <p class="wiz-brief-info-inner">
                    ${BRIEF_SVG.palette}<span>Je ontvangt nadien een aparte betaallink voor €29. Zodra voldaan starten we het maatwerk ontwerp voor <strong>${productName}</strong>.</span>
                </p>
            </div>
            <div class="field brief-field">
                <label for="design_brief_${sku}">Jouw wensen voor de ontwerper <span class="req">*</span></label>
                <textarea id="design_brief_${sku}" name="design_brief_${sku}" class="brief-input" rows="3"
                    placeholder="Beschrijf je sector, gewenste kleuren, tekst op de sticker/magneet, stijlreferenties..."></textarea>
            </div>
        </div>${vizPanel}
    </div>`;
}

// ─── SVG VISUALIZER ENGINE ────────────────────────────────────────────

function initVisualizerPanel(panel) {
    var sku = panel.dataset.vizSku;
    var tplName = panel.dataset.svgTemplate;
    var container = document.getElementById('svg-container-' + sku);
    if (!container || container.querySelector('svg') || !tplName) return;

    if (typeof SVG_TEMPLATES === 'undefined' || !SVG_TEMPLATES[tplName]) return;
    var parser = new DOMParser();
    var doc = parser.parseFromString(SVG_TEMPLATES[tplName], 'image/svg+xml');
    var svg = doc.documentElement;
    svg.setAttribute('width', '100%');
    svg.removeAttribute('height');
    container.appendChild(svg);

    tryInsertLogo(svg);
    var logoInput = document.getElementById('logo_file');
    if (logoInput) {
        logoInput.addEventListener('change', function() { tryInsertLogo(svg); });
    }

    panel.querySelectorAll('.viz-input').forEach(function(input) {
        var field = input.dataset.vizField;
        var el = svg.querySelector('[data-field="' + field + '"]');
        if (el) {
            var tspan = el.querySelector('tspan');
            if (tspan && !tspan.dataset.placeholder) {
                tspan.dataset.placeholder = tspan.textContent;
            }
        }
        input.addEventListener('input', function() {
            var f = this.dataset.vizField;
            var textEl = svg.querySelector('[data-field="' + f + '"]');
            if (!textEl) return;
            var ts = textEl.querySelector('tspan');
            if (!ts) return;
            var val = this.value.substring(0, parseInt(this.maxLength) || 25);
            if (val.length >= (parseInt(this.maxLength) || 25)) val = val.slice(0, -1) + '\u2026';
            ts.textContent = val || ts.dataset.placeholder || '';
        });
    });

    panel.querySelectorAll('.color-swatch').forEach(function(swatch) {
        swatch.addEventListener('click', function() {
            panel.querySelectorAll('.color-swatch').forEach(function(s) { s.classList.remove('active'); });
            this.classList.add('active');
            var color = this.dataset.color;
            var bgEl = svg.querySelector('[data-field="bg_color"]');
            if (bgEl) bgEl.setAttribute('fill', color);
            var hexInput = panel.querySelector('.viz-hex-input');
            if (hexInput) hexInput.value = color;
        });
    });

    var hexInput = panel.querySelector('.viz-hex-input');
    if (hexInput) {
        hexInput.addEventListener('input', function() {
            var hex = this.value;
            if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
                panel.querySelectorAll('.color-swatch').forEach(function(s) { s.classList.remove('active'); });
                var bgEl = svg.querySelector('[data-field="bg_color"]');
                if (bgEl) bgEl.setAttribute('fill', hex);
            }
        });
    }

    var approveBtn = document.getElementById('viz-approve-' + sku);
    if (approveBtn) {
        approveBtn.addEventListener('click', function() { approveVisualizerDesign(sku, panel, svg); });
    }
}

function tryInsertLogo(svg) {
    var logoInput = document.getElementById('logo_file');
    var imgEl = svg.querySelector('[data-field="logo"]');
    if (!imgEl) return;
    if (!logoInput || !logoInput.files || !logoInput.files[0]) return;
    var file = logoInput.files[0];
    if (file.size > 5 * 1024 * 1024) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        var img = new Image();
        img.onload = function() {
            var maxDim = 800;
            var w = img.width, h = img.height;
            if (w > maxDim || h > maxDim) {
                var ratio = Math.min(maxDim / w, maxDim / h);
                w = Math.round(w * ratio);
                h = Math.round(h * ratio);
            }
            var canvas = document.createElement('canvas');
            canvas.width = w; canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            imgEl.setAttribute('href', canvas.toDataURL('image/png'));
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function approveVisualizerDesign(sku, panel, svg) {
    var prevErr = panel.querySelector('.viz-approve-error');
    if (prevErr) prevErr.remove();

    var logoInput = document.getElementById('logo_file');
    var hasLogo = logoInput && logoInput.files && logoInput.files[0];
    if (!hasLogo && !window.confirm('Geen logo geüpload in Sectie 1. Wil je dit ontwerp toch goedkeuren?')) {
        return;
    }

    var clone = svg.cloneNode(true);
    var vb = (svg.getAttribute('viewBox') || '0 0 1000 500').split(/\s+/);
    var vbW = parseFloat(vb[2]) || 1000;
    var vbH = parseFloat(vb[3]) || 500;
    clone.setAttribute('width', vbW);
    clone.setAttribute('height', vbH);
    clone.removeAttribute('style');
    var svgData = new XMLSerializer().serializeToString(clone);
    var blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var img = new Image();
    img.onerror = function() {
        URL.revokeObjectURL(url);
        showVisualizerApproveError(panel, 'Voorbeeld kon niet worden geëxporteerd. Probeer opnieuw of kies een andere optie.');
    };
    img.onload = function() {
        var canvas = document.createElement('canvas');
        var scale = 2;
        canvas.width = vbW * scale;
        canvas.height = vbH * scale;
        var ctx = canvas.getContext('2d');
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, vbW, vbH);
        URL.revokeObjectURL(url);
        canvas.toBlob(function(pngBlob) {
            if (!pngBlob) {
                showVisualizerApproveError(panel, 'PNG-export mislukt. Probeer een andere browser of ververs de pagina.');
                return;
            }
            vizBlobMap.set(sku, pngBlob);
            var thumbUrl = URL.createObjectURL(pngBlob);
            var editor = document.getElementById('viz-editor-' + sku);
            var approved = document.getElementById('viz-approved-' + sku);
            if (editor) editor.style.display = 'none';
            if (approved) {
                approved.style.display = 'flex';
                var thumb = approved.querySelector('.viz-thumb');
                if (thumb) thumb.src = thumbUrl;
            }
            var meta = {};
            panel.querySelectorAll('.viz-input').forEach(function(inp) {
                meta[inp.dataset.vizField] = inp.value;
            });
            meta.bg_color = getVisualizerBgColor(panel, svg);
            meta.template = panel.dataset.svgTemplate;
            meta.canvas_w = panel.dataset.canvasW;
            meta.canvas_h = panel.dataset.canvasH;
            var hiddenInput = panel.querySelector('input[name="design_viz_' + sku + '"]');
            if (hiddenInput) hiddenInput.value = JSON.stringify(meta);
        }, 'image/png');
    };
    img.src = url;
}

function initVisualizerWijzigen() {
    document.querySelectorAll('.viz-edit-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var approved = this.closest('.svg-approved-preview');
            var panel = approved.closest('.design-panel');
            var sku = panel.dataset.vizSku;
            clearVisualizerState(sku);
        });
    });
}

// ─── HTV BRIEF FIELDS (per SKU) ───────────────────────────────────────

function renderHtvItemFields(item, hasClothingSection) {
    const sku = item.sku;
    const qty = item.quantity;
    const name = item.name;

    if (sku === 'HT-102') {
        return `
        <div class="field brief-field" data-htv-sku="${sku}">
            <label>Branche of functie voor <strong>${name}</strong> (${qty}×) <span class="req">*</span></label>
            <select name="htv_branche_${sku}" class="brief-input" required>
                <option value="">Kies...</option>
                <option value="bouw">Bouw / timmerman</option>
                <option value="elektricien">Elektricien</option>
                <option value="loodgieter">Loodgieter / installatie</option>
                <option value="schilder">Schilder / afwerking</option>
                <option value="vca">VCA / veiligheid</option>
                <option value="overig">Overig (zie toelichting)</option>
            </select>
            <span class="brief-help">Geen bedrijfslogo — wij ontwerpen een branchegrafiek per stuk op basis van je keuze.</span>
            <input type="text" name="htv_branche_other_${sku}" class="brief-input" maxlength="80"
                placeholder="Toelichting bij Overig (optioneel)">
        </div>`;
    }

    if (sku === 'HT-103') {
        return `
        <div class="field brief-field" data-htv-sku="${sku}">
            <p><strong>${name}</strong> (${qty}×) — team-pakket: 20× klein, 10× middel, 5× groot (zelfde logo).</p>
            <label>Verdeling over kledingstukken (optioneel)</label>
            <textarea name="htv_team_notes_${sku}" class="brief-input" rows="3"
                placeholder="bijv. 3× polo M met klein borstlogo, 2× hoodie L met groot ruglogo..."></textarea>
            <span class="brief-help">Logo uit sectie 1 geldt voor alle maten. Geen verdeling? Wij koppelen aan je maten uit werkkleding hierboven.</span>
        </div>`;
    }

    const placementBlock = hasClothingSection ? `
        <p class="wiz-brief-text-muted">Logo-positie voor je kleding stel je in de werkkleding-sectie hierboven in. Bevestig hieronder het gewenste HTV-formaat.</p>
        <label class="wiz-brief-check-label">
            <input type="checkbox" name="htv_confirm_${sku}" value="1" required>
            <span>Bevestig: dit formaat (${name}) hoort bij mijn bestelling <span class="req">*</span></span>
        </label>` : `
        <label>Plaatsing voor <strong>${name}</strong> (${qty}×) <span class="req">*</span></label>
        <select name="htv_placement_${sku}" class="brief-input" required>
            <option value="">Kies...</option>
            <option value="borst_links">Borst links</option>
            <option value="borst_rechts">Borst rechts</option>
            <option value="rug">Rug groot</option>
            <option value="mouw">Mouw</option>
        </select>
        <span class="brief-help">Jouw logo uit sectie 1 persen wij in dit formaat per transfer.</span>`;

    return `
    <div class="field brief-field" data-htv-sku="${sku}">
        ${placementBlock}
    </div>`;
}

// ─── MAIN FORM BUILDER ────────────────────────────────────────────────

function renderBriefSuccessState(orderData, options) {
    const opts = options || {};
    const container = document.getElementById('brief-sections-container');
    const form      = document.getElementById('fg-brief-form');
    const loader    = document.getElementById('brief-loader');
    const flexCount  = opts.flexCount || 0;
    const vizCount   = opts.vizCount || 0;

    const flexHtml = flexCount > 0
        ? `<div class="wiz-brief-info-box wiz-brief-info--flex field-grid wiz-brief-field-row">
               ${BRIEF_SVG.palette}<span><strong>Maatwerk door FlexGrafik:</strong> Je koos maatwerk bij ${flexCount} item(s). Hiervoor volgt later een handmatige betaallink (+€${flexCount * 29}).</span>
           </div>`
        : '';
    const vizHtml = vizCount > 0
        ? `<div class="wiz-brief-info-box wiz-brief-info--viz field-grid wiz-brief-field-row">
               ${BRIEF_SVG.check}<span><strong>Live Preview goedgekeurd:</strong> Je ontwerp(en) voor ${vizCount} product(en) zijn ontvangen — wij bereiden het drukbestand voor.</span>
           </div>`
        : '';

    if (container) {
        container.innerHTML = `
            <div class="wiz-brief-success-wrap">
                ${BRIEF_SVG.success}
                <h2 class="wiz-brief-success-title">Perfect! Alles ontvangen.</h2>
                <p class="wiz-brief-success-p">
                    Bestelling <strong>#${orderData.order_id}</strong> is compleet!
                    Norbert gaat direct aan de slag — verwacht een update binnen 2 werkdagen.
                </p>
                ${flexHtml}
                ${vizHtml}
                <div class="wiz-mt-36">
                    <a href="/" class="btn btn-action wiz-inline-block wiz-no-decoration"><span>Terug naar home</span></a>
                </div>
            </div>`;
    }
    if (loader) loader.style.display = 'none';
    if (form) form.style.display = 'block';

    const summaryBox = document.querySelector('.wizard-summary-box');
    const wizFooter  = document.querySelector('.wizard-footer');
    if (summaryBox) summaryBox.style.display = 'none';
    if (wizFooter)  wizFooter.style.display  = 'none';
}

function applyDesignAgentBriefPrefill(form) {
    try {
        const raw = sessionStorage.getItem('designAgentBrief');
        if (!raw) return;
        const b = JSON.parse(raw);
        const sector = form.querySelector('#vehicle_design_sector');
        const vVehicle = form.querySelector('#vehicle_design_vehicle');
        const vBrief = form.querySelector('#vehicle_design_brief');
        if (sector && b.branche) sector.value = b.branche;
        if (vVehicle && b.vehicle) {
            const labels = { caddy: 'Caddy', bus_l: 'Bestelbus L', bus_xl: 'Bestelbus XL', passenger: 'Personenauto' };
            vVehicle.value = labels[b.vehicle] || b.vehicle;
        }
        if (vBrief) {
            const lines = [];
            if (b.bedrijfsnaam) lines.push(b.bedrijfsnaam);
            if (b.telefoon) lines.push(b.telefoon);
            if (b.website) lines.push(b.website);
            if (b.slogan) lines.push(b.slogan);
            if (b.stijl) lines.push('Stijl: ' + b.stijl);
            vBrief.value = lines.join(' · ');
        }
        const refs = form.querySelector('#vehicle_design_refs');
        const mockupUrl = b.mockups && b.mockups[0] && b.mockups[0].url;
        if (refs && mockupUrl && !refs.value) {
            refs.value = mockupUrl;
        }
    } catch (e) { /* ignore */ }
}

function buildDynamicForm(orderData) {
    const loader    = document.getElementById('brief-loader');
    const form      = document.getElementById('fg-brief-form');
    const container = document.getElementById('brief-sections-container');
    const subtitle  = document.getElementById('bedankt-order-info');

    if (subtitle) {
        subtitle.innerText = `Order #${orderData.order_id} | Totaal: €${orderData.amount} | Wij gaan aan de slag!`;
    }

    if (orderData.brief_submitted) {
        renderBriefSuccessState(orderData);
        return;
    }

    const items = orderData.items || [];
    const skus  = items.map(i => i.sku);
    let html = '';
    let n = 1; // section counter

    // ── SECTIE LOGO (Global — always first) ───────────────────────────
    const hasLogoProduct  = skus.some(s => SKU.isLogoProduct(s));
    const hasLogoAddon    = skus.some(s => SKU.isLogoAddon(s));
    const hasSocialDesign = skus.some(s => SKU.isSocialDesign(s));
    const hasOfferteDoc   = skus.some(s => SKU.isOfferteDoc(s));
    const hasVehicleDesign = skus.some(s => SKU.isVehicleDesign(s));
    const needsLogoUpload = skus.some(s =>
        !SKU.isLogoProduct(s) && !SKU.isLogoAddon(s) && !SKU.isSocialDesign(s) &&
        !SKU.isOfferteDoc(s) && !SKU.isVehicleDesign(s));
    const showLogoSection = hasLogoProduct || hasLogoAddon || needsLogoUpload;

    if (showLogoSection) {
    html += `<div class="brief-section">
        ${briefSectionHeading(n++, 'image', 'JOUW LOGO')}`;

    if (hasLogoProduct) {
        html += `<p>Super! Je hebt het <strong>Logo Master File</strong> besteld. Vertel ons alles over jouw bedrijf, wij ontwerpen het van scratch.</p>
        <div class="field brief-field">
            <label for="brand_name">Bedrijfsnaam <span class="req">*</span></label>
            <input type="text" id="brand_name" name="brand_name" class="brief-input" required>
        </div>
        <div class="field brief-field">
            <label for="brand_sector">Branche / sector <span class="req">*</span></label>
            <input type="text" id="brand_sector" name="brand_sector" class="brief-input" placeholder="bijv. Loodgieter, Schilder, Hovenier..." required>
        </div>
        <div class="field brief-field">
            <label for="brand_style">Stijlvoorkeur &amp; kleuren</label>
            <textarea id="brand_style" name="brand_style" class="brief-input" rows="2"
                placeholder="Welke kleuren, stijl en sfeer past bij jou? Referentielogo's mogen ook."></textarea>
        </div>`;
    }

    if (hasLogoAddon && !hasLogoProduct) {
        html += `<p>Upload je bestaande logo en kies de gewenste <strong>extra variaties</strong> (zwart/wit/kleur/transparant).</p>
        <div class="field brief-field">
            <label for="logo_file">Upload jouw logo <span class="req">*</span></label>
            <input type="file" id="logo_file" name="logo_file" class="brief-input" accept=".ai,.eps,.pdf,.png,.svg" required>
            <span class="brief-help">Vector (AI/EPS/PDF) heeft de voorkeur. PNG minimaal 300dpi, zonder achtergrond. Max 25MB.</span>
        </div>`;
    } else if (needsLogoUpload) {
        html += `<p>Upload hier jouw logo. Dit wordt gebruikt voor <strong>alle</strong> producten in jouw bestelling — je hoeft het maar één keer te uploaden.</p>
        <div class="field brief-field">
            <label for="logo_file">Upload jouw logo <span class="req">*</span></label>
            <input type="file" id="logo_file" name="logo_file" class="brief-input" accept=".ai,.eps,.pdf,.png,.svg" required>
            <span class="brief-help">Vector (AI/EPS/PDF) heeft de voorkeur. PNG minimaal 300dpi, zonder achtergrond. Max 25MB.</span>
        </div>`;
    }

    if (hasLogoAddon) {
        html += `<div class="field brief-field" id="logo-addon-variants">
            <label>Gewenste variaties <span class="req">*</span></label>
            <div class="wiz-brief-radio-row">
                ${[['zwart','Zwart'],['wit','Wit'],['kleur','Kleur'],['transparant','Transparant PNG']].map(([v,l]) =>
                    `<label class="wiz-brief-check-label">
                        <input type="checkbox" name="logo_addon_variants[]" value="${v}">
                        <span>${l}</span>
                    </label>`
                ).join('')}
            </div>
            <span class="brief-help">Selecteer minimaal één variant die je nodig hebt.</span>
        </div>`;
    }
    html += `</div>`;
    }

    // ── SECTIE ONLINE AANWEZIGHEID (F-001-SOC) ────────────────────────
    if (hasSocialDesign) {
        html += `<div class="brief-section">
        ${briefSectionHeading(n++, 'link', 'ONLINE AANWEZIGHEID')}
        <p>Je hebt het <strong>Online Aanwezigheid Ontwerp</strong> besteld. Wij maken professionele banners en posts voor Google, Werkspot en social media.</p>
        <div class="field brief-field">
            <label for="social_brand_name">Bedrijfsnaam <span class="req">*</span></label>
            <input type="text" id="social_brand_name" name="social_brand_name" class="brief-input" required>
        </div>
        <div class="field-grid wiz-brief-field-row">
            <div class="brief-field wiz-brief-field-half">
                <label for="social_google_url">Google Business URL</label>
                <input type="url" id="social_google_url" name="social_google_url" class="brief-input" placeholder="https://...">
            </div>
            <div class="brief-field wiz-brief-field-half">
                <label for="social_werkspot_url">Werkspot profiel URL</label>
                <input type="url" id="social_werkspot_url" name="social_werkspot_url" class="brief-input" placeholder="https://...">
            </div>
        </div>
        <div class="field brief-field">
            <label for="social_platforms">Platformen (komma-gescheiden)</label>
            <input type="text" id="social_platforms" name="social_platforms" class="brief-input"
                placeholder="bijv. Google, Werkspot, Facebook, Instagram">
        </div>
        <div class="field brief-field">
            <label for="social_style_brief">Jouw wensen voor online uitingen <span class="req">*</span></label>
            <textarea id="social_style_brief" name="social_style_brief" class="brief-input" rows="4"
                placeholder="Kleuren, stijl, teksten, doelgroep, voorbeelden van profielen die je mooi vindt..." required></textarea>
        </div>
        </div>`;
    }

    // ── SECTIE VOERTUIGONTWERP (DF-004 / DF-005) ─────────────────────
    if (hasVehicleDesign) {
        html += `<div class="brief-section">
        ${briefSectionHeading(n++, 'palette', 'VOERTUIGONTWERP')}
        <p>Je hebt <strong>Voertuigreclame ontwerp + drukbestand</strong> besteld. Lever je idee, AI-mock-up, logo of schets aan — ons DTP-team maakt er een professioneel drukbestand van. Druk en montage regel je later bij Voertuig.</p>
        <div class="field brief-field">
            <label for="vehicle_design_sector">Branche / sector <span class="req">*</span></label>
            <input type="text" id="vehicle_design_sector" name="vehicle_design_sector" class="brief-input"
                placeholder="bijv. Loodgieter, Elektricien, Hovenier..." required>
        </div>
        <div class="field brief-field">
            <label for="vehicle_design_vehicle">Merk, model en kleur voertuig <span class="req">*</span></label>
            <input type="text" id="vehicle_design_vehicle" name="vehicle_design_vehicle" class="brief-input"
                placeholder="bijv. VW Transporter T6, witte bus, L2H1" required>
        </div>
        <div class="field brief-field">
            <label for="vehicle_design_brief">Jouw wensen voor het voertuigontwerp <span class="req">*</span></label>
            <textarea id="vehicle_design_brief" name="vehicle_design_brief" class="brief-input" rows="4"
                placeholder="Kleuren, stijl, tekst op voertuig, doelgroep, gewenste uitstraling..." required></textarea>
        </div>
        <div class="field brief-field">
            <label for="vehicle_design_refs">Referentie-links (optioneel)</label>
            <input type="url" id="vehicle_design_refs" name="vehicle_design_refs" class="brief-input" placeholder="https://...">
            <span class="brief-help">Links naar Pinterest, concurrenten, AI-tools of voorbeelden die je aanspreken.</span>
        </div>
        <div class="field brief-field">
            <label for="vehicle_design_mockup">Upload AI-mock-up, schets of referentiebeelden</label>
            <input type="file" id="vehicle_design_mockup" name="vehicle_design_mockup[]" class="brief-input" accept=".pdf,.ai,.eps,.svg,.png,.jpg,.jpeg,.webp" multiple>
            <span class="brief-help">PNG/JPG mock-up, logo of schets — max 25MB per bestand.</span>
        </div>
        </div>`;
    }

    // ── SECTIE BEDRIJFSGEGEVENS (offerte / factuur DF) ─────────────────
    if (hasOfferteDoc) {
        html += `<div class="brief-section">
        ${briefSectionHeading(n++, 'fileText', 'BEDRIJFSGEGEVENS')}
        <p>Voor jouw offerte- en factuursjabloon hebben we je officiële gegevens nodig.</p>
        <div class="field brief-field">
            <label>Bedrijfsnaam (officieel) <span class="req">*</span></label>
            <input type="text" name="official_bedrijfsnaam" class="brief-input" required>
        </div>
        <div class="field-grid wiz-brief-field-row">
            <div class="brief-field wiz-brief-field-half">
                <label>KVK Nummer <span class="req">*</span></label>
                <input type="text" name="official_kvk" class="brief-input" required>
            </div>
            <div class="brief-field wiz-brief-field-half">
                <label>BTW Nummer</label>
                <input type="text" name="official_btw" class="brief-input" placeholder="NL000000000B01">
            </div>
        </div>
        <div class="field brief-field">
            <label>Adres (straat, huisnr, postcode, plaats) <span class="req">*</span></label>
            <input type="text" name="official_adres" class="brief-input" required>
        </div>
        <div class="field-grid wiz-brief-field-row">
            <div class="brief-field wiz-brief-field-half">
                <label>Telefoon <span class="req">*</span></label>
                <input type="tel" name="official_phone" class="brief-input" required>
            </div>
            <div class="brief-field wiz-brief-field-half">
                <label>E-mail <span class="req">*</span></label>
                <input type="email" name="official_email" class="brief-input" required>
            </div>
        </div>
        <div class="field brief-field">
            <label>Website URL</label>
            <input type="url" name="official_website" class="brief-input" placeholder="https://...">
        </div>
        </div>`;
    }

    // ── SECTIE VOERTUIG (stickers / magneten — no wraps) ─────────────
    const vehicleItems = items.filter(i => SKU.isVehicleSticker(i.sku) || SKU.isMagnet(i.sku));
    if (vehicleItems.length > 0) {
        const hasMagnets  = vehicleItems.some(i => SKU.isMagnet(i.sku));
        const hasStickers = vehicleItems.some(i => SKU.isVehicleSticker(i.sku));
        let vehicleIntro = 'We hebben je voertuiggegevens nodig voor de exacte pasvorm.';
        if (hasMagnets && hasStickers) {
            vehicleIntro += ' Dit geldt voor je magneten én voertuigstickers.';
        } else if (hasMagnets) {
            vehicleIntro += ' Dit geldt voor je magnetische belettering.';
        } else {
            vehicleIntro += ' Dit geldt voor je voertuigstickers.';
        }
        html += `<div class="brief-section">
        ${briefSectionHeading(n++, 'truck', 'JOUW VOERTUIG')}
        <p>${vehicleIntro}</p>
        <div class="field brief-field">
            <label>Merk, Model & Bouwjaar <span class="req">*</span></label>
            <input type="text" name="vehicle_brand_model" class="brief-input"
                placeholder="bijv. Volkswagen Transporter 2021 L2H1" required>
        </div>
        <div class="field brief-field">
            <label>Tekst op voertuig (telefoon, website, specialisatie)</label>
            <textarea name="vehicle_text" class="brief-input" rows="2"
                placeholder="Wat moet er naast je logo op staan? bijv. '+31 6 12345678 | loodgieter-rotterdam.nl'"></textarea>
        </div>
        ${vehicleItems.map(item => designMethodBlock(item.name, item.sku, item)).join('')}
        </div>`;
    }

    // ── SECTIE WRAPS ─────────────────────────────────────────────────
    const wrapItems = items.filter(i => SKU.isWrap(i.sku));
    if (wrapItems.length > 0) {
        html += `<div class="brief-section">
        ${briefSectionHeading(n++, 'layers', 'WRAP — VOERTUIGBRIEFING')}
        <p>Voor een wrap heeft de ontwerper professionele voertuigfoto's nodig. Upload 4 foto's hieronder.</p>
        <div class="field brief-field">
            <label>Exacte voertuigversie (bijv. L1H1, L2H2) <span class="req">*</span></label>
            <input type="text" name="wrap_version" class="brief-input" placeholder="bijv. VW Crafter L3H3 2022" required>
        </div>
        <div class="field brief-field">
            <label>4 voertuigfoto's (voorkant, achterkant, links, rechts) <span class="req">*</span></label>
            <input type="file" name="wrap_photos[]" class="brief-input" accept="image/*" multiple required>
            <span class="brief-help">Selecteer alle 4 foto's tegelijk. Minimaal 1000px breed.</span>
        </div>
        <div class="field brief-field">
            <label>Jouw wensen voor de ontwerper <span class="req">*</span></label>
            <textarea name="wrap_brief" class="brief-input" rows="3"
                placeholder="Beschrijf je visie: kleuren, stijl, tekst, sector, inspiratie..." required></textarea>
        </div>
        <div class="field brief-field">
            <label class="wiz-brief-check-label wiz-brief-check-label--start">
                <input type="checkbox" name="wrap_partner_ok" required>
                <span>Ik begrijp dat de montage uitgevoerd wordt door gecertificeerde partner <strong>Erkapremium</strong> na goedkeuring van het ontwerp.</span>
            </label>
        </div>
        </div>`;
    }

    // ── SECTIE BANNERS / VLAG ─────────────────────────────────────────
    const bannerItems = items.filter(i => SKU.isBanner(i.sku));
    if (bannerItems.length > 0) {
        html += `<div class="brief-section">
        ${briefSectionHeading(n++, 'flag', 'BANNERS & VLAGGEN')}
        ${bannerItems.map(item => {
            const isVlag = item.sku.startsWith('VL-');
            let extraFields = '';
            if (isVlag) {
                extraFields = `
                <div class="vlag-manufacturing-fields" id="vlag-fields-${item.sku}">
                <div class="field brief-field">
                    <label>Oriëntatie <span class="req">*</span></label>
                    <select name="vlag_orientation" class="brief-input" required>
                        <option value="">Kies...</option>
                        <option>Horizontaal (liggend)</option>
                        <option>Verticaal (staand)</option>
                    </select>
                </div>
                <div class="field brief-field">
                    <label>Afwerking <span class="req">*</span></label>
                    <select name="vlag_finish" class="brief-input" required>
                        <option value="">Kies...</option>
                        <option>Kous links (voor vlaggenmast)</option>
                        <option>Ogen (ringen) voor bevestiging</option>
                    </select>
                </div>
                </div>`;
            }
            return `<div class="brief-design-block">${designMethodBlock(item.name, item.sku, item)}${extraFields}</div>`;
        }).join('')}
        </div>`;
    }

    // ── SECTIE BOUWBORDEN / TEKSTNAKLEJKI ────────────────────────────
    const textStickerItems = items.filter(i => SKU.isTextSticker(i.sku));
    if (textStickerItems.length > 0) {
        html += `<div class="brief-section">
        ${briefSectionHeading(n++, 'type', 'INFORMATIESTICKERS & BOUWBORDEN')}
        <p>Deze producten bevatten tekst. Upload een drukklaar bestand of laat FlexGrafik het ontwerpen.</p>
        ${textStickerItems.map(item => `
        <div class="brief-design-choice" data-sku="${item.sku}">
            <p class="brief-line-head">${BRIEF_SVG.ruler}<span>Ontwerp voor <em>${item.name}</em>:</span></p>
            <div class="design-radio-group">
                <label class="design-radio-option">
                    <input type="radio" name="design_method_${item.sku}" value="file" required>
                    <span>
                        <strong>Mijn eigen bestand (Gratis)</strong><br>
                        <small class="wiz-brief-text-muted">Upload een drukklaar PDF / EPS / AI bestand</small>
                    </span>
                </label>
                <label class="design-radio-option">
                    <input type="radio" name="design_method_${item.sku}" value="flexgrafik">
                    <span>
                        <strong>FlexGrafik ontwerpt (+€29)</strong><br>
                        <small class="wiz-brief-text-muted">Betaallink volgt per mail.</small>
                    </span>
                </label>
            </div>
            <div class="design-panel" data-panel="file" style="display:none;">
                <div class="field brief-field">
                    <label>Upload bestand <span class="req">*</span></label>
                    <input type="file" name="design_file_${item.sku}[]" class="brief-input" accept=".pdf,.eps,.ai" required>
                </div>
            </div>
            <div class="design-panel" data-panel="flexgrafik" style="display:none;">
                <div class="field brief-field">
                    <label>Gewenste tekst <span class="req">*</span></label>
                    <input type="text" name="text_sticker_tekst_flex_${item.sku}" class="brief-input"
                        placeholder="Wat moet er op staan?" required>
                </div>
            </div>
        </div>`).join('')}
        </div>`;
    }

    // ── SECTIE STANDAARD STICKERS (NS-001/002/003/006) ───────────────
    const stdStickerItems = items.filter(i => SKU.isStandardSticker(i.sku));
    if (stdStickerItems.length > 0) {
        html += `<div class="brief-section">
        ${briefSectionHeading(n++, 'tag', 'BRANDING STICKERS')}
        <p>Voor jouw branding stickers — logo centraal gedrukt op het gekozen formaat.</p>
        ${stdStickerItems.map(item => designMethodBlock(item.name, item.sku, item)).join('')}
        </div>`;
    }

    // ── SECTIE NAKLEJKI-WIZYTÓWKI (NW-) ──────────────────────────────
    const visCardItems = items.filter(i => SKU.isVisCard(i.sku));
    if (visCardItems.length > 0) {
        const visIntro = visCardItems.some(i => i.sku.startsWith('VK-'))
            ? 'Visitekaartjes voor jouw netwerk — sticker of papier, altijd met jouw branding.'
            : 'Waterdichte sticker-visitekaartjes — perfect voor op je gereedschapskist, voertuig of bij de klant achter te laten.';
        html += `<div class="brief-section">
        ${briefSectionHeading(n++, 'creditCard', 'VISITEKAARTJES')}
        <p>${visIntro}</p>
        ${visCardItems.map(item => designMethodBlock(item.name, item.sku, item)).join('')}
        <div class="design-panel-global" id="viscard-fields-${visCardItems[0].sku}" style="display:none;">
            <div class="field brief-field">
                <label>Bedrijfsnaam <span class="req">*</span></label>
                <input type="text" name="viscard_bedrijfsnaam" class="brief-input" required>
            </div>
            <div class="field-grid wiz-brief-field-row">
                <div class="brief-field wiz-brief-field-half">
                    <label>Naam <span class="req">*</span></label>
                    <input type="text" name="viscard_naam" class="brief-input" required>
                </div>
                <div class="brief-field wiz-brief-field-half">
                    <label>Telefoon <span class="req">*</span></label>
                    <input type="tel" name="viscard_phone" class="brief-input" required>
                </div>
            </div>
            <div class="field brief-field">
                <label>Specialisatie (max 30 tekens)</label>
                <input type="text" name="viscard_spec" class="brief-input" maxlength="30"
                    placeholder="bijv. Loodgieter Rotterdam">
            </div>
            <div class="field brief-field">
                <label>QR-link op kaartje (optioneel)</label>
                <input type="url" name="viscard_qr_url" class="brief-input" placeholder="https://...">
            </div>
        </div>
        </div>`;
    }

    // ── SECTIE GEREEDSCHAP SIMPEL (NSP-001→004: Batterij / Helm) ─────
    const toolSimpleItems = items.filter(i => SKU.isToolSimple(i.sku));
    if (toolSimpleItems.length > 0) {
        html += `<div class="brief-section">
        ${briefSectionHeading(n++, 'tool', 'BATTERIJ & HELM STICKERS')}
        <p>Jouw logo wordt centraal gedrukt op elk setje. Optioneel kun je een korte tekst toevoegen.</p>
        <p class="wiz-brief-text-muted">Logo wordt automatisch gebruikt uit de SECTIE 1 upload hierboven.</p>
        <div class="field brief-field">
            <label>Optionele korte tekst onder logo (max 15 tekens)</label>
            <input type="text" name="tool_extra_text" class="brief-input" maxlength="15"
                placeholder="bijv. voornaam of telefoonnummer">
            <span class="brief-help">Wordt kleingedrukt onder het logo geplaatst — optioneel.</span>
        </div>
        </div>`;
    }

    // ── SECTIE QR STICKER (NSP-005) ───────────────────────────────────
    if (skus.includes('NSP-005')) {
        html += `<div class="brief-section">
        ${briefSectionHeading(n++, 'link', 'QR-CODE STICKERS')}
        <p>Wij genereren een unieke QR-code met jouw logo in het midden.</p>
        <div class="field brief-field">
            <label>Link waarnaar de QR-code verwijst <span class="req">*</span></label>
            <input type="url" name="qr_url" class="brief-input"
                placeholder="bijv. https://g.page/r/jouw-google-reviews-link" required>
            <span class="brief-help">Tip: gebruik je Google Reviews link voor maximale impact.</span>
        </div>
        <div class="field brief-field">
            <label>Kleur rand QR-code</label>
            <select name="qr_color" class="brief-input">
                <option value="zwart">Zwart (standaard)</option>
                <option value="grijs">Grijs</option>
                <option value="logo_kleur">Kleur uit logo</option>
            </select>
        </div>
        </div>`;
    }

    // ── SECTIE BEDANKT STICKERS (NSP-006) ─────────────────────────────
    const bedanktItems = items.filter(i => SKU.isBedankt(i.sku));
    if (bedanktItems.length > 0) {
        html += `<div class="brief-section">
        ${briefSectionHeading(n++, 'gift', 'BEDANKT STICKERS')}
        <p>Plak een bedankt-sticker op je opgeleverde werk — een professioneel gebaar dat klanten onthouden.</p>
        <p class="wiz-brief-text-muted">Je logo uit SECTIE 1 wordt centraal op elke sticker gedrukt.</p>
        <div class="field brief-field">
            <label>Optionele korte tekst onder logo (max 15 tekens)</label>
            <input type="text" name="bedankt_extra_text" class="brief-input" maxlength="15"
                placeholder="bijv. Bedankt! of jouw telefoonnummer">
            <span class="brief-help">Wordt kleingedrukt onder het logo geplaatst — optioneel.</span>
        </div>
        </div>`;
    }

    // ── SECTIE WERKKLEDING (OC- / OA-) ───────────────────────────────
    const clothingItems = items.filter(i => SKU.isClothing(i.sku));
    if (clothingItems.length > 0) {
        html += `<div class="brief-section">
        ${briefSectionHeading(n++, 'users', 'WERKKLEDING — MATEN & SPECIFICATIES')}
        <p>Geef per kledingstuk de maten op. Logo gebruik je uit de upload in SECTIE 1.</p>
        ${clothingItems.map(item => `
        <div class="field brief-field">
            <label>Maten voor <strong>${item.name}</strong> (${item.quantity} stuks) <span class="req">*</span></label>
            <table class="size-matrix-table" data-qty="${item.quantity}" data-item-name="${item.name}">
                <thead>
                    <tr>
                        ${['XS','S','M','L','XL','XXL','3XL'].map(s =>
                            `<th>${s}</th>`
                        ).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        ${['XS','S','M','L','XL','XXL','3XL'].map(s =>
                            `<td>
                                <input type="number" name="size_${item.sku}_${s}" min="0" max="${item.quantity}" value="0" class="size-matrix-input" aria-label="Maat ${s}">
                            </td>`
                        ).join('')}
                    </tr>
                </tbody>
            </table>
            <span class="brief-help">Totaal moet ${item.quantity} stuks zijn.</span>
        </div>`).join('')}
        <div class="field brief-field">
            <label>Kleur werkkleding <span class="req">*</span></label>
            <select name="clothing_color" class="brief-input" required>
                <option value="">Kies...</option>
                <option>Zwart</option>
                <option>Navy Blauw</option>
                <option>Donkergrijs (Heide grijs)</option>
                <option>Wit</option>
            </select>
        </div>
        <div class="field brief-field">
            <label>Logo positie(s) <span class="req">*</span></label>
            <div class="wiz-brief-radio-row">
                ${[['chest','Borst links (klein ~10cm)'],['back','Rug groot (~25cm)'],['both','Borst + Rug (Compleet)']].map(([v,l]) =>
                    `<label class="wiz-brief-radio-label">
                        <input type="radio" name="clothing_placement" value="${v}" required> ${l}
                    </label>`
                ).join('')}
            </div>
        </div>
        <div class="field brief-field">
            <label class="wiz-brief-check-label">
                <input type="checkbox" name="clothing_names_upsell" id="clothing_names_toggle">
                <span>Voeg gepersonaliseerde namen toe (via HTV branchegrafiek) — optioneel</span>
            </label>
            <div id="clothing-names-panel" class="wiz-brief-panel-hidden">
                <textarea name="clothing_names" class="brief-input" rows="3"
                    placeholder="1 stuk → M → Jan&#10;2 stuk → L → Piotr&#10;3 stuk → XL → Tomasz"></textarea>
                <span class="brief-help">Formaat: stuknummer → maat → naam. Wij voegen dit toe aan je factuur.</span>
            </div>
        </div>
        </div>`;
    }

    // ── SECTIE LOGO-BEDRUKKING (HT-) ─────────────────────────────────
    const htvItems = items.filter(i => SKU.isHTV(i.sku));
    if (htvItems.length > 0) {
        const hasClothingSection = clothingItems.length > 0;
        html += `<div class="brief-section">
        ${briefSectionHeading(n++, 'users', 'LOGO-BEDRUKKING (HTV)')}
        <p>Heat-transfer logo's worden geperst op je kleding. Gebruik het logo uit sectie 1; vul hieronder de specificaties per HTV-item in.</p>
        ${htvItems.map(item => renderHtvItemFields(item, hasClothingSection)).join('')}
        </div>`;
    }

    // ── SECTIE PREMIUM ACCESSOIRES (AP-) ─────────────────────────────
    const premiumItems = items.filter(i => SKU.isPremiumAcc(i.sku));
    if (premiumItems.length > 0) {
        html += `<div class="brief-section">
        ${briefSectionHeading(n++, 'star', 'PREMIUM ACCESSOIRES')}
        <p>Jouw logo wordt aangebracht op de premium items. Kleur en materiaal worden hieronder gecommuniceerd.</p>
        ${premiumItems.map(item => `
            <div class="field brief-field">
                <label>Kleur voorkeur voor <strong>${item.name}</strong></label>
                <select name="acc_color_${item.sku}" class="brief-input">
                    <option value="">Geen voorkeur (wij kiezen passend bij logo)</option>
                    <option>Zwart</option>
                    <option>Grijs</option>
                    <option>Navy</option>
                    <option>Overig (zie opmerkingen)</option>
                </select>
            </div>`).join('')}
        </div>`;
    }

    // ── SECTIE OPMERKINGEN (always last) ─────────────────────────────
    html += `<div class="brief-section">
        ${briefSectionHeading(n++, 'messageSquare', 'EXTRA OPMERKINGEN')}
        <div class="field brief-field">
            <label>Heb je nog speciale wensen of opmerkingen? (Optioneel)</label>
            <textarea name="extra_notes" class="brief-input" rows="4"
                placeholder="Iets wat we moeten weten? Deadlines, speciale eisen, vragen..."></textarea>
        </div>
    </div>`;

    // ─── INJECT & ACTIVATE ─────────────────────────────────────────────
    container.innerHTML = html;
    wireBriefFieldLabels(container);
    applyDesignAgentBriefPrefill(form);
    loader.style.display = 'none';
    form.style.display = 'block';

    if (orderData.intro_vehicle_label) {
        const vehHint = String(orderData.intro_vehicle_label);
        form.querySelectorAll('[name="vehicle_brand_model"], [name="wrap_version"]').forEach(el => {
            if (el && !el.value) {
                el.setAttribute('placeholder', `Wizard: ${vehHint} — vul merk, model & bouwjaar / uitvoering aan`);
            }
        });
    }

    // ─── RADIO PANEL TOGGLE LOGIC ──────────────────────────────────────
    document.querySelectorAll('.design-radio-group input[type=radio]').forEach(radio => {
        radio.addEventListener('change', function() {
            const sku    = this.closest('.brief-design-choice').dataset.sku;
            const choice = this.value;
            this.closest('.brief-design-choice').querySelectorAll('.design-panel').forEach(panel => {
                const active = panel.dataset.panel === choice;
                panel.style.display = active ? 'block' : 'none';
                setDesignPanelRequired(panel, active);
                if (panel.dataset.panel === 'visualizer' && choice === 'visualizer') {
                    initVisualizerPanel(panel);
                }
            });
            if (choice !== 'visualizer') {
                clearVisualizerState(sku);
            }
            syncVisCardGlobalFields(form);
        });
    });
    initVisualizerWijzigen();

    // ─── CLOTHING NAMES TOGGLE ────────────────────────────────────────
    const namesToggle = document.getElementById('clothing_names_toggle');
    if (namesToggle) {
        namesToggle.addEventListener('change', function() {
            const panel = document.getElementById('clothing-names-panel');
            if (panel) {
                panel.classList.toggle('wiz-brief-panel-hidden', !this.checked);
                panel.classList.toggle('wiz-brief-panel-visible', this.checked);
            }
        });
    }

    // ─── FORM SUBMIT ───────────────────────────────────────────────────
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const btn = document.getElementById('btn-submit-brief');
        btn.innerHTML = '<span>Verzenden... ' + BRIEF_SVG.loader + '</span>';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        const prevErr = form.querySelector('.fg-submit-error');
        if (prevErr) prevErr.remove();

        const clothingErr = validateClothingSizeMatrices(form);
        if (clothingErr) {
            showBriefSubmitError(form, btn, clothingErr);
            return;
        }
        const addonErr = validateLogoAddonVariants(form);
        if (addonErr) {
            showBriefSubmitError(form, btn, addonErr);
            return;
        }
        const vizErr = validateVisualizerSelections(form);
        if (vizErr) {
            showBriefSubmitError(form, btn, vizErr);
            return;
        }

        const formData = new FormData(form);
        formData.append('action',      'fg_submit_brief_form');
        formData.append('_ajax_nonce', briefFormNonce);
        formData.append('order_id',    briefFormOrderId);
        if (typeof briefFormOrderKey !== 'undefined' && briefFormOrderKey) {
            formData.append('order_key', briefFormOrderKey);
        }
        vizBlobMap.forEach(function(blob, blobSku) {
            var methodRadio = form.querySelector('[name="design_method_' + blobSku + '"]:checked');
            if (!methodRadio || methodRadio.value !== 'visualizer') return;
            formData.append('design_file_' + blobSku, blob, blobSku + '-visualizer.png');
        });

        // Flag FlexGrafik / visualizer selections for order note
        const flexSelections = [];
        const vizSelections = [];
        document.querySelectorAll('[name^="design_method_"]').forEach(radio => {
            if (radio.checked) {
                const radioSku = radio.name.replace('design_method_', '');
                if (radio.value === 'flexgrafik') {
                    flexSelections.push(radioSku);
                } else if (radio.value === 'visualizer') {
                    vizSelections.push(radioSku);
                }
            }
        });
        formData.append('flexgrafik_upsells', JSON.stringify(flexSelections));
        formData.append('visualizer_upsells', JSON.stringify(vizSelections));

        fetch(briefFormAjaxUrl, { method: 'POST', body: formData })
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                // GA4 + Meta events
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'brief_form_submit', { order_id: briefFormOrderId });
                }
                if (typeof fbq !== 'undefined') fbq('track', 'Lead', { order_id: briefFormOrderId });

                renderBriefSuccessState(orderData, {
                    flexCount: flexSelections.length,
                    vizCount: vizSelections.length
                });

            } else {
                const errMsg = (data.data && data.data.message) ? data.data.message : 'Er is iets misgegaan. Probeer opnieuw.';
                const errBanner = document.createElement('div');
                errBanner.className = 'fg-submit-error wiz-brief-form-error';
                const warnSvg = `<svg class="wiz-brief-warn-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
                errBanner.innerHTML = warnSvg + errMsg;
                form.insertBefore(errBanner, form.firstChild);
                btn.innerHTML = '<span>Gegevens verzenden &amp; Start order</span>';
                btn.style.opacity = '1';
                btn.disabled = false;
            }
        })
        .catch(() => {
            const errBanner = document.createElement('div');
            errBanner.className = 'fg-submit-error wiz-brief-form-error';
            const warnSvg = `<svg class="wiz-brief-warn-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
            errBanner.innerHTML = warnSvg + 'Verbindingsfout — controleer je internet en probeer opnieuw.';
            form.insertBefore(errBanner, form.firstChild);
            btn.innerHTML = '<span>Gegevens verzenden &amp; Start order</span>';
            btn.style.opacity = '1';
            btn.disabled = false;
        });
    });
}

window.addEventListener('beforeunload', function(e) {
    if (vizBlobMap.size > 0) {
        e.preventDefault();
        e.returnValue = '';
    }
});

window.FGBriefForm = { buildDynamicForm: buildDynamicForm, renderBriefSuccessState: renderBriefSuccessState };
