export default async function handler(req, res) {

// Solo POST
if (req.method !== 'POST') {
return res.status(405).json({ error: 'Método no permitido' });
}

try {
const { messages } = req.body;

```
if (!messages || !Array.isArray(messages)) {
  return res.status(400).json({ error: 'Mensajes inválidos' });
}

// 🔥 MODELO CORREGIDO
const model = process.env.ANTHROPIC_MODEL || 'claude-3-haiku-20240307';

console.log("🧠 Usando modelo:", model);

const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01'
  },
  body: JSON.stringify({
    model: model,
    max_tokens: parseInt(process.env.MAX_TOKENS) || 400,
    system: process.env.SYSTEM_PROMPT || '',
    messages: messages
  })
});

// 🔴 ERROR DE API
if (!response.ok) {
  const errorText = await response.text();
  console.error('❌ Error de Anthropic:', errorText);

  return res.status(response.status).json({
    error: 'Error al procesar la solicitud',
    details: errorText
  });
}

const data = await response.json();

// ✅ RESPUESTA OK
return res.status(200).json(data);
```

} catch (error) {
console.error('❌ Error del servidor:', error);

```
return res.status(500).json({
  error: 'Error interno del servidor',
  message: error.message
});
```

}
}

