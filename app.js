/* =====================================================
   BHANU SRIKAR SAI — PORTFOLIO APPLICATION LOGIC
   Interactive Features, Modal Engine & Typing Animations
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Helper Selector ── */
  const el = id => document.getElementById(id);
  const qsa = sel => Array.from(document.querySelectorAll(sel));

  /* ─────────────────────────────
     1. DYNAMIC TYPING ANIMATION
  ───────────────────────────── */
  const typedRole = el('typedRole');
  if (typedRole) {
    const roles = [
      "Full-Stack Web Developer",
      "B.Tech CSE Undergrad @ VFSTR",
      "Predictive Analytics & ML Enthusiast",
      "Open Source Contributor"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typedRole.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedRole.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2200; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
  }

  /* ─────────────────────────────
     2. NAVBAR SCROLL & BURGER
  ───────────────────────────── */
  const navbar = el('navbar');
  const navLinks = el('navLinks');
  const burger = el('navBurger');

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
     3. SCROLLSPY ACTIVE NAV LINKS
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
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  /* ─────────────────────────────
     4. ANIMATED SKILL BARS ON SCROLL
  ───────────────────────────── */
  const skillFills = qsa('.skill-bar__fill');
  if (skillFills.length) {
    const skillObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progress = entry.target.getAttribute('data-progress');
          if (progress) {
            entry.target.style.width = progress;
          }
        }
      });
    }, { threshold: 0.3 });

    skillFills.forEach(bar => skillObserver.observe(bar));
  }

  /* ─────────────────────────────
     5. LIGHT / DARK THEME TOGGLE
  ───────────────────────────── */
  const themeBtn = el('themeToggle');
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
      if (isLight) {
        applyDark();
        localStorage.setItem('bss-theme', 'dark');
      } else {
        applyLight();
        localStorage.setItem('bss-theme', 'light');
      }
    });
  }

  /* ─────────────────────────────
     6. TOAST NOTIFICATIONS
  ───────────────────────────── */
  const toast = el('toast');

  function showToast(msg, duration = 2800) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  }

  /* ─────────────────────────────
     7. COPY EMAIL & CODE SNIPPET
  ───────────────────────────── */
  const copyEmailBtn = el('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('vu.241fa04267@gmail.com')
        .then(() => showToast('✓ Email copied to clipboard!'))
        .catch(() => showToast('vu.241fa04267@gmail.com'));
    });
  }

  const copyCodeBtn = el('copyCodeBtn');
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const codeSnippet = `const student = {
  name: "Chutturi Bhanu Srikar Sai",
  education: "B.Tech CSE @ VFSTR",
  coreSkills: ["JavaScript", "HTML5/CSS3", "Data Analytics", "Git"],
  focus: "Full-Stack Web Development & Predictive ML",
  location: "Guntur, AP, India",
  status: "🚀 Ready to solve real-world problems"
};`;
      navigator.clipboard.writeText(codeSnippet)
        .then(() => showToast('✓ JS profile code copied!'))
        .catch(() => showToast('Code copied!'));
    });
  }

  /* ─────────────────────────────
     8. PROJECT FILTER TABS
  ───────────────────────────── */
  const filterBtns = qsa('.filter-btn');
  const projectCards = qsa('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const cat = card.dataset.category || '';
        card.classList.toggle('hidden', filter !== 'all' && cat !== filter);
      });
    });
  });

  /* ─────────────────────────────
     9. PROJECT DETAILS MODAL
  ───────────────────────────── */
  const modal = el('modal');
  const modalTitle = el('modalTitle');
  const modalBody = el('modalBody');
  const modalClose = el('modalClose');
  const backdrop = el('modalBackdrop');

  const projectData = {
    crimerate: {
      title: 'Crime Rate Prediction Analysis',
      body: `
        <h4>Overview</h4>
        <p>A data analytics and machine learning application engineered to analyze historical crime records, identify key risk indicators, and forecast future crime trends across region boundaries.</p>
        <h4>Key Features</h4>
        <ul>
          <li>Historical crime dataset parsing &amp; pre-processing</li>
          <li>Feature extraction and risk metric modeling</li>
          <li>Predictive trend forecasting with machine learning models</li>
          <li>Clean analytical summaries &amp; visual metric charts</li>
        </ul>
        <h4>Tech Stack &amp; Skills</h4>
        <p>JavaScript, Predictive ML, Data Analytics, Git/GitHub</p>
        <div style="margin-top:1.2rem;">
          <a href="https://github.com/bhanusrikarsai/crimerate-prediction-analysis" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm">
            <i class="fa-brands fa-github"></i> View GitHub Repository
          </a>
        </div>
      `
    },
    jdbuilder: {
      title: 'JD-Builder',
      body: `
        <h4>Overview</h4>
        <p>An interactive, responsive web application for quickly composing, editing, and formatting professional Job Descriptions, candidate criteria, and career document templates.</p>
        <h4>Key Features</h4>
        <ul>
          <li>Dynamic job description generation workflow</li>
          <li>Customizable role, skill, and qualification blocks</li>
          <li>Clean UI with instant copy and export options</li>
          <li>100% responsive cross-platform layout</li>
        </ul>
        <h4>Tech Stack &amp; Skills</h4>
        <p>HTML5, Modern CSS3, JavaScript (ES6+), Web Tooling</p>
        <div style="margin-top:1.2rem;">
          <a href="https://github.com/bhanusrikarsai/JD-Builder" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm">
            <i class="fa-brands fa-github"></i> View GitHub Repository
          </a>
        </div>
      `
    },
    portfolio: {
      title: 'Interactive Student Portfolio',
      body: `
        <h4>Overview</h4>
        <p>A personal portfolio showcasing my engineering journey, technical projects, and skills with high visual polish, glassmorphism aesthetics, and fast load times.</p>
        <h4>Key Features</h4>
        <ul>
          <li>Vite build setup for optimized static output</li>
          <li>Glassmorphism dark theme with light mode switcher</li>
          <li>Animated skill bars, live code widgets, and project filters</li>
          <li>Direct GitHub Pages deployment pipeline</li>
        </ul>
        <h4>Tech Stack &amp; Skills</h4>
        <p>Vite, HTML5, CSS3 Glassmorphism, JavaScript ES6+</p>
        <div style="margin-top:1.2rem;">
          <a href="https://github.com/bhanusrikarsai/portfolio" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm">
            <i class="fa-brands fa-github"></i> View GitHub Repository
          </a>
        </div>
      `
    }
  };

  window.openModal = function(key) {
    const data = projectData[key];
    if (!data || !modal) return;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalBody) modalBody.innerHTML = data.body;
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
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  /* ─────────────────────────────
     10. CONTACT FORM SUBMISSION
  ───────────────────────────── */
  const form = el('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = el('fname') ? el('fname').value.trim() : '';
      if (!name) return;
      showToast(`✓ Thank you ${name}! Your message was submitted.`);
      form.reset();
    });
  }

});
