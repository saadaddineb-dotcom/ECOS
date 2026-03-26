require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not set in .env file');
  process.exit(1);
}

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Backend API endpoint for Gemini calls
app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt, history = [], maxTokens = 1200, systemInstruction = '' } = req.body;

    let finalPrompt = prompt;
    if (systemInstruction) {
      finalPrompt = `${systemInstruction}\n\n${prompt}`;
    }

    const body = {
      contents: [
        ...history,
        { role: 'user', parts: [{ text: finalPrompt }] }
      ],
      generationConfig: { maxOutputTokens: maxTokens, temperature: 0.7 }
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ 
        error: error.error?.message || response.statusText 
      });
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    res.json({ text });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 SimuClinik running on http://localhost:${PORT}`);
});
