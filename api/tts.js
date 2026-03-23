/* ============================================================
   API PROXY PARA ELEVENLABS (Text-to-Speech)
   Protege la API Key de ElevenLabs
   ============================================================ */

export default async function handler(req, res) {
  // Solo acepta peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { text } = req.body;

    // Validar que se envíe texto
    if (!text) {
      return res.status(400).json({ error: 'Texto requerido' });
    }

    const voiceId = process.env.ELEVENLABS_VOICE_ID;
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!voiceId || !apiKey) {
      return res.status(500).json({ error: 'Configuración de voz no disponible' });
    }

    // Llamar a ElevenLabs desde el servidor
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.5,
            use_speaker_boost: true
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Error de ElevenLabs:', error);
      return res.status(response.status).json({ 
        error: 'Error al generar audio',
        details: error 
      });
    }

    // Devolver el audio como blob
    const audioBuffer = await response.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString('base64');
    
    res.status(200).json({ 
      audio: `data:audio/mpeg;base64,${base64Audio}` 
    });

  } catch (error) {
    console.error('Error del servidor:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: error.message 
    });
  }
}
