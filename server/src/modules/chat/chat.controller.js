const { listMessages } = require('../../repositories/messageRepo');

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

module.exports = { getMessages };
