// ---------------------------------------------------------------------------
// BillSnap AI - Internationalization & Auto-Localization Engine (i18n-core.js)
// Zero-touch Geo-IP & Browser detection with universal global fallback
// ---------------------------------------------------------------------------
(function() {
  'use strict';

  const SUPPORTED_LOCALES = ['en', 'vi'];
  const DEFAULT_LOCALE = 'en';

  window.BillSnapI18n = {
    currentLocale: DEFAULT_LOCALE,

    // Initialize localization engine
    init: async function() {
      const detected = await this.detectUserLocale();
      this.applyLocale(detected);
    },

    // Detect user locale using Geo-IP and navigator.language
    detectUserLocale: async function() {
      // 1. Allow URL query override for QA testing (?lang=vi or ?lang=en)
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang && SUPPORTED_LOCALES.includes(urlLang.toLowerCase())) {
        return urlLang.toLowerCase();
      }

      // 2. Check Geo-IP location (Asynchronous, non-blocking)
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500); // 1.5s timeout max
        const response = await fetch('https://ipapi.co/json/', { signal: controller.signal });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const country = (data.country_code || '').toUpperCase();
          if (country === 'VN') {
            return 'vi';
          }
        }
      } catch (e) {
        // Fallback silently if offline or blocked by browser privacy guard
      }

      // 3. Fallback to Browser system language
      const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
      if (browserLang.startsWith('vi')) {
        return 'vi';
      }

      // 4. Default global international fallback
      return DEFAULT_LOCALE;
    },

    // Apply the resolved locale strings and media
    applyLocale: function(locale) {
      const resolved = SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
      this.currentLocale = resolved;

      const locales = window.BILLSNAP_LOCALES || {};
      const strings = locales[resolved] || locales[DEFAULT_LOCALE] || {};

      // 1. Update text strings via data-i18n
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (strings[key]) {
          el.innerHTML = strings[key];
        }
      });

      // 2. Update page title & meta description
      if (strings['page_title']) {
        document.title = strings['page_title'];
      }
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && strings['meta_description']) {
        metaDesc.setAttribute('content', strings['meta_description']);
      }

      // 3. Update localized media assets (Hero & Gallery)
      if (window.BILLSNAP_MEDIA && typeof window.BILLSNAP_MEDIA.getMedia === 'function') {
        const media = window.BILLSNAP_MEDIA.getMedia(resolved);

        // Update Hero Phone Mockup
        const heroImg = document.getElementById('hero-mockup-img');
        if (heroImg && media.hero_screen) {
          heroImg.src = media.hero_screen;
        }

        // Render Screenshot Gallery
        const galleryContainer = document.getElementById('screenshot-gallery-track');
        if (galleryContainer && Array.isArray(media.gallery)) {
          galleryContainer.innerHTML = media.gallery.map((item, idx) => `
            <div class="gallery-card">
              <div class="gallery-card-frame">
                <img src="${item.src}" alt="${item.title}" loading="lazy">
              </div>
              <div class="gallery-card-info">
                <h4>${item.title}</h4>
                <p>${item.desc}</p>
              </div>
            </div>
          `).join('');
        }

        // Update Video Demo if element exists
        const videoEl = document.getElementById('demo-video-player');
        if (videoEl && media.video_demo) {
          const sourceEl = videoEl.querySelector('source');
          if (sourceEl) {
            sourceEl.src = media.video_demo;
            videoEl.load();
          }
        }
      }

      // Dispatch custom event when localization completes
      window.dispatchEvent(new CustomEvent('billsnap-locale-changed', { detail: { locale: resolved } }));
    }
  };

  // Auto-run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.BillSnapI18n.init());
  } else {
    window.BillSnapI18n.init();
  }
})();
