
/* =========================================================
   WEB WONDER PORTFOLIO — COMPLETE SCRIPT.JS
   Includes: Project filtering, Personal Projects, animations,
   mobile navigation, scroll effects, and contact form.
========================================================= */


/* ===== CONTACT FORM SETTINGS =====
   Create a free form at https://formspree.io
   Replace the empty string with your Formspree endpoint.
   If left empty, the visitor's email app will open instead.
*/
const FORM_ENDPOINT = '';


/* ===== PROJECT DATA ===== */
const PROJECTS = [
  // Koda client projects
  {
    name: "Koda",
    url: "koda.co.in",
    href: "https://koda.co.in/",
    cat: "koda"
  },
  {
    name: "Cloud Kinetics",
    url: "cloud-kinetics.com",
    href: "https://www.cloud-kinetics.com/",
    cat: "koda"
  },
  {
    name: "MeritTrac",
    url: "merittrac.com",
    href: "http://merittrac.com/",
    cat: "koda"
  },
  {
    name: "Greytt.ai",
    url: "greytt.ai",
    href: "https://greytt.ai/",
    cat: "koda"
  },
  {
    name: "OneConsent",
    url: "oneconsent.ai",
    href: "https://oneconsent.ai/",
    cat: "koda"
  },
  {
    name: "Entermind",
    url: "entermind.com",
    href: "https://entermind.com/",
    cat: "koda"
  },

  // Corporate websites
  {
    name: "Carltrix",
    url: "carltrix.com",
    href: "http://carltrix.com",
    cat: "corporate"
  },
  {
    name: "Ellex-i",
    url: "ellex-i.com",
    href: "http://ellex-i.com",
    cat: "corporate"
  },
  {
    name: "Essbee Agrotek",
    url: "essbeeagrotek.in",
    href: "http://essbeeagrotek.in",
    cat: "corporate"
  },
  {
    name: "Ergoline",
    url: "ergoline.co.in",
    href: "http://ergoline.co.in",
    cat: "corporate"
  },
  {
    name: "Windscape",
    url: "windscape.in",
    href: "http://windscape.in",
    cat: "corporate"
  },
  {
    name: "Unique Guardz",
    url: "uniqueguardz.com",
    href: "https://uniqueguardz.com/",
    cat: "corporate"
  },

  // E-commerce websites
  {
    name: "Inbox Haircare",
    url: "inboxhaircare.com",
    href: "http://inboxhaircare.com",
    cat: "ecommerce"
  },
  {
    name: "Tanu Silks",
    url: "tanusilks.com",
    href: "https://tanusilks.com/",
    cat: "ecommerce"
  },

  // Education websites
  {
    name: "Kale Indian Film Academy",
    url: "kaleindianfilmacademy.com",
    href: "http://kaleindianfilmacademy.com",
    cat: "education"
  },
  {
    name: "Medical Education World",
    url: "medicaleducationworld.com",
    href: "https://medicaleducationworld.com/",
    cat: "education"
  },
  {
    name: "IESC India",
    url: "iescindia.com",
    href: "https://iescindia.com/",
    cat: "education"
  },

  // Other websites
  {
    name: "Shantha Ventures",
    url: "shanthaventures.com",
    href: "https://shanthaventures.com/",
    cat: "other"
  },
  {
    name: "Group Unnati",
    url: "groupunnati.com",
    href: "https://groupunnati.com/",
    cat: "other"
  },
  {
    name: "Public Documents Service",
    url: "publicdocumentsservice.com",
    href: "http://publicdocumentsservice.com",
    cat: "other"
  },
  {
    name: "Mahatirtha Yatras",
    url: "mahatirthayatras.com",
    href: "https://mahatirthayatras.com/",
    cat: "other"
  },

  // Personal project: Smart Leads WordPress Plugin
  {
    name: "Smart Leads WordPress Plugin",
    url: "github.com/jsneha9321/smart-leads-wordpress-plugin",
    href: "https://github.com/jsneha9321/smart-leads-wordpress-plugin/",
    cat: "personal",
    description:
      "A custom WordPress plugin featuring lead management, admin CRUD operations, a frontend lead form, and REST API integration.",
    action: "View source code"
  }
];


/* ===== USER PREFERENCES ===== */
const reduce = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const fine = window.matchMedia(
  '(hover: hover)'
).matches;


/* ===== WEBSITE SCREENSHOT HELPERS ===== */
const shotUrl = (href, w, h) =>
  `https://s0.wp.com/mshots/v1/${encodeURIComponent(href)}?w=${w}&h=${h}`;

const thumb = (project, width, height) => `
  <div class="thumb" data-i="${project.name[0]}">
    <img
      src="${shotUrl(project.href, width, height)}"
      alt="Website preview of ${project.name}"
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

  [PROJECTS.slice(0, half), PROJECTS.slice(half)].forEach(
    (projectList, index) => {
      const cards = projectList.map(project => `
        <a
          class="shot"
          href="${project.href}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="${project.name}"
          tabindex="-1"
        >
          ${thumb(project, 600, 900)}
        </a>
      `).join('');

      wall.insertAdjacentHTML(
        'beforeend',
        `<div class="track${index ? ' rev' : ''}">${cards}${cards}</div>`
      );
    }
  );
})();


/* ===== PROJECT GRID AND CATEGORY FILTER ===== */
const grid = document.getElementById('grid');
const tabs = document.getElementById('tabs');


/* Category names displayed on project cards */
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


/* Render the selected project cards */
function render(category) {
  if (!grid) return;

  const projects = category === 'all'
    ? PROJECTS
    : PROJECTS.filter(project => project.cat === category);

  if (projects.length === 0) {
    grid.innerHTML =
      '<p class="p">No projects found in this category.</p>';
    return;
  }

  grid.innerHTML = projects.map((project, index) => `
    <a
      class="card"
      data-tilt
      href="${project.href}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="${project.name}: ${project.action || 'Visit website'}"
      style="animation-delay:${index * 45}ms"
    >
      ${thumb(project, 800, 1300)}

      <div class="card-body">
        <div class="card-top">
          <span class="card-name">${project.name}</span>

          <span class="badge">
            ${getCategoryLabel(project.cat)}
          </span>
        </div>

        <span class="card-url">${project.url}</span>

        ${
          project.description
            ? `<p class="project-description">${project.description}</p>`
            : ''
        }

        <span class="visit">
          ${project.action || 'Visit site'} ↗
        </span>
      </div>
    </a>
  `).join('');
}


/* Handle category tab clicks */
if (tabs) {
  tabs.addEventListener('click', event => {
    const button = event.target.closest('.tab');

    if (!button || !tabs.contains(button)) return;

    tabs.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    });

    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');

    render(button.dataset.cat);
  });
}


/* Show all projects on initial page load */
render('all');


/* ===== SPLIT TEXT: HERO LETTERS AND HEADING WORDS ===== */
(function () {
  const name = document.getElementById('heroName');

  if (name) {
    const text = name.textContent;

    name.innerHTML = [...text].map((character, index) =>
      character === ' '
        ? ' '
        : `<span class="ch" style="--i:${index}" aria-hidden="true">${character}</span>`
    ).join('');
  }

  document.querySelectorAll('.words').forEach(heading => {
    const label = heading.textContent.trim();

    heading.setAttribute('aria-label', label);

    heading.innerHTML = label.split(/\s+/).map((word, index) => `
      <span class="w" aria-hidden="true">
        <span style="--i:${index}">${word}</span>
      </span>
    `).join(' ');
  });
})();


/* ===== TYPED ROLE LINE ===== */
(function () {
  const element = document.getElementById('typed');

  if (!element) return;

  const phrases = [
    'WordPress websites that rank.',
    'responsive WordPress layouts.',
    'fast, mobile-first landing pages.',
    'Figma designs that become real sites.'
  ];

  if (reduce) {
    element.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function tick() {
    const phrase = phrases[phraseIndex];

    characterIndex += deleting ? -1 : 1;
    element.textContent = phrase.slice(0, characterIndex);

    let delay = deleting ? 28 : 55;

    if (!deleting && characterIndex === phrase.length) {
      deleting = true;
      delay = 1800;
    } else if (deleting && characterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 350;
    }

    window.setTimeout(tick, delay);
  }

  tick();
})();


/* ===== CODE WINDOW: TYPES ITSELF ===== */
(function () {
  const output = document.getElementById('codeOut');

  if (!output) return;

  const source = `<?php
// Custom post type for client work
add_action('init', function () {
  register_post_type('project', [
    'public'   => true,
    'supports' => ['title', 'editor'],
    'rewrite'  => ['slug' => 'work'],
  ]);
});`;

  const escapeHTML = text => text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const paint = text => escapeHTML(text).replace(
    /(\/\/.*)|('[^']*'?)|\b(add_action|function|register_post_type|true)\b|(=&gt;)/g,
    (match, comment, string, keyword, operator) =>
      comment ? `<span class="c">${match}</span>`
        : string ? `<span class="s">${match}</span>`
        : keyword ? `<span class="k">${match}</span>`
        : `<span class="o">${match}</span>`
  );

  if (reduce) {
    output.innerHTML = paint(source);
    return;
  }

  let index = 0;

  function step() {
    index++;
    output.innerHTML = paint(source.slice(0, index));

    if (index < source.length) {
      window.setTimeout(
        step,
        source[index - 1] === '\n' ? 220 : 24
      );
    }
  }

  window.setTimeout(step, 1300);
})();


/* ===== MOBILE MENU ===== */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

function setMenu(isOpen) {
  if (!nav || !burger) return;

  nav.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
  burger.setAttribute(
    'aria-label',
    isOpen ? 'Close menu' : 'Open menu'
  );
}

if (burger && nav) {
  burger.addEventListener('click', () => {
    setMenu(!nav.classList.contains('open'));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });
}


/* ===== SCROLL REVEAL ===== */
const revealElements = document.querySelectorAll('.reveal, .words');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => {
    const parent = element.parentElement;

    if (parent) {
      const siblings = [...parent.children].filter(child =>
        child.classList.contains('reveal')
      );

      if (siblings.length > 2) {
        element.style.transitionDelay =
          (siblings.indexOf(element) % 6) * 80 + 'ms';
      }
    }

    observer.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add('in');
  });
}


/* ===== COUNT-UP ANIMATIONS ===== */
document.querySelectorAll('[data-count]').forEach(element => {
  const target = Number(element.dataset.count);

  if (reduce) {
    element.textContent = target;
    return;
  }

  const start = performance.now() + 1100;
  const duration = 1500;

  function tick(now) {
    const progress = Math.min(
      Math.max((now - start) / duration, 0),
      1
    );

    element.textContent = Math.round(
      target * (1 - Math.pow(1 - progress, 3))
    );

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
});


/* ===== SCROLL: PROGRESS, TIMELINE, PARALLAX, ACTIVE NAV ===== */
const progressBar = document.getElementById('progress');
const timeline = document.querySelector('.timeline');
const hero = document.querySelector('.hero');

const navLinks = [
  ...document.querySelectorAll(
    '.nav a[href^="#"]:not(.nav-cta)'
  )
];

const sections = navLinks.map(link =>
  document.querySelector(link.getAttribute('href'))
);

function onScroll() {
  const page = document.documentElement;

  if (progressBar) {
    const maxScroll = page.scrollHeight - page.clientHeight;
    const progress = maxScroll > 0
      ? page.scrollTop / maxScroll
      : 0;

    progressBar.style.transform = `scaleX(${progress})`;
  }

  if (!reduce && hero) {
    hero.style.setProperty(
      '--py',
      window.scrollY * 0.25 + 'px'
    );
  }

  if (timeline) {
    const rect = timeline.getBoundingClientRect();

    const progress = rect.height > 0
      ? Math.min(
          Math.max(
            (window.innerHeight * 0.6 - rect.top) / rect.height,
            0
          ),
          1
        )
      : 0;

    timeline.style.setProperty('--tl', progress * 100 + '%');
  }

  const currentPosition =
    window.scrollY + window.innerHeight * 0.35;

  sections.forEach((section, index) => {
    if (!section) return;

    navLinks[index].classList.toggle(
      'active',
      currentPosition >= section.offsetTop &&
      currentPosition < section.offsetTop + section.offsetHeight
    );
  });
}

window.addEventListener('scroll', onScroll, {
  passive: true
});

onScroll();


/* ===== POINTER EFFECTS: GLOW, RING, TILT, MAGNETIC ===== */
if (!reduce && fine) {
  const glow = document.getElementById('glow');
  const ring = document.getElementById('ring');

  if (glow && ring) {
    let ringX = 0;
    let ringY = 0;
    let targetX = 0;
    let targetY = 0;

    function animateRing() {
      ringX += (targetX - ringX) * 0.2;
      ringY += (targetY - ringY) * 0.2;

      ring.style.transform =
        `translate(${ringX}px, ${ringY}px)`;

      requestAnimationFrame(animateRing);
    }

    animateRing();

    let lastTilt = null;
    let lastMagnet = null;

    const resetTilt = element => {
      element.style.setProperty('--rx', '0deg');
      element.style.setProperty('--ry', '0deg');
    };

    const resetMagnet = element => {
      element.style.setProperty('--tx', '0px');
      element.style.setProperty('--ty', '0px');
    };

    window.addEventListener('pointermove', event => {
      glow.style.opacity = 1;
      ring.style.opacity = 1;

      glow.style.left = event.clientX + 'px';
      glow.style.top = event.clientY + 'px';

      targetX = event.clientX;
      targetY = event.clientY;

      ring.classList.toggle(
        'big',
        Boolean(event.target.closest('a, button, [data-tilt]'))
      );

      const tilt = event.target.closest('[data-tilt]');

      if (lastTilt && lastTilt !== tilt) {
        resetTilt(lastTilt);
      }

      if (tilt) {
        const rect = tilt.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        tilt.style.setProperty(
          '--ry',
          ((x - 0.5) * 10).toFixed(2) + 'deg'
        );

        tilt.style.setProperty(
          '--rx',
          ((0.5 - y) * 10).toFixed(2) + 'deg'
        );

        tilt.style.setProperty(
          '--mx',
          (x * 100).toFixed(1) + '%'
        );

        tilt.style.setProperty(
          '--my',
          (y * 100).toFixed(1) + '%'
        );
      }

      lastTilt = tilt;

      const magnet = event.target.closest('[data-magnet]');

      if (lastMagnet && lastMagnet !== magnet) {
        resetMagnet(lastMagnet);
      }

      if (magnet) {
        const rect = magnet.getBoundingClientRect();

        magnet.style.setProperty(
          '--tx',
          (
            (event.clientX - rect.left - rect.width / 2) * 0.25
          ).toFixed(1) + 'px'
        );

        magnet.style.setProperty(
          '--ty',
          (
            (event.clientY - rect.top - rect.height / 2) * 0.35
          ).toFixed(1) + 'px'
        );
      }

      lastMagnet = magnet;
    });

    document.addEventListener('pointerleave', () => {
      glow.style.opacity = 0;
      ring.style.opacity = 0;
    });
  }
}


/* ===== HERO NETWORK CANVAS ===== */
(function () {
  const canvas = document.getElementById('net');

  if (!canvas || reduce || !canvas.getContext) return;

  const context = canvas.getContext('2d');

  if (!context) return;

  let width = 0;
  let height = 0;
  let points = [];

  const mouse = {
    x: -999,
    y: -999
  };

  let visible = true;
  let animationId = null;

  function initialize() {
    const pixelRatio = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    width = canvas.clientWidth;
    height = canvas.clientHeight;

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;

    context.setTransform(
      pixelRatio,
      0,
      0,
      pixelRatio,
      0,
      0
    );

    const count = Math.round(
      Math.min(70, (width * height) / 16000)
    );

    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35
    }));
  }

  window.addEventListener('resize', initialize);

  initialize();

  if (hero) {
    hero.addEventListener('pointermove', event => {
      const rect = canvas.getBoundingClientRect();

      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    });

    hero.addEventListener('pointerleave', () => {
      mouse.x = -999;
      mouse.y = -999;
    });
  }

  if ('IntersectionObserver' in window && hero) {
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;

      if (visible && animationId === null) {
        draw();
      }
    });

    observer.observe(hero);
  }

  function draw() {
    if (!visible) {
      animationId = null;
      return;
    }

    context.clearRect(0, 0, width, height);

    for (const point of points) {
      point.x += point.vx;
      point.y += point.vy;

      if (point.x < 0 || point.x > width) {
        point.vx *= -1;
      }

      if (point.y < 0 || point.y > height) {
        point.vy *= -1;
      }

      const dx = mouse.x - point.x;
      const dy = mouse.y - point.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 140) {
        point.x -= dx * 0.004;
        point.y -= dy * 0.004;
      }
    }

    for (let i = 0; i < points.length; i++) {
      const a = points[i];

      context.fillStyle = 'rgba(160,150,255,.7)';
      context.beginPath();
      context.arc(a.x, a.y, 1.6, 0, 6.283);
      context.fill();

      for (let j = i + 1; j < points.length; j++) {
        const b = points[j];
        const distance = Math.hypot(
          a.x - b.x,
          a.y - b.y
        );

        if (distance < 120) {
          context.strokeStyle =
            `rgba(124,108,255,${(1 - distance / 120) * 0.35})`;

          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      const mouseDistance = Math.hypot(
        a.x - mouse.x,
        a.y - mouse.y
      );

      if (mouseDistance < 160) {
        context.strokeStyle =
          `rgba(255,155,106,${(1 - mouseDistance / 160) * 0.5})`;

        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(mouse.x, mouse.y);
        context.stroke();
      }
    }

    animationId = requestAnimationFrame(draw);
  }

  draw();
})();


/* ===== CLICK SPARKS ===== */
document.addEventListener('click', event => {
  if (reduce || !event.target.closest('.btn-solid, .fab')) {
    return;
  }

  for (let i = 0; i < 14; i++) {
    const spark = document.createElement('i');
    const angle = Math.random() * 6.283;
    const distance = 40 + Math.random() * 55;

    spark.className = 'spark';

    spark.style.cssText = `
      left:${event.clientX}px;
      top:${event.clientY}px;
      --dx:${Math.cos(angle) * distance}px;
      --dy:${Math.sin(angle) * distance}px;
      background:${i % 2 ? '#FF9B6A' : '#7C6CFF'};
    `;

    document.body.appendChild(spark);

    window.setTimeout(() => spark.remove(), 700);
  }
});


/* ===== CONTACT / LEAD FORM ===== */
(function () {
  const form = document.getElementById('leadForm');
  const note = document.getElementById('formNote');

  if (!form || !note) return;

  const button = form.querySelector('button[type="submit"]');

  if (!button) return;

  const say = (message, className) => {
    note.textContent = message;
    note.className = 'sm form-note ' + (className || '');
  };

  form.addEventListener('submit', async event => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);

    // Spam honeypot field
    if (formData.get('_gotcha')) return;

    if (FORM_ENDPOINT) {
      button.disabled = true;
      button.textContent = 'Sending...';
      say('');

      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            Accept: 'application/json'
          },
          body: formData
        });

        if (!response.ok) {
          throw new Error('Form submission failed');
        }

        form.reset();

        say(
          'Thank you! Your message is on its way. I will reply within a day.',
          'ok'
        );
      } catch (error) {
        say(
          'Could not send right now. Please email sj411692@gmail.com directly.',
          'err'
        );
      } finally {
        button.disabled = false;
        button.textContent = 'Send message';
      }
    } else {
      const body = `Hi Sneha,

${formData.get('msg')}

Name: ${formData.get('name')}
Email: ${formData.get('email')}
Looking for: ${formData.get('type')}`;

      const subject = 'Enquiry: ' + formData.get('type');

      window.location.href =
        `mailto:sj411692@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      say(
        'Opening your email app. If nothing opens, write to sj411692@gmail.com.',
        'ok'
      );
    }
  });
})();
