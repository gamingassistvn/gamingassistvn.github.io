// ---------------------------------------------------------------------------
// Dynamic App Catalog & Bilingual Localization (EN / VI)
// ---------------------------------------------------------------------------
let allApps = [];
let currentCategory = 'all';
let currentLang = localStorage.getItem('site_lang') || 'en'; // Default English for global audience

const translations = {
  en: {
    nav_apps: "Apps & Games",
    nav_tech: "Technology",
    nav_privacy: "Privacy Policy",
    nav_terms: "Terms of Service",
    hero_badge: "✨ CRAFTING NEXT-GEN EXPERIENCES",
    hero_title_1: "Intelligent. Fast.",
    hero_title_2: "Boundless Experience.",
    hero_desc: "Welcome to the official developer portal of <strong>Assist Gaming & Tech Studio</strong>. Home of modern 3D logic puzzles and intelligent utilities for global users.",
    filter_all: "All Products",
    filter_games: "🎮 Games",
    filter_utilities: "⚡ Utilities & Tools",
    search_placeholder: "Search apps & games...",
    no_results_title: "No applications found",
    no_results_desc: "Try searching with different keywords or switch categories.",
    btn_play: "📱 Google Play",
    btn_privacy: "🛡️ Privacy Policy",
    tech_1_title: "Native 60-120 FPS Performance",
    tech_1_desc: "Engineered on Flutter with binary C++ optimization for silky-smooth framerates and minimal battery draw.",
    tech_2_title: "12-Language Auto Detection",
    tech_2_desc: "Seamlessly localizes to player device settings across 177 countries worldwide.",
    tech_3_title: "Security & Strict Privacy",
    tech_3_desc: "100% compliant with GDPR, Google Play Families & App Store Data Protection standards.",
    tech_4_title: "Google AdMob Verified",
    tech_4_desc: "Official ad distribution network verified with valid root app-ads.txt records.",
    footer_rights: "© 2026 Assist Gaming & Tech Studio. All rights reserved.",
    footer_store: "Published on Google Play Store & Apple App Store.",
    footer_contact: "Support & Contact"
  },
  vi: {
    nav_apps: "Ứng dụng",
    nav_tech: "Công nghệ",
    nav_privacy: "Quyền riêng tư",
    nav_terms: "Điều khoản",
    hero_badge: "✨ KIẾN TẠO TRẢI NGHIỆM ĐỈNH CAO",
    hero_title_1: "Thông minh. Tốc độ.",
    hero_title_2: "Trải nghiệm Không giới hạn.",
    hero_desc: "Chào mừng bạn đến với cổng thông tin chính thức của <strong>Assist Gaming & Tech Studio</strong>. Nơi quy tụ các dòng game trí tuệ thế hệ mới và ứng dụng tiện ích thông minh toàn cầu.",
    filter_all: "Tất cả sản phẩm",
    filter_games: "🎮 Trò chơi (Games)",
    filter_utilities: "⚡ Tiện ích & Công cụ",
    search_placeholder: "Tìm kiếm ứng dụng...",
    no_results_title: "Không tìm thấy ứng dụng phù hợp",
    no_results_desc: "Thử tìm kiếm với từ khóa khác hoặc chuyển danh mục.",
    btn_play: "📱 Google Play",
    btn_privacy: "🛡️ Quyền riêng tư",
    tech_1_title: "Hiệu năng Native 60-120 FPS",
    tech_1_desc: "Được xây dựng trên nền tảng Flutter & C++ nhị phân tối ưu hóa bộ nhớ và tiết kiệm pin tối đa.",
    tech_2_title: "Tương thích 12 Ngôn ngữ",
    tech_2_desc: "Tự động bản địa hóa theo thiết bị người dùng trên 177 quốc gia toàn cầu.",
    tech_3_title: "Bảo mật & Quyền riêng tư",
    tech_3_desc: "Tuân thủ 100% chuẩn GDPR, Google Play Families & App Store Data Protection.",
    tech_4_title: "Google AdMob Verified",
    tech_4_desc: "Hệ thống phân phối quảng cáo chính hãng với tệp chứng thực app-ads.txt hợp lệ.",
    footer_rights: "© 2026 Assist Gaming & Tech Studio. Bảo lưu mọi quyền.",
    footer_store: "Tất cả ứng dụng được phát hành trên Google Play Store & Apple App Store.",
    footer_contact: "Hỗ trợ & Liên hệ"
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  applyLanguage(currentLang);
  await loadApps();
  setupFilterButtons();
  setupSearch();
  setupLangToggle();
});

function setupLangToggle() {
  const toggleBtn = document.getElementById('lang-toggle-btn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'vi' : 'en';
    localStorage.setItem('site_lang', currentLang);
    applyLanguage(currentLang);
    renderApps(allApps);
  });
}

function applyLanguage(lang) {
  const dict = translations[lang] || translations.en;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  const searchInput = document.getElementById('search-input');
  if (searchInput && dict.search_placeholder) {
    searchInput.placeholder = dict.search_placeholder;
  }

  const langBadge = document.getElementById('lang-badge');
  if (langBadge) {
    langBadge.textContent = lang === 'en' ? '🌐 EN' : '🇻🇳 VI';
  }
}

async function loadApps() {
  try {
    const response = await fetch('apps.json');
    if (!response.ok) throw new Error('Cannot load apps.json');
    allApps = await response.json();
    renderApps(allApps);
  } catch (err) {
    console.warn('Fallback loading:', err);
    allApps = [
      {
        id: "minepuzzle-daily",
        name: "MinePuzzle Daily",
        tagline: "Next-Gen 3D Cyber-Neon Minesweeper with Global Daily Challenges & Streaks.",
        category: "games",
        badge: "Hot 🚀",
        icon: "assets/icons/minepuzzle_daily.png",
        rating: "5.0 ★",
        tags: ["Puzzle", "Cyber 3D", "Daily Challenge", "12 Languages"],
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.minepuzzle.daily",
        privacyUrl: "privacy.html#minepuzzle"
      },
      {
        id: "t11-auto-helper",
        name: "T11 Auto Helper",
        tagline: "Intelligent Automation & Smart Workflow Assistant for Android.",
        category: "utilities",
        badge: "Testing 🔒",
        icon: "assets/icons/t11_helper.png",
        rating: "4.9 ★",
        tags: ["Productivity", "Automation", "Smart Tools"],
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.assist.t11helper",
        privacyUrl: "privacy.html#t11"
      }
    ];
    renderApps(allApps);
  }
}

function renderApps(apps) {
  const container = document.getElementById('apps-container');
  if (!container) return;

  const dict = translations[currentLang] || translations.en;

  if (apps.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-dim);">
        <p style="font-size: 36px; margin-bottom: 12px;">🔍</p>
        <h3>${dict.no_results_title}</h3>
        <p>${dict.no_results_desc}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = apps.map(app => `
    <article class="app-card" data-category="${app.category}">
      <div>
        <div class="card-top">
          <img src="${app.icon}" alt="${app.name} Icon" class="app-icon" onerror="this.src='https://placehold.co/144x144/1a1e36/ffffff?text=App'">
          <div class="card-title-group">
            <span class="card-badge">${app.badge || 'Live'}</span>
            <h3 class="app-name">${app.name}</h3>
            <div class="app-rating">${app.rating || '5.0 ★'} • ${app.category === 'games' ? 'Game' : 'Utility'}</div>
          </div>
        </div>

        <p class="app-tagline">${app.tagline}</p>

        <div class="app-tags">
          ${(app.tags || []).map(t => `<span class="tag-item">${t}</span>`).join('')}
        </div>
      </div>

      <div class="card-actions">
        ${app.playStoreUrl ? `
          <a href="${app.playStoreUrl}" target="_blank" rel="noopener" class="btn-primary">
            <span>${dict.btn_play}</span>
          </a>
        ` : ''}
        <a href="${app.privacyUrl || 'privacy.html'}" class="btn-secondary">
          <span>${dict.btn_privacy}</span>
        </a>
      </div>
    </article>
  `).join('');
}

function setupFilterButtons() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter');
      applyFilters();
    });
  });
}

function setupSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    applyFilters();
  });
}

function applyFilters() {
  const searchVal = (document.getElementById('search-input')?.value || '').toLowerCase().trim();

  const filtered = allApps.filter(app => {
    const matchCategory = (currentCategory === 'all') || (app.category === currentCategory);
    const matchSearch = !searchVal || 
      app.name.toLowerCase().includes(searchVal) || 
      app.tagline.toLowerCase().includes(searchVal) ||
      (app.tags && app.tags.some(t => t.toLowerCase().includes(searchVal)));

    return matchCategory && matchSearch;
  });

  renderApps(filtered);
}
