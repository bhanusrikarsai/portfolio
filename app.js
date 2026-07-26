/**
 * Pure Developer Portfolio - Bhanu Srikar Sai (@bhanusrikarsai)
 * Standard ESM Module
 */

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  React: '#61dafb',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Java: '#b07219',
  Rust: '#dea584',
  Go: '#00ADD8',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  PowerShell: '#012456',
  Dockerfile: '#384d54',
  Markdown: '#083fa1',
  SCSS: '#c6538c',
  Jupyter: '#DA5B0B'
};

const REPO_FALLBACK_METADATA = {
  'crimerate-prediction-analysis': {
    description: 'Data analytics & machine learning project predicting crime rates, trends, and regional risk factors.',
    topics: ['javascript', 'data-analysis', 'machine-learning', 'crime-analytics', 'web-app']
  },
  'JD-Builder': {
    description: 'Interactive Web Tool for crafting, formatting, and generating professional Job Descriptions and Resumes.',
    topics: ['html5', 'css3', 'javascript', 'job-description', 'resume-builder']
  }
};

const state = {
  currentUsername: 'bhanusrikarsai',
  profile: null,
  repos: [],
  filteredRepos: [],
  events: [],
  languageStats: {},
  activeTheme: localStorage.getItem('gitportfolio_theme') || 'dark'
};

let elements = {};

function initElements() {
  elements = {
    themeBtn: document.getElementById('theme-btn'),
    themeMenu: document.getElementById('theme-menu'),
    themeOptions: document.querySelectorAll('.theme-option'),
    printBtn: document.getElementById('print-btn'),
    notificationBanner: document.getElementById('notification-banner'),
    notifMessage: document.getElementById('notif-message'),
    notifClose: document.getElementById('notif-close'),
    loadingState: document.getElementById('loading-state'),
    profileSection: document.getElementById('about'),
    
    // Profile Elements
    userAvatar: document.getElementById('user-avatar'),
    userName: document.getElementById('user-name'),
    userLogin: document.getElementById('user-login'),
    userGithubLink: document.getElementById('user-github-link'),
    githubExternalLink: document.getElementById('github-external-link'),
    userBio: document.getElementById('user-bio'),
    
    // Stats
    statRepos: document.getElementById('stat-repos'),
    statContributions: document.getElementById('stat-contributions'),
    contributionChartImg: document.getElementById('contribution-chart-img'),
    
    // Analytics
    langStackedBar: document.getElementById('lang-stacked-bar'),
    langLegend: document.getElementById('lang-legend'),
    
    // Repositories
    reposGrid: document.getElementById('repos-grid'),
    repoCountBadge: document.getElementById('repo-count-badge'),
    repoSearchInput: document.getElementById('repo-search-input'),
    languageFilter: document.getElementById('language-filter'),
    sortFilter: document.getElementById('sort-filter'),
    noReposFound: document.getElementById('no-repos-found'),
    
    // Activity
    activityTimeline: document.getElementById('activity-timeline'),
    
    // Modal
    readmeModal: document.getElementById('readme-modal'),
    modalRepoName: document.getElementById('modal-repo-name'),
    modalReadmeContent: document.getElementById('modal-readme-content'),
    modalCloseBtn: document.getElementById('modal-close-btn')
  };
}

document.addEventListener('DOMContentLoaded', () => {
  initElements();
  initTheme();
  setupEventListeners();
  fetchProfileData('bhanusrikarsai');
});

/* Theme Management */
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.activeTheme);
  updateActiveThemeButton();
}

function updateActiveThemeButton() {
  if (!elements.themeOptions) return;
  elements.themeOptions.forEach(opt => {
    if (opt.getAttribute('data-theme-val') === state.activeTheme) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });
}

function setTheme(themeName) {
  state.activeTheme = themeName;
  localStorage.setItem('gitportfolio_theme', themeName);
  document.documentElement.setAttribute('data-theme', themeName);
  updateActiveThemeButton();
  if (elements.themeMenu) elements.themeMenu.classList.add('hidden');
}

/* Event Listeners */
function setupEventListeners() {
  if (elements.themeBtn) {
    elements.themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      elements.themeMenu?.classList.toggle('hidden');
    });
  }

  document.addEventListener('click', () => {
    elements.themeMenu?.classList.add('hidden');
  });

  if (elements.themeOptions) {
    elements.themeOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        setTheme(opt.getAttribute('data-theme-val'));
      });
    });
  }

  elements.printBtn?.addEventListener('click', () => {
    window.print();
  });

  elements.notifClose?.addEventListener('click', () => {
    elements.notificationBanner?.classList.add('hidden');
  });

  elements.repoSearchInput?.addEventListener('input', filterAndRenderRepos);
  elements.languageFilter?.addEventListener('change', filterAndRenderRepos);
  elements.sortFilter?.addEventListener('change', filterAndRenderRepos);

  elements.modalCloseBtn?.addEventListener('click', closeModal);
  elements.readmeModal?.addEventListener('click', (e) => {
    if (e.target === elements.readmeModal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.readmeModal && !elements.readmeModal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* Data Fetching */
async function fetchProfileData(username) {
  showLoading(true);
  hideNotification();

  if (elements.contributionChartImg) {
    elements.contributionChartImg.src = `https://ghchart.rshah.org/${username}`;
  }

  try {
    const profileRes = await fetch(`https://api.github.com/users/${username}`);
    
    if (profileRes.ok) {
      state.profile = await profileRes.json();
    }

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    state.repos = reposRes.ok ? await reposRes.json() : [];

    const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public?per_page=15`);
    state.events = eventsRes.ok ? await eventsRes.json() : [];

    renderProfileHeader();
    processLanguageAnalytics();
    populateLanguageFilter();
    filterAndRenderRepos();
    renderActivityFeed();

  } catch (error) {
    console.error('Fetch error:', error);
    showNotification('Network issue fetching GitHub profile.');
  } finally {
    showLoading(false);
  }
}

function showLoading(isLoading) {
  if (!elements.loadingState) return;
  if (isLoading) {
    elements.loadingState.classList.remove('hidden');
    if (elements.profileSection) elements.profileSection.style.opacity = '0.4';
    if (elements.reposGrid) elements.reposGrid.innerHTML = '';
  } else {
    elements.loadingState.classList.add('hidden');
    if (elements.profileSection) elements.profileSection.style.opacity = '1';
  }
}

function showNotification(msg) {
  if (!elements.notifMessage || !elements.notificationBanner) return;
  elements.notifMessage.textContent = msg;
  elements.notificationBanner.classList.remove('hidden');
}

function hideNotification() {
  if (elements.notificationBanner) {
    elements.notificationBanner.classList.add('hidden');
  }
}

function renderProfileHeader() {
  const p = state.profile;

  if (elements.userAvatar) elements.userAvatar.src = p?.avatar_url || 'https://avatars.githubusercontent.com/u/277517838?v=4';
  if (elements.userName) elements.userName.textContent = p?.name || 'Bhanu Srikar Sai';
  if (elements.userLogin) elements.userLogin.textContent = p?.login || 'bhanusrikarsai';
  if (elements.userGithubLink) elements.userGithubLink.href = p?.html_url || 'https://github.com/bhanusrikarsai';
  if (elements.githubExternalLink) elements.githubExternalLink.href = p?.html_url || 'https://github.com/bhanusrikarsai';

  if (elements.userBio && p?.bio) {
    elements.userBio.textContent = p.bio;
  }

  if (elements.statRepos) elements.statRepos.textContent = p?.public_repos || state.repos.length || 2;
  if (elements.statContributions) elements.statContributions.textContent = '38+';
}

function processLanguageAnalytics() {
  const counts = {};
  let totalCount = 0;

  state.repos.forEach(repo => {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
      totalCount++;
    }
  });

  state.languageStats = counts;
  const sortedLangs = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  if (!elements.langStackedBar || !elements.langLegend) return;
  elements.langStackedBar.innerHTML = '';
  elements.langLegend.innerHTML = '';

  if (totalCount === 0) {
    elements.langStackedBar.innerHTML = '<div style="padding:4px; font-size:0.8rem; color:var(--text-muted);">JavaScript & HTML Stack</div>';
    return;
  }

  sortedLangs.forEach(([lang, count]) => {
    const percent = ((count / totalCount) * 100).toFixed(1);
    const color = LANGUAGE_COLORS[lang] || '#818cf8';

    const segment = document.createElement('div');
    segment.className = 'stacked-segment';
    segment.style.width = `${percent}%`;
    segment.style.backgroundColor = color;
    segment.title = `${lang}: ${percent}%`;
    elements.langStackedBar.appendChild(segment);

    const legendItem = document.createElement('div');
    legendItem.className = 'lang-legend-item';
    legendItem.innerHTML = `
      <div class="lang-dot-wrap">
        <span class="lang-color-dot" style="background-color: ${color}"></span>
        <span class="lang-name">${lang}</span>
      </div>
      <span class="lang-percent">${percent}%</span>
    `;
    elements.langLegend.appendChild(legendItem);
  });
}

function populateLanguageFilter() {
  if (!elements.languageFilter) return;
  elements.languageFilter.innerHTML = '<option value="all">All Technologies</option>';
  const langs = Object.keys(state.languageStats).sort();

  langs.forEach(lang => {
    const opt = document.createElement('option');
    opt.value = lang;
    opt.textContent = lang;
    elements.languageFilter.appendChild(opt);
  });
}

function filterAndRenderRepos() {
  const searchQuery = (elements.repoSearchInput?.value || '').toLowerCase().trim();
  const selectedLang = elements.languageFilter?.value || 'all';
  const sortCriteria = elements.sortFilter?.value || 'updated';

  let filtered = state.repos.filter(repo => {
    const fallback = REPO_FALLBACK_METADATA[repo.name] || {};
    const desc = repo.description || fallback.description || '';
    const topics = repo.topics && repo.topics.length ? repo.topics : (fallback.topics || []);

    const matchesSearch = repo.name.toLowerCase().includes(searchQuery) ||
                          desc.toLowerCase().includes(searchQuery) ||
                          topics.some(t => t.toLowerCase().includes(searchQuery));

    const matchesLang = selectedLang === 'all' || repo.language === selectedLang;

    return matchesSearch && matchesLang;
  });

  filtered.sort((a, b) => {
    if (sortCriteria === 'stars') return b.stargazers_count - a.stargazers_count;
    if (sortCriteria === 'updated') return new Date(b.updated_at) - new Date(a.updated_at);
    if (sortCriteria === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  state.filteredRepos = filtered;
  if (elements.repoCountBadge) elements.repoCountBadge.textContent = `${filtered.length} Projects`;

  if (!elements.reposGrid) return;
  elements.reposGrid.innerHTML = '';

  if (filtered.length === 0) {
    elements.noReposFound?.classList.remove('hidden');
    return;
  } else {
    elements.noReposFound?.classList.add('hidden');
  }

  filtered.forEach(repo => {
    const card = createRepoCard(repo);
    elements.reposGrid.appendChild(card);
  });
}

function createRepoCard(repo) {
  const card = document.createElement('div');
  card.className = 'glass-card repo-card';

  const fallback = REPO_FALLBACK_METADATA[repo.name] || {};
  const descriptionText = repo.description || fallback.description || 'Web application project developed by Bhanu Srikar Sai.';
  const topicsList = (repo.topics && repo.topics.length) ? repo.topics : (fallback.topics || []);

  const langColor = LANGUAGE_COLORS[repo.language] || '#818cf8';

  const topicsHtml = topicsList.slice(0, 4).map(topic => 
    `<span class="topic-tag">${topic}</span>`
  ).join('');

  card.innerHTML = `
    <div>
      <div class="repo-top-row">
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-name-link">
          <i class="fa-regular fa-folder-closed"></i> ${repo.name}
        </a>
        <span class="repo-visibility">${repo.visibility || 'Public'}</span>
      </div>

      <p class="repo-desc">${descriptionText}</p>
      <div class="repo-topics">${topicsHtml}</div>
    </div>

    <div>
      <div class="repo-footer">
        <div class="repo-stats">
          ${repo.language ? `
            <div class="repo-stat-item">
              <span style="width:10px; height:10px; border-radius:50%; background-color:${langColor}"></span>
              <span>${repo.language}</span>
            </div>
          ` : ''}
          <div class="repo-stat-item" title="Stars">
            <i class="fa-regular fa-star"></i> ${repo.stargazers_count || 0}
          </div>
          <div class="repo-stat-item" title="Forks">
            <i class="fa-code-branch"></i> ${repo.forks_count || 0}
          </div>
        </div>

        <div class="repo-actions">
          <button class="btn btn-glass btn-sm readme-btn" data-repo="${repo.name}" title="View README documentation">
            <i class="fa-solid fa-file-lines"></i> README
          </button>
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" title="View Source">
            <i class="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  `;

  const readmeBtn = card.querySelector('.readme-btn');
  readmeBtn.addEventListener('click', () => openReadmeModal(repo.name));

  return card;
}

function renderActivityFeed() {
  if (!elements.activityTimeline) return;
  elements.activityTimeline.innerHTML = '';

  if (!state.events || state.events.length === 0) {
    elements.activityTimeline.innerHTML = `
      <div class="activity-item">
        <div class="activity-icon-badge"><i class="fa-solid fa-code-commit"></i></div>
        <div class="activity-content">
          <div class="activity-title">Created 3 commits in <a href="https://github.com/bhanusrikarsai/crimerate-prediction-analysis" target="_blank">bhanusrikarsai/crimerate-prediction-analysis</a></div>
          <div class="activity-time">July 2026</div>
        </div>
      </div>
      <div class="activity-item">
        <div class="activity-icon-badge"><i class="fa-solid fa-plus"></i></div>
        <div class="activity-content">
          <div class="activity-title">Created repository <a href="https://github.com/bhanusrikarsai/JD-Builder" target="_blank">bhanusrikarsai/JD-Builder</a></div>
          <div class="activity-time">June 2026</div>
        </div>
      </div>
    `;
    return;
  }

  state.events.forEach(evt => {
    const item = document.createElement('div');
    item.className = 'activity-item';

    let iconClass = 'fa-solid fa-code-commit';
    let actionText = 'Pushed code to';

    if (evt.type === 'PushEvent') {
      iconClass = 'fa-solid fa-code-commit';
      actionText = `Pushed ${evt.payload?.commits?.length || 1} commit(s) to`;
    } else if (evt.type === 'CreateEvent') {
      iconClass = 'fa-solid fa-plus';
      actionText = `Created ${evt.payload?.ref_type || 'repository'} in`;
    } else if (evt.type === 'WatchEvent') {
      iconClass = 'fa-solid fa-star';
      actionText = 'Starred repository';
    }

    const timeAgo = formatTimeAgo(new Date(evt.created_at));

    item.innerHTML = `
      <div class="activity-icon-badge">
        <i class="${iconClass}"></i>
      </div>
      <div class="activity-content">
        <div class="activity-title">
          ${actionText} <a href="https://github.com/${evt.repo?.name}" target="_blank" rel="noopener noreferrer">${evt.repo?.name}</a>
        </div>
        <div class="activity-time">${timeAgo}</div>
      </div>
    `;

    elements.activityTimeline.appendChild(item);
  });
}

function formatTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} day${interval > 1 ? 's' : ''} ago`;
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} hour${interval > 1 ? 's' : ''} ago`;
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval} min${interval > 1 ? 's' : ''} ago`;
  return 'Just now';
}

async function openReadmeModal(repoName) {
  if (!elements.modalRepoName || !elements.modalReadmeContent || !elements.readmeModal) return;
  elements.modalRepoName.textContent = `${repoName} - Project Documentation`;
  elements.modalReadmeContent.innerHTML = '<div class="loading-readme"><i class="fa-solid fa-spinner fa-spin"></i> Fetching README documentation...</div>';
  elements.readmeModal.classList.remove('hidden');

  const branches = ['main', 'master'];
  let readmeText = null;

  for (const branch of branches) {
    try {
      const res = await fetch(`https://raw.githubusercontent.com/${state.currentUsername}/${repoName}/${branch}/README.md`);
      if (res.ok) {
        readmeText = await res.text();
        break;
      }
    } catch (err) {
      console.warn(`Could not fetch README on branch ${branch}`);
    }
  }

  if (readmeText) {
    if (window.marked) {
      elements.modalReadmeContent.innerHTML = window.marked.parse(readmeText);
    } else {
      elements.modalReadmeContent.innerHTML = `<pre>${readmeText}</pre>`;
    }
  } else {
    const fallback = REPO_FALLBACK_METADATA[repoName];
    if (fallback) {
      elements.modalReadmeContent.innerHTML = `
        <div style="padding: 1rem;">
          <h2 style="font-family:var(--font-heading); margin-bottom:1rem; border-bottom:1px solid var(--card-border); padding-bottom:0.5rem;">${repoName}</h2>
          <p style="font-size:1.05rem; margin-bottom:1.5rem;">${fallback.description}</p>
          <h3 style="font-family:var(--font-heading); margin-bottom:0.75rem;">Key Technologies & Tags</h3>
          <p style="margin-bottom:1.5rem;">${fallback.topics.map(t => `<span class="topic-tag">${t}</span>`).join(' ')}</p>
          <a href="https://github.com/${state.currentUsername}/${repoName}" target="_blank" class="btn btn-primary">
            <i class="fa-brands fa-github"></i> View Full Repository Source Code
          </a>
        </div>
      `;
    } else {
      elements.modalReadmeContent.innerHTML = `
        <div style="text-align:center; padding: 2rem; color:var(--text-muted);">
          <i class="fa-solid fa-file-circle-xmark" style="font-size:2.5rem; margin-bottom:1rem; display:block;"></i>
          <p>No README.md file currently created for this project.</p>
        </div>
      `;
    }
  }
}

function closeModal() {
  if (elements.readmeModal) {
    elements.readmeModal.classList.add('hidden');
  }
}
