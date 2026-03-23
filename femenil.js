// ============================================================
//  FRENTE FEMENIL — JavaScript (femenil.js)
// ============================================================
(function () {

  // ── Lucide + header ──────────────────────────────────────
  if (window.lucide) lucide.createIcons();

  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  var mt = document.getElementById('mobileToggle');
  var nm = document.getElementById('navMenu');
  if (mt && nm) {
    mt.addEventListener('click', function () { nm.classList.toggle('active'); });
    document.querySelectorAll('.nav-menu a').forEach(function (l) {
      l.addEventListener('click', function () { nm.classList.remove('active'); });
    });
  }

  // ── Scroll reveal ────────────────────────────────────────
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });

  // ── Nav interna sticky ───────────────────────────────────
  var navFF = document.getElementById('navFF');
  if (navFF) {
    window.addEventListener('scroll', function () {
      navFF.classList.toggle('nav-ff-scrolled', window.scrollY > 120);
    });
  }

  // ── FAQ accordion ────────────────────────────────────────
  window.toggleFaq = function (el) {
    var isOpen = el.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
    if (!isOpen) el.classList.add('open');
    if (window.lucide) lucide.createIcons();
  };

  // ── Galería lightbox ─────────────────────────────────────
  var galeriaItems = Array.from(document.querySelectorAll('.gal-item'));
  var lightbox     = document.getElementById('ffLightbox');
  var lbImg        = document.getElementById('lbImg');
  var lbCap        = document.getElementById('lbCap');
  var lbIdx        = 0;

  galeriaItems.forEach(function (item, i) {
    item.addEventListener('click', function () {
      lbIdx = i;
      abrirLb(i);
    });
  });

  function abrirLb(i) {
    var item = galeriaItems[i];
    var src  = item.dataset.src  || '';
    var cap  = item.dataset.cap  || '';
    if (lbImg) {
      if (src) {
        lbImg.style.display = 'block';
        lbImg.src = src;
      } else {
        // Placeholder cuando no hay foto
        lbImg.style.display = 'none';
      }
    }
    if (lbCap) lbCap.textContent = cap;
    if (lightbox) { lightbox.classList.add('abierto'); document.body.style.overflow = 'hidden'; }
  }

  window.cerrarLb = function () {
    if (lightbox) { lightbox.classList.remove('abierto'); document.body.style.overflow = ''; }
  };
  window.lbPrev = function () { lbIdx = (lbIdx - 1 + galeriaItems.length) % galeriaItems.length; abrirLb(lbIdx); };
  window.lbNext = function () { lbIdx = (lbIdx + 1) % galeriaItems.length; abrirLb(lbIdx); };

  document.addEventListener('keydown', function (e) {
    if (!lightbox || !lightbox.classList.contains('abierto')) return;
    if (e.key === 'Escape')     cerrarLb();
    if (e.key === 'ArrowLeft')  lbPrev();
    if (e.key === 'ArrowRight') lbNext();
  });

  // ── Contador animado ─────────────────────────────────────
  function animarContador(el) {
    var target = parseInt(el.dataset.target || '0', 10);
    var dur    = 1800;
    var step   = 16;
    var steps  = dur / step;
    var inc    = target / steps;
    var cur    = 0;
    var timer  = setInterval(function () {
      cur += inc;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = Math.floor(cur).toLocaleString();
    }, step);
  }

  var contObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        animarContador(e.target);
        contObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.impacto-num[data-target]').forEach(function (el) {
    contObs.observe(el);
  });

}());
