export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Mensajes inválidos' });
    }

    // 🔥 TRANSFORMAR MENSAJES AL FORMATO CORRECTO
    const formattedMessages = messages.map(m => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: [
        {
          type: "text",
          text: m.content
        }
      ]
    }));

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL,
        max_tokens: 600,
        system: process.env.SYSTEM_PROMPT,
        messages: formattedMessages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error de Anthropic:', data);
      return res.status(500).json({ error: data });
    }

    // 🔥 DEVOLVER SOLO LO QUE NECESITA EL FRONTEND
    res.status(200).json({
      content: data.content
    });

  } catch (error) {
    console.error('Error del servidor:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: error.message 
    });
  }
}
