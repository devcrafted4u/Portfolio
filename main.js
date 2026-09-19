// Atelier Studio - Main Interactive Application Logic

document.addEventListener('DOMContentLoaded', () => {
  initRouting();
  initWorkFilters();
  initInquiryForm();
  initMobileMenu();
  initLiveClock();
  fixInternalLinks();
});

// 1. Client-Side Hash Router
function initRouting() {
  const views = {
    'home': document.getElementById('view-home'),
    'case-study': document.getElementById('view-case-study'),
    'inquiry': document.getElementById('view-inquiry')
  };

  const navLinks = document.querySelectorAll('#desktop-nav .nav-link');

  function renderRoute() {
    const rawHash = window.location.hash.toLowerCase() || '';
    
    // Deactivate all views
    Object.values(views).forEach(v => {
      if (v) v.classList.remove('active');
    });

    // Reset desktop nav active states
    navLinks.forEach(link => {
      link.classList.remove('text-on-surface', 'bg-surface-container-high');
      link.classList.add('text-on-surface-variant');
    });

    if (rawHash.startsWith('#/case-study')) {
      if (views['case-study']) views['case-study'].classList.add('active');
      const activeLink = document.querySelector('#desktop-nav [data-nav="case-studies"]');
      if (activeLink) {
        activeLink.classList.add('text-on-surface', 'bg-surface-container-high');
        activeLink.classList.remove('text-on-surface-variant');
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (rawHash.startsWith('#/inquiry') || rawHash.startsWith('#/contact') || rawHash.startsWith('#/book')) {
      if (views['inquiry']) views['inquiry'].classList.add('active');
      const activeLink = document.querySelector('#desktop-nav [data-nav="inquiry"]');
      if (activeLink) {
        activeLink.classList.add('text-on-surface', 'bg-surface-container-high');
        activeLink.classList.remove('text-on-surface-variant');
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      // Home / Showcase view
      if (views['home']) views['home'].classList.add('active');
      const activeLink = document.querySelector('#desktop-nav [data-nav="selected-work"]');
      if (activeLink) {
        activeLink.classList.add('text-on-surface', 'bg-surface-container-high');
        activeLink.classList.remove('text-on-surface-variant');
      }

      if (rawHash === '#selected-work' || rawHash === '#/selected-work-section') {
        setTimeout(() => {
          const el = document.getElementById('selected-work');
          if (el) {
            const yOffset = -90;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 50);
      } else if (rawHash === '#/services-and-pricing' || rawHash === '#/pricing') {
        setTimeout(() => {
          const el = document.getElementById('selected-work');
          if (el) {
            const yOffset = -90;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  }

  window.addEventListener('hashchange', renderRoute);
  renderRoute();
}

// 2. Interactive Work Filters
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

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 3. Interactive Project Inquiry Form
function initInquiryForm() {
  const inquiryView = document.getElementById('view-inquiry');
  if (!inquiryView) return;

  // Toggle pills
  inquiryView.querySelectorAll('button').forEach(btn => {
    const text = btn.innerText.trim();
    if (text.includes('Website') || text.includes('E-Commerce') || text.includes('Webflow') || text.includes('Rebrand')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        btn.classList.toggle('!bg-primary');
        btn.classList.toggle('!text-on-primary');
      });
    } else if (text.includes('$4k') || text.includes('$8k') || text.includes('$15k') || text.includes('$25k')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = btn.parentElement;
        parent.querySelectorAll('button').forEach(s => {
          s.classList.remove('!bg-primary', '!text-on-primary', 'bg-primary', 'text-on-primary');
        });
        btn.classList.add('!bg-primary', '!text-on-primary');
      });
    } else if (text.includes('weeks') || text.includes('Next month') || text.includes('months') || text.includes('Flexible')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = btn.parentElement;
        parent.querySelectorAll('button').forEach(s => {
          s.classList.remove('!bg-primary', '!text-on-primary', 'bg-primary', 'text-on-primary');
        });
        btn.classList.add('!bg-primary', '!text-on-primary');
      });
    }
  });

  // Submit button
  const submitBtn = inquiryView.querySelector('button[type="submit"]') ||
                    Array.from(inquiryView.querySelectorAll('button')).find(b => b.innerText.toLowerCase().includes('submit') || b.innerText.toLowerCase().includes('discovery'));

  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const inputs = inquiryView.querySelectorAll('input, textarea');
      let nameVal = '';
      let emailVal = '';

      inputs.forEach(inp => {
        const placeholder = (inp.placeholder || '').toLowerCase();
        const type = (inp.type || '').toLowerCase();
        if (type === 'email' || placeholder.includes('email')) {
          emailVal = inp.value.trim();
        } else if (placeholder.includes('name') || inp.name.includes('name')) {
          nameVal = inp.value.trim();
        }
      });

      if (!emailVal || !emailVal.includes('@')) {
        showToast('Please enter a valid work email address.', 'error');
        return;
      }

      showToast(`Thank you ${nameVal ? nameVal : ''}! Your inquiry has been sent to Atelier Studio. We'll reply within 24 hours.`, 'success');
      inputs.forEach(inp => inp.value = '');
    });
  }
}

// 4. Mobile Navigation Menu Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-menu-drawer');
  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    drawer.classList.toggle('hidden');
    const icon = menuBtn.querySelector('.material-symbols-outlined');
    if (icon) {
      icon.textContent = drawer.classList.contains('hidden') ? 'menu' : 'close';
    }
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.add('hidden');
      const icon = menuBtn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = 'menu';
    });
  });
}

// 5. Connect all links throughout document
function fixInternalLinks() {
  document.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    const dataPath = a.getAttribute('data-path');

    if (dataPath === 'case-studies' || (href && href.includes('case-studies'))) {
      a.setAttribute('href', '#/case-study/aura-ceramica');
    } else if (dataPath === 'contact' || dataPath === 'inquiry' || (href && (href.includes('inquiry') || href.includes('contact')))) {
      a.setAttribute('href', '#/inquiry');
    } else if (dataPath === 'selected-work') {
      a.setAttribute('href', '#/');
    } else if (href === '#selected-work') {
      a.setAttribute('href', '#selected-work');
    } else if (dataPath === 'services-and-pricing') {
      a.setAttribute('href', '#/inquiry');
    } else if (dataPath === 'process') {
      a.setAttribute('href', '#selected-work');
    }
  });
}

// 6. Live London BST Clock in Footer
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

// Toast notification helper
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const bgClass = type === 'success' 
    ? 'bg-secondary text-on-secondary' 
    : type === 'error' 
      ? 'bg-error text-on-error' 
      : 'bg-primary text-on-primary';

  toast.className = `${bgClass} px-5 py-3 rounded-xl shadow-lg font-label-md text-sm flex items-center gap-3 transition-all duration-300 opacity-0 translate-y-2 pointer-events-auto border border-surface/20`;
  
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
