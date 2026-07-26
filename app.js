/* ==========================================================================
   Executive Student & Developer Portfolio Logic
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
  const themeOpts = document.querySelectorAll('.theme-option');

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
        showToast(`Theme updated to ${opt.textContent.trim()}`);
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

/* Project Filter Tabs */
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

/* Project Details Modal */
function initModalManager() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const detailBtns = document.querySelectorAll('.details-modal-btn');

  const projectData = {
    crimerate: {
      title: 'crimerate-prediction-analysis',
      domain: 'Data Analytics & Machine Learning',
      description: 'Data analytics & predictive machine learning application designed to process historical crime statistics, evaluate regional risk factors, and forecast crime trends.',
      features: [
        'Predictive Crime Rate Trend & Risk Evaluation',
        'JavaScript Data Analytics & Pipeline Processing',
        'Interactive Chart & Statistical Metrics'
      ],
      github: 'https://github.com/bhanusrikarsai/crimerate-prediction-analysis'
    },
    jdbuilder: {
      title: 'JD-Builder',
      domain: 'Developer Tooling & Web App',
      description: 'Interactive Web Application crafted for synthesizing, formatting, and generating professional Job Descriptions, Resumes, and standardized career documents.',
      features: [
        'HTML5 & CSS3 Glassmorphism UI Workspace',
        'Real-time Resume Formatting & Document Synthesis',
        'Responsive Mobile & Desktop Optimization'
      ],
      github: 'https://github.com/bhanusrikarsai/JD-Builder'
    }
  };

  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const data = projectData[key];

      if (data && modal && modalTitle && modalBody) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = `
          <div class="modal-content-wrap">
            <span class="domain-tag">${data.domain}</span>
            <p style="font-size:1.05rem; margin:1rem 0; color:var(--text-secondary);">${data.description}</p>
            
            <h4 style="font-family:var(--font-heading); margin-bottom:0.75rem; color:var(--text-primary);">Key Architectural Features</h4>
            <ul style="padding-left:1.5rem; margin-bottom:1.5rem; color:var(--text-secondary);">
              ${data.features.map(f => `<li style="margin-bottom:0.4rem;">${f}</li>`).join('')}
            </ul>

            <div style="display:flex; gap:1rem; margin-top:1.5rem;">
              <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                <i class="fa-brands fa-github"></i> View Repository Code
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

/* Contact Actions */
function initContactActions() {
  const copyBtn = document.getElementById('copy-email-btn');
  const form = document.getElementById('contact-form');
  const resumeBtn = document.getElementById('resume-btn');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'vu.241fa04267@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('Email: vu.241fa04267@gmail.com');
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('name');
      const name = nameInput ? nameInput.value : 'Friend';
      showToast(`Thank you ${name}! Message sent successfully.`);
      form.reset();
    });
  }

  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* Smooth Navigation */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

/* GitHub Profile Fetch with Fallback */
async function fetchGitHubProfileData() {
  const username = 'bhanusrikarsai';
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) return;

    const data = await res.json();
    const avatarEl = document.getElementById('user-avatar');
    const nameEl = document.getElementById('user-name');

    if (avatarEl && data.avatar_url) avatarEl.src = data.avatar_url;
    if (nameEl && data.name) nameEl.textContent = data.name;
  } catch (err) {
    // Silent fallback
  }
}
