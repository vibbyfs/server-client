const { ShareStat, Winner } = require('../db/models');

async function addShare(winnerId, theme = 'classic') {
  const w = await Winner.findByPk(winnerId);
  if (!w) throw new Error('Winner not found');
  let stat = await ShareStat.findOne({ where: { roomId: w.roomId, winnerId, theme } });
  if (!stat) stat = await ShareStat.create({ roomId: w.roomId, winnerId, theme, count: 0 });
  stat.count += 1;
  await stat.save();
  return stat.count;
}

module.exports = { addShare };
