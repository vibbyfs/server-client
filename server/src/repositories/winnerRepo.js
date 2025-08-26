const { Winner, User } = require('../db/models');

async function createWinner(roomId, userId, tx) {
  return Winner.create({ roomId, userId }, { transaction: tx });
}

async function listWinners(roomId) {
  const rows = await Winner.findAll({
    where: { roomId },
    include: [{ model: User, attributes: ['id','name'] }],
    order: [['createdAt', 'ASC']]
  });
  return rows.map(w => ({ id: w.user.id, name: w.user.name, at: w.createdAt, winnerId: w.id }));
}

module.exports = { createWinner, listWinners };
