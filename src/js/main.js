// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  initializeNavbar();
  initializeCarousel();
  initializeScrollEffects();
  initializeModals();
  initializeSmoothScrolling();
  initializeContactForm();
  addScrollAnimations();
  initializeVideo();
});

// --- Navbar / Progress / Active Links ---
function initializeNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const progressBar = document.getElementById('progressBar');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const progress = (scrolled / (docHeight - windowHeight)) * 100;

    if (progressBar) progressBar.style.width = progress + '%';

    if (scrolled > 100) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    
  const navbarHeight = navbar.getBoundingClientRect().height;
  let current = '';

  document.querySelectorAll('section[id]').forEach(sec => {
    const top = sec.offsetTop - navbarHeight - 1; 
    const h = sec.offsetHeight;
    if (scrolled >= top && scrolled < top + h) current = sec.id;
  });

  
  if (window.innerHeight + scrolled >= docHeight - 2) {
    const last = document.querySelector('section[id]:last-of-type');
    if (last) current = last.id;
  }

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
  
  });
}

// --- Carousel (translateX layout) ---
let carouselEl = null;
let slides = [];
let slideIndex = 0;

function initializeCarousel() {
  carouselEl = document.getElementById('servicesCarousel');
  if (!carouselEl) return;

  slides = Array.from(carouselEl.querySelectorAll('.carousel-slide'));
  if (!slides.length) return;

  showSlide(0);

  const prevBtn = document.querySelector('.carousel-btn.prev-btn');
  const nextBtn = document.querySelector('.carousel-btn.next-btn');
  if (prevBtn) prevBtn.addEventListener('click', () => changeSlide(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => changeSlide(1));

  setInterval(() => changeSlide(1), 5000);
}

function showSlide(index) {
  if (!slides.length || !carouselEl) return;
  slideIndex = (index + slides.length) % slides.length;
  const offset = -slideIndex * 100;
  carouselEl.style.transform = `translateX(${offset}%)`;
}

function changeSlide(delta) { showSlide(slideIndex + delta); }

// --- Intersection-based fade-ups ---
function initializeScrollEffects() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.section, .team-member, .service-card').forEach(el => observer.observe(el));
}

// --- Modals ---
function initializeModals() {
  document.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) closeModal(e.target.id);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const open = document.querySelector('.modal.show');
      if (open) closeModal(open.id);
    }
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.classList.add('show'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.classList.remove('show'); document.body.style.overflow = 'auto'; }
}

// --- Smooth scroll anchors ---
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// --- Contact form ---
function initializeContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    form.reset();
  });
}

// --- Animate on scroll  ---

function addScrollAnimations() {
  const targets = document.querySelectorAll('.hero-content, .section-title, .team-member, .service-card');

  
  targets.forEach(el => el.classList.add('will-animate'));

 
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('did-animate');
        
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => obs.observe(el));
}

// --- Background video autoplay assist ---
function initializeVideo() {
  const video = document.querySelector('.demo-video');
  if (!video) return;
  const tryPlay = () => video.play?.().catch(() => {});
  tryPlay();
  window.addEventListener('click', tryPlay, { once: true });
}

window.openModal = openModal;
window.closeModal = closeModal;