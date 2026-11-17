/**
 * ==========================================
 * ZZPACKAGE INSPIRE — STATIC DEMO BOOT LAYER
 * ==========================================
 *
 * Faithful client-side re-implementation of the Design Agent backend that
 * dtp-design-agent.js talks to through the WP REST proxy
 * (inc/integrations/fg-design-agent-api.php → jadzia-core), so the ORIGINAL
 * dtp-design-agent.js runs unmodified against static files.
 *
 * Stubbed endpoints (same contract as fg_design_agent_register_routes()):
 *   - GET  wp-json/fg/v1/design-agent/chat/opening      -> opening + first question
 *   - POST wp-json/fg/v1/design-agent/chat              -> question turn (JSON)
 *   - POST wp-json/fg/v1/design-agent/chat/turn         -> logo/photo turn (multipart)
 *   - GET  wp-json/fg/v1/design-agent/chat/<session_id> -> session restore
 *   - POST wp-json/fg/v1/design-agent/generate          -> 2 mockup directions
 *   - POST wp-json/fg/v1/design-agent/offerte-request   -> DEMO STOP (modal)
 *
 * All chat copy comes verbatim from the INSPIRE engine's own language packs
 * (flexgrafik-inspire / brain/i18n/chat/{nl-NL,pl-PL,en-GB}.json — copied to
 * data/i18n/chat/). Question order follows engine/v4/intake/state.py
 * PHASE_FIELDS + chat_bridge.STAP_TO_LEGACY_PHASE. Proposal/reason strings
 * come from engine/v4/intake/agency_copy.py (format_agency_proposal),
 * engine/v4/recommendation/recommend.py (reason_nl / budget_note_nl) and
 * brain/trust-pack.json. The 2 output directions are the page's own
 * "Standard — Magneten €149 / Premium — Wrap €399" (product-ladder.json /
 * brain/tier-matrix.json) with the real mockup-example renders
 * (assets/images/mockup-examples/).
 *
 * DEMO STOP (the only behavioural change): the offerte-request e-mail POST is
 * replaced by a demo modal. Everything before it — the full chat, logo upload,
 * briefing card, mockup generation, direction choice and offerte validation —
 * is the original code path.
 */
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
        allowResultsFixture: true,
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
    // brain/product-ladder.json (tripwire MA-005 "Startpakket Magneten" €149,
    // bestseller NA-WRAP-BASIC bundle €399) + brain/tier-matrix.json
    // (NA-WRAP-BASIC price_suggested 399) + page-voertuigreclame-ontwerp.php
    // ("Standard — Magneten" €149 / "Premium — Wrap" €399).
    var STD_PRODUCT = {
        sku: 'MA-005',
        name: 'Startpakket Magneten',        // brain/product-ladder.json tripwire.name
        cardNaam: 'Magneten',                // page card "Standard — Magneten"
        price: 149,
        label: 'Standard'
    };
    var PREM_PRODUCT = {
        sku: 'NA-WRAP-BASIC',
        name: 'Partial Wrap Basis',          // product-master-table / product-route-matrix name_nl
        cardNaam: 'Wrap',                    // page card "Premium — Wrap"
        price: 399,
        label: 'Premium'
    };
    var ADDON_PRODUCT = {
        sku: 'DF-004',
        naam: 'Voertuigreclame ontwerp + drukbestand', // theme FIXTURE_RESPONSE naam
        price_suggested: 199
    };

    // engine/v4/recommendation/recommend.py — real reason_nl / budget_note_nl strings
    var REASON_STANDARD_MAGNET =
        'Omdat flexibiliteit of een lager instapbudget belangrijk is, is magnetisch de veiligste Standard-route.';
    var REASON_PREMIUM_BASIS =
        'Dit laat zien wat extra wrap-elementen doen voor merkuitstraling.';
    var REASON_PREMIUM_PRO =
        'Dit geeft duidelijk meer aanwezigheid en voelt als professioneel ontworpen wrap.';
    var REASON_PREMIUM_MAX =
        'Dit maakt van de auto een maximale rijdende merkdrager.';
    var BUDGET_NOTE_GROWTH =
        'Dit is waarschijnlijk boven je huidige richtbudget; zie het als groeirichting.';

    // engine/v4/intake/agency_copy.py format_agency_proposal — real headers
    var PROPOSAL_HEADER = {
        'nl-NL': 'Mijn voorstel uit de Wizard (op basis van jouw feiten):',
        'pl-PL': 'Moja propozycja z Wizarda (na podstawie faktów):',
        'en-GB': 'My Wizard proposal (based on your facts):'
    };

    // brain/trust-pack.json (inject_trust_snippet / _pick_portfolio data)
    var TRUST_PACK = {
        reviews: { count: 127, score: 4.8 },
        portfolio: [
            { id: 'schilder-janssen', branche: 'bouw', quote: 'Binnen 2 weken geregeld, veel bekijks in wijk' },
            { id: 'mimaki', branche: 'bouw' },
            { id: 'quietforge', branche: 'it' }
        ]
    };

    // engine/v4/intake/visual_analyzer.py analyze_logo()/feedback_sentence() —
    // rule-based contrast feedback; recomputed here from the client-extracted
    // brand colours the original JS already sends along with the logo upload.
    var VISUAL_REC = {
        lowLight: 'Op wit valt rood/licht weg — zet ik zwart vlak achter voor contrast.',
        low: 'Laag contrast op buskleur — donker vlak achter logo voor leesbaarheid.',
        medium: 'Contrast ok — finetune achter logo voor 5m leesbaarheid.',
        high: 'Logo knalt al — houd vlak compact zodat telefoon ook past.'
    };

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
        { key: 'impression', field: 'marketing.desired_impression', stap: 3, chips: 'marketing.desired_impression' },
        { key: 'cta', field: 'marketing.primary_cta', stap: 4, chips: 'marketing.primary_cta' },
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

    var STORE_KEY = 'demoDaSessions';

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
        if (step.upload) return !!(d.logo_file || d.logo_rescue_picked);
        return !!d[step.key];
    }

    function currentStep(sess) {
        for (var i = 0; i < FLOW.length; i++) {
            if (!stepDone(sess, FLOW[i])) return FLOW[i];
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

    function openingReply(pack) {
        return pack.opening + '\n\n' + fq(pack, 'company.bedrijfsnaam');
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
            ackText = feedbackSentence(sess) + '\n\n' + ack(pack, 'quick_preview_intro_v61');
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
    function premiumReason(draft) {
        var b = draft.budget ? draft.budget.id : '';
        var imp = draft.impression ? draft.impression.id : '';
        if (b === '1000_plus') return REASON_PREMIUM_MAX;
        if (b === '600_1000') return REASON_PREMIUM_PRO;
        if (b === '300_600') return REASON_PREMIUM_BASIS;
        return (imp === 'premium' || imp === 'opvallend' || imp === 'stoer')
            ? REASON_PREMIUM_PRO
            : REASON_PREMIUM_BASIS;
    }

    function premiumGrowth(draft) {
        var b = draft.budget ? draft.budget.id : '';
        return (b === 'tot_150' || b === '150_300' || b === 'weet_ik_niet' || !b);
    }

    function budgetNote(draft) {
        return premiumGrowth(draft) ? BUDGET_NOTE_GROWTH : '';
    }

    // agency_copy._branche_key — branche id → trust-pack pool key
    function brancheKey(branche) {
        var raw = String(branche || 'anders').trim().toLowerCase();
        var aliases = {
            elektra: 'it', installatie: 'it', bouw: 'bouw', schilder: 'bouw',
            schoonmaak: 'bouw', horeca: 'bouw', it: 'it', anders: 'bouw'
        };
        if (aliases[raw]) return aliases[raw];
        return raw.split('_')[0];
    }

    // agency_copy._pick_portfolio — deterministic pick (sha256(key)[:8] % len).
    // The engine's sha256 results are precomputed here for the reachable
    // branche keys (all chip ids map to 'it' or 'bouw' via _branche_key):
    //   sha256('bouw')[:8] = a46f2d29 -> 2765473065 % 2 = 1 -> mimaki
    //   'it' -> pool of 1 -> quietforge
    // Unknown free-text branche keys fall back to pool[0].
    var PORTFOLIO_PICK = { bouw: 1, it: 0 };

    function pickPortfolio(branche) {
        var key = brancheKey(branche);
        var items = TRUST_PACK.portfolio;
        var matched = items.filter(function (p) {
            return String(p.branche || '').toLowerCase().indexOf(key) >= 0;
        });
        var pool = matched.length ? matched : items;
        if (pool.length === 1) return pool[0];
        var idx = PORTFOLIO_PICK[key];
        if (idx == null || idx >= pool.length) idx = 0;
        return pool[idx];
    }

    function pidOf(item) {
        return String(item.id || '').split('-').map(function (w) {
            return w.charAt(0).toUpperCase() + w.slice(1);
        }).join(' ');
    }

    function injectTrustSnippet(item, locale) {
        var count = TRUST_PACK.reviews.count;
        var score = TRUST_PACK.reviews.score;
        var quote = String(item.quote || '').trim();
        var pid = pidOf(item);
        if (locale === 'pl-PL') {
            var basePl = count + ' ZZP już nam zaufało · ' + score + '★ Google';
            return quote ? basePl + ' — jak ' + pid + ': „' + quote + '”' : basePl;
        }
        if (locale === 'en-GB') {
            var baseEn = count + ' sole traders went before you · ' + score + '★ Google';
            return quote ? baseEn + ' — like ' + pid + ': "' + quote + '"' : baseEn;
        }
        var base = count + ' ZZP gingen je voor · ' + score + '★ Google';
        return quote ? base + ' — net als voor ' + pid + ': „' + quote + '”' : base;
    }

    function proposalText(pack, sess, locale) {
        var chrome = pack.chrome || {};
        var stdLabel = chrome.standard_label || 'Standard — Slim zichtbaar starten';
        var premLabel = chrome.premium_label || 'Premium — Maximale merkuitstraling';
        var growth = chrome.premium_growth || 'groeirichting';
        var header = PROPOSAL_HEADER[locale] || PROPOSAL_HEADER['nl-NL'];

        var stdLine = '**' + stdLabel + ':** ' + STD_PRODUCT.name + ' — vanaf €' +
            STD_PRODUCT.price + '. ' + REASON_STANDARD_MAGNET;
        var premLine;
        if (premiumGrowth(sess.draft)) {
            premLine = '**' + premLabel + '** (' + growth + '): ' + PREM_PRODUCT.name + ' — vanaf €' +
                PREM_PRODUCT.price + '. ' + premiumReason(sess.draft) + ' ' + budgetNote(sess.draft);
        } else {
            premLine = '**' + premLabel + ':** ' + PREM_PRODUCT.name + ' — vanaf €' +
                PREM_PRODUCT.price + '. ' + premiumReason(sess.draft);
        }

        var item = pickPortfolio(sess.draft.branche ? sess.draft.branche.id : '');
        var pid = pidOf(item);
        var q = String(item.quote || '').trim();
        var portfolioLine = '';
        if (item.id) {
            if (locale === 'pl-PL') {
                portfolioLine = '\n\nJak u **' + pid + '**' + (q ? ' — ' + q : '') + '.';
            } else if (locale === 'en-GB') {
                portfolioLine = '\n\nLike **' + pid + '**' + (q ? ' — "' + q + '"' : '') + '.';
            } else {
                portfolioLine = '\n\nNet als voor **' + pid + '**' + (q ? ' — ' + q : '') + '.';
            }
        }

        var trust = injectTrustSnippet(item, locale);
        return header + '\n\n- ' + stdLine + '\n- ' + premLine + portfolioLine + '\n\n_' + trust + '_';
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
        if (d.telefoon) b.telefoon = d.telefoon.id;
        if (d.website) b.website = d.website.id;
        if (d.slogan) b.slogan = d.slogan.id;
        if (d.budget) b.budget_range = d.budget.id;
        if (d.flex) b.budget_flexibility = d.flex.id;
        if (d.brand_colors && d.brand_colors.length) b.brand_colors = d.brand_colors;
        if (sess.budgetExplicit) b._budget_explicit = true;
        if (d.logo_file) b.logo_file = d.logo_file;
        if (sess.summaryReached) {
            b.mockup_b_sku = STD_PRODUCT.sku;
            b.mockup_a_sku = PREM_PRODUCT.sku;
        }
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
        return 'caddy'; // engine/v4/recommendation/recommend.py _vehicle_key: other → caddy
    }

    function mockupImages(vehicle) {
        var v = normalizeVehicle(vehicle);
        return {
            strak: MOCKUP_DIR + 'mockup-' + v + '-strak.png',
            opvallend: MOCKUP_DIR + 'mockup-' + v + '-opvallend.png'
        };
    }

    // visual_analyzer.analyze_logo() + feedback_sentence() — rule-based
    function feedbackSentence(sess) {
        var colors = sess.draft.brand_colors || [];
        var rgb = [0, 159, 227]; // engine default fallback colour
        if (colors.length && /^#[0-9a-fA-F]{6}$/.test(colors[0])) {
            rgb = [
                parseInt(colors[0].substr(1, 2), 16),
                parseInt(colors[0].substr(3, 2), 16),
                parseInt(colors[0].substr(5, 2), 16)
            ];
        }
        var lum = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]; // _luminance()
        var vLum = 240; // vehicle colour "wit" (analyze_logo default)
        var diff = Math.abs(lum - vLum);
        var rec, head;
        if (diff < 40) {
            rec = (rgb[0] > 180) ? VISUAL_REC.lowLight : VISUAL_REC.low;
            head = 'Zie hem — wit bus, logo valt weg in zon. ';
        } else if (diff < 90) {
            rec = VISUAL_REC.medium;
            head = 'Zie hem — wit bus. ';
        } else {
            rec = VISUAL_REC.high;
            head = 'Zie hem — wit bus. ';
        }
        return head + rec;
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

    function isNoLogoIntent(text) {
        var t = String(text || '').toLowerCase();
        return (/geen/.test(t) && /logo/.test(t)) ||
            (/no logo/.test(t) || /don.?t have/.test(t) || /without logo/.test(t)) ||
            (/nie mam/.test(t) || /brak logo/.test(t));
    }

    function buildRescueResponse(pack, sess) {
        var reply = ack(pack, 'no_logo_rescue_v61') + '\n\n' + ack(pack, 'logo_rescue_pick');
        pushMsg(sess, 'assistant', reply);
        var out = baseResponse(sess);
        out.reply = reply;
        out.stap = 5;
        out.phase = 5;
        out.stap_label = (pack.stap_labels || {})['5'] || '';
        out.quick_replies = chipOptions(pack, 'brand_assets.logo_rescue_pick');
        out.quick_reply_field = 'brand_assets.logo_rescue_pick';
        out.quick_previews = [
            'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="80">' +
                '<rect width="240" height="80" fill="#101014"/>' +
                '<text x="120" y="48" fill="#e4e4e7" font-family="Arial" font-size="26" font-weight="700" text-anchor="middle">' +
                escapeHtml(String(sess.draft.bedrijfsnaam ? sess.draft.bedrijfsnaam.id : 'Logo').slice(0, 14)) +
                '</text></svg>')
        ];
        return out;
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
                'marketing.slogan': 'slogan', 'budget.range': 'budget',
                'budget.flexibility': 'flex', 'brand_assets.brand_colors': 'brand_colors'
            };
            Object.keys(body.field_updates).forEach(function (k) {
                var v = body.field_updates[k];
                if (map[k] === 'brand_colors') {
                    sess.draft.brand_colors = Array.isArray(v) ? v : [];
                } else if (map[k] && v != null && v !== '') {
                    var lbl = chipLabel(pack, k, v);
                    sess.draft[map[k]] = { id: String(v), label: lbl };
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
            if (field === 'brand_assets.logo_rescue_pick') {
                // orchestrator_v61._handle_logo_rescue_pick — typo direction picked
                sess.draft.logo_rescue_picked = body.quick_reply_id;
                sess.draft.logo_file = 'typo-' + body.quick_reply_id + '.png';
                var outRescue = advance(pack, sess, STEP_BY_FIELD['where_bus.upload']);
                var imgsRescue = mockupImages(sess.draft.vehicle ? sess.draft.vehicle.id : 'caddy');
                outRescue.quick_previews = [imgsRescue.strak, imgsRescue.opvallend, SHARED_IMAGES_DIR + 'MA-005.png'];
                return outRescue;
            }
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
            if (isNoLogoIntent(text)) return buildRescueResponse(pack, sess);
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
        var quick = [];
        if (sess.draft.vehicle || logo) {
            var imgs = mockupImages(sess.draft.vehicle ? sess.draft.vehicle.id : 'caddy');
            quick = [imgs.strak, imgs.opvallend, SHARED_IMAGES_DIR + 'MA-005.png'];
        }
        var out;
        if (!next) {
            out = buildSummaryResponse(pack, sess, doneStep);
        } else {
            out = buildQuestionResponse(pack, sess, doneStep);
        }
        if (quick.length) out.quick_previews = quick;
        return out;
    }

    // ============================================================
    // 6. Generate — 2 mockup directions (FIXTURE_RESPONSE shape)
    // ============================================================
    function handleGenerate(sess, fd) {
        var draft = sess ? sess.draft : {};
        var vehicle = normalizeVehicle(fd.get('vehicle') || (draft.vehicle ? draft.vehicle.id : 'caddy'));
        var imgs = mockupImages(vehicle);
        var note = budgetNote(draft);
        var mockups = [
            {
                variant: 'standard',
                panel: 'side',
                url: imgs.strak,
                sku: STD_PRODUCT.sku,
                naam: STD_PRODUCT.cardNaam,
                price_suggested: STD_PRODUCT.price,
                label_nl: STD_PRODUCT.label,
                reason_nl: REASON_STANDARD_MAGNET
            },
            {
                variant: 'premium',
                panel: 'side',
                url: imgs.opvallend,
                sku: PREM_PRODUCT.sku,
                naam: PREM_PRODUCT.cardNaam,
                price_suggested: PREM_PRODUCT.price,
                label_nl: PREM_PRODUCT.label,
                reason_nl: premiumReason(draft)
            }
        ];
        if (note) mockups[1].budget_note_nl = note;
        return {
            brief_id: 'demo-inspire-v2',
            engine_mode: 'inspirationOnly',
            mockups: mockups,
            recommended_products: [
                { sku: STD_PRODUCT.sku, naam: STD_PRODUCT.name, price_suggested: STD_PRODUCT.price, highlight: true },
                { sku: PREM_PRODUCT.sku, naam: PREM_PRODUCT.name, price_suggested: PREM_PRODUCT.price, highlight: true },
                { sku: ADDON_PRODUCT.sku, naam: ADDON_PRODUCT.naam, price_suggested: ADDON_PRODUCT.price_suggested, highlight: false }
            ],
            mockup_b_sku: STD_PRODUCT.sku,
            mockup_a_sku: PREM_PRODUCT.sku,
            wizard_deeplink: '/wizard/?voertuig=' + encodeURIComponent(vehicle) + '&highlight=' + encodeURIComponent(STD_PRODUCT.sku)
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
                var reply = openingReply(pack);
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

        // POST /generate (multipart brief + logo)
        if (/design-agent\/generate/.test(url)) {
            return packsReady.then(function () {
                var fd = (init && init.body) ? init.body : new FormData();
                var sid = String(fd.get('session_id') || '');
                var sess = sessions[sid] || null;
                return jsonResp(handleGenerate(sess, fd));
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
})();
