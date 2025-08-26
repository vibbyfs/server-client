require('dotenv').config();

module.exports = {
  port: parseInt(process.env.PORT || '3000', 10),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET || 'supersecret',
  dbUrl: process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/arisan',
  useAI: process.env.USE_AI === '1',
  llm: {
    baseUrl: process.env.LLM_BASE_URL || '',
    apiKey: process.env.LLM_API_KEY || '',
    model: process.env.LLM_MODEL || 'chat-gpt-5-mini'
  }
};
