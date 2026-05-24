// ===== HEADER SCROLL =====
const header = document.getElementById('header');
const onScroll = () => {
  if (window.scrollY > 40) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
let menuOpen = false;

hamburger?.addEventListener('click', () => {
  menuOpen = !menuOpen;
  hamburger.classList.toggle('open', menuOpen);
  nav.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
});

// Close on nav link click
nav?.querySelectorAll('.nav-link, .btn-header').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    hamburger?.classList.remove('open');
    nav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (menuOpen && !nav?.contains(e.target) && !hamburger?.contains(e.target)) {
    menuOpen = false;
    hamburger?.classList.remove('open');
    nav?.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
reveals.forEach(el => observer.observe(el));

// ===== ACTIVE NAV =====
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  link.classList.toggle('active', href === currentPage || (currentPage === '' && href === 'index.html'));
});

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = form.querySelector('[name="name"]')?.value.trim();
  const phone = form.querySelector('[name="phone"]')?.value.trim();
  const message = form.querySelector('[name="message"]')?.value.trim();
  const successMsg = document.getElementById('formSuccess');
  const errorMsg = document.getElementById('formError');
  if (successMsg) successMsg.className = 'form-msg';
  if (errorMsg) errorMsg.className = 'form-msg';

  if (!name || !phone || !message) {
    if (errorMsg) { errorMsg.textContent = 'Por favor completa todos los campos requeridos.'; errorMsg.className = 'form-msg error'; }
    return;
  }

  const btn = form.querySelector('[type="submit"]');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  // Simulate sending (replace with real endpoint if needed)
  await new Promise(r => setTimeout(r, 1200));
  btn.textContent = 'Enviar solicitud';
  btn.disabled = false;
  if (successMsg) { successMsg.textContent = '¡Solicitud enviada! Cristina Franco te contactará pronto.'; successMsg.className = 'form-msg success'; }
  form.reset();
});
