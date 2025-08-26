const crypto = require('crypto');
const { sequelize, User, Room, RoomParticipant } = require('../db/models');
const { getEligible, markWon } = require('../repositories/participantRepo');
const { createWinner } = require('../repositories/winnerRepo');

async function drawWinner(roomId) {
  return sequelize.transaction(async (tx) => {
    const room = await Room.findByPk(roomId, { transaction: tx, lock: tx.LOCK.UPDATE });
    if (!room) throw new Error('Room not found');
    if (room.status === 'complete') return { winner: null, complete: true };

    const eligible = await getEligible(roomId, tx, true);
    if (!eligible.length) {
      room.status = 'complete';
      await room.save({ transaction: tx });
      return { winner: null, complete: true };
    }

    const index = crypto.randomInt(eligible.length);
    const picked = eligible[index];
    await markWon(picked, tx);
    const w = await createWinner(roomId, picked.userId, tx);

    const remaining = await RoomParticipant.count({ where: { roomId, hasWon: false }, transaction: tx });
    if (remaining === 0) {
      room.status = 'complete';
      await room.save({ transaction: tx });
    }

    const user = await User.findByPk(picked.userId, { transaction: tx });
    return { winner: { id: user.id, name: user.name, winnerId: w.id }, complete: remaining === 0 };
  });
}

module.exports = { drawWinner };
