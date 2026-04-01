/* ============================================
   GOLD DIGGERS — Interactive JavaScript
   Animations, Scroll Effects & UI Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar Scroll Effect ──
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ── Mobile Nav Toggle ──
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // ── Active Nav Link Highlighting ──
  const sections = document.querySelectorAll('section[id]');
  const navLinkElements = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinkElements.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ── Smooth Scroll for Anchor Links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 20;
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ── Scroll Reveal Animation ──
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Hero Floating Particles ──
  const particlesContainer = document.getElementById('heroParticles');
  
  if (particlesContainer) {
    const PARTICLE_COUNT = 30;
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 8}s`;
      particle.style.animationDuration = `${6 + Math.random() * 6}s`;
      particle.style.opacity = `${0.2 + Math.random() * 0.5}`;

      particlesContainer.appendChild(particle);
    }
  }

  // ── Counter Animation ──
  const statValues = document.querySelectorAll('.hero-stat-value');
  let statsAnimated = false;

  const animateCounters = () => {
    if (statsAnimated) return;
    
    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
      statsAnimated = true;

      statValues.forEach(stat => {
        const target = parseInt(stat.dataset.count) || 0;
        const prefix = stat.dataset.prefix || '';
        const suffix = stat.dataset.suffix || '%';
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current >= target) {
            current = target;
            stat.textContent = `${prefix}${target}${suffix}`;
            return;
          }
          stat.textContent = `${prefix}${Math.floor(current)}${suffix}`;
          requestAnimationFrame(updateCounter);
        };

        updateCounter();
      });
    }
  };

  window.addEventListener('scroll', animateCounters, { passive: true });
  // Also trigger on load in case hero is visible
  setTimeout(animateCounters, 500);

  // ── Parallax Effect on Hero Background ──
  const heroBg = document.querySelector('.hero-bg img');
  
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.05)`;
      }
    }, { passive: true });
  }

  // ── Feature Cards Tilt Effect ──
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── Typing Effect for Hero Badge ──
  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) {
    heroBadge.style.opacity = '0';
    heroBadge.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      heroBadge.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      heroBadge.style.opacity = '1';
      heroBadge.style.transform = 'translateY(0)';
    }, 300);
  }

  // ── Hero Content Staggered Animation ──
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const children = heroContent.children;
    Array.from(children).forEach((child, i) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        child.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        child.style.opacity = '1';
        child.style.transform = 'translateY(0)';
      }, 400 + (i * 150));
    });
  }

  // ── Magnetic Button Effect ──
  const magneticBtns = document.querySelectorAll('.btn-primary');
  
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translateY(-2px) translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ── Console Easter Egg ──
  console.log(
    '%c⛏️ Gold Diggers',
    'color: #D4A843; font-size: 24px; font-weight: bold; font-family: serif;'
  );
  console.log(
    '%cAI-Powered Mining Feasibility Platform | Team Innovax',
    'color: #9EA0A7; font-size: 12px;'
  );

});
