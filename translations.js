/* ═══════════════════════════════════════════════════════════
   SISTEMA DE TRADUCCIÓN ESPAÑOL-MAYA
   CNOP Yucatán - Luxecita
   ═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ═══ DICCIONARIO COMPLETO DE TRADUCCIONES ═══
  const translations = {
    es: {
      // ─── Navegación ───
      'nav.inicio': 'Inicio',
      'nav.nosotros': 'Nosotros',
      'nav.afiliacion': 'Afiliación',
      'nav.programas': 'Programas',
      'nav.eventos': 'Eventos',
      'nav.noticias': 'Noticias',
      'nav.contacto': 'Contacto',
      'nav.cedusi': 'CEUSI',
      
      // ─── Hero / Banner Principal ───
      'hero.welcome': 'Bienvenidos a',
      'hero.title': 'CNOP Yucatán',
      'hero.subtitle': 'Confederación Nacional de Organizaciones Populares',
      'hero.slogan': 'Unidos por Yucatán, comprometidos con nuestra gente',
      'hero.cta': 'Afiliarme Ahora',
      'hero.cta2': 'Conocer Más',
      
      // ─── Sobre Nosotros ───
      'about.title': '¿Quiénes Somos?',
      'about.subtitle': 'Nuestra Historia',
      'about.founded': 'Fundada el 28 de febrero de 1943',
      'about.description': 'Somos uno de los tres sectores del PRI, representando a la clase popular organizada de México.',
      'about.mission': 'Nuestra Misión',
      'about.vision': 'Nuestra Visión',
      'about.values': 'Nuestros Valores',
      
      // ─── Liderazgo ───
      'leaders.title': 'Nuestros Líderes',
      'leaders.national': 'Presidente Nacional PRI',
      'leaders.alito': 'Alejandro "Alito" Moreno Cárdenas',
      'leaders.secretary': 'Secretario General CNOP Yucatán',
      'leaders.eloy': 'Eloy Quiroz',
      
      // ─── Afiliación ───
      'affiliate.title': '¿Cómo Afiliarse?',
      'affiliate.subtitle': 'Únete a la familia CNOP',
      'affiliate.free': '¡Completamente GRATIS!',
      'affiliate.step1.title': 'Paso 1',
      'affiliate.step1.desc': 'Trae tu INE vigente',
      'affiliate.step2.title': 'Paso 2',
      'affiliate.step2.desc': 'Comprobante de domicilio',
      'affiliate.step3.title': 'Paso 3',
      'affiliate.step3.desc': '2 fotografías tamaño infantil',
      'affiliate.online': 'Afiliación en Línea',
      'affiliate.presential': 'Afiliación Presencial',
      'affiliate.button': 'Iniciar Afiliación',
      'affiliate.requirements': 'Requisitos',
      'affiliate.process': 'Proceso',
      'affiliate.benefits': 'Beneficios al Afiliarte',
      
      // ─── Programas ───
      'programs.title': 'Nuestros Programas',
      'programs.subtitle': 'Te apoyamos en lo que necesites',
      'programs.education': 'Educación',
      'programs.education.desc': 'CEUSI San Isidro - Bachillerato, Licenciaturas, Maestrías y Doctorados',
      'programs.health': 'Salud',
      'programs.health.desc': 'Jornadas médicas gratuitas y brigadas de salud',
      'programs.training': 'Capacitación',
      'programs.training.desc': 'Talleres de oficios y emprendimiento',
      'programs.social': 'Gestión Social',
      'programs.social.desc': 'Te ayudamos con trámites y necesidades comunitarias',
      'programs.women': 'Frente Femenil',
      'programs.women.desc': 'Empoderamiento y liderazgo de la mujer yucateca',
      'programs.youth': 'Red de Jóvenes Populares',
      'programs.youth.desc': 'Formación política y servicio comunitario',
      
      // ─── CEUSI ───
      'ceusi.title': 'CEUSI San Isidro',
      'ceusi.subtitle': 'Centro Educativo Universitario',
      'ceusi.offer': 'Oferta Educativa 2025-2026',
      'ceusi.highschool': 'Bachillerato',
      'ceusi.degree': 'Licenciaturas',
      'ceusi.masters': 'Maestrías',
      'ceusi.doctorate': 'Doctorados',
      'ceusi.online': 'Modalidad en Línea',
      'ceusi.official': 'Validez Oficial SEP',
      'ceusi.info': 'Más Información',
      
      // ─── Eventos ───
      'events.title': 'Próximos Eventos',
      'events.subtitle': 'No te pierdas nuestras actividades',
      'events.date': 'Fecha',
      'events.time': 'Hora',
      'events.location': 'Lugar',
      'events.register': 'Registrarse',
      'events.more': 'Ver Todos los Eventos',
      
      // ─── Noticias ───
      'news.title': 'Últimas Noticias',
      'news.subtitle': 'Mantente informado',
      'news.read': 'Leer Más',
      'news.recent': 'Recientes',
      'news.all': 'Ver Todas las Noticias',
      
      // ─── Contacto ───
      'contact.title': 'Contáctanos',
      'contact.subtitle': 'Estamos para servirte',
      'contact.address': 'Dirección',
      'contact.address.text': 'Calle 60 #495 entre 59 y 61, Centro, Mérida, Yucatán',
      'contact.phone': 'Teléfono',
      'contact.email': 'Correo Electrónico',
      'contact.schedule': 'Horario de Atención',
      'contact.schedule.text': 'Lunes a Viernes, 9:00 AM - 5:00 PM',
      'contact.social': 'Redes Sociales',
      'contact.facebook': 'Facebook',
      'contact.instagram': 'Instagram',
      'contact.message': 'Envíanos un mensaje',
      
      // ─── Formularios ───
      'form.name': 'Nombre completo',
      'form.email': 'Correo electrónico',
      'form.phone': 'Teléfono',
      'form.message': 'Mensaje',
      'form.subject': 'Asunto',
      'form.send': 'Enviar',
      'form.sending': 'Enviando...',
      'form.success': '¡Mensaje enviado!',
      'form.error': 'Error al enviar',
      
      // ─── Botones Comunes ───
      'btn.more': 'Ver Más',
      'btn.less': 'Ver Menos',
      'btn.download': 'Descargar',
      'btn.register': 'Registrarse',
      'btn.learn': 'Conocer Más',
      'btn.join': 'Únete',
      'btn.back': 'Volver',
      'btn.next': 'Siguiente',
      'btn.previous': 'Anterior',
      
      // ─── Footer ───
      'footer.about': 'Sobre CNOP',
      'footer.links': 'Enlaces Rápidos',
      'footer.contact': 'Contacto',
      'footer.social': 'Síguenos',
      'footer.rights': 'Todos los derechos reservados',
      'footer.privacy': 'Política de Privacidad',
      'footer.terms': 'Términos y Condiciones',
      
      // ─── Otros ───
      'common.loading': 'Cargando...',
      'common.search': 'Buscar',
      'common.close': 'Cerrar',
      'common.menu': 'Menú',
    },
    
    // ═══════════════════════════════════════════════
    // TRADUCCIONES AL MAYA YUCATECO
    // ═══════════════════════════════════════════════
    maya: {
      // ─── Navegación ───
      'nav.inicio': 'Káajal',
      'nav.nosotros': 'To\'on',
      'nav.afiliacion': 'Síijil',
      'nav.programas': 'Meyajo\'ob',
      'nav.eventos': 'K\'iino\'ob',
      'nav.noticias': 'Tsikbalo\'ob',
      'nav.contacto': 'T\'aan',
      'nav.cedusi': 'CEUSI',
      
      // ─── Hero / Banner Principal ───
      'hero.welcome': 'Kíimak óol tech',
      'hero.title': 'CNOP Yucatán',
      'hero.subtitle': 'U Confederación Nacional ti\' Organizaciones Populares',
      'hero.slogan': 'Juntúul yéetel Yucatán, comprometidos yéetel k máako\'on',
      'hero.cta': 'Síijil Bejla\'e\'',
      'hero.cta2': 'Ka\'a u Na\'atik',
      
      // ─── Sobre Nosotros ───
      'about.title': 'Max to\'on?',
      'about.subtitle': 'K Taanilil',
      'about.founded': 'Siiják 28 febrero 1943',
      'about.description': 'To\'on juntúul tu yóox sectores PRI, ku representar le clase popular organizada México.',
      'about.mission': 'K Misión',
      'about.vision': 'K Visión',
      'about.values': 'K Valores',
      
      // ─── Liderazgo ───
      'leaders.title': 'K Jach Najilo\'ob',
      'leaders.national': 'Presidente Nacional PRI',
      'leaders.alito': 'Alejandro "Alito" Moreno Cárdenas',
      'leaders.secretary': 'Secretario General CNOP Yucatán',
      'leaders.eloy': 'Eloy Quiroz',
      
      // ─── Afiliación ───
      'affiliate.title': 'Bix u Síijil?',
      'affiliate.subtitle': 'Oken tu ch\'ibal CNOP',
      'affiliate.free': '¡JUN PESO MA\'! ¡Jach gratuito!',
      'affiliate.step1.title': 'Jump\'éel',
      'affiliate.step1.desc': 'Ts\'aik a INE',
      'affiliate.step2.title': 'Ka\'a p\'éel',
      'affiliate.step2.desc': 'U ts\'íib a najil',
      'affiliate.step3.title': 'Óox p\'éel',
      'affiliate.step3.desc': 'Ka\'a túul fotoob chan',
      'affiliate.online': 'Síijil internet',
      'affiliate.presential': 'Síijil presencial',
      'affiliate.button': 'Ka\'a u síijil',
      'affiliate.requirements': 'Ba\'ax k k\'áat',
      'affiliate.process': 'Bix u beetik',
      'affiliate.benefits': 'Ki\'ichkelem ba\'al wa síijil',
      
      // ─── Programas ───
      'programs.title': 'K Meyajo\'ob',
      'programs.subtitle': 'K yáantik tech tu ba\'ax k k\'áat',
      'programs.education': 'Kaansaj',
      'programs.education.desc': 'CEUSI San Isidro - Bachillerato, Licenciaturas, Maestrías yéetel Doctorados',
      'programs.health': 'Ko\'olelo\'ob',
      'programs.health.desc': 'Jornadas médicas gratis yéetel brigadas ko\'olel',
      'programs.training': 'Kaansaj meyaj',
      'programs.training.desc': 'Talleres meyajo\'ob yéetel emprendimiento',
      'programs.social': 'Gestión Social',
      'programs.social.desc': 'K yáantik tech yéetel trámites yéetel necesidades comunidad',
      'programs.women': 'Frente Femenil',
      'programs.women.desc': 'Empoderamiento yéetel liderazgo x ch\'úupalo\'ob yucatecos',
      'programs.youth': 'Red Jóvenes Populares',
      'programs.youth.desc': 'Formación política yéetel servicio comunidad',
      
      // ─── CEUSI ───
      'ceusi.title': 'CEUSI San Isidro',
      'ceusi.subtitle': 'Centro Educativo Universitario',
      'ceusi.offer': 'U Kaansaj 2025-2026',
      'ceusi.highschool': 'Bachillerato',
      'ceusi.degree': 'Licenciaturas',
      'ceusi.masters': 'Maestrías',
      'ceusi.doctorate': 'Doctorados',
      'ceusi.online': 'Internet',
      'ceusi.official': 'Validez Oficial SEP',
      'ceusi.info': 'Je\'el u ye\'esik',
      
      // ─── Eventos ───
      'events.title': 'K\'iino\'ob ku taal',
      'events.subtitle': 'Ma\' a sut k actividades',
      'events.date': 'K\'iin',
      'events.time': 'Ja\'atsil k\'iin',
      'events.location': 'Tu\'ux',
      'events.register': 'Síijil',
      'events.more': 'Ye\'esik tuláakal k\'iino\'ob',
      
      // ─── Noticias ───
      'news.title': 'U ka\'ana Tsikbalo\'ob',
      'news.subtitle': 'Mantente informado',
      'news.read': 'Xe\'ex je\'el',
      'news.recent': 'Je\'el bejla\'e\'',
      'news.all': 'Ye\'esik tuláakal tsikbalo\'ob',
      
      // ─── Contacto ───
      'contact.title': 'T\'aan yéetel to\'on',
      'contact.subtitle': 'Te\'ela\' utia\'al a yáantik',
      'contact.address': 'Tu\'ux yaan',
      'contact.address.text': 'Calle 60 #495 ichil 59 yéetel 61, Centro, Tihoo, Yucatán',
      'contact.phone': 'Teléfono',
      'contact.email': 'Correo Electrónico',
      'contact.schedule': 'Ja\'atsil k\'iin',
      'contact.schedule.text': 'Lunes utia\'al Viernes, 9:00 AM - 5:00 PM',
      'contact.social': 'Redes Sociales',
      'contact.facebook': 'Facebook',
      'contact.instagram': 'Instagram',
      'contact.message': 'Ts\'aik juntúul t\'aan',
      
      // ─── Formularios ───
      'form.name': 'K\'aaba\' completo',
      'form.email': 'Correo electrónico',
      'form.phone': 'Teléfono',
      'form.message': 'T\'aan',
      'form.subject': 'Ba\'ax ku ya\'alike',
      'form.send': 'Ts\'aik',
      'form.sending': 'Ku ts\'aik...',
      'form.success': '¡T\'aan ts\'o\'ok!',
      'form.error': 'Ma\' u ts\'o\'ok',
      
      // ─── Botones Comunes ───
      'btn.more': 'Je\'el u ye\'esik',
      'btn.less': 'Je\'el ko\'ox',
      'btn.download': 'Bisik',
      'btn.register': 'Síijil',
      'btn.learn': 'Ka\'a u na\'atik',
      'btn.join': 'Oken',
      'btn.back': 'Súutuk',
      'btn.next': 'U kúuchil',
      'btn.previous': 'Ich ka\'ana',
      
      // ─── Footer ───
      'footer.about': 'Yóok\'ol CNOP',
      'footer.links': 'Enlaces rápidos',
      'footer.contact': 'T\'aan',
      'footer.social': 'Síijil to\'on',
      'footer.rights': 'Tuláakal u páajtalilo\'ob u k\'a\'ana\'an',
      'footer.privacy': 'Política Privacidad',
      'footer.terms': 'Términos yéetel Condiciones',
      
      // ─── Otros ───
      'common.loading': 'Ku cargando...',
      'common.search': 'Kaxtik',
      'common.close': 'P\'atik',
      'common.menu': 'Menú',
    }
  };

  // ═══ ESTADO ═══
  let currentLang = localStorage.getItem('cnop-language') || 'es';

  // ═══ INICIALIZACIÓN ═══
  function init() {
    setLanguage(currentLang);
    setupSwitcher();
    updateLuxecitaLanguage();
  }

  // ═══ CONFIGURAR BOTONES ═══
  function setupSwitcher() {
    const buttons = document.querySelectorAll('.lang-btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        setLanguage(lang);
        
        // Animación al cambiar
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          btn.style.transform = '';
        }, 150);
      });
    });
  }

  // ═══ CAMBIAR IDIOMA ═══
  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('cnop-language', lang);
    
    // Actualizar botones activos
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Traducir TODO el sitio
    translatePage();
    
    // Actualizar Luxecita
    updateLuxecitaLanguage();
    
    // Actualizar atributo HTML
    document.documentElement.setAttribute('lang', lang === 'maya' ? 'yua' : lang);
    
    // Disparar evento
    document.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: lang } 
    }));
    
    console.log(`✅ Idioma cambiado a: ${lang === 'es' ? 'Español' : 'Maya'}`);
  }

  // ═══ TRADUCIR TODA LA PÁGINA ═══
  function translatePage() {
    // Traducir elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;
      const translation = translations[currentLang][key];
      
      if (translation) {
        // Si es input/textarea, cambiar placeholder
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else {
          // Preservar HTML interno si tiene
          if (element.children.length === 0) {
            element.textContent = translation;
          } else {
            // Si tiene hijos, solo cambiar el texto directo
            const childNodes = Array.from(element.childNodes);
            childNodes.forEach(node => {
              if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = translation;
              }
            });
          }
        }
      }
    });
  }

  // ═══ ACTUALIZAR LUXECITA ═══
  function updateLuxecitaLanguage() {
    if (window.luxecitaSetLanguage) {
      window.luxecitaSetLanguage(currentLang);
    }
  }

  // ═══ API PÚBLICA ═══
  
  // Obtener idioma actual
  window.getCurrentLanguage = () => currentLang;

  // Obtener traducción específica
  window.translate = (key) => {
    return translations[currentLang][key] || key;
  };

  // Cambiar idioma programáticamente
  window.setLanguage = setLanguage;

  // ═══ ARRANQUE ═══
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

// ═══════════════════════════════════════════════
  // AUTO-TRADUCTOR TEMPORAL (mientras agregas data-i18n manualmente)
  // ═══════════════════════════════════════════════
  
  function autoTranslate() {
    const autoMappings = {
      // Textos exactos que se traducirán automáticamente
      'Inicio': 'nav.inicio',
      'Nosotros': 'nav.nosotros',
      'Afiliación': 'nav.afiliacion',
      'Programas': 'nav.programas',
      'Eventos': 'nav.eventos',
      'Noticias': 'nav.noticias',
      'Contacto': 'nav.contacto',
      'CNOP Yucatán': 'hero.title',
      'Confederación Nacional de Organizaciones Populares': 'hero.subtitle',
      'Afiliarme Ahora': 'hero.cta',
      'Conocer Más': 'hero.cta2',
      '¿Quiénes Somos?': 'about.title',
      '¿Cómo Afiliarse?': 'affiliate.title',
      'Nuestros Programas': 'programs.title',
      'Educación': 'programs.education',
      'Salud': 'programs.health',
      'Capacitación': 'programs.training',
      'Gestión Social': 'programs.social',
      'Frente Femenil': 'programs.women',
      'Red de Jóvenes Populares': 'programs.youth',
      'Próximos Eventos': 'events.title',
      'Últimas Noticias': 'news.title',
      'Contáctanos': 'contact.title',
      'Dirección': 'contact.address',
      'Teléfono': 'contact.phone',
      'Correo Electrónico': 'contact.email',
      'Horario de Atención': 'contact.schedule',
      'Redes Sociales': 'contact.social',
      'Enviar': 'form.send',
      'Nombre completo': 'form.name',
      'Correo electrónico': 'form.email',
      'Mensaje': 'form.message',
      'Todos los derechos reservados': 'footer.rights',
      'Ver Más': 'btn.more',
      'Descargar': 'btn.download',
      'Registrarse': 'btn.register',
    };

    // Buscar y traducir automáticamente
    const allElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button, span, div, li, td, th');
    
    allElements.forEach(element => {
      // Solo elementos sin hijos de texto (para no romper estructura)
      if (element.children.length === 0 || element.tagName === 'BUTTON' || element.tagName === 'A') {
        const text = element.textContent.trim();
        
        if (autoMappings[text]) {
          const key = autoMappings[text];
          const translation = translations[currentLang][key];
          
          if (translation) {
            element.textContent = translation;
            
            // Marcar como traducido para evitar re-traducir
            element.setAttribute('data-auto-translated', key);
          }