/* Sodiq Yusuff MMA — Main JS
   Handles: nav toggle, sticky nav, scroll reveals, stat counters,
            active nav link, tabs, forms, smooth scroll, parallax. */

(() => {
  'use strict';

  // -------- NAV setup (runs after partials inject nav) --------
  const setupNav = () => {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks && !navToggle.dataset.init) {
      navToggle.dataset.init = '1';
      navToggle.addEventListener('click', () => {
        const open = navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open);
      });
      navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      }));
    }

    if (nav && !nav.dataset.init) {
      nav.dataset.init = '1';
      const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // Active nav link
    const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = (a.getAttribute('href') || '').toLowerCase();
      if (href === page) a.classList.add('active');
    });

    // Year in footer
    document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  };

  // -------- Scroll reveal --------
  const setupReveals = () => {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });
      document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
    } else {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    }
  };

  // -------- Stat counter animation --------
  const setupCounters = () => {
    const animateCount = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const duration = 1800;
      const start = performance.now();
      const ease = t => 1 - Math.pow(1 - t, 3);
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const val = target * ease(p);
        el.textContent = prefix + (decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toLocaleString()) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = prefix + (decimals > 0 ? target.toFixed(decimals) : target.toLocaleString()) + suffix;
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      const countIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { animateCount(e.target); countIO.unobserve(e.target); }
        });
      }, { threshold: 0.5 });
      document.querySelectorAll('[data-count]:not([data-counted])').forEach(el => {
        el.dataset.counted = '1';
        countIO.observe(el);
      });
    }
  };

  // -------- Tabs --------
  const setupTabs = () => {
    document.querySelectorAll('[data-tabs]:not([data-tabs-init])').forEach(group => {
      group.setAttribute('data-tabs-init', '1');
      const tabs = group.querySelectorAll('.tab');
      const panels = group.querySelectorAll('.tab-panel');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const target = tab.dataset.tab;
          tabs.forEach(t => t.classList.toggle('active', t === tab));
          panels.forEach(p => p.classList.toggle('active', p.dataset.panel === target));
        });
      });
    });
  };

  // -------- Smooth anchor scroll with offset --------
  const setupAnchors = () => {
    document.querySelectorAll('a[href^="#"]:not([data-anchor-init])').forEach(a => {
      a.setAttribute('data-anchor-init', '1');
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length < 2) return;
        const t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        const y = t.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    });
  };

  // -------- Form placeholder handler --------
  const setupForms = () => {
    document.querySelectorAll('form[data-form]:not([data-form-init])').forEach(form => {
      form.setAttribute('data-form-init', '1');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
          const orig = btn.textContent;
          btn.textContent = '✓ Form Ready — Connect GoHighLevel';
          btn.style.background = 'var(--nigeria-green-bright)';
          btn.disabled = true;
          setTimeout(() => {
            btn.textContent = orig;
            btn.style.background = '';
            btn.disabled = false;
          }, 2400);
        }
      });
    });
  };

  // -------- Parallax hero (subtle, desktop only) --------
  const setupParallax = () => {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg && window.matchMedia('(min-width: 900px)').matches && !heroBg.dataset.parallax) {
      heroBg.dataset.parallax = '1';
      window.addEventListener('scroll', () => {
        const y = window.scrollY * 0.3;
        heroBg.style.transform = `translateY(${y}px)`;
      }, { passive: true });
    }
  };



  // ============================================================
  // EXIT-INTENT POPUP
  // ============================================================
  const setupExitPopup = () => {
    const popup = document.getElementById('exitPopup');
    if (!popup) return;

    const COOLDOWN_KEY = 'sy_exit_popup_seen_at';
    const COOLDOWN_MS = 24 * 60 * 60 * 1000;
    const FALLBACK_MS = 90 * 1000;
    const MOBILE_DELAY_MS = 45 * 1000;
    const SCROLL_TRIGGER_PCT = 0.6;

    try {
      const last = parseInt(localStorage.getItem(COOLDOWN_KEY) || '0', 10);
      if (last && (Date.now() - last) < COOLDOWN_MS) return;
    } catch (e) {}

    let opened = false;
    const isMobile = window.matchMedia('(max-width: 900px)').matches || ('ontouchstart' in window);

    const open = () => {
      if (opened) return;
      opened = true;
      popup.classList.add('is-open');
      popup.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      cleanup();
      setTimeout(() => {
        const firstInput = popup.querySelector('input');
        if (firstInput) { try { firstInput.focus(); } catch(e) {} }
      }, 400);
    };

    const close = () => {
      popup.classList.remove('is-open');
      popup.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      try { localStorage.setItem(COOLDOWN_KEY, String(Date.now())); } catch(e) {}
    };

    const onMouseLeave = (e) => {
      if (e.clientY <= 0 && (e.relatedTarget === null || e.relatedTarget === undefined)) {
        open();
      }
    };

    let maxScroll = 0;
    let scrolledPastThreshold = false;
    const onScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      if (pct > SCROLL_TRIGGER_PCT) scrolledPastThreshold = true;
      if (scrolledPastThreshold && scrollTop < maxScroll - 80) {
        open();
      }
      if (scrollTop > maxScroll) maxScroll = scrollTop;
    };

    const mobileTimer = setTimeout(open, MOBILE_DELAY_MS);
    const fallbackTimer = setTimeout(open, FALLBACK_MS);

    function cleanup() {
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
      clearTimeout(mobileTimer);
      clearTimeout(fallbackTimer);
    }

    if (!isMobile) {
      document.addEventListener('mouseleave', onMouseLeave);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    popup.querySelectorAll('[data-exit-close]').forEach(el => {
      el.addEventListener('click', close);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popup.classList.contains('is-open')) close();
    });

    const form = document.getElementById('exitPopupForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        if (form.getAttribute('action')) return;
        e.preventDefault();
        const data = {
          first_name: form.first_name.value.trim(),
          phone: form.phone.value.trim(),
          email: form.email.value.trim(),
          program: form.program.value,
          captured_at: new Date().toISOString(),
          source: 'exit-intent-popup'
        };
        if (!data.first_name || !data.phone || !data.email || !data.program) {
          alert('Please fill out all fields so we can reserve your spot.');
          return;
        }
        try {
          const existing = JSON.parse(localStorage.getItem('sy_leads') || '[]');
          existing.push(data);
          localStorage.setItem('sy_leads', JSON.stringify(existing));
        } catch(e) {}
        try { localStorage.setItem(COOLDOWN_KEY, String(Date.now())); } catch(e) {}
        const params = new URLSearchParams({
          first_name: data.first_name,
          email: data.email,
          phone: data.phone,
          program: data.program
        });
        window.location.href = 'thank-you.html?' + params.toString();
      });
    }
  };

  const initAll = () => {
    setupNav();
    setupReveals();
    setupCounters();
    setupTabs();
    setupAnchors();
    setupForms();
    setupParallax();
    setupExitPopup();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
  document.addEventListener('partials:loaded', initAll);

})();
