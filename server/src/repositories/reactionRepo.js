const { ReactionStat } = require('../db/models');
const dayjs = require('dayjs');

async function bumpReaction(roomId, concurrent) {
  const today = dayjs().format('YYYY-MM-DD');
  let stat = await ReactionStat.findOne({ where: { roomId, sessionDate: today } });
  if (!stat) stat = await ReactionStat.create({ roomId, sessionDate: today, count: 0, peakConcurrent: 0 });
  stat.count += 1;
  if (concurrent > stat.peakConcurrent) stat.peakConcurrent = concurrent;
  await stat.save();
  return stat;
}

async function recentStats(roomId, limit = 7) {
  const rows = await ReactionStat.findAll({ where: { roomId }, order: [['sessionDate','DESC']], limit });
  return rows;
}

module.exports = { bumpReaction, recentStats };
