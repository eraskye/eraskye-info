/* ERASKYE INFO */

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

/* NAV */
function initNav() {
  const nav = $('#nav'), toggle = $('#navToggle'), menu = $('#mobileMenu');
  if (!nav || !toggle || !menu) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const closeMenu = () => {
    menu.hidden = true;
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menu.hidden) {
      menu.hidden = false;
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
    } else closeMenu();
  });
  $$('a', menu).forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('click', (e) => {
    if (!menu.hidden && !menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
}

/* SMOOTH SCROLL */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      const top = t.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* REVEAL */
function initReveal() {
  // Включаем анимацию только после загрузки JS — до этого всё видно
  document.body.classList.add('js-ready');

  const els = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  els.forEach(el => io.observe(el));

  // Страховка: если через 4 сек что-то не показалось — показать всё
  setTimeout(() => {
    $$('.reveal').forEach(el => el.classList.add('visible'));
  }, 4000);
}

/* SHOW MORE */
function initShowMore() {
  const btn = $('#showMoreBtn');
  const extras = $$('.project-extra');
  if (!btn || !extras.length) return;

  // Скрываем extras только через JS (без JS они видны)
  extras.forEach(c => c.classList.add('hidden-by-js'));

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const next = !expanded;
    btn.setAttribute('aria-expanded', String(next));
    btn.classList.toggle('active', next);
    btn.querySelector('span').textContent = next ? 'СВЕРНУТЬ' : 'ПОКАЗАТЬ ЕЩЁ';
    extras.forEach(c => {
      c.classList.toggle('hidden-by-js', !next);
      if (next) c.classList.add('visible');
    });
    if (!next) {
      const top = $('#projects').getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
}

/* CANVAS */
function initCanvas() {
  const canvas = $('#bg-canvas');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  let w, h, dpr, particles = [], raf = null, running = true;
  const makeP = () => ({
    x: Math.random() * w, y: Math.random() * h,
    r: Math.random() * 1.4 + 0.3,
    vx: (Math.random() - .5) * .16, vy: (Math.random() - .5) * .16,
    a: Math.random() * .4 + .15
  });
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.max(24, Math.min(60, Math.floor((w * h) / 26000)));
    particles = new Array(n).fill(0).map(makeP);
  };
  const draw = () => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,40,70,${p.a})`; ctx.fill();
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < 13000) {
          ctx.strokeStyle = `rgba(255,40,70,${(1 - d2 / 13000) * .07})`;
          ctx.lineWidth = .6;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  };
  resize(); raf = requestAnimationFrame(draw);
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { running = false; if (raf) cancelAnimationFrame(raf); }
    else { running = true; raf = requestAnimationFrame(draw); }
  });
}

/* CURSOR */
function initCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const c = $('.cursor'), d = $('.cursor-dot');
  if (!c || !d) return;
  let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, dx = mx, dy = my, active = false;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (!active) { active = true; document.body.classList.add('cursor-active'); }
  }, { passive: true });
  document.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-active'); active = false;
  });
  const loop = () => {
    cx += (mx - cx) * .16; cy += (my - cy) * .16;
    dx += (mx - dx) * .6; dy += (my - dy) * .6;
    c.style.transform = `translate3d(${cx - 18}px,${cy - 18}px,0)`;
    d.style.transform = `translate3d(${dx - 2.5}px,${dy - 2.5}px,0)`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
  const hov = 'a,button,.skill-card,.project-card,.contact-btn,.nav-toggle,.show-more-btn';
  document.addEventListener('mouseover', e => { if (e.target.closest(hov)) document.body.classList.add('cursor-hover'); });
  document.addEventListener('mouseout', e => { if (e.target.closest(hov)) document.body.classList.remove('cursor-hover'); });
}

/* SKILL GLOW */
function initSkillGlow() {
  $$('.skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initSmoothScroll();
  initShowMore();
  initCanvas();
  initCursor();
  initSkillGlow();
  initReveal();
});
