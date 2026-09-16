/* ==========================================================
   ERASKYE INFO — Premium Edition
   Проекты: полное портфолио + ПОКАЗАТЬ ЕЩЁ
   ========================================================== */

/* --------------------------------------------------
   НАСТРОЙКИ ПРОЕКТОВ
   --------------------------------------------------
   Меняй только здесь.
   - title        : название
   - category     : метка категории
   - description  : короткое описание
   - image        : путь к картинке (напр. 'assets/projects/eraskye.jpg')
                    если файла нет — покажется красивый fallback
   - url          : ссылка или null / '' (тогда кнопка = СКОРО)
   - technologies : массив стеков (напр. ['HTML', 'CSS', 'JavaScript'])
   - status       : 'ЗАВЕРШЁН' | 'В РАЗРАБОТКЕ' | 'СКОРО'
-------------------------------------------------- */
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
    url: null,
    technologies: ['HTML', 'CSS', 'JavaScript'],
    status: 'ЗАВЕРШЁН'
  },
  {
    title: 'ERASKYE INFO',
    category: 'ПОРТФОЛИО',
    description: 'Личное портфолио и цифровая идентичность.',
    image: 'assets/projects/eraskye-info.jpg',
    url: null,
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

/* Сколько карточек показывать до кнопки ПОКАЗАТЬ ЕЩЁ */
const INITIAL_VISIBLE = 6;

/* --------------------------------------------------
   ХЕЛПЕРЫ
-------------------------------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* --------------------------------------------------
   РЕНДЕР ПРОЕКТОВ
-------------------------------------------------- */
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
      ? `<span>СМОТРЕТЬ ПРОЕКТ</span>
         <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>`
      : `<span>СКОРО</span>
         <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`;

    const actionEl = hasUrl
      ? `<a class="project-action" href="${p.url}" target="_blank" rel="noopener noreferrer">${actionInner}</a>`
      : `<span class="project-action disabled" role="button" aria-disabled="true" tabindex="-1">${actionInner}</span>`;

    const fallbackText = (p.title || 'ПР').split(' ')[0].slice(0, 2).toUpperCase();

    const techHtml = tech.length
      ? `<div class="project-tech">${tech.map(t => `<span>${t}</span>`).join('')}</div>`
      : '';

    const statusHtml = status
      ? `<div class="project-status" data-status="${status}"><i></i><span>${status}</span></div>`
      : '';

    return `
      <article class="project-card reveal${isExtra ? ' project-extra' : ''}" style="--d:${(i % INITIAL_VISIBLE) * 0.08}s">
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

  /* ---------- ПОКАЗАТЬ ЕЩЁ ---------- */
  if (PROJECTS.length > INITIAL_VISIBLE && moreWrap) {
    moreWrap.hidden = false;
    moreWrap.innerHTML = `
      <button type="button" class="show-more-btn" id="showMoreBtn" aria-expanded="false" aria-controls="projectsGrid">
        <span>ПОКАЗАТЬ ЕЩЁ</span>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
      </button>
    `;

    const btn = $('#showMoreBtn');
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const next = !expanded;

      btn.setAttribute('aria-expanded', String(next));
      btn.classList.toggle('active', next);
      btn.querySelector('span').textContent = next ? 'СВЕРНУТЬ' : 'ПОКАЗАТЬ ЕЩЁ';

      $$('.project-extra', grid).forEach(card => {
        card.classList.toggle('show', next);
        if (next) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => card.classList.add('visible'));
          });
        }
      });

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

/* --------------------------------------------------
   ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ
-------------------------------------------------- */
function initReveal() {
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
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => io.observe(el));
}

/* --------------------------------------------------
   НАВИГАЦИЯ — скролл + мобильное меню
-------------------------------------------------- */
function initNav() {
  const nav = $('#nav');
  const toggle = $('#navToggle');
  const menu = $('#mobileMenu');
  if (!nav || !toggle || !menu) return;

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (window.scrollY > 20) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const closeMenu = () => {
    menu.hidden = true;
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Открыть меню');
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menu.hidden) {
      menu.hidden = false;
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Закрыть меню');
    } else {
      closeMenu();
    }
  });

  $$('a', menu).forEach(a => a.addEventListener('click', closeMenu));

  document.addEventListener('click', (e) => {
    if (!menu.hidden && !menu.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 820 && !menu.hidden) closeMenu();
  });
}

/* --------------------------------------------------
   ПЛАВНЫЙ СКРОЛЛ
-------------------------------------------------- */
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
      if (history.replaceState) history.replaceState(null, '', id);
    });
  });
}

/* --------------------------------------------------
   ФОН CANVAS
-------------------------------------------------- */
function initCanvas() {
  const canvas = $('#bg-canvas');
  if (!canvas) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let w = 0, h = 0, dpr = 1;
  let particles = [];
  let raf = null;
  let running = true;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const targetCount = Math.max(24, Math.min(70, Math.floor((w * h) / 24000)));
    if (particles.length !== targetCount) {
      particles = new Array(targetCount).fill(0).map(() => makeParticle());
    }
  };

  const makeParticle = () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.4 + 0.3,
    vx: (Math.random() - 0.5) * 0.16,
    vy: (Math.random() - 0.5) * 0.16,
    a: Math.random() * 0.4 + 0.15
  });

  const draw = () => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 40, 70, ${p.a})`;
      ctx.fill();
    }

    const maxD2 = 13000;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < maxD2) {
          const alpha = (1 - d2 / maxD2) * 0.07;
          ctx.strokeStyle = `rgba(255, 40, 70, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    raf = requestAnimationFrame(draw);
  };

  const start = () => {
    if (raf) return;
    running = true;
    raf = requestAnimationFrame(draw);
  };
  const stop = () => {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
  };

  resize();
  start();

  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(resize, 150);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });
}

/* --------------------------------------------------
   КАСТОМНЫЙ КУРСОР (только desktop)
-------------------------------------------------- */
function initCursor() {
  const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFine) return;

  const cursor = $('.cursor');
  const dot = $('.cursor-dot');
  if (!cursor || !dot) return;

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let cx = mx, cy = my;
  let dx = mx, dy = my;
  let active = false;

  const onMove = (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!active) {
      active = true;
      document.body.classList.add('cursor-active');
    }
  };

  const onLeave = () => {
    document.body.classList.remove('cursor-active');
    active = false;
  };

  const loop = () => {
    cx += (mx - cx) * 0.16;
    cy += (my - cy) * 0.16;
    dx += (mx - dx) * 0.6;
    dy += (my - dy) * 0.6;

    cursor.style.transform = `translate3d(${cx - cursor.offsetWidth / 2}px, ${cy - cursor.offsetHeight / 2}px, 0)`;
    dot.style.transform = `translate3d(${dx - dot.offsetWidth / 2}px, ${dy - dot.offsetHeight / 2}px, 0)`;

    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  document.addEventListener('mousemove', onMove, { passive: true });
  document.addEventListener('mouseleave', onLeave);

  const hoverables = 'a, button, .skill-card, .project-card, .contact-btn, .nav-toggle, .glass-card, .show-more-btn';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverables)) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverables)) document.body.classList.remove('cursor-hover');
  });
}

/* --------------------------------------------------
   ПОДСВЕТКА КАРТОЧЕК НАВЫКОВ ЗА МЫШЬЮ
-------------------------------------------------- */
function initSkillGlow() {
  const cards = $$('.skill-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });
}

/* --------------------------------------------------
   СТАРТ HERO
-------------------------------------------------- */
function initHero() {
  requestAnimationFrame(() => {
    document.body.classList.add('loaded');
  });
}

/* --------------------------------------------------
   ИНИЦИАЛИЗАЦИЯ
-------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initNav();
  initSmoothScroll();
  initCanvas();
  initCursor();
  initSkillGlow();
  initHero();

  requestAnimationFrame(initReveal);
});
