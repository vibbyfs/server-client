const { Room, RoomParticipant } = require('../db/models');
const { Op } = require('sequelize');

async function listRooms(filters = {}, orderBy = ['createdAt','DESC']) {
  const where = {};
  if (filters.status) where.status = filters.status;
  if (filters.freqUnit) where.drawFrequencyUnit = filters.freqUnit;
  if (filters.freqValue) where.drawFrequencyValue = filters.freqValue;
  if (filters.tenorMin || filters.tenorMax) {
    where.tenorRounds = {};
    if (filters.tenorMin) where.tenorRounds[Op.gte] = +filters.tenorMin;
    if (filters.tenorMax) where.tenorRounds[Op.lte] = +filters.tenorMax;
  }
  if (filters.minDues || filters.maxDues) {
    where.dues = {};
    if (filters.minDues) where.dues[Op.gte] = +filters.minDues;
    if (filters.maxDues) where.dues[Op.lte] = +filters.maxDues;
  }
  const rooms = await Room.findAll({ where, order: [orderBy], include: [RoomParticipant] });
  return rooms.map(r => ({
    id: r.id,
    name: r.name,
    capacity: r.capacity,
    status: r.status,
    dues: r.dues,
    drawFrequencyValue: r.drawFrequencyValue,
    drawFrequencyUnit: r.drawFrequencyUnit,
    tenorRounds: r.tenorRounds,
    startAt: r.startAt,
    allowSpectator: r.allowSpectator,
    adminId: r.adminId,
    count: r.roomParticipants.length,
    createdAt: r.createdAt
  }));
}

async function findRoomById(id) {
  return Room.findByPk(id);
}

module.exports = { listRooms, findRoomById };
