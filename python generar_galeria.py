"""
GENERADOR DE GALERÍA — CNOP Yucatán
====================================
Coloca este archivo en la carpeta raíz de tu proyecto
(junto a multimedia.html y la carpeta FOTOS/)
y ejecuta:  python generar_galeria.py

El script lee TODAS las fotos de FOTOS/ y actualiza
la galería en multimedia.html automáticamente.
"""

import os
import re

# ── Configuración ────────────────────────────────────────────
FOTOS_DIR   = "FOTOS"           # carpeta con las fotos
HTML_FILE   = "multimedia.html" # archivo a actualizar
EXTENSIONES = (".jpg", ".jpeg", ".png", ".webp", ".gif")

# Palabras clave para asignar categoría automáticamente
CATEGORIAS = {
    "femenil":      ["femenil","mujer","mujeres","rosa","ff "],
    "juventud":     ["joven","jovenes","rjp","juventud","jp "],
    "eventos":      ["evento","aniversario","diplomado","foro","asamblea","reunion","acto"],
    "actividades":  ["jornada","brigada","taller","salud","capacitacion","actividad"],
    "institucional":["cnop","logo","secretario","presidente","directiva","sede"],
}

def asignar_categoria(nombre):
    n = nombre.lower()
    for cat, palabras in CATEGORIAS.items():
        for p in palabras:
            if p in n:
                return cat
    return "institucional"  # categoría por defecto

def nombre_a_caption(nombre):
    # quita extensión, reemplaza guiones/underscores por espacios, capitaliza
    sin_ext = os.path.splitext(nombre)[0]
    caption = sin_ext.replace("_", " ").replace("-", " ")
    return " ".join(w.capitalize() for w in caption.split())

def cat_a_label(cat):
    labels = {
        "femenil":      "Frente Femenil",
        "juventud":     "Juventud",
        "eventos":      "Eventos",
        "actividades":  "Actividades",
        "institucional":"Institucional",
    }
    return labels.get(cat, "Institucional")

# ── Leer fotos ───────────────────────────────────────────────
if not os.path.isdir(FOTOS_DIR):
    print(f"❌ No encontré la carpeta '{FOTOS_DIR}'. Revisa que estés en la carpeta correcta.")
    exit(1)

fotos = sorted([
    f for f in os.listdir(FOTOS_DIR)
    if f.lower().endswith(EXTENSIONES)
    and not f.startswith(".")
])

if not fotos:
    print(f"❌ No hay fotos en '{FOTOS_DIR}'.")
    exit(1)

print(f"✅ Encontré {len(fotos)} fotos en '{FOTOS_DIR}/'")

# ── Generar HTML ─────────────────────────────────────────────
bloques = []
for f in fotos:
    cat     = asignar_categoria(f)
    caption = nombre_a_caption(f)
    label   = cat_a_label(cat)
    bloque  = (
        f'          <div class="foto-item" data-cat="{cat}" data-cap="{caption}">\n'
        f'            <img src="FOTOS/{f}" alt="{caption}" loading="lazy">\n'
        f'            <div class="foto-item-overlay"></div>\n'
        f'            <div class="foto-item-cat-badge">{label}</div>\n'
        f'            <div class="foto-item-caption">{caption}</div>\n'
        f'          </div>'
    )
    bloques.append(bloque)

galeria_html = "\n".join(bloques)

# ── Actualizar multimedia.html ───────────────────────────────
if not os.path.isfile(HTML_FILE):
    print(f"❌ No encontré '{HTML_FILE}'. Revisa que estés en la carpeta correcta.")
    exit(1)

with open(HTML_FILE, "r", encoding="utf-8") as fh:
    contenido = fh.read()

# Buscar el bloque entre los marcadores
marcador_inicio = '<!-- ══ INICIO FOTOS GENERADAS AUTOMÁTICAMENTE ══ -->'
marcador_fin    = '<!-- ══ FIN FOTOS GENERADAS AUTOMÁTICAMENTE ══ -->'

nuevo_bloque = (
    marcador_inicio + "\n" +
    galeria_html + "\n          " +
    marcador_fin
)

if marcador_inicio in contenido:
    # Ya existen marcadores → reemplazar contenido entre ellos
    patron  = re.escape(marcador_inicio) + r".*?" + re.escape(marcador_fin)
    nuevo   = re.sub(patron, nuevo_bloque, contenido, flags=re.DOTALL)
    accion  = "actualizada"
else:
    # Primera vez → insertar antes del comentario de plantilla
    objetivo = "          <!--\n          ══════════════════════════════════════════\n          PLANTILLA PARA AGREGAR MÁS FOTOS:"
    if objetivo in contenido:
        nuevo = contenido.replace(objetivo, nuevo_bloque + "\n\n" + objetivo)
    else:
        # Fallback: insertar al inicio del masonry
        nuevo = contenido.replace(
            '<div class="foto-masonry" id="fotoMasonry">',
            '<div class="foto-masonry" id="fotoMasonry">\n\n' + nuevo_bloque
        )
    accion = "generada"

with open(HTML_FILE, "w", encoding="utf-8") as fh:
    fh.write(nuevo)

# ── Resumen ──────────────────────────────────────────────────
print(f"\n🎉 Galería {accion} con {len(fotos)} fotos en '{HTML_FILE}'")
print("\nCategorías asignadas:")
from collections import Counter
cats = Counter(asignar_categoria(f) for f in fotos)
for cat, n in sorted(cats.items()):
    print(f"  {cat_a_label(cat):20} {n} fotos")
print("\nAbre multimedia.html en tu navegador para ver el resultado.")
print("Corre este script cada vez que agregues fotos nuevas a FOTOS/")