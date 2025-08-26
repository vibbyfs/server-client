const axios = require('axios');
const config = require('../config');

async function generateAI(text) {
  if (!config.useAI || !config.llm.baseUrl || !config.llm.apiKey) {
    return 'Fakta seru: tetap semangat dan main adil!';
  }
  const body = {
    model: config.llm.model,
    input: [
      { role: 'system', content: 'Kamu Arisan Bot yang ramah, ringkas, hindari klaim soal hasil undian. Tawarkan cek fun facts jika relevan. Maks 120 kata.' },
      { role: 'user', content: String(text).slice(0, 4000) }
    ],
    temperature: 0.7,
    max_output_tokens: 200
  };
  try {
    const resp = await axios.post(config.llm.baseUrl, body, {
      headers: {
        'Authorization': `Bearer ${config.llm.apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    const data = resp.data || {};
    if (typeof data.output_text === 'string' && data.output_text.trim()) return data.output_text.trim();
    const o = data.output || data.outputs || [];
    if (Array.isArray(o) && o[0]?.content?.[0]?.text) return String(o[0].content[0].text).trim();
    return 'Oke!';
  } catch {
    return 'Bot lagi sibuk, coba lagi sebentar ya.';
  }
}

module.exports = { generateAI };
