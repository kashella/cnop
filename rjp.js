// ============================================================
//  RED DE JÓVENES POPULARES — rjp.js
// ============================================================
(function () {

  if (window.lucide) lucide.createIcons();

  // ── Header ───────────────────────────────────────────────
  var header = document.getElementById('header');
  if (header) window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
  var mt = document.getElementById('mobileToggle'), nm = document.getElementById('navMenu');
  if (mt && nm) {
    mt.addEventListener('click', function () { nm.classList.toggle('active'); });
    document.querySelectorAll('.nav-menu a').forEach(function (l) {
      l.addEventListener('click', function () { nm.classList.remove('active'); });
    });
  }

  // ── Nav interna sticky ───────────────────────────────────
  var navRJP = document.getElementById('navRJP');
  if (navRJP) window.addEventListener('scroll', function () {
    navRJP.classList.toggle('scrolled', window.scrollY > 120);
  });

  // ── Scroll reveal ────────────────────────────────────────
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });

  // ── FAQ ──────────────────────────────────────────────────
  window.toggleFaqRJP = function (el) {
    var open = el.classList.contains('open');
    document.querySelectorAll('.rjp-faq-item').forEach(function (i) { i.classList.remove('open'); });
    if (!open) el.classList.add('open');
    if (window.lucide) lucide.createIcons();
  };

  // ── Contadores animados ──────────────────────────────────
  function animCount(el) {
    var target = parseInt(el.dataset.target || '0', 10);
    var steps = 60, cur = 0, inc = target / steps;
    var t = setInterval(function () {
      cur += inc; if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = Math.floor(cur).toLocaleString();
    }, 20);
  }
  var cObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { animCount(e.target); cObs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('.rjp-imp-num[data-target]').forEach(function (el) { cObs.observe(el); });

  // ── Galería lightbox ─────────────────────────────────────
  var items  = Array.from(document.querySelectorAll('.rjp-gal-item'));
  var lb     = document.getElementById('rjpLightbox');
  var lbMedia= document.getElementById('rjpLbMedia');
  var lbCap  = document.getElementById('rjpLbCap');
  var lbIdx  = 0;

  items.forEach(function (item, i) {
    item.addEventListener('click', function () { lbIdx = i; abrirLb(i); });
  });

  function abrirLb(i) {
    var item = items[i];
    var src  = item.dataset.src || '';
    var cap  = item.dataset.cap || '';
    var tipo = item.dataset.tipo || 'img';
    if (lbMedia && src) {
      if (tipo === 'video') {
        lbMedia.innerHTML = '<video controls autoplay style="max-width:100%;max-height:72vh;border-radius:14px;"><source src="' + src + '" type="video/mp4"></video>';
      } else {
        lbMedia.innerHTML = '<img src="' + src + '" alt="' + cap + '" style="max-width:100%;max-height:72vh;border-radius:14px;object-fit:contain;">';
      }
    } else if (lbMedia) {
      lbMedia.innerHTML = '<div style="width:400px;height:300px;background:#2a2a2a;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:60px;">' + (item.querySelector('.rjp-gal-ph') ? item.querySelector('.rjp-gal-ph').textContent.trim() : '') + '</div>';
    }
    if (lbCap) lbCap.textContent = cap;
    if (lb) { lb.classList.add('abierto'); document.body.style.overflow = 'hidden'; }
  }

  window.cerrarRjpLb = function () { if (lb) { lb.classList.remove('abierto'); document.body.style.overflow = ''; if (lbMedia) lbMedia.innerHTML = ''; } };
  window.rjpLbPrev   = function () { lbIdx = (lbIdx - 1 + items.length) % items.length; abrirLb(lbIdx); };
  window.rjpLbNext   = function () { lbIdx = (lbIdx + 1) % items.length; abrirLb(lbIdx); };

  document.addEventListener('keydown', function (e) {
    if (!lb || !lb.classList.contains('abierto')) return;
    if (e.key === 'Escape')     cerrarRjpLb();
    if (e.key === 'ArrowLeft')  rjpLbPrev();
    if (e.key === 'ArrowRight') rjpLbNext();
  });

  // ── Filtro galería ───────────────────────────────────────
  document.querySelectorAll('.rjp-gal-fil').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.rjp-gal-fil').forEach(function (b) { b.classList.remove('activo'); });
      btn.classList.add('activo');
      var cat = btn.dataset.cat;
      items.forEach(function (item) {
        item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
      });
    });
  });

}());


document.getElementById("mobileToggle")
  .addEventListener("click", function() {
    document.getElementById("navMenu")
      .classList.toggle("active");
  });