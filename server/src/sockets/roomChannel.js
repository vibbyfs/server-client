const { Room, RoomParticipant } = require('../db/models');
const { getParticipants } = require('../repositories/participantRepo');
const { listWinners } = require('../repositories/winnerRepo');
const { bumpReaction, recentStats } = require('../repositories/reactionRepo');
const { drawWinner } = require('../services/drawService');
const { addUserMessage, addAssistantMessage } = require('../repositories/messageRepo');
const { generateAI } = require('../services/aiService');

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

  socket.on('chat:send', async ({ roomId, content }) => {
    try {
      if (typeof content !== 'string') return;
      const trimmed = content.trim();
      if (!trimmed || trimmed.length > 1000) return;
      const rp = await RoomParticipant.findOne({ where: { roomId, userId: socket.user.id } });
      if (!rp) return socket.emit('error', { message: 'Spectators cannot chat' });

      const msg = await addUserMessage(roomId, socket.user.id, trimmed);
      io.to('room:'+roomId).emit('chat:new', {
        id: msg.id, role: 'user', content: msg.content, createdAt: msg.createdAt, user: { id: socket.user.id, name: socket.user.name }
      });

      const triggers = trimmed.startsWith('/ai') || /(^|\s)@bot(\s|$)/i.test(trimmed);
      if (triggers) {
        const aiText = trimmed.replace(/^\/ai\s*/i, '');
        const { listMessages } = require('../repositories/messageRepo');
        const lastMsgs = await listMessages(roomId, null, 15);
        const lines = ['Room: ' + (await Room.findByPk(roomId)).name, 'Catatan: Bot hanya obrolan, tidak memengaruhi undian.'];
        lastMsgs.messages.forEach(m => lines.push(`${m.user?.name || 'Bot'}: ${m.content}`));
        lines.push(`${socket.user.name}: ${aiText}`);
        const reply = await generateAI(lines.join('\n'));
        const botMsg = await addAssistantMessage(roomId, reply);
        io.to('room:'+roomId).emit('chat:new', {
          id: botMsg.id, role: 'assistant', content: reply, createdAt: botMsg.createdAt, user: { id: null, name: 'Arisan Bot' }
        });
      }
    } catch (e) {}
  });

  socket.on('chat:typing', ({ roomId }) => {
    io.to('room:'+roomId).emit('chat:typing', { userId: socket.user.id, at: Date.now() });
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
