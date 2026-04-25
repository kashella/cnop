/* ═══════════════════════════════════════════════════════════
   HERO SLIDER - JavaScript
   Yucatán al Minuto Style
   ═══════════════════════════════════════════════════════════ */

const heroSlider = {
  currentSlide: 0,
  slides: null,
  dots: null,
  interval: null,

  // Inicializar el slider
  init() {
    this.slides = document.querySelectorAll('.hero-slide');
    this.dots = document.querySelectorAll('.hero-dot');
    
    if (this.slides.length === 0) {
      console.warn('No se encontraron slides del hero');
      return;
    }

    this.startAutoplay();
    this.setupSwipe();
    this.setupHoverPause();
    this.setupKeyboard();
  },

  // Ir a un slide específico
  goTo(index) {
    if (index >= this.slides.length) index = 0;
    if (index < 0) index = this.slides.length - 1;

    // Remover active de todos
    this.slides.forEach(slide => slide.classList.remove('active'));
    this.dots.forEach(dot => dot.classList.remove('active'));

    // Activar el slide actual
    this.currentSlide = index;
    this.slides[this.currentSlide].classList.add('active');
    if (this.dots[this.currentSlide]) {
      this.dots[this.currentSlide].classList.add('active');
    }

    this.resetAutoplay();
  },

  // Siguiente slide
  next() {
    this.goTo(this.currentSlide + 1);
  },

  // Slide anterior
  prev() {
    this.goTo(this.currentSlide - 1);
  },

  // Iniciar autoplay
  startAutoplay() {
    this.interval = setInterval(() => this.next(), 5000);
  },

  // Reiniciar autoplay
  resetAutoplay() {
    clearInterval(this.interval);
    this.startAutoplay();
  },

  // Pausar autoplay al hacer hover
  setupHoverPause() {
    const slider = document.querySelector('.hero-slider');
    if (slider) {
      slider.addEventListener('mouseenter', () => {
        clearInterval(this.interval);
      });

      slider.addEventListener('mouseleave', () => {
        this.startAutoplay();
      });
    }
  },

  // Configurar swipe en móviles
  setupSwipe() {
    const slider = document.querySelector('.hero-slider');
    let touchStartX = 0;
    let touchEndX = 0;

    if (slider) {
      slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe(touchStartX, touchEndX);
      }, { passive: true });
    }
  },

  // Manejar el swipe
  handleSwipe(startX, endX) {
    const swipeThreshold = 50;
    
    if (endX < startX - swipeThreshold) {
      // Swipe left (siguiente)
      this.next();
    }
    if (endX > startX + swipeThreshold) {
      // Swipe right (anterior)
      this.prev();
    }
  },

  // Configurar navegación con teclado
  setupKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prev();
      } else if (e.key === 'ArrowRight') {
        this.next();
      }
    });
  },

  // Destruir el slider (útil para limpieza)
  destroy() {
    clearInterval(this.interval);
    this.slides = null;
    this.dots = null;
  }
};

// Inicializar cuando cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
  heroSlider.init();
});

// También puedes inicializar manualmente si es necesario
// heroSlider.init();