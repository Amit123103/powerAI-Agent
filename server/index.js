import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Allow all origins for hosted frontend compatibility
app.use(express.json());

const isNvidiaKey = process.env.OPENAI_API_KEY?.startsWith('nvapi-');
console.log('Production mode enabled - NVIDIA NIM detected:', isNvidiaKey);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: isNvidiaKey ? "https://integrate.api.nvidia.com/v1" : undefined,
});

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  console.log('Incoming request messages count:', messages.length);

  // Add system instruction for concise answers
  const systemMessage = {
    role: "system",
    content: "You are a direct and concise AI assistant. Provide exactly the information requested without any introductory remarks, conversational filler, or unnecessary concluding segments. Keep your answers as brief as possible while remaining perfectly accurate and helpful. Use Markdown only when it significantly improves clarity."
  };

  try {
    const response = await openai.chat.completions.create({
      model: isNvidiaKey ? "meta/llama-3.1-405b-instruct" : "gpt-4o",
      messages: [systemMessage, ...messages],
      temperature: 0.5,
      top_p: 1,
      max_tokens: 2048, // Increased for longer structured answers
    });

    res.json(response);
  } catch (error) {
    console.error('OpenAI API Error Details:', error);
    res.status(500).json({ 
      error: 'Failed to fetch response from OpenAI',
      details: error.message 
    });
  }
});

app.post('/api/tts', async (req, res) => {
  const { text } = req.body;

  try {
    if (isNvidiaKey) {
      return res.status(400).json({ 
        error: 'NVIDIA keys do not support OpenAI TTS',
        details: 'The provided API key is for NVIDIA NIM, which does not have a compatible TTS endpoint on api.openai.com. Falling back to browser speech synthesis.'
      });
    }

    const ttsClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const mp3 = await ttsClient.audio.speech.create({
      model: "tts-1",
      voice: "alloy", // Other options: echo, fable, onyx, nova, shimmer
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    res.set('Content-Type', 'audio/mpeg');
    res.send(buffer);
  } catch (error) {
    console.error('OpenAI TTS Error:', error);
    res.status(500).json({ error: 'Failed to generate speech' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
