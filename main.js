(function () {
  'use strict';

  // 1. Mobile Toggle
  const navToggle = document.getElementById('navToggle');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const body = document.body;

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isActive = mobileOverlay.classList.toggle('active');
      navToggle.classList.toggle('active');
      body.style.overflow = isActive ? 'hidden' : '';
      
      // Animate hamburger to X
      const spans = navToggle.querySelectorAll('span');
      if (isActive) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.transform = 'none';
      }
    });
  }

  // 2. Smooth Scroll & Close Menu
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Close mobile menu if open
      mobileOverlay.classList.remove('active');
      navToggle.classList.remove('active');
      body.style.overflow = '';
      const spans = navToggle.querySelectorAll('span');
      spans.forEach(s => s.style.transform = 'none');

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 64, // offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });

  // 3. Intersection Observer (Reveal Animations)
  const revealElements = document.querySelectorAll('.reveal-up');
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 4. Header Scroll Effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const header = document.getElementById('header');

    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.03)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });

})();