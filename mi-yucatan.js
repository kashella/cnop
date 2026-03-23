// ============================================================
//  MI YUCATÁN — JavaScript completo
// ============================================================

const ANTHROPIC_KEY = "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";

async function aiCall(prompt) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST",
    headers:{"Content-Type":"application/json","x-api-key":ANTHROPIC_KEY,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},
    body: JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:600,messages:[{role:"user",content:prompt}]})
  });
  const d = await r.json();
  return (d.content && d.content[0] && d.content[0].text) || "";
}

// ── DICCIONARIO MAYA (Traductor offline funcional) ────────────
const DICCIONARIO = {
  "hola":"Ba'ax ka wa'alik","buenos días":"Ma'alob k'iin","buenas tardes":"Ma'alob chi'inil k'iin",
  "buenas noches":"Ma'alob ak'ab","gracias":"Yuum bo'otik","de nada":"Mix ba'al","por favor":"Ka'abet",
  "sí":"Hé'e","no":"Ma'","¿cómo estás?":"Bix a beel?","bien":"Ma'alob","mal":"Mina'an ma'alob",
  "¿cómo te llamas?":"Bix a k'aaba'?","me llamo":"In k'aaba'e","mucho gusto":"Ki' k'ajóoltech",
  "adiós":"Ko'ox","hasta luego":"As ta'al","te quiero":"In k'aatech","te amo":"Kuyiknech",
  "agua":"Ha'","comida":"Hanal","casa":"Na'","familia":"Láak'","mamá":"Na'",
  "papá":"Táata","hijo":"Paal","hija":"Chibil paal","hermano":"Suku'un","hermana":"Ki'ich",
  "sol":"K'iin","luna":"Uh","estrella":"Eek'","día":"K'iin","noche":"Ak'ab",
  "tierra":"Lu'um","cielo":"Ka'an","mar":"Kaab","árbol":"Che'","flor":"Nikte'",
  "pájaro":"Ch'iich'","perro":"Pek'","gato":"Mees","venado":"Keh","jaguar":"Balam",
  "uno":"Jun","dos":"Ka'","tres":"Óox","cuatro":"Kan","cinco":"Jo'",
  "seis":"Wak","siete":"Uk","ocho":"Waxak","nueve":"Bolon","diez":"Lajun",
  "yucatán es mi tierra":"Yucatán le lu'um in nojoch","la comida está deliciosa":"Ki' unaj le hanal",
  "¿dónde está el cenote?":"Tu'ux yaan le ts'ono'ot?","viva yucatán":"Kuxtal Yucatán",
  "amor":"Yiknal","paz":"Sihbalil","feliz":"Ki' ol","triste":"Pul chi'",
  "bonito":"Ki' il","grande":"Nojoch","pequeño":"Chan","rápido":"Ka'ajal","despacio":"Kex"
};

function traducirLocal(texto, de, a) {
  const t = texto.toLowerCase().trim();
  if (de === "español") {
    for (const [esp, maya] of Object.entries(DICCIONARIO)) {
      if (t === esp) return maya;
    }
    // Búsqueda parcial
    for (const [esp, maya] of Object.entries(DICCIONARIO)) {
      if (t.includes(esp)) return maya + " (traducción parcial)";
    }
    return null; // No encontrado, usar IA
  } else {
    for (const [esp, maya] of Object.entries(DICCIONARIO)) {
      if (t === maya.toLowerCase()) return esp;
    }
    return null;
  }
}

// ============================================================
//  100 PREGUNTAS DE TRIVIA YUCATECA
// ============================================================
const TODAS_PREGUNTAS = [
  // HISTORIA
  {q:"¿En qué año fue fundada Mérida sobre la ciudad maya T'ho?",opts:["1492","1542","1598","1621"],a:1,cat:"Historia",exp:"Francisco de Montejo el Mozo fundó Mérida el 6 de enero de 1542 sobre los restos de T'ho."},
  {q:"¿Cómo se llamaba originalmente Mérida en maya?",opts:["Chichén","T'ho","Uxmal","Izamal"],a:1,cat:"Historia",exp:"T'ho ('cinco cerros') era el nombre de la gran ciudad maya sobre la que se construyó Mérida."},
  {q:"¿Qué conquistador fundó Mérida?",opts:["Hernán Cortés","Francisco de Montejo el Mozo","Pedro de Alvarado","Bernal Díaz"],a:1,cat:"Historia",exp:"Francisco de Montejo el Mozo, hijo del adelantado, fundó la ciudad el 6 de enero de 1542."},
  {q:"¿En qué año Chichén Itzá fue elegida Maravilla del Mundo?",opts:["2000","2003","2007","2010"],a:2,cat:"Historia",exp:"En 2007, más de 100 millones de votos eligieron a Chichén Itzá como una de las 7 Maravillas del Mundo Moderno."},
  {q:"¿Cuántos escalones tiene la Pirámide de Kukulkán?",opts:["260","313","365","400"],a:2,cat:"Historia",exp:"Tiene exactamente 365 escalones, uno por cada día del año solar — símbolo del calendario maya."},
  {q:"¿Qué civilización construyó Chichén Itzá?",opts:["Azteca","Olmeca","Maya","Tolteca"],a:2,cat:"Historia",exp:"Los mayas construyeron Chichén Itzá, aunque tuvo influencia tolteca en su segunda etapa."},
  {q:"¿Qué fenómeno ocurre en Chichén Itzá en los equinoccios?",opts:["Lluvia de meteoros","La serpiente de luz","Eclipse total","El sonido del eco"],a:1,cat:"Historia",exp:"La sombra de los escalones crea la ilusión de una serpiente descendiendo la pirámide."},
  {q:"¿Cuál es el origen del nombre 'Yucatán'?",opts:["Tierra de ceibas","No entiendo lo que dices","Tierra del sol","Lugar sagrado"],a:1,cat:"Historia",exp:"Los mayas dijeron 'Ma'anaatik ka t'ann' (no entiendo) y los españoles lo interpretaron como 'Yucatán'."},
  {q:"¿Qué ciudad maya es conocida por su estilo arquitectónico Puuc?",opts:["Chichén Itzá","Cobá","Uxmal","Tulúm"],a:2,cat:"Historia",exp:"Uxmal es el ejemplo más notable del estilo Puuc, caracterizado por mosaicos geométricos en piedra."},
  {q:"¿Cuándo fue declarada Mérida 'Ciudad Blanca'?",opts:["Por su cal blanca colonial","Por la pureza del agua","Por sus flores blancas","Por el henequén blanco"],a:0,cat:"Historia",exp:"Las fachadas coloniales encaladas le dieron a Mérida el apodo de 'La Ciudad Blanca'."},
  // GEOGRAFÍA
  {q:"¿Cuántos municipios tiene Yucatán?",opts:["64","78","106","120"],a:2,cat:"Geografía",exp:"Yucatán tiene 106 municipios, siendo Mérida el más grande y poblado."},
  {q:"¿Cuál es el puerto principal de Yucatán?",opts:["Celestún","Progreso","Sisal","Dzilam"],a:1,cat:"Geografía",exp:"Progreso es el puerto más importante del estado, a 36 km de Mérida."},
  {q:"¿Qué río famoso bordea la Reserva de Celestún?",opts:["Usumacinta","Grijalva","Lagartos","No tiene río, es un estuario"],a:3,cat:"Geografía",exp:"Celestún tiene una laguna costera y estuario, no un río propiamente dicho."},
  {q:"¿A cuántos kilómetros está Chichén Itzá de Mérida?",opts:["60 km","120 km","180 km","200 km"],a:1,cat:"Geografía",exp:"Chichén Itzá está a aproximadamente 120 km al este de Mérida, en el municipio de Tinum."},
  {q:"¿Qué estados hacen frontera con Yucatán?",opts:["Campeche y Tabasco","Campeche y Quintana Roo","Chiapas y Tabasco","Campeche, Quintana Roo y Belice"],a:1,cat:"Geografía",exp:"Yucatán limita al oeste con Campeche y al este con Quintana Roo."},
  {q:"¿Cómo se llama la 'Ciudad Amarilla' de Yucatán?",opts:["Valladolid","Tekax","Izamal","Motul"],a:2,cat:"Geografía",exp:"Izamal es conocida como la Ciudad Amarilla por sus edificios pintados de ese color. Pueblo Mágico."},
  {q:"¿Cuál es el punto más al norte de Yucatán?",opts:["Progreso","Dzilam de Bravo","Celestún","Sisal"],a:0,cat:"Geografía",exp:"Progreso es la ciudad costera más septentrional y la más cercana a Mérida."},
  {q:"¿En qué municipio se encuentra Uxmal?",opts:["Santa Elena","Mérida","Maxcanú","Ticul"],a:0,cat:"Geografía",exp:"Uxmal se encuentra en el municipio de Santa Elena, en la Ruta Puuc al sur de Mérida."},
  // CULTURA Y TRADICIONES
  {q:"¿Qué significa 'Hanal Pixán' en maya?",opts:["Fiesta de flores","Comida de las almas","Noche de rezos","Día sagrado"],a:1,cat:"Tradiciones",exp:"Hanal Pixán significa 'comida de las almas', la festividad yucateca de muertos diferente al Día de Muertos del centro."},
  {q:"¿Qué se prepara típicamente en el Hanal Pixán?",opts:["Cochinita pibil","Mucbi pollo","Sopa de lima","Papadzules"],a:1,cat:"Tradiciones",exp:"El mucbi pollo (pibipollo) es el platillo tradicional del Hanal Pixán, un tamal grande cocido en hoyo."},
  {q:"¿Cómo se llama el baile más representativo de Yucatán?",opts:["La Jarana","La Guaranducha","El Torito","La Bamba"],a:0,cat:"Tradiciones",exp:"La Jarana Yucateca es el baile folklórico más representativo, con parejas que bailan con vasos en la cabeza."},
  {q:"¿Qué es el Toro de Once?",opts:["Un platillo","Una corrida de toros","Una festividad nocturna","Un juego maya"],a:2,cat:"Tradiciones",exp:"El Toro de Once es una tradición nocturna donde corre un toro con fuego y cohetes en las fiestas patronales."},
  {q:"¿Qué es una 'vaquería' en Yucatán?",opts:["Un rancho ganadero","Fiesta tradicional con jarana","Mercado de carnes","Corrida de toros"],a:1,cat:"Tradiciones",exp:"La vaquería es una fiesta tradicional yucateca con jarana, hipiles bordados y música de trova."},
  {q:"¿Qué prenda usa la mujer yucateca en las vaquerías?",opts:["Huipil","Hipil bordado","Rebozo","Vestido de china poblana"],a:1,cat:"Tradiciones",exp:"El hipil bordado (o terno) es el traje regional yucateco, con bordados de flores coloridas."},
  {q:"¿Cómo se llama el sombrero tradicional de Yucatán?",opts:["Sombrero de palma","Jipi-japa","Sombrero charro","Panama"],a:1,cat:"Tradiciones",exp:"El jipi-japa (o jipijapa) es el sombrero tejido con fibras de palma, artesanía icónica de Becal, Campeche, pero popular en Yucatán."},
  // GASTRONOMÍA
  {q:"¿Cuál es el platillo más famoso de Yucatán?",opts:["Poc chuc","Cochinita pibil","Papadzules","Sopa de lima"],a:1,cat:"Gastronomía",exp:"La cochinita pibil, cerdo marinado en achiote y naranja agria cocinado en hoyo, es el plato emblema yucateco."},
  {q:"¿Qué le da el color rojo a la cochinita pibil?",opts:["Chile","Achiote","Jitomate","Colorante"],a:1,cat:"Gastronomía",exp:"El achiote (Bixa orellana) le da el característico color rojo-naranja y sabor único a la cochinita pibil."},
  {q:"¿Qué son los panuchos?",opts:["Tacos dorados","Tortillas rellenas de frijol negro con toppings","Tamales yucatecos","Enchiladas con mole"],a:1,cat:"Gastronomía",exp:"Los panuchos son tortillas fritas rellenas de frijol negro colado, servidas con pavo, lechuga, tomate y cebolla."},
  {q:"¿Qué es la sopa de lima?",opts:["Sopa de frutas","Caldo de pollo con lima yucateca y tortilla","Consomé de res","Crema de limón"],a:1,cat:"Gastronomía",exp:"La sopa de lima es un caldo de pollo con lima yucateca (distinta al limón), tortilla frita y hierbas aromáticas."},
  {q:"¿Cuál es la diferencia entre salbutes y panuchos?",opts:["El relleno","Los salbutes no llevan frijol","Son lo mismo","El tamaño"],a:1,cat:"Gastronomía",exp:"Los salbutes son tortillas infladas fritas sin frijol, los panuchos llevan frijol negro colado en su interior."},
  {q:"¿Qué son los papadzules?",opts:["Tacos de papa","Enchiladas con salsa de pepita y huevo","Tamales de rajas","Flautas de pollo"],a:1,cat:"Gastronomía",exp:"Los papadzules son tortillas enrolladas en salsa de pepita (semilla de calabaza), rellenas de huevo cocido."},
  {q:"¿Qué bebida tradicional maya se hace de maíz?",opts:["Atole","Pozol","Balché","Saka'"],a:3,cat:"Gastronomía",exp:"El saka' es una bebida ritual maya de maíz blanco, usada en ceremonias. El balché es alcohólica hecha de corteza."},
  {q:"¿Qué fruta cítrica es característica de la cocina yucateca?",opts:["Limón","Naranja agria","Mandarina","Toronja"],a:1,cat:"Gastronomía",exp:"La naranja agria (naranja de Sevilla) es fundamental en la cocina yucateca, clave en la cochinita pibil."},
  // NATURALEZA
  {q:"¿Qué abeja sagrada tienen los mayas sin aguijón?",opts:["Abeja africanizada","Abeja europea","Abeja Melipona (Xunan Kab)","Avispa Polista"],a:2,cat:"Naturaleza",exp:"La Xunan Kab (señora abeja en maya) es la abeja Melipona, domesticada hace 3,000 años y hoy en peligro."},
  {q:"¿Cuál es el árbol sagrado de los mayas?",opts:["Palma","Ceiba","Caoba","Zapote"],a:1,cat:"Naturaleza",exp:"La Ceiba (Yaxché en maya) era el árbol cósmico que conectaba el inframundo, la tierra y el cielo."},
  {q:"¿Dónde se pueden ver flamingos rosados en Yucatán?",opts:["Solo en Celestún","Solo en Río Lagartos","En Celestún, Río Lagartos y Dzilam","En los cenotes"],a:2,cat:"Naturaleza",exp:"Los tres principales santuarios de flamencos son Celestún, Río Lagartos y Dzilam Bravo."},
  {q:"¿Qué planta es símbolo económico histórico de Yucatán?",opts:["Maíz","Henequén","Sisal","Caña de azúcar"],a:1,cat:"Naturaleza",exp:"El henequén fue 'el oro verde' que hizo a Yucatán prosperar a finales del siglo XIX y principios del XX."},
  {q:"¿Qué es un cenote?",opts:["Una laguna costera","Un pozo de agua subterránea sagrado","Un arrecife de coral","Un volcán apagado"],a:1,cat:"Naturaleza",exp:"Los cenotes son pozos naturales de agua subterránea, sagrados para los mayas como portales al inframundo."},
  {q:"¿Cuántos cenotes se estiman en Yucatán?",opts:["Miles, más de 6,000","Cientos, unos 500","Decenas, unos 80","Millones"],a:0,cat:"Naturaleza",exp:"Se estiman más de 6,000 cenotes en Yucatán, parte del sistema de cavernas subterráneas más grande del mundo."},
  // LENGUA MAYA
  {q:"¿Cómo se dice 'gracias' en maya yucateco?",opts:["Ba'ax ka wa'alik","Yuum bo'otik","Ma'alob","Bix a beel"],a:1,cat:"Maya",exp:"'Yuum bo'otik' es la forma de agradecer en maya yucateco. Literalmente: 'señor que te pague'."},
  {q:"¿Cómo se dice 'buenos días' en maya?",opts:["Ma'alob k'iin","Ba'ax ka wa'alik","Ko'ox","Hé'e"],a:0,cat:"Maya",exp:"'Ma'alob k'iin' significa literalmente 'buen sol/día' en maya yucateco."},
  {q:"¿Cómo se dice 'agua' en maya?",opts:["Lu'um","K'iin","Ha'","Ka'an"],a:2,cat:"Maya",exp:"'Ha'' es agua en maya. De ahí vienen muchos nombres de lugares con cenotes: X-Ha, Xcaret, etc."},
  {q:"¿Qué significa 'balam' en maya?",opts:["Serpiente","Jaguar","Águila","Venado"],a:1,cat:"Maya",exp:"'Balam' es jaguar, el animal más sagrado de la cosmovisión maya. Símbolo de poder y guerrero."},
  {q:"¿Cómo se dice 'hola' informalmente en maya yucateco?",opts:["Ko'ox","Ba'ax ka wa'alik","Hé'e","Bix a beel"],a:1,cat:"Maya",exp:"'Ba'ax ka wa'alik' es la forma de saludar informalmente, literalmente '¿qué estás diciendo?'"},
  {q:"¿Qué significa 'k'iin' en maya?",opts:["Luna","Estrella","Sol/Día","Noche"],a:2,cat:"Maya",exp:"'K'iin' significa sol y también día. Es parte del sistema calendárico maya fundamental."},
  {q:"¿Cómo se dice 'niño' en maya?",opts:["Paal","Keh","Na'","Suku'un"],a:0,cat:"Maya",exp:"'Paal' significa niño/hijo en maya yucateco."},
  // MEMES Y CULTURA POP YUCATECA
  {q:"¿Qué frase dice todo yucateco cuando algo está muy rico?",opts:["¡Está padrísimo!","¡Está ki'!","¡Está chido!","¡Está buenísimo!"],a:1,cat:"Cultura Pop",exp:"'¡Está ki'!' o 'ki' unaj' significa 'está rico/delicioso' en maya, frase cotidiana en Mérida."},
  {q:"¿Cómo le dice un yucateco a su mejor amigo?",opts:["Compa","Mano","Güey","Wey o wero"],a:3,cat:"Cultura Pop",exp:"'Wey' o 'wero' es el término coloquial yucateco para amigo cercano."},
  {q:"¿Qué hace un yucateco cuando dice 'vamos a la feria'?",opts:["Va al parque","Va a una feria patronal del pueblo","Va de compras","Va al mercado"],a:1,cat:"Cultura Pop",exp:"Las ferias patronales son el evento más esperado en cada pueblo yucateco, con jarana, toro, juegos y comida."},
  {q:"¿Qué quiere decir 'está caliente como Mérida' en el internet?",opts:["Es una ciudad tranquila","Es la ciudad más calurosa de México","Es muy bonita","Es muy cara"],a:1,cat:"Cultura Pop",exp:"Mérida es conocida como una de las ciudades más calurosas de México, tema recurrente de memes yucatecos."},
  {q:"¿A qué se le llama 'el x'tabai' en Yucatán?",opts:["Un platillo","Una mujer fantasmal que seduce a los hombres","Un árbol sagrado","Una danza"],a:1,cat:"Leyendas",exp:"La X'tabai es la leyenda maya de una bella mujer que aparece junto a la ceiba para llevar a los hombres al inframundo."},
  {q:"¿Qué es el 'alux' en la mitología maya?",opts:["Un dios del sol","Un duende protector del campo","Un guerrero","Una princesa"],a:1,cat:"Leyendas",exp:"El alux es una pequeña figura de barro que cobra vida para proteger los campos y terrenos de los mayas."},
  {q:"¿Cuál es el equipo de béisbol de Mérida?",opts:["Los Tigres","Los Leones","Los Venados","Los Piratas"],a:1,cat:"Deportes",exp:"Los Leones de Yucatán son el equipo de béisbol de Mérida, uno de los más históricos de la Liga Mexicana."},
  {q:"¿Qué deporte fue muy popular en Mérida en el siglo XIX?",opts:["Fútbol","Béisbol","Lucha libre","Bullfighting"],a:1,cat:"Deportes",exp:"El béisbol fue introducido en Yucatán en el siglo XIX y se convirtió en un deporte icónico del estado."},
  // ECONOMÍA E HISTORIA MODERNA
  {q:"¿Por qué se le llamó al henequén 'oro verde'?",opts:["Por su color","Por la riqueza que generó","Por su dureza","Por sus propiedades medicinales"],a:1,cat:"Economía",exp:"El henequén generó enorme riqueza en Yucatán a finales del siglo XIX, financiando el Paseo de Montejo."},
  {q:"¿Qué famoso boulevard construyeron los hacendados henequeneros?",opts:["Paseo de Montejo","Boulevard Kukulkán","Gran Avenida","Calle 60"],a:0,cat:"Economía",exp:"El Paseo de Montejo fue construido inspirado en los Campos Elíseos de París, con las mansiones porfirianas."},
  {q:"¿Cuál es la principal actividad económica de Yucatán hoy?",opts:["Agricultura","Petróleo","Turismo y manufactura","Pesca"],a:2,cat:"Economía",exp:"Hoy Yucatán basa su economía en el turismo (Chichén Itzá, playas), manufactura y agroindustria."},
  // COMUNIDAD CNOP
  {q:"¿Qué significa CNOP?",opts:["Confederación Nacional de Organizaciones Populares","Centro Nacional de Organización Política","Consejo Nacional de Obras Públicas","Confederación de Negocios y Organizaciones"],a:0,cat:"CNOP",exp:"La CNOP es la Confederación Nacional de Organizaciones Populares, fundada en 1943 como sector popular del PRI."},
  {q:"¿En qué año fue fundada la CNOP?",opts:["1929","1943","1955","1968"],a:1,cat:"CNOP",exp:"La CNOP fue fundada el 28 de febrero de 1943 durante el gobierno del presidente Manuel Ávila Camacho."},
  {q:"¿Cuántos años cumple la CNOP Yucatán en 2026?",opts:["75 años","83 años","90 años","100 años"],a:1,cat:"CNOP",exp:"Fundada en 1943, la CNOP Yucatán cumple 83 años de trabajo por las familias yucatecas en 2026."},
  {q:"¿Cuál es el teléfono de la CNOP Yucatán?",opts:["(999) 123-4567","(990) 393-4535","(981) 555-0000","(997) 234-5678"],a:1,cat:"CNOP",exp:"El teléfono de atención ciudadana de la CNOP Yucatán es (990) 393-4535."},
  // ARTE Y MÚSICA
  {q:"¿Quién compuso 'Peregrina', la famosa canción yucateca?",opts:["Guty Cárdenas","Ricardo Palmerín","Pastor Cervera","Armando Manzanero"],a:1,cat:"Arte",exp:"'Peregrina' fue compuesta por Ricardo Palmerín con letra del gobernador Felipe Carrillo Puerto para su amada."},
  {q:"¿Quién es el 'Bardo de América' nacido en Mérida?",opts:["Armando Manzanero","Guty Cárdenas","Ricardo Palmerín","Lorenzo de Monteclaro"],a:1,cat:"Arte",exp:"Augusto Guty Cárdenas, el 'Ruiseñor Yucateco', fue uno de los grandes compositores de trova yucateca."},
  {q:"¿Quién es el famoso compositor de 'Somos Novios' nacido en Mérida?",opts:["Guty Cárdenas","Armando Manzanero","Ricardo Palmerín","Juan Gamboa Guzmán"],a:1,cat:"Arte",exp:"Armando Manzanero, el gran romántico de la música mexicana, nació en Mérida, Yucatán el 7 de diciembre de 1942."},
  {q:"¿Cuál es el género musical más representativo de Yucatán?",opts:["Cumbia","Trova yucateca","Norteño","Balada"],a:1,cat:"Arte",exp:"La trova yucateca es el género musical más icónico del estado, con canciones románticas acompañadas de guitarra."},
  // ARQUITECTURA Y PATRIMONIO
  {q:"¿Qué estilo arquitectónico predomina en el centro de Mérida?",opts:["Moderno","Colonial español","Maya puro","Art Deco"],a:1,cat:"Patrimonio",exp:"El centro histórico de Mérida muestra arquitectura colonial española del siglo XVI al XIX."},
  {q:"¿Qué es el Gran Museo del Mundo Maya?",opts:["Un parque temático","El museo más grande de México dedicado a la cultura maya","Una zona arqueológica","Un teatro al aire libre"],a:1,cat:"Patrimonio",exp:"El Gran Museo del Mundo Maya de Mérida, inaugurado en 2012, es uno de los museos más importantes de la cultura maya."},
  {q:"¿En qué calle está la Catedral de Mérida?",opts:["Calle 60","Calle 61","Calle 63","Calle 65"],a:0,cat:"Patrimonio",exp:"La Catedral de San Ildefonso, la más antigua de México continental, está en la Calle 60 frente al Zócalo."},
  // DATOS CURIOSOS CHUSCOS
  {q:"¿Qué pasa en Mérida cuando llueve?",opts:["Todos se alegran","El tráfico se colapsa y la gente actúa como si fuera el fin del mundo","La gente sale a bailar","Los cenotes se llenan de turistas"],a:1,cat:"Chusco",exp:"En Mérida, la menor lluvia causa caos vial. Un meme recurrente: Mérida vs. cualquier lluvia = caos total."},
  {q:"¿A qué temperatura dicen los meridanos que 'hace frío'?",opts:["0 grados","5 grados","15 grados","25 grados"],a:2,cat:"Chusco",exp:"Para el meridano promedio, 15-18 grados es 'frío polar'. Sí, con todo y chamarra."},
  {q:"¿Qué hace todo yucateco el domingo?",opts:["Va a la playa","Come cochinita en el mercado","Duerme toda la mañana","Va al cine"],a:1,cat:"Chusco",exp:"El domingo con cochinita pibil en el mercado es una tradición casi sagrada en Yucatán."},
  {q:"¿Cuántas vueltas da la gente en el parque de Santiago los domingos?",opts:["Una","Las que sean","Ninguna, es mito","Exactamente 3"],a:1,cat:"Chusco",exp:"La vuelta al parque es una tradición social yucateca sin límite de rondas. El chisme no tiene horario."},
  {q:"¿Por qué los yucatecos le dicen 'wero' a alguien?",opts:["Porque es güero (rubio)","Es un término de cariño para cualquier amigo","Porque es extranjero","Porque trabaja duro"],a:1,cat:"Chusco",exp:"En Yucatán 'wero' es un término de cariño que se usa con cualquier amigo, sin importar el color."},
  {q:"¿Qué animal es el terror de los meridanos conduciendo?",opts:["Perros callejeros","Motocicletas","Topes (tumultos)","Bicicletas"],a:2,cat:"Chusco",exp:"Los topes (tumultos) de Mérida son legendarios. Algunos son más altos que una banqueta y sin señalización."},
  // LEYENDAS
  {q:"¿Quién es la 'X'tabai'?",opts:["Diosa del maíz","Mujer fantasma seductora junto a la ceiba","Princesa maya","Diosa del agua"],a:1,cat:"Leyendas",exp:"La X'tabai es una entidad femenina de la mitología maya que seduce a los hombres cerca de la ceiba para llevarlos al inframundo."},
  {q:"¿Qué es el 'alux'?",opts:["Un dios del sol","Un espíritu protector del campo y la milpa","Un guerrero maya","Una flor sagrada"],a:1,cat:"Leyendas",exp:"El alux es un ser mítico maya que protege los campos. Los agricultores construyen pequeñas casitas para ofrendar al alux."},
  {q:"¿Qué protege el 'alux'?",opts:["Los cenotes","Los campos de milpa y terrenos","Los pueblos","Las casas"],a:1,cat:"Leyendas",exp:"El alux protege los campos y terrenos. Si no se le hace ofrenda, puede volverse travieso y causar problemas."},
  {q:"¿Cómo se llama la serpiente mítica que aparece en Chichén Itzá en los equinoccios?",opts:["Ixchel","Kukulkán","Chaac","Itzamná"],a:1,cat:"Leyendas",exp:"Kukulkán, la Serpiente Emplumada, es la deidad a quien se dedicó el Templo de Chichén Itzá."},
  // DEPORTES Y ENTRETENIMIENTO
  {q:"¿En qué deporte los yucatecos tienen más tradición?",opts:["Fútbol","Béisbol","Basquetbol","Lucha libre"],a:1,cat:"Deportes",exp:"El béisbol es el deporte rey en Yucatán. Los Leones de Yucatán tienen una historia de más de 100 años."},
  {q:"¿Cuántas veces han sido campeones los Leones de Yucatán?",opts:["5","10","más de 15","Nunca"],a:2,cat:"Deportes",exp:"Los Leones de Yucatán han ganado el campeonato de la Liga Mexicana de Béisbol en múltiples ocasiones."},
  // TURISMO
  {q:"¿Cuál es la 'Ruta de los Conventos'?",opts:["Una ruta gastronómica","Un circuito de ex-conventos coloniales del siglo XVI","Un camino maya","Una ruta de cenotes"],a:1,cat:"Turismo",exp:"La Ruta de los Conventos conecta ex-conventos franciscanos del siglo XVI en pueblos yucatecos como Maní, Teabo y Tekax."},
  {q:"¿Qué es la 'Ruta Puuc'?",opts:["Una ruta de playas","Un circuito de ciudades mayas con estilo Puuc","Una ruta gastronómica","Un camino de cenotes"],a:1,cat:"Turismo",exp:"La Ruta Puuc conecta sitios arqueológicos con el estilo arquitectónico Puuc: Uxmal, Kabah, Sayil, Xlapak y Labná."},
  {q:"¿Cuál es la playa más cercana a Mérida?",opts:["Cancún","Progreso","Celestún","Sisal"],a:1,cat:"Turismo",exp:"Progreso está a solo 36 km de Mérida, la playa más accesible para los meridanos."},
  {q:"¿Qué pueblo es famoso por sus sombreros jipi-japa?",opts:["Izamal","Becal","Ticul","Oxkutzcab"],a:1,cat:"Turismo",exp:"Becal, Campeche (colindante con Yucatán), es famoso mundialmente por sus sombreros jipi-japa tejidos en cuevas."},
  // CENOTES
  {q:"¿Cuál es el cenote más fotografiado del mundo?",opts:["Cenote Dos Ojos","Cenote Ik Kil","Cenote Samulá","Gran Cenote"],a:1,cat:"Naturaleza",exp:"El Cenote Ik Kil, junto a Chichén Itzá, es el más famoso con sus raíces colgantes y aguas turquesas."},
  {q:"¿Qué significa 'ts'ono'ot' (cenote) en maya?",opts:["Agua sagrada","Pozo de agua","Cueva bajo el agua","Lugar de los dioses"],a:1,cat:"Maya",exp:"'Ts'ono'ot' en maya significa básicamente 'pozo de agua', de donde viene la palabra española 'cenote'."},
  {q:"¿Para qué usaban los mayas los cenotes?",opts:["Solo para nadar","Rituales sagrados y fuente de agua potable","Solo fuente de agua","Mercado acuático"],a:1,cat:"Historia",exp:"Los cenotes eran portales al inframundo (Xibalbá), usados para rituales y sacrificios, además de fuente de agua."},
  // DATOS NUMÉRICOS
  {q:"¿Qué número de planeta tiene Mérida en el sistema de ciudades yucatecas?",opts:["Es la única ciudad grande","Es la número 1","La número 5 junto con Valladolid","No aplica"],a:0,cat:"Geografía",exp:"Mérida concentra más del 50% de la población total de Yucatán."},
  {q:"¿Aproximadamente cuántas personas hablan maya en México?",opts:["100,000","500,000","800,000","2 millones"],a:2,cat:"Maya",exp:"Aproximadamente 800,000 personas hablan maya yucateco en México, siendo la segunda lengua indígena más hablada."},
  {q:"¿Cuál es la festividad más importante de Mérida en enero?",opts:["Año Nuevo Maya","Feria de Mérida (Expo Yucatán)","Hanal Pixán","Carnaval"],a:1,cat:"Tradiciones",exp:"La Feria de Mérida o Expo Yucatán celebra la fundación de la ciudad el 6 de enero con actividades culturales."},
  {q:"¿Cuántas pirámides hay en Chichén Itzá?",opts:["Solo El Castillo","Varias, incluyendo el Templo de los Guerreros","Solo 2","Cientos"],a:1,cat:"Historia",exp:"Chichén Itzá tiene múltiples estructuras: El Castillo, Templo de los Guerreros, El Caracol, El Juego de Pelota, entre otras."},
  {q:"¿Qué representa el juego de pelota maya?",opts:["Un deporte recreativo","Un ritual cósmico relacionado con el movimiento del sol","Una competencia guerrera","Un entretenimiento real"],a:1,cat:"Historia",exp:"El juego de pelota era un ritual cósmico que representaba la lucha entre la luz y la oscuridad, el movimiento del sol."},
  {q:"¿Cuál es el calendario agrícola maya de 365 días?",opts:["Tzolkin","Haab","Cuenta Larga","Calendario Venus"],a:1,cat:"Historia",exp:"El Haab es el calendario solar maya de 365 días, dividido en 18 meses de 20 días más 5 días 'aciagos' (Wayeb)."},
  {q:"¿Cuántos días tiene el calendario sagrado Tzolkin?",opts:["365","260","200","360"],a:1,cat:"Historia",exp:"El Tzolkin tiene 260 días, combinando 13 números con 20 signos. Era el calendario ritual y adivinatorio maya."},
  {q:"¿Quién fue Felipe Carrillo Puerto?",opts:["Un conquistador español","Gobernador socialista de Yucatán en los años 20","Un poeta maya","Un hacendado del henequén"],a:1,cat:"Historia",exp:"Felipe Carrillo Puerto fue gobernador progresista de Yucatán (1922-1924), defensor de los derechos mayas, asesinado en 1924."}
];

// ============================================================
//  100 PALABRAS WORDLE MAYA — 3 NIVELES
// ============================================================
const PALABRAS_WORDLE = {
  facil: [
    {word:"KANAL",hint:"Color amarillo"},{word:"CHICH",hint:"Pájaro pequeño"},
    {word:"BALAM",hint:"El jaguar sagrado"},{word:"XIKIN",hint:"La oreja"},
    {word:"PETEN",hint:"Isla o territorio"},{word:"TZIMIN",hint:"Caballo / tapir"},
    {word:"KEKEN",hint:"Cerdo"},{word:"PAXIL",hint:"Lugar del maíz"},
    {word:"CHAKAH",hint:"Árbol de palo mulato"},{word:"KANUL",hint:"Guardián"},
    {word:"MUYAL",hint:"Nube"},{word:"TULIX",hint:"Libélula"},
    {word:"KOLOM",hint:"Flecha"},{word:"PIXAN",hint:"Alma o espíritu"},
    {word:"SUYUY",hint:"Virgen o pura"},{word:"JALOM",hint:"Tejedor"},
    {word:"BOXOL",hint:"Caracol terrestre"},{word:"CHEEL",hint:"Loro"},
    {word:"TSIMIN",hint:"Caballo"},{word:"KUKUL",hint:"Quetzal, ave sagrada"},
    {word:"AABIL",hint:"Iguana"},{word:"KABAH",hint:"Sitio arqueológico Puuc"},
    {word:"SAYIL",hint:"Sitio arqueológico Puuc"},{word:"XIBIL",hint:"El que va"},
    {word:"TS'UUL",hint:"Extranjero / señor"},
    {word:"COPAL",hint:"Incienso sagrado maya"},{word:"MAKAL",hint:"Malanga, tubérculo"},
    {word:"PIXAN",hint:"Espíritu del difunto"},
    {word:"TSUTS",hint:"Fin o remate"},{word:"WAKAX",hint:"Vaca / res"},
    {word:"DZUUP",hint:"Colgante, pendiente"},{word:"KOLOK",hint:"Tecolote / búho"},
    {word:"MOSON",hint:"Remolino de viento"},{word:"NOHOL",hint:"El sur"},
  ],
  medio: [
    {word:"ITZAM",hint:"Lagarto del agua / dios creador"},{word:"CHAAC",hint:"Dios de la lluvia"},
    {word:"IXCHEL",hint:"Diosa de la luna y medicina"},{word:"KUKULK",hint:"Serpiente emplumada"},
    {word:"HOLOCH",hint:"Elote tierno"},{word:"TSIBIL",hint:"Escrito o pintado"},
    {word:"ZUBIN",hint:"Árbol espinoso"},{word:"CHAKMO",hint:"Ave pájaro carpintero"},
    {word:"BOLON",hint:"Número nueve"},{word:"LAJUN",hint:"Número diez"},
    {word:"XAMAN",hint:"El norte"},{word:"CHIKAN",hint:"El este"},
    {word:"LIKIN",hint:"Oriente / este"},{word:"CHIBAL",hint:"Linaje familiar"},
    {word:"OCHELK",hint:"Entrada o portal"},{word:"PAALOM",hint:"Guardián protector"},
    {word:"SIIPIL",hint:"Pecado o culpa"},{word:"TSAAKB",hint:"Curación / remedio"},
    {word:"YAXCHE",hint:"La Ceiba sagrada"},{word:"BAAKEL",hint:"Hueso"},
    {word:"CHOOCH",hint:"Semilla, hueso de fruta"},{word:"DZOYOL",hint:"Caracol marino"},
    {word:"MAATAN",hint:"Regalo / don"},{word:"XOTAAN",hint:"Cortado"},
    {word:"KUXTAL",hint:"Vida / existencia"},
    {word:"WAYAK",hint:"Sueño / visión"},{word:"BULUCH",hint:"Once"},
    {word:"OXLAJ",hint:"Trece"},{word:"KANLAJ",hint:"Catorce"},
    {word:"JOLOOM",hint:"Cabeza / cráneo"},
    {word:"TUMBEN",hint:"Nuevo / reciente"},{word:"LEKECH",hint:"Mi igual / mi doble"},
    {word:"XIBLAB",hint:"Temor / terror"},
  ],
  dificil: [
    {word:"XIBALBÁ",hint:"El inframundo maya"},{word:"ITZAMNÁ",hint:"Dios supremo creador"},
    {word:"HUNABKU",hint:"El dios único maya"},{word:"PALENKE",hint:"Ciudad maya de Chiapas"},
    {word:"TZOLKIN",hint:"Calendario sagrado de 260 días"},{word:"WAYASBA",hint:"Nagual / animal guardián"},
    {word:"KIBALAM",hint:"Jaguar negro"},{word:"OXKUTSK",hint:"Pueblo yucateco citrícola"},
    {word:"MAASEWL",hint:"El pueblo / la gente común"},{word:"TZELTAL",hint:"Lengua maya de Chiapas"},
    {word:"KUCHKAB",hint:"Mundo / universo"},{word:"DZACAB",hint:"Nombre de municipio yucateco"},
    {word:"XOCNECE",hint:"Pueblo maya del norte"},{word:"HUNPDZK",hint:"Un camino"},
    {word:"CAAKLUK",hint:"Dos veces"},{word:"HOLOLTUN",hint:"Agujero de piedra"},
    {word:"UAYASBA",hint:"Bruja / hechicera"},{word:"TSIKBALT",hint:"Contar / narrar"},
    {word:"KANCHOCH",hint:"Patio de la casa"},{word:"YUMKAAX",hint:"Dios del maíz y bosque"},
    {word:"XIBKAAN",hint:"Serpiente del temor"},{word:"PAKLUUMK",hint:"Territorio cercado"},
    {word:"TSOLTSOL",hint:"Colibríes, plural"},{word:"XOCHIKAL",hint:"Valle de flores"},
    {word:"CANAKAL",hint:"En el cielo"},
    {word:"BAAXALO",hint:"¿A dónde vas?"},{word:"UTSKABEH",hint:"El buen camino"},
    {word:"KUXAANTL",hint:"El que vive"},{word:"YOKHABIL",hint:"Con alegría"},
    {word:"DZIDZILK",hint:"Hormiga cortadora"},
    {word:"UCHBENKA",hint:"Cosa antigua"},{word:"SIIPILTAK",hint:"Los pecados"},
    {word:"MUCHNALB",hint:"Lo oculto bajo tierra"},
  ]
};

// ── IIFE ─────────────────────────────────────────────────────
(function () {

  // ── TABS PRINCIPALES ──────────────────────────────────────
  const tabs = document.querySelectorAll(".yuc-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".yuc-section").forEach(s => s.classList.remove("active"));
      tab.classList.add("active");
      const sec = document.getElementById("tab-" + tab.dataset.tab);
      if (sec) sec.classList.add("active");
      const bar = document.querySelector(".yuc-tabs-bar");
      if (bar) window.scrollTo({ top: bar.offsetTop - 1, behavior: "smooth" });
    });
  });

  // ── TABS DIRECTORIO ───────────────────────────────────────
  document.querySelectorAll(".dir-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".dir-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".dir-section").forEach(s => s.classList.remove("active"));
      tab.classList.add("active");
      const sec = document.getElementById("dir-" + tab.dataset.dir);
      if (sec) sec.classList.add("active");
    });
  });

  // ── REMEDIOS: buscador ────────────────────────────────────
  const remedySearch = document.getElementById("remedySearch");
  const remedyCards  = Array.from(document.querySelectorAll(".remedy-card[data-id]"));
  if (remedySearch) {
    remedySearch.addEventListener("input", function () {
      const q = this.value.toLowerCase();
      let n = 0;
      remedyCards.forEach(c => {
        const ok = c.dataset.keywords.includes(q);
        c.style.display = ok ? "" : "none";
        if (ok) n++;
      });
      const empty = document.getElementById("remedyEmpty");
      if (empty) empty.classList.toggle("show", n === 0);
    });
  }

  // ── REMEDIOS: click para abrir modal ─────────────────────
  document.querySelectorAll(".remedy-card[data-id]").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      abrirRemedioModal(id);
    });
  });

  // ── MODAL REMEDIO ─────────────────────────────────────────
  window.cerrarRemedioModal = function() {
    const m = document.getElementById("remedioModal");
    if (m) { m.classList.remove("abierto"); document.body.style.overflow = ""; }
  };

  // ── TRADUCTOR ─────────────────────────────────────────────
  let srcLang = "español", tgtLang = "maya yucateco";

  const swapBtn = document.getElementById("swapLangs");
  if (swapBtn) {
    swapBtn.addEventListener("click", () => {
      const src = document.getElementById("srcTxt"), tgt = document.getElementById("tgtTxt");
      const tmp = src.value; src.value = tgt.value; tgt.value = tmp;
      const t = srcLang; srcLang = tgtLang; tgtLang = t;
      const sl = document.getElementById("srcLbl"), tl = document.getElementById("tgtLbl");
      if (sl) sl.textContent = srcLang === "español" ? "Español" : "Maya Yucateco";
      if (tl) tl.textContent = srcLang === "español" ? "Maya Yucateco" : "Español";
    });
  }

  document.querySelectorAll(".phrase-btn").forEach(b => {
    b.addEventListener("click", () => {
      const src = document.getElementById("srcTxt");
      if (src) src.value = b.dataset.ph;
      const tb = document.getElementById("translateBtn");
      if (tb) tb.click();
    });
  });

  const translateBtn = document.getElementById("translateBtn");
  if (translateBtn) {
    translateBtn.addEventListener("click", async function () {
      const txt = document.getElementById("srcTxt").value.trim();
      if (!txt) return;
      this.disabled = true;
      this.textContent = "Traduciendo...";
      const tgtEl = document.getElementById("tgtTxt");
      // Intentar diccionario local primero
      const local = traducirLocal(txt, srcLang, tgtLang);
      if (local) {
        tgtEl.value = local;
        this.disabled = false;
        this.textContent = "Traducir";
        return;
      }
      // Si no está en diccionario, usar IA
      try {
        tgtEl.value = await aiCall(`Eres un traductor experto de maya yucateco. Traduce este texto de ${srcLang} a ${tgtLang}: "${txt}". Responde ÚNICAMENTE con la traducción, nada más.`);
      } catch {
        tgtEl.value = "Error al traducir. Verifica la clave API.";
      }
      this.disabled = false;
      this.textContent = "Traducir";
    });
  }

  // ── LUGARES: IA ───────────────────────────────────────────
  const lugarBtn = document.getElementById("lugarBtn");
  if (lugarBtn) {
    lugarBtn.addEventListener("click", () => {
      const val = document.getElementById("lugarInput").value.trim(); if (!val) return;
      const btn = document.getElementById("lugarBtn"), resp = document.getElementById("lugarResp");
      const lbl = btn.textContent; btn.textContent="Consultando..."; btn.disabled=true; resp.classList.remove("show");
      aiCall(`Eres experto en turismo de Yucatán. Responde brevemente sobre: "${val}". Máximo 4 líneas.`)
        .then(r => { resp.textContent=r; resp.classList.add("show"); btn.textContent=lbl; btn.disabled=false; })
        .catch(() => { resp.textContent="Error al consultar."; resp.classList.add("show"); btn.textContent=lbl; btn.disabled=false; });
    });
  }

  // ── TRIVIA — 100 preguntas, 10 por ronda ─────────────────
  let tIdx=0, tScore=0, tStreak=0, tRonda=0;
  let tOrd = shuffleArray(Array.from(Array(TODAS_PREGUNTAS.length).keys()));
  let preguntasRonda = [];

  function shuffleArray(arr) {
    const a = [...arr];
    for (let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
    return a;
  }

  function iniciarRonda() {
    const start = tRonda * 10;
    if (start >= tOrd.length) { tRonda=0; tOrd=shuffleArray(Array.from(Array(TODAS_PREGUNTAS.length).keys())); }
    preguntasRonda = tOrd.slice(tRonda*10, tRonda*10+10);
    tIdx = 0;
    cargarTrivia();
  }

  function cargarTrivia() {
    if (tIdx >= preguntasRonda.length) {
      // Fin de ronda
      const tq = document.getElementById("tQ"), to = document.getElementById("tOpts");
      const tc = document.getElementById("tCat"), tf = document.getElementById("tFb");
      if(tc) tc.textContent = "¡Ronda completada!";
      if(tq) tq.textContent = `Terminaste ${tRonda*10+10} de ${TODAS_PREGUNTAS.length} preguntas. Puntaje: ${tScore}`;
      if(to) to.innerHTML = "";
      if(tf) { tf.textContent=""; tf.className="t-fb"; }
      const tn = document.getElementById("tNext");
      if(tn) { tn.textContent="Siguiente ronda"; tn.className="t-next show"; }
      return;
    }
    const p = TODAS_PREGUNTAS[preguntasRonda[tIdx]];
    const tc = document.getElementById("tCat"), tq = document.getElementById("tQ");
    const tf = document.getElementById("tFb"), tn = document.getElementById("tNext");
    const tp = document.getElementById("tProgTxt"), tfi = document.getElementById("tFill");
    if(tc) tc.textContent = p.cat;
    if(tq) tq.textContent = p.q;
    if(tf) tf.className = "t-fb";
    if(tn) tn.className = "t-next";
    if(tp) tp.textContent = `Pregunta ${tIdx+1} de 10 · Ronda ${tRonda+1}`;
    if(tfi) tfi.style.width = `${(tIdx/10)*100}%`;
    const opts = document.getElementById("tOpts");
    if (!opts) return;
    opts.innerHTML = "";
    p.opts.forEach((o, i) => {
      const b = document.createElement("button");
      b.className = "t-opt"; b.textContent = o;
      b.onclick = () => {
        document.querySelectorAll(".t-opt").forEach(x => x.disabled=true);
        const fb = document.getElementById("tFb");
        if (i===p.a) {
          b.classList.add("correct"); tScore+=10+tStreak*2; tStreak++;
          document.getElementById("tScore").textContent=tScore;
          document.getElementById("tStreak").textContent=tStreak;
          if(fb){fb.textContent="¡Correcto! "+p.exp; fb.className="t-fb show ok";}
        } else {
          b.classList.add("wrong");
          document.querySelectorAll(".t-opt")[p.a].classList.add("correct");
          tStreak=0; document.getElementById("tStreak").textContent=0;
          if(fb){fb.textContent="Incorrecto. "+p.exp; fb.className="t-fb show fail";}
        }
        const tn2=document.getElementById("tNext"); if(tn2) tn2.classList.add("show");
      };
      opts.appendChild(b);
    });
  }

  const tNext = document.getElementById("tNext");
  if (tNext) tNext.addEventListener("click", () => {
    const txt = tNext.textContent;
    if (txt === "Siguiente ronda") { tRonda++; iniciarRonda(); tNext.textContent="Siguiente pregunta"; }
    else { tIdx++; cargarTrivia(); }
  });
  iniciarRonda();

  // ── WORDLE CON NIVELES ────────────────────────────────────
  let wNivel="facil", wT="", wA=0, wC="";

  window.startWordle = () => {
    document.getElementById("gamesMenu").style.display="none";
    document.getElementById("wordleGame").style.display="block";
    renderWordleMenu();
  };

  function renderWordleMenu() {
    const g = document.getElementById("wGrid");
    const kb = document.getElementById("wKb");
    const msg = document.getElementById("wMsg");
    const hint = document.getElementById("wHint");
    if(g) g.innerHTML='<div style="text-align:center;padding:20px;"><p style="margin-bottom:16px;font-size:15px;font-weight:600;">Elige dificultad:</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;"><button onclick="seleccionarNivel(\'facil\')" class="btn-nivel btn-facil">Fácil<br><small>5 letras</small></button><button onclick="seleccionarNivel(\'medio\')" class="btn-nivel btn-medio">Medio<br><small>5-6 letras</small></button><button onclick="seleccionarNivel(\'dificil\')" class="btn-nivel btn-dificil">Difícil<br><small>6-7 letras</small></button></div></div>';
    if(kb) kb.innerHTML="";
    if(msg) msg.textContent="";
    if(hint) hint.textContent="Selecciona un nivel para comenzar";
  }

  window.seleccionarNivel = function(nivel) {
    wNivel = nivel;
    window.initWordle();
  };

  window.initWordle = function() {
    const pool = PALABRAS_WORDLE[wNivel];
    const p = pool[Math.floor(Math.random()*pool.length)];
    wT=p.word; wA=0; wC="";
    const hint=document.getElementById("wHint"), msg=document.getElementById("wMsg");
    if(hint) hint.textContent="Pista: "+p.hint+" ("+wNivel+") · "+wT.length+" letras";
    if(msg) msg.textContent="";
    buildWGrid(); buildWKb();
  };

  function buildWGrid() {
    const g=document.getElementById("wGrid"); if(!g) return;
    g.style.gridTemplateColumns=`repeat(${wT.length},1fr)`;
    g.innerHTML="";
    for(let r=0;r<6;r++) for(let c=0;c<wT.length;c++){
      const d=document.createElement("div"); d.className="w-cell"; d.id=`wc-${r}-${c}`; g.appendChild(d);
    }
  }
  function buildWKb() {
    const rows=[["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["ENT","Z","X","C","V","B","N","M","DEL"]];
    const kb=document.getElementById("wKb"); if(!kb) return; kb.innerHTML="";
    rows.forEach(row=>{
      const div=document.createElement("div"); div.className="wkb-row";
      row.forEach(k=>{
        const btn=document.createElement("button");
        btn.className="w-key"+(k.length>2?" wide":""); btn.textContent=k; btn.id="wk-"+k;
        btn.onclick=()=>wKey(k==="ENT"?"ENTER":k==="DEL"?"⌫":k);
        div.appendChild(btn);
      }); kb.appendChild(div);
    });
  }
  function wKey(k){
    if(wA>=6||!wT) return;
    if(k==="ENTER"){if(wC.length<wT.length) return; wSubmit();}
    else if(k==="⌫"){wC=wC.slice(0,-1); wUpdateRow();}
    else if(wC.length<wT.length){wC+=k; wUpdateRow();}
  }
  function wUpdateRow(){
    for(let c=0;c<wT.length;c++){
      const cell=document.getElementById(`wc-${wA}-${c}`);
      if(cell){cell.textContent=wC[c]||""; cell.className="w-cell"+(wC[c]?" filled":"");}
    }
  }
  function wSubmit(){
    const g=wC.split(""),t=wT.split(""),res=Array(wT.length).fill("absent"),used=Array(wT.length).fill(false),ok=Array(wT.length).fill(false);
    g.forEach((l,i)=>{if(l===t[i]){res[i]="correct";used[i]=ok[i]=true;}});
    g.forEach((l,i)=>{if(ok[i]) return; const j=t.findIndex((x,ti)=>x===l&&!used[ti]); if(j!==-1){res[i]="present";used[j]=true;}});
    res.forEach((r,i)=>setTimeout(()=>{
      const cell=document.getElementById(`wc-${wA}-${i}`); if(cell) cell.className="w-cell "+r;
      const key=document.getElementById("wk-"+g[i]);
      if(key){if(r==="correct")key.className="w-key correct"; else if(r==="present"&&!key.className.includes("correct"))key.className="w-key present"; else if(r==="absent"&&!key.className.match(/correct|present/))key.className="w-key absent";}
    },i*120));
    wA++;
    const won=res.every(r=>r==="correct");
    setTimeout(()=>{
      const msg=document.getElementById("wMsg"); if(!msg) return;
      if(won) msg.textContent=`¡Correcto! "${wT}" en ${wA} intento${wA>1?"s":""}. ¡${wNivel==="dificil"?"Eres experto maya!":wNivel==="medio"?"¡Muy bien!":"¡Buen trabajo!"}`;
      else if(wA>=6) msg.textContent=`La palabra era: ${wT}. Significa: ${document.getElementById("wHint").textContent.split("Pista: ")[1].split(" (")[0]}`;
    },wT.length*120+200);
    wC="";
  }
  document.addEventListener("keydown",e=>{
    const wg=document.getElementById("wordleGame");
    if(!wg||wg.style.display==="none") return;
    const k=e.key.toUpperCase();
    if(k==="ENTER") wKey("ENTER");
    else if(k==="BACKSPACE") wKey("⌫");
    else if(/^[A-ZÁÉÍÓÚÑÜ']$/.test(k)) wKey(k);
  });

  // ── QUIÉN SOY ─────────────────────────────────────────────
  let qsIdx=0;
  const QSL=[
    "Soy el Estadio de béisbol de Mérida donde juegan los Leones. ¿Quién soy?",
    "Soy la lengua indígena que hablan más de 800,000 personas en Yucatán. ¿Qué soy?",
    "Soy el platillo que se cocina bajo tierra con achiote. ¿Qué soy?",
    "Soy la capital de Yucatán, la Ciudad Blanca. ¿Cuál soy?",
    "Soy la abeja sagrada maya sin aguijón. ¿Qué soy?",
    "Soy el baile folklórico más representativo de Yucatán. ¿Qué soy?",
    "Soy la fiesta de muertos yucateca, diferente al Día de Muertos. ¿Cómo me llaman?",
    "Soy el árbol sagrado que conecta los tres mundos mayas. ¿Qué soy?",
    "Soy el compositor de 'Somos Novios' nacido en Mérida. ¿Quién soy?",
    "Soy el canal amarillo que tienes en Yucatán. ¿Cuál soy?"
  ];
  window.startQS = () => {
    document.getElementById("gamesMenu").style.display="none";
    document.getElementById("qsGame").style.display="block";
    window.loadQS();
  };
  window.loadQS = async () => {
    const card=document.getElementById("qsCard"); if(!card) return;
    card.innerHTML="<p style='text-align:center;padding:24px;color:#8a7a5a;'>Generando pistas...</p>";
    try{
      const txt=await aiCall(`Juego ¿Quién/Qué soy? sobre Yucatán México. Enigma: "${QSL[qsIdx%QSL.length]}". Responde SOLO con JSON: {"respuesta":"...","pistas":["pista difícil","pista media","pista fácil"]}. Pistas relacionadas a Yucatán.`);
      const data=JSON.parse(txt.match(/\{[\s\S]*\}/)[0]);
      let rev=0;
      const render=()=>{
        const pistas=data.pistas.slice(0,rev+1).map((h,i)=>`<p style='margin-bottom:8px;font-size:14px;line-height:1.7;'>${i+1}. ${h}</p>`).join("");
        const btnP=rev<data.pistas.length-1?`<button onclick="window._qsR(${rev+1})" style="flex:1;padding:11px;background:#f0f7f3;color:#0f4c2a;border:2px solid #0f4c2a;border-radius:50px;font-weight:700;cursor:pointer;font-family:'Outfit',sans-serif;">Ver otra pista</button>`:"";
        card.innerHTML=
          `<div style="margin-bottom:16px;"><h3 style="font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;">¿Quién o Qué Soy?</h3><p style="font-size:13px;color:#8a7a5a;">Pista ${rev+1} de ${data.pistas.length}</p></div>`+
          `<div style="background:#f0f7f3;border-radius:14px;padding:18px;margin-bottom:16px;">${pistas}</div>`+
          `<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px;">${btnP}<button onclick='document.getElementById("qsAns").style.display="block"' style="flex:1;padding:11px;background:#0f4c2a;color:#fff;border:none;border-radius:50px;font-weight:700;cursor:pointer;font-family:'Outfit',sans-serif;">Ver respuesta</button></div>`+
          `<div id="qsAns" style="display:none;margin-bottom:12px;text-align:center;background:#c8920a;color:#fff;border-radius:14px;padding:18px;font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;">Soy: ${data.respuesta}</div>`+
          `<button onclick="window._qsN()" style="width:100%;padding:11px;background:#f0e8d0;color:#1a1208;border:none;border-radius:50px;font-weight:700;cursor:pointer;font-family:'Outfit',sans-serif;">Siguiente →</button>`;
      };
      window._qsR=r=>{rev=r;render();};
      window._qsN=()=>{qsIdx++;window.loadQS();};
      render();
    }catch{
      card.innerHTML=`<p style='text-align:center;color:#c41e1e;padding:24px;'>Error al generar. Verifica la clave API.</p><button onclick='window.loadQS()' style='display:block;margin:0 auto;padding:10px 24px;background:#0f4c2a;color:#fff;border:none;border-radius:50px;cursor:pointer;'>Reintentar</button>`;
    }
  };

  // ── DIRECTORIO: filtros ───────────────────────────────────
  const dirSearch = document.getElementById("dirSearch");
  const dirCat    = document.getElementById("dirCat");
  const negCards  = Array.from(document.querySelectorAll(".negocio-card[data-cat]"));
  function filtrarDirectorio() {
    const q   = dirSearch ? dirSearch.value.toLowerCase() : "";
    const cat = dirCat ? dirCat.value : "all";
    negCards.forEach(c => {
      const ok = (cat==="all"||c.dataset.cat===cat) && (c.dataset.name||"").includes(q);
      c.style.display = ok ? "" : "none";
    });
  }
  if(dirSearch) dirSearch.addEventListener("input", filtrarDirectorio);
  if(dirCat)    dirCat.addEventListener("change", filtrarDirectorio);

  // ── DIRECTORIO: modal negocio ─────────────────────────────
  document.querySelectorAll(".negocio-card[data-id]").forEach(card => {
    card.addEventListener("click", e => {
      if (e.target.closest("a")) return; // no abrir modal si click en enlace
      abrirNegocioModal(card.dataset.id);
    });
  });
  window.cerrarNegocioModal = function() {
    const m = document.getElementById("negocioModal");
    if (m) { m.classList.remove("abierto"); document.body.style.overflow=""; }
  };

  // ── BOLSA: filtro ─────────────────────────────────────────
  const jobSearch=document.getElementById("jobSearch"), jobCat=document.getElementById("jobCat");
  const jobCards=Array.from(document.querySelectorAll("#jobGrid .job-card"));
  function filterJobs(){
    const q=jobSearch?jobSearch.value.toLowerCase():"", cat=jobCat?jobCat.value:"all";
    let n=0;
    jobCards.forEach(c=>{const ok=(cat==="all"||c.dataset.area===cat)&&c.dataset.name.includes(q); c.style.display=ok?"":"none"; if(ok)n++;});
    const empty=document.getElementById("jobEmpty"); if(empty) empty.classList.toggle("show",n===0);
  }
  if(jobSearch) jobSearch.addEventListener("input",filterJobs);
  if(jobCat)    jobCat.addEventListener("change",filterJobs);

  // ── PUBLICAR VACANTE — envía a CNOP ──────────────────────
  const jobPostBtn=document.getElementById("jobPostBtn");
  if(jobPostBtn){
    jobPostBtn.addEventListener("click", async ()=>{
      const val=document.getElementById("jobPostInput").value.trim(); if(!val) return;
      const btn=document.getElementById("jobPostBtn"), resp=document.getElementById("jobPostResp");
      btn.textContent="Procesando..."; btn.disabled=true; resp.classList.remove("show");
      try{
        const formatted=await aiCall(`Formatea esta vacante de manera profesional: "${val}". Incluye: Puesto, Empresa, Ubicación en Yucatán, Salario estimado para Mérida, Requisitos, Beneficios. Sé conciso.`);
        // Enviar por correo via mailto
        const asunto=encodeURIComponent("Solicitud de vacante - Mi Yucatán CNOP");
        const cuerpo=encodeURIComponent("SOLICITUD DE PUBLICACIÓN DE VACANTE\n\n"+formatted+"\n\n---\nEnviado desde Mi Yucatán · CNOP Yucatán");
        resp.innerHTML=`<strong>Tu vacante fue formateada:</strong><br><br>${formatted.replace(/\n/g,"<br>")}<br><br><a href="mailto:cnop.yucatanoficial@gmail.com?subject=${asunto}&body=${cuerpo}" style="display:inline-block;background:#25d366;color:#fff;padding:10px 22px;border-radius:50px;font-weight:700;text-decoration:none;margin-top:8px;">Enviar solicitud a CNOP</a><br><small style="color:rgba(255,255,255,.6);margin-top:8px;display:block;">La CNOP revisará y publicará tu vacante en 24-48 horas</small>`;
        resp.classList.add("show");
      }catch{
        resp.textContent="Error al procesar. Intenta de nuevo."; resp.classList.add("show");
      }
      btn.textContent="Publicar vacante"; btn.disabled=false;
    });
  }

  // ── CONVENIOS ─────────────────────────────────────────────
  const convBtn=document.getElementById("convBtn");
  if(convBtn){
    convBtn.addEventListener("click",()=>{
      const val=document.getElementById("convInput").value.trim(); if(!val) return;
      const btn=document.getElementById("convBtn"), resp=document.getElementById("convResp");
      const lbl=btn.textContent; btn.textContent="Consultando..."; btn.disabled=true; resp.classList.remove("show");
      aiCall(`Eres asistente CNOP Yucatán. Responde brevemente: "${val}". Tel (990)393-4535, Lun-Vie 9-17h, afiliación gratis. Máximo 4 líneas.`)
        .then(r=>{resp.textContent=r; resp.classList.add("show"); btn.textContent=lbl; btn.disabled=false;})
        .catch(()=>{resp.textContent="Error al consultar."; resp.classList.add("show"); btn.textContent=lbl; btn.disabled=false;});
    });
  }

  // ── CERRAR MODALES CON ESC ────────────────────────────────
  document.addEventListener("keydown", e => {
    if (e.key==="Escape") {
      window.cerrarRemedioModal && cerrarRemedioModal();
      window.cerrarNegocioModal && cerrarNegocioModal();
    }
  });

}()); // fin IIFE

// ── DATOS REMEDIOS ────────────────────────────────────────────
const REMEDIOS_DATA = {
  chaya:{
    nombre:"Chaya", maya:"Chay (Cnidoscolus aconitifolius)",
    color:"#2d8a52", uso:"Anemia · Presión arterial · Diabetes · Fuerza",
    desc:"Hierba sagrada para los mayas yucatecos. Rica en hierro, calcio, vitaminas A y C. Se le conoce como el 'árbol espinaca' de Yucatán. Crece en los solares y huertos de toda la Península.",
    ingredientes:["5 hojas de chaya fresca","1 litro de agua potable","Jugo de 1 limón (opcional)","1 cucharadita de miel (opcional)"],
    preparacion:"1. Lavar bien las hojas bajo agua corriente.\n2. Hervir el agua en una olla.\n3. Agregar las 5 hojas y dejar hervir 10-12 minutos.\n4. Retirar del fuego y dejar enfriar.\n5. Colar y servir frío con limón y miel.\n6. Tomar 1 vaso en ayunas diariamente.",
    dosis:"1 vaso al día en ayunas. Puede tomarse hasta 3 veces por semana de forma preventiva.",
    advertencia:"Consumir siempre cocida, NUNCA cruda. La chaya cruda contiene glucósidos cianogénicos tóxicos que se eliminan con el calor.",
    origen:"Recolectada en los solares del municipio de Valladolid y Temozón.",
    audio:null, video:null
  },
  ruda:{
    nombre:"Ruda", maya:"Ruda (Ruta graveolens)",
    color:"#4a7c3f", uso:"Nervios · Susto · Espanto · Dolores menstruales",
    desc:"Planta de uso ritual y medicinal fundamental en la tradición maya yucateca. Se utiliza tanto en limpias espirituales como en remedios físicos. Muy común en los patios y solares de las casas yucatecas.",
    ingredientes:["3 ramitas de ruda fresca","1 taza de agua caliente (250ml)","1 cucharadita de azúcar mascabado (opcional)"],
    preparacion:"1. Lavar las ramitas de ruda.\n2. Calentar el agua hasta antes de hervir.\n3. Agregar las ramitas y tapar la taza.\n4. Dejar reposar 8-10 minutos.\n5. Colar y beber tibio.\n6. Para limpias: frotar suavemente las ramitas sobre el cuerpo.",
    dosis:"1 taza antes de dormir por 3 días consecutivos. Para susto: también se usa en baños con ruda.",
    advertencia:"PROHIBIDO durante el embarazo. No tomar en exceso. Consultar a la partera o curandera del pueblo antes de usar en niños.",
    origen:"Cultivada en los huertos familiares de Izamal y Tekax.",
    audio:null, video:null
  },
  epazote:{
    nombre:"Epazote", maya:"Ts'iits'ilché (Dysphania ambrosioides)",
    color:"#5a8a3a", uso:"Parásitos · Cólicos · Gases · Digestión",
    desc:"El epazote es el condimento y medicina más usado en la cocina yucateca. Presente en todos los hogares de la Península. Usado desde tiempos prehispánicos como vermífugo natural por los mayas.",
    ingredientes:["10-12 hojas de epazote fresco","1 litro de agua","1 pizca de sal (opcional)"],
    preparacion:"1. Lavar bien las hojas de epazote.\n2. Hervir el agua.\n3. Agregar las hojas y hervir a fuego bajo 15 minutos.\n4. Dejar enfriar a temperatura ambiente.\n5. Colar y tomar en ayunas.",
    dosis:"1 vaso en ayunas por 3 días consecutivos. Para parásitos, repetir el ciclo después de 7 días de descanso.",
    advertencia:"No exceder las dosis. El epazote en grandes cantidades puede ser tóxico. No dar a embarazadas ni a niños menores de 3 años.",
    origen:"Recolectado en milpas y huertos de Oxkutzcab y Tzucacab.",
    audio:null, video:null
  },
  henequen:{
    nombre:"Savia de Henequén", maya:"K'i (Agave fourcroydes)",
    color:"#8a6a2a", uso:"Quemaduras · Heridas · Piel seca · Cicatrización",
    desc:"El henequén es la planta símbolo de Yucatán, el 'oro verde' que financió la prosperidad del estado. Además de fibra, su savia tiene propiedades cicatrizantes extraordinarias conocidas por los mayas desde tiempos ancestrales.",
    ingredientes:["1 penca de henequén fresca","Agua limpia para lavar"],
    preparacion:"1. Cortar una penca de henequén con cuidado (usar guantes).\n2. Retirar las espinas de los bordes.\n3. Raspar la superficie para extraer el gel transparente.\n4. Aplicar directamente sobre la zona afectada.\n5. Dejar actuar 20-30 minutos sin cubrir.\n6. Lavar con agua tibia.",
    dosis:"Aplicar 2-3 veces al día sobre la zona afectada. Para quemaduras leves, aplicar inmediatamente y repetir cada 4 horas.",
    advertencia:"Solo uso externo. No aplicar en heridas profundas o infectadas. Si hay infección, buscar atención médica.",
    origen:"Plantaciones de henequén en Motul, Temax y Dzidzantún.",
    audio:null, video:null
  },
  hierbabuena:{
    nombre:"Hierbabuena", maya:"Xkoop (Mentha spicata)",
    color:"#3a7a50", uso:"Dolor de cabeza · Náuseas · Fiebre · Indigestión",
    desc:"En Yucatán se le usa para 'los colores' (fiebre alta). También como remedio para los 'malos vientos' y los nervios. Crece en casi todos los solares yucatecos junto a la albahaca y la ruda.",
    ingredientes:["7-8 hojas de hierbabuena fresca","1 taza de agua caliente","Jugo de naranja agria (para fiebre)"],
    preparacion:"Para té: 1. Lavar las hojas. 2. Agregar a agua muy caliente (no hervida). 3. Tapar 5 minutos. 4. Tomar tibio.\nPara dolor de cabeza: 1. Machacar hojas frescas. 2. Aplicar en la frente y sienes con paño húmedo frío. 3. Dejar actuar 15 minutos.",
    dosis:"1 taza del té 3 veces al día para indigestión. Para fiebre, compresas frías en frente y nuca cada hora.",
    advertencia:"Evitar en bebés menores de 2 años. No aplicar aceite esencial directamente en la piel de niños.",
    origen:"Cultivada en los solares de Mérida, Halachó e Hunucmá.",
    audio:null, video:null
  },
  melipona:{
    nombre:"Miel de Abeja Melipona", maya:"Xunan Kab (Melipona beecheii)",
    color:"#c8920a", uso:"Tos · Catarros · Vista cansada · Heridas · Garganta",
    desc:"La miel sagrada de la abeja maya sin aguijón. Los mayas la ofrendaban a sus dioses y la usaban como medicina principal. Tiene propiedades antibacterianas únicas no encontradas en la miel de abeja europea. Hoy la Xunan Kab está en peligro de extinción.",
    ingredientes:["1-2 cucharadas de miel de Melipona pura","Agua tibia (para gargarismos)","Limón (opcional)"],
    preparacion:"Para garganta: 1. Tomar 1 cucharada directa 3 veces al día.\nPara ojos: 1. Diluir 1 gota de miel en 2 gotas de agua estéril. 2. Aplicar 1 gota en el ojo afectado 2 veces al día.\nPara tos: 1. Mezclar 1 cucharada con jugo de limón en agua tibia. 2. Tomar antes de dormir.",
    dosis:"1 cucharada 3 veces al día para uso general. Para los ojos solo 1-2 veces al día.",
    advertencia:"No dar a bebés menores de 1 año (riesgo de botulismo). Asegurarse de que la miel sea pura y de fuente confiable.",
    origen:"Apiarios tradicionales en Valladolid, Tizimín y Temozón. Apicultura maya milenaria.",
    audio:null, video:null
  }
};

function abrirRemedioModal(id) {
  const d = REMEDIOS_DATA[id]; if(!d) return;
  const modal = document.getElementById("remedioModal"); if(!modal) return;
  modal.querySelector(".rm-color-bar").style.background = d.color;
  modal.querySelector(".rm-nombre").textContent    = d.nombre;
  modal.querySelector(".rm-maya").textContent      = d.maya;
  modal.querySelector(".rm-uso").textContent       = d.uso;
  modal.querySelector(".rm-desc").textContent      = d.desc;
  modal.querySelector(".rm-ing-lista").innerHTML   = d.ingredientes.map(i=>`<li>${i}</li>`).join("");
  modal.querySelector(".rm-prep-txt").textContent  = d.preparacion;
  modal.querySelector(".rm-dosis-txt").textContent = d.dosis;
  modal.querySelector(".rm-adv-txt").textContent   = d.advertencia;
  modal.querySelector(".rm-origen-txt").textContent = d.origen;
  // Audio
  const audioWrap = modal.querySelector(".rm-audio-wrap");
  if(d.audio){ audioWrap.style.display="block"; audioWrap.querySelector("audio").src=d.audio; }
  else { audioWrap.style.display="none"; }
  // Video
  const videoWrap = modal.querySelector(".rm-video-wrap");
  if(d.video){ videoWrap.style.display="block"; videoWrap.querySelector("video").src=d.video; }
  else { videoWrap.style.display="none"; }
  modal.classList.add("abierto");
  document.body.style.overflow = "hidden";
}

// ── DATOS NEGOCIOS ────────────────────────────────────────────
const NEGOCIOS_DATA = {
  artesanias:{
    nombre:"Artesanías Mestizas Yucatán", cat:"Artesanías",
    color:"linear-gradient(135deg,#8B6914,#c8920a)",
    tipo:"Bordado · Hipil · Hamacas · Artesanía maya",
    desc:"Taller familiar con más de 20 años bordando hipiles y tejiendo hamacas. Trabajamos directamente con artesanas de Motul, Temax y Valladolid. Cada pieza es única, bordada a mano con diseños mayas tradicionales.",
    productos:[{n:"Hipil bordado a mano",p:"$350-$800"},{n:"Hamaca doble matrimonial",p:"$800-$1,200"},{n:"Bolsa tejida de henequén",p:"$180-$350"},{n:"Mantel bordado",p:"$250"}],
    ubicacion:"Mercado Lucas de Gálvez, Local 45 · Centro, Mérida",
    horario:"Lun — Sáb · 8:00 — 18:00",
    wa:"529999100001", telefono:"(999) 100-0001",
    tags:["Artesanías","Hipil","Hamacas","Maya"]
  },
  cocina:{
    nombre:"La Cocina de Doña Meche", cat:"Gastronomía",
    color:"linear-gradient(135deg,#1a5c35,#2d9e56)",
    tipo:"Comida yucateca · Servicio a domicilio",
    desc:"Recetas de familia yucateca con 30 años de tradición. Todo se prepara con ingredientes frescos del mercado local. La cochinita se hace en hoyo de tierra desde las 3 de la mañana, como se ha hecho siempre.",
    productos:[{n:"Paquete familiar cochinita (1kg)",p:"$280"},{n:"Relleno negro por kilo",p:"$220"},{n:"Papadzules (12 piezas)",p:"$150"},{n:"Sopa de lima (porción)",p:"$65"}],
    ubicacion:"Colonia García Ginerés · Mérida, Yucatán",
    horario:"Pedidos con 1 día de anticipación · Entrega a domicilio",
    wa:"529999100002", telefono:"(999) 100-0002",
    tags:["Gastronomía","Cochinita","Comida yucateca","Domicilio"]
  },
  digital:{
    nombre:"Diseño Yucateco Digital", cat:"Servicios",
    color:"linear-gradient(135deg,#1a3a6b,#2d6aad)",
    tipo:"Diseño gráfico · Redes sociales · Páginas web",
    desc:"Agencia de diseño fundada por jóvenes yucatecos. Ayudamos a emprendedores y negocios locales a construir su presencia digital con identidad yucateca. Logos, redes sociales, menús digitales y páginas web.",
    productos:[{n:"Logo profesional",p:"$800-$1,500"},{n:"Pack redes sociales (10 posts)",p:"$1,200"},{n:"Página web básica",p:"$3,500"},{n:"Menú digital QR",p:"$500"}],
    ubicacion:"Mérida, Yucatán · 100% Servicio en línea",
    horario:"Lun — Vie · 9:00 — 18:00 · Cotización sin costo",
    wa:"529999100003", telefono:"(999) 100-0003",
    tags:["Digital","Diseño","Web","Redes sociales"]
  },
  moda:{
    nombre:"Mestiza Moderna", cat:"Moda",
    color:"linear-gradient(135deg,#be185d,#ec4899)",
    tipo:"Ropa con identidad yucateca contemporánea",
    desc:"Línea de ropa que funde la identidad maya con la moda actual. Diseños inspirados en los bordados del hipil, los colores del carnaval yucateco y los patrones geométricos mayas. Orgullo de ser yucateco en cada prenda.",
    productos:[{n:"Playera maya print",p:"$290-$350"},{n:"Vestido bordado moderno",p:"$650-$900"},{n:"Accesorios mayas",p:"$120-$280"},{n:"Bolsa artesanal",p:"$200"}],
    ubicacion:"Paseo de Montejo · Mérida · También en línea",
    horario:"Lun — Sáb · 10:00 — 20:00 · Envíos a toda la Península",
    wa:"529999100004", telefono:"(999) 100-0004",
    tags:["Moda","Ropa","Maya","Artesanías"]
  },
  plantas:{
    nombre:"Plantas Medicinales Maya", cat:"Herbolaria",
    color:"linear-gradient(135deg,#047857,#10b981)",
    tipo:"Herbolaria · Remedios mayas · Miel Melipona",
    desc:"Tres generaciones de apicultura y herbolaria maya. Vendemos plantas medicinales, tés artesanales, miel de abeja Melipona pura y kits de remedios mayas. Todo cosechado en los solares y milpas de la Península.",
    productos:[{n:"Miel Melipona 250ml",p:"$180-$220"},{n:"Té de chaya natural",p:"$60"},{n:"Kit remedios mayas (5 plantas)",p:"$350"},{n:"Polen de Melipona",p:"$120"}],
    ubicacion:"Mercado de Santiago, Local 12 · Mérida",
    horario:"Lun — Dom · 7:00 — 14:00",
    wa:"529999100005", telefono:"(999) 100-0005",
    tags:["Herbolaria","Miel","Melipona","Remedios"]
  },
  constructora:{
    nombre:"Constructora Peninsular", cat:"Construcción",
    color:"linear-gradient(135deg,#92400e,#d97706)",
    tipo:"Construcción · Remodelación · Acabados coloniales",
    desc:"20 años construyendo y remodelando hogares yucatecos. Especialistas en fachadas con acabados de la arquitectura colonial y contemporánea de Yucatán. Usamos materiales locales y trabajamos con artesanos de la región.",
    productos:[{n:"Remodelación de cuarto",p:"Desde $15,000"},{n:"Fachada estilo colonial",p:"Desde $22,000"},{n:"Piso de pasta estilo yucateco",p:"Desde $80/m²"},{n:"Presupuesto gratuito",p:"$0"}],
    ubicacion:"Mérida y área metropolitana · Yucatán",
    horario:"Lun — Sáb · 8:00 — 17:00 · Presupuesto sin costo",
    wa:"529999100006", telefono:"(999) 100-0006",
    tags:["Construcción","Remodelación","Colonial","Arquitectura"]
  }
};

function abrirNegocioModal(id) {
  const d = NEGOCIOS_DATA[id]; if(!d) return;
  const modal = document.getElementById("negocioModal"); if(!modal) return;
  modal.querySelector(".nm-banner").style.background    = d.color;
  modal.querySelector(".nm-cat").textContent            = d.cat;
  modal.querySelector(".nm-nombre").textContent         = d.nombre;
  modal.querySelector(".nm-tipo").textContent           = d.tipo;
  modal.querySelector(".nm-desc").textContent           = d.desc;
  modal.querySelector(".nm-ubicacion").textContent      = d.ubicacion;
  modal.querySelector(".nm-horario").textContent        = d.horario;
  modal.querySelector(".nm-wa").href = `https://wa.me/${d.wa}?text=Hola,%20vi%20tu%20negocio%20en%20Mi%20Yucat%C3%A1n%20y%20me%20interesa%20saber%20m%C3%A1s`;
  modal.querySelector(".nm-tel").textContent            = d.telefono;
  modal.querySelector(".nm-productos").innerHTML = d.productos.map(p=>`<div class="nm-prod-row"><span>${p.n}</span><strong>${p.p}</strong></div>`).join("");
  modal.querySelector(".nm-tags").innerHTML = d.tags.map(t=>`<span class="nm-tag">${t}</span>`).join("");
  modal.classList.add("abierto");
  document.body.style.overflow = "hidden";
}