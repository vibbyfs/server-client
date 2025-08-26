const { listRooms, findRoomById } = require('../../repositories/roomRepo');
const { countByRoom, getParticipants, joinRoom } = require('../../repositories/participantRepo');
const { listWinners } = require('../../repositories/winnerRepo');
const { Op } = require('sequelize');

async function getRooms(req, res) {
  try {
    const { sort, order, ...filters } = req.query;
    const data = await listRooms(filters, [sort, (order || 'DESC').toUpperCase()]);
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: 'Failed to load rooms' });
  }
}

async function postJoin(req, res) {
  try {
    const roomId = +req.params.id;
    const room = await findRoomById(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    const { RoomParticipant } = require('../../db/models');
    const already = await RoomParticipant.findOne({ where: { roomId, userId: req.user.id } });
    if (already) return res.json({ message: 'Already joined' });

    const count = await countByRoom(roomId);
    if (count >= room.capacity) return res.status(400).json({ message: 'Room is full' });

    await joinRoom(roomId, req.user.id);

    if (!room.adminId) { room.adminId = req.user.id; await room.save(); }

    const newCount = await countByRoom(roomId);
    if (newCount >= room.capacity && room.status === 'waiting') { room.status = 'ongoing'; await room.save(); }

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: 'Join failed' });
  }
}

async function getParticipantsRoute(req, res) {
  try {
    const roomId = +req.params.id;
    const list = await getParticipants(roomId);
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: 'Failed' });
  }
}

async function getWinnersRoute(req, res) {
  try {
    const roomId = +req.params.id;
    const list = await listWinners(roomId);
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: 'Failed' });
  }
}

async function getFunfacts(req, res) {
  try {
    const roomId = +req.params.id;
    const { Room, RoomParticipant } = require('../../db/models');
    const room = await Room.findByPk(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    const total = await RoomParticipant.count({ where: { roomId } });
    const eligible = await RoomParticipant.count({ where: { roomId, hasWon: false } });
    const prob = eligible ? (1/eligible) : 0;
    const remainingSeats = Math.max(0, room.capacity - total);
    const { Op } = require('sequelize');
    const joinedToday = await RoomParticipant.count({
      where: { roomId, joinedAt: { [Op.gte]: new Date(Date.now() - 24*3600*1000) } }
    });

    const fallbackLines = [
      `📊 Ada ${eligible} peserta yang belum menang.`,
      `🎯 Peluang tiap peserta: ${(prob*100).toFixed(2)}%.`,
      `💺 Sisa kursi: ${remainingSeats}.`,
      `🗓️ Bergabung hari ini: ${joinedToday}.`,
      `ℹ️ Tenor: ${room.tenorRounds} putaran, frekuensi undian: ${room.drawFrequencyValue} ${room.drawFrequencyUnit}.`
    ];

    if (require('../../config').useAI) {
      const prompt = `Buat narasi fun facts singkat untuk arisan berikut:
Nama room: ${room.name}
Peserta total: ${total}
Belum menang: ${eligible}
Peluang tiap peserta: ${(prob*100).toFixed(2)}%
Sisa kursi: ${remainingSeats}
Bergabung hari ini: ${joinedToday}
Tenor: ${room.tenorRounds} putaran, frekuensi: ${room.drawFrequencyValue} ${room.drawFrequencyUnit}.`;
      const { generateAI } = require('../../services/aiService');
      const narrative = await generateAI(prompt);
      return res.json({ narrative, lines: fallbackLines });
    }
    res.json({ narrative: fallbackLines.join(' '), lines: fallbackLines });
  } catch (e) {
    res.status(500).json({ message: 'Failed' });
  }
}

module.exports = { getRooms, postJoin, getParticipantsRoute, getWinnersRoute, getFunfacts };
