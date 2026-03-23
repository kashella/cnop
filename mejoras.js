/* ============================================================
   CNOP YUCATÁN — mejoras.js  (SOLO MÓVIL)
   Solo corre en pantallas ≤ 768px.
   En escritorio no hace absolutamente nada.
   ============================================================ */

(function () {
  "use strict";

  // Salir inmediatamente si es escritorio
  if (window.innerWidth > 768) return;

  // ── Scroll Reveal ────────────────────────────────────────
  function initScrollReveal() {
    var selectores = [
      ".section-header",
      ".service-card",
      ".news-card",
      ".media-card",
      ".team-card",
      ".program-card",
      ".management-card",
      ".rjp-card",
      ".agenda-item",
      ".history-photo",
      ".feature",
      ".contact-item",
      ".affiliation-action-card",
      ".affiliation-benefits-card",
      ".youth-item",
    ];

    selectores.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el, i) {
        if (!el.classList.contains("reveal")) {
          el.classList.add("reveal");
          var delay = Math.min(i % 3, 2);
          if (delay > 0) el.classList.add("reveal-delay-" + delay);
        }
      });
    });

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal")
        .forEach(function (el) { el.classList.add("visible"); });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

    document.querySelectorAll(".reveal")
      .forEach(function (el) { obs.observe(el); });
  }

  // ── Init ──────────────────────────────────────────────────
  function init() {
    // Re-verificar tamaño de pantalla (por si rotaron)
    if (window.innerWidth > 768) return;
    initScrollReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Si rotan a horizontal y ya es escritorio, no hacer nada
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      document.querySelectorAll(".reveal")
        .forEach(function (el) {
          el.classList.add("visible");
          el.style.opacity = "";
          el.style.transform = "";
        });
    }
  });

})();
