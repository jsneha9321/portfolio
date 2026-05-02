/* =====================
   PROJECT DATA
===================== */
const PROJECTS = [
  { name: "Carltrix",                  url: "carltrix.com",               href: "http://carltrix.com",                  icon: "🚗",  cat: "corporate"    },
  { name: "Design Lines Architects",   url: "designlinesarchitects.com",  href: "http://designlinesarchitects.com",     icon: "🏛️",  cat: "corporate"    },
  { name: "Ellex-i",                   url: "ellex-i.com",                href: "http://ellex-i.com",                   icon: "⚡",  cat: "tech"         },
  { name: "Essbee Agrotek",            url: "essbeeagrotek.in",           href: "http://essbeeagrotek.in",              icon: "🌾",  cat: "corporate"    },
  { name: "Ergoline",                  url: "ergoline.co.in",             href: "http://ergoline.co.in",                icon: "💼",  cat: "corporate"    },
  { name: "Golden Billet",             url: "goldenbillet.com",           href: "http://goldenbillet.com",              icon: "🥇",  cat: "corporate"    },
  { name: "IdeoBiz Technologies",      url: "ideobiztechnologies.com",    href: "http://ideobiztechnologies.com",       icon: "💡",  cat: "tech"         },
  { name: "Inbox Haircare",            url: "inboxhaircare.com",          href: "http://inboxhaircare.com",             icon: "💆",  cat: "ecommerce"    },
  { name: "Kale Indian Film Academy",  url: "kaleindianfilmacademy.com",  href: "http://kaleindianfilmacademy.com",     icon: "🎬",  cat: "education"    },
  { name: "Mass Coders",               url: "masscoders.com",             href: "http://masscoders.com",                icon: "👨‍💻",  cat: "tech"         },
  { name: "Made in Kannada",           url: "madeinkannada.com",          href: "http://madeinkannada.com",             icon: "🎭",  cat: "other"        },
  { name: "Outgo Cabs",                url: "outgocabs.com",              href: "http://outgocabs.com",                 icon: "🚕",  cat: "corporate"    },
  { name: "Public Document Service",   url: "publicdocumentsservice.com", href: "http://publicdocumentsservice.com",    icon: "📄",  cat: "other"        },
  { name: "VR 90 Stroop",              url: "vr90stroop.in",              href: "http://vr90stroop.in",                 icon: "🥤",  cat: "other"        },
  { name: "Windscape",                 url: "windscape.in",               href: "http://windscape.in",                  icon: "🌬️",  cat: "corporate"    },
  { name: "Tanu Silks",                url: "tanusilks.com",              href: "https://tanusilks.com/",               icon: "🪡",  cat: "ecommerce"    },
  { name: "Unique Guardz",             url: "uniqueguardz.com",           href: "https://uniqueguardz.com/",            icon: "🛡️",  cat: "corporate"    },
  { name: "Arishin",                   url: "arishin.in",                 href: "http://arishin.in/",                   icon: "🌿",  cat: "corporate"    },
  { name: "Play On Fit",               url: "playonfit.in",               href: "https://playonfit.in/",                icon: "🏋️",  cat: "other"        },
  { name: "Medical Education World",   url: "medicaleducationworld.com",  href: "https://medicaleducationworld.com/",   icon: "🏥",  cat: "education"    },
  { name: "Meghana Ventures",          url: "meghanaventures.in",         href: "https://meghanaventures.in/",          icon: "🏗️",  cat: "construction" },
  { name: "Abis Crystal Dig",          url: "abiscrystaldig.com",         href: "https://abiscrystaldig.com/",          icon: "💎",  cat: "ecommerce"    },
  { name: "Dhavala Studio",            url: "dhavalastudio.com",          href: "https://dhavalastudio.com/",           icon: "📸",  cat: "other"        },
  { name: "Mahatirtha Yatras",         url: "mahatirthayatras.com",       href: "https://mahatirthayatras.com/",        icon: "🛕",  cat: "other"        },
  { name: "IESC India",                url: "iescindia.com",              href: "https://iescindia.com/",               icon: "📚",  cat: "education"    },
  { name: "Group Unnati",              url: "groupunnati.com",            href: "https://groupunnati.com/",             icon: "🏢",  cat: "construction" },
  { name: "Sequent HR",                url: "sequenthr.in",               href: "https://sequenthr.in/",                icon: "👥",  cat: "corporate"    },
  { name: "Suraksha Construction",     url: "surakshaconstruction.in",    href: "https://surakshaconstruction.in/",     icon: "🔧",  cat: "construction" },
  { name: "Shantha Ventures",          url: "shanthaventures.com",        href: "https://shanthaventures.com/",         icon: "🏗️",  cat: "construction" },
  { name: "Shanthatech",               url: "shanthatech.com",            href: "https://www.shanthatech.com/",         icon: "💻",  cat: "tech"         },
  { name: "Avana Electro Systems",     url: "avanaelectrosystems.com",    href: "https://avanaelectrosystems.com/",     icon: "⚙️",  cat: "tech"         },
  { name: "Laratech",                  url: "laratech.in",                href: "https://laratech.in/",                 icon: "🔬",  cat: "tech"         },
];

const CAT_LABELS = {
  all:          "All",
  corporate:    "Corporate",
  ecommerce:    "E-Commerce",
  tech:         "Tech",
  education:    "Education",
  construction: "Construction",
  other:        "Other"
};

/* =====================
   RENDER PROJECT CARDS
===================== */
function renderCards(cat) {
  const grid  = document.getElementById('projGrid');
  const count = document.getElementById('projCount');

  const list = (cat === 'all')
    ? PROJECTS
    : PROJECTS.filter(p => p.cat === cat);

  const label = (cat !== 'all') ? ' &mdash; ' + CAT_LABELS[cat] : '';
  count.innerHTML = `<strong>${list.length}</strong> live website${list.length !== 1 ? 's' : ''}${label}`;

  grid.innerHTML = list.map(p => `
    <div class="proj-card">
      <div class="proj-thumb">
        <span>${p.icon}</span>
        <div class="proj-thumb-overlay"></div>
      </div>
      <div class="proj-body">
        <div class="proj-name" title="${p.name}">${p.name}</div>
        <div class="proj-url">${p.url}</div>
        <span class="proj-cat">${CAT_LABELS[p.cat]}</span>
        <a href="${p.href}" target="_blank" rel="noopener" class="proj-link">Visit site →</a>
      </div>
    </div>
  `).join('');
}

/* =====================
   FILTER TABS
===================== */
document.getElementById('filterTabs').addEventListener('click', function (e) {
  const btn = e.target.closest('.ftab');
  if (!btn) return;
  this.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderCards(btn.dataset.cat);
});

/* Initial render */
renderCards('all');

/* =====================
   MOBILE HAMBURGER
===================== */
const hamburger = document.getElementById('hamburger');
const mainNav   = document.getElementById('mainNav');

hamburger.addEventListener('click', function () {
  mainNav.classList.toggle('open');
  /* Animate hamburger to X */
  const spans = this.querySelectorAll('span');
  this.classList.toggle('is-open');
  if (this.classList.contains('is-open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

/* Close nav on link click */
mainNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mainNav.classList.remove('open');
    hamburger.classList.remove('is-open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  });
});

/* =====================
   SCROLL REVEAL
   (IntersectionObserver)
===================== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =====================
   ACTIVE NAV HIGHLIGHT
   on scroll
===================== */
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));
