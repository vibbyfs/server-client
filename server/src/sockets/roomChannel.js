const { Room, RoomParticipant } = require('../db/models');
const { getParticipants } = require('../repositories/participantRepo');
const { listWinners } = require('../repositories/winnerRepo');
const { bumpReaction, recentStats } = require('../repositories/reactionRepo');
const { drawWinner } = require('../services/drawService');

const reactionWindows = new Map();

function trackConcurrent(roomId) {
  const now = Date.now();
  const arr = reactionWindows.get(roomId) || [];
  const pruned = arr.filter(ts => now - ts <= 2000);
  pruned.push(now);
  reactionWindows.set(roomId, pruned);
  return pruned.length;
}

async function emitRoomState(io, roomId) {
  const room = await Room.findByPk(roomId);
  if (!room) return;
  const participants = await getParticipants(roomId);
  const winners = await listWinners(roomId);
  const stats = await recentStats(roomId, 7);
  io.to('room:'+roomId).emit('room:state', { room, participants, winners, reactionStats: stats });
}

module.exports = function(io, socket) {
  socket.on('room:join', async ({ roomId }) => {
    try {
      const rp = await RoomParticipant.findOne({ where: { roomId, userId: socket.user.id } });
      const room = await Room.findByPk(roomId);
      if (!rp || !room) return socket.emit('error', { message: 'Not a participant or room not found' });
      socket.join('room:'+roomId);
      await emitRoomState(io, roomId);
    } catch (e) {
      socket.emit('error', { message: 'Failed to join room' });
    }
  });

  socket.on('room:view', async ({ roomId }) => {
    try {
      const room = await Room.findByPk(roomId);
      if (!room || !room.allowSpectator) return socket.emit('error', { message: 'Spectator not allowed' });
      socket.join('room:'+roomId);
      await emitRoomState(io, roomId);
    } catch (e) {
      socket.emit('error', { message: 'Failed to view room' });
    }
  });

  socket.on('draw:start', async ({ roomId }) => {
    try {
      const room = await Room.findByPk(roomId);
      if (!room) return;
      if (room.adminId !== socket.user.id) return socket.emit('error', { message: 'Only host can draw' });
      if (room.status === 'complete') return socket.emit('error', { message: 'Room complete' });

      io.to('room:'+roomId).emit('draw:begin');

      const result = await drawWinner(roomId);
      if (result.winner) {
        io.to('room:'+roomId).emit('draw:result', { winner: result.winner, at: new Date().toISOString() });
      }
      await emitRoomState(io, roomId);
    } catch (e) {
      socket.emit('error', { message: 'Failed to draw' });
    }
  });

  socket.on('reaction:send', async ({ roomId, emoji }) => {
    try {
      const whitelist = ['🔥','🎉','👏'];
      if (!whitelist.includes(emoji)) return;

      const key = 'react:' + socket.user.id;
      socket.data[key] = (socket.data[key] || []).filter(ts => Date.now() - ts <= 10000);
      if (socket.data[key].length >= 5) return;
      socket.data[key].push(Date.now());

      const concurrent = trackConcurrent(roomId);
      io.to('room:'+roomId).emit('reaction:new', { emoji, at: Date.now(), userId: socket.user.id });
      await bumpReaction(roomId, concurrent);
    } catch (e) {}
  });
};
