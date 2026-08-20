// ---------------------------------------------------------------------------
// Dynamic App Catalog Engine
// ---------------------------------------------------------------------------
let allApps = [];
let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  await loadApps();
  setupFilterButtons();
  setupSearch();
});

async function loadApps() {
  const container = document.getElementById('apps-container');
  try {
    const response = await fetch('apps.json');
    if (!response.ok) throw new Error('Cannot load apps.json');
    allApps = await response.json();
    renderApps(allApps);
  } catch (err) {
    console.warn('Fallback loading:', err);
    // Fallback data if fetched via file:// protocol
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

  if (apps.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-dim);">
        <p style="font-size: 36px; margin-bottom: 12px;">🔍</p>
        <h3>Không tìm thấy ứng dụng phù hợp</h3>
        <p>Thử tìm kiếm với từ khóa khác hoặc chuyển danh mục.</p>
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
            <span>📱 Google Play</span>
          </a>
        ` : ''}
        <a href="${app.privacyUrl || 'privacy.html'}" class="btn-secondary">
          <span>🛡️ Quyền riêng tư</span>
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
