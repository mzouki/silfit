/* ─────────────────────────────────────────────────────────
   SilFit — tracking.js
   dataLayer events for GTM → GA4 → Ads / Meta CAPI
   ───────────────────────────────────────────────────────── */

(function () {
  'use strict';

  // Ensure dataLayer exists
  window.dataLayer = window.dataLayer || [];

  const push = (eventName, params = {}) => {
    window.dataLayer.push({
      event: eventName,
      ...params,
      _timestamp: new Date().toISOString(),
    });
  };

  // ── Public API ──────────────────────────────────────────
  window.silfitTracking = {
    trackPageView() {
      push('page_view', {
        page_location: window.location.href,
        page_title: document.title,
        page_path: window.location.pathname,
      });
    },

    trackSectionView(sectionName) {
      push('section_view', { section_name: sectionName });
    },

    trackCtaClick(ctaText, ctaSection, ctaDestination) {
      push('cta_click', {
        cta_text: ctaText,
        cta_section: ctaSection,
        cta_destination: ctaDestination,
      });
    },

    trackPopupOpen(triggerSection) {
      push('popup_open', { popup_trigger_section: triggerSection });
    },

    trackPopupClose(triggerSection) {
      push('popup_close', { popup_trigger_section: triggerSection });
    },

    trackLead(nome, phone, source) {
      push('generate_lead', {
        lead_name: nome,
        lead_phone: phone,
        lead_source: source,
        // GA4 recommended ecommerce event params (for Ads conversion)
        currency: 'BRL',
        value: 0,
      });
    },

    trackWhatsAppRedirect(messageType) {
      push('whatsapp_redirect', { wa_message_type: messageType });
    },

    trackFaqExpand(question) {
      push('faq_expand', { faq_question: question });
    },
  };
})();
