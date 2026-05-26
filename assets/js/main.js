/* Sodiq Yusuff MMA - Main JS */

(() => {
  'use strict';

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
      navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', (e) => {
        // Don't auto-close hamburger when tapping the Programs dropdown trigger — let it expand the submenu
        if (a.classList.contains('nav-dropdown-trigger')) return;
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

    const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = (a.getAttribute('href') || '').toLowerCase();
      if (href === page) a.classList.add('active');
    });

    document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

    // Dropdown — mobile tap toggles, desktop hover handled in CSS
    document.querySelectorAll('.nav-dropdown').forEach(dd => {
      if (dd.dataset.init) return;
      dd.dataset.init = '1';
      const trigger = dd.querySelector('.nav-dropdown-trigger');
      if (!trigger) return;
      trigger.addEventListener('click', (e) => {
        if (window.matchMedia('(max-width: 900px)').matches) {
          e.preventDefault();
          dd.classList.toggle('open');
        }
      });
      document.addEventListener('click', (e) => {
        if (!dd.contains(e.target)) dd.classList.remove('open');
      });
    });
  };

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

  const setupForms = () => {
    document.querySelectorAll('form[data-form]:not([data-form-init])').forEach(form => {
      form.setAttribute('data-form-init', '1');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Skim values out of the form. Markup varies across pages, so pick by
        // input type and label text rather than relying on strict `name` attrs.
        const labelText = (input) => {
          const f = input.closest('.field');
          if (!f) return '';
          const lbl = f.querySelector('label');
          return lbl ? lbl.textContent.toLowerCase() : '';
        };
        const data = { first_name: '', last_name: '', phone: '', email: '', program: '' };
        form.querySelectorAll('input, select').forEach(input => {
          const v = (input.value || '').trim();
          if (!v) return;
          const lbl = labelText(input);
          const nm = (input.name || '').toLowerCase();
          if (input.type === 'tel' || lbl.includes('phone') || nm.includes('phone')) data.phone = v;
          else if (input.type === 'email' || lbl.includes('email') || nm.includes('email')) data.email = v;
          else if (lbl.includes('first') || nm.includes('first')) data.first_name = v;
          else if (lbl.includes('last') || nm.includes('last')) data.last_name = v;
          else if (input.tagName === 'SELECT' || lbl.includes('program') || nm.includes('program')) data.program = v;
          else if (!data.first_name && input.type === 'text') data.first_name = v;
        });

        // Basic validation — let the user know what's missing before redirecting
        if (!data.first_name || !data.phone || !data.email) {
          alert('Please fill out your name, phone, and email so we can reserve your spot.');
          return;
        }

        // Cache lead locally so we never lose it even if the redirect fails
        try {
          const existing = JSON.parse(localStorage.getItem('sy_leads') || '[]');
          existing.push({ ...data, captured_at: new Date().toISOString(), source: 'on-page-trial-form', page: location.pathname });
          localStorage.setItem('sy_leads', JSON.stringify(existing));
        } catch (e) {}

        // Visual feedback before redirect
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
          btn.textContent = 'Reserving your spot...';
          btn.style.background = 'var(--nigeria-green-bright)';
          btn.disabled = true;
        }

        // Redirect to thank-you.html where the GHL booking widget lives
        // (i8u9HxxLZCtRtth3QFN7). Same destination as the exit-intent popup
        // so every entry point funnels to the same calendar.
        const params = new URLSearchParams({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          program: data.program
        });
        setTimeout(() => {
          window.location.href = 'thank-you.html?' + params.toString();
        }, 400);
      });
    });
  };

  const setupParallax = () => {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg && window.matchMedia('(min-width: 900px)').matches && !heroBg.dataset.parallax) {
      heroBg.dataset.parallax = '1';
      window.addEventListener('scroll', () => {
        const y = window.scrollY * 0.3;
        heroBg.style.transform = 'translateY(' + y + 'px)';
      }, { passive: true });
    }
  };

  // EXIT-INTENT POPUP
  const setupExitPopup = () => {
    const popup = document.getElementById('exitPopup');
    if (!popup || popup.dataset.init) return;
    popup.dataset.init = '1';

    const COOLDOWN_KEY = 'sy_exit_popup_seen_at';
    const COOLDOWN_MS = 24 * 60 * 60 * 1000;
    const FALLBACK_MS = 55 * 1000;
    const MOBILE_DELAY_MS = 25 * 1000;
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
      document.remo