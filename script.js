/* ─────────────────────────────────────────────
   script.js  –  Ronit Portfolio
───────────────────────────────────────────── */

/* ── CUSTOM CURSOR ── */
const cursorDot  = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left  = mouseX + 'px';
  cursorDot.style.top   = mouseY + 'px';
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .cert-card, .project-card, .acard').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const open = navLinks.classList.contains('open');
  hamburger.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  hamburger.querySelectorAll('span')[1].style.opacity   = open ? '0' : '1';
  hamburger.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ── TYPING ANIMATION ── */
const typedEl = document.getElementById('typed-text');
const words   = ['Web Apps.', 'Cloud Solutions.', 'Automation Tools.', 'Smart UIs.', 'The Future.'];
let wIdx = 0, cIdx = 0, deleting = false;

function typeEffect() {
  const word = words[wIdx];
  if (!deleting) {
    typedEl.textContent = word.slice(0, cIdx + 1);
    cIdx++;
    if (cIdx === word.length) { deleting = true; setTimeout(typeEffect, 1800); return; }
    setTimeout(typeEffect, 80);
  } else {
    typedEl.textContent = word.slice(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; setTimeout(typeEffect, 400); return; }
    setTimeout(typeEffect, 45);
  }
}
typeEffect();

/* ── SIMPLE AOS (Animate On Scroll) ── */
const aosEls = document.querySelectorAll('[data-aos]');

function checkAOS() {
  const winH = window.innerHeight;
  aosEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    const delay = parseInt(el.dataset.aosDelay || 0);
    if (rect.top < winH - 60) {
      setTimeout(() => el.classList.add('aos-animate'), delay);
    }
  });
}

window.addEventListener('scroll', checkAOS, { passive: true });
window.addEventListener('resize', checkAOS);
checkAOS();

/* ── COUNTER ANIMATION ── */
const counters = document.querySelectorAll('.stat-num');
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;
  const heroSection = document.getElementById('home');
  const rect = heroSection.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    countersStarted = true;
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target);
      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        counter.textContent = current;
      }, 40);
    });
  }
}
window.addEventListener('scroll', startCounters, { passive: true });
startCounters();

/* ── SKILLS MARQUEE — duplicate items for seamless infinite loop ── */
function setupMarquees() {
  document.querySelectorAll('.marquee-inner').forEach(inner => {
    const items = Array.from(inner.children);
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      inner.appendChild(clone);
    });
  });
}
setupMarquees();

/* ── SKILL BAR ANIMATION (fills when section scrolls into view) ── */
const skillBars = document.querySelectorAll('.skill-bar-fill');
let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated) return;
  const section = document.getElementById('skills');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight - 60) {
    skillsAnimated = true;
    skillBars.forEach(bar => {
      bar.style.width = bar.dataset.pct + '%';
    });
  }
}
window.addEventListener('scroll', animateSkills, { passive: true });
animateSkills();

/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id], header[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
  });
  navLinkEls.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ── CERTIFICATE MODAL ── */
function openModal(src, title) {
  const modal     = document.getElementById('certModal');
  const img       = document.getElementById('modal-img');
  const titleEl   = document.getElementById('modal-title');
  img.src         = src;
  img.alt         = title || 'Certificate';
  if (titleEl) titleEl.textContent = title || '';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('certModal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ── SMOOTH REVEAL FOR PROFILE IMAGE ── */
document.addEventListener('DOMContentLoaded', () => {
  const heroText  = document.querySelector('.hero-text');
  const heroVis   = document.querySelector('.hero-visual');
  if (heroText) { heroText.style.opacity = '0'; heroText.style.transform = 'translateX(-40px)'; }
  if (heroVis)  { heroVis.style.opacity  = '0'; heroVis.style.transform  = 'translateX(40px)'; }
  setTimeout(() => {
    if (heroText) { heroText.style.transition = 'all .9s ease'; heroText.style.opacity = '1'; heroText.style.transform = 'none'; }
  }, 100);
  setTimeout(() => {
    if (heroVis)  { heroVis.style.transition  = 'all .9s ease'; heroVis.style.opacity  = '1'; heroVis.style.transform  = 'none'; }
  }, 300);
});
