const { RoomParticipant, User } = require('../db/models');

async function countByRoom(roomId) {
  return RoomParticipant.count({ where: { roomId } });
}

async function getParticipants(roomId) {
  const rows = await RoomParticipant.findAll({
    where: { roomId },
    include: [{ model: User, attributes: ['id','name'] }],
    order: [['joinedAt', 'ASC']]
  });
  return rows.map(p => ({ id: p.user.id, name: p.user.name, hasWon: p.hasWon }));
}

async function getEligible(roomId, tx, lock = false) {
  return RoomParticipant.findAll({
    where: { roomId, hasWon: false },
    include: [{ model: User, attributes: ['id','name'] }],
    order: [['joinedAt', 'ASC']],
    transaction: tx,
    lock: lock ? tx.LOCK.UPDATE : undefined
  });
}

async function joinRoom(roomId, userId) {
  return RoomParticipant.create({ roomId, userId, hasWon: false, joinedAt: new Date() });
}

async function markWon(row, tx) {
  row.hasWon = true;
  await row.save({ transaction: tx });
}

module.exports = { countByRoom, getParticipants, getEligible, joinRoom, markWon };
