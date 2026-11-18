/**
 * Design Agent INSPIRE v2 — GPT chat advisor → tier B/A mockups via jadzia-core.
 */
(function () {
  'use strict';

  const CFG = window.daConfig || {};
  const BODY = document.getElementById('da-chat-body');
  const INPUT = document.getElementById('da-input-area');
  const RESULTS = document.getElementById('da-results');
  const MOCKUPS = document.getElementById('da-mockups');
  const RECO_GRID = document.getElementById('da-reco-grid');
  const WIZ_LINK = document.getElementById('da-wizard-link');
  const OFFERTE_PANEL = document.getElementById('da-offerte-panel');
  const OFFERTE_SUCCESS = document.getElementById('da-offerte-success');
  const RECO_SECTION = document.getElementById('da-recommendations');

  if (!BODY || !INPUT) return;

  const CHAT_URL = CFG.chatUrl || (CFG.proxyBase ? CFG.proxyBase + '/chat' : (CFG.apiUrl || '').replace(/\/generate$/, '/chat'));
  const CHAT_OPENING_URL = CHAT_URL.replace(/\/chat\/?$/, '/chat/opening');
  const CHAT_TURN_URL = CHAT_URL.replace(/\/chat\/?$/, '/chat/turn');
  const OFFERTE_URL = CFG.offerteUrl || CHAT_URL.replace(/\/chat\/?$/, '/offerte-request');
  const USE_PROXY = CFG.useProxy !== false && !!CFG.proxyBase;
  const SESSION_KEY = 'designAgentSessionId';
  const LOCALE_KEY = 'da_locale';
  const LOGO_DB_NAME = 'flexgrafik-design-agent';
  const LOGO_DB_STORE = 'logoFiles';
  const LOGO_DB_VERSION = 1;
  const ALLOWED_LOGO_TYPES = new Set(['image/png', 'image/jpeg', 'image/jpg']);
  const ALLOWED_LOGO_EXT = /\.(png|jpe?g)$/i;
  const SUPPORTED_LOCALES = ['nl-NL', 'pl-PL', 'en-GB'];

  // SITE-08: inline SVG icons replace emoji (font-independent, themeable via currentColor)
  const DA_ICON_PAPERCLIP = '<svg class="da-ico" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>';

  const I18N = {
    'nl-NL': {
      openingFallback:
        'Mooi — ik pak dit aan zoals een professionele voertuig-reclame studio dat zou doen. ' +
        'Ik stel een paar gerichte vragen (±3 minuten), zodat de mockup straks niet zomaar “mooi” is, ' +
        'maar ook logisch past bij jouw bedrijf, auto en budget. Laten we beginnen. ' +
        'Wat is de bedrijfsnaam die op de auto moet komen?',
      placeholder: 'Typ je antwoord...',
      send: 'Verstuur',
      attachTitle: 'Logo uploaden',
      confirmTitle: 'Jouw briefing',
      confirmYes: 'Bevestigen → mock-ups',
      confirmEdit: 'Aanpassen',
      resumeContinue: 'Doorgaan',
      resumeReset: 'Opnieuw beginnen',
      resumePrompt: 'Wil je doorgaan met dit gesprek, of opnieuw beginnen?',
      welcomeBack: 'Welkom terug! We gaan verder waar je gebleven was (stap {stap}).',
      logoRequired: 'Upload eerst je <strong>logo</strong> via ' + DA_ICON_PAPERCLIP + ' voordat we mock-ups maken.',
      logoRequiredShort: 'Upload eerst je <strong>logo</strong> voordat we mock-ups maken.',
      briefIncomplete: 'Je briefing is nog niet compleet. Ontbrekend: <strong>{fields}</strong>.',
      briefNotReady: 'Je briefing is nog niet klaar voor mock-ups. Rond eerst het gesprek af.',
      confirmUser: 'Ja, klopt — maak de mock-ups!',
      editUser: 'Ik wil iets aanpassen.',
      editMsg: 'Ik wil iets in mijn briefing aanpassen.',
      logoUploadedMsg: 'Logo geüpload',
      fromPrice: 'vanaf',
      chooseDirection: 'Kies deze richting →',
      offlineMsg: 'AI-mock-ups worden geactiveerd. Je kunt het gesprek straks doorlopen.',
      offlinePlaceholder: 'Chat volgt zodra live…',
      chatNotLive: 'De chat is nog niet live. Je briefing wordt straks hier doorlopen.',
      rateLimited: '<strong>Chat tijdelijk beperkt.</strong> Te veel berichten in korte tijd — wacht een uur of ververs de pagina later.',
      unavailable: 'Design Agent is tijdelijk niet beschikbaar. Probeer later opnieuw.',
      sessionExpired:
        '<strong>Sessie verlopen.</strong> Je eerdere gesprek is niet meer beschikbaar (max. 2 uur). ' +
        'We starten een nieuw gesprek — upload je logo opnieuw als je dat al had gedaan.',
      colorsLabel: 'Kleuren',
      statusOnline: 'Online',
      editPanelTitle: 'Brief aanpassen',
      editSave: 'Wijzigingen opslaan',
      editSaved: 'Brief bijgewerkt.',
      editLogoReupload: 'Logo opnieuw uploaden (PNG/JPG)',
      offerteCta: 'Offerte aanvragen',
      offerteTitle: 'Vrijblijvende offerte binnen 48 uur',
      offerteSubtitle: 'Wij sturen je een persoonlijke offerte per e-mail — geen betaling, geen Wizard.',
      offerteEmail: 'E-mailadres',
      offerteTelefoon: 'Telefoonnummer',
      offerteConsent: 'Ik ga akkoord dat FlexGrafik contact opneemt voor mijn offerte-aanvraag.',
      offerteConsentMarketing: 'Ja, houd me op de hoogte van tips en acties (optioneel).',
      offerteSubmit: 'Offerte aanvragen →',
      offerteTrust: 'FlexGrafik · KVK · Portfolio op flexgrafik.nl',
      offerteWhatsapp: 'Liever WhatsApp?',
      offerteSuccessTitle: 'Top — we bekijken het nu!',
      offerteSuccessBody:
        'Nick bekijkt je aanvraag — gem. reactie binnen 2 uur op werkdagen. Check je mail: je 2 mockups + 2 echte bus-voorbeelden + link om montage datum te prikken. Liever direct appen? Klik hieronder.',
      offerteSuccessRef: 'Referentie',
      offerteTrustAfter: '127 ZZP gingen je voor • 4.8★ Google • Eigen montage',
      offerteWhatsappPrefill: 'Hoi FlexGrafik, ik wil graag verder met mijn offerte-aanvraag.',
      offerteWhatsappCta: 'WhatsApp Nick →',
      offerteCalendarUrl: 'https://calendly.com/flexgrafik/montage-intake',
      offerteCalendarCta: 'Plan montage-intake →',
      quickPreviewLabel: 'Snelle richtingen',
      indicatief: 'indicatief'
    },
    'pl-PL': {
      openingFallback:
        'Świetnie — poprowadzę to jak profesjonalne studio reklamy na pojazdach. ' +
        'Zadam kilka konkretnych pytań (±3 minuty). Zaczynajmy. Jaka nazwa firmy ma znaleźć się na aucie?',
      placeholder: 'Wpisz odpowiedź...',
      send: 'Wyślij',
      attachTitle: 'Wgraj logo',
      confirmTitle: 'Twoje briefowanie',
      confirmYes: 'Potwierdź → mockupy',
      confirmEdit: 'Zmień',
      resumeContinue: 'Kontynuuj',
      resumeReset: 'Zacznij od nowa',
      resumePrompt: 'Kontynuować tę rozmowę, czy zacząć od nowa?',
      welcomeBack: 'Witaj ponownie! Kontynuujemy od miejsca, w którym skończyłeś (krok {stap}).',
      logoRequired: 'Najpierw wgraj <strong>logo</strong> przez ' + DA_ICON_PAPERCLIP + ', żeby zrobić mockupy.',
      logoRequiredShort: 'Najpierw wgraj <strong>logo</strong>, żeby zrobić mockupy.',
      briefIncomplete: 'Brief nie jest kompletny. Brakuje: <strong>{fields}</strong>.',
      briefNotReady: 'Brief nie jest jeszcze gotowy do mockupów. Dokończ rozmowę.',
      confirmUser: 'Tak, zgadza się — zrób mockupy!',
      editUser: 'Chcę coś zmienić.',
      editMsg: 'Chcę coś zmienić w briefie.',
      logoUploadedMsg: 'Logo wgrane',
      fromPrice: 'od',
      chooseDirection: 'Wybierz ten kierunek →',
      offlineMsg: 'AI-mockupy są aktywowane. Niedługo przejdziesz przez rozmowę.',
      offlinePlaceholder: 'Czat wkrótce…',
      chatNotLive: 'Czat nie jest jeszcze aktywny.',
      rateLimited: '<strong>Czat tymczasowo ograniczony.</strong> Zbyt wiele wiadomości — spróbuj za godzinę.',
      unavailable: 'Design Agent jest chwilowo niedostępny. Spróbuj później.',
      sessionExpired:
        '<strong>Sesja wygasła.</strong> Poprzednia rozmowa nie jest już dostępna (max. 2 godz.). ' +
        'Startujemy nową — wgraj logo ponownie, jeśli już je miałeś.',
      colorsLabel: 'Kolory',
      statusOnline: 'Online'
    },
    'en-GB': {
      openingFallback:
        'Great — I will handle this like a professional vehicle-branding studio. ' +
        'I will ask a few focused questions (±3 minutes). Let\'s begin. ' +
        'What company name should appear on the vehicle?',
      placeholder: 'Type your answer...',
      send: 'Send',
      attachTitle: 'Upload logo',
      confirmTitle: 'Your briefing',
      confirmYes: 'Confirm → mock-ups',
      confirmEdit: 'Edit',
      resumeContinue: 'Continue',
      resumeReset: 'Start over',
      resumePrompt: 'Continue this conversation, or start over?',
      welcomeBack: 'Welcome back! Continuing where you left off (step {stap}).',
      logoRequired: 'Upload your <strong>logo</strong> via ' + DA_ICON_PAPERCLIP + ' before we create mock-ups.',
      logoRequiredShort: 'Upload your <strong>logo</strong> before we create mock-ups.',
      briefIncomplete: 'Your briefing is incomplete. Missing: <strong>{fields}</strong>.',
      briefNotReady: 'Your briefing is not ready for mock-ups yet. Finish the chat first.',
      confirmUser: 'Yes, that\'s right — create the mock-ups!',
      editUser: 'I want to change something.',
      editMsg: 'I want to change something in my briefing.',
      logoUploadedMsg: 'Logo uploaded',
      fromPrice: 'from',
      chooseDirection: 'Choose this direction →',
      offlineMsg: 'AI mock-ups are being activated. You can run the chat shortly.',
      offlinePlaceholder: 'Chat coming soon…',
      chatNotLive: 'Chat is not live yet. Your briefing will run here shortly.',
      rateLimited: '<strong>Chat temporarily limited.</strong> Too many messages — wait an hour or refresh later.',
      unavailable: 'Design Agent is temporarily unavailable. Try again later.',
      sessionExpired:
        '<strong>Session expired.</strong> Your earlier chat is no longer available (max 2 hours). ' +
        'Starting a new chat — re-upload your logo if you already had one.',
      colorsLabel: 'Colours',
      statusOnline: 'Online'
    }
  };

  function normalizeLocale(raw) {
    const v = String(raw || '').trim();
    if (SUPPORTED_LOCALES.indexOf(v) >= 0) return v;
    const map = { nl: 'nl-NL', pl: 'pl-PL', en: 'en-GB', 'en-US': 'en-GB' };
    return map[v] || map[v.toLowerCase()] || (CFG.defaultLocale || 'nl-NL');
  }

  function getLocale() {
    try {
      return normalizeLocale(localStorage.getItem(LOCALE_KEY) || CFG.defaultLocale || 'nl-NL');
    } catch (e) {
      return normalizeLocale(CFG.defaultLocale || 'nl-NL');
    }
  }

  function setLocale(locale) {
    const loc = normalizeLocale(locale);
    try { localStorage.setItem(LOCALE_KEY, loc); } catch (e) { /* ignore */ }
    return loc;
  }

  function t(key, vars) {
    const pack = I18N[getLocale()] || I18N['nl-NL'];
    let s = pack[key] != null ? pack[key] : (I18N['nl-NL'][key] || key);
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), String(vars[k]));
      });
    }
    return s;
  }

  function botReply(data) {
    if (!data) return '';
    return data.reply || data.reply_nl || data.last_reply || data.last_reply_nl || '';
  }

  // Client-facing labels — brain product-route-matrix (never Tier A/B or legacy aliases).
  const TIER_LABEL = {
    tier_b: 'Standard',
    tier_a: 'Premium',
    standard: 'Standard',
    premium: 'Premium'
  };

  /** Dev/screenshot fixture only (?da_fixture=results). Blocked on prod hostname + allowResultsFixture=false. */
  const FIXTURE_RESPONSE = {
    brief_id: 'fixture-inspire-v2',
    mockups: [
      {
        variant: 'standard',
        panel: 'side',
        url: (CFG.vehicleImages && CFG.vehicleImages.caddy) || (CFG.themeUri + '/assets/images/voertuig_caddy.png'),
        sku: 'MA-005',
        naam: 'Magneetset compleet (3 stuks) — Caddy',
        price_suggested: 129,
        label_nl: 'Standard'
      },
      {
        variant: 'premium',
        panel: 'side',
        url: (CFG.vehicleImages && CFG.vehicleImages.caddy) || (CFG.themeUri + '/assets/images/voertuig_caddy.png'),
        sku: 'CS-SET-PRO-ZZP',
        naam: 'Pro freelancer set — Caddy / Partner',
        price_suggested: 199,
        label_nl: 'Premium'
      }
    ],
    recommended_products: [
      { sku: 'MA-005', naam: 'Magneetset compleet (3 stuks) — Caddy', price_suggested: 129, highlight: true },
      { sku: 'CS-SET-PRO-ZZP', naam: 'Pro freelancer set — Caddy / Partner', price_suggested: 199, highlight: true },
      { sku: 'DF-004', naam: 'Voertuigreclame ontwerp + drukbestand', price_suggested: 199, highlight: false }
    ],
    wizard_deeplink: '/wizard/?voertuig=caddy&highlight=MA-005'
  };

  const VEHICLES = [
    { id: 'caddy', label: 'Caddy / Partner' },
    { id: 'bus_l', label: 'Bestelbus Middel (L)' },
    { id: 'bus_xl', label: 'Bestelbus Groot (XL)' },
    { id: 'passenger', label: 'Personenauto / Kombi' }
  ];

  const EDIT_CHIP_OPTIONS = {
    'company.branche': [
      { id: 'elektra', label: 'Installatie/elektra' },
      { id: 'bouw', label: 'Bouw/schilder' },
      { id: 'schoonmaak', label: 'Schoonmaak/zorg' },
      { id: 'horeca', label: 'Horeca/retail' },
      { id: 'it', label: 'IT/zakelijke dienst' },
      { id: 'anders', label: 'Anders' }
    ],
    'company.regio': [
      { id: 'rotterdam', label: 'Rotterdam' },
      { id: 'amsterdam', label: 'Amsterdam' },
      { id: 'utrecht', label: 'Utrecht' },
      { id: 'den_haag', label: 'Den Haag' },
      { id: 'eindhoven', label: 'Eindhoven' },
      { id: 'anders', label: 'Anders' }
    ],
    'vehicle.type': VEHICLES,
    'vehicle.usage': [
      { id: 'zakelijk', label: 'Alleen zakelijk' },
      { id: 'prive_en_zakelijk', label: 'Privé + zakelijk' },
      { id: 'lease', label: 'Lease' },
      { id: 'tijdelijk', label: 'Tijdelijk' }
    ],
    'marketing.desired_impression': [
      { id: 'strak', label: 'Strak' },
      { id: 'opvallend', label: 'Opvallend' },
      { id: 'premium', label: 'Premium' },
      { id: 'lokaal_betrouwbaar', label: 'Lokaal betrouwbaar' },
      { id: 'vriendelijk', label: 'Vriendelijk' },
      { id: 'stoer', label: 'Stoer' }
    ],
    'marketing.primary_cta': [
      { id: 'telefoon', label: 'Bellen' },
      { id: 'website', label: 'Website' },
      { id: 'whatsapp', label: 'WhatsApp' },
      { id: 'qr', label: 'QR-code' }
    ],
    'budget.range': [
      { id: 'tot_600', label: 'Tot €600' },
      { id: '600_1000', label: '€600–€1000' },
      { id: '1000_2000', label: '€1000–€2000' },
      { id: '2000_plus', label: '€2000+' },
      { id: 'weet_ik_niet', label: 'Ik weet het niet' }
    ],
    'budget.flexibility': [
      { id: 'strikt', label: 'Strikt budget' },
      { id: 'flexibel_als_het_klopt', label: 'Flexibel als het ontwerp echt klopt' },
      { id: 'advies_nodig', label: 'Ik weet het niet — adviseer mij' }
    ]
  };

  const state = {
    sessionId: null,
    locale: getLocale(),
    briefPartial: {},
    phase: 1,
    stap: 1,
    stapLabel: '',
    quickReplies: [],
    quickReplyField: '',
    briefConfirmed: false,
    logoFile: null,
    logoUrl: '',
    brandColors: [],
    apiResponse: null,
    busy: false,
    readyToGenerate: false,
    missingFields: [],
    logoReuploadRequired: false,
    premiumBudgetNote: '',
    premiumAspirational: false,
    readinessHintKey: '',
    pendingResumeSnapshot: null,
    selectedMockup: null,
    offerteRequestId: null
  };

  const DA_DEBUG = new URLSearchParams(window.location.search).get('da_debug') === '1';

  function logReadinessTelemetry(gate) {
    if (!DA_DEBUG) return;
    console.info('[INSPIRE readiness]', {
      ok: gate.ok,
      reason: gate.reason,
      readyToGenerate: state.readyToGenerate,
      phase: state.phase,
      hasLogo: !!state.logoFile,
      missingFields: state.missingFields
    });
  }

  /**
   * Single SSoT for confirm card + generate — server ready_to_generate AND client logo bytes.
   */
  function generateReadinessGate() {
    if (state.stap < 7 && state.phase < 7) {
      return { ok: false, reason: 'phase_low' };
    }
    if (!state.readyToGenerate) {
      return { ok: false, reason: 'not_ready' };
    }
    if (!state.logoFile) {
      return { ok: false, reason: state.logoReuploadRequired ? 'logo_reupload' : 'no_logo' };
    }
    const b = state.briefPartial;
    if (!String(b.bedrijfsnaam || '').trim()) {
      return { ok: false, reason: 'no_bedrijfsnaam' };
    }
    if (!normalizeVehicleId(b.vehicle)) {
      return { ok: false, reason: 'no_vehicle' };
    }
    if (!String(b.budget_range || '').trim() || !b._budget_explicit) {
      return { ok: false, reason: 'no_budget' };
    }
    if (!String(b.regio || '').trim()) {
      return { ok: false, reason: 'no_regio' };
    }
    return { ok: true, reason: 'ready' };
  }

  function apiHeaders(json) {
    const h = json ? { 'Content-Type': 'application/json' } : {};
    h['Cache-Control'] = 'no-cache';
    h['Pragma'] = 'no-cache';
    if (USE_PROXY && CFG.restNonce) h['X-WP-Nonce'] = CFG.restNonce;
    if (!USE_PROXY && CFG.apiKey) h['X-FG-Design-Agent-Key'] = CFG.apiKey;
    return h;
  }

  function fetchNoCache(url, opts) {
    const o = opts || {};
    o.cache = 'no-store';
    o.headers = Object.assign({}, apiHeaders(o.body && typeof o.body === 'string'), o.headers || {});
    return fetch(url, o);
  }

  function addBotMsg(html) {
    const div = document.createElement('div');
    div.className = 'da-msg da-msg--bot';
    div.innerHTML = html;
    BODY.appendChild(div);
    scrollChat();
  }

  function addUserMsg(text) {
    const div = document.createElement('div');
    div.className = 'da-msg da-msg--user';
    div.textContent = text;
    BODY.appendChild(div);
    scrollChat();
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'da-msg da-msg--typing';
    div.id = 'da-typing';
    div.innerHTML = '<div class="da-typing-dots"><span></span><span></span><span></span></div>';
    BODY.appendChild(div);
    scrollChat();
  }

  function hideTyping() {
    const el = document.getElementById('da-typing');
    if (el) el.remove();
  }

  function scrollChat() {
    requestAnimationFrame(() => {
      BODY.scrollTop = BODY.scrollHeight;
    });
  }

  function formatPriceNl(price) {
    const n = Number(price);
    if (!Number.isFinite(n)) return '';
    return '€' + n.toLocaleString('nl-NL', { minimumFractionDigits: n % 1 ? 2 : 0 });
  }

  function tierLetter(variant) {
    return (variant === 'tier_a' || variant === 'premium') ? 'a' : 'b';
  }

  function tierLabel(mockup) {
    return mockup.label_nl || TIER_LABEL[mockup.variant] || TIER_LABEL.tier_b;
  }

  function sortMockupsTierOrder(mockups) {
    const order = { tier_b: 0, tier_a: 1, standard: 0, premium: 1 };
    return [...mockups].sort((a, b) => (order[a.variant] ?? 9) - (order[b.variant] ?? 9));
  }

  function buildWizardLink(highlightSku) {
    const vehicle = state.briefPartial.vehicle || state.apiResponse?.vehicle || 'caddy';
    const base = (CFG.wizardUrl || '/wizard').split('?')[0].replace(/\/$/, '');
    return base + '/?voertuig=' + encodeURIComponent(vehicle) + '&highlight=' + encodeURIComponent(highlightSku);
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatApiError(data, status) {
    if (data.detail && typeof data.detail === 'object' && !Array.isArray(data.detail)) {
      return data.detail.message || data.detail.error_code || JSON.stringify(data.detail);
    }
    if (typeof data.detail === 'string') return data.detail;
    if (Array.isArray(data.detail)) {
      return data.detail.map(d => d.msg || d.message || JSON.stringify(d)).join('; ');
    }
    return data.message || `HTTP ${status}`;
  }

  function persistSessionId() {
    try {
      if (state.sessionId) sessionStorage.setItem(SESSION_KEY, state.sessionId);
    } catch (e) { /* ignore */ }
  }

  function loadSessionId() {
    try {
      return sessionStorage.getItem(SESSION_KEY) || null;
    } catch (e) {
      return null;
    }
  }

  /** Clear persisted chat session — used on Opnieuw + failed restore (P0-D). */
  function clearDesignAgentSession() {
    try {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem('designAgentBrief');
    } catch (e) { /* ignore */ }
    state.sessionId = null;
    state.briefPartial = {};
    state.phase = 1;
    state.stap = 1;
    state.stapLabel = '';
    state.quickReplies = [];
    state.quickReplyField = '';
    state.briefConfirmed = false;
    state.readyToGenerate = false;
    state.missingFields = [];
    state.logoReuploadRequired = false;
    state.premiumBudgetNote = '';
    state.premiumAspirational = false;
    state.apiResponse = null;
    state.readinessHintKey = '';
    state.pendingResumeSnapshot = null;
  }

  /** True when restored session is past opening — ask Continue/Reset (P0-D). */
  function shouldPromptSessionResume(session) {
    if (!session) return false;
    const stap = Number(session.stap || session.phase || 0);
    return stap >= 2;
  }

  function showSessionResumeChoice() {
    INPUT.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'da-quick-replies';
    wrap.id = 'da-session-resume';
    [
      { id: 'continue', label: t('resumeContinue') },
      { id: 'reset', label: t('resumeReset') }
    ].forEach(opt => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'da-quick-reply';
      btn.textContent = opt.label;
      btn.addEventListener('click', () => handleSessionResumeChoice(opt.id));
      wrap.appendChild(btn);
    });
    INPUT.appendChild(wrap);
  }

  async function handleSessionResumeChoice(choice) {
    const wrap = document.getElementById('da-session-resume');
    if (wrap) wrap.remove();
    if (choice === 'reset') {
      clearDesignAgentSession();
      clearChatMessages();
      state.logoFile = null;
      state.logoUrl = '';
      state.brandColors = [];
      updateStapProgress();
      showTyping();
      try {
        const data = await fetchOpening();
        hideTyping();
        applyChatResponse(data);
        addBotMsg(botReply(data));
        showComposer();
      } catch (err) {
        hideTyping();
        addBotMsg(t('openingFallback'));
        showComposer();
      }
      return;
    }
    addUserMsg(t('resumeContinue'));
    const snap = state.pendingResumeSnapshot;
    state.pendingResumeSnapshot = null;
    if (snap) {
      const last = botReply(snap);
      if (last) syncBriefFromSummaryFallback(last);
      if (Array.isArray(snap.messages_tail) && snap.messages_tail.length) {
        replayMessagesTail(snap.messages_tail);
      } else if (last) {
        addBotMsg(last);
      }
    }
    addBotMsg(t('welcomeBack', { stap: state.stap || state.phase }));
    updateStapProgress();
    showComposer();
  }

  function applyChatResponse(data) {
    state.sessionId = data.session_id || state.sessionId;
    const incoming = data.brief_partial || {};
    const merged = { ...state.briefPartial };
    for (const [key, val] of Object.entries(incoming)) {
      if (val === null || val === undefined || val === '') continue;
      if (Array.isArray(val) && !val.length) continue;
      merged[key] = val;
    }
    state.briefPartial = merged;
    if (state.briefPartial.vehicle) {
      state.briefPartial.vehicle = normalizeVehicleId(state.briefPartial.vehicle);
    }
    if (state.brandColors.length && (!state.briefPartial.brand_colors || !state.briefPartial.brand_colors.length)) {
      state.briefPartial.brand_colors = state.brandColors;
    }
    if (state.logoFile && !state.briefPartial.logo_file) {
      state.briefPartial.logo_file = state.logoFile.name || 'logo.png';
    }
    state.phase = data.phase || data.stap || state.phase;
    state.stap = data.stap || state.phase || 1;
    state.stapLabel = data.stap_label || '';
    state.quickReplies = Array.isArray(data.quick_replies) ? data.quick_replies : [];
    state.quickReplyField = data.quick_reply_field || '';
    state.readyToGenerate = !!data.ready_to_generate;
    state.missingFields = Array.isArray(data.missing_fields) ? data.missing_fields : [];
    state.logoReuploadRequired = !!data.logo_reupload_required;
    state.premiumBudgetNote = '';
    state.premiumAspirational = false;
    // P0-5 — pick up premium budget_note_nl from API mockups response
    if (state.apiResponse && Array.isArray(state.apiResponse.mockups)) {
      const premium = state.apiResponse.mockups.find(
        m => m.variant === 'premium' || m.variant === 'tier_a'
      );
      if (premium && premium.budget_note_nl) {
        state.premiumBudgetNote = String(premium.budget_note_nl);
        state.premiumAspirational = true;
      }
    }
    if (botReply(data) && (state.phase >= 7 || state.stap >= 7)) {
      syncBriefFromSummaryFallback(botReply(data));
    }
    updateStapProgress();
    if (Array.isArray(data.quick_previews) && data.quick_previews.length) {
      renderQuickPreviews(data.quick_previews);
    }
    // briefConfirmed only via #da-confirm-yes — never from chat API
    persistSessionId();
  }

  function renderQuickPreviews(urls) {
    const existing = document.getElementById('da-quick-previews');
    if (existing) existing.remove();
    if (!urls || !urls.length) return;
    const wrap = document.createElement('div');
    wrap.id = 'da-quick-previews';
    wrap.className = 'da-quick-previews';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', t('quickPreviewLabel'));
    urls.slice(0, 3).forEach(function (url, i) {
      const fig = document.createElement('figure');
      fig.className = 'da-quick-previews__item' + (i === 0 ? ' da-quick-previews__item--hero' : ' da-quick-previews__item--mini');
      const img = document.createElement('img');
      img.src = url;
      img.alt = t('quickPreviewLabel') + ' ' + (i + 1);
      img.loading = 'lazy';
      fig.appendChild(img);
      wrap.appendChild(fig);
    });
    BODY.appendChild(wrap);
    scrollChat();
  }

  function updateStapProgress() {
    const chat = document.getElementById('da-chat');
    if (!chat) return;
    let bar = document.getElementById('da-stap-progress');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'da-stap-progress';
      bar.className = 'da-stap-progress';
      bar.setAttribute('role', 'progressbar');
      bar.setAttribute('aria-label', 'Voortgang gesprek');
      bar.setAttribute('aria-valuemin', '1');
      bar.setAttribute('aria-valuemax', '7');
      bar.innerHTML =
        '<span class="da-stap-progress__label" id="da-stap-label"></span>' +
        '<div class="da-stap-progress__track"><div class="da-stap-progress__fill" id="da-stap-fill"></div></div>';
      const header = chat.querySelector('.da-chat__header');
      if (header && header.nextSibling) {
        chat.insertBefore(bar, header.nextSibling);
      } else {
        chat.insertBefore(bar, BODY);
      }
    }
    const stap = Math.min(7, Math.max(1, state.stap || state.phase || 1));
    const label = state.stapLabel || ('Stap ' + stap);
    const labelEl = document.getElementById('da-stap-label');
    const fillEl = document.getElementById('da-stap-fill');
    if (labelEl) labelEl.textContent = 'Stap ' + stap + ' van 7 — ' + label;
    if (fillEl) fillEl.style.width = Math.round((stap / 7) * 100) + '%';
    bar.setAttribute('aria-valuenow', String(stap));
    bar.hidden = false;
  }

  function normalizeVehicleId(raw) {
    if (!raw) return '';
    const v = String(raw).toLowerCase().replace(/\*+/g, '').trim();
    if (v === 'bestelbus_l' || v === 'bestelbus l' || v.includes('bus_l')) return 'bus_l';
    if (v.includes('bus_xl')) return 'bus_xl';
    if (v.includes('caddy') || v.includes('partner')) return 'caddy';
    if (v.includes('passenger') || v.includes('kombi')) return 'passenger';
    return v.replace(/\s+/g, '_').replace(/^_+/, '');
  }

  /** Client fallback only — server parse_summary_fields() is SSoT (F-017). */
  function syncBriefFromSummaryFallback(replyNl) {
    const b = state.briefPartial;
    const pick = (key, pattern) => {
      if (String(b[key] || '').trim()) return;
      const m = replyNl.match(pattern);
      if (m) b[key] = m[1].trim().replace(/\*+/g, '').trim();
    };
    pick('bedrijfsnaam', /(?:\*\*)?Bedrijfsnaam(?:\*\*)?:\s*([^\n]+)/i);
    pick('branche', /(?:\*\*)?Branche(?:\*\*)?:\s*([^\n]+)/i);
    pick('diensten', /(?:\*\*)?Diensten(?:\*\*)?:\s*([^\n]+)/i);
    pick('doelgroep', /(?:\*\*)?Doelgroep(?:\*\*)?:\s*([^\n]+)/i);
    pick('telefoon', /(?:\*\*)?Telefoon(?:\*\*)?:\s*([^\n]+)/i);
    pick('website', /(?:\*\*)?Website(?:\*\*)?:\s*([^\n]+)/i);
    pick('slogan', /(?:\*\*)?Slogan(?:\*\*)?:\s*([^\n]+)/i);
    if (!b.vehicle) {
      const veh = replyNl.match(/(?:\*\*)?Voertuig(?:\*\*)?:\s*([^(\n]+)(?:\s*\(([a-z_]+)\))?/i);
      if (veh) b.vehicle = normalizeVehicleId(veh[2] || veh[1]);
    }
    if (!b.vehicle) {
      const id = replyNl.match(/\((bus_l|bus_xl|caddy|passenger)\)/i);
      if (id) b.vehicle = id[1].toLowerCase();
    }
    if (!b.vehicle && /\bbus_l\b/i.test(replyNl)) b.vehicle = 'bus_l';
    if (b.vehicle) b.vehicle = normalizeVehicleId(b.vehicle);
  }

  function shouldShowConfirmCard() {
    const gate = generateReadinessGate();
    logReadinessTelemetry(gate);
    return gate.ok && !state.apiResponse;
  }

  function gateBlockMessage(gate) {
    if (!gate || gate.ok) return '';
    if (gate.reason === 'no_logo' || gate.reason === 'logo_reupload') {
      return 'Upload eerst je <strong>logo</strong> via ' + DA_ICON_PAPERCLIP + ' om mock-ups te kunnen maken' +
        (gate.reason === 'logo_reupload' ? ' (sessie hersteld — logo opnieuw nodig).' : '.');
    }
    if (gate.reason === 'no_budget') {
      return 'Kies eerst een <strong>richtbudget</strong> (stap 6) voordat we mock-ups maken.';
    }
    if (gate.reason === 'no_bedrijfsnaam') {
      return 'Bedrijfsnaam ontbreekt nog in je briefing.';
    }
    if (gate.reason === 'no_vehicle') {
      return 'Kies eerst je <strong>voertuigtype</strong> voordat we mock-ups maken.';
    }
    if (gate.reason === 'no_regio') {
      return 'Regio ontbreekt nog in je briefing.';
    }
    if (gate.reason === 'not_ready' && state.missingFields.length) {
      return 'Je briefing is nog niet compleet. Ontbrekend: <strong>' +
        state.missingFields.join(', ') + '</strong>.';
    }
    if (gate.reason === 'phase_low') {
      return '';
    }
    return 'Je briefing is nog niet klaar voor mock-ups. Rond eerst het gesprek af.';
  }

  /** When stap≥7 but confirm cannot show — explain why (no DA_DEBUG required). */
  function explainReadinessBlockIfNeeded() {
    if ((state.stap < 7 && state.phase < 7) || state.apiResponse) return;
    const gate = generateReadinessGate();
    if (gate.ok) {
      state.readinessHintKey = '';
      return;
    }
    const msg = gateBlockMessage(gate);
    if (!msg) return;
    const key = gate.reason + '|' + (state.missingFields || []).join(',');
    if (state.readinessHintKey === key) return;
    state.readinessHintKey = key;
    addBotMsg(msg);
  }

  function showLogoReuploadBanner() {
    if (!state.logoReuploadRequired || state.logoFile) return;
    const existing = document.getElementById('da-logo-reupload');
    if (existing) return;
    const banner = document.createElement('div');
    banner.className = 'da-logo-reupload';
    banner.id = 'da-logo-reupload';
    banner.innerHTML =
      '<p><strong>Logo opnieuw uploaden</strong> — je sessie is hersteld, maar het logo-bestand staat alleen op dit apparaat. ' +
      'Upload je logo opnieuw via ' + DA_ICON_PAPERCLIP + ' om mock-ups te kunnen maken.</p>';
    INPUT.insertBefore(banner, INPUT.firstChild);
  }

  /** Detach logo from <input type=file> so FormData survives showComposer() DOM teardown. */
  async function detachLogoFile(file) {
    const buf = await file.arrayBuffer();
    const name = file.name || 'logo.png';
    const type = file.type || 'image/png';
    return new File([buf], name, { type });
  }

  function isAllowedLogoFile(file) {
    if (!file) return false;
    const name = file.name || '';
    const type = (file.type || '').toLowerCase();
    if (type && type.startsWith('image/')) return true;
    if (type && !ALLOWED_LOGO_TYPES.has(type)) return false;
    if (name && !ALLOWED_LOGO_EXT.test(name)) return false;
    return true;
  }

  function showV61BusLogoDropzone() {
    if (state.quickReplyField !== 'where_bus.upload') return;
    const existing = document.getElementById('da-v61-dropzone');
    if (existing) return;
    const dz = document.createElement('div');
    dz.id = 'da-v61-dropzone';
    dz.className = 'da-v61-dropzone';
    dz.innerHTML =
      '<p class="da-v61-dropzone__title"><strong>Foto bus + logo</strong> — sleep of kies bestanden (PNG/JPG)</p>' +
      '<div class="da-v61-dropzone__row">' +
        '<label class="da-v61-dropzone__btn">Bus foto<input type="file" id="da-vehicle-photo" accept="image/*" hidden></label>' +
        '<label class="da-v61-dropzone__btn">Logo<input type="file" id="da-v61-logo" accept="image/*" hidden></label>' +
        '<button type="button" class="da-v61-dropzone__send" id="da-v61-upload-send">Verstuur</button>' +
      '</div>';
    INPUT.insertBefore(dz, INPUT.firstChild);
    const vehInput = document.getElementById('da-vehicle-photo');
    const logoInput = document.getElementById('da-v61-logo');
    const sendBtn = document.getElementById('da-v61-upload-send');
    sendBtn.addEventListener('click', async () => {
      const veh = vehInput && vehInput.files && vehInput.files[0];
      const logo = logoInput && logoInput.files && logoInput.files[0];
      if (!logo) {
        addBotMsg('<strong>Upload je logo</strong> (PNG/JPG) — busfoto is optioneel.');
        return;
      }
      if (!isAllowedLogoFile(logo) || (veh && !isAllowedLogoFile(veh))) {
        addBotMsg('<strong>Alleen afbeeldingen</strong> — PNG of JPG.');
        return;
      }
      const msg = 'Foto + logo geüpload — ' + (logo && logo.name ? logo.name : 'bestand') + (veh && veh.name ? ' + ' + veh.name : '');
      addUserMsg(msg);
      state.busy = true;
      showTyping();
      try {
        const detached = await detachLogoFile(logo);
        state.logoFile = detached;
        state.logoUrl = URL.createObjectURL(detached);
        state.brandColors = await extractColors(detached);
        const data = await callChatTurnApi(msg, detached, veh || null);
        hideTyping();
        applyChatResponse(data);
        addBotMsg(botReply(data));
        if (state.sessionId) await persistLogoToIndexedDb(state.sessionId, detached);
        dz.remove();
        showComposer();
      } catch (err) {
        hideTyping();
        addBotMsg('<strong>Upload mislukt.</strong> ' + ((err && err.message) || 'Probeer opnieuw.'));
        showComposer();
      } finally {
        state.busy = false;
      }
    });
  }

  function openLogoDb() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(LOGO_DB_NAME, LOGO_DB_VERSION);
      req.onerror = () => reject(req.error);
      req.onsuccess = () => resolve(req.result);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(LOGO_DB_STORE)) {
          db.createObjectStore(LOGO_DB_STORE, { keyPath: 'sessionId' });
        }
      };
    });
  }

  async function persistLogoToIndexedDb(sessionId, file) {
    if (!sessionId || !file) return;
    try {
      const buf = await file.arrayBuffer();
      const db = await openLogoDb();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(LOGO_DB_STORE, 'readwrite');
        tx.objectStore(LOGO_DB_STORE).put({
          sessionId,
          name: file.name || 'logo.png',
          type: file.type || 'image/png',
          bytes: buf,
          updatedAt: Date.now(),
        });
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
      db.close();
    } catch (e) { /* ignore */ }
  }

  async function restoreLogoFromIndexedDb(sessionId) {
    if (!sessionId) return null;
    try {
      const db = await openLogoDb();
      const record = await new Promise((resolve, reject) => {
        const tx = db.transaction(LOGO_DB_STORE, 'readonly');
        const req = tx.objectStore(LOGO_DB_STORE).get(sessionId);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
      db.close();
      if (!record || !record.bytes) return null;
      return new File([record.bytes], record.name || 'logo.png', {
        type: record.type || 'image/png',
      });
    } catch (e) {
      return null;
    }
  }

  async function fetchChatSession(sessionId) {
    const url = CHAT_URL.replace(/\/$/, '') + '/' + encodeURIComponent(sessionId);
    const res = await fetchNoCache(url, { headers: apiHeaders(true) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return null;
    return data;
  }

  async function fetchOpening() {
    const qs = new URLSearchParams();
    qs.set('locale', state.locale || getLocale());
    qs.set('_', String(Date.now()));
    const url = CHAT_OPENING_URL + '?' + qs.toString();
    const res = await fetchNoCache(url, { headers: apiHeaders(true) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(formatApiError(data, res.status));
    return data;
  }

  async function callChatApi(message, opts) {
    const extra = opts || {};
    const body = {
      session_id: state.sessionId,
      message: message || '',
      locale: state.locale || getLocale()
    };
    if (extra.quick_reply_id && extra.quick_reply_field) {
      body.quick_reply_id = extra.quick_reply_id;
      body.quick_reply_field = extra.quick_reply_field;
    }
    if (extra.field_updates) {
      body.field_updates = extra.field_updates;
    }
    const res = await fetchNoCache(CHAT_URL, {
      method: 'POST',
      headers: apiHeaders(true),
      body: JSON.stringify(body)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(formatApiError(data, res.status));
    return data;
  }

  async function callChatTurnApi(message, logoFile, vehiclePhotoFile) {
    const fd = new FormData();
    if (state.sessionId) fd.append('session_id', state.sessionId);
    fd.append('message', message || t('logoUploadedMsg'));
    fd.append('locale', state.locale || getLocale());
    if (logoFile) fd.append('logo', logoFile);
    if (vehiclePhotoFile) fd.append('vehicle_photo', vehiclePhotoFile);
    const colors = state.brandColors || state.briefPartial.brand_colors || [];
    if (Array.isArray(colors) && colors.length) {
      fd.append('brand_colors', JSON.stringify(colors));
    }
    const res = await fetchNoCache(CHAT_TURN_URL, {
      method: 'POST',
      headers: apiHeaders(false),
      body: fd
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(formatApiError(data, res.status));
    return data;
  }

  function extractColors(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const size = 80;
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, size, size);
          const data = ctx.getImageData(0, 0, size, size).data;
          const colorMap = {};
          for (let i = 0; i < data.length; i += 16) {
            const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
            if (a < 128) continue;
            const brightness = (r + g + b) / 3;
            if (brightness < 20 || brightness > 235) continue;
            const key = `${Math.round(r / 32) * 32},${Math.round(g / 32) * 32},${Math.round(b / 32) * 32}`;
            colorMap[key] = (colorMap[key] || 0) + 1;
          }
          const sorted = Object.entries(colorMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([key]) => {
              const [r, g, b] = key.split(',').map(Number);
              return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
            });
          resolve(sorted.length ? sorted : ['#009fe3', '#d60075']);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function showOfflineComposer() {
    INPUT.innerHTML =
      '<div class="da-composer da-composer--offline">' +
        '<p class="da-composer__offline-msg">' + t('offlineMsg') + '</p>' +
        '<input class="da-composer__input da-form-input" type="text" placeholder="' + t('offlinePlaceholder') + '" disabled>' +
        '<button type="button" class="da-composer__send da-form-submit" disabled>' + t('send') + '</button>' +
      '</div>';
  }

  function showComposer() {
    if (state.briefConfirmed && state.apiResponse) return;
    if (!CFG.apiEnabled) {
      showOfflineComposer();
      return;
    }
    INPUT.innerHTML =
      '<div class="da-composer" id="da-composer">' +
        '<input class="da-composer__input da-form-input" id="da-chat-input" type="text" ' +
          'placeholder="' + t('placeholder') + '" autocomplete="off" maxlength="2000">' +
        '<button type="button" class="da-composer__attach" id="da-logo-btn" title="' + t('attachTitle') + '" aria-label="' + t('attachTitle') + '">' + DA_ICON_PAPERCLIP + '</button>' +
        '<button type="button" class="da-composer__send da-form-submit" id="da-send-btn">' + t('send') + '</button>' +
        '<input type="file" id="da-logo-input" accept=".png,.jpg,.jpeg" hidden>' +
      '</div>';

    const input = document.getElementById('da-chat-input');
    const sendBtn = document.getElementById('da-send-btn');
    const logoBtn = document.getElementById('da-logo-btn');
    const logoInput = document.getElementById('da-logo-input');

    sendBtn.addEventListener('click', () => submitMessage(input.value));
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitMessage(input.value);
      }
    });
    logoBtn.addEventListener('click', () => logoInput.click());
    logoInput.addEventListener('change', () => {
      if (logoInput.files && logoInput.files[0]) handleLogoUpload(logoInput.files[0]);
    });

    if (state.quickReplies.length && state.quickReplyField) {
      showQuickReplies(state.quickReplies, state.quickReplyField);
    } else if (state.phase === 4 || (!state.briefPartial.vehicle && state.phase >= 3)) {
      showVehicleChips();
    }
    showV61BusLogoDropzone();
    if (state.stap >= 7 || state.phase >= 7) {
      const bots = BODY.querySelectorAll('.da-msg--bot');
      const lastBot = bots.length ? bots[bots.length - 1] : null;
      if (lastBot) syncBriefFromSummaryFallback(lastBot.textContent || '');
    }
    showLogoReuploadBanner();
    if (shouldShowBriefEditPanel()) {
      showBriefEditPanel();
    }
    if (shouldShowConfirmCard()) {
      showConfirmCard();
    } else {
      explainReadinessBlockIfNeeded();
    }
  }

  function clearQuickReplies() {
    const existing = INPUT.querySelector('.da-quick-replies');
    if (existing) existing.remove();
  }

  /** Hard-clear message DOM so Opnieuw beginnen never keeps old summary bubbles. */
  function clearChatMessages() {
    BODY.innerHTML = '';
    if (MOCKUPS) MOCKUPS.innerHTML = '';
    if (RECO_GRID) RECO_GRID.innerHTML = '';
    if (RESULTS) RESULTS.hidden = true;
    const qp = document.getElementById('da-quick-previews');
    if (qp) qp.remove();
    clearQuickReplies();
  }

  function showQuickReplies(replies, field) {
    clearQuickReplies();
    if (!replies || !replies.length || !field) return;
    const wrap = document.createElement('div');
    wrap.className = 'da-quick-replies';
    replies.forEach(r => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'da-quick-reply';
      btn.textContent = r.label || r.id;
      btn.addEventListener('click', () => submitChipReply(field, r.id, r.label || r.id));
      wrap.appendChild(btn);
    });
    INPUT.appendChild(wrap);
  }

  async function submitChipReply(field, chipId, label) {
    if (state.busy) return;
    state.busy = true;
    clearQuickReplies();
    addUserMsg(label);
    showTyping();
    try {
      const data = await callChatApi('', {
        quick_reply_id: chipId,
        quick_reply_field: field
      });
      hideTyping();
      applyChatResponse(data);
      addBotMsg(botReply(data));
      showComposer();
    } catch (err) {
      hideTyping();
      addBotMsg('<strong>Chat niet beschikbaar.</strong> ' + ((err && err.message) || 'Probeer opnieuw.'));
      showComposer();
    } finally {
      state.busy = false;
    }
  }

  function showVehicleChips() {
    showQuickReplies(
      VEHICLES.map(v => ({ id: v.id, label: v.label })),
      'vehicle.type'
    );
  }

  function briefSummaryHtml() {
    const b = state.briefPartial;
    const budgetExplicit = !!b._budget_explicit;
    const budgetValue = String(b.budget_range || '').trim();
    const budgetIsPlaceholder =
      !budgetValue || (budgetValue === 'weet_ik_niet' && !budgetExplicit);
    const budgetRow = budgetIsPlaceholder
      ? ['Budget', '<em class="da-row--warning">Kies je richtbudget hierboven</em>']
      : ['Budget', budgetValue];

    // P0-5 — when premium carries budget_note_nl, flag premium aspirational
    const premiumAspirational = !!state.premiumBudgetNote;
    const premiumLabel = premiumAspirational
      ? 'Premium <em class="da-row--aspirational">(groeirichting — buiten budget)</em>'
      : 'Premium';

    const rows = [
      ['Bedrijf', b.bedrijfsnaam],
      ['Branche', b.branche],
      ['Regio', b.regio],
      ['Voertuig', b.vehicle],
      ['Gebruik', b.vehicle_usage],
      ['Doelgroep', b.doelgroep],
      ['Diensten', Array.isArray(b.diensten) ? b.diensten.join(', ') : b.diensten],
      ['Indruk', b.desired_impression || b.positionering],
      ['Telefoon', b.telefoon],
      ['Website', b.website],
      budgetRow,
      ['Standard', b.mockup_b_label || b.mockup_b_sku],
      [premiumLabel + ' (richting)', b.mockup_a_label || b.mockup_a_sku]
    ].filter(([, v]) => v);
    return rows.map(([k, v]) => `<strong>${k}:</strong> ${v}`).join('<br>');
  }

  function shouldShowBriefEditPanel() {
    return (state.stap >= 7 || state.phase >= 7) && !state.briefConfirmed && !state.apiResponse;
  }

  function removeBriefEditPanel() {
    const existing = document.getElementById('da-brief-edit-panel');
    if (existing) existing.remove();
  }

  function editFieldValue(field, fallback) {
    const b = state.briefPartial;
    const map = {
      'company.bedrijfsnaam': b.bedrijfsnaam,
      'company.branche': b.branche,
      'company.regio': b.regio,
      'vehicle.type': normalizeVehicleId(b.vehicle),
      'vehicle.usage': b.vehicle_usage,
      'marketing.doelgroep': b.doelgroep,
      'marketing.desired_impression': b.desired_impression || b.positionering,
      'marketing.primary_cta': b.primary_cta,
      'company.telefoon': b.telefoon,
      'company.website': b.website,
      'marketing.slogan': b.slogan,
      'budget.range': b.budget_range,
      'budget.flexibility': b.budget_flexibility
    };
    return map[field] != null && map[field] !== '' ? map[field] : (fallback || '');
  }

  function renderEditChipGroup(field, options) {
    const current = String(editFieldValue(field, '')).toLowerCase();
    return options.map(opt => {
      const id = 'da-edit-' + field.replace(/\./g, '-') + '-' + opt.id;
      const checked = current === opt.id ? ' checked' : '';
      return (
        '<label class="da-edit-chip">' +
          '<input type="radio" name="da-edit-' + field + '" id="' + id + '" value="' + escapeHtml(opt.id) + '"' + checked + '>' +
          '<span>' + escapeHtml(opt.label) + '</span>' +
        '</label>'
      );
    }).join('');
  }

  function readEditChip(field) {
    const el = document.querySelector('input[name="da-edit-' + field + '"]:checked');
    return el ? el.value : '';
  }

  function collectBriefEditFieldUpdates() {
    const updates = {};
    const text = id => {
      const el = document.getElementById(id);
      return el ? String(el.value || '').trim() : '';
    };
    const bedrijfsnaam = text('da-edit-bedrijfsnaam');
    if (bedrijfsnaam) updates['company.bedrijfsnaam'] = bedrijfsnaam;
    const branche = readEditChip('company.branche');
    if (branche) updates['company.branche'] = branche;
    const regio = readEditChip('company.regio') || text('da-edit-regio-text');
    if (regio) updates['company.regio'] = regio;
    const vtype = readEditChip('vehicle.type');
    if (vtype) updates['vehicle.type'] = vtype;
    const usage = readEditChip('vehicle.usage');
    if (usage) updates['vehicle.usage'] = usage;
    const doelgroep = text('da-edit-doelgroep');
    if (doelgroep) updates['marketing.doelgroep'] = doelgroep;
    const diensten = [
      text('da-edit-dienst1'),
      text('da-edit-dienst2'),
      text('da-edit-dienst3')
    ].filter(Boolean);
    if (diensten.length) updates['marketing.diensten'] = diensten;
    const impression = readEditChip('marketing.desired_impression');
    if (impression) updates['marketing.desired_impression'] = impression;
    const cta = readEditChip('marketing.primary_cta');
    if (cta) updates['marketing.primary_cta'] = cta;
    const telefoon = text('da-edit-telefoon');
    if (telefoon) updates['company.telefoon'] = telefoon;
    const website = text('da-edit-website');
    if (website) updates['company.website'] = website;
    const slogan = text('da-edit-slogan');
    if (slogan) updates['marketing.slogan'] = slogan;
    const budget = readEditChip('budget.range');
    if (budget) updates['budget.range'] = budget;
    const flex = readEditChip('budget.flexibility');
    if (flex) updates['budget.flexibility'] = flex;
    const colors = ['da-edit-color1', 'da-edit-color2', 'da-edit-color3']
      .map(text)
      .filter(c => /^#[0-9a-fA-F]{6}$/.test(c));
    if (colors.length) updates['brand_assets.brand_colors'] = colors;
    return updates;
  }

  function syncEditContactVisibility() {
    const cta = readEditChip('marketing.primary_cta');
    const telRow = document.getElementById('da-edit-row-telefoon');
    const webRow = document.getElementById('da-edit-row-website');
    if (telRow) telRow.hidden = cta !== 'telefoon' && cta !== 'whatsapp';
    if (webRow) webRow.hidden = cta !== 'website' && cta !== 'qr';
  }

  function showBriefEditPanel() {
    removeBriefEditPanel();
    if (!shouldShowBriefEditPanel()) return;
    const b = state.briefPartial;
    const diensten = Array.isArray(b.diensten)
      ? b.diensten
      : String(b.diensten || '').split(',').map(s => s.trim()).filter(Boolean);
    const colors = b.brand_colors || state.brandColors || [];
    const panel = document.createElement('div');
    panel.className = 'da-brief-edit-panel';
    panel.id = 'da-brief-edit-panel';
    panel.innerHTML =
      '<p class="da-brief-edit-panel__title"><strong>' + t('editPanelTitle') + '</strong></p>' +
      '<div class="da-brief-edit-panel__sections">' +
        '<fieldset class="da-edit-section"><legend>Bedrijf</legend>' +
          '<label class="da-edit-field">Bedrijfsnaam<input type="text" id="da-edit-bedrijfsnaam" class="da-form-input" value="' + escapeHtml(b.bedrijfsnaam || '') + '"></label>' +
          '<div class="da-edit-chips">' + renderEditChipGroup('company.branche', EDIT_CHIP_OPTIONS['company.branche']) + '</div>' +
          '<div class="da-edit-chips">' + renderEditChipGroup('company.regio', EDIT_CHIP_OPTIONS['company.regio']) + '</div>' +
          '<label class="da-edit-field">Regio (anders)<input type="text" id="da-edit-regio-text" class="da-form-input" placeholder="Stad/regio" value="' + escapeHtml(b.regio || '') + '"></label>' +
        '</fieldset>' +
        '<fieldset class="da-edit-section"><legend>Auto</legend>' +
          '<div class="da-edit-chips">' + renderEditChipGroup('vehicle.type', EDIT_CHIP_OPTIONS['vehicle.type']) + '</div>' +
          '<div class="da-edit-chips">' + renderEditChipGroup('vehicle.usage', EDIT_CHIP_OPTIONS['vehicle.usage']) + '</div>' +
        '</fieldset>' +
        '<fieldset class="da-edit-section"><legend>Marketing</legend>' +
          '<label class="da-edit-field">Doelgroep<input type="text" id="da-edit-doelgroep" class="da-form-input" value="' + escapeHtml(b.doelgroep || '') + '"></label>' +
          '<label class="da-edit-field">Dienst 1<input type="text" id="da-edit-dienst1" class="da-form-input" value="' + escapeHtml(diensten[0] || '') + '"></label>' +
          '<label class="da-edit-field">Dienst 2<input type="text" id="da-edit-dienst2" class="da-form-input" value="' + escapeHtml(diensten[1] || '') + '"></label>' +
          '<label class="da-edit-field">Dienst 3<input type="text" id="da-edit-dienst3" class="da-form-input" value="' + escapeHtml(diensten[2] || '') + '"></label>' +
          '<div class="da-edit-chips">' + renderEditChipGroup('marketing.desired_impression', EDIT_CHIP_OPTIONS['marketing.desired_impression']) + '</div>' +
        '</fieldset>' +
        '<fieldset class="da-edit-section"><legend>Contact & CTA</legend>' +
          '<div class="da-edit-chips" id="da-edit-cta-chips">' + renderEditChipGroup('marketing.primary_cta', EDIT_CHIP_OPTIONS['marketing.primary_cta']) + '</div>' +
          '<label class="da-edit-field" id="da-edit-row-telefoon">Telefoon<input type="tel" id="da-edit-telefoon" class="da-form-input" value="' + escapeHtml(b.telefoon || '') + '"></label>' +
          '<label class="da-edit-field" id="da-edit-row-website">Website<input type="url" id="da-edit-website" class="da-form-input" value="' + escapeHtml(b.website || '') + '"></label>' +
        '</fieldset>' +
        '<fieldset class="da-edit-section"><legend>Logo & merk</legend>' +
          '<label class="da-edit-field">' + t('editLogoReupload') +
            '<input type="file" id="da-edit-logo" accept=".png,.jpg,.jpeg">' +
          '</label>' +
          '<div class="da-edit-colors">' +
            [0, 1, 2].map(i =>
              '<input type="color" id="da-edit-color' + (i + 1) + '" value="' + escapeHtml(colors[i] || '#009fe3') + '">'
            ).join('') +
          '</div>' +
          '<label class="da-edit-field">Slogan<input type="text" id="da-edit-slogan" class="da-form-input" value="' + escapeHtml(b.slogan || '') + '"></label>' +
        '</fieldset>' +
        '<fieldset class="da-edit-section"><legend>Budget</legend>' +
          '<div class="da-edit-chips">' + renderEditChipGroup('budget.range', EDIT_CHIP_OPTIONS['budget.range']) + '</div>' +
          '<div class="da-edit-chips">' + renderEditChipGroup('budget.flexibility', EDIT_CHIP_OPTIONS['budget.flexibility']) + '</div>' +
        '</fieldset>' +
      '</div>' +
      '<div class="da-brief-edit-panel__actions">' +
        '<button type="button" class="da-form-submit" id="da-edit-save">' + t('editSave') + '</button>' +
      '</div>';
    INPUT.appendChild(panel);
    panel.querySelectorAll('input[name="da-edit-marketing.primary_cta"]').forEach(el => {
      el.addEventListener('change', syncEditContactVisibility);
    });
    syncEditContactVisibility();
    document.getElementById('da-edit-save').addEventListener('click', () => saveBriefEdits());
  }

  async function saveBriefEdits() {
    if (state.busy) return;
    state.busy = true;
    const saveBtn = document.getElementById('da-edit-save');
    if (saveBtn) saveBtn.disabled = true;
    try {
      const logoInput = document.getElementById('da-edit-logo');
      const logoFile = logoInput && logoInput.files && logoInput.files[0];
      if (logoFile) {
        if (!isAllowedLogoFile(logoFile)) {
          addBotMsg('<strong>Logo formaat niet ondersteund.</strong> Upload alleen PNG of JPG.');
          return;
        }
        showTyping();
        const detached = await detachLogoFile(logoFile);
        state.logoFile = detached;
        state.logoUrl = URL.createObjectURL(detached);
        const dataLogo = await callChatTurnApi(t('logoUploadedMsg'), detached);
        hideTyping();
        applyChatResponse(dataLogo);
      }
      const updates = collectBriefEditFieldUpdates();
      if (!Object.keys(updates).length && !logoFile) {
        addBotMsg('Geen wijzigingen gevonden om op te slaan.');
        return;
      }
      showTyping();
      const data = await callChatApi('', { field_updates: updates });
      hideTyping();
      applyChatResponse(data);
      addBotMsg(botReply(data) || t('editSaved'));
      removeBriefEditPanel();
      showComposer();
    } catch (err) {
      hideTyping();
      addBotMsg('<strong>Opslaan mislukt.</strong> ' + ((err && err.message) || 'Probeer opnieuw.'));
      showComposer();
    } finally {
      state.busy = false;
      if (saveBtn) saveBtn.disabled = false;
    }
  }

  function showConfirmCard() {
    const existing = document.getElementById('da-confirm-card');
    if (existing) existing.remove();

    const card = document.createElement('div');
    card.className = 'da-confirm-card';
    card.id = 'da-confirm-card';
    card.innerHTML =
      '<p class="da-confirm-card__title"><strong>' + t('confirmTitle') + '</strong></p>' +
      '<div class="da-confirm-card__body">' + briefSummaryHtml() + '</div>' +
      '<div class="da-confirm-card__actions">' +
        '<button type="button" class="da-form-submit" id="da-confirm-yes">' + t('confirmYes') + '</button>' +
        '<button type="button" class="da-form-submit da-form-submit--ghost" id="da-confirm-edit">' + t('confirmEdit') + '</button>' +
      '</div>';

    INPUT.appendChild(card);
    document.getElementById('da-confirm-yes').addEventListener('click', () => {
      if (state.busy) return;
      state.busy = true;
      const gate = generateReadinessGate();
      logReadinessTelemetry(gate);
      if (!gate.ok) {
        if (gate.reason === 'no_logo' || gate.reason === 'logo_reupload') {
          addBotMsg(t('logoRequired'));
        } else if (gate.reason === 'not_ready' && state.missingFields.length) {
          addBotMsg(t('briefIncomplete', { fields: state.missingFields.join(', ') }));
        } else {
          addBotMsg(t('briefNotReady'));
        }
        state.busy = false;
        return;
      }
      state.briefConfirmed = true;
      addUserMsg(t('confirmUser'));
      runGenerate().finally(() => { state.busy = false; });
    });
    document.getElementById('da-confirm-edit').addEventListener('click', () => {
      const panel = document.getElementById('da-brief-edit-panel');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        panel.classList.add('da-brief-edit-panel--highlight');
        setTimeout(() => panel.classList.remove('da-brief-edit-panel--highlight'), 1200);
        return;
      }
      showBriefEditPanel();
    });
  }

  async function submitMessage(raw) {
    const text = (raw || '').trim();
    if (!text || state.busy) return;
    if (!CFG.apiEnabled) {
      addBotMsg(t('chatNotLive'));
      return;
    }
    state.busy = true;
    addUserMsg(text);
    const input = document.getElementById('da-chat-input');
    if (input) input.value = '';
    showTyping();
    try {
      const data = await callChatApi(text);
      hideTyping();
      applyChatResponse(data);
      addBotMsg(botReply(data));
      showComposer();
    } catch (err) {
      hideTyping();
      const msg = (err && err.message) ? String(err.message) : '';
      const rateLimited = /te veel chatberichten|429|too many|zbyt wiele/i.test(msg);
      const offline = /failed to fetch|networkerror/i.test(msg);
      if (rateLimited) {
        addBotMsg(t('rateLimited'));
      } else if (offline) {
        addBotMsg('<strong>Chat niet bereikbaar.</strong> De Design Agent API reageert niet. Probeer over een paar minuten opnieuw.');
      } else {
        addBotMsg('<strong>Chat niet beschikbaar.</strong> ' + (msg || 'Probeer later opnieuw.'));
      }
    } finally {
      state.busy = false;
    }
  }

  async function handleLogoUpload(file) {
    if (state.busy) return;
    if (!isAllowedLogoFile(file)) {
      addBotMsg('<strong>Logo formaat niet ondersteund.</strong> Upload alleen PNG of JPG.');
      return;
    }
    state.busy = true;
    const detached = await detachLogoFile(file);
      state.logoFile = detached;
      state.logoReuploadRequired = false;
      const reuploadBanner = document.getElementById('da-logo-reupload');
      if (reuploadBanner) reuploadBanner.remove();
    state.logoUrl = URL.createObjectURL(detached);
    state.brandColors = await extractColors(detached);
    state.briefPartial.brand_colors = state.brandColors;
    addUserMsg('Logo geüpload: ' + file.name);
    showTyping();
    try {
      const data = await callChatTurnApi('Ik heb mijn logo geüpload.', detached);
      hideTyping();
      applyChatResponse(data);
      const swatches = state.brandColors.map(c =>
        `<span class="da-color-swatch" style="background:${c}"></span> ${c}`
      ).join(' ');
      addBotMsg(botReply(data) + (swatches ? '<br>' + t('colorsLabel') + ': ' + swatches : ''));
      if (state.sessionId) await persistLogoToIndexedDb(state.sessionId, detached);
      showComposer();
    } catch (err) {
      hideTyping();
      const msg = (err && err.message) ? String(err.message) : '';
      state.logoFile = null;
      state.logoUrl = '';
      addBotMsg('<strong>Logo upload mislukt.</strong> ' + (msg || 'Probeer opnieuw.'));
      showComposer();
    } finally {
      state.busy = false;
    }
  }

  async function runGenerate() {
    if (!CFG.apiEnabled) {
      addBotMsg(
        'De <strong>AI-mock-up generator</strong> wordt momenteel geactiveerd. ' +
        'Je briefing is opgeslagen — probeer het binnenkort opnieuw.'
      );
      return;
    }
    const gate = generateReadinessGate();
    logReadinessTelemetry(gate);
    if (!gate.ok) {
      if (gate.reason === 'no_logo' || gate.reason === 'logo_reupload') {
        addBotMsg('Upload eerst je <strong>logo</strong> voordat we mock-ups maken.');
      } else {
        addBotMsg('Je briefing is nog niet klaar voor mock-ups.');
      }
      return;
    }

    const confirmCard = document.getElementById('da-confirm-card');
    if (confirmCard) confirmCard.remove();
    INPUT.innerHTML =
      '<div class="da-progress">' +
        '<div class="da-progress__bar-track"><div class="da-progress__bar-fill" id="da-prog-fill"></div></div>' +
        '<div class="da-progress__text" id="da-prog-text">Mock-ups genereren...</div>' +
      '</div>';

    const fill = document.getElementById('da-prog-fill');
    const text = document.getElementById('da-prog-text');
    let w = 10;
    const tick = setInterval(() => {
      w = Math.min(w + 8, 92);
      if (fill) fill.style.width = w + '%';
    }, 2000);

    try {
      state.apiResponse = await callGenerateApi();
      clearInterval(tick);
      if (fill) fill.style.width = '100%';
      if (text) text.textContent = 'Klaar!';
      persistBrief();
      showResults();
    } catch (err) {
      clearInterval(tick);
      INPUT.innerHTML = '';
      state.apiResponse = null;
      state.briefConfirmed = false;
      const msg = (err && err.message) ? String(err.message) : '';
      const rateLimited = /te veel verzoeken|429|RATE_LIMIT|al 2 mock-ups/i.test(msg);
      if (rateLimited) {
        addBotMsg(
          '<strong>Je hebt al 2 mock-ups.</strong> ' +
          'Per netwerk genereren we één Standard + één Premium per uur (kostenvrije demo). ' +
          'Wacht een uur of neem contact op via flexgrafik.nl.'
        );
      } else {
        addBotMsg('<strong>Generatie mislukt.</strong> ' + (msg || 'Probeer later opnieuw.') +
          ' Je kunt opnieuw bevestigen om het nog eens te proberen.');
      }
      showComposer();
    }
  }

  async function callGenerateApi() {
    const b = state.briefPartial;
    if (!state.logoFile || state.logoFile.size < 32) {
      throw new Error('Logo ontbreekt of is beschadigd. Upload je logo opnieuw.');
    }
    if (!String(b.bedrijfsnaam || '').trim()) {
      throw new Error('Bedrijfsnaam ontbreekt in je briefing.');
    }
    const fd = new FormData();
    const appendIf = (key, val) => {
      const s = val == null ? '' : String(val).trim();
      if (s !== '') fd.append(key, s);
    };
    const vehicle = normalizeVehicleId(b.vehicle) || 'caddy';
    fd.append('vehicle', vehicle);
    fd.append('bedrijfsnaam', String(b.bedrijfsnaam).trim());
    appendIf('branche', b.branche);
    appendIf('telefoon', b.telefoon);
    appendIf('website', b.website);
    appendIf('diensten', Array.isArray(b.diensten) ? b.diensten.join(', ') : b.diensten);
    appendIf('doelgroep', b.doelgroep);
    appendIf('positionering', b.positionering || b.stijl || b.desired_impression || 'balanced');
    appendIf('regio', b.regio);
    appendIf('vehicle_usage', b.vehicle_usage);
    appendIf('desired_impression', b.desired_impression || b.positionering);
    appendIf('budget_range', b.budget_range);
    fd.append('budget_explicit', b._budget_explicit ? 'true' : 'false');
    appendIf('mockup_b_sku', b.mockup_b_sku);
    appendIf('mockup_a_sku', b.mockup_a_sku);
    fd.append('brief_confirmed', 'true');
    if (state.sessionId) fd.append('session_id', state.sessionId);
    fd.append('locale', state.locale || getLocale());
    const colors = b.brand_colors || state.brandColors || [];
    if (Array.isArray(colors) && colors.length) {
      fd.append('brand_colors', JSON.stringify(colors));
    }
    const opts = b.tekst_opties || [];
    if (Array.isArray(opts) && opts.length) {
      fd.append('tekst_opties', JSON.stringify(opts));
    }
    appendIf('slogan', b.slogan);
    fd.append('logo', state.logoFile, state.logoFile.name || 'logo.png');

    const res = await fetchNoCache(CFG.apiUrl, { method: 'POST', body: fd, headers: apiHeaders(false) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(formatApiError(data, res.status));
    return data;
  }

  function persistBrief() {
    try {
      const b = state.briefPartial;
      sessionStorage.setItem('designAgentBrief', JSON.stringify({
        session_id: state.sessionId,
        brief_id: state.apiResponse?.brief_id || null,
        mockups: state.apiResponse?.mockups || [],
        bedrijfsnaam: b.bedrijfsnaam || '',
        branche: b.branche || '',
        vehicle: normalizeVehicleId(b.vehicle) || 'caddy',
        telefoon: b.telefoon || '',
        website: b.website || '',
        slogan: b.slogan || '',
        diensten: b.diensten || '',
        doelgroep: b.doelgroep || '',
        stijl: b.positionering || b.stijl || '',
        mockup_b_sku: b.mockup_b_sku || state.apiResponse?.mockup_b_sku || '',
        mockup_a_sku: b.mockup_a_sku || state.apiResponse?.mockup_a_sku || ''
      }));
    } catch (e) { /* ignore */ }
  }

  function replayMessagesTail(tail) {
    if (!Array.isArray(tail)) return;
    tail.forEach(msg => {
      if (!msg || !msg.content) return;
      if (msg.role === 'user') addUserMsg(msg.content);
      else if (msg.role === 'assistant') addBotMsg(msg.content);
    });
  }

  function isStubMockup(mockup) {
    const src = mockup.url || mockup.data_url || '';
    if (!src) return true;
    if (src.startsWith('data:image') && src.length < 7000) return true;
    return false;
  }

  function showResults() {
    INPUT.innerHTML =
      '<div style="text-align:center;padding:8px;color:var(--zzp-success,#22c55e);font-weight:600;font-size:0.9rem">' +
      '✓ Ontwerp klaar — scroll naar beneden voor je resultaten</div>';
    const mockups = state.apiResponse?.mockups || [];
    if (mockups.length && mockups.every(isStubMockup)) {
      addBotMsg(
        '<strong>Let op:</strong> De mock-ups lijken tijdelijke placeholders. ' +
        'Probeer het later opnieuw of neem contact op met FlexGrafik.'
      );
    } else {
      addBotMsg('<strong>Hier zijn je twee ontwerpen!</strong> Scroll naar beneden om ze te bekijken.');
    }
    renderMockups();
    renderRecommendations();
    hideOfferteSuccess();
    RESULTS.hidden = false;
    setTimeout(() => RESULTS.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
  }

  function daAnalyticsAllowed() {
    try {
      const consent = JSON.parse(localStorage.getItem('fg_cookie_consent') || '{}');
      return !!consent.analytics;
    } catch (e) {
      return false;
    }
  }

  function daTrackEvent(name, params) {
    if (!daAnalyticsAllowed() || typeof window.gtag !== 'function') return;
    window.gtag('event', name, params || {});
  }

  function mockupVariantKey(m) {
    const v = String(m.variant || '').toLowerCase();
    if (v === 'premium' || v === 'tier_a') return 'premium';
    return 'standard';
  }

  function selectMockupForOfferte(mockup) {
    state.selectedMockup = mockup;
    document.querySelectorAll('.da-mockup-card').forEach(c => c.classList.remove('da-mockup-card--selected'));
    const card = document.querySelector('.da-mockup-card[data-sku="' + (mockup.sku || '') + '"]');
    if (card) card.classList.add('da-mockup-card--selected');
    showOffertePanel(mockup);
    daTrackEvent('mockup_selected', {
      variant: mockupVariantKey(mockup),
      sku: mockup.sku || ''
    });
  }

  function hideOffertePanel() {
    if (OFFERTE_PANEL) OFFERTE_PANEL.hidden = true;
  }

  function hideOfferteSuccess() {
    if (OFFERTE_SUCCESS) OFFERTE_SUCCESS.hidden = true;
  }

  function showOffertePanel(mockup) {
    if (!OFFERTE_PANEL || !mockup) return;
    hideOfferteSuccess();
    const titleEl = document.getElementById('da-offerte-selection');
    if (titleEl) {
      titleEl.textContent = tierLabel(mockup) + ' — ' + (mockup.naam || mockup.sku || '');
    }
    OFFERTE_PANEL.hidden = false;
    OFFERTE_PANEL.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function offerteStorageKey() {
    const sku = state.selectedMockup && state.selectedMockup.sku;
    return state.sessionId && sku ? 'daOfferte:' + state.sessionId + ':' + sku : '';
  }

  async function submitOfferteRequest() {
    if (state.busy || !state.selectedMockup) return;
    const emailEl = document.getElementById('da-offerte-email');
    const telEl = document.getElementById('da-offerte-telefoon');
    const consentEl = document.getElementById('da-offerte-consent');
    const marketingEl = document.getElementById('da-offerte-consent-marketing');
    const errEl = document.getElementById('da-offerte-error');
    const email = emailEl ? String(emailEl.value || '').trim().toLowerCase() : '';
    const telefoon = telEl ? String(telEl.value || '').trim() : '';
    const consent = consentEl ? consentEl.checked : false;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (errEl) errEl.textContent = 'Vul een geldig e-mailadres in.';
      return;
    }
    if (!telefoon || telefoon.length < 8) {
      if (errEl) errEl.textContent = 'Vul een telefoonnummer in.';
      return;
    }
    if (!consent) {
      if (errEl) errEl.textContent = 'Geef toestemming om contact op te nemen voor je offerte.';
      return;
    }
    if (errEl) errEl.textContent = '';
    const cachedId = offerteStorageKey();
    if (cachedId) {
      try {
        const prev = sessionStorage.getItem(cachedId);
        if (prev) {
          showOfferteSuccess(JSON.parse(prev));
          return;
        }
      } catch (e) { /* ignore */ }
    }
    state.busy = true;
    const submitBtn = document.getElementById('da-offerte-submit');
    if (submitBtn) submitBtn.disabled = true;
    const m = state.selectedMockup;
    const body = {
      session_id: state.sessionId,
      locale: state.locale || getLocale(),
      contact: {
        email,
        telefoon,
        consent_offerte: true,
        consent_marketing: !!(marketingEl && marketingEl.checked)
      },
      selection: {
        variant: mockupVariantKey(m),
        sku: m.sku || '',
        product_naam: m.naam || tierLabel(m),
        price_from_eur: m.price_suggested || null,
        mockup_url: m.url || m.data_url || ''
      },
      brief_partial: state.briefPartial,
      generate_meta: {
        mockup_a_sku: state.briefPartial.mockup_a_sku || state.apiResponse?.mockup_a_sku || '',
        mockup_b_sku: state.briefPartial.mockup_b_sku || state.apiResponse?.mockup_b_sku || '',
        brief_id: state.apiResponse?.brief_id || null
      }
    };
    try {
      const res = await fetchNoCache(OFFERTE_URL, {
        method: 'POST',
        headers: apiHeaders(true),
        body: JSON.stringify(body)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(formatApiError(data, res.status));
      }
      if (cachedId) {
        try { sessionStorage.setItem(cachedId, JSON.stringify(data)); } catch (e) { /* ignore */ }
      }
      state.offerteRequestId = data.offerte_request_id || null;
      daTrackEvent('offerte_requested', {
        variant: mockupVariantKey(m),
        offerte_id: state.offerteRequestId || ''
      });
      showOfferteSuccess(data);
    } catch (err) {
      if (errEl) {
        errEl.textContent = (err && err.message) ? String(err.message) : 'Offerte aanvragen mislukt. Probeer opnieuw.';
      }
    } finally {
      state.busy = false;
      if (submitBtn) submitBtn.disabled = false;
    }
  }

  function buildWhatsappLink(prefill, refId) {
    const base = 'https://wa.me/31687286151';
    let text = String(prefill || t('offerteWhatsappPrefill'));
    const name = state.briefPartial && state.briefPartial.bedrijfsnaam;
    if (name) text += ' — ' + name;
    const m = state.selectedMockup;
    if (m && m.sku) text += ' (' + m.sku + ')';
    if (refId && refId !== '—') text += ' ref ' + refId;
    return base + '?text=' + encodeURIComponent(text);
  }

  function showOfferteSuccess(data) {
    hideOffertePanel();
    if (!OFFERTE_SUCCESS) return;
    const ref = data.offerte_request_id || state.offerteRequestId || '—';
    const titleEl = document.getElementById('da-offerte-success-title');
    const bodyEl = document.getElementById('da-offerte-success-body');
    const trustEl = document.getElementById('da-offerte-success-trust');
    const waEl = document.getElementById('da-offerte-success-whatsapp');
    const calEl = document.getElementById('da-offerte-success-calendar');
    const refEl = document.getElementById('da-offerte-ref');
    if (titleEl) titleEl.textContent = t('offerteSuccessTitle');
    if (bodyEl) bodyEl.textContent = t('offerteSuccessBody');
    if (trustEl) trustEl.textContent = t('offerteTrustAfter');
    if (refEl) refEl.textContent = ref;
    if (waEl) {
      waEl.href = buildWhatsappLink(t('offerteWhatsappPrefill'), ref);
      waEl.textContent = t('offerteWhatsappCta');
    }
    if (calEl) {
      calEl.href = t('offerteCalendarUrl');
      calEl.textContent = t('offerteCalendarCta');
    }
    OFFERTE_SUCCESS.hidden = false;
    OFFERTE_SUCCESS.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderMockups() {
    const mockups = sortMockupsTierOrder(state.apiResponse?.mockups || []);
    MOCKUPS.innerHTML = '';
    if (!mockups.length) return;

    mockups.forEach(m => {
      const letter = tierLetter(m.variant);
      const title = tierLabel(m);
      const price = formatPriceNl(m.price_suggested);
      const isPremium = letter === 'a';
      const isAspirational = isPremium && (m.budget_note_nl || (isPremium && state.premiumAspirational));
      const aspirationalBadge = isAspirational
        ? '<span class="da-mockup-card__aspirational" title="' +
            escapeHtml(m.budget_note_nl || state.premiumBudgetNote || '') +
            '">Groeirichting</span>'
        : '';
      const aspirationalClass = isAspirational ? ' da-mockup-card--aspirational' : '';
      const card = document.createElement('article');
      card.className = 'da-mockup-card da-mockup-card--' + letter + aspirationalClass;
      card.dataset.sku = m.sku || '';
      const imgSrc = m.url || m.data_url || '';
      const imgTag = imgSrc
        ? `<img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(title)}" loading="lazy">`
        : '<div class="da-mockup-card__fallback">Mock-up laden...</div>';
      card.innerHTML =
        '<div class="da-mockup-card__preview">' +
          `<span class="da-mockup-card__badge">${escapeHtml(title)}</span>` + aspirationalBadge + imgTag +
        '</div>' +
        '<div class="da-mockup-card__body">' +
          '<h3>' + escapeHtml(m.naam || title) + '</h3>' +
          (price ? '<p class="da-mockup-card__price">' + t('fromPrice') + ' ' + price +
            ' <span class="da-mockup-card__indicatief">(' + t('indicatief') + ')</span></p>' : '') +
          (isAspirational
            ? '<p class="da-mockup-card__budget-note">' +
                escapeHtml(m.budget_note_nl || state.premiumBudgetNote || '') +
              '</p>'
            : '') +
          '<button type="button" class="da-mockup-card__cta btn-vca btn-action" data-offerte-select="1">' +
            t('offerteCta') +
          '</button>' +
        '</div>';
      const selectBtn = card.querySelector('[data-offerte-select]');
      if (selectBtn) {
        selectBtn.addEventListener('click', e => {
          e.stopPropagation();
          selectMockupForOfferte(m);
        });
      }
      card.addEventListener('click', e => {
        if (e.target.closest('button')) return;
        selectMockupForOfferte(m);
      });
      MOCKUPS.appendChild(card);
    });
  }

  function mockupTierForSku(sku) {
    const mockups = state.apiResponse?.mockups || [];
    const hit = mockups.find(m => m.sku === sku);
    return hit ? tierLabel(hit) : '';
  }

  function renderRecommendations() {
    if (RECO_SECTION) RECO_SECTION.hidden = true;
    if (WIZ_LINK) WIZ_LINK.hidden = true;
    RECO_GRID.innerHTML = '';
  }

  function resolveWizardHref(path) {
    if (!path) return CFG.wizardUrl || '/wizard';
    if (path.startsWith('http')) return path;
    const base = (CFG.wizardUrl || '/wizard').split('?')[0].replace(/\/wizard\/?$/, '');
    return path.startsWith('/') ? (window.location.origin + path) : (base + path);
  }

  function isProdDesignAgentHost(host) {
    const h = host || '';
    return (
      (h.endsWith('flexgrafik.nl') || h.endsWith('flexgrafik.com')) &&
      !h.includes('localhost') &&
      !h.endsWith('.sandbox') &&
      !h.endsWith('.test')
    );
  }

  function stripFixtureQueryParam() {
    try {
      const params = new URLSearchParams(window.location.search);
      if (!params.has('da_fixture')) return;
      params.delete('da_fixture');
      const clean = params.toString();
      const url = window.location.pathname + (clean ? '?' + clean : '');
      history.replaceState({}, '', url);
    } catch (e) { /* history API may throw in some test runners */ }
  }

  /** ?da_reset=1 — hard-clear client session before init (HITL / support). */
  function consumeDaResetQuery() {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('da_reset') !== '1') return false;
      params.delete('da_reset');
      const clean = params.toString();
      history.replaceState({}, '', window.location.pathname + (clean ? '?' + clean : ''));
      return true;
    } catch (e) {
      return false;
    }
  }

  function applySessionPayload(session) {
    state.sessionId = session.session_id;
    state.briefPartial = session.brief_partial || {};
    if (session.locale) state.locale = setLocale(session.locale);
    else if (state.briefPartial.locale) state.locale = setLocale(state.briefPartial.locale);
    syncLocalePicker();
    state.phase = session.phase || session.stap || 1;
    state.stap = session.stap || session.phase || 1;
    state.stapLabel = session.stap_label || '';
    state.quickReplies = Array.isArray(session.quick_replies) ? session.quick_replies : [];
    state.quickReplyField = session.quick_reply_field || '';
    state.readyToGenerate = !!session.ready_to_generate;
    state.briefConfirmed = !!session.brief_confirmed;
    state.missingFields = Array.isArray(session.missing_fields) ? session.missing_fields : [];
    state.logoReuploadRequired = !!session.logo_reupload_required;
  }

  function replaySessionMessages(session) {
    const last = botReply(session);
    if (last) syncBriefFromSummaryFallback(last);
    if (Array.isArray(session.messages_tail) && session.messages_tail.length) {
      replayMessagesTail(session.messages_tail);
    } else if (last) {
      addBotMsg(last);
    }
  }

  function loadResultsFixture() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('da_fixture') !== 'results') return false;
    const host = window.location.hostname || '';
    // Wave3 P2 — double lock: prod hostname OR allowResultsFixture===false → no faux mockups.
    const hostIsProd = isProdDesignAgentHost(host);
    const fixtureOptIn = CFG.allowResultsFixture !== false;
    if (hostIsProd || !fixtureOptIn) {
      stripFixtureQueryParam();
      return false;
    }
    state.apiResponse = FIXTURE_RESPONSE;
    state.briefPartial = { vehicle: 'caddy', mockup_b_sku: 'MA-005', mockup_a_sku: 'CS-SET-PRO-ZZP' };
    INPUT.innerHTML =
      '<div style="text-align:center;padding:8px;color:var(--text-secondary,#a1a1aa);font-size:0.85rem">' +
      'Voorbeeldresultaten (fixture)</div>';
    showResults();
    return true;
  }

  function syncLocalePicker() {
    const root = document.getElementById('da-lang');
    if (!root) return;
    const loc = state.locale || getLocale();
    root.querySelectorAll('.da-lang__btn').forEach(function (btn) {
      const active = btn.getAttribute('data-locale') === loc;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.classList.toggle('is-active', active);
    });
    const status = document.getElementById('da-status');
    if (status) status.textContent = t('statusOnline');
  }

  function bindLocalePicker() {
    const root = document.getElementById('da-lang');
    if (!root || root.dataset.bound === '1') return;
    root.dataset.bound = '1';
    root.addEventListener('click', function (ev) {
      const btn = ev.target.closest('.da-lang__btn');
      if (!btn || state.busy) return;
      const next = normalizeLocale(btn.getAttribute('data-locale'));
      if (next === (state.locale || getLocale())) return;
      state.locale = setLocale(next);
      syncLocalePicker();
      // Mid-session language change = Opnieuw beginnen
      clearDesignAgentSession();
      clearChatMessages();
      state.logoFile = null;
      state.logoUrl = '';
      state.brandColors = [];
      state.apiResponse = null;
      state.briefConfirmed = false;
      updateStapProgress();
      showTyping();
      fetchOpening()
        .then(function (data) {
          hideTyping();
          applyChatResponse(data);
          addBotMsg(botReply(data));
          showComposer();
        })
        .catch(function () {
          hideTyping();
          addBotMsg(t('openingFallback'));
          showComposer();
        });
    });
  }

  function bindOfferteForm() {
    const submitBtn = document.getElementById('da-offerte-submit');
    if (submitBtn && submitBtn.dataset.bound !== '1') {
      submitBtn.dataset.bound = '1';
      submitBtn.addEventListener('click', () => submitOfferteRequest());
    }
  }

  async function init() {
    bindOfferteForm();
    if (loadResultsFixture()) return;

    state.locale = setLocale(getLocale());
    bindLocalePicker();
    syncLocalePicker();

    if (consumeDaResetQuery()) {
      clearDesignAgentSession();
      clearChatMessages();
    }

    state.sessionId = loadSessionId();

    if (!CFG.apiEnabled) {
      addBotMsg(t('chatNotLive'));
      showOfflineComposer();
      return;
    }

    if (!CHAT_URL) {
      addBotMsg(t('unavailable'));
      return;
    }

    const savedSession = state.sessionId;
    if (savedSession) {
      showTyping();
      try {
        const session = await fetchChatSession(savedSession);
        hideTyping();
        if (session) {
          applySessionPayload(session);
          const restoredLogo = await restoreLogoFromIndexedDb(savedSession);
          if (restoredLogo) {
            state.logoFile = restoredLogo;
            state.logoReuploadRequired = false;
            state.logoUrl = URL.createObjectURL(restoredLogo);
            state.brandColors = await extractColors(restoredLogo);
            state.briefPartial.brand_colors = state.brandColors;
            state.briefPartial.logo_file = restoredLogo.name || 'logo.png';
          }
          updateStapProgress();
          if (shouldPromptSessionResume(session)) {
            state.pendingResumeSnapshot = session;
            clearChatMessages();
            addBotMsg(t('resumePrompt'));
            showSessionResumeChoice();
            return;
          }
          replaySessionMessages(session);
          addBotMsg(t('welcomeBack', { stap: state.stap || state.phase }));
          showComposer();
          return;
        }
        addBotMsg(t('sessionExpired'));
        clearDesignAgentSession();
      } catch (e) {
        // P0-D — never fall through to fetchOpening with a stale sessionId
        hideTyping();
        clearDesignAgentSession();
      }
    }

    showTyping();
    try {
      const data = await fetchOpening();
      hideTyping();
      applyChatResponse(data);
      addBotMsg(botReply(data));
      showComposer();
    } catch (err) {
      hideTyping();
      addBotMsg(t('openingFallback'));
      showComposer();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
