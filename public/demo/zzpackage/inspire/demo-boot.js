/* INSPIRE wrapping brief and client-side demo transport. */
(function () {
    'use strict';

    // ============================================================
    // 0. Config (relative paths — works from any static path root)
    // ============================================================
    var PROXY_BASE = 'wp-json/fg/v1/design-agent';
    var I18N_BASE = 'data/i18n/chat/';
    var ASSETS_DIR = 'assets/';
    var MOCKUP_DIR = 'assets/';
    var SHARED_IMAGES_DIR = '../images/';
    var LOCALES = ['nl-NL', 'pl-PL', 'en-GB'];

    // PHP fg_design_agent_config() — wp_localize_script('fg-design-agent', 'daConfig', …)
    window.daConfig = {
        apiEnabled: true,
        useProxy: true,
        proxyBase: PROXY_BASE,
        restNonce: 'demo',                       // wp_create_nonce('wp_rest') — accepted by stub
        apiUrl: PROXY_BASE + '/generate',
        chatUrl: PROXY_BASE + '/chat',
        offerteUrl: PROXY_BASE + '/offerte-request',
        wizardUrl: '../wizard',
        themeUri: '..',
        defaultLocale: 'nl-NL',
        allowResultsFixture: false,
        vehicleImages: {
            caddy: SHARED_IMAGES_DIR + 'voertuig_caddy.png',
            bus_l: SHARED_IMAGES_DIR + 'voertuig_bus_l.png',
            bus_xl: SHARED_IMAGES_DIR + 'voertuig_bus_xl.png',
            passenger: SHARED_IMAGES_DIR + 'voertuig_passenger.png'
        }
    };

    // ============================================================
    // 1. i18n packs — brain/i18n/chat/{locale}.json (verbatim)
    // ============================================================
    var packs = {};
    var packsReady = Promise.all(LOCALES.map(function (loc) {
        return fetch(I18N_BASE + loc + '.json')
            .then(function (res) {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.json();
            })
            .then(function (json) { packs[loc] = json; })
            .catch(function (err) {
                console.error('[demo-boot] i18n pack load failed:', loc, err);
            });
    }));

    function packFor(locale) {
        return packs[locale] || packs['nl-NL'] || {};
    }

    function fq(pack, field) {
        return (pack.field_questions || {})[field] || '';
    }

    function ack(pack, key) {
        return (pack.acks || {})[key] || '';
    }

    function chipOptions(pack, field) {
        return (pack.button_options || {})[field] || [];
    }

    function chipLabel(pack, field, id) {
        var opts = chipOptions(pack, field);
        for (var i = 0; i < opts.length; i++) {
            if (opts[i].id === id) return opts[i].label;
        }
        return String(id || '');
    }

    // intake_copy._EXTRA_FIELD_QUESTIONS — NL script fallback (used for every locale,
    // exactly like engine/v4/intake/intake_copy.py does when the pack has no question)
    var FLEX_QUESTION_NL = 'Is dat budget strikt, of flexibel als het ontwerp echt klopt?';

    // ============================================================
    // 2. Output content SSoT (verbatim strings from the repos)
    // ============================================================
    // ============================================================
    // 3. Session state machine
    //    Question order: engine/v4/intake/state.py PHASE_FIELDS.
    //    Staps: engine/v4/intake/chat_bridge.py STAP_TO_LEGACY_PHASE.
    // ============================================================
    var FLOW = [
        { key: 'bedrijfsnaam', field: 'company.bedrijfsnaam', stap: 1 },
        { key: 'branche', field: 'company.branche', stap: 1, chips: 'company.branche' },
        { key: 'regio', field: 'company.regio', stap: 1, chips: 'company.regio' },
        { key: 'vehicle', field: 'vehicle.type', stap: 2, chips: 'vehicle.type' },
        { key: 'vehicle_usage', field: 'vehicle.usage', stap: 2, chips: 'vehicle.usage' },
        { key: 'exposure', field: 'vehicle.exposure', stap: 2, chips: 'vehicle.exposure' },
        { key: 'doelgroep', field: 'marketing.doelgroep', stap: 3 },
        { key: 'diensten', field: 'marketing.diensten', stap: 3 },
        { key: 'focus', field: 'marketing.focus', stap: 3 },
        { key: 'impression', field: 'marketing.desired_impression', stap: 3, chips: 'marketing.desired_impression' },
        { key: 'cta', field: 'marketing.primary_cta', stap: 4, chips: 'marketing.primary_cta' },
        { key: 'telefoon', field: 'company.telefoon', stap: 4, when: 'telefoon' },
        { key: 'website', field: 'company.website', stap: 4, when: 'website' },
        { key: 'budget', field: 'budget.range', stap: 6, chips: 'budget.range' },
        { key: 'flex', field: 'budget.flexibility', stap: 6, chips: 'budget.flexibility', fallbackQuestion: FLEX_QUESTION_NL },
        // v6.1 WHERE_BUS turn (chat_bridge: where_bus → stap 2) — bus photo + logo upload.
        // Kept last so the click path ends with the upload before the briefing card.
        { key: 'logo', field: 'where_bus.upload', stap: 5, upload: true }
    ];

    var STEP_BY_FIELD = {};
    FLOW.forEach(function (s) { STEP_BY_FIELD[s.field] = s; });

    var sessions = {};
    var sessionSeq = 0;

    var STORE_KEY = 'demoWrapSessionsV1';

    function loadStoredSessions() {
        try {
            var raw = sessionStorage.getItem(STORE_KEY);
            if (raw) sessions = JSON.parse(raw) || {};
        } catch (e) { /* storage unavailable — in-memory only */ }
    }

    function persistSessions() {
        try {
            sessionStorage.setItem(STORE_KEY, JSON.stringify(sessions));
        } catch (e) { /* ignore */ }
    }

    loadStoredSessions();

    function newSession(locale) {
        sessionSeq += 1;
        var id = 'demo-' + Date.now().toString(36) + '-' + sessionSeq;
        var sess = {
            id: id,
            locale: locale || 'nl-NL',
            step: 0,
            draft: {},
            budgetExplicit: false,
            messages: [],
            summaryReached: false
        };
        sessions[id] = sess;
        persistSessions();
        return sess;
    }

    function stepDone(sess, step) {
        var d = sess.draft;
        if (step.upload) return !!d.logo_file;
        return !!d[step.key];
    }

    function currentStep(sess) {
        for (var i = 0; i < FLOW.length; i++) {
            if (FLOW[i].key === 'focus' && !needsFocus(sess.draft)) continue;
            if ((!FLOW[i].when || sess.draft.cta?.id === FLOW[i].when) && !stepDone(sess, FLOW[i])) return FLOW[i];
        }
        return null;
    }

    function pushMsg(sess, role, content) {
        sess.messages.push({ role: role, content: content });
        if (sess.messages.length > 30) sess.messages = sess.messages.slice(-30);
    }

    function escapeHtml(str) {
        return String(str == null ? '' : str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function fill(tpl, vars) {
        var s = String(tpl || '');
        Object.keys(vars || {}).forEach(function (k) {
            s = s.split('{' + k + '}').join(String(vars[k]));
        });
        return s;
    }

    // ============================================================
    // 4. Reply composition (all strings from the packs / engine)
    // ============================================================
    function valueLabel(sess, key) {
        var v = sess.draft[key];
        return v ? v.label : '';
    }

    var OPENING_FALLBACKS = {
        'nl-NL': {
            opening: 'We brengen in kaart wie je wilt bereiken en wat die persoon moet onthouden. Daarna vergelijk je twee wraprichtingen voor hetzelfde voertuig, zie je onze aanbeveling met reden en krijg je een ontwerpbrief voor de vormgever.',
            nameQuestion: 'Welke bedrijfsnaam moet op de auto staan?'
        },
        'pl-PL': {
            opening: 'Ustalimy, do kogo chcesz dotrzeć i co ta osoba ma zapamiętać. Potem porównasz dwa kierunki oklejenia tego samego auta, poznasz naszą rekomendację z uzasadnieniem i dostaniesz brief dla grafika.',
            nameQuestion: 'Jaka nazwa firmy ma być widoczna na aucie?'
        },
        'en-GB': {
            opening: 'We’ll clarify who you want to reach and what they should remember. Then you can compare two wrap directions for the same vehicle, see our recommendation and why, and take away a brief for your designer.',
            nameQuestion: 'Which company name should appear on the vehicle?'
        }
    };

    function openingReply(pack, requestedLocale) {
        var locale = requestedLocale || pack.locale || 'nl-NL';
        var fallback = OPENING_FALLBACKS[locale] || OPENING_FALLBACKS['nl-NL'];
        var hasRequestedPack = pack.locale === locale;
        var opening = String((hasRequestedPack && pack.opening) || fallback.opening).trim();
        var question = String((hasRequestedPack && fq(pack, 'company.bedrijfsnaam')) || fallback.nameQuestion).trim();
        return opening + '\n\n' + question;
    }

    /** acks.* + next question — engine orchestrator _ack() composition. */
    function ackAndNext(pack, sess, doneStep) {
        var name = valueLabel(sess, 'bedrijfsnaam');
        var branche = valueLabel(sess, 'branche');
        var regio = valueLabel(sess, 'regio');
        var vtype = valueLabel(sess, 'vehicle');
        var ackText = '';
        if (doneStep.key === 'bedrijfsnaam') {
            ackText = fill(ack(pack, 'ack_name'), { name: name });
        } else if (doneStep.key === 'branche') {
            ackText = fill(ack(pack, 'ack_name_branche'), { name: name, branche: branche });
        } else if (doneStep.key === 'regio') {
            ackText = fill(ack(pack, 'ack_vehicle'), { name: name, branche: branche, regio: regio });
        } else if (doneStep.key === 'vehicle_usage') {
            ackText = fill(ack(pack, 'ack_marketing'), { vtype: vtype });
        } else if (doneStep.key === 'cta') {
            ackText = ack(pack, 'ack_cta');
        } else if (doneStep.key === 'logo') {
            // v6.1 WHERE_BUS turn: visual_analyzer feedback + quick preview intro
            ackText = 'Het originele logo blijft ongewijzigd. We controleren contrast en positie op de gekozen deur.';
        }
        return ackText;
    }

    function questionFor(pack, sess, step) {
        if (step.fallbackQuestion) return step.fallbackQuestion;
        var q = fq(pack, step.field);
        if (step.field === 'where_bus.upload') {
            q = q.replace('{regio}', valueLabel(sess, 'regio'));
        }
        return q;
    }

    function buildQuestionResponse(pack, sess, doneStep) {
        var step = currentStep(sess);
        var ackText = doneStep ? ackAndNext(pack, sess, doneStep) : '';
        var question = questionFor(pack, sess, step);
        var reply = (ackText ? ackText + '\n\n' : '') + question;
        pushMsg(sess, 'assistant', reply);
        var out = baseResponse(sess);
        out.reply = reply;
        out.stap = step.stap;
        out.phase = step.stap;
        out.stap_label = (pack.stap_labels || {})[String(step.stap)] || '';
        out.quick_replies = step.chips ? chipOptions(pack, step.chips) : [];
        out.quick_reply_field = step.chips || step.field;
        return out;
    }

    // --- agency proposal (agency_copy.format_agency_proposal) -------------
    function needsFocus(draft) {
        const service = String(draft.diensten?.label || '').trim().toLowerCase();
        return service.length > 0 && (service === String(draft.branche?.label || '').toLowerCase() ||
            /^(alles|allround|diverse werkzaamheden|installatie|elektra|loodgieter(swerk)?|bouw|schoonmaak|plumbing|hydraulika)$/.test(service));
    }

    // Same decision before confirmation, after generation and in the designer's handoff.
    function creativeDecision(d) {
        const service = (needsFocus(d) && d.focus?.label) || d.diensten?.label || 'Nog te bepalen';
        const headline = d.headline?.label || service;
        const moving = d.exposure?.id === 'moving';
        const bold = !moving && ['opvallend','stoer'].includes(d.impression?.id);
        const direction = bold ? 'B' : 'A';
        const recognition = d.cta?.id === 'geen';
        const priority = recognition ? 'Eerst de bedrijfsnaam, daarna de kerndienst. Geen contactregel nodig.' :
            'Eerst de kerndienst, dan het merk. De contactactie (' + (d.cta?.label || 'nog te kiezen') + ') komt op de derde plaats.';
        const reason = moving ? 'Je voertuig rijdt vaak rond en de kijktijd is kort. Richting A houdt één boodschap rustig leesbaar.' : bold ?
            'Je wilt vooral opvallen wanneer het voertuig stilstaat. Richting B gebruikt meer contrast en beweging.' :
            'Je wilt dat iemand de dienst en het merk rustig kan plaatsen. Richting A geeft de kernboodschap meer ruimte.';
        const trade = bold ? 'Richting A is rustiger; kies B als extra visuele nadruk belangrijker is.' : 'Richting B valt sterker op; kies A als rustige herkenning belangrijker is.';
        return {headline, priority, direction, name:'Richting '+direction+' · '+(bold?'Krachtig en opvallend':'Rustig en helder'), reason, trade};
    }

    function proposalText(pack, sess) {
        const plan=creativeDecision(sess.draft);
        return '**Voorgestelde reclameregel:** “' + plan.headline + '”\nVoor ' + valueLabel(sess,'doelgroep') + '. ' + plan.priority +
            ' De overige diensten laten we weg.\n\n**Onze aanbeveling: ' + plan.name + '.** ' + plan.reason + ' ' + plan.trade +
            '\n\nRichting A en B zijn twee ontwerpen voor dezelfde wrap; jij kiest. Pas de reclameregel aan in je briefing als je andere woorden wilt.';
    }

    function summaryReply(pack, sess, locale) {
        return proposalText(pack, sess, locale) + '\n\n' + ack(pack, 'confirm_prompt');
    }

    function buildSummaryResponse(pack, sess, doneStep) {
        var locale = sess.locale;
        var ackText = doneStep ? ackAndNext(pack, sess, doneStep) : '';
        var reply = (ackText ? ackText + '\n\n' : '') + summaryReply(pack, sess, locale);
        pushMsg(sess, 'assistant', reply);
        sess.summaryReached = true;
        var out = baseResponse(sess);
        out.reply = reply;
        out.stap = 7;
        out.phase = 7;
        out.stap_label = (pack.stap_labels || {})['7'] || '';
        out.quick_replies = [];
        out.quick_reply_field = '';
        out.ready_to_generate = true;
        out.missing_fields = [];
        out.brief_partial = flatBrief(sess);
        return out;
    }

    // chat_bridge.flat_brief_from_draft + legacy_brief_adapter._normalize_brief_dict —
    // the flat brief_partial contract consumed by dtp-design-agent.js
    function flatBrief(sess) {
        var d = sess.draft;
        var b = {};
        if (d.bedrijfsnaam) b.bedrijfsnaam = d.bedrijfsnaam.id;
        if (d.branche) b.branche = d.branche.id;
        if (d.regio) b.regio = d.regio.id;
        if (d.vehicle) b.vehicle = normalizeVehicle(d.vehicle.id);
        if (d.vehicle_usage) b.vehicle_usage = d.vehicle_usage.id;
        if (d.impression) b.desired_impression = d.impression.id;
        if (d.cta) b.primary_cta = d.cta.id;
        // Only expose the contact selected as the primary CTA. Empty markers
        // let the client clear a previously selected phone number or URL.
        b.telefoon = d.cta?.id === 'telefoon' ? valueLabel(sess, 'telefoon') : '';
        b.website = d.cta?.id === 'website' ? valueLabel(sess, 'website') : '';
        if (d.slogan) b.slogan = d.slogan.id;
        if (d.budget) b.budget_range = d.budget.id;
        if (d.flex) b.budget_flexibility = d.flex.id;
        if (d.brand_colors && d.brand_colors.length) b.brand_colors = d.brand_colors;
        if (sess.budgetExplicit) b._budget_explicit = true;
        if (d.logo_file) b.logo_file = d.logo_file;
        if (d.diensten) {
            var decision = creativeDecision(d);
            b.headline = decision.headline;
            b.recommended_direction = 'Richting ' + decision.direction;
            b.recommendation_reason = decision.reason;
            b.message_hierarchy = decision.priority;
        }
        b.exposure = valueLabel(sess,'exposure'); b.diensten = valueLabel(sess,'diensten'); b.doelgroep = valueLabel(sess,'doelgroep');
        b.budget_label = valueLabel(sess,'budget'); b.cta_label = valueLabel(sess,'cta');
        return b;
    }

    function baseResponse(sess) {
        return {
            session_id: sess.id,
            brief_partial: flatBrief(sess),
            ready_to_generate: false,
            missing_fields: [],
            // Live turns never re-request the logo (the client just sent it);
            // only session restore after a reload sets this (sessionPayload).
            logo_reupload_required: false
        };
    }

    function normalizeVehicle(raw) {
        var v = String(raw || '').toLowerCase();
        if (v.indexOf('bus_xl') >= 0 || v.indexOf('bus xl') >= 0 || v.indexOf('bestelbus_xl') >= 0) return 'bus_xl';
        if (v.indexOf('bus_l') >= 0 || v.indexOf('bus l') >= 0 || v.indexOf('bestelbus') >= 0) return 'bus_l';
        if (v.indexOf('passenger') >= 0 || v.indexOf('kombi') >= 0) return 'passenger';
        if (v.indexOf('caddy') >= 0 || v.indexOf('partner') >= 0) return 'caddy';
        return ''; // Unknown classes must not silently become a Caddy.
    }

    function mockupImages(vehicle) {
        var v = normalizeVehicle(vehicle);
        return {
            strak: MOCKUP_DIR + 'mockup-' + v + '-strak.png',
            opvallend: MOCKUP_DIR + 'mockup-' + v + '-opvallend.png'
        };
    }

    // ============================================================
    // 5. Turn handling
    // ============================================================
    function recordChip(sess, field, chipId) {
        var step = STEP_BY_FIELD[field];
        if (step) {
            sess.draft[step.key] = {
                id: chipId,
                label: chipLabel(packFor(sess.locale), field, chipId)
            };
            if (step.key === 'budget') sess.budgetExplicit = true;
            return step;
        }
        return null;
    }

    function recordText(sess, step, text) {
        sess.draft[step.key] = { id: text, label: text };
        if (step.key === 'budget') sess.budgetExplicit = true;
    }

    /** Advance after an answer; returns the next response object. */
    function advance(pack, sess, doneStep) {
        var next = currentStep(sess);
        if (!next) return buildSummaryResponse(pack, sess, doneStep);
        return buildQuestionResponse(pack, sess, doneStep);
    }

    function handleChatBody(sess, body) {
        var pack = packFor(sess.locale);
        if (body.locale) sess.locale = body.locale;

        // Brief edit panel save (field_updates) — orchestrator apply_field_updates()
        if (body.field_updates && typeof body.field_updates === 'object') {
            var map = {
                'company.bedrijfsnaam': 'bedrijfsnaam', 'company.branche': 'branche',
                'company.regio': 'regio', 'vehicle.type': 'vehicle', 'vehicle.usage': 'vehicle_usage',
                'marketing.doelgroep': 'doelgroep', 'marketing.diensten': 'diensten',
                'marketing.desired_impression': 'impression', 'marketing.primary_cta': 'cta',
                'company.telefoon': 'telefoon', 'company.website': 'website',
                'marketing.headline': 'headline', 'marketing.slogan': 'slogan', 'budget.range': 'budget',
                'budget.flexibility': 'flex', 'brand_assets.brand_colors': 'brand_colors'
            };
            Object.keys(body.field_updates).forEach(function (k) {
                var v = body.field_updates[k];
                if (map[k] === 'brand_colors') {
                    sess.draft.brand_colors = Array.isArray(v) ? v : [];
                } else if (map[k] === 'headline' && (v == null || String(v).trim() === '')) {
                    delete sess.draft.headline;
                } else if (map[k] && v != null && v !== '') {
                    var fieldValue = map[k] === 'headline' ? String(v).trim().slice(0, 60) : String(v);
                    var lbl = chipLabel(pack, k, fieldValue) || fieldValue;
                    sess.draft[map[k]] = { id: fieldValue, label: lbl };
                    if (map[k] === 'cta') {
                        if (v !== 'telefoon') delete sess.draft.telefoon;
                        if (v !== 'website') delete sess.draft.website;
                    }
                    if (map[k] === 'budget') sess.budgetExplicit = true;
                }
            });
            var out = buildSummaryResponse(pack, sess, null);
            out.reply = ack(pack, 'edit_saved') + '\n\n' + summaryReply(pack, sess, sess.locale);
            if (sess.messages.length && sess.messages[sess.messages.length - 1].role === 'assistant') {
                sess.messages[sess.messages.length - 1].content = out.reply;
            } else {
                pushMsg(sess, 'assistant', out.reply);
            }
            return out;
        }

        // Quick-reply chip
        if (body.quick_reply_id && body.quick_reply_field) {
            var field = body.quick_reply_field;
            pushMsg(sess, 'user', chipLabel(pack, field, body.quick_reply_id));
            var step = recordChip(sess, field, body.quick_reply_id);
            if (!step) return buildQuestionResponse(pack, sess, null);
            return advance(pack, sess, step);
        }

        // Free text
        var text = String(body.message || '').trim();
        var cur = currentStep(sess);
        if (!cur) {
            // Already at summary — editing via chat is not part of the demo flow
            var outDone = buildSummaryResponse(pack, sess, null);
            return outDone;
        }
        pushMsg(sess, 'user', text);
        if (cur.upload) {

            var outLogo = baseResponse(sess);
            outLogo.reply = (pack.errors || {}).logo_required || '';
            pushMsg(sess, 'assistant', outLogo.reply);
            outLogo.stap = cur.stap;
            outLogo.phase = cur.stap;
            outLogo.stap_label = (pack.stap_labels || {})[String(cur.stap)] || '';
            outLogo.quick_replies = [];
            outLogo.quick_reply_field = cur.field;
            return outLogo;
        }
        if (!text) {
            return buildQuestionResponse(pack, sess, null);
        }
        recordText(sess, cur, text);
        return advance(pack, sess, cur);
    }

    function handleTurnForm(sess, fd) {
        var pack = packFor(sess.locale);
        var message = fd.get('message') || '';
        if (fd.get('locale')) sess.locale = String(fd.get('locale'));
        pack = packFor(sess.locale);

        var logo = fd.get('logo');
        var colors = fd.get('brand_colors');
        if (colors) {
            try { sess.draft.brand_colors = JSON.parse(String(colors)); } catch (e) { /* ignore */ }
        }
        if (logo && logo.size > 0) {
            sess.draft.logo_file = logo.name || 'logo.png';
        }
        pushMsg(sess, 'user', String(message || (pack.acks || {}).logo_uploaded_msg || ''));

        // v6.1 WHERE_BUS turn: visual feedback + quick preview bundle + next beat
        var doneStep = STEP_BY_FIELD['where_bus.upload'];
        var next = currentStep(sess);
        var out;
        if (!next) {
            out = buildSummaryResponse(pack, sess, doneStep);
        } else {
            out = buildQuestionResponse(pack, sess, doneStep);
        }
        return out;
    }

    // ============================================================
    // 6. Generate — 2 mockup directions (FIXTURE_RESPONSE shape)
    // ============================================================
    // Private QA receives model mockups, not artwork for a vehicle template.
    // Until the new logo zones pass review, the UI shows labelled examples only.
    var GEN_API_URL = '/api/v1/generate-art';
    var LS_VISITOR_TOKEN = 'inspire-visitor-token';
    var LS_GEN_USED = 'inspire-generate-used';
    var LS_GEN_IDEM = 'inspire-generate-idem';
    var VISITOR_TOKEN_RE = /^[a-zA-Z0-9_-]{16,128}$/;

    function fallbackUuid() {
        var bytes = new Uint8Array(16);
        if (window.crypto && window.crypto.getRandomValues) {
            window.crypto.getRandomValues(bytes);
        } else {
            for (var i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
        }
        var hex = '';
        for (var j = 0; j < 16; j++) hex += ('0' + bytes[j].toString(16)).slice(-2);
        return hex; // 32 hex chars — matches VISITOR_TOKEN_RE
    }

    /** Server-enforced visitor token (regex-checked here too). */
    function getVisitorToken() {
        var tok = '';
        try { tok = String(localStorage.getItem(LS_VISITOR_TOKEN) || ''); } catch (e) { /* storage off */ }
        if (VISITOR_TOKEN_RE.test(tok)) return tok;
        tok = (window.crypto && typeof window.crypto.randomUUID === 'function')
            ? window.crypto.randomUUID()
            : fallbackUuid();
        if (!VISITOR_TOKEN_RE.test(tok)) tok = fallbackUuid();
        try { localStorage.setItem(LS_VISITOR_TOKEN, tok); } catch (e) { /* ignore */ }
        return tok;
    }

    function isGenerateUsed() {
        try { return localStorage.getItem(LS_GEN_USED) === '1'; } catch (e) { return false; }
    }

    function markGenerateUsed() {
        try {
            localStorage.setItem(LS_GEN_USED, '1');
            localStorage.removeItem(LS_GEN_IDEM);
        } catch (e) { /* ignore */ }
    }

    /** Idempotency-Key (api-standard §2): reused across retries of one action. */
    function getIdempotencyKey() {
        var key = '';
        try { key = String(localStorage.getItem(LS_GEN_IDEM) || ''); } catch (e) { /* ignore */ }
        if (VISITOR_TOKEN_RE.test(key)) return key;
        key = (window.crypto && typeof window.crypto.randomUUID === 'function')
            ? window.crypto.randomUUID()
            : fallbackUuid();
        try { localStorage.setItem(LS_GEN_IDEM, key); } catch (e) { /* ignore */ }
        return key;
    }

    function clearIdempotencyKey() {
        try { localStorage.removeItem(LS_GEN_IDEM); } catch (e) { /* ignore */ }
    }

    // --- vehicle / panel mapping (panel-map.json ids → Step A contract) -----
    function vehicleTypeForApi(vehicle) {
        var map = {
            caddy: 'compact van',
            bus_l: 'medium van',
            bus_xl: 'large van',
            passenger: 'passenger car'
        };
        return map[vehicle] || 'medium van';
    }

    // --- honest loading + labelling (never pretend examples are generated) --
    var NOTE_FALLBACK = 'Demo-voorbeeld — live generatie was niet beschikbaar.';
    var NOTE_QUOTA = 'Je hebt je gratis generatie al gebruikt.';
    var NOTE_DAILY = 'De dagelijkse gratis generatielimiet is bereikt — probeer het morgen opnieuw.';
    var CHAT_FALLBACK = '<strong>Demo-voorbeeld.</strong> Live generatie was niet beschikbaar — ' +
        'de mock-ups hieronder zijn kant-en-klare voorbeelden, niet gegenereerd uit jouw logo.';

    function setGenProgress(text) {
        var el = document.getElementById('da-prog-text');
        if (el) el.textContent = text;
    }

    function appendChatNote(html) {
        var body = document.getElementById('da-chat-body');
        if (!body) return;
        var div = document.createElement('div');
        div.className = 'da-msg da-msg--bot';
        div.innerHTML = html;
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
    }

    function appendResultsNote(text) {
        var results = document.getElementById('da-results');
        if (!results || document.getElementById('da-gen-note')) return;
        var div = document.createElement('p');
        div.id = 'da-gen-note';
        div.setAttribute('role', 'note');
        div.style.cssText = 'margin:16px 0 0;padding:10px 12px;border:1px solid var(--zzp-border-default,#2a2a32);' +
            'border-radius:2px;color:var(--zzp-text-secondary,#9ca3af);font-size:.8125rem;line-height:1.5';
        div.textContent = text;
        results.appendChild(div);
    }

    /** Label fallback examples honestly — notes land after the results UI paints. */
    function labelFallback(fixture, noteText, chatHtml) {
        fixture.notice = 'Demo-voorbeelden — niet jouw ontwerp. ' + noteText;
        setTimeout(function () {
            appendResultsNote(noteText);
            appendChatNote(chatHtml);
        }, 450);
        return fixture;
    }

    function brandColorsFromFd(fd, draft) {
        var colors = [];
        try { colors = JSON.parse(String(fd.get('brand_colors') || '[]')) || []; } catch (e) { colors = []; }
        if (!Array.isArray(colors) || !colors.length) {
            colors = (draft && draft.brand_colors) || [];
        }
        return Array.isArray(colors) ? colors : [];
    }

    function callGenerateArt(payload) {
        var fetchFn = origFetch || window.fetch;
        return fetchFn(GEN_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Idempotency-Key': getIdempotencyKey()
            },
            body: JSON.stringify(payload),
            cache: 'no-store'
        }).then(function (res) {
            return res.json().catch(function () { return {}; }).then(function (body) {
                return { status: res.status, ok: res.ok, body: body };
            });
        });
    }

    /** Provider image (base64|url) → HTMLImageElement (canvas-safe, untainted). */
    /** Async orchestrator — always RESOLVES with the FIXTURE_RESPONSE shape. */
    function handleGenerate(sess, fd) {
        var draft = sess ? sess.draft : {};
        var vehicle = normalizeVehicle(fd.get('vehicle') || (draft.vehicle ? draft.vehicle.id : 'caddy'));
        var fixture = fixtureGenerate(sess, fd, vehicle);
        var colors = brandColorsFromFd(fd, draft);
        if (!normalizeVehicle(draft.vehicle?.id)) return Promise.reject(new Error('Kies eerst een ondersteunde voertuigklasse.'));
        // Visitor limit (client mirror of the server VISITOR_LIMIT) — skip the
        // API entirely, show the honest message + labelled fallback examples.
        if (isGenerateUsed()) {
            return Promise.resolve(labelFallback(fixture, NOTE_QUOTA,
                '<strong>' + NOTE_QUOTA + '</strong> Hieronder staan demo-voorbeelden — geen verse generatie.'));
        }

        setGenProgress('Maketten voorbereiden…');
        var payload = {
            visitorToken: getVisitorToken(),
            vehicleType: vehicleTypeForApi(vehicle)
        };
        if (colors.length) payload.brandColors = colors.slice(0, 5);
        payload.exposure = draft.exposure?.id;
        payload.impression = draft.impression?.id;
        payload.businessType = String(fd.get('branche') || (draft.branche ? draft.branche.id : '') || '');

        return callGenerateArt(payload)
            .then(function (res) {
                var err = (res.body && res.body.error) || {};
                if (res.status === 429 || err.code === 'QUOTA_EXCEEDED') {
                    // Visitor limit = "already used"; daily cap = try tomorrow.
                    var visitorLimit = /already used/i.test(String(err.message || ''));
                    if (visitorLimit) markGenerateUsed();
                    clearIdempotencyKey();
                    var note = /budget paused/i.test(err.message || '') ? 'Het beeldbudget is gepauzeerd voor beoordeling.' : visitorLimit ? NOTE_QUOTA : NOTE_DAILY;
                    return labelFallback(fixture, note,
                        '<strong>' + note + '</strong> Hieronder staan demo-voorbeelden — geen verse generatie.');
                }
                if (res.status === 409 || err.code === 'CONFLICT') {
                    // Idempotent retry — this generation was already submitted.
                    markGenerateUsed();
                    clearIdempotencyKey();
                    return labelFallback(fixture, NOTE_QUOTA,
                        '<strong>' + NOTE_QUOTA + '</strong> Hieronder staan demo-voorbeelden — geen verse generatie.');
                }
                if (!res.ok || !res.body || res.body.success !== true) {
                    return labelFallback(fixture, NOTE_FALLBACK, CHAT_FALLBACK);
                }
                markGenerateUsed(); clearIdempotencyKey();
                const data = res.body.data;
                if (!data || data.imageKind !== 'vehicle-mockup' || !['openai','cf-flux'].includes(data.provider)) throw new Error('Onbekende beeldbron');
                const contact = draft.cta?.id === 'telefoon' ? fd.get('telefoon') : draft.cta?.id === 'website' ? fd.get('website') : '';
                return window.MockupComposer.compose(data.images, fd.get('logo'), vehicle, String(contact || '').slice(0,80)).then(compositions => {
                    fixture.mockups.forEach((m,i)=>Object.assign(m,compositions[i]));
                    fixture.notice = data.provider === 'cf-flux'
                        ? 'FLUX-indelingstest — geen definitief klantontwerp.'
                        : 'AI-concept op basis van je briefing · origineel logo en bevestigd contact lokaal toegevoegd.';
                    return fixture;
                }).catch(()=>labelFallback(fixture,'Plaatsing niet goedgekeurd of bronbeeld onleesbaar.',CHAT_FALLBACK));
            })
            .catch(function () {
                // Network / CORS / parse failure — honest fallback, no pretending.
                return labelFallback(fixture, NOTE_FALLBACK, CHAT_FALLBACK);
            });
    }

    /** Today's pre-baked examples (the known product flaw) — fallback ONLY. */
    function fixtureGenerate(sess, fd, vehicle) {
        var draft = sess ? sess.draft : {};
        var imgs = mockupImages(vehicle);
        const label = k => draft[k]?.label || 'Nog te bevestigen';
        const branch = String(draft.branche?.id || '');
        const language = /elektr|installatie/i.test(branch) ? 'Parallelle lijnen verwijzen naar technisch precisiewerk.' : /loodgiet|hydraul/i.test(branch) ? 'Een doorlopende curve begeleidt het oog langs de flank.' : /bouw|schilder/i.test(branch) ? 'Brede kleurvlakken blijven herkenbaar zonder een lijst van klussen.' : /schoon|clean/i.test(branch) ? 'Een rustig licht vlak geeft het merk ademruimte.' : 'Eén herkenbaar accent houdt de merkidentiteit centraal.';
        const palette = (draft.brand_colors || []).slice(0,3);
        const colorReason = palette.length ? ' Gebruik '+palette[0]+' uit het logo als herkenningskleur; laat de vormgever de folie op staal vergelijken.' : ' Zonder bevestigd kleurstaal is de neutrale paletkeuze voorlopig.';
        const situation = draft.exposure?.id === 'parked' ? 'Bij een stilstaande auto kan de kijker het contactgegeven rustig lezen.' : draft.exposure?.id === 'moving' ? 'In het verkeer is de kijktijd kort: laat de vormgever de boodschap testen als miniatuur.' : 'Ontwerp voor een korte blik in het verkeer en controleer het contactgegeven daarna op de geparkeerde auto.';
        const plan = creativeDecision(draft);
        const advice = situation + ' ' + plan.priority + ' Test de leesbaarheid van het originele logo op vijf meter; schrap details die dan wegvallen.' + colorReason;
        const brief = [
            'ONTWERPBRIEF · VOERTUIGWRAPPING',
            'Beide richtingen zijn concepten voor dezelfde wrap en hetzelfde voertuig.',
            'Weglaten: overige diensten en extra contactacties.',
            '',
            'FEITEN UIT DE BRIEFING',
            'Bedrijf: ' + label('bedrijfsnaam'),
            'Branche: ' + label('branche'),
            'Doelgroep: ' + label('doelgroep'),
            'Zichtmoment: ' + label('exposure'),
            'Dienst: ' + label('diensten'),
            ...(needsFocus(draft) && draft.focus?.label ? ['Gewenste opdracht: ' + draft.focus.label] : []),
            'Regio: ' + label('regio'),
            'Voertuig: ' + label('vehicle') + ' · ' + label('vehicle_usage'),
            'Gewenste indruk: ' + label('impression'),
            'CTA: ' + label('cta'),
            'Gekozen contactgegeven: ' + ((draft.cta?.id === 'telefoon' ? draft.telefoon?.label : draft.cta?.id === 'website' ? draft.website?.label : '') || 'Niet opgegeven'),
            'Budget voor offerte: ' + label('budget') + ' · ' + label('flex'),
            'Logo: ' + (draft.logo_file || 'Nog te bevestigen'),
            'Merkkleuren: ' + ((draft.brand_colors || []).join(', ') || 'Nog te bevestigen'),
            '',
            'NOG TE CONTROLEREN',
            'Vóór productie: meet deur en naden, controleer contactgegevens, folie en kleur op staal.'
        ];
        if (draft.vehicle_usage?.id==='lease') brief.push('Toestemming voor wrapping nog te bevestigen.');
        return {
            brief_id: 'inspire-wrap',
            engine_mode: 'inspirationOnly',
            recommended_products: [],
            advice: 'Ons advies: ' + plan.name + '. ' + plan.reason + ' ' + plan.trade + ' ' + advice,
            recommended_direction: plan.direction,
            recommendation_reason: plan.reason,
            headline: plan.headline,
            message_hierarchy: plan.priority,
            brief: brief.join('\n'),
            mockups: [
                {
                    variant: 'standard', direction: 'A', recommended: plan.direction === 'A', sku: 'wrap-rustig',
                    label_nl: 'Richting A' + (plan.direction === 'A' ? ' · INSPIRE beveelt aan' : ''),
                    naam: 'Rustig en helder', url: imgs.strak,
                    headline: plan.headline, hierarchy: plan.priority,
                    reason_nl: language + ' Eén hoofdvlak geeft ' + label('diensten') + ' voorrang boven extra details.'
                },
                {
                    variant: 'premium', direction: 'B', recommended: plan.direction === 'B', sku: 'wrap-krachtig',
                    label_nl: 'Richting B' + (plan.direction === 'B' ? ' · INSPIRE beveelt aan' : ''),
                    naam: 'Krachtig en opvallend', url: imgs.opvallend,
                    headline: plan.headline, hierarchy: plan.priority,
                    reason_nl: language + ' Contrasterende banen trekken eerder aandacht; houd de boodschap kort voor ' + label('doelgroep') + '.'
                }
            ]
        };
    }

    // ============================================================
    // 7. Session restore payload (GET /chat/<session_id>)
    // ============================================================
    function sessionPayload(sess) {
        var pack = packFor(sess.locale);
        var step = currentStep(sess);
        var last = '';
        for (var i = sess.messages.length - 1; i >= 0; i--) {
            if (sess.messages[i].role === 'assistant') { last = sess.messages[i].content; break; }
        }
        return {
            session_id: sess.id,
            locale: sess.locale,
            reply: last,
            brief_partial: flatBrief(sess),
            phase: step ? step.stap : 7,
            stap: step ? step.stap : 7,
            stap_label: step ? ((pack.stap_labels || {})[String(step.stap)] || '') : ((pack.stap_labels || {})['7'] || ''),
            quick_replies: step && step.chips ? chipOptions(pack, step.chips) : [],
            quick_reply_field: step ? (step.chips || step.field) : '',
            ready_to_generate: sess.summaryReached,
            brief_confirmed: false,
            missing_fields: [],
            logo_reupload_required: !!sess.draft.logo_file,
            messages_tail: sess.messages.slice(-10)
        };
    }

    // ============================================================
    // 8. DEMO STOP modal (wizard demo-boot.js pattern)
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
        // Nothing was sent — settle the pending offerte request through the
        // original failure path (finally-block re-enables the submit button
        // and clears state.busy so the rest of the demo keeps working).
        settleOfferteAsNotSent();
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
    // 9. REST stubs (fg-design-agent-api.php route contract)
    // ============================================================
    function jsonResp(payload, status) {
        return Promise.resolve(new Response(JSON.stringify(payload), {
            status: status || 200,
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }));
    }

    /** The order stops here: no e-mail is sent. The promise settles only when
     *  the demo modal is closed — through the original failure path (empty
     *  detail => dtp-design-agent.js shows its own generic error text and its
     *  finally-block re-enables the form and clears state.busy), so the chat,
     *  the language toggle and the offerte form stay fully interactive. */
    var pendingOfferteResolve = null;

    function offerteStopsHere() {
        return new Promise(function (resolve) {
            pendingOfferteResolve = resolve;
        });
    }

    function settleOfferteAsNotSent() {
        if (!pendingOfferteResolve) return;
        var settle = pendingOfferteResolve;
        pendingOfferteResolve = null;
        settle(new Response(JSON.stringify({ detail: '' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }));
    }

    function handleApi(url, init) {
        var method = ((init && init.method) || 'GET').toUpperCase();

        // POST /offerte-request -> DEMO STOP
        if (/design-agent\/offerte-request/.test(url)) {
            showDemoStopModal();
            return offerteStopsHere();
        }

        // GET /chat/opening
        if (/design-agent\/chat\/opening/.test(url)) {
            var qs = new URL(url, window.location.href).searchParams;
            var locale = qs.get('locale') || 'nl-NL';
            return packsReady.then(function () {
                var pack = packFor(locale);
                var sess = newSession(locale);
                var reply = openingReply(pack, locale);
                pushMsg(sess, 'assistant', reply);
                var out = baseResponse(sess);
                out.reply = reply;
                out.stap = 1;
                out.phase = 1;
                out.stap_label = (pack.stap_labels || {})['1'] || '';
                out.quick_replies = [];
                out.quick_reply_field = 'company.bedrijfsnaam';
                persistSessions();
                return jsonResp(out);
            });
        }

        // POST /chat/turn (multipart: logo / vehicle_photo / brand_colors)
        if (/design-agent\/chat\/turn/.test(url)) {
            return packsReady.then(function () {
                var fd = (init && init.body) ? init.body : new FormData();
                var sid = String(fd.get('session_id') || '');
                var sess = sessions[sid] || newSession(String(fd.get('locale') || 'nl-NL'));
                var outTurn = handleTurnForm(sess, fd);
                persistSessions();
                return jsonResp(outTurn);
            });
        }

        // GET|DELETE /chat/<session_id>
        var sessMatch = url.match(/design-agent\/chat\/([A-Za-z0-9\-]+)$/);
        if (sessMatch) {
            var sessId = decodeURIComponent(sessMatch[1]);
            if (method === 'DELETE') {
                delete sessions[sessId];
                persistSessions();
                return jsonResp({ ok: true });
            }
            return packsReady.then(function () {
                var sess = sessions[sessId];
                if (!sess) return jsonResp({ detail: 'Sessie niet gevonden.' }, 404);
                return jsonResp(sessionPayload(sess));
            });
        }

        // POST /generate (multipart brief + logo) — Step B: async hybrid
        // generation (real /api/v1/generate-art + mechanical composition;
        // always resolves with the FIXTURE_RESPONSE shape).
        if (/design-agent\/generate/.test(url)) {
            return packsReady.then(function () {
                var fd = (init && init.body) ? init.body : new FormData();
                var sid = String(fd.get('session_id') || '');
                var sess = sessions[sid] || null;
                return handleGenerate(sess, fd).then(function (payload) {
                    persistSessions();
                    return jsonResp(payload);
                });
            });
        }

        // POST /chat (JSON turn)
        if (/design-agent\/chat\/?$/.test(url)) {
            return packsReady.then(function () {
                var body = {};
                try { body = JSON.parse((init && init.body) || '{}') || {}; } catch (e) { body = {}; }
                var sess = sessions[body.session_id || ''] || newSession(body.locale || 'nl-NL');
                var outChat = handleChatBody(sess, body);
                persistSessions();
                return jsonResp(outChat);
            });
        }

        // Unknown design-agent route: mirror the proxy error shape
        return jsonResp({ detail: 'Design Agent API niet bereikbaar.' }, 503);
    }

    var origFetch = window.fetch ? window.fetch.bind(window) : null;
    window.fetch = function (input, init) {
        var url = '';
        try {
            url = (typeof input === 'string') ? input : (input && input.url) || '';
        } catch (e) { /* Request not inspectable — pass through */ }

        if (/design-agent/.test(url)) {
            return handleApi(url, init);
        }
        return origFetch(input, init);
    };

    // ============================================================
    // 10. Missing-image fallback (same pipeline as the wizard demo)
    // ============================================================
    window.addEventListener('error', function (event) {
        const img=event.target;
        if (img instanceof HTMLImageElement && img.closest('#da-results')) {
            const notice=document.createElement('p'); notice.textContent='Beeld niet beschikbaar — geen vervangende weergave.';
            img.replaceWith(notice);
        }
    }, true);
})();
