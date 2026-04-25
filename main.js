/**
 * CNOP MERIDA V2 - JAVASCRIPT COMPLETO
 * Con Chatbot Inteligente
 */
window.addEventListener("load", function() {
  document.getElementById("popup").style.display = "flex";
});

function cerrarPopup() {
  document.getElementById("popup").style.display = "none";
}
// Inicializar Lucide Icons
lucide.createIcons();

// ==================== HEADER ====================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// ==================== MOBILE MENU ====================
document.addEventListener("DOMContentLoaded", () => {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
});

// Cerrar menu al hacer click en enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.offsetTop - 90, behavior: 'smooth' });
        }
    });
});

// ==================== ACTIVE NAV ON SCROLL ====================
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 150) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ==================== FORMS ====================
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    this.reset();
});

document.getElementById('affiliationForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('¡Gracias por tu interés en afiliarte! Nos pondremos en contacto contigo para completar el proceso.');
    this.reset();
});

// ==================== CHATBOT INTELIGENTE ====================
const chatbot = {
    trigger: document.getElementById('chatbotTrigger'),
    window: document.getElementById('chatbotWindow'),
    closeBtn: document.getElementById('chatbotClose'),
    messages: document.getElementById('chatbotMessages'),
    input: document.getElementById('chatbotInput'),
    sendBtn: document.getElementById('chatbotSend'),
    notification: document.querySelector('.chatbot-notification'),
    isOpen: false,
    hasGreeted: false,

    responses: {
        programas: `🏠 <strong>Programas de Gestión y Apoyos:</strong>

1️⃣ <strong>Vivienda Digna</strong> - Techos, pisos y muros (+2,500 familias)
2️⃣ <strong>Jornadas de Salud</strong> - Consultas médicas gratuitas (+8,000 atenciones)
3️⃣ <strong>Becas Educativas</strong> - Apoyo a estudiantes (+500 becarios)
4️⃣ <strong>Capacitación Laboral</strong> - Cursos de oficios (+1,200 capacitados)
5️⃣ <strong>Adultos Mayores</strong> - Actividades y apoyo alimentario
6️⃣ <strong>Asesoría Legal</strong> - Orientación jurídica gratuita

¿Te interesa alguno? Puedo darte más información.`,

        horarios: `🕐 <strong>Horarios de Atención Ciudadana:</strong>

📅 <strong>Lunes a Viernes:</strong> 9:00 AM - 5:00 PM
📅 <strong>Sábados:</strong> 9:00 AM - 1:00 PM
📅 <strong>Domingos:</strong> Cerrado

📍 Te esperamos en Calle 60 #500, Centro, Mérida.

💡 Te recomendamos llegar temprano para mejor atención.`,

        ubicacion: `📍 <strong>Nuestra Ubicación:</strong>

🏢 Calle 60 #500 x 65 y 67
Colonia Centro, Mérida, Yucatán
CP 97000

🚗 A dos cuadras del Parque de Santiago

<a href="https://maps.google.com/?q=20.9674,-89.6237" target="_blank" style="color:#C41E3A;text-decoration:underline;">📌 Ver en Google Maps</a>`,

        requisitos: `📄 <strong>Requisitos Generales para Apoyos:</strong>

✅ Identificación oficial (INE vigente)
✅ Comprobante de domicilio reciente
✅ CURP
✅ Acta de nacimiento
✅ Fotografías tamaño infantil

⚠️ Los requisitos pueden variar según el programa. Visita nuestra oficina de <strong>Atención Ciudadana</strong> para más detalles.`,

        afiliacion: `🤝 <strong>¡Únete a la CNOP!</strong>

<strong>Requisitos para afiliarte:</strong>
✅ Ser mayor de 18 años
✅ INE vigente
✅ Comprobante de domicilio
✅ 2 fotografías tamaño infantil

<strong>Beneficios:</strong>
🎯 Acceso a programas sociales
🎯 Capacitación gratuita
🎯 Asesoría legal
🎯 Jornadas de salud
🎯 Red de apoyo comunitario

📝 Puedes registrarte en la sección "Súmate" de nuestra página o visitarnos directamente.`,

        juventud: `⚡ <strong>Juventud CNOP</strong>

¿Tienes entre 18 y 35 años? ¡Este es tu espacio!

<strong>Te ofrecemos:</strong>
🎓 Programas de liderazgo
🚀 Capacitación en emprendimiento
🤝 Oportunidades de voluntariado
📚 Acceso a becas educativas

<strong>Únete al movimiento juvenil</strong> que está transformando Yucatán. Inscríbete en la sección "Juventud CNOP" de nuestra página.`,

        agenda: `📅 <strong>Próximos Eventos:</strong>

🏥 <strong>25 Enero</strong> - Jornada de Salud Comunitaria
    Parque Col. Emiliano Zapata | 8am-4pm

📚 <strong>28 Enero</strong> - Curso de Repostería
    Oficinas CNOP | 10am

👥 <strong>2 Febrero</strong> - Asamblea Zona Norte
    Casa de la Cultura | 6pm

🎓 <strong>8 Febrero</strong> - Entrega de Becas
    Auditorio Municipal | 11am

Consulta nuestra sección de Agenda para más eventos.`,

        contacto: `📞 <strong>Formas de Contacto:</strong>

☎️ <strong>Teléfono:</strong> (999) 123 4567
📧 <strong>Email:</strong> contacto@cnopmerida.org
💬 <strong>WhatsApp:</strong> <a href="https://wa.me/529991234567" target="_blank" style="color:#C41E3A;">Enviar mensaje</a>

🏢 <strong>Dirección:</strong>
Calle 60 #500 x 65 y 67, Centro, Mérida

¡Estamos para servirte!`,

        transparencia: `📊 <strong>Transparencia e Impacto:</strong>

Nuestros resultados hablan por nosotros:

👨‍👩‍👧‍👦 <strong>15,000+</strong> Familias beneficiadas
🏠 <strong>2,500+</strong> Viviendas mejoradas
🏥 <strong>8,000+</strong> Atenciones médicas
🎓 <strong>500+</strong> Becas otorgadas
📍 <strong>50+</strong> Colonias atendidas

Consulta nuestros informes y documentos en la sección de Transparencia.`,

        default: `Gracias por tu mensaje. 😊

Para brindarte mejor atención, te invito a:
📞 Llamarnos: (999) 123 4567
💬 <a href="https://wa.me/529991234567" target="_blank" style="color:#C41E3A;">WhatsApp</a>
🏢 Visitarnos en Atención Ciudadana

O selecciona una opción del menú. ⬇️`
    },

    init() {
        this.trigger.addEventListener('click', () => this.toggle());
        this.closeBtn.addEventListener('click', () => this.close());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        document.querySelectorAll('.quick-action').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.handleQuickAction(action, btn.textContent.trim());
            });
        });

        setTimeout(() => {
            if (!this.hasGreeted) {
                this.showGreeting();
            }
        }, 2500);
    },

    toggle() {
        this.isOpen = !this.isOpen;
        this.window.classList.toggle('active', this.isOpen);
        this.trigger.classList.toggle('active', this.isOpen);
        
        if (this.isOpen) {
            this.notification.style.display = 'none';
            if (!this.hasGreeted) {
                this.showGreeting();
            }
            this.input.focus();
        }
    },

    close() {
        this.isOpen = false;
        this.window.classList.remove('active');
        this.trigger.classList.remove('active');
    },

    showGreeting() {
        this.hasGreeted = true;
        this.addMessage(`¡Hola! 👋 Bienvenido a <strong>CNOP Mérida</strong>.

Soy tu asistente virtual. Puedo ayudarte con información sobre:

• Programas y apoyos sociales
• Atención ciudadana
• Cómo afiliarte
• Juventud CNOP
• Agenda y eventos

¿En qué puedo ayudarte hoy?`, 'bot');
    },

    addMessage(text, type) {
        const time = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${type}`;
        msgDiv.innerHTML = `${text}<span class="message-time">${time}</span>`;
        this.messages.appendChild(msgDiv);
        this.scrollToBottom();
        lucide.createIcons();
    },

    showTyping() {
        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.id = 'typingIndicator';
        typing.innerHTML = '<span></span><span></span><span></span>';
        this.messages.appendChild(typing);
        this.scrollToBottom();
    },

    hideTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    },

    scrollToBottom() {
        const body = document.getElementById('chatbotBody');
        body.scrollTop = body.scrollHeight;
    },

    handleQuickAction(action, label) {
        this.addMessage(label, 'user');
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            const response = this.responses[action] || this.responses.default;
            this.addMessage(response, 'bot');
        }, 700);
    },

    sendMessage() {
        const text = this.input.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        this.input.value = '';
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            const response = this.analyzeMessage(text);
            this.addMessage(response, 'bot');
        }, 900);
    },

    analyzeMessage(text) {
        const lower = text.toLowerCase();
        
        if (lower.includes('programa') || lower.includes('apoyo') || lower.includes('gestion') || lower.includes('ayuda') || lower.includes('beneficio')) {
            return this.responses.programas;
        }
        if (lower.includes('horario') || lower.includes('hora') || lower.includes('abren') || lower.includes('atienden')) {
            return this.responses.horarios;
        }
        if (lower.includes('donde') || lower.includes('ubicacion') || lower.includes('direccion') || lower.includes('llegar')) {
            return this.responses.ubicacion;
        }
        if (lower.includes('requisito') || lower.includes('necesito') || lower.includes('documento') || lower.includes('papeles')) {
            return this.responses.requisitos;
        }
        if (lower.includes('contacto') || lower.includes('telefono') || lower.includes('llamar') || lower.includes('whatsapp') || lower.includes('correo')) {
            return this.responses.contacto;
        }
        if (lower.includes('afiliar') || lower.includes('unir') || lower.includes('inscribir') || lower.includes('sumar') || lower.includes('miembro')) {
            return this.responses.afiliacion;
        }
        if (lower.includes('joven') || lower.includes('juventud') || lower.includes('chavos')) {
            return this.responses.juventud;
        }
        if (lower.includes('evento') || lower.includes('agenda') || lower.includes('actividad') || lower.includes('calendario')) {
            return this.responses.agenda;
        }
        if (lower.includes('transparencia') || lower.includes('resultado') || lower.includes('impacto') || lower.includes('informe')) {
            return this.responses.transparencia;
        }
        if (lower.includes('vivienda') || lower.includes('casa') || lower.includes('techo') || lower.includes('piso')) {
            return `🏠 <strong>Programa de Vivienda Digna</strong>

Ofrecemos apoyo para mejorar tu hogar:
• Techos de lámina o concreto
• Pisos firmes
• Muros y acabados
• Servicios básicos

<strong>+2,500 familias</strong> beneficiadas

Visita Atención Ciudadana para más información.`;
        }
        if (lower.includes('salud') || lower.includes('medico') || lower.includes('doctor') || lower.includes('consulta') || lower.includes('jornada')) {
            return `🏥 <strong>Jornadas de Salud</strong>

Brigadas médicas gratuitas:
• Consulta general
• Medicamentos básicos
• Estudios preventivos
• Vacunación

<strong>+8,000 atenciones</strong> realizadas

📅 Próxima jornada: 25 de Enero
📍 Parque Col. Emiliano Zapata`;
        }
        if (lower.includes('beca') || lower.includes('estudio') || lower.includes('escuela') || lower.includes('estudiante') || lower.includes('educacion')) {
            return `📚 <strong>Becas Educativas</strong>

Apoyo económico para estudiantes:
• Primaria y secundaria
• Preparatoria
• Universidad

<strong>Requisitos:</strong>
• Promedio mínimo de 8.0
• Constancia de estudios
• Comprobante de bajos recursos

<strong>+500 becarios</strong> activos`;
        }
        if (lower.includes('hola') || lower.includes('buenos') || lower.includes('buenas') || lower.includes('saludos') || lower.includes('que tal')) {
            return `¡Hola! 👋 ¿Cómo estás?

Soy el asistente virtual de CNOP Mérida. ¿En qué puedo ayudarte?

Puedes preguntarme sobre:
• Programas y apoyos
• Cómo afiliarte
• Atención ciudadana
• Juventud CNOP
• Eventos y agenda

O selecciona una opción del menú. 😊`;
        }
        if (lower.includes('gracias') || lower.includes('muchas gracias')) {
            return `¡De nada! 😊 Es un placer ayudarte.

¿Hay algo más en lo que pueda asistirte?

Recuerda:
📞 (999) 123 4567
🏢 Calle 60 #500, Centro

¡Estamos para servirte!`;
        }
        if (lower.includes('atencion') || lower.includes('ciudadana') || lower.includes('queja') || lower.includes('denuncia')) {
            return `🎯 <strong>Atención Ciudadana</strong>

Nuestro centro de atención te ayuda con:
• Recepción de solicitudes
• Orientación ciudadana
• Canalización de apoyos
• Seguimiento de casos
• Quejas y sugerencias

📞 Línea directa: (999) 123 4567
📧 atencion@cnopmerida.org
💬 WhatsApp: 999 123 4567

¡Tu voz es importante para nosotros!`;
        }

        return this.responses.default;
    }
};

// Inicializar chatbot
document.addEventListener('DOMContentLoaded', () => {
    chatbot.init();
});

// Reinicializar iconos
setTimeout(() => lucide.createIcons(), 100);



console.log('CNOP Mérida V2 - Sitio cargado correctamente');


// ============================================================
//  CNOP YUCATÁN — Google Apps Script
//  Pega TODO este código en script.google.com
//  Instrucciones completas al final del archivo
// ============================================================

// ⚙️ ÚNICO VALOR QUE DEBES CAMBIAR:
// Reemplaza esto con el ID de tu Google Sheet
// (está en la URL: docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit)
const SHEET_ID = 'TU_GOOGLE_SHEET_ID';

// Nombre de la hoja dentro del archivo (no cambies si usas el nombre sugerido)
const HOJA    = 'Afiliados';

// Columnas — no cambiar el orden
const COLS = ['Folio','Nombre','Telefono','Correo','Edad','Colonia','Motivacion','Fecha'];


// ============================================================
//  GET — Buscar duplicado
//  Llamado cuando alguien escribe su teléfono o correo
// ============================================================
function doGet(e) {
  try {
    const accion = e.parameter.action;
    const campo  = e.parameter.campo;   // 'telefono' | 'correo'
    const valor  = e.parameter.valor;

    if (accion !== 'buscar' || !campo || !valor) {
      return jsonResponse({ error: 'Parámetros inválidos' });
    }

    const sheet = getHoja();
    const datos = sheet.getDataRange().getValues();
    const headers = datos[0].map(h => h.toString().toLowerCase());
    const colIdx  = headers.indexOf(campo.toLowerCase());

    if (colIdx === -1) return jsonResponse({ encontrado: false });

    // Buscar desde la fila 2 (fila 1 = encabezados)
    for (let i = 1; i < datos.length; i++) {
      const celda = datos[i][colIdx] ? datos[i][colIdx].toString().trim() : '';
      if (celda.toLowerCase() === valor.toLowerCase().trim()) {
        const folioIdx = headers.indexOf('folio');
        const folio = folioIdx >= 0 ? datos[i][folioIdx] : '(sin folio)';
        return jsonResponse({ encontrado: true, folio: folio.toString() });
      }
    }

    return jsonResponse({ encontrado: false });

  } catch(err) {
    return jsonResponse({ error: err.message });
  }
}


// ============================================================
//  POST — Guardar nuevo afiliado
// ============================================================
function doPost(e) {
  try {
    const body  = JSON.parse(e.postData.contents);
    const accion = body.action;

    if (accion !== 'guardar') {
      return jsonResponse({ ok: false, error: 'Acción desconocida' });
    }

    const sheet = getHoja();
    const hoy   = new Date();
    const fecha = Utilities.formatDate(hoy, 'America/Merida', 'dd/MM/yyyy HH:mm');

    // Insertar fila nueva al final
    sheet.appendRow([
      body.folio      || '',
      body.nombre     || '',
      body.telefono   || '',
      body.correo     || '',
      body.edad       || '',
      body.colonia    || '',
      body.motivacion || '',
      fecha
    ]);

    // Colorear la fila recién insertada (verde claro)
    const ultima = sheet.getLastRow();
    sheet.getRange(ultima, 1, 1, COLS.length)
         .setBackground('#e8f5e9');

    return jsonResponse({ ok: true, fila: ultima });

  } catch(err) {
    return jsonResponse({ ok: false, error: err.message });
  }
}


// ============================================================
//  HELPERS
// ============================================================
function getHoja() {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(HOJA);

  // Si la hoja no existe, crearla con encabezados
  if (!sheet) {
    sheet = ss.insertSheet(HOJA);
    const encabezados = sheet.getRange(1, 1, 1, COLS.length);
    encabezados.setValues([COLS]);

    // Estilo encabezados
    encabezados
      .setBackground('#C41E3A')
      .setFontColor('#ffffff')
      .setFontWeight('bold')
      .setHorizontalAlignment('center');

    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 140);  // Folio
    sheet.setColumnWidth(2, 200);  // Nombre
    sheet.setColumnWidth(3, 130);  // Telefono
    sheet.setColumnWidth(4, 200);  // Correo
    sheet.setColumnWidth(5, 60);   // Edad
    sheet.setColumnWidth(6, 160);  // Colonia
    sheet.setColumnWidth(7, 250);  // Motivacion
    sheet.setColumnWidth(8, 140);  // Fecha
  }
  return sheet;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}


// ============================================================
//
//  📋 INSTRUCCIONES DE CONFIGURACIÓN (léelas antes de publicar)
//
//  1. Abre Google Sheets → crea una hoja nueva y cópiala URL:
//     docs.google.com/spreadsheets/d/ → [ESTE VALOR] → /edit
//     Pégalo arriba en SHEET_ID = 'AQUI'
//
//  2. Ve a script.google.com → "Nuevo proyecto"
//     Borra el código de ejemplo y pega TODO este archivo
//
//  3. Guarda (Ctrl+S) con cualquier nombre, ej: "CNOP Afiliados"
//
//  4. Haz clic en "Implementar" → "Nueva implementación"
//     - Tipo: Aplicación web
//     - Ejecutar como: Yo (tu cuenta Google)
//     - Quién puede acceder: Cualquier usuario
//     → Haz clic en "Implementar"
//     → Autoriza los permisos cuando te los pida
//
//  5. Copia la URL que aparece (termina en /exec)
//     Ejemplo: https://script.google.com/macros/s/AKfy.../exec
//
//  6. Abre afiliacion.html en VS Code y busca esta línea:
//     const SCRIPT_URL = 'TU_URL_DE_APPS_SCRIPT';
//     Reemplaza el valor con tu URL del paso 5
//
//  ✅ Listo. Cada registro nuevo aparecerá automáticamente
//     en tu Google Sheet con fila verde.
//
//  ⚠️ IMPORTANTE: Si modificas este script después,
//     debes hacer una NUEVA implementación (no editar la existente)
//     y actualizar la URL en afiliacion.html
//
// ============================================================


/**
 * TEAM-EXTRA.JS — Líderes CNOP plegables + filtro por zona
 * Agrega antes de </body>: <script src="team-extra.js"></script>
 */

// ── Toggle abrir/cerrar la sección de líderes ──
function toggleLideres() {
  const content = document.getElementById('lideresContent');
  const btn     = document.getElementById('lideresToggleBtn');

  const isOpen = content.classList.contains('open');

  if (isOpen) {
    // Cerrar
    content.classList.remove('open');
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
  } else {
    // Abrir
    content.classList.add('open');
    btn.classList.add('active');
    btn.setAttribute('aria-expanded', 'true');

    // Scroll suave hacia la sección
    setTimeout(() => {
      document.getElementById('lideres-estado').scrollIntoView({
        behavior: 'smooth', block: 'start'
      });
    }, 100);
  }
}

// ── Filtro por zona ──
function filtrarLideres(btnEl) {
  const zona = btnEl.getAttribute('data-zona');

  // Actualizar botones activos
  document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');

  // Mostrar / ocultar tarjetas con animación
  const cards = document.querySelectorAll('.lider-card');
  cards.forEach(card => {
    const cardZona = card.getAttribute('data-zona');
    if (zona === 'todos' || cardZona === zona) {
      card.classList.remove('hidden');
      card.style.animation = 'fadeInCard .3s ease forwards';
    } else {
      card.classList.add('hidden');
    }
  });

  // Actualizar contador
  const visibles = zona === 'todos'
    ? cards.length
    : document.querySelectorAll(`.lider-card[data-zona="${zona}"]`).length;
  document.querySelector('.lideres-toggle-count').textContent = `${visibles} líder${visibles !== 1 ? 'es' : ''}`;
}

// Animación de entrada de tarjetas
const styleAnim = document.createElement('style');
styleAnim.textContent = `
  @keyframes fadeInCard {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleAnim);

let currentAudio = null;
let isDragging = false;

function toggleAudio(btn){

const container = btn.closest(".team-audio");
const src = container.dataset.src;

if(!container.audio){

container.audio = new Audio(src);

const barFill = container.querySelector(".audio-bar-fill");
const time = container.querySelector(".audio-time");
const waves = container.querySelector(".audio-waves");

container.audio.addEventListener("loadedmetadata", ()=>{

const total = formatTime(container.audio.duration);
time.textContent = "0:00 / " + total;

});

container.audio.addEventListener("timeupdate", ()=>{

if(isDragging) return;

const percent = (container.audio.currentTime / container.audio.duration) * 100;
barFill.style.width = percent + "%";

const current = formatTime(container.audio.currentTime);
const total = formatTime(container.audio.duration);

time.textContent = current + " / " + total;

});

container.audio.addEventListener("ended", ()=>{

btn.classList.remove("playing");
waves.classList.remove("active");
barFill.style.width = "0%";

});

}

if(currentAudio && currentAudio !== container.audio){

currentAudio.pause();

document.querySelectorAll(".audio-play-btn")
.forEach(b => b.classList.remove("playing"));

document.querySelectorAll(".audio-waves")
.forEach(w => w.classList.remove("active"));

}

const waves = container.querySelector(".audio-waves");

if(container.audio.paused){

container.audio.play();
btn.classList.add("playing");
waves.classList.add("active");

currentAudio = container.audio;

}else{

container.audio.pause();
btn.classList.remove("playing");
waves.classList.remove("active");

}

}

/* click para adelantar */

function seekAudio(event, bar){

const container = bar.closest(".team-audio");
const audio = container.audio;

if(!audio) return;

const rect = bar.getBoundingClientRect();
const percent = (event.clientX - rect.left) / rect.width;

audio.currentTime = percent * audio.duration;

}

/* arrastrar barra */

document.addEventListener("mousedown", e=>{

if(!e.target.closest(".audio-bar-wrap")) return;

isDragging = true;

});

document.addEventListener("mouseup", ()=>{

isDragging = false;

});

/* formato tiempo */

function formatTime(seconds){

if(!seconds) return "0:00";

const m = Math.floor(seconds / 60);
let s = Math.floor(seconds % 60);

if(s < 10) s = "0" + s;

return m + ":" + s;

}


function seekAudio(event, bar){

const container = bar.closest(".team-audio");
const audio = container.audio;

if(!audio) return;

let clientX;

if(event.touches){
clientX = event.touches[0].clientX;
}else{
clientX = event.clientX;
}

const rect = bar.getBoundingClientRect();
const percent = (clientX - rect.left) / rect.width;

audio.currentTime = percent * audio.duration;

}

function toggleHistoriaAudio(){
  const audio = document.getElementById("historiaAudio");

  if(audio.paused){
    audio.play();
  }else{
    audio.pause();
  }
}

let heroIndex = 0
const heroSlides = document.querySelectorAll(".hero-slide")
const heroDots = document.querySelectorAll(".hero-dots span")

function showHero(n){

heroSlides.forEach(s=>s.classList.remove("active"))
heroDots.forEach(d=>d.classList.remove("active"))

heroSlides[n].classList.add("active")
heroDots[n].classList.add("active")

heroIndex = n
}

function nextHero(){
heroIndex++
if(heroIndex >= heroSlides.length){heroIndex = 0}
showHero(heroIndex)
}

function prevHero(){
heroIndex--
if(heroIndex < 0){heroIndex = heroSlides.length-1}
showHero(heroIndex)
}

function goHero(n){
showHero(n)
}

setInterval(nextHero,10000)

const main = document.getElementById("mediaMain")
const thumbsContainer = document.getElementById("mediaThumbs")
const thumbs = Array.from(document.querySelectorAll(".thumb"))

let index = 0

function loadMedia(i){

const item = thumbs[i]

thumbs.forEach(t=>t.classList.remove("active"))
item.classList.add("active")

if(item.dataset.type === "video"){

main.innerHTML =
`<iframe src="${item.dataset.src}?autoplay=1&mute=1"
frameborder="0"
allow="autoplay; encrypted-media"
allowfullscreen></iframe>`

}else{

main.innerHTML = `<img src="${item.dataset.src}">`

}

index = i
}

function next(){

index++
if(index >= thumbs.length) index = 0
loadMedia(index)

}

function prev(){

index--
if(index < 0) index = thumbs.length -1
loadMedia(index)

}

thumbs.forEach((thumb,i)=>{
thumb.addEventListener("click",()=>loadMedia(i))
})

document.getElementById("nextBtn").onclick = next
document.getElementById("prevBtn").onclick = prev

setInterval(next,10000)

loadMedia(0)
// ============================================================
// ENVÍO DE FORMULARIO A GOOGLE SHEETS
// ============================================================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyigdYKyYPG0GZpAtfCeTROdODnlIUYUAfDSbyDKnGO58WAh_3_Gyxl7Y-th42WZFXE/exec";

const form = document.getElementById("affiliationForm");

if(form){

form.addEventListener("submit", async function(e){

e.preventDefault();

const datos = {

action: "guardar",

folio: "WEB-" + Date.now(),

nombre: document.getElementById("nombre")?.value || "",

telefono: document.getElementById("telefono")?.value || "",

correo: document.getElementById("email")?.value || "",

edad: document.getElementById("edad")?.value || "",

colonia: document.getElementById("colonia")?.value || "",

motivacion: document.getElementById("mensaje")?.value || ""

};

try{

await fetch(SCRIPT_URL, {

method: "POST",

mode: "no-cors",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify(datos)

});

alert("Registro enviado correctamente");

form.reset();

}catch(error){

console.error("Error enviando datos:", error);

alert("Hubo un error enviando el formulario");

}

});

}

function openImage(element) {
  const img = element.querySelector("img").src;
  document.getElementById("lightbox-img").src = img;
  document.getElementById("lightbox").style.display = "flex";
}

function closeImage() {
  document.getElementById("lightbox").style.display = "none";
}

const toggle = document.getElementById("mobileToggle");
const menu = document.getElementById("navMenu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});