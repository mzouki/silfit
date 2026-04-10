/* ─────────────────────────────────────────────────────────
   SilFit — popup.js
   LGPD-compliant lead capture popup with WhatsApp redirect
   ───────────────────────────────────────────────────────── */

(function () {
  'use strict';

  // ── Configuration ───────────────────────────────────────
  const CONFIG = {
    whatsappNumber: '5511986531708',
    // Apps Script publicado como Web App (Sílvia Leads)
    appsScriptUrl: 'https://script.google.com/macros/s/AKfycbx4osMhM2BvJSQLNb9IDEGnMJkSxUIpcj4nMh_52I7D8Jf2dhhB9rTPzzdxaTChRq_u/exec',
    // Templates de mensagem por tipo de origem
    messages: {
      geral: 'Oi Sílvia! Meu nome é {nome}. Quero saber mais sobre as marmitas SilFit! 🍱',
      fit: 'Oi Sílvia! Meu nome é {nome}. Quero fazer um pedido de Marmita Fit! 🍱',
      tradicional: 'Oi Sílvia! Meu nome é {nome}. Quero fazer um pedido de Marmita Tradicional! 🍱',
      combo_fit_10: 'Oi Sílvia! Meu nome é {nome}. Quero saber sobre o Combo Fit de 10 marmitas! 🍱',
      combo_fit_20: 'Oi Sílvia! Meu nome é {nome}. Quero saber sobre o Combo Fit de 20 marmitas! 🍱',
      combo_trad_10: 'Oi Sílvia! Meu nome é {nome}. Quero saber sobre o Combo Tradicional de 10 marmitas! 🍱',
      combo_trad_20: 'Oi Sílvia! Meu nome é {nome}. Quero saber sobre o Combo Tradicional de 20 marmitas! 🍱',
    }
  };

  // ── DOM elements ────────────────────────────────────────
  const overlay = document.getElementById('popup-overlay');
  const closeBtn = document.getElementById('popup-close');
  const form = document.getElementById('lead-form');
  const inputNome = document.getElementById('lead-nome');
  const inputWhats = document.getElementById('lead-whatsapp');
  const inputConsent = document.getElementById('lead-consent');
  const submitBtn = document.getElementById('lead-submit');
  const fieldNome = document.getElementById('field-nome');
  const fieldWhats = document.getElementById('field-whatsapp');
  const consentError = document.getElementById('consent-error');

  if (!overlay || !form) return;

  // State
  let currentSection = 'geral';
  let currentType = 'geral';
  let lastFocus = null;

  // ── Helpers ─────────────────────────────────────────────
  const maskPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const validateName = (v) => v.trim().length >= 2;
  const validatePhone = (v) => v.replace(/\D/g, '').length >= 10;

  const buildWhatsAppUrl = (nome, type) => {
    const template = CONFIG.messages[type] || CONFIG.messages.geral;
    const message = template.replace('{nome}', nome.trim().split(' ')[0]);
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  // Send lead to Apps Script (fire and forget — never blocks redirect)
  const sendLead = async (data) => {
    if (!CONFIG.appsScriptUrl || CONFIG.appsScriptUrl.includes('PASTE_YOUR')) {
      console.warn('[SilFit] Apps Script URL not configured. Lead not sent.');
      return;
    }
    try {
      await fetch(CONFIG.appsScriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Apps Script web apps need this for cross-origin
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error('[SilFit] Failed to send lead:', err);
      // Silent fail — never block conversion
    }
  };

  // ── Open / Close popup ──────────────────────────────────
  const openPopup = (section, type) => {
    currentSection = section || 'geral';
    currentType = type || 'geral';
    lastFocus = document.activeElement;
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => inputNome && inputNome.focus(), 350);

    if (window.silfitTracking) {
      window.silfitTracking.trackPopupOpen(currentSection);
    }
  };

  const closePopup = (wasSubmitted = false) => {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();

    if (!wasSubmitted && window.silfitTracking) {
      window.silfitTracking.trackPopupClose(currentSection);
    }
  };

  // ── Event bindings ──────────────────────────────────────
  // CTAs that open the popup
  document.querySelectorAll('[data-cta]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const section = el.getAttribute('data-cta-section') || 'geral';
      const type = el.getAttribute('data-cta-type') || 'geral';
      const ctaText = el.textContent.trim().slice(0, 60);

      if (window.silfitTracking) {
        window.silfitTracking.trackCtaClick(ctaText, section, type);
      }

      openPopup(section, type);
    });
  });

  // Close handlers
  closeBtn && closeBtn.addEventListener('click', () => closePopup(false));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePopup(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closePopup(false);
  });

  // Phone mask
  inputWhats && inputWhats.addEventListener('input', (e) => {
    e.target.value = maskPhone(e.target.value);
  });

  // Field validation on blur
  inputNome && inputNome.addEventListener('blur', () => {
    if (!validateName(inputNome.value)) fieldNome.classList.add('has-error');
    else fieldNome.classList.remove('has-error');
  });
  inputWhats && inputWhats.addEventListener('blur', () => {
    if (!validatePhone(inputWhats.value)) fieldWhats.classList.add('has-error');
    else fieldWhats.classList.remove('has-error');
  });

  // ── Form submit ─────────────────────────────────────────
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = inputNome.value.trim();
    const whatsapp = inputWhats.value.trim();
    const consent = inputConsent.checked;

    let valid = true;
    if (!validateName(nome)) { fieldNome.classList.add('has-error'); valid = false; }
    if (!validatePhone(whatsapp)) { fieldWhats.classList.add('has-error'); valid = false; }
    if (!consent) { consentError.style.display = 'block'; valid = false; }
    else { consentError.style.display = 'none'; }

    if (!valid) return;

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    const leadPayload = {
      nome,
      whatsapp,
      origem: currentSection,
      tipo: currentType,
      timestamp: new Date().toISOString(),
      consentimento_lgpd: true,
      user_agent: navigator.userAgent,
      page_url: window.location.href,
      referrer: document.referrer || 'direct',
    };

    // Track lead generation
    if (window.silfitTracking) {
      window.silfitTracking.trackLead(nome, whatsapp, currentSection);
    }

    // Send to Apps Script (non-blocking)
    sendLead(leadPayload);

    // Track WhatsApp redirect
    if (window.silfitTracking) {
      window.silfitTracking.trackWhatsAppRedirect(currentType);
    }

    // Build WhatsApp URL and redirect
    const waUrl = buildWhatsAppUrl(nome, currentType);

    // Small delay to ensure dataLayer events fire before navigation
    setTimeout(() => {
      window.location.href = waUrl;
      // Reset state in case user comes back
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        closePopup(true);
        form.reset();
      }, 1000);
    }, 200);
  });

  // ── Expose for debugging ────────────────────────────────
  window.silfitPopup = { open: openPopup, close: closePopup };
})();
