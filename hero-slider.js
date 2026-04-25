/* ═══════════════════════════════════════════════════════════
   JAVASCRIPT DEL HERO SLIDER
   Compatible con tus controles onclick
   ═══════════════════════════════════════════════════════════ */

// Variables globales
let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dots span');
let heroAutoplayInterval;

// Función para mostrar un slide específico
function goHero(index) {
  // Remover active de todos
  heroSlides.forEach(slide => slide.classList.remove('active'));
  heroDots.forEach(dot => dot.classList.remove('active'));

  // Ajustar índice si se sale del rango
  if (index >= heroSlides.length) index = 0;
  if (index < 0) index = heroSlides.length - 1;

  // Activar el slide actual
  currentHeroSlide = index;
  heroSlides[currentHeroSlide].classList.add('active');
  heroDots[currentHeroSlide].classList.add('active');
}

// Función para siguiente slide
function nextHero() {
  goHero(currentHeroSlide + 1);
  resetHeroAutoplay();
}

// Función para slide anterior
function prevHero() {
  goHero(currentHeroSlide - 1);
  resetHeroAutoplay();
}

// Autoplay (cambiar cada 5 segundos)
function startHeroAutoplay() {
  heroAutoplayInterval = setInterval(nextHero, 5000);
}

function resetHeroAutoplay() {
  clearInterval(heroAutoplayInterval);
  startHeroAutoplay();
}

// Pausar autoplay al hacer hover
const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
  heroSlider.addEventListener('mouseenter', () => {
    clearInterval(heroAutoplayInterval);
  });

  heroSlider.addEventListener('mouseleave', () => {
    startHeroAutoplay();
  });
}

// Soporte para swipe en móviles
let heroTouchStartX = 0;
let heroTouchEndX = 0;

if (heroSlider) {
  heroSlider.addEventListener('touchstart', (e) => {
    heroTouchStartX = e.changedTouches[0].screenX;
  });

  heroSlider.addEventListener('touchend', (e) => {
    heroTouchEndX = e.changedTouches[0].screenX;
    handleHeroSwipe();
  });
}

function handleHeroSwipe() {
  if (heroTouchEndX < heroTouchStartX - 50) {
    // Swipe left
    nextHero();
  }
  if (heroTouchEndX > heroTouchStartX + 50) {
    // Swipe right
    prevHero();
  }
}

// Iniciar autoplay cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
  startHeroAutoplay();
});

// Control con flechas del teclado
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') {
    prevHero();
  } else if (e.key === 'ArrowRight') {
    nextHero();
  }
});
