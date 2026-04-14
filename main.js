/* main.js — Care Homoeo Clinic (Luxury Edition) */
(function () {
  'use strict';

  /* ── MOBILE NAV TOGGLE ─────────────────────────────── */
  const toggle  = document.getElementById('navToggle');
  const navMenu = document.getElementById('navLinks');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      }
    });
  }

  /* ── STICKY HEADER ───────────────────────────────────── */
  const header = document.querySelector('.site-header');
  if (header) {
    const updateHeader = () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  /* ── ACTIVE NAV HIGHLIGHTING ─────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links li a[href^="#"]');

  function setActiveLink(id) {
    navLinks.forEach(a => {
      a.classList.toggle('active-link', a.getAttribute('href') === '#' + id);
    });
  }

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: '-60px 0px -60% 0px', threshold: 0 }
    );
    sections.forEach(sec => observer.observe(sec));
  }

  /* ── SCROLL REVEAL ───────────────────────────────────── */
  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!revealEls.length) return;

    const io = new IntersectionObserver(
      entries => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach(el => io.observe(el));
  }

  initReveal();

  /* ── SMOOTH ANCHOR OFFSET ────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const headerH = document.querySelector('.site-header')?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── SUBTLE CURSOR ENRICHMENT (desktop only) ─────────── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const interactables = document.querySelectorAll('a, button, .service-card, .why-item');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.style.cursor = 'pointer');
      el.addEventListener('mouseleave', () => document.body.style.cursor = '');
    });
  }

})();
