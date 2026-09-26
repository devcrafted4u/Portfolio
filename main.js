// devcrafted4u - Main Interactive Application Logic
// Enhanced with motion.dev, 3D Card Tilt, Spotlight Glare, Magnetic CTAs, and Counter Count-Up

import { animate, stagger, inView, scroll } from 'motion';

const PROJECTS_DATA = {
  'laura-jewellery': {
    id: 'laura-jewellery',
    title: "L'Aura Fine Jewellery",
    tagline: 'Exquisite High-Clarity Diamond & 18k Gold Luxury Catalog',
    category: 'E-Commerce & Luxury',
    year: '2025',
    image: './assets/project_laura_jewellery.jpg',
    liveUrl: 'https://thekrafe.netlify.app/',
    metric1: '+210% Conversion',
    metric2: '0.7s LCP',
    metric3: 'React + Vite',
    metric4: 'Pure White Catalog',
    description: "An ultra-luxury e-commerce catalog engineered for high-clarity diamonds, 18k gold bands, and precious gemstones. Features smooth interactive zoom exploration, Cormorant Garamond typography, and minimalist white gallery layouts designed for discerning international clientele.",
    tags: ['React', 'Vite', 'Tailwind CSS', 'Cormorant Garamond', 'Luxury UX', 'Interactive Zoom'],
    hasFullCaseStudy: true,
    caseStudyUrl: '#/case-study'
  },
  'id-fitness': {
    id: 'id-fitness',
    title: 'ID FITNESS',
    tagline: 'Performance Gym, Athletic Conditioning & Membership Platform',
    category: 'Performance Gym',
    year: '2025',
    image: './assets/project_id_fitness.jpg',
    liveUrl: 'https://fit-all.netlify.app/',
    metric1: '4.9/5 Rating',
    metric2: '10K+ Workouts',
    metric3: '12+ Coaches',
    metric4: '99/100 Perf',
    description: "High-impact web platform and membership portal for a premier athletic training gym in Bengaluru. Engineered with high-contrast electric cyan and dark slate aesthetics, program directory, tiered membership selector, and direct tour booking engine.",
    tags: ['HTML5 & CSS Grid', 'Performance SLA', 'Lead Capture Engine', 'Dark Aesthetic', 'Mobile First'],
    hasFullCaseStudy: false
  },
  'ravis-kitchen': {
    id: 'ravis-kitchen',
    title: "Ravi's Kitchen",
    tagline: 'Authentic North Indian Fine Dining & Table Reservation Portal',
    category: 'Fine Dining',
    year: '2025',
    image: './assets/project_ravis_kitchen.jpg',
    liveUrl: 'https://gulbarg.netlify.app/',
    metric1: '98 Web Vitals',
    metric2: 'Online Booking',
    metric3: 'Digital Menu',
    metric4: '<0.9s Load',
    description: "A warm, editorial digital presence for an authentic North Indian restaurant. Designed with Playfair Display serif typography, golden amber tones, seasonal menu showcase, and a streamlined table reservation system.",
    tags: ['Editorial Layout', 'Table Reservation', 'Digital Menu', 'Playfair Display', 'Responsive Web'],
    hasFullCaseStudy: false
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = '';
  initTheme();
  initRouting();
  initProjectModal();
  initWorkFilters();
  initPricingCalculator();
  initSwatches();
  initInquiryForm();
  initMobileMenu();
  initLiveClock();
  fixInternalLinks();

  // Modern Animation Suite
  initHeroStagger();
  initCountUpMetrics();
  init3DCardTilt();
  initMagneticElements();
  initScrollReveals();
  initScrollExtras();
});

// 1. Dark Mode / Theme Engine with Animated Circular Wave Transition & Icon Physics
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

  function getSavedTheme() {
    const saved = localStorage.getItem('atelier_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.querySelectorAll('.theme-icon-sun').forEach(el => el.classList.remove('hidden'));
      document.querySelectorAll('.theme-icon-moon').forEach(el => el.classList.add('hidden'));
      const label = document.getElementById('mobile-theme-label');
      if (label) label.textContent = 'Light Mode';
    } else {
      document.documentElement.classList.remove('dark');
      document.querySelectorAll('.theme-icon-sun').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.theme-icon-moon').forEach(el => el.classList.remove('hidden'));
      const label = document.getElementById('mobile-theme-label');
      if (label) label.textContent = 'Dark Mode';
    }
    localStorage.setItem('atelier_theme', theme);
  }

  const currentTheme = getSavedTheme();
  applyTheme(currentTheme);

  function toggle(e) {
    const isDark = document.documentElement.classList.contains('dark');
    const nextTheme = isDark ? 'light' : 'dark';

    // Interactive button spring spin
    const targetBtn = e?.currentTarget || themeToggle;
    if (targetBtn) {
      animate(targetBtn, { rotate: [0, 180, 360], scale: [0.82, 1.15, 1] }, { duration: 0.55, easing: [0.16, 1, 0.3, 1] });
    }

    // Modern View Transitions API (Circular Ripple Wave Animation)
    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const rect = targetBtn ? targetBtn.getBoundingClientRect() : null;
      const x = rect ? rect.left + rect.width / 2 : (e ? e.clientX : window.innerWidth / 2);
      const y = rect ? rect.top + rect.height / 2 : (e ? e.clientY : 40);
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        applyTheme(nextTheme);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 650,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      });
    } else {
      // Smooth fallback CSS transition across colors & shadows
      document.documentElement.classList.add('theme-transitioning');
      applyTheme(nextTheme);
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }, 500);
    }

    showToast(nextTheme === 'light' ? 'Switched to Light Travertine' : 'Switched to Editorial Dark Noir', 'info');
  }

  if (themeToggle) themeToggle.addEventListener('click', toggle);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggle);
}

// 2. Client-Side Hash Router
function initRouting() {
  const views = {
    'home': document.getElementById('view-home'),
    'case-study': document.getElementById('view-case-study'),
    'inquiry': document.getElementById('view-inquiry')
  };

  const desktopLinks = document.querySelectorAll('#desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('#mobile-menu-drawer .mobile-nav-link');

  function setActiveNav(navKey) {
    desktopLinks.forEach(link => {
      const match = link.getAttribute('data-nav') === navKey;
      if (match) {
        link.classList.add('text-on-surface', 'bg-surface-container-highest', 'dark:bg-white/15', 'shadow-xs', 'font-semibold');
        link.classList.remove('text-on-surface-variant');
      } else {
        link.classList.remove('text-on-surface', 'bg-surface-container-highest', 'dark:bg-white/15', 'shadow-xs', 'font-semibold');
        link.classList.add('text-on-surface-variant');
      }
    });

    mobileLinks.forEach(link => {
      const match = link.getAttribute('data-nav') === navKey;
      if (match) {
        link.classList.add('text-secondary', 'font-semibold', 'bg-secondary/10');
        link.classList.remove('text-on-surface-variant');
      } else {
        link.classList.remove('text-secondary', 'font-semibold', 'bg-secondary/10');
        link.classList.add('text-on-surface-variant');
      }
    });
  }

  function renderRoute() {
    const rawHash = window.location.hash.toLowerCase() || '';

    // Deactivate all views
    Object.values(views).forEach(v => {
      if (v) v.classList.remove('active');
    });

    if (rawHash.startsWith('#/case-study')) {
      if (views['case-study']) views['case-study'].classList.add('active');
      setActiveNav('case-studies');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (rawHash.startsWith('#/inquiry') || rawHash.startsWith('#/contact') || rawHash.startsWith('#/book')) {
      if (views['inquiry']) views['inquiry'].classList.add('active');
      setActiveNav('inquiry');
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Handle tier pre-selection
      if (rawHash.includes('tier=')) {
        const tier = rawHash.split('tier=')[1].split('&')[0];
        preselectTier(tier);
      }
    } else {
      // Home Showcase view
      if (views['home']) views['home'].classList.add('active');

      if (rawHash === '#selected-work' || rawHash === '#/selected-work') {
        setActiveNav('selected-work');
        scrollToElement('selected-work', -90);
      } else if (rawHash === '#services-pricing' || rawHash === '#/services-and-pricing' || rawHash === '#/pricing' || rawHash === '#/services-pricing') {
        setActiveNav('services-and-pricing');
        scrollToElement('services-pricing', -90);
      } else if (rawHash === '#process' || rawHash === '#/process') {
        setActiveNav('process');
        scrollToElement('process', -90);
      } else {
        setActiveNav('selected-work');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  }

  function scrollToElement(id, yOffset = -90) {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 60);
  }

  window.addEventListener('hashchange', renderRoute);
  renderRoute();
}

// 3. Project Detail Quick-View Modal
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const backdrop = document.getElementById('project-modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');

  function openModal(projectId) {
    const data = PROJECTS_DATA[projectId];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-tagline').textContent = data.tagline;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-year').textContent = data.year;
    
    const imgEl = document.getElementById('modal-image');
    imgEl.src = data.image;
    imgEl.alt = data.title;

    document.getElementById('modal-metric-1').textContent = data.metric1;
    document.getElementById('modal-metric-2').textContent = data.metric2;
    document.getElementById('modal-metric-3').textContent = data.metric3;
    document.getElementById('modal-metric-4').textContent = data.metric4;
    document.getElementById('modal-description').textContent = data.description;

    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = '';
    data.tags.forEach(tag => {
      const pill = document.createElement('span');
      pill.className = 'px-2.5 py-1 rounded-md bg-surface-container font-label-sm text-xs text-on-surface-variant';
      pill.textContent = tag;
      tagsContainer.appendChild(pill);
    });

    const liveLink = document.getElementById('modal-live-link');
    if (liveLink) {
      liveLink.href = data.liveUrl || '#';
      liveLink.innerHTML = `<span>Visit Live Website</span><span class="material-symbols-outlined text-sm">north_east</span>`;
    }

    const deepLinkContainer = document.getElementById('modal-deep-link-container');
    if (data.hasFullCaseStudy && data.caseStudyUrl) {
      deepLinkContainer.innerHTML = `
        <a href="${data.caseStudyUrl}" class="px-space-md py-space-xs rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-1.5 transition-colors">
          <span>Read Full Deep-Dive Case Study</span>
          <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      `;
      deepLinkContainer.querySelector('a')?.addEventListener('click', closeModal);
    } else {
      deepLinkContainer.innerHTML = `
        <span class="font-label-sm text-xs text-on-surface-variant">Live verified release</span>
      `;
    }

    modal.classList.remove('opacity-0', 'pointer-events-none');
    const dialog = modal.querySelector('div.relative');
    if (dialog) {
      animate(dialog, { scale: [0.92, 1], opacity: [0, 1] }, { duration: 0.35, easing: [0.16, 1, 0.3, 1] });
    }
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const dialog = modal.querySelector('div.relative');
    if (dialog) {
      animate(dialog, { scale: [1, 0.94], opacity: [1, 0] }, { duration: 0.25, easing: [0.16, 1, 0.3, 1] }).finished.then(() => {
        modal.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
      });
    } else {
      modal.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
      closeModal();
    }
  });

  // Attach click listener to quick view triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-project-id]');
    if (trigger) {
      const pid = trigger.getAttribute('data-project-id');
      const isCaseStudyLink = trigger.tagName === 'A' && trigger.getAttribute('data-path') === 'case-studies';
      if (pid === 'laura-jewellery' && isCaseStudyLink) {
        return;
      }
      e.preventDefault();
      openModal(pid);
    }
  });
}

// 4. Interactive Work Filters with Smooth Transition
function initWorkFilters() {
  const filterBar = document.getElementById('work-filter-bar');
  if (!filterBar) return;

  const buttons = filterBar.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('#projects-grid .project-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = btn.getAttribute('data-filter') || 'all';

      buttons.forEach(b => {
        b.classList.remove('active-filter', 'bg-primary', 'text-on-primary');
        b.classList.add('text-on-surface-variant');
      });
      btn.classList.add('active-filter', 'bg-primary', 'text-on-primary');
      btn.classList.remove('text-on-surface-variant');

      let visibleCards = [];
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const matches = filter === 'all' || cat === filter;
        if (matches) {
          visibleCards.push(card);
          card.style.display = 'flex';
          animate(card, { opacity: [0, 1], y: [16, 0], scale: [0.98, 1] }, { duration: 0.45, easing: [0.16, 1, 0.3, 1] });
        } else {
          animate(card, { opacity: [1, 0], y: [0, 12], scale: [1, 0.98] }, { duration: 0.25 }).finished.then(() => {
            card.style.display = 'none';
          });
        }
      });

      // If only 1 card is visible, center it gracefully so 2/3 of the screen is not an empty hole
      cards.forEach(c => {
        if (visibleCards.length === 1 && visibleCards.includes(c)) {
          c.classList.add('lg:col-span-3', 'max-w-xl', 'mx-auto', 'w-full');
        } else {
          c.classList.remove('lg:col-span-3', 'max-w-xl', 'mx-auto', 'w-full');
        }
      });
    });
  });
}

// 5. Interactive Case Study Swatches
function initSwatches() {
  const swatches = document.querySelectorAll('[data-swatch]');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const hex = swatch.getAttribute('data-swatch') || '';
      const name = swatch.getAttribute('data-swatch-name') || 'Color';
      
      swatches.forEach(s => s.classList.remove('ring-2', 'ring-secondary', 'scale-105'));
      swatch.classList.add('ring-2', 'ring-secondary', 'scale-105');

      navigator.clipboard?.writeText(hex).then(() => {
        showToast(`Copied ${name} (${hex}) to clipboard!`, 'success');
      }).catch(() => {
        showToast(`Selected ${name} (${hex})`, 'info');
      });
    });
  });
}

// 6. Interactive Inquiry Form Engine
function initInquiryForm() {
  const inquiryView = document.getElementById('view-inquiry');
  if (!inquiryView) return;

  // Multi-select scope pills
  const scopeContainer = document.getElementById('scopeContainer');
  if (scopeContainer) {
    scopeContainer.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isSelected = btn.classList.contains('bg-primary');
        if (isSelected) {
          btn.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
          btn.classList.add('bg-surface-container', 'text-on-surface');
          btn.setAttribute('aria-pressed', 'false');
        } else {
          btn.classList.remove('bg-surface-container', 'text-on-surface');
          btn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
          btn.setAttribute('aria-pressed', 'true');
        }
      });
    });
  }

  // Radio button groups
  function setupRadioGroup(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const buttons = container.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        buttons.forEach(b => {
          b.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
          b.classList.add('bg-surface-container', 'text-on-surface');
          b.setAttribute('aria-checked', 'false');
        });
        btn.classList.remove('bg-surface-container', 'text-on-surface');
        btn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
        btn.setAttribute('aria-checked', 'true');
      });
    });
  }

  setupRadioGroup('budgetContainer');
  setupRadioGroup('timelineContainer');

  document.querySelectorAll('[data-select-tier]').forEach(link => {
    link.addEventListener('click', () => {
      const tier = link.getAttribute('data-select-tier');
      preselectTier(tier);
    });
  });

  const form = document.getElementById('inquiryForm');
  const submitBtn = document.getElementById('submitButton');
  const successMsg = document.getElementById('successMessage');

  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('clientName');
      const emailInput = document.getElementById('clientEmail');
      const briefInput = document.getElementById('projectBrief');

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const briefVal = briefInput ? briefInput.value.trim() : '';

      if (!nameVal) {
        showToast('Please provide your name.', 'error');
        nameInput?.focus();
        return;
      }

      if (!emailVal || !emailVal.includes('@') || !emailVal.includes('.')) {
        showToast('Please enter a valid work email address.', 'error');
        emailInput?.focus();
        return;
      }

      if (!briefVal || briefVal.length < 10) {
        showToast('Please write a brief summary of your project requirements (min 10 characters).', 'error');
        briefInput?.focus();
        return;
      }

      submitBtn.innerHTML = `
        <span class="material-symbols-outlined animate-spin text-lg">progress_activity</span>
        <span>Sending Brief to Principal Partners...</span>
      `;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.parentElement.classList.add('hidden');
        if (successMsg) {
          successMsg.classList.remove('hidden');
          successMsg.classList.add('flex');
          animate(successMsg, { opacity: [0, 1], scale: [0.95, 1] }, { duration: 0.5, easing: [0.16, 1, 0.3, 1] });
        }
        showToast(`Thank you ${nameVal}! Your inquiry has been dispatched to devcrafted4u.`, 'success');
      }, 700);
    });
  }

  const resetBtn = document.getElementById('resetFormBtn');
  if (resetBtn && submitBtn && successMsg) {
    resetBtn.addEventListener('click', () => {
      if (form) form.reset();
      submitBtn.innerHTML = `
        <span>Submit Inquiry &amp; Schedule Discovery Call</span>
        <span class="material-symbols-outlined text-lg">arrow_forward</span>
      `;
      submitBtn.disabled = false;
      submitBtn.parentElement.classList.remove('hidden');
      successMsg.classList.add('hidden');
      successMsg.classList.remove('flex');
    });
  }
}

// Helper for Indian Rupee formatting
function formatINR(val) {
  return '₹' + new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(val));
}

// Dynamic Value Pack Calculator State & Logic (INR Centric)
let currentCalculatorConfig = {
  sites: 3,
  months: 12,
  total: 44998,
  undiscountedTotal: 56247,
  savingsAmount: 11249,
  discountPct: 0.20,
  buildTotal: 14997,
  maintenanceTotal: 41250,
  discountText: 'Save 20% on 1-Year Max Plan'
};

function initCustomizeModal() {
  const modal = document.getElementById('customize-modal');
  const openBtn = document.getElementById('open-customize-modal-btn');
  const closeBtn = document.getElementById('customize-modal-close-btn');
  const cancelBtn = document.getElementById('customize-modal-cancel-btn');
  const applyBtn = document.getElementById('customize-modal-apply-btn');
  const backdrop = document.getElementById('customize-modal-backdrop');
  const guideBtn = document.getElementById('popup-open-discount-guide-btn');

  if (!modal) return null;

  function openModal() {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    const dialog = modal.querySelector('div.relative');
    if (dialog) {
      animate(dialog, { scale: [0.92, 1], opacity: [0, 1] }, { duration: 0.32, easing: [0.16, 1, 0.3, 1] });
    }
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const dialog = modal.querySelector('div.relative');
    if (dialog) {
      animate(dialog, { scale: [1, 0.94], opacity: [1, 0] }, { duration: 0.22, easing: [0.16, 1, 0.3, 1] }).finished.then(() => {
        modal.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
      });
    } else {
      modal.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    }
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      closeModal();
      showToast(`Saved customization: ${currentCalculatorConfig.sites} Site${currentCalculatorConfig.sites > 1 ? 's' : ''} • ${currentCalculatorConfig.months === 12 ? '1 Year' : `${currentCalculatorConfig.months} Months`} (${formatINR(currentCalculatorConfig.total)})`, 'success');
    });
  }

  if (guideBtn) {
    guideBtn.addEventListener('click', () => {
      closeModal();
      const discBtn = document.getElementById('open-discount-modal-btn');
      if (discBtn) discBtn.click();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
      closeModal();
    }
  });

  return { openModal, closeModal };
}

function initDiscountModal() {
  const modal = document.getElementById('discount-modal');
  const openBtn = document.getElementById('open-discount-modal-btn');
  const closeBtn = document.getElementById('discount-modal-close-btn');
  const doneBtn = document.getElementById('discount-modal-done-btn');
  const backdrop = document.getElementById('discount-modal-backdrop');

  if (!modal) return null;

  function openModal() {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    const dialog = modal.querySelector('div.relative');
    if (dialog) {
      animate(dialog, { scale: [0.92, 1], opacity: [0, 1] }, { duration: 0.32, easing: [0.16, 1, 0.3, 1] });
    }
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const dialog = modal.querySelector('div.relative');
    if (dialog) {
      animate(dialog, { scale: [1, 0.94], opacity: [1, 0] }, { duration: 0.22, easing: [0.16, 1, 0.3, 1] }).finished.then(() => {
        modal.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
      });
    } else {
      modal.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    }
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (doneBtn) doneBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
      closeModal();
    }
  });

  return { openModal, closeModal };
}

function initPricingCalculator() {
  const sitesSlider = document.getElementById('calc-sites-slider');
  const sitesDisplay = document.getElementById('calc-sites-display');
  const sitesMinus = document.getElementById('calc-sites-minus');
  const sitesPlus = document.getElementById('calc-sites-plus');
  const durationPills = document.querySelectorAll('.duration-pill');
  const totalPriceEl = document.getElementById('calc-total-price');
  const originalPriceEl = document.getElementById('calc-original-price');
  const discountPillEl = document.getElementById('calc-discount-pill');
  const breakdownText = document.getElementById('calc-breakdown-text');
  const savingsBadge = document.getElementById('calc-savings-badge');
  const submitBtn = document.getElementById('calc-submit-btn');
  const cardConfigSummary = document.getElementById('card-config-summary');

  // Popup elements
  const popupTotalPrice = document.getElementById('popup-total-price');
  const popupOriginalPrice = document.getElementById('popup-original-price');
  const popupDiscountPill = document.getElementById('popup-discount-pill');
  const popupBreakdownText = document.getElementById('popup-breakdown-text');
  const popupSavingsBadge = document.getElementById('popup-savings-badge');

  const discountModalController = initDiscountModal();
  const customizeModalController = initCustomizeModal();

  if (!sitesSlider || !popupTotalPrice) return;

  let sites = 3;
  let months = 12;

  const baseBuildPerSite = 4999; // ₹4,999/site build rate
  const baseMonthlyRate = 1099; // ₹1,099/mo maintenance baseline
  
  // Base bundled maintenance fee per site:
  // 3 months: ₹4,000 / site -> 1 site + 3 mo = ₹4,999 + ₹4,000 = ₹8,999
  // 6 months: ₹8,000 / site -> 1 site + 6 mo = ₹4,999 + ₹8,000 = ₹12,999
  // 9 months: ₹9,000 / site -> 1 site + 9 mo = ₹4,999 + ₹9,000 = ₹13,999
  // 12 months: ₹13,750 / site -> 1 site + 12 mo = ₹18,749 - 20% (1-Yr discount) = ₹14,999
  const maintPerSiteByMonths = {
    3: 4000,
    6: 8000,
    9: 9000,
    12: 13750
  };

  let isInitialCalc = true;

  function calculate() {
    const baseMaintPerSite = maintPerSiteByMonths[months] || 13750;
    const buildTotal = sites * baseBuildPerSite;
    const maintenanceTotal = sites * baseMaintPerSite;
    const undiscountedTotal = buildTotal + maintenanceTotal;

    let discountPct = 0;
    let discountText = '';
    let badgeText = '';

    // Rule 1: Max savings: 8+ sites AND (9 months or 1 year) -> 30% discount
    if (sites >= 8 && (months === 9 || months === 12)) {
      discountPct = 0.30;
      discountText = '🔥 30% Max Savings Applied (8+ Sites & Long-Term Support)';
      badgeText = '30% Max Savings';
    }
    // Rule 2: 1 Year (Max) maintenance -> 20% discount
    else if (months === 12) {
      discountPct = 0.20;
      discountText = 'Save 20% on 1-Year Max Plan';
      badgeText = '20% Off 1-Year Max Support';
    }
    // Rule 3: 5+ sites with min 6 months maintenance -> 10% discount
    else if (sites >= 5 && months >= 6) {
      discountPct = 0.10;
      discountText = 'Save 10% on 5+ Sites Growth Plan';
      badgeText = '10% Off (5+ Sites & 6+ Mo)';
    }
    else if (months === 9) {
      discountText = 'Standard 9-Month Plan';
      badgeText = '9-Month Plan';
    }
    else if (months === 6) {
      discountText = 'Standard 6-Month Plan';
      badgeText = '6-Month Plan';
    }
    else {
      discountText = 'Standard 3-Month Starter Plan';
      badgeText = '3-Month Plan';
    }

    const savingsAmount = Math.round(undiscountedTotal * discountPct);
    const finalTotal = undiscountedTotal - savingsAmount;

    currentCalculatorConfig = {
      sites,
      months,
      total: finalTotal,
      undiscountedTotal,
      savingsAmount,
      discountPct,
      buildTotal,
      maintenanceTotal,
      discountText
    };

    // Update UI elements
    if (sitesDisplay) sitesDisplay.textContent = `${sites} Site${sites > 1 ? 's' : ''}`;
    if (sitesSlider) sitesSlider.value = sites;
    
    if (totalPriceEl) {
      totalPriceEl.textContent = formatINR(finalTotal);
      if (!isInitialCalc && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animate(totalPriceEl, { scale: [1, 1.08, 1] }, { duration: 0.28, easing: [0.16, 1, 0.3, 1] });
      }
    }

    if (originalPriceEl) {
      if (discountPct > 0) {
        originalPriceEl.textContent = formatINR(undiscountedTotal);
        originalPriceEl.classList.remove('hidden');
      } else {
        originalPriceEl.classList.add('hidden');
      }
    }

    if (discountPillEl) {
      if (discountPct > 0) {
        discountPillEl.textContent = `${Math.round(discountPct * 100)}% OFF (Save ${formatINR(savingsAmount)})`;
        discountPillEl.classList.remove('hidden');
      } else {
        discountPillEl.classList.add('hidden');
      }
    }
    
    const yearsText = months === 12 ? '1 Year (Max)' : `${months} Months`;
    if (breakdownText) {
      breakdownText.textContent = `${sites} Website${sites > 1 ? 's' : ''} • ${yearsText} Maintenance (${formatINR(buildTotal)} build + ${formatINR(maintenanceTotal)} support)`;
    }
    
    if (cardConfigSummary) {
      cardConfigSummary.textContent = `${sites} Website${sites > 1 ? 's' : ''} • ${yearsText} Maintenance`;
    }

    if (savingsBadge) {
      savingsBadge.textContent = badgeText;
    }

    if (submitBtn) {
      submitBtn.textContent = `Select Value Pack (${formatINR(finalTotal)})`;
      if (!isInitialCalc && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animate(submitBtn, { scale: [0.98, 1.01, 1] }, { duration: 0.24, easing: [0.16, 1, 0.3, 1] });
      }
    }

    // Update popup UI elements
    if (popupTotalPrice) {
      popupTotalPrice.textContent = formatINR(finalTotal);
      if (!isInitialCalc && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animate(popupTotalPrice, { scale: [1, 1.06, 1] }, { duration: 0.25, easing: [0.16, 1, 0.3, 1] });
      }
    }

    if (popupOriginalPrice) {
      if (discountPct > 0) {
        popupOriginalPrice.textContent = formatINR(undiscountedTotal);
        popupOriginalPrice.classList.remove('hidden');
      } else {
        popupOriginalPrice.classList.add('hidden');
      }
    }

    if (popupDiscountPill) {
      if (discountPct > 0) {
        popupDiscountPill.textContent = `${Math.round(discountPct * 100)}% OFF (Save ${formatINR(savingsAmount)})`;
        popupDiscountPill.classList.remove('hidden');
      } else {
        popupDiscountPill.classList.add('hidden');
      }
    }

    if (popupBreakdownText) {
      popupBreakdownText.textContent = `${sites} Website${sites > 1 ? 's' : ''} • ${yearsText} Maintenance (${formatINR(buildTotal)} build + ${formatINR(maintenanceTotal)} support)`;
    }

    if (popupSavingsBadge) {
      popupSavingsBadge.textContent = badgeText;
    }
  }

  // Stepper handlers
  if (sitesMinus) {
    sitesMinus.addEventListener('click', () => {
      if (sites > 1) {
        sites--;
        calculate();
      }
    });
  }

  if (sitesPlus) {
    sitesPlus.addEventListener('click', () => {
      if (sites < 10) {
        sites++;
        calculate();
      }
    });
  }

  // Slider handler
  sitesSlider.addEventListener('input', (e) => {
    sites = parseInt(e.target.value, 10) || 1;
    calculate();
  });

  // Duration Pills handler
  durationPills.forEach(pill => {
    pill.addEventListener('click', () => {
      durationPills.forEach(p => {
        p.classList.remove('bg-primary', 'text-on-primary', 'shadow-xs', 'active-duration');
        p.classList.add('bg-surface-container', 'text-on-surface');
      });
      pill.classList.remove('bg-surface-container', 'text-on-surface');
      pill.classList.add('bg-primary', 'text-on-primary', 'shadow-xs', 'active-duration');

      months = parseInt(pill.getAttribute('data-months'), 10) || 12;
      calculate();
    });
  });

  // Modal preset triggers
  document.querySelectorAll('.apply-discount-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const presetSites = parseInt(btn.getAttribute('data-preset-sites'), 10);
      const presetMonths = parseInt(btn.getAttribute('data-preset-months'), 10);

      if (presetSites) sites = presetSites;
      if (presetMonths) {
        months = presetMonths;
        durationPills.forEach(p => {
          if (parseInt(p.getAttribute('data-months'), 10) === presetMonths) {
            p.classList.remove('bg-surface-container', 'text-on-surface');
            p.classList.add('bg-primary', 'text-on-primary', 'shadow-xs', 'active-duration');
          } else {
            p.classList.remove('bg-primary', 'text-on-primary', 'shadow-xs', 'active-duration');
            p.classList.add('bg-surface-container', 'text-on-surface');
          }
        });
      }

      calculate();
      if (btn.closest('#discount-modal')) {
        if (discountModalController) {
          discountModalController.closeModal();
        }
        // Scroll to calculator
        const calcSection = document.getElementById('services-pricing');
        if (calcSection) {
          calcSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }

      showToast(`Applied preset: ${sites} Site${sites > 1 ? 's' : ''} + ${months === 12 ? '1 Year' : months === 24 ? '2 Years' : `${months} Mo`} (${currentCalculatorConfig.discountText || formatINR(currentCalculatorConfig.total)})`, 'success');
    });
  });

  // Initial calculation
  calculate();
  isInitialCalc = false;
}

function preselectTier(tier) {
  const budgetContainer = document.getElementById('budgetContainer');
  const timelineContainer = document.getElementById('timelineContainer');
  const scopeContainer = document.getElementById('scopeContainer');
  const briefInput = document.getElementById('projectBrief');

  if (tier === 'tier-basic' || tier === 'tier-sprint') {
    selectRadioByValue(budgetContainer, '<15k');
    selectRadioByValue(timelineContainer, '2-weeks');
    selectPillByValue(scopeContainer, 'New Website Design');
    if (briefInput) {
      briefInput.value = "Selected Tier: Basic Web Launch (1 Website Only - ₹4,999 flat fee).\nWe need 1 bespoke high-converting website built and deployed within 7–10 days.";
    }
    showToast('Applied "Basic Pack (1 Website)" defaults (₹4,999)', 'info');
  } else if (tier === 'tier-value-pack' || tier === 'tier-flagship') {
    const config = currentCalculatorConfig;
    const budgetVal = config.total < 15000 ? '<15k' : config.total < 50000 ? '15k-50k' : config.total < 100000 ? '50k-100k' : '100k+';
    selectRadioByValue(budgetContainer, budgetVal);
    selectRadioByValue(timelineContainer, 'next-month');
    selectPillByValue(scopeContainer, 'New Website Design');
    selectPillByValue(scopeContainer, 'Full Rebrand + Site');
    if (briefInput) {
      const savingsInfo = config.discountPct > 0 ? ` [${Math.round(config.discountPct * 100)}% Discount Applied: Save ${formatINR(config.savingsAmount)}]` : '';
      briefInput.value = `Selected Tier: Value Pack (${config.sites} Website${config.sites > 1 ? 's' : ''} + ${config.months} Months Guaranteed Maintenance Coverage)${savingsInfo}.\nCalculated Investment: ${formatINR(config.total)} (${formatINR(config.buildTotal)} build + ${formatINR(config.maintenanceTotal)} maintenance support).\nLet's coordinate on discovery, multi-domain roadmap, and sprint launch schedule.`;
    }
    showToast(`Applied "Value Pack" (${config.sites} Site${config.sites > 1 ? 's' : ''} / ${config.months} Mo Maint - ${formatINR(config.total)})`, 'info');
  } else if (tier === 'tier-custom' || tier === 'tier-retainer') {
    selectRadioByValue(budgetContainer, '100k+');
    selectRadioByValue(timelineContainer, 'flexible');
    selectPillByValue(scopeContainer, 'Full Rebrand + Site');
    selectPillByValue(scopeContainer, 'Webflow / Framer');
    if (briefInput) {
      briefInput.value = "Selected Tier: Custom Pack & Strategic Advisory (Bespoke Architecture).\nWe require tailored consultation and discovery with your lead architect for our enterprise / custom platform.";
    }
    showToast('Applied "Custom Pack / Strategy Consultation" defaults', 'info');
  }
}

function selectRadioByValue(container, val) {
  if (!container) return;
  const buttons = container.querySelectorAll('button');
  buttons.forEach(btn => {
    if (btn.getAttribute('data-value') === val) {
      buttons.forEach(b => {
        b.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
        b.classList.add('bg-surface-container', 'text-on-surface');
      });
      btn.classList.remove('bg-surface-container', 'text-on-surface');
      btn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
    }
  });
}

function selectPillByValue(container, val) {
  if (!container) return;
  const btn = container.querySelector(`button[data-value="${val}"]`);
  if (btn) {
    btn.classList.remove('bg-surface-container', 'text-on-surface');
    btn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
  }
}

// 7. Mobile Navigation Menu Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-menu-drawer');
  if (!menuBtn || !drawer) return;

  function closeDrawer() {
    if (drawer.classList.contains('hidden')) return;
    animate(drawer, { opacity: [1, 0], y: [0, -10] }, { duration: 0.2 }).finished.then(() => {
      drawer.classList.add('hidden');
    });
    const icon = menuBtn.querySelector('.material-symbols-outlined');
    if (icon) icon.textContent = 'menu';
  }

  function openDrawer() {
    drawer.classList.remove('hidden');
    animate(drawer, { opacity: [0, 1], y: [-15, 0] }, { duration: 0.35, easing: [0.16, 1, 0.3, 1] });
    const icon = menuBtn.querySelector('.material-symbols-outlined');
    if (icon) icon.textContent = 'close';
  }

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = drawer.classList.contains('hidden');
    if (isHidden) {
      openDrawer();
    } else {
      closeDrawer();
    }
  });

  // Close when tapping anywhere outside the drawer
  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !menuBtn.contains(e.target)) {
      closeDrawer();
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // Auto-close on resize to desktop (>= 1024px)
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && !drawer.classList.contains('hidden')) {
      drawer.classList.add('hidden');
      const icon = menuBtn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = 'menu';
    }
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

// 8. Connect internal links throughout document
function fixInternalLinks() {
  document.querySelectorAll('a').forEach(a => {
    const dataPath = a.getAttribute('data-path');
    if (dataPath === 'case-studies') {
      a.setAttribute('href', '#/case-study');
    } else if (dataPath === 'contact' || dataPath === 'inquiry') {
      a.setAttribute('href', '#/inquiry');
    } else if (dataPath === 'selected-work') {
      a.setAttribute('href', '#/selected-work');
    } else if (dataPath === 'services-and-pricing') {
      a.setAttribute('href', '#/services-and-pricing');
    } else if (dataPath === 'process') {
      a.setAttribute('href', '#/process');
    }
  });
}

// 9. Live London BST Clock in Footer
function initLiveClock() {
  const clockEl = document.getElementById('live-time');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const options = {
      timeZone: 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    clockEl.textContent = now.toLocaleTimeString('en-US', options) + ' BST';
  }

  update();
  setInterval(update, 1000);
}

// ==========================================
// 10. MODERN MOTION & ANIMATION SUITE
// ==========================================

// A. Staggered Hero Entrance (Ultra-Smooth Composite Only)
function initHeroStagger() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const items = document.querySelectorAll('#view-home .hero-stagger-item');
  if (!items.length) return;

  animate(
    items,
    {
      opacity: [0, 1],
      y: [18, 0],
      scale: [0.99, 1]
    },
    {
      delay: stagger(0.06, { start: 0.08 }),
      duration: 0.65,
      easing: [0.16, 1, 0.3, 1]
    }
  );
}

// B. Jitter-Free Counter Count-Up for Key Metrics
function initCountUpMetrics() {
  const metricElements = document.querySelectorAll('.metric-counter');
  if (!metricElements.length) return;

  function parseMetric(str) {
    const text = str.trim();
    const match = text.match(/^([<+~]?)\s*(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return { prefix: '', value: parseFloat(text) || 0, decimals: 0, suffix: '' };
    const prefix = match[1] ? (match[1] === '<' ? '< ' : match[1]) : '';
    const numVal = parseFloat(match[2]);
    const suffix = match[3] || '';
    const decimals = match[2].includes('.') ? match[2].split('.')[1].length : 0;
    return { prefix, value: numVal, decimals, suffix };
  }

  function startCount(el) {
    if (el.dataset.counted === 'true') return;
    el.dataset.counted = 'true';

    const originalText = el.getAttribute('data-counter') || el.textContent;
    const { prefix, value: targetValue, decimals, suffix } = parseMetric(originalText);
    const duration = 1600;
    const startTime = performance.now();

    function frame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutQuart
      const easeVal = 1 - Math.pow(1 - progress, 4);
      const currentVal = easeVal * targetValue;

      const formatted = decimals > 0 
        ? currentVal.toFixed(decimals) 
        : Math.round(currentVal).toString();

      el.textContent = `${prefix}${formatted}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = originalText;
      }
    }

    requestAnimationFrame(frame);
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  metricElements.forEach(el => observer.observe(el));
}

// C. 3D Perspective Tilt & Dynamic Cursor Spotlight Glare (RAF Optimized)
function init3DCardTilt() {
  const cards = document.querySelectorAll('.tilt-card-container');
  if (!cards.length) return;

  function isTouchDevice() {
    return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024;
  }

  // Reset transforms when resized to tablet/mobile
  window.addEventListener('resize', () => {
    if (isTouchDevice()) {
      cards.forEach(card => {
        const inner = card.querySelector('.card-inner');
        if (inner) inner.style.transform = 'none';
      });
    }
  });

  cards.forEach(card => {
    const inner = card.querySelector('.card-inner');
    const spotlight = card.querySelector('.card-spotlight');
    let cardRect = null;
    let rafId = null;

    card.addEventListener('mouseenter', () => {
      cardRect = card.getBoundingClientRect();
    });

    card.addEventListener('mousemove', (e) => {
      if (isTouchDevice()) return;
      if (!cardRect) cardRect = card.getBoundingClientRect();

      const mouseX = e.clientX - cardRect.left;
      const mouseY = e.clientY - cardRect.top;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (spotlight) {
          spotlight.style.setProperty('--mouse-x', `${mouseX}px`);
          spotlight.style.setProperty('--mouse-y', `${mouseY}px`);
        }

        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;
        const rotateX = -((mouseY - centerY) / centerY) * 4;
        const rotateY = ((mouseX - centerX) / centerX) * 4;

        if (inner) {
          inner.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(1)}deg) rotateY(${rotateY.toFixed(1)}deg)`;
        }
      });
    });

    card.addEventListener('mouseleave', () => {
      cardRect = null;
      if (rafId) cancelAnimationFrame(rafId);
      if (inner) {
        inner.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        setTimeout(() => {
          inner.style.transition = '';
        }, 400);
      }
    });
  });
}

// D. Magnetic Hover Interaction on CTA Buttons (RAF Optimized)
function initMagneticElements() {
  const magneticBtns = document.querySelectorAll('.magnetic-btn, .jitter-split-btn');
  if (!magneticBtns.length) return;

  function isTouchDevice() {
    return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024;
  }

  window.addEventListener('resize', () => {
    if (isTouchDevice()) {
      magneticBtns.forEach(btn => {
        btn.style.transform = 'none';
      });
    }
  });

  magneticBtns.forEach(btn => {
    let btnRect = null;
    let rafId = null;

    btn.addEventListener('mouseenter', () => {
      btnRect = btn.getBoundingClientRect();
    });

    btn.addEventListener('mousemove', (e) => {
      if (isTouchDevice()) return;
      if (!btnRect) btnRect = btn.getBoundingClientRect();

      const x = e.clientX - btnRect.left - btnRect.width / 2;
      const y = e.clientY - btnRect.top - btnRect.height / 2;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        btn.style.transform = `translate3d(${Math.round(x * 0.18)}px, ${Math.round(y * 0.18)}px, 0)`;
      });
    });

    btn.addEventListener('mouseleave', () => {
      btnRect = null;
      if (rafId) cancelAnimationFrame(rafId);
      btn.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      btn.style.transform = 'translate3d(0, 0, 0)';
      setTimeout(() => {
        btn.style.transition = '';
      }, 350);
    });
  });
}

// E. In-View Viewport Reveals for Process & Pricing Cards
function initScrollReveals() {
  const items = document.querySelectorAll('.reveal-item');
  if (!items.length) return;

  try {
    inView('.reveal-item', (element) => {
      if (element && element.classList) {
        element.classList.add('is-revealed');
      }
    }, { amount: 0.1 });
  } catch (err) {
    console.warn('Motion inView fallback triggered:', err);
    items.forEach(el => el.classList.add('is-revealed'));
  }

  // Safety fallback: reveal all items after 1.2s so content is never stuck invisible
  setTimeout(() => {
    items.forEach(el => el.classList.add('is-revealed'));
  }, 1200);
}

// F. Hardware-Accelerated Scroll Progress, Dynamic Island Navbar & Back-to-Top
function initScrollExtras() {
  const progressBar = document.getElementById('reading-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top');
  const navbarPill = document.getElementById('navbar-pill');

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Dynamic Island iOS Pill shadow on scroll (Zero layout shifts)
        if (navbarPill) {
          if (scrollY > 25) {
            navbarPill.classList.add('shadow-xl');
          } else {
            navbarPill.classList.remove('shadow-xl');
          }
        }

        if (progressBar && docHeight > 0) {
          const pct = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
          progressBar.style.width = pct + '%';
        }

        if (backToTopBtn) {
          if (scrollY > 400) {
            backToTopBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
            backToTopBtn.classList.add('opacity-100', 'translate-y-0');
          } else {
            backToTopBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
            backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// 11. Toast notification helper
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const bgClass = type === 'success' 
    ? 'bg-secondary text-on-secondary' 
    : type === 'error' 
      ? 'bg-error text-on-error' 
      : 'bg-primary text-on-primary';

  toast.className = `${bgClass} px-5 py-3 rounded-xl shadow-2xl font-label-md text-sm flex items-center gap-3 transition-all duration-300 opacity-0 translate-y-2 pointer-events-auto border border-surface/20`;
  
  const icon = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';
  toast.innerHTML = `
    <span class="material-symbols-outlined text-lg">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('opacity-0', 'translate-y-2');
    toast.classList.add('opacity-100', 'translate-y-0');
  });

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
