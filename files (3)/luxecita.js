/* ============================================
   LUXECITA — Asistente Virtual CNOP Yucatán
   Lógica principal (Vanilla JS)
   
   ESTRUCTURA DE CARPETAS NECESARIA:
   tu-sitio/
   ├── index.html
   ├── luxecita.css
   ├── luxecita.js
   ├── audio/
   │   ├── chichenItza.mp3      ← ✅ TU PRIMER AUDIO (renombrar saludochichen.mp3)
   │   ├── uxmal.mp3
   │   ├── paseoMontejo.mp3
   │   ├── izamal.mp3
   │   ├── sanBenito.mp3
   │   ├── celestun.mp3
   │   ├── cenotes.mp3
   │   └── pueblosMagicos.mp3
   └── imagenes/
       ├── chichenItza.jpg
       ├── uxmal.jpg
       ├── paseoMontejo.jpg
       ├── izamal.jpg
       ├── sanBenito.jpg
       ├── celestun.jpg
       ├── cenotes.jpg
       └── pueblosMagicos.jpg
   ============================================ */

(function () {
  "use strict";

  // ─── CONFIGURACIÓN DE LUGARES ───
  //
  // Cada lugar tiene:
  //   image    → ruta a la foto de fondo (si no existe, usa el gradiente)
  //   gradient → gradiente de respaldo
  //   overlay  → capa oscura encima para legibilidad del texto
  //   accent   → color del indicador de audio
  //   emoji    → icono en el header
  //
  const PLACES = {
    chichenItza: {
      name: "Chichén Itzá",
      image: "IMAGENES LUXECITA/CHICHEN LUXECITA.png",
      gradient: "linear-gradient(135deg, #8B6914 0%, #D4A843 25%, #E8C766 50%, #6B8E23 75%, #2E4A1C 100%)",
      overlay: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%)",
      accent: "#D4A843",
      emoji: "🏛️",
    },
    uxmal: {
      name: "Uxmal",
      image: "imagenes/uxmal.jpg",
      gradient: "linear-gradient(160deg, #A0522D 0%, #CD853F 30%, #DEB887 55%, #8FBC8F 80%, #556B2F 100%)",
      overlay: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%)",
      accent: "#CD853F",
      emoji: "🪨",
    },
    paseoMontejo: {
      name: "Paseo de Montejo",
      image: "IMAGENES LUXECITA/MONTEJO LUXECITA.jpeg",
      gradient: "linear-gradient(145deg, #F5F0E8 0%, #E8DCC8 25%, #C4956A 50%, #8B4513 75%, #2F1810 100%)",
      overlay: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%)",
      accent: "#C4956A",
      emoji: "🏘️",
    },
    izamal: {
      name: "Izamal",
      image: "IMAGENES LUXECITA/IZAMAL LUXECITA.png",
      gradient: "linear-gradient(140deg, #FFD700 0%, #FFC125 25%, #F0A500 50%, #E8891C 75%, #CC6600 100%)",
      overlay: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.5) 100%)",
      accent: "#FFD700",
      emoji: "💛",
    },
    sanBenito: {
      name: "Mercado de San Benito",
      image: "IMAGENES LUXECITA/MERCADO LUXECITA.png",
      gradient: "linear-gradient(150deg, #DC143C 0%, #FF6347 25%, #FF8C42 50%, #FFB347 75%, #FFDAB9 100%)",
      overlay: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%)",
      accent: "#FF6347",
      emoji: "🌮",
    },
    celestun: {
      name: "Celestún",
      image: "imagenes/celestun.jpg",
      gradient: "linear-gradient(135deg, #FF69B4 0%, #FFB6C1 20%, #87CEEB 45%, #00CED1 70%, #008B8B 100%)",
      overlay: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.5) 100%)",
      accent: "#FF69B4",
      emoji: "🦩",
    },
    cenotes: {
      name: "Cenotes de Yucatán",
      image: "imagenes/cenotes.jpg",
      gradient: "linear-gradient(170deg, #004D40 0%, #00796B 25%, #00ACC1 50%, #26C6DA 70%, #80DEEA 100%)",
      overlay: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.55) 100%)",
      accent: "#00ACC1",
      emoji: "💎",
    },
    pueblosMagicos: {
      name: "Pueblos Mágicos de Yucatán",
      image: "imagenes/pueblosMagicos.jpg",
      gradient: "linear-gradient(155deg, #6A0572 0%, #AB47BC 25%, #CE93D8 45%, #F48FB1 70%, #FF8A65 100%)",
      overlay: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%)",
      accent: "#CE93D8",
      emoji: "✨",
    },
  };

  // ─── SALUDOS ───
  //
  // Cada saludo tiene:
  //   place → clave del lugar en PLACES
  //   text  → texto que aparece en el chat
  //   audio → ruta al MP3 (null si aún no lo tienes grabado)
  //
  const GREETINGS = [
    {
      place: "chichenItza",
      text: "¡Hola! Soy Luxecita 💃 Estoy aquí en Chichén Itzá, frente a la majestuosa pirámide de Kukulkán. ¡Qué calorcito hace hoy! ¿En qué te puedo ayudar?",
      audio: "SALUDOS LUXECITA/saludochichen.mp3",
    },
    {
      place: "uxmal",
      text: "¡Buen día! Soy Luxecita y te saludo desde las ruinas de Uxmal, una joya maya que te deja sin palabras. ¿Qué necesitas saber hoy?",
      audio: "SALUDOS LUXECITA/saludouxmal.mp3",
    },
    {
      place: "paseoMontejo",
      text: "¡Hola, qué gusto! Soy Luxecita y estoy paseando por el Paseo de Montejo, entre casonas hermosas y árboles enormes. ¿En qué te echo la mano?",
      audio: "SALUDOS LUXECITA/saludopaseomontejo.mp3",
    },
    {
      place: "izamal",
      text: "¡Hola! Soy Luxecita 🌻 Te escribo desde Izamal, la ciudad amarilla. Todo aquí brilla como el sol de Yucatán. ¿Qué te gustaría saber?",
      audio: "SALUDOS LUXECITA/saludoizamal.mp3",
    },
    {
      place: "sanBenito",
      text: "¡Hola! Soy Luxecita 🌮 Me encuentro en el Mercado de San Benito. Deberías venir a comer una torta de cochinita. ¿En qué puedo ayudarte?",
      audio: "SALUDOS LUXECITA/saludomercado.mp3",
    },
    {
      place: "celestun",
      text: "¡Hola! Soy Luxecita y estoy en Celestún, viendo los flamingos rosados volar sobre el manglar. ¡Qué belleza! ¿Te ayudo en algo?",
      audio: "audio/celestun.mp3",
    },
    {
      place: "cenotes",
      text: "¡Hola! Soy Luxecita 💦 Estoy en uno de los cenotes sagrados de Yucatán. El agua está cristalina hoy. ¿En qué te puedo orientar?",
      audio: "audio/cenotes.mp3",
    },
    {
      place: "pueblosMagicos",
      text: "¡Hola, bienvenido! Soy Luxecita y te saludo desde los Pueblos Mágicos de Yucatán, donde la tradición se vive en cada esquina. ¿Qué necesitas?",
      audio: "audio/pueblosMagicos.mp3",
    },
  ];

  // ─── BOTONES RÁPIDOS ───
  const QUICK_ACTIONS = [
    { label: "Afiliarme a la CNOP", icon: "📋", query: "¿Cómo me afilio a la CNOP?" },
    { label: "Beneficios", icon: "🎁", query: "¿Qué beneficios tiene la CNOP?" },
    { label: "Eventos", icon: "📅", query: "¿Qué eventos hay próximamente?" },
    { label: "Historia", icon: "📖", query: "¿Cuál es la historia de la CNOP?" },
  ];

  // ─── BASE DE CONOCIMIENTO ───
  const KNOWLEDGE_BASE = {
    afiliacion: {
      keywords: ["afilio", "afiliar", "afiliación", "afiliarme", "inscribir", "unirme", "registro", "registrar"],
      response:
        "¡Claro que sí! Afiliarte a la CNOP es muy sencillo 📋\n\nSolo necesitas:\n• Ser mayor de 18 años\n• Tu credencial de elector (INE) vigente\n• Comprobante de domicilio reciente\n• 2 fotografías tamaño infantil\n\nPuedes acudir a nuestras oficinas en Mérida, Yucatán, o contactarnos por este medio para iniciar tu trámite. ¡Te esperamos con los brazos abiertos! 🤗",
    },
    beneficios: {
      keywords: ["beneficio", "beneficios", "ventaja", "ventajas", "ofrece", "obtener", "gano"],
      response:
        "¡Los beneficios de ser parte de la CNOP son muchos! 🎁\n\n✅ Capacitación y talleres gratuitos\n✅ Asesoría jurídica y legal\n✅ Gestión social y comunitaria\n✅ Acceso a programas de desarrollo\n✅ Red de apoyo y networking\n✅ Participación en eventos y convenciones\n✅ Representación ante instancias de gobierno\n\n¡Ser parte de la CNOP es ser parte de una gran familia! 💪",
    },
    eventos: {
      keywords: ["evento", "eventos", "actividad", "actividades", "próximo", "calendario", "agenda"],
      response:
        "¡Siempre hay algo pasando en la CNOP! 📅\n\nPróximos eventos:\n🗓️ Asamblea General Ordinaria\n🗓️ Jornada de Capacitación para Líderes\n🗓️ Feria de Servicios Comunitarios\n🗓️ Encuentro Juvenil CNOP\n\nTe recomiendo seguirnos en redes sociales para estar al día con fechas y lugares. ¡No te los pierdas! 🎉",
    },
    historia: {
      keywords: ["historia", "fundación", "fundó", "origen", "surgió", "creó", "antigüedad", "cuándo"],
      response:
        "¡La CNOP tiene una historia muy rica! 📖\n\nLa Confederación Nacional de Organizaciones Populares fue fundada el 28 de marzo de 1943. Nació como un espacio para representar a los sectores populares de México: profesionistas, comerciantes, artesanos, jóvenes y ciudadanos comprometidos.\n\nDesde entonces, la CNOP ha sido voz de las comunidades y promotora del desarrollo social en todo el país. ¡Más de 80 años de historia nos respaldan! 🇲🇽",
    },
    oficinas: {
      keywords: ["oficina", "oficinas", "dirección", "ubicación", "dónde", "donde", "horario", "horarios", "contacto"],
      response:
        "¡Con gusto te comparto nuestra información de contacto! 📍\n\nOficinas de la CNOP Yucatán:\n📌 Mérida, Yucatán, México\n🕐 Horario: Lunes a Viernes de 9:00 a 17:00 hrs\n📞 Puedes contactarnos por teléfono o redes sociales\n\n¡Te esperamos! Estamos para servirte 🙌",
    },
    programas: {
      keywords: ["programa", "programas", "proyecto", "proyectos", "iniciativa", "apoyo", "apoyos"],
      response:
        "¡La CNOP tiene varios programas para ti! 🌟\n\n📚 Programa de Educación y Becas\n💼 Impulso al Emprendimiento\n🏥 Jornadas de Salud Comunitaria\n👩‍💼 Empoderamiento de la Mujer\n🌱 Desarrollo Sustentable\n🤝 Gestión Social y Comunitaria\n\nCada programa busca mejorar la calidad de vida de nuestras comunidades. ¿Te interesa alguno en especial? 😊",
    },
  };

  // ─── ESTADO ───
  let state = {
    isOpen: false,
    hasGreeted: false,
    isTyping: false,
    isPlaying: false,
    currentPlace: PLACES.chichenItza,
    currentAudio: null,
    messages: [],
    messageCount: 0,
  };

  // ─── UTILIDADES ───
  function normalize(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function findResponse(text) {
    const lower = normalize(text);
    for (const key in KNOWLEDGE_BASE) {
      const entry = KNOWLEDGE_BASE[key];
      for (const kw of entry.keywords) {
        if (lower.includes(normalize(kw))) return entry.response;
      }
    }
    return null;
  }

  function getRandomPlace() {
    const keys = Object.keys(PLACES);
    return PLACES[keys[Math.floor(Math.random() * keys.length)]];
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // ─── REFERENCIAS DOM ───
  let $widget,
    $avatarBtn,
    $chatWindow,
    $bgLayer,
    $overlayLayer,
    $messagesContainer,
    $quickActions,
    $textInput,
    $sendBtn,
    $locationText,
    $locationEmoji,
    $soundIndicator;

  // ─── RENDERIZADO ───
  function init() {
    $widget = document.getElementById("luxecita-widget");
    if (!$widget) {
      $widget = document.createElement("div");
      $widget.id = "luxecita-widget";
      document.body.appendChild($widget);
    }

    $widget.innerHTML = buildHTML();

    $avatarBtn = $widget.querySelector(".luxe-avatar-btn");
    $chatWindow = $widget.querySelector(".luxe-chat-window");
    $bgLayer = $widget.querySelector(".luxe-bg-layer");
    $overlayLayer = $widget.querySelector(".luxe-overlay-layer");
    $messagesContainer = $widget.querySelector(".luxe-messages");
    $quickActions = $widget.querySelector(".luxe-quick-actions");
    $textInput = $widget.querySelector(".luxe-text-input");
    $sendBtn = $widget.querySelector(".luxe-send-btn");
    $locationText = $widget.querySelector(".luxe-location-text");
    $locationEmoji = $widget.querySelector(".place-emoji");
    $soundIndicator = $widget.querySelector(".luxe-sound-indicator");

    $avatarBtn.addEventListener("click", openChat);
    $widget.querySelector(".luxe-close-btn").addEventListener("click", closeChat);
    $sendBtn.addEventListener("click", function () { handleSend(); });
    $textInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });
    $textInput.addEventListener("input", updateSendButton);

    $quickActions.querySelectorAll(".luxe-quick-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        handleSend(btn.getAttribute("data-query"));
      });
    });

    $chatWindow.classList.add("hidden");
    applyPlace(state.currentPlace);
  }

  function buildHTML() {
    var quickBtns = QUICK_ACTIONS.map(function (a) {
      return (
        '<button class="luxe-quick-btn" data-query="' + escapeHTML(a.query) + '">' +
        '<span class="icon">' + a.icon + "</span>" +
        escapeHTML(a.label) +
        "</button>"
      );
    }).join("");

    return (
      '<button class="luxe-avatar-btn" aria-label="Abrir chat con Luxecita">👩🏽</button>' +
      '<div class="luxe-chat-window hidden">' +
      '  <div class="luxe-bg-layer"></div>' +
      '  <div class="luxe-overlay-layer"></div>' +
      '  <div class="luxe-texture-layer"></div>' +
      '  <div class="luxe-particles">' +
      '    <div class="luxe-particle"></div>' +
      '    <div class="luxe-particle"></div>' +
      '    <div class="luxe-particle"></div>' +
      '    <div class="luxe-particle"></div>' +
      '    <div class="luxe-particle"></div>' +
      '  </div>' +
      '  <div class="luxe-header">' +
      '    <div class="luxe-header-avatar">👩🏽</div>' +
      '    <div class="luxe-header-info">' +
      '      <div class="luxe-header-name">Luxecita</div>' +
      '      <div class="luxe-header-location">' +
      '        <span class="place-emoji">🏛️</span>' +
      '        <span class="luxe-location-text">Chichén Itzá</span>' +
      '        <span class="luxe-sound-indicator">' +
      '          <span class="luxe-sound-bar"></span>' +
      '          <span class="luxe-sound-bar"></span>' +
      '          <span class="luxe-sound-bar"></span>' +
      '          <span class="luxe-sound-bar"></span>' +
      '          <span class="luxe-sound-bar"></span>' +
      '          <span class="luxe-sound-note">♪</span>' +
      '        </span>' +
      '      </div>' +
      '    </div>' +
      '    <button class="luxe-close-btn" aria-label="Cerrar chat">✕</button>' +
      '  </div>' +
      '  <div class="luxe-messages">' +
      '    <div class="luxe-quick-actions">' + quickBtns + '</div>' +
      '  </div>' +
      '  <div class="luxe-input-area">' +
      '    <div class="luxe-input-wrapper">' +
      '      <input class="luxe-text-input" type="text" placeholder="Escribe tu pregunta..." autocomplete="off" />' +
      '      <button class="luxe-send-btn" aria-label="Enviar mensaje">➤</button>' +
      '    </div>' +
      '    <div class="luxe-footer-brand">CNOP Yucatán · con Luxecita</div>' +
      '  </div>' +
      '</div>'
    );
  }

  // ══════════════════════════════════════
  //  ABRIR CHAT
  // ══════════════════════════════════════
  function openChat() {
    state.isOpen = true;
    $avatarBtn.classList.add("hidden");
    $chatWindow.classList.remove("hidden");
    $chatWindow.classList.remove("closing");
    $textInput.focus();

    if (!state.hasGreeted) {
      var greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
      var place = PLACES[greeting.place];
      state.currentPlace = place;
      applyPlace(place);

      // ► Reproducir audio del saludo
      playGreetingAudio(greeting.audio);

      setTimeout(function () {
        addMessage("luxecita", greeting.text);
        state.hasGreeted = true;
        showQuickActions();
      }, 500);
    }
  }

  // ══════════════════════════════════════
  //  CERRAR CHAT (limpia todo)
  // ══════════════════════════════════════
  function closeChat() {
    // Detener audio inmediatamente
    stopAudio();

    $chatWindow.classList.add("closing");
    setTimeout(function () {
      // Resetear estado completo
      state.isOpen = false;
      state.hasGreeted = false;
      state.messages = [];
      state.messageCount = 0;
      state.isTyping = false;
      state.isPlaying = false;

      // Limpiar mensajes del DOM (conservar solo quick actions)
      var allChildren = Array.from($messagesContainer.children);
      allChildren.forEach(function (child) {
        if (child !== $quickActions) {
          child.remove();
        }
      });
      $quickActions.style.display = "none";
      $textInput.value = "";
      setPlaying(false);

      $chatWindow.classList.add("hidden");
      $chatWindow.classList.remove("closing");
      $avatarBtn.classList.remove("hidden");
    }, 300);
  }

  // ══════════════════════════════════════
  //  AUDIO
  // ══════════════════════════════════════
  function playGreetingAudio(audioSrc) {
    if (!audioSrc) {
      // Sin audio configurado → solo indicador visual 4 segundos
      setPlaying(true);
      setTimeout(function () { setPlaying(false); }, 4000);
      return;
    }

    stopAudio();

    var audio = new Audio(audioSrc);
    state.currentAudio = audio;

    audio.addEventListener("play", function () {
      setPlaying(true);
    });

    // Cuando termina el audio → apagar indicador
    audio.addEventListener("ended", function () {
      setPlaying(false);
      state.currentAudio = null;
    });

    // Si el archivo no existe aún → indicador visual de respaldo
    audio.addEventListener("error", function () {
      console.warn("Luxecita: No se encontró " + audioSrc + " — usando indicador visual.");
      setPlaying(true);
      setTimeout(function () { setPlaying(false); }, 4000);
      state.currentAudio = null;
    });

    audio.play().catch(function () {
      console.warn("Luxecita: El navegador bloqueó la reproducción del audio.");
      setPlaying(true);
      setTimeout(function () { setPlaying(false); }, 4000);
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

  // ══════════════════════════════════════
  //  FONDO DINÁMICO (foto o gradiente)
  // ══════════════════════════════════════
  function applyPlace(place) {
    if (place.image) {
      var img = new Image();
      img.onload = function () {
        // ✅ La imagen existe → usarla de fondo
        $bgLayer.style.background = "url('" + place.image + "') center center / cover no-repeat";
        $bgLayer.style.animation = "none";
      };
      img.onerror = function () {
        // ❌ No existe → usar gradiente de respaldo
        console.warn("Luxecita: No se encontró " + place.image + " — usando gradiente.");
        $bgLayer.style.background = place.gradient;
        $bgLayer.style.backgroundSize = "200% 200%";
        $bgLayer.style.animation = "luxeBgShift 15s ease infinite";
      };
      img.src = place.image;
    } else {
      $bgLayer.style.background = place.gradient;
      $bgLayer.style.backgroundSize = "200% 200%";
      $bgLayer.style.animation = "luxeBgShift 15s ease infinite";
    }

    // Overlay oscuro para legibilidad (siempre se aplica)
    $overlayLayer.style.background = place.overlay;

    // Header
    $locationText.textContent = place.name;
    $locationEmoji.textContent = place.emoji;
    $soundIndicator.style.color = place.accent;
  }

  function setPlaying(active) {
    state.isPlaying = active;
    if (active) {
      $soundIndicator.classList.add("active");
    } else {
      $soundIndicator.classList.remove("active");
    }
  }

  function showQuickActions() {
    $messagesContainer.appendChild($quickActions);
    $quickActions.style.display = "flex";
    scrollToBottom();
  }

  function hideQuickActions() {
    $quickActions.style.display = "none";
  }

  function updateSendButton() {
    if ($textInput.value.trim() && !state.isTyping) {
      $sendBtn.classList.add("active");
    } else {
      $sendBtn.classList.remove("active");
    }
  }

  function scrollToBottom() {
    requestAnimationFrame(function () {
      $messagesContainer.scrollTop = $messagesContainer.scrollHeight;
    });
  }

  // ─── MENSAJES ───
  function addMessage(role, text) {
    state.messageCount++;
    var row = document.createElement("div");
    row.className = "luxe-msg-row " + role;

    var html = "";
    if (role === "luxecita") {
      html +=
        '<div class="luxe-msg-avatar">👩🏽</div>' +
        '<div class="luxe-msg-bubble bot">' + escapeHTML(text) + "</div>";
    } else {
      html += '<div class="luxe-msg-bubble user">' + escapeHTML(text) + "</div>";
    }

    row.innerHTML = html;

    if ($quickActions.parentNode === $messagesContainer) {
      $messagesContainer.insertBefore(row, $quickActions);
    } else {
      $messagesContainer.appendChild(row);
    }

    state.messages.push({ role: role, text: text });
    scrollToBottom();
  }

  function showTyping() {
    state.isTyping = true;
    updateSendButton();

    var row = document.createElement("div");
    row.className = "luxe-typing-row";
    row.id = "luxe-typing-indicator";
    row.innerHTML =
      '<div class="luxe-msg-avatar">👩🏽</div>' +
      '<div class="luxe-typing-bubble">' +
      '  <div class="luxe-typing-dot"></div>' +
      '  <div class="luxe-typing-dot"></div>' +
      '  <div class="luxe-typing-dot"></div>' +
      "</div>";

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
    var indicator = document.getElementById("luxe-typing-indicator");
    if (indicator) indicator.remove();
  }

  // ─── ENVÍO Y RESPUESTA ───
  async function handleSend(forcedText) {
    var text = forcedText || $textInput.value.trim();
    if (!text || state.isTyping) return;

    $textInput.value = "";
    updateSendButton();

    if (state.messageCount <= 1) {
      hideQuickActions();
    }

    addMessage("user", text);
    showTyping();

    var delay = 800 + Math.random() * 1200;
    await new Promise(function (r) { setTimeout(r, delay); });

    var localResponse = findResponse(text);

    if (localResponse) {
      hideTyping();
      var newPlace = getRandomPlace();
      state.currentPlace = newPlace;
      applyPlace(newPlace);
      addMessage("luxecita", localResponse);
      return;
    }

    // Fallback: API de Claude
    try {
      var res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system:
            "Eres Luxecita, la asistente virtual de la CNOP Yucatán. Eres amable, cálida y cercana. " +
            "Usas referencias culturales de Yucatán (comida, lugares, tradiciones). Respondes en español " +
            "con un tono alegre y servicial. Si no sabes algo específico de la CNOP, sugiere amablemente " +
            "contactar las oficinas. Mantén respuestas concisas (máximo 3 párrafos). Usa algunos emojis con moderación.",
          messages: [{ role: "user", content: text }],
        }),
      });

      var data = await res.json();
      var aiText =
        (data.content && data.content.map(function (c) { return c.text || ""; }).join("")) ||
        "¡Ay, disculpa! No pude procesar tu mensaje. ¿Podrías intentar de nuevo? 🙏";

      hideTyping();
      var newPlace2 = getRandomPlace();
      state.currentPlace = newPlace2;
      applyPlace(newPlace2);
      addMessage("luxecita", aiText);
    } catch (err) {
      hideTyping();
      addMessage(
        "luxecita",
        "¡Uy, parece que tuve un problemita de conexión! 😅 Pero no te preocupes, puedes intentar de nuevo o usar los botones de ayuda. ¡Estoy para servirte!"
      );
    }
  }

  // ─── ARRANQUE ───
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
