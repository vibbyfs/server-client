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
  if (lock) {
    // When locking is needed, we need to fetch participants first, then users separately
    // to avoid the FOR UPDATE + LEFT JOIN issue
    const participants = await RoomParticipant.findAll({
      where: { roomId, hasWon: false },
      order: [['joinedAt', 'ASC']],
      transaction: tx,
      lock: tx.LOCK.UPDATE
    });

    // Then fetch user data for each participant
    const result = [];
    for (const participant of participants) {
      const user = await User.findByPk(participant.userId, { 
        attributes: ['id', 'name'],
        transaction: tx 
      });
      result.push({
        ...participant.toJSON(),
        user: user ? user.toJSON() : null
      });
    }
    return result;
  } else {
    // Normal query without locking
    return RoomParticipant.findAll({
      where: { roomId, hasWon: false },
      include: [{ model: User, attributes: ['id','name'] }],
      order: [['joinedAt', 'ASC']],
      transaction: tx
    });
  }
}

async function joinRoom(roomId, userId) {
  return RoomParticipant.create({ roomId, userId, hasWon: false, joinedAt: new Date() });
}

async function markWon(row, tx) {
  if (typeof row.save === 'function') {
    // Direct Sequelize instance
    row.hasWon = true;
    await row.save({ transaction: tx });
  } else {
    // Plain object from our custom query - update by ID
    await RoomParticipant.update(
      { hasWon: true },
      { 
        where: { id: row.id },
        transaction: tx 
      }
    );
  }
}

module.exports = { countByRoom, getParticipants, getEligible, joinRoom, markWon };
