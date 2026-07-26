/* ==========================================================================
   Executive Portfolio Logic & Interactivity
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeManager();
  initProjectFilters();
  initModalManager();
  initContactActions();
  initSmoothScroll();
  fetchGitHubProfileData();
});

/* Toast Notification Utility */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* Theme Manager */
function initThemeManager() {
  const themeBtn = document.getElementById('theme-btn');
  const themeMenu = document.getElementById('theme-menu');
  const themeOpts = document.querySelectorAll('.theme-opt');

  let activeTheme = localStorage.getItem('gitportfolio_theme') || 'cyber';
  document.documentElement.setAttribute('data-theme', activeTheme);
  updateActiveThemeOpt(activeTheme);

  if (themeBtn && themeMenu) {
    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeMenu.classList.toggle('dropdown-hidden');
    });

    document.addEventListener('click', () => {
      themeMenu.classList.add('dropdown-hidden');
    });
  }

  themeOpts.forEach(opt => {
    opt.addEventListener('click', () => {
      const themeVal = opt.getAttribute('data-theme');
      if (themeVal) {
        activeTheme = themeVal;
        localStorage.setItem('gitportfolio_theme', activeTheme);
        document.documentElement.setAttribute('data-theme', activeTheme);
        updateActiveThemeOpt(activeTheme);
        themeMenu?.classList.add('dropdown-hidden');
        showToast(`Theme changed to ${opt.textContent.trim()}`);
      }
    });
  });

  function updateActiveThemeOpt(theme) {
    themeOpts.forEach(opt => {
      if (opt.getAttribute('data-theme') === theme) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });
  }
}

/* Project Filter System */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* Project Modal Manager */
function initModalManager() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const detailBtns = document.querySelectorAll('.view-details-btn');

  const projectDetails = {
    crimerate: {
      title: 'crimerate-prediction-analysis',
      domain: 'Data Analytics & Machine Learning',
      description: 'An analytical and predictive software project designed to process historical crime statistics, model regional risk indicators, and forecast future crime density using statistical algorithms.',
      features: [
        'JavaScript ES6+ Data Analytics Pipelines',
        'Predictive Crime Rate Trend & Risk Evaluation',
        'Interactive Data Analytics & Statistical Score Visualizations'
      ],
      github: 'https://github.com/bhanusrikarsai/crimerate-prediction-analysis'
    },
    jdbuilder: {
      title: 'JD-Builder',
      domain: 'Web App & Developer Tooling',
      description: 'An interactive Web Application for synthesizing, formatting, and generating professional Job Descriptions and standardized career documents with clean responsive glassmorphic UI.',
      features: [
        'HTML5 & Modern CSS3 Glassmorphism Studio',
        'Real-time Content Formatting & Resume Document Export',
        'Responsive Mobile & Desktop Optimization'
      ],
      github: 'https://github.com/bhanusrikarsai/JD-Builder'
    }
  };

  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectDetails[projKey];
      
      if (data && modal && modalTitle && modalBody) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = `
          <div class="modal-detail-wrap">
            <span class="domain-tag">${data.domain}</span>
            <p style="font-size:1.05rem; margin:1rem 0; color:var(--text-secondary);">${data.description}</p>
            
            <h4 style="font-family:var(--font-heading); margin-bottom:0.75rem; color:var(--text-primary);">Key Architectural Features</h4>
            <ul style="padding-left:1.5rem; margin-bottom:1.5rem; color:var(--text-secondary);">
              ${data.features.map(f => `<li style="margin-bottom:0.4rem;">${f}</li>`).join('')}
            </ul>

            <div style="display:flex; gap:1rem; margin-top:1.5rem;">
              <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                <i class="fa-brands fa-github"></i> View GitHub Repository
              </a>
            </div>
          </div>
        `;
        modal.classList.remove('modal-hidden');
      }
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => modal.classList.add('modal-hidden'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('modal-hidden');
    });
  }
}

/* Contact & Copy Email Manager */
function initContactActions() {
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const contactForm = document.getElementById('contact-form');
  const resumeBtn = document.getElementById('resume-btn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'vu.241fa04267@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('Email: vu.241fa04267@gmail.com');
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('form-name');
      const name = nameInput ? nameInput.value : 'Friend';
      showToast(`Thank you ${name}! Message sent successfully.`);
      contactForm.reset();
    });
  }

  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* Smooth Scrolling */
function initSmoothScroll() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const href = item.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          navItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

/* Safe GitHub Profile API Fetch with Graceful Offline Fallback */
async function fetchGitHubProfileData() {
  const username = 'bhanusrikarsai';
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) return;

    const data = await response.json();
    
    const avatarEl = document.getElementById('github-avatar');
    const nameEl = document.getElementById('github-name');
    const bioEl = document.getElementById('github-bio');
    const reposEl = document.getElementById('stat-repos');

    if (avatarEl && data.avatar_url) avatarEl.src = data.avatar_url;
    if (nameEl && data.name) nameEl.textContent = data.name;
    if (bioEl && data.bio) bioEl.textContent = data.bio;
    if (reposEl && data.public_repos !== undefined) reposEl.textContent = data.public_repos;
  } catch (error) {
    // Graceful offline fallback -- do nothing, default static content remains active cleanly!
  }
}
