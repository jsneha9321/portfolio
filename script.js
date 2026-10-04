/* ===== CONTACT FORM SETTINGS =====
   To receive messages straight in your inbox: create a free form at formspree.io
   (use sj411692@gmail.com), then paste your endpoint below, e.g.
   const FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxxx';
   Leave it empty and the form opens the visitor's email app instead. */
const FORM_ENDPOINT = '';

/* ===== PROJECT DATA ===== */
const PROJECTS = [
  { name:"Koda",                    url:"koda.co.in",               href:"https://koda.co.in/",                cat:"koda" },
  { name:"Cloud Kinetics",          url:"cloud-kinetics.com",       href:"https://www.cloud-kinetics.com/",    cat:"koda" },
  { name:"MeritTrac",               url:"merittrac.com",            href:"http://merittrac.com/",              cat:"koda" },
  { name:"Greytt.ai",               url:"greytt.ai",                href:"https://greytt.ai/",                 cat:"koda" },
  { name:"OneConsent",              url:"oneconsent.ai",            href:"https://oneconsent.ai/",             cat:"koda" },
  { name:"Entermind",               url:"entermind.com",            href:"https://entermind.com/",             cat:"koda" },
  { name:"Carltrix",                url:"carltrix.com",             href:"http://carltrix.com",                cat:"corporate" },
  { name:"Ellex-i",                 url:"ellex-i.com",              href:"http://ellex-i.com",                 cat:"corporate" },
  { name:"Essbee Agrotek",          url:"essbeeagrotek.in",         href:"http://essbeeagrotek.in",            cat:"corporate" },
  { name:"Ergoline",                url:"ergoline.co.in",           href:"http://ergoline.co.in",              cat:"corporate" },
  { name:"Windscape",               url:"windscape.in",             href:"http://windscape.in",                cat:"corporate" },
  { name:"Unique Guardz",           url:"uniqueguardz.com",         href:"https://uniqueguardz.com/",          cat:"corporate" },
  { name:"Inbox Haircare",          url:"inboxhaircare.com",        href:"http://inboxhaircare.com",           cat:"ecommerce" },
  { name:"Tanu Silks",              url:"tanusilks.com",            href:"https://tanusilks.com/",             cat:"ecommerce" },
  { name:"Kale Indian Film Academy",url:"kaleindianfilmacademy.com",href:"http://kaleindianfilmacademy.com",   cat:"education" },
  { name:"Medical Education World", url:"medicaleducationworld.com",href:"https://medicaleducationworld.com/", cat:"education" },
  { name:"IESC India",              url:"iescindia.com",            href:"https://iescindia.com/",             cat:"education" },
  { name:"Shantha Ventures",        url:"shanthaventures.com",      href:"https://shanthaventures.com/",       cat:"other" },
  { name:"Group Unnati",            url:"groupunnati.com",          href:"https://groupunnati.com/",           cat:"other" },
  { name:"Public Documents Service",url:"publicdocumentsservice.com",href:"http://publicdocumentsservice.com", cat:"other" },
  { name:"Mahatirtha Yatras",       url:"mahatirthayatras.com",     href:"https://mahatirthayatras.com/",      cat:"other" }
];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover:hover)').matches;
const shotUrl = (href, w, h) => `https://s0.wp.com/mshots/v1/${encodeURIComponent(href)}?w=${w}&h=${h}`;
const thumb = (p, w, h) => `<div class="thumb" data-i="${p.name[0]}"><img src="${shotUrl(p.href, w, h)}" alt="" loading="lazy" onerror="this.remove()"></div>`;

/* ===== HERO WALL ===== */
(function () {
  const wall = document.getElementById('wall');
  const half = Math.ceil(PROJECTS.length / 2);
  [PROJECTS.slice(0, half), PROJECTS.slice(half)].forEach((list, i) => {
    const cards = list.map(p => `<a class="shot" href="${p.href}" target="_blank" rel="noopener" aria-label="${p.name}" tabindex="-1">${thumb(p, 600, 900)}</a>`).join('');
    wall.insertAdjacentHTML('beforeend', `<div class="track${i ? ' rev' : ''}">${cards}${cards}</div>`);
  });
})();

/* ===== PROJECT GRID + FILTER ===== */
const grid = document.getElementById('grid');
function render(cat) {
  const list = cat === 'all' ? PROJECTS : PROJECTS.filter(p => p.cat === cat);
  grid.innerHTML = list.map((p, i) => `
    <a class="card" data-tilt href="${p.href}" target="_blank" rel="noopener" style="animation-delay:${i * 45}ms">
      ${thumb(p, 800, 1300)}
      <div class="card-body">
        <div class="card-top"><span class="card-name">${p.name}</span>${p.cat === 'koda' ? '<span class="badge">Koda client</span>' : ''}</div>
        <span class="card-url">${p.url}</span><span class="visit">Visit site</span>
      </div>
    </a>`).join('');
}
document.getElementById('tabs').addEventListener('click', e => {
  const b = e.target.closest('.tab'); if (!b) return;
  document.querySelectorAll('.tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
  b.classList.add('active'); b.setAttribute('aria-selected', 'true');
  render(b.dataset.cat);
});
render('all');

/* ===== SPLIT TEXT: hero letters + heading words ===== */
(function () {
  const name = document.getElementById('heroName');
  const txt = name.textContent;
  name.innerHTML = [...txt].map((c, i) => c === ' ' ? ' ' : `<span class="ch" style="--i:${i}" aria-hidden="true">${c}</span>`).join('');
  document.querySelectorAll('.words').forEach(h => {
    const label = h.textContent.trim();
    h.setAttribute('aria-label', label);
    h.innerHTML = label.split(/\s+/).map((w, i) => `<span class="w" aria-hidden="true"><span style="--i:${i}">${w}</span></span>`).join(' ');
  });
})();

/* ===== TYPED ROLE LINE ===== */
(function () {
  const el = document.getElementById('typed');
  const phrases = ['WordPress websites that rank.', 'responsive WordPress layouts.', 'fast, mobile-first landing pages.', 'Figma designs that become real sites.'];
  if (reduce) { el.textContent = phrases[0]; return; }
  let p = 0, c = 0, del = false;
  (function tick() {
    const s = phrases[p];
    c += del ? -1 : 1;
    el.textContent = s.slice(0, c);
    let d = del ? 28 : 55;
    if (!del && c === s.length) { del = true; d = 1800; }
    else if (del && c === 0) { del = false; p = (p + 1) % phrases.length; d = 350; }
    setTimeout(tick, d);
  })();
})();

/* ===== CODE WINDOW (types itself) ===== */
(function () {
  const out = document.getElementById('codeOut');
  const src = `<?php\n// Custom post type for client work\nadd_action('init', function () {\n  register_post_type('project', [\n    'public'   => true,\n    'supports' => ['title', 'editor'],\n    'rewrite'  => ['slug' => 'work'],\n  ]);\n});`;
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const paint = s => esc(s).replace(/(\/\/.*)|('[^']*'?)|\b(add_action|function|register_post_type|true)\b|(=&gt;)/g,
    (m, c, str, k, o) => c ? `<span class="c">${m}</span>` : str ? `<span class="s">${m}</span>` : k ? `<span class="k">${m}</span>` : `<span class="o">${m}</span>`);
  if (reduce) { out.innerHTML = paint(src); return; }
  let i = 0;
  setTimeout(function step() {
    i++; out.innerHTML = paint(src.slice(0, i));
    if (i < src.length) setTimeout(step, src[i - 1] === '\n' ? 220 : 24);
  }, 1300);
})();

/* ===== MOBILE MENU ===== */
const burger = document.getElementById('burger'), nav = document.getElementById('nav');
const setMenu = o => { nav.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); };
burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

/* ===== SCROLL REVEAL (+ stagger inside grids) ===== */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal, .words').forEach(el => {
  const sib = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
  if (sib.length > 2) el.style.transitionDelay = (sib.indexOf(el) % 6) * 80 + 'ms';
  io.observe(el);
});

/* ===== COUNT-UP ===== */
document.querySelectorAll('[data-count]').forEach(el => {
  const target = +el.dataset.count;
  if (reduce) { el.textContent = target; return; }
  const start = performance.now() + 1100, dur = 1500;
  const tick = now => {
    const t = Math.min(Math.max((now - start) / dur, 0), 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});

/* ===== SCROLL: progress, timeline fill, parallax, active nav ===== */
const bar = document.getElementById('progress'), tl = document.querySelector('.timeline');
const hero = document.querySelector('.hero');
const links = [...document.querySelectorAll('.nav a[href^="#"]:not(.nav-cta)')];
const secs = links.map(a => document.querySelector(a.getAttribute('href')));
function onScroll() {
  const h = document.documentElement;
  bar.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
  if (!reduce) hero.style.setProperty('--py', scrollY * .25 + 'px');
  if (tl) {
    const r = tl.getBoundingClientRect();
    tl.style.setProperty('--tl', Math.min(Math.max((innerHeight * .6 - r.top) / r.height, 0), 1) * 100 + '%');
  }
  const y = scrollY + innerHeight * .35;
  secs.forEach((s, i) => s && links[i].classList.toggle('active', y >= s.offsetTop && y < s.offsetTop + s.offsetHeight));
}
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* ===== POINTER EFFECTS: glow, ring, tilt, spotlight, magnetic ===== */
if (!reduce && fine) {
  const glow = document.getElementById('glow'), ring = document.getElementById('ring');
  let rx = 0, ry = 0, tx = 0, ty = 0;
  (function loop() { rx += (tx - rx) * .2; ry += (ty - ry) * .2; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(loop); })();
  let lastTilt = null, lastMag = null;
  const resetTilt = el => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); };
  const resetMag = el => { el.style.setProperty('--tx', '0px'); el.style.setProperty('--ty', '0px'); };
  addEventListener('pointermove', e => {
    glow.style.opacity = 1; ring.style.opacity = 1;
    glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px';
    tx = e.clientX; ty = e.clientY;
    ring.classList.toggle('big', !!e.target.closest('a,button,[data-tilt]'));

    const t = e.target.closest('[data-tilt]');
    if (lastTilt && lastTilt !== t) resetTilt(lastTilt);
    if (t) {
      const r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      t.style.setProperty('--ry', ((x - .5) * 10).toFixed(2) + 'deg');
      t.style.setProperty('--rx', ((.5 - y) * 10).toFixed(2) + 'deg');
      t.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      t.style.setProperty('--my', (y * 100).toFixed(1) + '%');
    }
    lastTilt = t;

    const m = e.target.closest('[data-magnet]');
    if (lastMag && lastMag !== m) resetMag(lastMag);
    if (m) {
      const r = m.getBoundingClientRect();
      m.style.setProperty('--tx', ((e.clientX - r.left - r.width / 2) * .25).toFixed(1) + 'px');
      m.style.setProperty('--ty', ((e.clientY - r.top - r.height / 2) * .35).toFixed(1) + 'px');
    }
    lastMag = m;
  });
  document.addEventListener('pointerleave', () => { glow.style.opacity = 0; ring.style.opacity = 0; });
}

/* ===== HERO NETWORK CANVAS ===== */
(function () {
  const cv = document.getElementById('net');
  if (reduce || !cv.getContext) return;
  const ctx = cv.getContext('2d');
  let w, h, pts = [], mouse = { x: -999, y: -999 }, on = true;
  const init = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = cv.clientWidth; h = cv.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(70, w * h / 16000));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 }));
  };
  addEventListener('resize', init); init();
  hero.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  hero.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });
  new IntersectionObserver(es => { on = es[0].isIntersecting; if (on) draw(); }).observe(hero);
  function draw() {
    if (!on) return;
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
      if (d < 140) { p.x -= dx * .004; p.y -= dy * .004; }
    }
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      ctx.fillStyle = 'rgba(160,150,255,.7)'; ctx.beginPath(); ctx.arc(a.x, a.y, 1.6, 0, 6.283); ctx.fill();
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) { ctx.strokeStyle = `rgba(124,108,255,${(1 - d / 120) * .35})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (dm < 160) { ctx.strokeStyle = `rgba(255,155,106,${(1 - dm / 160) * .5})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ===== CLICK SPARKS ===== */
document.addEventListener('click', e => {
  if (reduce || !e.target.closest('.btn-solid,.fab')) return;
  for (let i = 0; i < 14; i++) {
    const s = document.createElement('i'), a = Math.random() * 6.283, d = 40 + Math.random() * 55;
    s.className = 'spark';
    s.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;background:${i % 2 ? '#FF9B6A' : '#7C6CFF'}`;
    document.body.appendChild(s); setTimeout(() => s.remove(), 700);
  }
});

/* ===== LEAD FORM ===== */
(function () {
  const form = document.getElementById('leadForm'), note = document.getElementById('formNote');
  const btn = form.querySelector('button[type=submit]');
  const say = (t, cls) => { note.textContent = t; note.className = 'sm form-note ' + (cls || ''); };
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const f = new FormData(form);
    if (f.get('_gotcha')) return;
    if (FORM_ENDPOINT) {
      btn.disabled = true; btn.textContent = 'Sending...'; say('');
      try {
        const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: f });
        if (!r.ok) throw new Error();
        form.reset(); say('Thank you! Your message is on its way. I will reply within a day.', 'ok');
      } catch (_) {
        say('Could not send right now. Please email sj411692@gmail.com directly.', 'err');
      }
      btn.disabled = false; btn.textContent = 'Send message';
    } else {
      const body = `Hi Sneha,\n\n${f.get('msg')}\n\nName: ${f.get('name')}\nEmail: ${f.get('email')}\nLooking for: ${f.get('type')}`;
      location.href = `mailto:sj411692@gmail.com?subject=${encodeURIComponent('Enquiry: ' + f.get('type'))}&body=${encodeURIComponent(body)}`;
      say('Opening your email app. If nothing opens, write to sj411692@gmail.com.', 'ok');
    }
  });
})();
