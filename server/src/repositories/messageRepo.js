const { Message, User } = require('../db/models');
const { Op } = require('sequelize');

async function addUserMessage(roomId, userId, content) {
  return Message.create({ roomId, userId, role: 'user', content });
}
async function addAssistantMessage(roomId, content) {
  return Message.create({ roomId, userId: null, role: 'assistant', content });
}
async function listMessages(roomId, cursorISO, limit = 30) {
  const where = { roomId };
  if (cursorISO) where.createdAt = { [Op.lt]: new Date(cursorISO) };
  const rows = await Message.findAll({ where, order: [['createdAt', 'DESC']], limit });
  const result = [];
  for (const m of rows) {
    const u = m.userId ? await User.findByPk(m.userId) : null;
    result.push({
      id: m.id,
      role: m.role,
      content: m.content,
      createdAt: m.createdAt,
      user: u ? { id: u.id, name: u.name } : { id: null, name: 'Arisan Bot' }
    });
  }
  const nextCursor = rows.length ? rows[rows.length - 1].createdAt : null;
  return { messages: result.reverse(), nextCursor };
}

module.exports = { addUserMessage, addAssistantMessage, listMessages };
