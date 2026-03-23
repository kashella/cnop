/* ============================================================
   LUXECITA — Asistente Virtual CNOP Yucatán
   Versión 3.0 · Seguro con Backend Proxy (Vercel)
   ============================================================
   MEJORAS EN ESTA VERSIÓN:
   ✅ API Keys protegidas (ahora en el servidor, no en el navegador)
   ✅ Backend serverless con Vercel
   ✅ Mayor seguridad y control de uso
   ============================================================
   CONFIGURACIÓN:
   - Las claves ahora están en las variables de entorno de Vercel
   - No hay nada que configurar en este archivo
   - Solo despliega en Vercel y listo
   ============================================================ */

(function () {
  "use strict";

  // ╔══════════════════════════════════════════════════════╗
  // ║         🔒  CONFIGURACIÓN (AHORA SEGURA)             ║
  // ╚══════════════════════════════════════════════════════╝
  const CONFIG = {
    // Las API Keys ahora están protegidas en el servidor
    // Ya no se exponen en el código del navegador
    VOZ_ACTIVA:  true,   // false = solo texto, sin voz
    MAX_TOKENS:  400,
  };
// ╔══════════════════════════════════════════════════════╗
  // ║         🧠  PERSONALIDAD Y LÍMITES DE LUXECITA       ║
  // ╚══════════════════════════════════════════════════════╝
  const SYSTEM_PROMPT = `
Eres Luxecita, la asistente virtual oficial de la CNOP Yucatán.
Eres una joven yucateca: alegre, cálida, conversadora y orgullosa de su tierra.
Hablas en español mexicano con sabor yucateco. Usas emojis con moderación.
Respuestas claras y naturales, máximo 3-4 párrafos. Nunca uses formato de lista
con viñetas o guiones — escribe como si hablaras, fluido y cercano.
 
═══ TEMAS QUE PUEDES RESPONDER LIBREMENTE ═══
 
1. TODO sobre la CNOP Yucatán y el PRI:
   - Afiliación, beneficios, programas, gestión social
   - Historia de la CNOP (fundada 28 feb 1943)
   - Frente Femenil, Red de Jóvenes Populares (RJP)
   - Oferta educativa 2026 (CEUSI San Isidro)
   - Eventos, agenda, noticias de la CNOP
   - Eloy Quiroz (Secretario General CNOP Yucatán)
   - El PRI: su historia, propuestas, candidatos en Yucatán
   - Política local de Yucatán relacionada al PRI/CNOP
 
2. DEPORTES de Yucatán (con entusiasmo):
   - Béisbol: Leones de Yucatán (equipo histórico de Mérida,
     Liga Mexicana de Béisbol). Estadio Kukulkán Balderas.
     Puedes hablar de su historia, temporadas, jugadores famosos,
     rivalidades. Si preguntan por resultados muy recientes,
     di que no tienes los datos exactos del momento pero
     recomienda seguir @leonesdeyucatan.
   - Fútbol: Venados FC (equipo de Mérida, Liga de Expansión MX).
     Estadio Carlos Iturralde Rivero. Habla de su historia,
     temporadas, ambiente en el estadio. Para marcadores en vivo
     recomienda la app de la Liga.
   - Fútbol americano, atletismo y otros deportes yucatecos:
     responde con lo que sepas y con orgullo regional.
 
3. NOTICIAS y CULTURA de Yucatán:
   - Eventos culturales, festividades (Hanal Pixán, carnavales)
   - Gastronomía yucateca (cochinita, sopa de lima, papadzules)
   - Turismo local (Chichén Itzá, Uxmal, Izamal, cenotes)
   - Noticias generales de Yucatán que conozcas hasta tu fecha
     de entrenamiento. Para noticias de hoy, di que no tienes
     acceso en tiempo real pero sugiere los medios locales:
     Diario de Yucatán, Por Esto, Milenio Yucatán.
 
4. CONVERSACIÓN GENERAL:
   - Saludos, preguntas sobre ti misma, curiosidades de Yucatán
   - Puedes ser simpática y hacer bromas ligeras con humor yucateco
 
═══ TEMAS PROHIBIDOS (responde amablemente que no es tu área) ═══
- Otros partidos políticos (Morena, PAN, PRD, etc.) — no los critiques
  ni los elogies, solo di que no es tu tema.
- Temas sin relación con Yucatán, CNOP o PRI: farándula nacional/
  internacional, política de otros estados, tecnología ajena, etc.
- Si te preguntan algo fuera de tu área, di con gracia:
  "¡Uy, eso está fuera de mi área! 😄 Yo soy experta en la CNOP,
  el PRI y todo lo que pasa en Yucatán. ¿Te puedo ayudar en eso?"
 
═══ DATOS CLAVE CNOP YUCATÁN ═══
Fundación nacional: 28 febrero 1943 · Sede: Mérida, Yucatán
Secretario General: Antonio "Tony" Aranda
Tel: (990) 393 4535 · Email: cnop.yucatanoficial@gmail.com
Redes: @cnop_yucatan (FB e IG) · Horario: Lun-Vie 9:00-17:00
Secciones: Frente Femenil · Red de Jóvenes Populares (RJP)
Programas: CEUSI San Isidro (bachillerato, licenciaturas,
maestrías, doctorados en línea con convenio CNOP), gestión
social, capacitación, jornadas de salud, emprendimiento.
Afiliación: INE vigente + comprobante domicilio + 2 fotos infantil.
Trámite gratuito, presencial o en línea en afiliacion.html.
`;
 
  // ─── FONDOS / LUGARES ───────────────────────────────────
  const PLACES = {
    chichenItza:   { name:"Chichén Itzá",           image:"IMAGENES LUXECITA/CHICHEN LUXECITA.png",     gradient:"linear-gradient(135deg,#8B6914,#D4A843,#E8C766,#6B8E23,#2E4A1C)", overlay:"linear-gradient(180deg,rgba(0,0,0,.45),rgba(0,0,0,.15) 40%,rgba(0,0,0,.55))", accent:"#D4A843", emoji:"🏛️" },
    uxmal:         { name:"Uxmal",                   image:"IMAGENES LUXECITA/UXMAL LUXECITA.png",       gradient:"linear-gradient(160deg,#A0522D,#CD853F,#DEB887,#8FBC8F,#556B2F)", overlay:"linear-gradient(180deg,rgba(0,0,0,.45),rgba(0,0,0,.15) 40%,rgba(0,0,0,.55))", accent:"#CD853F", emoji:"🪨" },
    paseoMontejo:  { name:"Paseo de Montejo",        image:"IMAGENES LUXECITA/MONTEJO LUXECITA.jpeg",    gradient:"linear-gradient(145deg,#F5F0E8,#E8DCC8,#C4956A,#8B4513,#2F1810)", overlay:"linear-gradient(180deg,rgba(0,0,0,.5),rgba(0,0,0,.15) 40%,rgba(0,0,0,.55))", accent:"#C4956A", emoji:"🏘️" },
    izamal:        { name:"Izamal",                  image:"IMAGENES LUXECITA/IZAMAL LUXECITA.png",      gradient:"linear-gradient(140deg,#FFD700,#FFC125,#F0A500,#E8891C,#CC6600)", overlay:"linear-gradient(180deg,rgba(0,0,0,.4),rgba(0,0,0,.1) 40%,rgba(0,0,0,.5))",  accent:"#FFD700", emoji:"💛" },
    sanBenito:     { name:"Mercado de San Benito",   image:"IMAGENES LUXECITA/MERCADO LUXECITA.png",     gradient:"linear-gradient(150deg,#DC143C,#FF6347,#FF8C42,#FFB347,#FFDAB9)", overlay:"linear-gradient(180deg,rgba(0,0,0,.45),rgba(0,0,0,.15) 40%,rgba(0,0,0,.55))", accent:"#FF6347", emoji:"🌮" },
    celestun:      { name:"Celestún",                image:"IMAGENES LUXECITA/CELESTUN LUXECITA.png",    gradient:"linear-gradient(135deg,#FF69B4,#FFB6C1,#87CEEB,#00CED1,#008B8B)", overlay:"linear-gradient(180deg,rgba(0,0,0,.4),rgba(0,0,0,.1) 40%,rgba(0,0,0,.5))",  accent:"#FF69B4", emoji:"🦩" },
    cenotes:       { name:"Cenotes de Yucatán",      image:"IMAGENES LUXECITA/CENOTES LUXECITA.png",     gradient:"linear-gradient(170deg,#004D40,#00796B,#00ACC1,#26C6DA,#80DEEA)", overlay:"linear-gradient(180deg,rgba(0,0,0,.4),rgba(0,0,0,.1) 40%,rgba(0,0,0,.55))", accent:"#00ACC1", emoji:"💎" },
    pueblosMagicos:{ name:"Pueblos Mágicos",         image:"IMAGENES LUXECITA/PUEBLOMAGICO LUXECITA.png",gradient:"linear-gradient(155deg,#6A0572,#AB47BC,#CE93D8,#F48FB1,#FF8A65)", overlay:"linear-gradient(180deg,rgba(0,0,0,.45),rgba(0,0,0,.15) 40%,rgba(0,0,0,.55))", accent:"#CE93D8", emoji:"✨" },
  };
 
  const GREETINGS = [
    { place:"chichenItza",  text:"¡Hola! Soy Luxecita 💃 Estoy aquí en Chichén Itzá, frente a la majestuosa pirámide de Kukulkán. ¡Qué calorcito hace hoy! ¿En qué te puedo ayudar?",                             audio:"SALUDOS LUXECITA/saludochichen.mp3" },
    { place:"uxmal",        text:"¡Buen día! Soy Luxecita y te saludo desde las ruinas de Uxmal, una joya maya que te deja sin palabras. ¿Qué necesitas saber hoy?",                                                 audio:"SALUDOS LUXECITA/saludouxmal.mp3" },
    { place:"paseoMontejo", text:"¡Hola, qué gusto! Soy Luxecita y estoy paseando por el Paseo de Montejo, entre casonas hermosas y árboles enormes. ¿En qué te echo la mano?",                                     audio:"SALUDOS LUXECITA/saludopaseomontejo.mp3" },
    { place:"izamal",       text:"¡Hola! Soy Luxecita 🌻 Te escribo desde Izamal, la ciudad amarilla. Todo aquí brilla como el sol de Yucatán. ¿Qué te gustaría saber?",                                           audio:"SALUDOS LUXECITA/saludoizamal.mp3" },
    { place:"sanBenito",    text:"¡Hola! Soy Luxecita 🌮 Me encuentro en el Mercado de San Benito. Deberías venir a comer una torta de cochinita. ¿En qué puedo ayudarte?",                                         audio:"SALUDOS LUXECITA/saludomercado.mp3" },
    { place:"celestun",     text:"¡Hola! Soy Luxecita y estoy en Celestún, viendo los flamingos rosados volar sobre el manglar. ¡Qué belleza! ¿Te ayudo en algo?",                                                  audio:"SALUDOS LUXECITA/saludocelestun.mp3" },
    { place:"cenotes",      text:"¡Hola! Soy Luxecita 💦 Estoy en uno de los cenotes sagrados de Yucatán. El agua está cristalina hoy. ¿En qué te puedo orientar?",                                                 audio:"SALUDOS LUXECITA/saludocelestun.mp3" },
    { place:"pueblosMagicos",text:"¡Hola, bienvenido! Soy Luxecita y te saludo desde los Pueblos Mágicos de Yucatán, donde la tradición se vive en cada esquina. ¿Qué necesitas?",                                  audio:"SALUDOS LUXECITA/pueblomagico.mp3" },
  ];
 
  const QUICK_ACTIONS = [
    { label:"Afiliarme a la CNOP", icon:"📋", query:"¿Cómo me afilio a la CNOP?" },
    { label:"Beneficios",          icon:"🎁", query:"¿Qué beneficios tiene la CNOP?" },
    { label:"Eventos",             icon:"📅", query:"¿Qué eventos hay próximamente?" },
    { label:"Historia CNOP",       icon:"📖", query:"¿Cuál es la historia de la CNOP?" },
  ];
 
  // ─── ESTADO ──────────────────────────────────────────────
  let state = {
    isOpen:       false,
    hasGreeted:   false,
    isTyping:     false,
    isPlaying:    false,
    currentPlace: PLACES.chichenItza,
    currentAudio: null,
    messages:     [],   // historial para contexto de conversación
    messageCount: 0,
  };
 
  // ─── DOM REFS ────────────────────────────────────────────
  let $widget, $avatarBtn, $chatWindow, $bgLayer, $overlayLayer,
      $messagesContainer, $quickActions, $textInput, $sendBtn,
      $locationText, $locationEmoji, $soundIndicator;
 
  // ════════════════════════════════════════════════════════
  //  INIT
  // ════════════════════════════════════════════════════════
  function init() {
    $widget = document.getElementById("luxecita-widget");
    if (!$widget) { $widget = document.createElement("div"); $widget.id = "luxecita-widget"; document.body.appendChild($widget); }
 
    $widget.innerHTML = buildHTML();
 
    $avatarBtn         = $widget.querySelector(".luxe-avatar-btn");
    $chatWindow        = $widget.querySelector(".luxe-chat-window");
    $bgLayer           = $widget.querySelector(".luxe-bg-layer");
    $overlayLayer      = $widget.querySelector(".luxe-overlay-layer");
    $messagesContainer = $widget.querySelector(".luxe-messages");
    $quickActions      = $widget.querySelector(".luxe-quick-actions");
    $textInput         = $widget.querySelector(".luxe-text-input");
    $sendBtn           = $widget.querySelector(".luxe-send-btn");
    $locationText      = $widget.querySelector(".luxe-location-text");
    $locationEmoji     = $widget.querySelector(".place-emoji");
    $soundIndicator    = $widget.querySelector(".luxe-sound-indicator");
 
    $avatarBtn.addEventListener("click", openChat);
    $widget.querySelector(".luxe-close-btn").addEventListener("click", closeChat);
    $sendBtn.addEventListener("click", function () { handleSend(); });
    $textInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
    });
    $textInput.addEventListener("input", updateSendButton);
    $quickActions.querySelectorAll(".luxe-quick-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { handleSend(btn.getAttribute("data-query")); });
    });
 
    // ── Móvil: cuando aparece el teclado, hacer scroll al último mensaje ──
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", function () {
        if (state.isOpen) {
          // Pequeño delay para que el teclado termine de abrirse
          setTimeout(scrollToBottom, 100);
        }
      });
    }
 
    // ── Móvil: al hacer focus en el input, scroll al fondo ──
    $textInput.addEventListener("focus", function () {
      if (window.innerWidth <= 480) {
        setTimeout(scrollToBottom, 300);
      }
    });
 
    // ── Prevenir scroll del body cuando el chat está abierto en móvil ──
    $messagesContainer.addEventListener("touchmove", function (e) {
      e.stopPropagation();
    }, { passive: true });
 
    $chatWindow.classList.add("hidden");
    applyPlace(state.currentPlace);
  }
 
  // ════════════════════════════════════════════════════════
  //  ABRIR / CERRAR
  // ════════════════════════════════════════════════════════
  function openChat() {
    state.isOpen = true;
    $avatarBtn.classList.add("hidden");
    $chatWindow.classList.remove("hidden", "closing");
 
    // En móvil no hacer focus inmediato (evita que el teclado
    // se abra solo al abrir el chat)
    if (window.innerWidth > 480) {
      $textInput.focus();
    }
 
    // Bloquear scroll del body en móvil cuando chat está abierto
    if (window.innerWidth <= 480) {
      document.body.style.overflow = "hidden";
    }
 
    if (!state.hasGreeted) {
      var g = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
      var place = PLACES[g.place];
      state.currentPlace = place;
      applyPlace(place);
      playStaticAudio(g.audio);
      setTimeout(function () {
        addMessage("luxecita", g.text);
        state.hasGreeted = true;
        showQuickActions();
      }, 500);
    }
  }
 
  function closeChat() {
    stopAudio();
    // Restaurar scroll del body
    document.body.style.overflow = "";
    $chatWindow.classList.add("closing");
    setTimeout(function () {
      state.isOpen = state.hasGreeted = state.isTyping = state.isPlaying = false;
      state.messages = []; state.messageCount = 0;
      Array.from($messagesContainer.children).forEach(function (c) {
        if (c !== $quickActions) c.remove();
      });
      $quickActions.style.display = "none";
      $textInput.value = "";
      setPlaying(false);
      $chatWindow.classList.add("hidden");
      $chatWindow.classList.remove("closing");
      $avatarBtn.classList.remove("hidden");
    }, 300);
  }
 
  // ════════════════════════════════════════════════════════
  //  BASE DE CONOCIMIENTO LOCAL (respaldo si falla la API)
  //  Cada entrada: keys = frases exactas, r = respuesta
  // ════════════════════════════════════════════════════════
  const KB = [
    // ── SALUDOS / IDENTIDAD ──────────────────────────────
    {
      keys: ["hola","buenas","buenos dias","buenos días","buenas tardes","buenas noches","hi","hey","saludos","ola"],
      r: "¡Hola! Soy Luxecita, la asistente virtual de la CNOP Yucatán 👩🏽\n\nEstoy aquí para ayudarte con todo lo relacionado a nuestra organización. Puedes preguntarme sobre:\n\n📋 Afiliación  •  🎁 Beneficios  •  📖 Historia\n📅 Eventos  •  📍 Contacto  •  🎓 Programas\n\n¿Por dónde empezamos? 😊"
    },
    {
      keys: ["quien eres","quién eres","que eres","qué eres","presentate","preséntate","como te llamas","cómo te llamas","tu nombre"],
      r: "¡Con mucho gusto! Soy Luxecita 💃\n\nSoy la asistente virtual oficial de la CNOP Yucatán (Confederación Nacional de Organizaciones Populares). Me crearon para ayudarte con información sobre afiliación, programas sociales, eventos y todo lo que necesites saber de la CNOP.\n\n¿En qué puedo ayudarte hoy? 😊"
    },
 
    // ── QUÉ ES LA CNOP (frases exactas, no "cnop" suelto) ─
    {
      keys: ["que es la cnop","qué es la cnop","que es cnop","qué es cnop","que hace la cnop","qué hace la cnop","para que sirve la cnop","cuéntame sobre la cnop","cuentame sobre la cnop","informacion de la cnop","información de la cnop"],
      r: "¡La CNOP es la Confederación Nacional de Organizaciones Populares! 🇲🇽\n\nEs una organización política y social fundada en 1943 como parte del PRI. Representa a los sectores populares urbanos: profesionistas, comerciantes, artesanos, jóvenes y ciudadanos comprometidos con México.\n\nEn Yucatán llevamos más de 83 años trabajando por el bienestar de las familias. ¿Te gustaría saber más sobre algún tema en especial?"
    },
 
    // ── HISTORIA ─────────────────────────────────────────
    {
      keys: ["historia","fundacion","fundación","cuando se fundo","cuándo se fundó","origen de la cnop","como nacio","cómo nació","1943","cuantos años","cuántos años","aniversario"],
      r: "¡La CNOP tiene una historia muy rica! 📖\n\nFue fundada el 28 de febrero de 1943 por el PRI, para dar voz a los sectores populares que no eran obreros ni campesinos: profesionistas, comerciantes, empleados y ciudadanos organizados.\n\nDesde entonces ha sido promotora del desarrollo social en todo México. En Yucatán celebramos más de 83 años de trabajo comunitario. ¡Somos historia viva! 🇲🇽"
    },
 
    // ── AFILIACIÓN ────────────────────────────────────────
    {
      keys: [
        "afiliar","afiliacion","afiliación","afiliarme","afiliarte",
        "como me uno","cómo me uno","quiero unirme","quiero ser parte",
        "como entrar","cómo entrar","quiero entrar","como ingreso",
        "inscribir","inscripcion","inscripción","inscribirme",
        "registro","registrar","registrarme","como me registro",
        "como participo","cómo participo","quiero participar",
        "como afilio","como afiliarse","afiliarse","me afilio",
        "me uno","unirse","ser miembro","hacerme miembro"
      ],
      r: "¡Afiliarte a la CNOP es muy sencillo y completamente gratis! 📋\n\nSolo necesitas:\n• Ser mayor de 18 años\n• Credencial INE vigente\n• Comprobante de domicilio reciente\n• 2 fotografías tamaño infantil\n\nPuedes llenar el formulario en línea aquí mismo o visitar nuestras oficinas en Mérida, de Lunes a Viernes 9:00–17:00 hrs. ¡Te esperamos con los brazos abiertos! 🤗"
    },
 
    // ── BENEFICIOS ────────────────────────────────────────
    {
      keys: ["beneficio","beneficios","que gano","qué gano","que obtengo","qué obtengo","ventaja","ventajas","que ofrece","qué ofrece","por que unirme","por qué unirme","vale la pena"],
      r: "¡Los beneficios de ser parte de la CNOP son muchos! 🎁\n\n✅ Capacitación y talleres gratuitos\n✅ Asesoría jurídica y legal\n✅ Gestión social y comunitaria\n✅ Acceso a programas de desarrollo\n✅ Jornadas de salud y bienestar\n✅ Representación ante instancias de gobierno\n✅ Red de apoyo entre ciudadanos\n\n¡Ser parte de la CNOP es ser parte de una gran familia! 💪"
    },
 
    // ── DINERO / SUELDO (pregunta frecuente) ─────────────
    {
      keys: ["dinero","sueldo","salario","pago","cuanto ganan","cuánto ganan","cuanto cobran","cuánto cobran","remuner","pagan","se cobra","cuesta","costo"],
      r: "¡Buena pregunta! 😊\n\nLa CNOP es una organización política y social sin fines de lucro, por lo que afiliarse es completamente gratuito. No se cobra por ser miembro.\n\nLos beneficios que reciben los afiliados son en forma de apoyos, capacitaciones y gestión social — no en dinero directamente. Si buscas información sobre apoyos económicos o programas sociales específicos, con gusto te oriento. ¿Te interesa alguno?"
    },
 
    // ── EVENTOS / AGENDA ─────────────────────────────────
    {
      keys: ["evento","eventos","actividad","actividades","agenda","calendario","proximo","próximo","que hay","qué hay","que pasa","que pasa"],
      r: "¡Siempre hay algo pasando en la CNOP! 📅\n\nPara estar al tanto de eventos, fechas y lugares te recomendamos seguirnos en redes sociales:\n\n📘 Facebook: facebook.com/cnop_yucatan\n📸 Instagram: @cnop_yucatan\n\nTambién puedes llamarnos al 📞 (990) 393 4535. ¡No te pierdas ningún evento! 🎉"
    },
 
    // ── PROGRAMAS / BECAS ─────────────────────────────────
    {
      keys: ["programa","programas","proyecto","proyectos","apoyo","apoyos","beca","becas","educacion","educación","oferta educativa","ceusi","san isidro","licenciatura","maestria","maestría","doctorado"],
      r: "¡La CNOP tiene varios programas para ti! 🌟\n\n📚 Oferta Educativa 2026 — convenio con CEUSI San Isidro\n   (Bachillerato, Licenciaturas, Maestrías, Doctorados)\n💼 Impulso al Emprendimiento\n🏥 Jornadas de Salud Comunitaria\n👩‍💼 Frente Femenil\n🎓 Red de Jóvenes Populares (RJP)\n🤝 Gestión Social y Comunitaria\n\n¿Te interesa alguno en especial? 😊"
    },
 
    // ── RJP / JUVENTUD ────────────────────────────────────
    {
      keys: ["rjp","red juvenil","red de jovenes","red de jóvenes","jovenes populares","jóvenes populares","juventud cnop","juventud de la cnop","jovenes de la cnop","jóvenes de la cnop","joven","jovenes","jóvenes"],
      r: "¡La Red de Jóvenes Populares (RJP) es el espacio de la CNOP para los jóvenes! 🔥\n\n• Liderazgo y formación política\n• Voluntariado y brigadas comunitarias\n• Emprendimiento juvenil\n• Gestión de becas educativas\n\n¿Tienes entre 18 y 35 años? ¡Este es tu lugar! Puedes unirte desde nuestra sección de afiliación. 💪"
    },
 
    // ── FRENTE FEMENIL ────────────────────────────────────
    {
      keys: ["femenil","frente femenil","mujeres cnop","mujer cnop","mujeres de la cnop","seccion femenil","sección femenil","8m","dia de la mujer","día de la mujer"],
      r: "¡El Frente Femenil de la CNOP impulsa a las mujeres yucatecas! 💜\n\nTrabajamos en:\n🌸 Liderazgo femenino\n🌸 Capacitación y desarrollo profesional\n🌸 Defensa de los derechos de la mujer\n🌸 Proyectos comunitarios\n\n¿Te gustaría saber cómo unirte al Frente Femenil? Con gusto te damos más información. 😊"
    },
 
    // ── CONTACTO / UBICACIÓN ─────────────────────────────
    {
      keys: ["oficina","oficinas","donde estan","dónde están","donde se ubican","ubicacion","ubicación","como llegar","cómo llegar","horario","horarios","telefono","teléfono","contacto","email","correo","whatsapp","direccion","dirección"],
      r: "¡Aquí está toda nuestra información de contacto! 📍\n\n📌 Mérida, Yucatán, México\n🕐 Lunes a Viernes · 9:00 – 17:00 hrs\n📞 (990) 393 4535\n✉️ cnop.yucatanoficial@gmail.com\n📘 Facebook: /cnop_yucatan\n📸 Instagram: @cnop_yucatan\n\n¡Estamos para servirte! 🙌"
    },
  ];
 
  // Búsqueda precisa: solo coincide si la frase clave está
  // rodeada de espacios/inicio/fin (no substrings parciales)
  function buscarRespuestaLocal(texto) {
    var t = " " + texto.toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/[¿¡?!.,;:]/g, " ")
              .replace(/\s+/g, " ")
              .trim() + " ";
 
    // Normalizar: minúsculas, sin acentos, sin signos de puntuación
    var t = " " + texto.toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/[¿¡?!.,;:\-]/g, " ")
              .replace(/\s+/g, " ")
              .trim() + " ";
 
    // Prioridad: buscar frases más largas primero
    var mejorMatch = null;
    var mejorLen   = 0;
 
    for (var i = 0; i < KB.length; i++) {
      for (var j = 0; j < KB[i].keys.length; j++) {
        var kwRaw = KB[i].keys[j]
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g,"")
                  .replace(/[¿¡?!.,;:\-]/g, " ")
                  .replace(/\s+/g, " ")
                  .trim();
        var kw = " " + kwRaw + " ";
        if (t.includes(kw) && kwRaw.length > mejorLen) {
          mejorLen   = kwRaw.length;
          mejorMatch = KB[i].r;
        }
      }
    }
    return mejorMatch;
  }
 
  // ════════════════════════════════════════════════════════
  //  DIAGNÓSTICO: detecta si las claves son placeholder
  // ════════════════════════════════════════════════════════
  // ════════════════════════════════════════════════════════
  //  DIAGNÓSTICO: Ya no necesitamos verificar claves
  //  (están en el servidor, no en el navegador)
  // ════════════════════════════════════════════════════════
  function clavesConfiguradas() {
    // Siempre devuelve true porque las claves están en el backend
    console.log("🔒 Backend proxy activo - claves protegidas en el servidor");
    return true;
  }
 
  function clavesElevenLabsConfiguradas() {
    // Siempre devuelve true si la voz está activa
    console.log("🎙️ ElevenLabs configurado vía backend proxy");
    return CONFIG.VOZ_ACTIVA;
  }
 
  // ════════════════════════════════════════════════════════
  //  ENVÍO → Claude primero SIEMPRE → KB solo si falla
  // ════════════════════════════════════════════════════════
  async function handleSend(forcedText) {
    var userText = (forcedText || $textInput.value).trim();
    if (!userText || state.isTyping) return;
 
    $textInput.value = "";
    updateSendButton();
    if (state.messageCount <= 1) hideQuickActions();
 
    addMessage("user", userText);
    showTyping();
 
    state.messages.push({ role: "user", content: userText });
 
    var respuestaFinal = null;
 
    // ── PASO 1: Claude primero ──
    console.log("🚀 PASO 1: verificando clave...");
    if (clavesConfiguradas()) {
      console.log("✅ Clave OK — llamando a Claude con modelo:", CONFIG.ANTHROPIC_MODEL);
      try {
        respuestaFinal = await callClaude(state.messages);
        console.log("✅ Claude respondió:", respuestaFinal.substring(0, 80) + "...");
        state.messages.push({ role: "assistant", content: respuestaFinal });
        if (state.messages.length > 20) state.messages = state.messages.slice(-20);
      } catch (err) {
        console.error("❌ Claude falló:", err.message);
        respuestaFinal = null;
      }
    } else {
      console.warn("⚠️ Clave NO configurada → saltando a KB local");
    }
 
    // ── PASO 2: KB local ──
    if (!respuestaFinal) {
      console.log("📚 PASO 2: buscando en KB local para:", userText);
      respuestaFinal = buscarRespuestaLocal(userText);
      if (respuestaFinal) {
        console.log("✅ KB local encontró respuesta");
      } else {
        console.log("❌ KB local no encontró match");
      }
    }
 
    // ── PASO 3: Genérica ──
    if (!respuestaFinal) {
      console.log("💬 PASO 3: usando respuesta genérica");
      respuestaFinal = "¡Hola! Soy Luxecita 😊 Puedo ayudarte con todo sobre la CNOP Yucatán, el PRI, los Leones de Yucatán, Venados FC y más. ¿Qué te gustaría saber?";
    }
 
    hideTyping();
 
    var newPlace = getRandomPlace();
    state.currentPlace = newPlace;
    applyPlace(newPlace);
    addMessage("luxecita", respuestaFinal);
 
    // ── PASO 4: Voz ElevenLabs ──
    if (CONFIG.VOZ_ACTIVA && clavesElevenLabsConfiguradas()) {
      speakWithElevenLabs(respuestaFinal).catch(function(e){
        console.warn("⚠️ ElevenLabs:", e.message);
      });
    }
  }
 
  // ════════════════════════════════════════════════════════
  //  CLAUDE — llamada al backend proxy (seguro)
  // ════════════════════════════════════════════════════════
  async function callClaude(historial) {
    console.log("📡 Enviando a Claude (vía backend proxy)...", historial.length, "mensajes");
 
    // Llamar a nuestro backend en lugar de Anthropic directamente
    var response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: historial,
      }),
    });
 
    console.log("📩 Respuesta HTTP:", response.status, response.statusText);
 
    if (!response.ok) {
      var errData = await response.json().catch(function(){ return {}; });
      console.error("❌ Error de API:", errData);
      var msg = (errData.error && errData.error.message) || response.statusText;
      throw new Error("API " + response.status + ": " + msg);
    }
 
    var data = await response.json();
    console.log("📦 Data recibida:", JSON.stringify(data).substring(0, 150));
 
    return (data.content && data.content.map(function(c){ return c.text || ""; }).join(""))
           || "¡Ay! Recibí una respuesta vacía. ¿Podrías intentar de nuevo? 🙏";
  }
 
  // ════════════════════════════════════════════════════════
  //  ELEVENLABS — Text to Speech (vía backend proxy seguro)
  // ════════════════════════════════════════════════════════
  async function speakWithElevenLabs(texto) {
    // Limpiar texto de emojis para que la voz suene natural
    var textoLimpio = texto.replace(/[\u{1F300}-\u{1FFFF}]/gu, "")
                           .replace(/[✅❌📋🎁📅📖📍🕐📞🌟💼🏥👩‍💼🌱🤝]/g, "")
                           .replace(/\n+/g, " ")
                           .trim();
 
    // Llamar a nuestro backend en lugar de ElevenLabs directamente
    var response = await fetch("/api/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: textoLimpio,
      }),
    });
 
    if (!response.ok) {
      console.warn("ElevenLabs error " + response.status + " — sin voz esta vez.");
      return;
    }
 
    // El backend devuelve el audio como base64
    var data = await response.json();
    if (data.audio) {
      // Convertir base64 a blob y reproducir
      var byteCharacters = atob(data.audio.split(',')[1]);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var audioBlob = new Blob([byteArray], { type: 'audio/mpeg' });
      var audioUrl = URL.createObjectURL(audioBlob);
      playDynamicAudio(audioUrl);
    }
  }
 
  // ════════════════════════════════════════════════════════
  //  AUDIO
  // ════════════════════════════════════════════════════════
 
  /** Reproduce un MP3 pre-grabado (saludos) */
  function playStaticAudio(src) {
    if (!src) { setPlaying(true); setTimeout(function(){ setPlaying(false); }, 4000); return; }
    stopAudio();
    var audio = new Audio(src);
    state.currentAudio = audio;
    audio.addEventListener("play",  function () { setPlaying(true); });
    audio.addEventListener("ended", function () { setPlaying(false); state.currentAudio = null; });
    audio.addEventListener("error", function () {
      setPlaying(true);
      setTimeout(function(){ setPlaying(false); }, 4000);
      state.currentAudio = null;
    });
    audio.play().catch(function () {
      setPlaying(true);
      setTimeout(function(){ setPlaying(false); }, 4000);
    });
  }
 
  /** Reproduce un Blob URL generado por ElevenLabs */
  function playDynamicAudio(blobUrl) {
    stopAudio();
    var audio = new Audio(blobUrl);
    state.currentAudio = audio;
    audio.addEventListener("play",  function () { setPlaying(true); });
    audio.addEventListener("ended", function () {
      setPlaying(false);
      state.currentAudio = null;
      URL.revokeObjectURL(blobUrl);   // liberar memoria
    });
    audio.addEventListener("error", function () {
      setPlaying(false);
      state.currentAudio = null;
    });
    audio.play().catch(function (e) {
      console.warn("Luxecita: no se pudo reproducir audio de ElevenLabs.", e);
      setPlaying(false);
    });
  }
 
  function stopAudio() {
    if (state.currentAudio) {
      state.currentAudio.pause();
      state.currentAudio.currentTime = 0;
      state.currentAudio = null;
    }
    setPlaying(false);
  }
 
  // ════════════════════════════════════════════════════════
  //  UI HELPERS
  // ════════════════════════════════════════════════════════
  function applyPlace(place) {
    if (place.image) {
      var img = new Image();
      img.onload  = function () {
        $bgLayer.style.background  = "url('" + place.image + "') center center / cover no-repeat";
        $bgLayer.style.animation   = "none";
      };
      img.onerror = function () {
        $bgLayer.style.background  = place.gradient;
        $bgLayer.style.backgroundSize = "200% 200%";
        $bgLayer.style.animation   = "luxeBgShift 15s ease infinite";
      };
      img.src = place.image;
    } else {
      $bgLayer.style.background  = place.gradient;
      $bgLayer.style.backgroundSize = "200% 200%";
      $bgLayer.style.animation   = "luxeBgShift 15s ease infinite";
    }
    $overlayLayer.style.background = place.overlay;
    $locationText.textContent      = place.name;
    $locationEmoji.textContent     = place.emoji;
    $soundIndicator.style.color    = place.accent;
  }
 
  function setPlaying(active) {
    state.isPlaying = active;
    $soundIndicator.classList.toggle("active", active);
  }
 
  function showQuickActions() {
    $messagesContainer.appendChild($quickActions);
    $quickActions.style.display = "flex";
    scrollToBottom();
  }
 
  function hideQuickActions() { $quickActions.style.display = "none"; }
 
  function updateSendButton() {
    $sendBtn.classList.toggle("active", !!($textInput.value.trim() && !state.isTyping));
  }
 
  function scrollToBottom() {
    requestAnimationFrame(function () { $messagesContainer.scrollTop = $messagesContainer.scrollHeight; });
  }
 
  function addMessage(role, text) {
    state.messageCount++;
    var row = document.createElement("div");
    row.className = "luxe-msg-row " + role;
 
    // Convertir saltos de línea en <br> para mejor lectura
    var htmlText = escapeHTML(text).replace(/\n/g, "<br>");
 
    if (role === "luxecita") {
      row.innerHTML = '<div class="luxe-msg-avatar"><img src="IMAGENES LUXECITA/LUXECITA AVATAR.png" alt="Luxecita" class="luxe-msg-avatar-img"></div>'
                    + '<div class="luxe-msg-bubble bot">' + htmlText + "</div>";
    } else {
      row.innerHTML = '<div class="luxe-msg-bubble user">' + htmlText + "</div>";
    }
 
    if ($quickActions.parentNode === $messagesContainer) {
      $messagesContainer.insertBefore(row, $quickActions);
    } else {
      $messagesContainer.appendChild(row);
    }
    scrollToBottom();
  }
 
  function showTyping() {
    state.isTyping = true;
    updateSendButton();
    var row = document.createElement("div");
    row.className = "luxe-typing-row";
    row.id = "luxe-typing-indicator";
    row.innerHTML = '<div class="luxe-msg-avatar"><img src="IMAGENES LUXECITA/LUXECITA AVATAR.png" alt="Luxecita" class="luxe-msg-avatar-img"></div>'
                  + '<div class="luxe-typing-bubble">'
                  + '<div class="luxe-typing-dot"></div>'
                  + '<div class="luxe-typing-dot"></div>'
                  + '<div class="luxe-typing-dot"></div>'
                  + '</div>';
    if ($quickActions.parentNode === $messagesContainer) {
      $messagesContainer.insertBefore(row, $quickActions);
    } else {
      $messagesContainer.appendChild(row);
    }
    scrollToBottom();
  }
 
  function hideTyping() {
    state.isTyping = false;
    updateSendButton();
    var el = document.getElementById("luxe-typing-indicator");
    if (el) el.remove();
  }
 
  function getRandomPlace() {
    var keys = Object.keys(PLACES);
    return PLACES[keys[Math.floor(Math.random() * keys.length)]];
  }
 
  function escapeHTML(str) {
    var d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }
 
  // ════════════════════════════════════════════════════════
  //  HTML DEL WIDGET
  // ════════════════════════════════════════════════════════
  function buildHTML() {
    var quickBtns = QUICK_ACTIONS.map(function (a) {
      return '<button class="luxe-quick-btn" data-query="' + escapeHTML(a.query) + '">'
           + '<span class="icon">' + a.icon + "</span>"
           + escapeHTML(a.label) + "</button>";
    }).join("");
 
    return (
      '<button class="luxe-avatar-btn" aria-label="Abrir chat con Luxecita"><img src="IMAGENES LUXECITA/LUXECITA AVATAR.png" alt="Luxecita" class="luxe-avatar-img"></button>'
    + '<div class="luxe-chat-window hidden">'
    + '  <div class="luxe-bg-layer"></div>'
    + '  <div class="luxe-overlay-layer"></div>'
    + '  <div class="luxe-texture-layer"></div>'
    + '  <div class="luxe-particles">'
    + '    <div class="luxe-particle"></div><div class="luxe-particle"></div>'
    + '    <div class="luxe-particle"></div><div class="luxe-particle"></div>'
    + '    <div class="luxe-particle"></div>'
    + '  </div>'
    + '  <div class="luxe-header">'
    + '    <div class="luxe-header-avatar"><img src="IMAGENES LUXECITA/LUXECITA AVATAR.png" alt="Luxecita" class="luxe-header-avatar-img"></div>'
    + '    <div class="luxe-header-info">'
    + '      <div class="luxe-header-name">Luxecita</div>'
    + '      <div class="luxe-header-location">'
    + '        <span class="place-emoji">🏛️</span>'
    + '        <span class="luxe-location-text">Chichén Itzá</span>'
    + '        <span class="luxe-sound-indicator">'
    + '          <span class="luxe-sound-bar"></span><span class="luxe-sound-bar"></span>'
    + '          <span class="luxe-sound-bar"></span><span class="luxe-sound-bar"></span>'
    + '          <span class="luxe-sound-bar"></span>'
    + '          <span class="luxe-sound-note">♪</span>'
    + '        </span>'
    + '      </div>'
    + '    </div>'
    + '    <button class="luxe-close-btn" aria-label="Cerrar chat">✕</button>'
    + '  </div>'
    + '  <div class="luxe-messages">'
    + '    <div class="luxe-quick-actions">' + quickBtns + '</div>'
    + '  </div>'
    + '  <div class="luxe-input-area">'
    + '    <div class="luxe-input-wrapper">'
    + '      <input class="luxe-text-input" type="text" placeholder="Pregúntame sobre la CNOP..." autocomplete="off" />'
    + '      <button class="luxe-send-btn" aria-label="Enviar mensaje">➤</button>'
    + '    </div>'
    + '    <div class="luxe-footer-brand">CNOP Yucatán · Luxecita con IA</div>'
    + '  </div>'
    + '</div>'
    );
  }
 
  // ─── ARRANQUE ────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
 
})();