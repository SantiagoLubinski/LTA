document.getElementById('year').textContent = new Date().getFullYear();

const menu = document.getElementById('menu');
const menuToggle = document.getElementById('menuToggle');
const menuDropdown = document.getElementById('menuDropdown');

function closeMenu() {
  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

menuDropdown.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (event) => {
  if (!menu.contains(event.target)) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

// Hero background photo carousel
const heroSlides = document.querySelectorAll('.hero-slide');
if (heroSlides.length) {
  let currentSlide = 0;
  setInterval(() => {
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
  }, 10000);
}

// El hero ocupa exactamente el resto de la pantalla debajo del header,
// para que al cargar la página solo se vea el Inicio.
function sizeHero() {
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  if (header && hero) {
    hero.style.minHeight = `calc(100vh - ${header.offsetHeight}px)`;
  }
}
sizeHero();
window.addEventListener('resize', sizeHero);

// Scroll reveal: sections fade/slide in as they enter, fade out as they pass above
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      entry.target.classList.remove('out-view');
    } else {
      entry.target.classList.remove('in-view');
      if (entry.boundingClientRect.top < 0) {
        entry.target.classList.add('out-view');
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Áreas de práctica: contenido de cada modal
const areasData = {
  societario: {
    title: 'Societario y corporativo',
    general: 'Asesoramos a empresas y accionistas en la estructuración, gobierno y funcionamiento de sociedades, acompañando decisiones societarias complejas con una mirada práctica y de largo plazo.',
    items: [
      { name: 'Derecho societario y gobierno corporativo', desc: 'Diseño de estructuras societarias, estatutos, acuerdos de accionistas y políticas de gobierno corporativo adaptadas a cada negocio.' },
      { name: 'Derecho corporativo', desc: 'Asesoramiento integral en fusiones, adquisiciones, reorganizaciones societarias y operaciones de capital.' },
      { name: 'Conflictos societarios', desc: 'Representación en disputas entre socios y accionistas, y en procesos de resolución de conflictos internos.' }
    ]
  },
  regulatorio: {
    title: 'Regulatorio',
    general: 'Acompañamos a empresas frente a los organismos de control, anticipando el impacto regulatorio de cada decisión de negocio.',
    items: [
      { name: 'Derecho administrativo y regulatorio', desc: 'Asesoramiento ante procedimientos administrativos, licencias, permisos y relación con la administración pública.' },
      { name: 'Regulatorio CNV', desc: 'Asistencia en el cumplimiento de la normativa de la Comisión Nacional de Valores para emisores y participantes del mercado de capitales.' },
      { name: 'Regulatorio BCRA', desc: 'Asesoramiento en materia de regulación cambiaria y financiera ante el Banco Central de la República Argentina.' }
    ]
  },
  competencia: {
    title: 'Competencia y consumo',
    general: 'Asistimos a empresas en su relación con el derecho de la competencia y de defensa del consumidor, dos áreas cada vez más relevantes en la operación diaria de los negocios.',
    items: [
      { name: 'Defensa de la competencia', desc: 'Asesoramiento en operaciones de concentración económica, investigaciones y cumplimiento normativo en materia de competencia.' },
      { name: 'Defensa del consumidor', desc: 'Asistencia en el cumplimiento de la normativa de protección al consumidor y en procedimientos ante los organismos de aplicación.' }
    ]
  },
  compliance: {
    title: 'Compliance y penal económico',
    general: 'Ayudamos a las empresas a prevenir y gestionar riesgos legales y reputacionales vinculados al cumplimiento normativo y a la exposición penal económica.',
    items: [
      { name: 'Compliance UIF / PLA-FT', desc: 'Diseño e implementación de programas de prevención de lavado de activos y financiamiento del terrorismo conforme a la normativa de la UIF.' },
      { name: 'Penal económico', desc: 'Defensa y asesoramiento preventivo en cuestiones de derecho penal económico y responsabilidad de directivos y empresas.' }
    ]
  },
  energia: {
    title: 'Energía y recursos naturales',
    general: 'Acompañamos proyectos y operaciones en los sectores de energía e hidrocarburos, con conocimiento del marco regulatorio específico de cada actividad.',
    items: [
      { name: 'Energía (electricidad)', desc: 'Asesoramiento en generación, transporte y distribución de energía eléctrica, y en el marco regulatorio del sector.' },
      { name: 'Petróleo y gas', desc: 'Asistencia en contratos, permisos y operaciones vinculadas a la exploración, producción y comercialización de petróleo y gas.' }
    ]
  },
  litigios: {
    title: 'Litigios y situaciones de crisis',
    general: 'Representamos a nuestros clientes en instancias de litigio y los acompañamos en la gestión de situaciones de crisis, con foco en soluciones concretas.',
    items: [
      { name: 'Litigios', desc: 'Representación en procesos judiciales y arbitrales, civiles y comerciales.' },
      { name: 'Reestructuración de deuda e insolvencia', desc: 'Asesoramiento en procesos de reestructuración de deuda, concursos y quiebras.' }
    ]
  }
};

const areaModal = document.getElementById('areaModal');
const modalTitle = document.getElementById('modalTitle');
const modalGeneral = document.getElementById('modalGeneral');
const modalItems = document.getElementById('modalItems');
const modalClose = document.getElementById('modalClose');

function openAreaModal(key) {
  const data = areasData[key];
  if (!data) return;
  modalTitle.textContent = data.title;
  modalGeneral.textContent = data.general;
  modalItems.innerHTML = '';
  data.items.forEach(item => {
    const dt = document.createElement('dt');
    dt.textContent = item.name;
    const dd = document.createElement('dd');
    dd.textContent = item.desc;
    modalItems.appendChild(dt);
    modalItems.appendChild(dd);
  });
  areaModal.classList.add('open');
  areaModal.setAttribute('aria-hidden', 'false');
}

function closeAreaModal() {
  areaModal.classList.remove('open');
  areaModal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.area-card').forEach(card => {
  card.addEventListener('click', () => openAreaModal(card.dataset.area));
});

modalClose.addEventListener('click', closeAreaModal);

areaModal.addEventListener('click', (event) => {
  if (event.target === areaModal) closeAreaModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeAreaModal();
});

// Formulario de contacto (Formspree)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  formStatus.textContent = 'Enviando...';
  formStatus.className = 'form-status';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' }
    });

    if (response.ok) {
      formStatus.textContent = 'Mensaje enviado. Gracias por escribirnos.';
      formStatus.className = 'form-status success';
      contactForm.reset();
    } else {
      formStatus.textContent = 'No pudimos enviar el mensaje. Probá de nuevo o escribinos por mail.';
      formStatus.className = 'form-status error';
    }
  } catch (err) {
    formStatus.textContent = 'No pudimos enviar el mensaje. Probá de nuevo o escribinos por mail.';
    formStatus.className = 'form-status error';
  }
});
