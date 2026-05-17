/* ══════════════════════════════════════════════
   SAIMA BHUJEL — PORTFOLIO  |  script.js
   ══════════════════════════════════════════════ */

// ─── NAVBAR: scroll behaviour + active highlight ───
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Sticky shadow
  navbar.classList.toggle('scrolled', window.scrollY > 30);

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

// ─── BURGER MENU ───
const burger   = document.getElementById('burger');
const navList  = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  navList.classList.toggle('open');
  // Animate burger → X
  burger.querySelectorAll('span').forEach((s, i) => {
    if (navList.classList.contains('open')) {
      if (i === 0) { s.style.transform = 'rotate(45deg) translate(5px,5px)'; }
      if (i === 1) { s.style.opacity = '0'; s.style.transform = 'scaleX(0)'; }
      if (i === 2) { s.style.transform = 'rotate(-45deg) translate(5px,-5px)'; }
    } else {
      s.style.transform = ''; s.style.opacity = '';
    }
  });
});

// Close menu when a link is clicked
navList.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navList.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ─── REVEAL ON SCROLL ───
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      // Stagger siblings inside the same parent container
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((sib, i) => {
        if (sib === entry.target) delay = i * 80;
      });
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

reveals.forEach(el => revealObserver.observe(el));

// ─── SMOOTH SCROLL for anchor links ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── SKILL CARD tilt micro-interaction ───
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-6px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ─── PROJECT CARD tilt ───
document.querySelectorAll('.project-card:not(.project-placeholder)').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-8px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ─── FOOTER year (auto-update) ───
const yearEl = document.querySelector('.footer-copy');
if (yearEl) {
  const yr = new Date().getFullYear();
  yearEl.textContent = `© ${yr} Saima Bhujel. All Rights Reserved.`;
}

// ─── TYPING EFFECT for hero subtitle ───
(function () {
  const subtitleEl = document.querySelector('.hero-subtitle');
  if (!subtitleEl) return;

  const phrases = [
    'B.A English Honours Student',
    'Intern Web Designer Using AI',
    'Creative Writer',
  ];

  let pIdx = 0, cIdx = 0, deleting = false;
  const baseText = subtitleEl.textContent;

  // Only activate if user hasn't set reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  subtitleEl.textContent = '';

  function type() {
    const phrase = phrases[pIdx];
    if (!deleting) {
      subtitleEl.textContent = phrase.slice(0, cIdx + 1);
      cIdx++;
      if (cIdx === phrase.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      subtitleEl.textContent = phrase.slice(0, cIdx - 1);
      cIdx--;
      if (cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 50 : 80);
  }

  // Start after a short delay to let the hero reveal
  setTimeout(type, 1200);
})();

console.log('%c🌸 Saima Bhujel Portfolio — Built with creativity & AI ✨', 
  'color:#FFE97D; background:#0f0e11; font-size:14px; padding:8px 12px; border-radius:6px;');
      
