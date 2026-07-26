/* Portfolio App Logic — Clean, Error-Free */

document.addEventListener('DOMContentLoaded', () => {

  const $ = id => document.getElementById(id);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  /* ── 1. TYPING EFFECT ── */
  const typedEl = $('typedRole');
  if (typedEl) {
    const roles = [
      'Full-Stack Web Developer',
      'B.Tech CSE Student @ VFSTR',
      'Data Analytics Enthusiast',
      'Open Source Contributor'
    ];
    let ri = 0, ci = 0, deleting = false;

    function type() {
      const word = roles[ri];
      typedEl.textContent = deleting
        ? word.slice(0, ci - 1)
        : word.slice(0, ci + 1);

      if (deleting) ci--;
      else ci++;

      let delay = deleting ? 38 : 78;
      if (!deleting && ci === word.length) { delay = 2000; deleting = true; }
      else if (deleting && ci === 0)       { deleting = false; ri = (ri + 1) % roles.length; delay = 400; }

      setTimeout(type, delay);
    }
    type();
  }

  /* ── 2. NAVBAR scroll + burger ── */
  const navbar = $('navbar');
  const navLinks = $('navLinks');
  const burger  = $('navBurger');

  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  if (burger && navLinks) {
    burger.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  /* ── 3. ACTIVE NAV LINK (scrollspy) ── */
  const sections   = $$('section[id]');
  const navAnchors = $$('.nav__link');

  if (sections.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navAnchors.forEach(a =>
            a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)
          );
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(s => obs.observe(s));
  }

  /* ── 4. SKILL BAR ANIMATION ── */
  const fills = $$('.meter__fill');
  if (fills.length) {
    const skillObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const w = e.target.getAttribute('data-w');
          if (w) e.target.style.width = w;
          skillObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.25 });
    fills.forEach(f => skillObs.observe(f));
  }

  /* ── 5. THEME TOGGLE ── */
  const themeBtn  = $('themeToggle');
  const themeIcon = $('themeIcon');
  const saved     = localStorage.getItem('bss-theme') || 'dark';
  if (saved === 'light') setLight();

  function setLight() {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
  }
  function setDark() {
    document.documentElement.removeAttribute('data-theme');
    if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) { setDark();  localStorage.setItem('bss-theme', 'dark'); }
      else         { setLight(); localStorage.setItem('bss-theme', 'light'); }
    });
  }

  /* ── 6. TOAST ── */
  const toastEl = $('toast');
  function toast(msg, dur = 2800) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), dur);
  }

  /* ── 7. COPY EMAIL ── */
  const copyEmailBtn = $('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('vu.241fa04267@gmail.com')
        .then(() => toast('✓ Email copied to clipboard!'))
        .catch(() => toast('vu.241fa04267@gmail.com'));
    });
  }

  /* ── 8. COPY CODE ── */
  const copyCodeBtn = $('copyCodeBtn');
  if (copyCodeBtn) {
    const snippet = `const bhanu = {
  name:     "Chutturi Bhanu Srikar Sai",
  degree:   "B.Tech CSE @ VFSTR",
  skills:   ["JavaScript", "HTML/CSS", "Data Analytics", "Git"],
  location: "Guntur, AP, India",
  status:   "Open to opportunities 🚀"
};`;
    copyCodeBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(snippet)
        .then(() => toast('✓ Code snippet copied!'))
        .catch(() => toast('Profile code copied!'));
    });
  }

  /* ── 9. PROJECT FILTER ── */
  const filterBtns  = $$('.filter');
  const projCards   = $$('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      projCards.forEach(c => {
        c.classList.toggle('hidden', f !== 'all' && c.dataset.cat !== f);
      });
    });
  });

  /* ── 10. PROJECT MODAL ── */
  const modal       = $('modal');
  const modalTitle  = $('modalTitle');
  const modalBody   = $('modalBody');
  const modalClose  = $('modalClose');
  const backdrop    = $('modalBackdrop');

  const projects = {
    crimerate: {
      title: 'Crime Rate Prediction Analysis',
      body: `
        <h4>Overview</h4>
        <p>A predictive ML application that processes historical crime data, models regional risk factors, and forecasts crime trends.</p>
        <h4>Key Features</h4>
        <ul>
          <li>Historical crime dataset parsing &amp; processing</li>
          <li>Regional risk factor modelling</li>
          <li>Trend forecasting via predictive ML</li>
          <li>Data visualisation dashboards</li>
        </ul>
        <h4>Stack</h4>
        <p>JavaScript, Predictive ML, Data Analytics, Git</p>
        <div style="margin-top:1.2rem">
          <a href="https://github.com/bhanusrikarsai/crimerate-prediction-analysis" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <i class="fa-brands fa-github"></i> View on GitHub
          </a>
        </div>
      `
    },
    jdbuilder: {
      title: 'JD-Builder',
      body: `
        <h4>Overview</h4>
        <p>An interactive web app for composing, formatting, and exporting professional Job Descriptions and career documents.</p>
        <h4>Key Features</h4>
        <ul>
          <li>Dynamic JD generation workflow</li>
          <li>Customisable role, skill &amp; qualification blocks</li>
          <li>One-click copy and export</li>
          <li>Fully responsive cross-platform UI</li>
        </ul>
        <h4>Stack</h4>
        <p>HTML5, CSS3, JavaScript ES6+</p>
        <div style="margin-top:1.2rem">
          <a href="https://github.com/bhanusrikarsai/JD-Builder" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <i class="fa-brands fa-github"></i> View on GitHub
          </a>
        </div>
      `
    },
    portfolio: {
      title: 'Developer Portfolio',
      body: `
        <h4>Overview</h4>
        <p>A high-performance personal portfolio with glassmorphism dark theme, animated skill bars, project filter tabs, and Vite build pipeline.</p>
        <h4>Key Features</h4>
        <ul>
          <li>Vite-powered build &amp; GitHub Pages deploy</li>
          <li>Dark / Light theme toggle with local storage</li>
          <li>Animated progress skill bars via Intersection Observer</li>
          <li>Typing effect, project modals, copy-to-clipboard</li>
        </ul>
        <h4>Stack</h4>
        <p>Vite, HTML5, Vanilla CSS Glassmorphism, JavaScript ES6+</p>
        <div style="margin-top:1.2rem">
          <a href="https://github.com/bhanusrikarsai/portfolio" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <i class="fa-brands fa-github"></i> View on GitHub
          </a>
        </div>
      `
    }
  };

  window.openModal = function(key) {
    const d = projects[key];
    if (!d || !modal) return;
    if (modalTitle) modalTitle.textContent = d.title;
    if (modalBody)  modalBody.innerHTML    = d.body;
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
  if (backdrop)   backdrop.addEventListener('click',   closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) closeModal();
  });

  /* ── 11. CONTACT FORM ── */
  const form = $('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = ($('fname')?.value || '').trim();
      if (!name) return;
      toast(`✓ Thanks ${name}! Message received.`);
      form.reset();
    });
  }

});
