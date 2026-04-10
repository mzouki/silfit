/* ─────────────────────────────────────────────────────────
   SilFit — main.js
   Header scroll, scroll reveals, FAQ accordion, smooth nav
   ───────────────────────────────────────────────────────── */

(function () {
  'use strict';

  // ── 1. Header scroll effect ─────────────────────────────
  const header = document.getElementById('header');
  if (header) {
    let ticking = false;
    const updateHeader = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  // ── 2. Scroll reveal (Intersection Observer) ────────────
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show all
    reveals.forEach((el) => el.classList.add('visible'));
  }

  // ── 3. FAQ accordion (uses native <details> but with smooth animation) ──
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const summary = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const inner = item.querySelector('.faq-answer-inner');

    if (!summary || !answer || !inner) return;

    summary.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = item.hasAttribute('open');

      // Close all others
      faqItems.forEach((other) => {
        if (other !== item && other.hasAttribute('open')) {
          const otherAnswer = other.querySelector('.faq-answer');
          other.removeAttribute('open');
          other.classList.remove('open');
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
        }
      });

      if (isOpen) {
        item.removeAttribute('open');
        item.classList.remove('open');
        answer.style.maxHeight = '0';
      } else {
        item.setAttribute('open', '');
        item.classList.add('open');
        answer.style.maxHeight = inner.scrollHeight + 40 + 'px';

        // Track expand
        if (window.silfitTracking) {
          window.silfitTracking.trackFaqExpand(summary.textContent.trim());
        }
      }
    });
  });

  // ── 4. Smooth scroll for anchor links (with header offset) ──
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ── 5. Section view tracking (Intersection Observer) ────
  if ('IntersectionObserver' in window && window.silfitTracking) {
    const sections = document.querySelectorAll('section[id]');
    const seen = new Set();
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !seen.has(entry.target.id)) {
          seen.add(entry.target.id);
          window.silfitTracking.trackSectionView(entry.target.id);
        }
      });
    }, { threshold: 0.45 });

    sections.forEach((s) => sectionObserver.observe(s));
  }

  // ── 6. Page view event (initial) ────────────────────────
  if (window.silfitTracking) {
    window.silfitTracking.trackPageView();
  }
})();
