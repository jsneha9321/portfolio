
/* ===== CONTACT FORM SETTINGS =====
   To receive messages straight in your inbox, create a free form at
   formspree.io using sj411692@gmail.com, then paste your endpoint below.
   Leave it empty and the form opens the visitor's email app instead.
*/
const FORM_ENDPOINT = '';

/* ===== PROJECT DATA ===== */
const PROJECTS = [
  { name: "Koda", url: "koda.co.in", href: "https://koda.co.in/", cat: "koda" },
  { name: "Cloud Kinetics", url: "cloud-kinetics.com", href: "https://www.cloud-kinetics.com/", cat: "koda" },
  { name: "MeritTrac", url: "merittrac.com", href: "http://merittrac.com/", cat: "koda" },
  { name: "Greytt.ai", url: "greytt.ai", href: "https://greytt.ai/", cat: "koda" },
  { name: "OneConsent", url: "oneconsent.ai", href: "https://oneconsent.ai/", cat: "koda" },
  { name: "Entermind", url: "entermind.com", href: "https://entermind.com/", cat: "koda" },

  { name: "Carltrix", url: "carltrix.com", href: "http://carltrix.com", cat: "corporate" },
  { name: "Ellex-i", url: "ellex-i.com", href: "http://ellex-i.com", cat: "corporate" },
  { name: "Essbee Agrotek", url: "essbeeagrotek.in", href: "http://essbeeagrotek.in", cat: "corporate" },
  { name: "Ergoline", url: "ergoline.co.in", href: "http://ergoline.co.in", cat: "corporate" },
  { name: "Windscape", url: "windscape.in", href: "http://windscape.in", cat: "corporate" },
  { name: "Unique Guardz", url: "uniqueguardz.com", href: "https://uniqueguardz.com/", cat: "corporate" },

  { name: "Inbox Haircare", url: "inboxhaircare.com", href: "http://inboxhaircare.com", cat: "ecommerce" },
  { name: "Tanu Silks", url: "tanusilks.com", href: "https://tanusilks.com/", cat: "ecommerce" },

  { name: "Kale Indian Film Academy", url: "kaleindianfilmacademy.com", href: "http://kaleindianfilmacademy.com", cat: "education" },
  { name: "Medical Education World", url: "medicaleducationworld.com", href: "https://medicaleducationworld.com/", cat: "education" },
  { name: "IESC India", url: "iescindia.com", href: "https://iescindia.com/", cat: "education" },

  { name: "Shantha Ventures", url: "shanthaventures.com", href: "https://shanthaventures.com/", cat: "other" },
  { name: "Group Unnati", url: "groupunnati.com", href: "https://groupunnati.com/", cat: "other" },
  { name: "Public Documents Service", url: "publicdocumentsservice.com", href: "http://publicdocumentsservice.com", cat: "other" },
  { name: "Mahatirtha Yatras", url: "mahatirthayatras.com", href: "https://mahatirthayatras.com/", cat: "other" },

  /* ===== NEW PERSONAL PROJECT: SMART LEADS ===== */
  {
    name: "Smart Leads WordPress Plugin",
    url: "github.com/jsneha9321/smart-leads-wordpress-plugin",
    href: "https://github.com/jsneha9321/smart-leads-wordpress-plugin/",
    cat: "personal",
    description: "A custom WordPress plugin featuring lead management, admin CRUD operations, a frontend lead form, and REST API integration.",
    action: "View source code"
  }
];

/* ===== USER PREFERENCES ===== */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover:hover)').matches;

/* ===== WEBSITE SCREENSHOT HELPERS ===== */
const shotUrl = (href, w, h) =>
  `https://s0.wp.com/mshots/v1/${encodeURIComponent(href)}?w=${w}&h=${h}`;

const thumb = (p, w, h) => `
  <div class="thumb" data-i="${p.name[0]}">
    <img
      src="${shotUrl(p.href, w, h)}"
      alt=""
      loading="lazy"
      onerror="this.remove()"
    >
  </div>
`;

/* ===== HERO WALL ===== */
(function () {
  const wall = document.getElementById('wall');
  if (!wall) return;

  const half = Math.ceil(PROJECTS.length / 2);

  [PROJECTS.slice(0, half), PROJECTS.slice(half)].forEach((list, i) => {
    const cards = list.map(p => `
      <a
        class="shot"
        href="${p.href}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="${p.name}"
        tabindex="-1"
      >
        ${thumb(p, 600, 900)}
      </a>
    `).join('');

    wall.insertAdjacentHTML(
      'beforeend',
      `<div class="track${i ? ' rev' : ''}">${cards}${cards}</div>`
    );
  });
})();

/* ===== PROJECT GRID + FILTER ===== */
const grid = document.getElementById('grid');
const tabs = document.getElementById('tabs');

/* Return the category badge for each project. */
function getCategoryLabel(category) {
  const labels = {
    koda: 'Koda client',
    corporate: 'Corporate',
    ecommerce: 'E-commerce',
    education: 'Education',
    other: 'Other',
    personal: 'Personal project'
  };

  return labels[category] || 'Website project';
}

/* Display the selected project cards. */
function render(cat) {
  if (!grid) return;

  const list = cat === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.cat === cat);

  if (list.length === 0) {
    grid.innerHTML = '<p class="p">No projects found in this category.</p>';
    return;
  }

  grid.innerHTML = list.map((p, i) => `
    <a
      class="card"
      data-tilt
      href="${p.href}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="${p.name}: ${p.action || 'Visit website'}"
      style="animation-delay:${i * 45}ms"
    >
      ${thumb(p, 800, 1300)}

      <div class="card-body">
        <div class="card-top">
          <span class="card-name">${p.name}</span>
          <span class="badge">${getCategoryLabel(p.cat)}</span>
        </div>

        <span class="card-url">${p.url}</span>

        ${p.description ? `
          <p class="project-description">${p.description}</p>
        ` : ''}

        <span class="visit">${p.action || 'Visit site'} ↗</span>
      </div>
    </a>
  `).join('');
}

/* Handle clicks on the category tabs. */
if (tabs) {
  tabs.addEventListener('click', e => {
    const button = e.target.closest('.tab');
    if (!button) return;

    tabs.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    });

    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');

    render(button.dataset.cat);
  });
}

/* Show all projects when the page first loads. */
render('all');

/* ===== SPLIT TEXT: HERO LETTERS + HEADING WORDS ===== */
(function () {
  const name = document.getElementById('heroName');
  if (!name) return;

  const txt = name.textContent;

  name.innerHTML = [...txt].map((c, i) =>
    c === ' '
      ? ' '
      : `<span class="ch" style="--i:${i}" aria-hidden="true">${c}</span>`
  ).join('');

  document.querySelectorAll('.words').forEach(h => {
    const label = h.textContent.trim();

    h.setAttribute('aria-label', label);

    h.innerHTML = label.split(/\s+/).map((word, i) => `
      <span class="w" aria-hidden="true">
        <span style="--i:${i}">${word}</span>
      </span>
    `).join(' ');
  });
})();

/* ===== TYPED ROLE LINE ===== */
(function () {
  const el = document.getElementById('typed');
  if (!el) return;

  const phrases = [
    'WordPress websites that rank.',
    'responsive WordPress layouts.',
    'fast, mobile-first landing pages.',
    'Figma designs that become real sites.'
  ];

  if (reduce) {
    el.textContent = phrases[0];
    return;
  }

  let p = 0;
  let c = 0;
  let del = false;

  (function tick() {
    const s = phrases[p];

    c += del ? -1 : 1;
    el.textContent = s.slice(0, c);

    let d = del ? 28 : 55;

    if (!del && c === s.length) {
      del = true;
      d = 1800;
    } else if (del && c === 0) {
      del = false;
      p = (p + 1) % phrases.length;
      d = 350;
    }

    setTimeout(tick, d);
  })();
})();

/* ===== CODE WINDOW: TYPES ITSELF ===== */
(function () {
  const out = document.getElementById('codeOut');
  if (!out) return;

  const src = `<?php
// Custom post type for client work
add_action('init', function () {
  register_post_type('project', [
    'public'   => true,
    'supports' => ['title', 'editor'],
    'rewrite'  => ['slug' => 'work'],
  ]);
});`;

  const esc = s => s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const paint = s => esc(s).replace(
    /(\/\/.*)|('[^']*'?)|\b(add_action|function|register_post_type|true)\b|(=&gt;)/g,
    (m, c, str, k, o) =>
      c ? `<span class="c">${m}</span>`
      : str ? `<span class="s">${m}</span>`
      : k ? `<span class="k">${m}</span>`
      : `<span class="o">${m}</span>`
  );

  if (reduce) {
    out.innerHTML = paint(src);
    return;
  }

  let i = 0;

  setTimeout(function step() {
    i++;
    out.innerHTML = paint(src.slice(0, i));

    if (i < src.length) {
      setTimeout(step, src[i - 1] === '\n' ? 220 : 24);
    }
  }, 1300);
})();

/* ===== MOBILE MENU ===== */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

const setMenu = open => {
  if (!nav || !burger) return;

  nav.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute(
    'aria-label',
    open ? 'Close menu' : 'Open menu'
  );
};

if (burger && nav) {
  burger.addEventListener('click', () => {
    setMenu(!nav.classList.contains('open'));
  });

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setMenu(false));
  });
}

/* ===== SCROLL REVEAL ===== */
const revealElements = document.querySelectorAll('.reveal, .words');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => {
    const parent = el.parentElement;

    if (parent) {
      const siblings = [...parent.children].filter(
        child => child.classList.contains('reveal')
      );

      if (siblings.length > 2) {
        el.style.transitionDelay =
          (siblings.indexOf(el) % 6) * 80 + 'ms';
      }
    }

    io.observe(el);
  });
} else {
  revealElements.forEach(el => el.classList.add('in'));
}

/* ===== COUNT-UP ===== */
document.querySelectorAll('[data-count]').forEach(el => {
  const target = Number(el.dataset.count);

  if (reduce) {
    el.textContent = target;
    return;
  }

  const start = performance.now() + 1100;
  const duration = 1500;

  const tick = now => {
    const t = Math.min(
      Math.max((now - start) / duration, 0),
      1
    );

    el.textContent = Math.round(
      target * (1 - Math.pow(1 - t, 3))
    );

    if (t < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
});

/* ===== SCROLL: PROGRESS, TIMELINE, PARALLAX, ACTIVE NAV ===== */
const bar = document.getElementById('progress');
const tl = document.querySelector('.timeline');
const hero = document.querySelector('.hero');

const links = [
  ...document.querySelectorAll('.nav a[href^="#"]:not(.nav-cta)')
];

const secs = links.map(a =>
  document.querySelector(a.getAttribute('href'))
);

function onScroll() {
  const h = document.documentElement;

  if (bar) {
    const maxScroll = h.scrollHeight - h.clientHeight;
    const progress = maxScroll > 0 ? h.scrollTop / maxScroll : 0;

    bar.style.transform = `scaleX(${progress})`;
  }

  if (!reduce && hero) {
    hero.style.setProperty('--py', window.scrollY * 0.25 + 'px');
  }

  if (tl) {
    const r = tl.getBoundingClientRect();

    const progress = r.height > 0
      ? Math.min(
          Math.max((window.innerHeight * 0.6 - r.top) / r.height, 0),
          1
        )
      : 0;

    tl.style.setProperty('--tl', progress * 100 + '%');
  }

  const y = window.scrollY + window.innerHeight * 0.35;

  secs.forEach((section, i) => {
    if (!section) return;

    links[i].classList.toggle(
      'active',
      y >= section.offsetTop &&
      y < section.offsetTop + section.offsetHeight
    );
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ===== POINTER EFFECTS: GLOW, RING, TILT, MAGNETIC ===== */
if (!reduce && fine) {
  const glow = document.getElementById('glow');
  const ring = document.getElementById('ring');

  if (glow && ring) {
    let rx = 0;
    let ry = 0;
    let tx = 0;
    let ty = 0;

    (function loop() {
      rx += (tx - rx) * 0.2;
      ry += (ty - ry) * 0.2;

      ring.style.transform = `translate(${rx}px,${ry}px)`;

      requestAnimationFrame(loop);
    })();

    let lastTilt = null;
    let lastMag = null;

    const resetTilt = el => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };

    const resetMag = el => {
      el.style.setProperty('--tx', '0px');
      el.style.setProperty('--ty', '0px');
    };

    window.addEventListener('pointermove', e => {
      glow.style.opacity = 1;
      ring.style.opacity = 1;

      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';

      tx = e.clientX;
      ty = e.clientY;

      ring.classList.toggle(
        'big',
        !!e.target.closest('a,button,[data-tilt]')
      );

      const tilt = e.target.closest('[data-tilt]');

      if (lastTilt && lastTilt !== tilt) {
        resetTilt(lastTilt);
      }

      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;

        tilt.style.setProperty(
          '--ry',
          ((x - 0.5) * 10).toFixed(2) + 'deg'
        );

        tilt.style.setProperty(
          '--rx',
          ((0.5 - y) * 10).toFixed(2) + 'deg'
        );

        tilt.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        tilt.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      }

      lastTilt = tilt;

      const magnet = e.target.closest('[data-magnet]');

      if (lastMag && lastMag !== magnet) {
        resetMag(lastMag);
      }

      if (magnet) {
        const r = magnet.getBoundingClientRect();

        magnet.style.setProperty(
          '--tx',
          ((e.clientX - r.left - r.width / 2) * 0.25).toFixed(1) + 'px'
        );

        magnet.style.setProperty(
          '--ty',
          ((e.clientY - r.top - r.height / 2) * 0.35).toFixed(1) + 'px'
        );
      }

      lastMag = magnet;
    });

    document.addEventListener('pointerleave', () => {
      glow.style.opacity = 0;
      ring.style.opacity = 0;
    });
  }
}

/* ===== HERO NETWORK CANVAS ===== */
(function () {
  const cv = document.getElementById('net');

  if (!cv || reduce || !cv.getContext) return;

  const ctx = cv.getContext('2d');
  if (!ctx) return;

  let w;
  let h;
  let pts = [];
  let mouse = { x: -999, y: -999 };
  let on = true;
  let animationId = null;

  const init = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    w = cv.clientWidth;
    h = cv.clientHeight;

    cv.width = w * dpr;
    cv.height = h * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const n = Math.round(Math.min(70, (w * h) / 16000));

    pts = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35
    }));
  };

  window.addEventListener('resize', init);
  init();

  if (hero) {
    hero.addEventListener('pointermove', e => {
      const r = cv.getBoundingClientRect();

      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });

    hero.addEventListener('pointerleave', () => {
      mouse.x = -999;
      mouse.y = -999;
    });
  }

  if ('IntersectionObserver' in window && hero) {
    new IntersectionObserver(entries => {
      on = entries[0].isIntersecting;

      if (on && animationId === null) {
        draw();
      }
    }).observe(hero);
  }

  function draw() {
    if (!on) {
      animationId = null;
      return;
    }

    ctx.clearRect(0, 0, w, h);

    for (const p of pts) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const d = Math.hypot(dx, dy);

      if (d < 140) {
        p.x -= dx * 0.004;
        p.y -= dy * 0.004;
      }
    }

    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];

      ctx.fillStyle = 'rgba(160,150,255,.7)';
      ctx.beginPath();
      ctx.arc(a.x, a.y, 1.6, 0, 6.283);
      ctx.fill();

      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);

        if (d < 120) {
          ctx.strokeStyle = `rgba(124,108,255,${(1 - d / 120) * 0.35})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);

      if (dm < 160) {
        ctx.strokeStyle = `rgba(255,155,106,${(1 - dm / 160) * 0.5})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }

    animationId = requestAnimationFrame(draw);
  }

  draw();
})();

/* ===== CLICK SPARKS ===== */
document.addEventListener('click', e => {
  if (reduce || !e.target.closest('.btn-solid,.fab')) return;

  for (let i = 0; i < 14; i++) {
    const spark = document.createElement('i');
    const angle = Math.random() * 6.283;
    const distance = 40 + Math.random() * 55;

    spark.className = 'spark';

    spark.style.cssText = `
      left:${e.clientX}px;
      top:${e.clientY}px;
      --dx:${Math.cos(angle) * distance}px;
      --dy:${Math.sin(angle) * distance}px;
      background:${i % 2 ? '#FF9B6A' : '#7C6CFF'};
    `;

    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 700);
  }
});

/* ===== LEAD FORM ===== */
(function () {
  const form = document.getElementById('leadForm');
  const note = document.getElementById('formNote');

  if (!form || !note) return;

  const btn = form.querySelector('button[type="submit"]');
  if (!btn) return;

  const say = (message, cls) => {
    note.textContent = message;
    note.className = 'sm form-note ' + (cls || '');
  };

  form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const f = new FormData(form);

    if (f.get('_gotcha')) return;

    if (FORM_ENDPOINT) {
      btn.disabled = true;
      btn.textContent = 'Sending...';
      say('');

      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: f
        });

        if (!response.ok) throw new Error('Form submission failed');

        form.reset();

        say(
          'Thank you! Your message is on its way. I will reply within a day.',
          'ok'
        );
      } catch (_) {
        say(
          'Could not send right now. Please email sj411692@gmail.com directly.',
          'err'
        );
      }

      btn.disabled = false;
      btn.textContent = 'Send message';
    } else {
      const body = `Hi Sneha,

${f.get('msg')}

Name: ${f.get('name')}
Email: ${f.get('email')}
Looking for: ${f.get('type')}`;

      window.location.href =
        `mailto:sj411692@gmail.com?subject=${encodeURIComponent(
          'Enquiry: ' + f.get('type')
        )}&body=${encodeURIComponent(body)}`;

      say(
        'Opening your email app. If nothing opens, write to sj411692@gmail.com.',
        'ok'
      );
    }
  });
})();
