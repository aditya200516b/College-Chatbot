// Small proxy so your API key never reaches the browser.
import express from 'express';

const app = express();
app.use(express.json({ limit: '2mb' }));

app.post('/api/chat', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is missing in your .env file' });
  }
  try {
    const headers = {
      'content-type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    };

    if (req.body && Array.isArray(req.body.tools) && req.body.tools.length > 0) {
      headers['anthropic-beta'] = process.env.ANTHROPIC_BETA || 'web-search-2025-03-05';
    }

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers,
      body: JSON.stringify(req.body)
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.listen(3001, () => console.log('API proxy running on http://localhost:3001'));
