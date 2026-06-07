/* =========================================================
   Learning254 Portfolio — main.js
   ========================================================= */

'use strict';

/* ── NAV: Sticky style on scroll ──────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── MOBILE MENU: Hamburger toggle ───────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});

/* ── PORTFOLIO FILTER ─────────────────────────────────── */
const filterTags  = document.querySelectorAll('.filter-tag');
const workItems   = document.querySelectorAll('.work-item');

filterTags.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active state
    filterTags.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    workItems.forEach(item => {
      const cat = item.dataset.cat;
      if (filter === 'all' || cat === filter) {
        item.classList.remove('hidden');
        // Re-trigger reveal if needed
        item.classList.remove('visible');
        requestAnimationFrame(() => item.classList.add('visible'));
      } else {
        item.classList.add('hidden');
      }
    });

    // Re-apply masonry column spans after filter
    updateGridSpans();
  });
});

function updateGridSpans() {
  const visible = [...workItems].filter(i => !i.classList.contains('hidden'));
  const spans = [7, 5, 5, 7, 6, 6];
  visible.forEach((item, idx) => {
    item.style.gridColumn = `span ${spans[idx] || 6}`;
  });
}

/* ── SCROLL REVEAL ────────────────────────────────────── */
const revealEls = document.querySelectorAll(
  '.work-item, .service-card, .stat-card, .intro-strip > div, .about-text, .contact-info, .contact-form, .pub-item, .cred-item'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ── CONTACT FORM: Basic client-side handling ─────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const name = contactForm.querySelector('#name').value.trim();

    if (!name) {
      alert('Please enter your name.');
      return;
    }

    // Replace this with your actual form submission (e.g. Formspree, EmailJS, PHP)
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#059669';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3500);
  });
}

/* ── SMOOTH ACTIVE NAV LINK on scroll ─────────────────── */
const sections = document.querySelectorAll('section[id], .hero[id]');
const navLinksAll = document.querySelectorAll('.nav-links a, .mobile-menu a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinksAll.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active-nav');
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

/* ── HERO: Subtle parallax on scroll ─────────────────── */
const heroBg = document.querySelector('.hero-bg');
const heroGridOverlay = document.querySelector('.hero-grid-overlay');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.25}px)`;
    if (heroGridOverlay) heroGridOverlay.style.transform = `translateY(${y * 0.15}px)`;
  }, { passive: true });
}
