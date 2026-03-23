# 🚀 GUÍA RÁPIDA - Configurar Luxecita en 5 Minutos

## ⚡ Paso a Paso

### 1. Sube a GitHub

```bash
# Inicializa Git (si no lo has hecho)
git init
git add .
git commit -m "Luxecita v3.0 - Versión segura con backend"

# Crea un repositorio en GitHub y luego:
git remote add origin https://github.com/TU_USUARIO/luxecita.git
git push -u origin main
```

### 2. Despliega en Vercel

1. Ve a **https://vercel.com**
2. Click en **"Add New Project"**
3. **Importa tu repositorio** de GitHub
4. Click en **"Deploy"** (no configures nada aún)

### 3. Agrega las Variables de Entorno

1. En Vercel, ve a tu proyecto → **Settings** → **Environment Variables**
2. Agrega estas variables una por una:

```
ANTHROPIC_API_KEY = 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

ANTHROPIC_MODEL = claude-haiku-4-5-20251001

MAX_TOKENS = 400

ELEVENLABS_API_KEY = 5ab9795b637003b8c824e108cb8bf040e2dc1189cbd1bcf339035e162c0b65bc

ELEVENLABS_VOICE_ID = ajOR9IDAaubDK5qtLUqQ

SYSTEM_PROMPT = Eres Luxecita, la asistente virtual oficial de la CNOP Yucatán. Eres una joven yucateca: alegre, cálida, conversadora y orgullosa de su tierra. Hablas en español mexicano con sabor yucateco. Usas emojis con moderación. Respuestas claras y naturales, máximo 3-4 párrafos. Nunca uses formato de lista con viñetas o guiones — escribe como si hablaras, fluido y cercano.
```

3. Click en **"Save"** para cada variable

### 4. Re-despliega

1. Ve a **Deployments**
2. Click en los **3 puntos** del deployment más reciente
3. Click en **"Redeploy"**

### 5. ¡Listo! 🎉

Tu Luxecita estará disponible en:
```
https://tu-proyecto.vercel.app
```

---

## 🔧 Actualizaciones Futuras

Cada vez que hagas cambios en tu código:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

Vercel **se actualiza automáticamente** 🚀

---

## ⚠️ IMPORTANTE

- ✅ Las claves ya están incluidas arriba (son las que tenías en el código)
- ✅ Estas claves SOLO están en Vercel, NO en GitHub
- ✅ Si quieres cambiarlas después, hazlo en Vercel → Settings → Environment Variables
- ✅ Después de cambiar variables, siempre haz "Redeploy"

---

## 📞 Soporte

Si algo falla:
1. Revisa la consola del navegador (F12)
2. Revisa los logs en Vercel → tu proyecto → Functions
3. Contacta: cnop.yucatanoficial@gmail.com
