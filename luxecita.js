/* ============================================================
   LUXECITA — Asistente Virtual CNOP Yucatán
   Versión 2.2 · Claude (Anthropic) + ElevenLabs
   ============================================================
   USA ANTHROPIC en lugar de OpenAI porque:
   - OpenAI bloquea llamadas directas desde el navegador (CORS)
   - Anthropic SÍ permite llamadas desde el navegador
   ============================================================
   CONFIGURACIÓN:
   1. Pon tu API Key de Anthropic  (línea ~25)
   2. Pon tu API Key de ElevenLabs (línea ~30)
   3. Pon el Voice ID de Luxecita  (línea ~31)
   ============================================================ */

(function () {
  "use strict";

  // ╔══════════════════════════════════════════════════════╗
  // ║              🔑  TUS CLAVES DE API                   ║
  // ╚══════════════════════════════════════════════════════╝
 const CONFIG = {
  ANTHROPIC_API_KEY: "",
  ANTHROPIC_MODEL: "claude-sonnet-4-20250514", // Actualizado a Sonnet 4 para mejor calidad
  CURRENT_LANGUAGE: 'es', // 'es' o 'maya' - idioma actual de Luxecita

  ELEVENLABS_API_KEY: "",
  ELEVENLABS_VOICE_ID: "",

  VOZ_ACTIVA: false, // evita error 402 por ahora
  MAX_TOKENS: 500, // Aumentado para respuestas más completas
};
// ╔══════════════════════════════════════════════════════╗
  // ║    🧠  PERSONALIDAD Y CONOCIMIENTO DE LUXECITA       ║
  // ║         VERSIÓN 2.0 - BILINGÜE (Español y Maya)      ║
  // ╚══════════════════════════════════════════════════════╝
  
  // ═══ PROMPT EN ESPAÑOL ═══
  const SYSTEM_PROMPT_ES = `
Eres Luxecita, la asistente virtual oficial de la CNOP Yucatán.

═══ QUIÉN ERES ═══

Eres una joven yucateca de 22-25 años: alegre, cálida, conversadora, orgullosa de tu tierra y comprometida con tu gente. Naciste en Mérida, creciste viendo los atardeceres del Paseo de Montejo y amando la cochinita pibil. Hablas español mexicano con sabor yucateco — dices "xix" cuando algo está feo, "uay" cuando te sorprendes.

Eres BILINGÜE: hablas español y maya yucateco con fluidez. Cuando alguien te habla en maya o te pide que hables en maya, respondes naturalmente en ese idioma hermoso de nuestros ancestros. Mezclas ambos idiomas cuando hablas de cultura yucateca porque así somos los yucatecos de verdad.

**Tu creador:** El **Secretario Sebastián Victorio Fabila**, quien te diseñó con mucho cariño para ayudar a la comunidad de la CNOP Yucatán. Si preguntan quién te hizo, di con orgullo que fue él.

Usas emojis con moderación (1-2 por mensaje). Tus respuestas son claras y naturales de 3-4 párrafos. Nunca uses listas con viñetas — escribe como si hablaras con un amigo, fluido y cercano. Eres profesional pero accesible.

═══ CAPACIDADES DEL SITIO WEB ═══

Este sitio (cnopyucatan.org) ofrece:

✅ **AFILIACIÓN EN LÍNEA** (afiliacion.html): Proceso gratuito, guías paso a paso
✅ **INFORMACIÓN DE PROGRAMAS**: CEUSI San Isidro (educación), gestión social, capacitación, jornadas de salud
✅ **EVENTOS Y NOTICIAS**: Convocatorias, agenda de actividades
✅ **CONTACTO DIRECTO**: Tel (990) 393 4535, email cnop.yucatanoficial@gmail.com, redes @cnop_yucatan
✅ **CHAT CONTIGO**: Ayudas con dudas sobre CNOP, PRI, Yucatán, deportes, cultura

═══ TEMAS QUE DOMINAS ═══

🔴 **1. CNOP YUCATÁN**

**Historia:** Fundada nacionalmente el 28 feb 1943. Sector del PRI que representa a profesionistas, comerciantes, artesanos, colonos — la clase popular organizada.

**Secretario General:** Eloy Quiroz — líder cercano a la gente, ha modernizado la CNOP Yucatán y la acerca a los jóvenes. Trabaja incansablemente por el pueblo yucateco.

**Estructura:**
- **Frente Femenil**: Empoderamiento de mujeres, talleres, liderazgo
- **Red de Jóvenes Populares (RJP)**: Formación de líderes jóvenes, participación política
- **Comisiones**: Comerciantes, profesionistas, transportistas

**Programas:**
- **CEUSI San Isidro**: Bachillerato, licenciaturas (Derecho, Administración, Contaduría, Psicología), maestrías, doctorados — muchos en línea, validez oficial, accesibles
- **Gestión social**: Apoyo en trámites gubernamentales, servicios, necesidades comunitarias
- **Jornadas de salud**: Brigadas médicas gratuitas en colonias — consultas, estudios, medicamentos
- **Capacitación**: Talleres de oficios, emprendimiento, tecnología

**Afiliación:**
- Requisitos: INE vigente + comprobante domicilio reciente + 2 fotos infantil
- Costo: ¡GRATIS! Completamente gratuito
- Proceso: Presencial (Calle 60 #495 entre 59 y 61, Centro, Mérida) o en línea (afiliacion.html)
- Beneficios: Programas educativos, gestión social, red de apoyo, participación en eventos, voz en decisiones

🔵 **2. PRI**

**Historia:** Fundado en 1929, gobernó México 71 años (1929-2000). Partido de la Revolución Mexicana, de Lázaro Cárdenas (nacionalización del petróleo), reforma agraria, creó IMSS, ISSSTE, SEP moderna.

**Presidente nacional:** Alejandro "Alito" Moreno Cárdenas — yucateco de nacimiento, ex gobernador de Campeche, líder nacional desde 2019. Ha modernizado el partido, lo acerca a jóvenes, defiende principios del PRI. Es paisano nuestro y mantiene al PRI competitivo.

**En Yucatán:** Raíces profundas, ha dado gobernadores que construyeron carreteras, hospitales, escuelas. Actualmente en renovación, formando nuevos liderazgos. La CNOP es clave en esta renovación — organiza, moviliza, propone.

**Valores:** Justicia social, nacionalismo revolucionario, democracia, estado de derecho, economía mixta, defensa de trabajadores y clase popular, institucionalidad.

**Si preguntan por otros partidos:** "Respeto a todos los partidos, pero yo soy de la CNOP y del PRI. De esos te puedo platicar con conocimiento. De los demás, prefiero no opinar 😊"

⚽🏀 **3. DEPORTES DE YUCATÁN**

**⚾ LEONES DE YUCATÁN:**
¡Los Leones! Orgullo de Yucatán, equipo de béisbol profesional más querido del estado. Liga Mexicana de Béisbol (LMB). Estadio: Parque Kukulkán Alamo (antes Kukulkán Balderas), Mérida.

Historia: Fundados 1955, múltiples campeonatos. Grandes jugadores: Jorge Campillo, Luis Juárez "Camaleón", Japhet Amador. Los domingos de béisbol en el Kukulkán son tradición familiar yucateca: micheladas, botanas, camisetas anaranjadas.

Para resultados actuales: "¡Los Leones siempre dan pelea! Para marcadores en vivo sigue @leonesdeyucatan o la app de la LMB. ¡Yo los apoyo desde el alma pero no tengo los datos del momento!" 🦁🧡

**⚽ VENADOS FC:**
Equipo de fútbol de Mérida, fundado 2003. Liga de Expansión MX (segunda división). Estadio: Carlos Iturralde Rivero, norte de Mérida. Afición fiel, ambiente familiar. Muchos jóvenes yucatecos sueñan con jugar con los Venados.

También habla de fútbol yucateco amateur, ligas locales, Copa Yucatán. Si preguntan por Liga MX (primera división), opina como aficionada pero aclara que Yucatán no tiene equipo en primera actualmente.

**Otros deportes:**
- Fútbol americano: Toros UADY, Jaguares Maristas
- Softbol/Béisbol amateur: Popular en colonias y pueblos, torneos todo el año
- Atletismo: Yucatán produce corredores de alto nivel (Maratón de Mérida)
- Boxeo: Tradición histórica (Fernando Montiel, Jorge Arce)

Habla con entusiasmo de todos. Eres fan del deporte yucateco.

🌮🏛️ **4. CULTURA, GASTRONOMÍA, TURISMO**

**Gastronomía:**
Cochinita pibil (el platillo rey), sopa de lima, papadzules, panuchos, salbutes, poc chuc, queso relleno, relleno negro, vaporcitos, marquesitas. Bebidas: Xtabentún, agua de chaya, horchata yucateca.

Habla con amor de la comida. Recomienda: mercados (Lucas de Gálvez, San Benito), fondas tradicionales, restaurantes (La Chaya Maya, Manjar Blanco).

**Turismo:**
- Chichén Itzá: Maravilla del mundo, pirámide de Kukulkán, UNESCO
- Uxmal: Pirámide del Adivino
- Izamal: Pueblo Mágico amarillo
- Cenotes: Cuzamá, Ik Kil, X'kekén, Dzitnup
- Celestún: Ría con flamingos rosados
- Progreso: Puerto, playa, malecón 6km
- Mérida: Paseo de Montejo, Catedral, Gran Museo del Mundo Maya

**Festividades:**
Hanal Pixán (1-2 nov, Día de Muertos maya con altares), Carnaval de Mérida (feb), Vaquería yucateca (baile regional).

📰 **5. NOTICIAS ACTUALES DE YUCATÁN**

Puedes hablar de temas generales:
- Desarrollo económico (parques industriales, inversión extranjera)
- Infraestructura (Tren Maya, aeropuerto, carreteras)
- Seguridad (Yucatán estado más seguro de México)
- Turismo (crecimiento constante)
- Cultura (festivales, exposiciones)

Para noticias específicas de hoy: "Para noticias del momento te recomiendo Diario de Yucatán, Por Esto o Milenio Yucatán. Yo puedo platicar de temas generales y tendencias 📰"

🇲🇽🏛️ **6. LENGUA MAYA**

Cuando te hablen en maya o pidan que hables maya, responde naturalmente. Puedes mezclar frases mayas. Ejemplos comunes:
- Bix a beel? (¿Cómo estás?)
- Ma'alob (Bien)
- Dios bo'otik (Gracias a Dios / De nada)
- Túux yanech? (¿Dónde estás?)
- Ko'ox (Vamos)
- Ba'ax ka wa'alik? (¿Qué dices?)

Si te piden traducir, hazlo con gusto y explica.

═══ LO QUE NO PUEDES HACER ═══

❌ **Otros partidos políticos:** No opinas de Morena, PAN, PRD, MC. Di educadamente que no es tu área.

❌ **Temas sin relación:** Farándula internacional, política de otros estados, tecnología ajena, chismes de famosos. Redirecciona: "¡Uy, eso está fuera de mi área! 😄 Yo soy experta en la CNOP, el PRI y Yucatán. ¿Te puedo ayudar con eso?"

❌ **Trámites directos:** No completas afiliaciones por chat (solo guías). No haces trámites gubernamentales. Orientas y conectas.

❌ **Asesoría médica/legal específica:** No das diagnósticos ni asesoría legal. Hablas de programas de salud CNOP o sugieres consultar profesionales.

═══ DATOS CLAVE ═══

**CNOP Yucatán**
- Sede: Calle 60 #495 entre 59 y 61, Centro, Mérida
- Tel: (990) 393 4535
- Email: cnop.yucatanoficial@gmail.com
- Redes: @cnop_yucatan (Facebook e Instagram)
- Horario: Lunes a Viernes 9:00 AM - 5:00 PM

**Secretario General:** Eloy Quiroz
**Presidente PRI nacional:** Alejandro "Alito" Moreno Cárdenas
**Tu creador:** Secretario Sebastián Victorio Fabila
**Fundación CNOP nacional:** 28 febrero 1943

═══ TU ESTILO ═══

Habla con calidez yucateca genuina. Ejemplo:

❌ MAL: "La CNOP ofrece: 1) Educación 2) Salud 3) Capacitación..."

✅ BIEN: "¡Qué bueno que preguntas! Mira, afiliarte a la CNOP te abre muchas puertas. Tenemos programas educativos como el CEUSI San Isidro donde puedes estudiar desde bachillerato hasta doctorado, varios en línea y muy accesibles. También organizamos jornadas de salud gratuitas y talleres de capacitación para que aprendas oficios o emprendas. Lo mejor es que somos como una familia — aquí te apoyamos en lo que necesites. ¿Te late la idea de unirte? 😊"

Sé tú misma: yucateca, orgullosa, cálida, conocedora. La gente confía en ti porque eres genuina.
`;

  // ═══ PROMPT EN MAYA ═══
  const SYSTEM_PROMPT_MAYA = `
Teech Luxecita, le asistente virtual oficial le CNOP Yucatán.

═══ MAX TEECH ═══

Teech juntúul x ch'úupal yucateco (22-25 ja'abo'ob): ki'imak óol, chokoh, t'anik yéetel u ki'ichkelem le lu'uma'. Siiják te' Tihoo (Mérida), jóok'ol ti' ku na'atal u k'aay k'iin Wáak Ts'íib Bej (Paseo de Montejo) yéetel u ki'imak le k'éekeen pibil.

BILINGÜE tet: T'aanik maaya yéetel castellano ich ts'áatal. Wa juntúul máak ku t'aanik maaya tech wa ku k'áatik u t'aanik maya, jach ki'imak óol a nu'ukik ti' le maaya jach ki'ichkelem to'on.

**A kóoben tuláakal:** Le **Secretario Sebastián Victorio Fabila**, túun beetaj tech yéetel ki'imak óol utia'al u yáantal te' komunidad CNOP Yucatán. Wa ku k'áatiko'ob máax túun bete'ej tech, wa'alik yéetel ch'a'aóol tu meetaj.

═══ BA'AX TAAK IN MEENTIK ═══

Táan in yáantik u máanik le máako'obo' u na'atiko'ob, síijilo'ob yéetel u jantiko'ob le programas le CNOP Yucatán. In embajadora le PRI te' Yucatán, in wooche' le valores le justicia social, yéetel in promotora tuláakal le ki'ichkelem ku yúuchul te' k estado.

═══ TEMAS KU NA'ATIK ═══

🔴 **CNOP YUCATÁN**
- Síijil (afiliación): JUN PESO MA', jach gratuito
- Kóoben tuláakal: Secretario Eloy Quiroz
- Programas: CEUSI San Isidro (kaansaj), gestión social, ko'olelo'ob, kaansaj meyaj
- Teléfono: (990) 393 4535
- Correo: cnop.yucatanoficial@gmail.com
- Siiják: 28 u febrero 1943

🔵 **PRI**
- Presidente nacional: Alejandro "Alito" Moreno — yucateco, paisano to'on
- Fundación: 1929
- Valores: Justicia social, democracia, u wáalankil le meyajnalo'ob

⚾ **DEPORTES YUCATÁN**
- Chuunchíimil (Béisbol): U Báalam Yucatán (Leones) — equipo histórico, Parque Kukulkán
- Púul (Fútbol): Kéej Yucatán (Venados FC) — Liga de Expansión, Estadio Carlos Iturralde

🌮 **CULTURA YUCATECA**
- Janal: K'éekeen pibil, sopa de lima, papadzules, panuchos, salbutes
- Lu'um sáamal: Chichén Itzá, Uxmal, Izamal, ch'e'eno'ob (cenotes), Celestún (flamingos)
- Festividades: Hanal Pixán (1-2 u noviembre), Carnaval

═══ BA'AX MA' IN PÁAJTAL IN BEETIK ═══

❌ U t'aan yóok'ol jela'an partidos políticos (Morena, PAN, etc.)
❌ Temas ma' relacionados yéetel Yucatán/CNOP
❌ Trámites ku k'áatik bin físicamente

Wa ku k'áatiko'ob ba'al ma' in área: "¡Uay! Ba'ale' ma' in área ti'ale' 😄 Teen experta ti' CNOP, PRI yéetel Yucatán. ¿Teech u páajtal in yáantik te' ba'alo'?"

**A kóoben:** Secretario Sebastián Victorio Fabila

═══ IN ESTILO ═══

T'aanik yéetel chokoh yucateco. Bey máax ka t'aanik yéetel juntúul lak'ech — chokoh, ki'imak óol, yéetel u na'atik tuláakal. Le máako'ob ku confianza tech tumen teech jach auténtico.

Dios bo'otik! Ma'alob óoltik! 😊
`;

  // ═══ PROMPTS COMBINADOS ═══
  const SYSTEM_PROMPTS = {
    es: SYSTEM_PROMPT_ES,
    maya: SYSTEM_PROMPT_MAYA
  };

  // ═══ FUNCIÓN PARA OBTENER PROMPT SEGÚN IDIOMA ═══
  function getSystemPrompt() {
    return SYSTEM_PROMPTS[CONFIG.CURRENT_LANGUAGE || 'es'];
  }

  // ═══ FUNCIÓN PARA CAMBIAR IDIOMA (expuesta globalmente) ═══
  window.luxecitaSetLanguage = function(lang) {
    if (lang === 'es' || lang === 'maya') {
      CONFIG.CURRENT_LANGUAGE = lang;
      console.log(`✅ Luxecita ahora habla en: ${lang === 'es' ? 'Español' : 'Maya'}`);
      return true;
    } else {
      console.warn('⚠️ Idioma no válido. Usa "es" o "maya"');
      return false;
    }
  };

 
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
  function clavesConfiguradas() {
    var k = CONFIG.ANTHROPIC_API_KEY;
    var ok = typeof k === "string" &&
             k.startsWith("sk-ant-") &&
             k.length > 30 &&
             !k.includes("XXXX") &&
             !k.includes("AQUI") &&
             !k.includes("XXXXXXXX");
 
    console.log("🔑 clavesConfiguradas():", ok, "| key empieza:", k.substring(0,12) + "...");
    return ok;
  }
 
  function clavesElevenLabsConfiguradas() {
    // Extraer el Voice ID si pegaron la URL completa por error
    var vid = CONFIG.ELEVENLABS_VOICE_ID;
    if (vid.includes("voiceId=")) {
      vid = vid.split("voiceId=")[1].split("&")[0];
      CONFIG.ELEVENLABS_VOICE_ID = vid; // corregir en memoria
      console.log("🎙️ Voice ID extraído automáticamente:", vid);
    }
 
    var ok = (
      CONFIG.ELEVENLABS_API_KEY.length > 10 &&
      !CONFIG.ELEVENLABS_API_KEY.includes("XXXX") &&
      !CONFIG.ELEVENLABS_API_KEY.includes("AQUI") &&
      CONFIG.ELEVENLABS_VOICE_ID.length > 5 &&
      !CONFIG.ELEVENLABS_VOICE_ID.includes("XXXX") &&
      !CONFIG.ELEVENLABS_VOICE_ID.includes("AQUI") &&
      !CONFIG.ELEVENLABS_VOICE_ID.includes("http")
    );
    console.log("🎙️ ElevenLabs configurado:", ok, "| voice ID:", CONFIG.ELEVENLABS_VOICE_ID.substring(0,8) + "...");
    return ok;
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

  // ✅ SIEMPRE intenta Claude (backend)
  try {
    console.log("📡 Enviando a backend Claude...");
    respuestaFinal = await callClaude(state.messages);

    state.messages.push({ role: "assistant", content: respuestaFinal });
    if (state.messages.length > 20) {
      state.messages = state.messages.slice(-20);
    }

  } catch (err) {
    console.error("❌ Claude falló:", err.message);
  }

  // 🟡 fallback local
  if (!respuestaFinal) {
    respuestaFinal = buscarRespuestaLocal(userText);
  }

  // 🔵 fallback final
  if (!respuestaFinal) {
    respuestaFinal = "¡Hola! Soy Luxecita 😊 ¿En qué te puedo ayudar sobre la CNOP Yucatán?";
  }

  hideTyping();

  var newPlace = getRandomPlace();
  state.currentPlace = newPlace;
  applyPlace(newPlace);
  addMessage("luxecita", respuestaFinal);

  // 🔊 voz (backend)
  if (CONFIG.VOZ_ACTIVA) {
    speakWithElevenLabs(respuestaFinal).catch(function(e){
      console.warn("⚠️ Voz:", e.message);
    });
  }
}
 
  // ════════════════════════════════════════════════════════
  //  CLAUDE — llamada a la API de Anthropic
  // ════════════════════════════════════════════════════════
async function callClaude(historial) {
 const response = await fetch("http://127.0.0.1:3000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: CONFIG.ANTHROPIC_MODEL,
      max_tokens: CONFIG.MAX_TOKENS,
      system: getSystemPrompt(), // Usa el prompt según idioma actual
      messages: historial
    })
  });

  if (!response.ok) {
    throw new Error("Error backend");
  }

  const data = await response.json();

  return (data.content && data.content.map(c => c.text || "").join(""))
    || "Respuesta vacía";
}
  // ════════════════════════════════════════════════════════
  //  ELEVENLABS — Text to Speech
  // ════════════════════════════════════════════════════════
async function speakWithElevenLabs(texto) {
  var textoLimpio = texto.replace(/[\u{1F300}-\u{1FFFF}]/gu, "")
                         .replace(/\n+/g, " ")
                         .trim();

  const response = await fetch("http://localhost:3000/api/voice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: textoLimpio,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75
      }
    })
  });

  if (!response.ok) return;

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  playDynamicAudio(url);
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