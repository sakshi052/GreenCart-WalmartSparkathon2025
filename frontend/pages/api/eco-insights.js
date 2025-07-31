// pages/api/eco-insights.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, category, ecoScore } = req.body;

  try {
    const prompt = `
You are an eco-assistant. Respond only in valid JSON format.

Product:
- Name: ${name}
- Category: ${category}
- Eco Score: ${ecoScore}

Respond with:
{
  "carbonFootprint": "...",
  "disposal": "...",
  "plusPoints": "..."
}
    `.trim();

    const chat = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
    });

    const raw = chat.choices[0].message.content;
    console.log('🧠 AI raw output:', raw);

    // try to safely extract JSON block
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in AI output.');

    const data = JSON.parse(jsonMatch[0]);
    res.status(200).json(data);
  } catch (err) {
    console.error('❌ OpenAI error:', err.message);
    res.status(500).json({ error: 'No insights available for this product.' });
  }
}
