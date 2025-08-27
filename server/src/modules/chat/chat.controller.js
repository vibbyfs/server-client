const { listMessages } = require('../../repositories/messageRepo');
const { handleChatAssistant } = require('../../services/aiService');

async function getMessages(req, res) {
  try {
    const roomId = +req.params.id;
    const { cursor, limit } = req.query;
    const data = await listMessages(roomId, cursor || null, limit);
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: 'Failed' });
  }
}

// Enhanced chat with AI assistant
async function processAIMessage(message, userName) {
  try {
    // Check if message triggers AI
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.startsWith('/ai ') || lowerMsg.includes('@bot')) {
      const cleanMessage = message.replace(/^\/ai\s+/i, '').replace(/@bot\s*/gi, '').trim();
      return await handleChatAssistant(cleanMessage, userName);
    }
    return null;
  } catch (error) {
    console.error('AI processing error:', error);
    return 'Maaf, bot sedang bermasalah. Coba lagi nanti ya! 🤖';
  }
}

module.exports = { 
  getMessages,
  processAIMessage
};
