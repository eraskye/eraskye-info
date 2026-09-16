/* ERASKYE INFO — script.js */

const PROJECTS = [
  {
    title: 'ERASKYE',
    category: 'ЛИЧНЫЙ ПРОЕКТ',
    description: 'Личный цифровой проект — бренд-идентичность и сайт.',
    image: 'assets/projects/eraskye.jpg',
    url: null,
    technologies: ['HTML', 'CSS', 'JavaScript'],
    status: 'ЗАВЕРШЁН'
  },
  {
    title: 'OSINX SHOP',
    category: 'ИНТЕРНЕТ-МАГАЗИН',
    description: 'Проект электронной коммерции / цифрового магазина.',
    image: 'assets/projects/osinx.jpg',
    url: 'https://osinxshop.tilda.ws',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    status: 'ЗАВЕРШЁН'
  },
  {
    title: 'ERASKYE INFO',
    category: 'ПОРТФОЛИО',
    description: 'Личное портфолио и цифровая идентичность.',
    image: 'assets/projects/eraskye-info.jpg',
    url: 'https://eraskye.github.io/eraskye-info/',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    status: 'ЗАВЕРШЁН'
  },
  {
    title: 'ERASKYE POST',
    category: 'СОЦИАЛЬНАЯ ПЛАТФОРМА',
    description: 'Проект цифрового контента и постинга.',
    image: 'assets/projects/eraskye-post.jpg',
    url: null,
    technologies: ['HTML', 'CSS', 'JavaScript'],
    status: 'В РАЗРАБОТКЕ'
  },
  {
    title: 'CLOVISS PYDXSN',
    category: 'ЦИФРОВОЙ ПРОЕКТ',
    description: 'Личный цифровой проект CLOVISS.',
    image: 'assets/projects/cloviss-pydxsn.jpg',
    url: null,
    technologies: ['HTML', 'CSS', 'JavaScript'],
    status: 'В РАЗРАБОТКЕ'
  },
  {
    title: 'CLOVISS DOXS',
    category: 'ЦИФРОВОЙ ПРОЕКТ',
    description: 'Цифровой проект CLOVISS.',
    image: 'assets/projects/cloviss-doxs.jpg',
    url: null,
    technologies: ['HTML', 'CSS', 'JavaScript'],
    status: 'В РАЗРАБОТКЕ'
  },
  {
    title: 'CLOVISS KEY',
    category: 'ИНСТРУМЕНТ',
    description: 'Личный цифровой инструмент CLOVISS.',
    image: 'assets/projects/cloviss-key.jpg',
    url: null,
    technologies: ['HTML', 'CSS', 'JavaScript'],
    status: 'В РАЗРАБОТКЕ'
  }
];

const INITIAL_VISIBLE = 6;

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function renderProjects() {
  const grid = $('#projectsGrid');
  const moreWrap = $('#showMoreWrap');
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p, i) => {
    const index = String(i + 1).padStart(2, '0');
    const hasUrl = typeof p.url === 'string' && p.url.trim().length > 0;
    const isExtra = i >= INITIAL_VISIBLE;
    const status = (p.status || 'СКОРО').toUpperCase();
    const tech = Array.isArray(p.technologies) ? p.technologies : [];

    const actionInner = hasUrl
      ? `<span>СМОТРЕТЬ ПРОЕКТ</span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>`
      : `<span>СКОРО</span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`;

    const actionEl = hasUrl
      ? `<a class="project-action" href="${p.url}" target="_blank" rel="noopener noreferrer">${actionInner}</a>`
      : `<span class="project-action disabled" aria-disabled="true">${actionInner}</span>`;

    const fallbackText = (p.title || 'ПР').split(' ')[0].slice(0, 2).toUpperCase();
    const techHtml = tech.length ? `<div class="project-tech">${tech.map(t => `<span>${t}</span>`).join('')}</div>` : '';
    const statusHtml = status ? `<div class="project-status" data-status="${status}"><i></i><span>${status}</span></div>` : '';

    return `
      <article class="project-card${isExtra ? ' project-extra' : ''}" style="--d:${(i % INITIAL_VISIBLE) * 0.08}s">
        <div class="project-media">
          <div class="project-media-fallback">${fallbackText}</div>
          <img src="${p.image}" alt="${p.title}" loading="lazy" decoding="async" onerror="this.style.display='none'" />
          <span class="project-category">${p.category}</span>
          <span class="project-index">${index}</span>
        </div>
        <div class="project-body">
          ${statusHtml}
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          ${techHtml}
          ${actionEl}
        </div>
      </article>
    `;
  }).join('');

  if (PROJECTS.length > INITIAL_VISIBLE && moreWrap) {
    moreWrap.hidden = false;
    moreWrap.innerHTML = `
      <button type="button" class="show-more-btn" id="showMoreBtn" aria-expanded="false">
        <span>ПОКАЗАТЬ ЕЩЁ</span>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
      </button>
    `;
    const btn = $('#showMoreBtn');
    btn.addEventListener('click', () => {
      const next = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(next));
      btn.classList.toggle('active', next);
      btn.querySelector('span').textContent = next ? 'СВЕРНУТЬ' : 'ПОКАЗАТЬ ЕЩЁ';
      $$('.project-extra', grid).forEach(card => card.classList.toggle('show', next));
      if (!next) {
        const top = grid.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  } else if (moreWrap) {
    moreWrap.hidden = true;
    moreWrap.innerHTML = '';
  }
}

function initNav() {
  const nav = $('#nav');
  const toggle = $('#navToggle');
  const menu = $('#mobileMenu');
  if (!nav || !toggle || !menu) return;

  const onScroll = () => {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
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

function initSmoothScroll() {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

function initCanvas() {
  const canvas = $('#bg-canvas');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let w = 0, h = 0, dpr = 1, particles = [], raf = null, running = true;

  const makeParticle = () => ({
    x: Math.random() * w, y: Math.random() * h,
    r: Math.random() * 1.4 + 0.3,
    vx: (Math.random() - 0.5) * 0.16, vy: (Math.random() - 0.5) * 0.16,
    a: Math.random() * 0.4 + 0.15
  });

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.max(24, Math.min(70, Math.floor((w * h) / 24000)));
    particles = new Array(n).fill(0).map(() => makeParticle());
  };

  const draw = () => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 40, 70, ${p.a})`; ctx.fill();
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < 13000) {
          const alpha = (1 - d2 / 13000) * 0.07;
          ctx.strokeStyle = `rgba(255, 40, 70, ${alpha})`;
          ctx.lineWidth = 0.6;
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

function initCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const cursor = $('.cursor'), dot = $('.cursor-dot');
  if (!cursor || !dot) return;
  let mx = innerWidth / 2, my = innerHeight / 2;
  let cx = mx, cy = my, dx = mx, dy = my, active = false;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (!active) { active = true; document.body.classList.add('cursor-active'); }
  }, { passive: true });
  document.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-active'); active = false;
  });
  const loop = () => {
    cx += (mx - cx) * 0.16; cy += (my - cy) * 0.16;
    dx += (mx - dx) * 0.6; dy += (my - dy) * 0.6;
    cursor.style.transform = `translate3d(${cx - 18}px, ${cy - 18}px, 0)`;
    dot.style.transform = `translate3d(${dx - 2.5}px, ${dy - 2.5}px, 0)`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
  const hov = 'a, button, .skill-card, .project-card, .contact-btn, .nav-toggle, .show-more-btn';
  document.addEventListener('mouseover', (e) => { if (e.target.closest(hov)) document.body.classList.add('cursor-hover'); });
  document.addEventListener('mouseout', (e) => { if (e.target.closest(hov)) document.body.classList.remove('cursor-hover'); });
}

function initSkillGlow() {
  $$('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initNav();
  initSmoothScroll();
  initCanvas();
  initCursor();
  initSkillGlow();
  document.body.classList.add('loaded');
});
