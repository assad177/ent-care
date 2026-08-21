/**
 * ENT Clinic - 100% Exact Elementor Animation Engine
 * Exact 1-to-1 replication of Elementor's scroll-triggered animation behavior.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Check user reduced motion setting
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animatedElements = document.querySelectorAll(
      '.elementor-invisible, [data-settings*="animation"], .animated, .animated-slow'
    );

    // Decode HTML entities in data-settings attribute (e.g. &quot;)
    function decodeHtml(str) {
      if (!str) return '';
      const txt = document.createElement('textarea');
      txt.innerHTML = str;
      return txt.value;
    }

    // Trigger exact Elementor animation
    function triggerElementorAnimation(el) {
      if (!el || el.classList.contains('elementor-animated')) return;

      el.classList.remove('elementor-invisible');
      el.classList.add('elementor-animated', 'animated');

      // Check if data-settings defines a specific animation
      const settingsAttr = el.getAttribute('data-settings');
      if (settingsAttr) {
        try {
          const decoded = decodeHtml(settingsAttr);
          const parsed = JSON.parse(decoded);
          if (parsed && parsed.animation && parsed.animation !== 'none') {
            el.classList.add(parsed.animation);
          }
        } catch (e) {
          // Parse fallback
        }
      }
    }

    // If reduced motion is active, reveal immediately without animation
    if (prefersReducedMotion) {
      animatedElements.forEach(el => {
        el.classList.remove('elementor-invisible');
        el.classList.add('elementor-animated');
      });
      return;
    }

    // 2. IntersectionObserver setup matching Elementor threshold & rootMargin
    if ('IntersectionObserver' in window && animatedElements.length > 0) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            triggerElementorAnimation(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -20px 0px',
        threshold: 0.1
      });

      animatedElements.forEach(el => observer.observe(el));

      // Immediate check for elements currently in view on load
      setTimeout(() => {
        animatedElements.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            triggerElementorAnimation(el);
          }
        });
      }, 50);

    } else {
      // Fallback for non-supporting browsers
      animatedElements.forEach(triggerElementorAnimation);
    }
  });

})();
