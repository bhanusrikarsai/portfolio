/* =====================================================
   Portfolio App Logic — Zero-Error Edition
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Helpers ── */
  const el  = id => document.getElementById(id);
  const qsa = sel => Array.from(document.querySelectorAll(sel));

  /* ─────────────────────────────
     1. NAVBAR — scroll + burger
  ───────────────────────────── */
  const navbar   = el('navbar');
  const navLinks = el('navLinks');
  const burger   = el('navBurger');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ─────────────────────────────
     2. ACTIVE NAV LINK on scroll
  ───────────────────────────── */
  const sections = qsa('section[id]');
  const navAnchors = qsa('.nav__link');

  if (sections.length && navAnchors.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  /* ─────────────────────────────
     3. THEME TOGGLE
  ───────────────────────────── */
  const themeBtn  = el('themeToggle');
  const themeIcon = el('themeIcon');

  const savedTheme = localStorage.getItem('bss-theme') || 'dark';
  if (savedTheme === 'light') applyLight();

  function applyLight() {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeIcon) { themeIcon.className = 'fa-solid fa-sun'; }
  }
  function applyDark() {
    document.documentElement.removeAttribute('data-theme');
    if (themeIcon) { themeIcon.className = 'fa-solid fa-moon'; }
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) { applyDark(); localStorage.setItem('bss-theme', 'dark'); }
      else         { applyLight(); localStorage.setItem('bss-theme', 'light'); }
    });
  }

  /* ─────────────────────────────
     4. TOAST NOTIFICATION
  ───────────────────────────── */
  const toast = el('toast');

  function showToast(msg, duration = 2800) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  }

  /* ─────────────────────────────
     5. COPY EMAIL
  ───────────────────────────── */
  const copyBtn = el('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('vu.241fa04267@gmail.com')
        .then(() => showToast('✓ Email copied to clipboard!'))
        .catch(() => showToast('vu.241fa04267@gmail.com'));
    });
  }

  /* ─────────────────────────────
     6. CONTACT FORM
  ───────────────────────────── */
  const form = el('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = el('fname') ? el('fname').value.trim() : '';
      if (!name) return;
      showToast(`✓ Thanks ${name}! Message received.`);
      form.reset();
    });
  }

  /* ─────────────────────────────
     7. PROJECT FILTER TABS
  ───────────────────────────── */
  const filterBtns   = qsa('.filter');
  const projectCards = qsa('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const cat = card.dataset.cat || '';
        card.classList.toggle('hidden', filter !== 'all' && cat !== filter);
      });
    });
  });

  /* ─────────────────────────────
     8. PROJECT MODAL
  ───────────────────────────── */
  const modal      = el('modal');
  const modalTitle = el('modalTitle');
  const modalBody  = el('modalBody');
  const modalClose = el('modalClose');
  const backdrop   = el('modalBackdrop');

  const projectData = {
    crimerate: {
      title: 'Crime Rate Prediction Analysis',
      body: `
        <h4>Overview</h4>
        <p>A data analytics and predictive machine learning application that processes historical crime statistics, models regional risk factors, and forecasts crime trends.</p>
        <h4>Key Features</h4>
        <ul>
          <li>Historical crime data ingestion and normalisation</li>
          <li>Regional risk factor modelling</li>
          <li>Trend forecasting via predictive ML algorithms</li>
          <li>Data visualisation dashboards</li>
        </ul>
        <h4>Tech Stack</h4>
        <p>JavaScript, Data Analytics, Predictive ML, Git</p>
        <a href="https://github.com/bhanusrikarsai/crimerate-prediction-analysis" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:.4rem;color:var(--accent);font-weight:600;margin-top:.5rem;">
          <i class="fa-brands fa-github"></i> View on GitHub
        </a>
      `
    },
    jdbuilder: {
      title: 'JD-Builder',
      body: `
        <h4>Overview</h4>
        <p>An interactive web application crafted for synthesising, formatting, and generating professional Job Descriptions, resumes, and career documents with ease.</p>
        <h4>Key Features</h4>
        <ul>
          <li>Dynamic job description generation</li>
          <li>Customisable templates and formatting</li>
          <li>One-click document export</li>
          <li>Fully responsive, mobile-friendly UI</li>
        </ul>
        <h4>Tech Stack</h4>
        <p>HTML5, Modern CSS3, JavaScript (ES6+)</p>
        <a href="https://github.com/bhanusrikarsai/JD-Builder" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:.4rem;color:var(--accent);font-weight:600;margin-top:.5rem;">
          <i class="fa-brands fa-github"></i> View on GitHub
        </a>
      `
    }
  };

  window.openModal = function(key) {
    const data = projectData[key];
    if (!data || !modal) return;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalBody)  modalBody.innerHTML    = data.body;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (backdrop)   backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ─────────────────────────────
     9. SKILL METER ANIMATION
  ───────────────────────────── */
  const fills = qsa('.meter__fill');
  if (fills.length) {
    const meterObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          fill.style.width = fill.dataset.width || '0';
          meterObs.unobserve(fill);
        }
      });
    }, { threshold: 0.4 });

    fills.forEach(f => meterObs.observe(f));
  }

  /* ─────────────────────────────
     10. SCROLL REVEAL
  ───────────────────────────── */
  qsa('.glass, .about-card, .timeline__item, .project-card, .skill-card, .contact-info, .contact-form, .hero__content, .hero__card').forEach(el => {
    el.classList.add('reveal');
  });

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  qsa('.reveal').forEach(el => revealObs.observe(el));

  /* ─────────────────────────────
     11. AVATAR FALLBACK
  ───────────────────────────── */
  const avatarImg = el('avatarImg');
  const avatarFallback = el('avatarFallback');
  if (avatarImg && avatarFallback) {
    avatarImg.addEventListener('error', () => {
      avatarImg.style.display = 'none';
      avatarFallback.style.display = 'flex';
    });
  }

  /* ─────────────────────────────
     12. RESUME / PRINT
  ───────────────────────────── */
  const resumeBtn = el('resumeBtn');
  if (resumeBtn) resumeBtn.addEventListener('click', () => window.print());

});
