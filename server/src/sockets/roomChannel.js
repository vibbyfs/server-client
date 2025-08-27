const { Room, RoomParticipant } = require('../db/models');
const { getParticipants } = require('../repositories/participantRepo');
const { listWinners } = require('../repositories/winnerRepo');
const { bumpReaction, recentStats } = require('../repositories/reactionRepo');
const { drawWinner } = require('../services/drawService');
const { generateWelcomeMessage, processAIMessage } = require('../services/aiService');
const { processAIMessage: processChatAI } = require('../modules/chat/chat.controller');

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
      
      // Check if this is first time joining (auto welcome)
      const participantCount = await RoomParticipant.count({ where: { roomId } });
      const isNewMember = !rp.lastActiveAt || Date.now() - new Date(rp.lastActiveAt).getTime() > 24 * 60 * 60 * 1000; // 24h threshold
      
      if (isNewMember) {
        try {
          const welcomeMsg = await generateWelcomeMessage(
            socket.user.name, 
            room.name, 
            {
              participants: participantCount,
              amount: room.amount,
              period: room.period
            }
          );
          
          // Send welcome message as system message
          io.to('room:'+roomId).emit('chat:message', {
            id: Date.now(),
            message: welcomeMsg,
            userName: 'Arisan Bot 🤖',
            userId: 'system',
            createdAt: new Date().toISOString(),
            isSystemMessage: true
          });
          
          // Update last active time
          await RoomParticipant.update({ lastActiveAt: new Date() }, { where: { roomId, userId: socket.user.id } });
        } catch (welcomeError) {
          console.error('Welcome message error:', welcomeError);
        }
      }
      
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
      console.log('Draw start request for room:', roomId, 'by user:', socket.user.id); // Debug log
      const room = await Room.findByPk(roomId);
      if (!room) return socket.emit('error', { message: 'Room not found' });
      if (room.adminId !== socket.user.id) return socket.emit('error', { message: 'Only host can draw' });
      if (room.status === 'complete') return socket.emit('error', { message: 'Room complete' });

      // Check minimum participants (at least 2 for a meaningful draw)
      const participantCount = await RoomParticipant.count({ where: { roomId } });
      console.log('Participant count:', participantCount); // Debug log
      if (participantCount < 2) {
        return socket.emit('error', { message: 'Room must have at least 2 participants to start drawing' });
      }

      console.log('Emitting draw:begin to room:', roomId); // Debug log
      io.to('room:'+roomId).emit('draw:begin');

      const result = await drawWinner(roomId);
      console.log('Draw result:', result); // Debug log
      if (result.winner) {
        console.log('Emitting draw:result with winner:', result.winner); // Debug log
        io.to('room:'+roomId).emit('draw:result', { winner: result.winner, at: new Date().toISOString() });
        
        // Delay room state update to let animation finish (5 seconds)
        setTimeout(async () => {
          await emitRoomState(io, roomId);
        }, 5000);
      } else {
        // If no winner, update immediately
        await emitRoomState(io, roomId);
      }
    } catch (e) {
      console.error('Error in draw:start:', e); // Debug log
      socket.emit('error', { message: 'Failed to draw' });
    }
  });

  // Add room reset endpoint for testing
  socket.on('room:reset', async ({ roomId }) => {
    try {
      const room = await Room.findByPk(roomId);
      if (!room) return socket.emit('error', { message: 'Room not found' });
      if (room.adminId !== socket.user.id) return socket.emit('error', { message: 'Only host can reset' });

      // Reset room status and all participants
      await Room.update({ status: 'waiting' }, { where: { id: roomId } });
      await RoomParticipant.update({ hasWon: false }, { where: { roomId } });
      
      // Clear winners
      const { Winner } = require('../db/models');
      await Winner.destroy({ where: { roomId } });

      await emitRoomState(io, roomId);
      console.log('Room reset:', roomId); // Debug log
    } catch (e) {
      console.error('Error in room:reset:', e); // Debug log
      socket.emit('error', { message: 'Failed to reset room' });
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

  // Chat message handler with AI assistant
  socket.on('chat:send', async ({ roomId, message }) => {
    try {
      // Verify user is participant or spectator
      const room = await Room.findByPk(roomId);
      const rp = await RoomParticipant.findOne({ where: { roomId, userId: socket.user.id } });
      
      if (!room || (!rp && !room.allowSpectator)) {
        return socket.emit('error', { message: 'Not authorized to chat in this room' });
      }

      // Broadcast user message
      const userMessage = {
        id: Date.now(),
        message: message.trim(),
        userName: socket.user.name,
        userId: socket.user.id,
        createdAt: new Date().toISOString(),
        isSystemMessage: false
      };
      
      io.to('room:'+roomId).emit('chat:message', userMessage);

      // Check if AI should respond
      const aiResponse = await processChatAI(message, socket.user.name);
      if (aiResponse) {
        // Send AI response after short delay for natural conversation flow
        setTimeout(() => {
          const botMessage = {
            id: Date.now() + 1,
            message: aiResponse,
            userName: 'Arisan Bot 🤖',
            userId: 'system',
            createdAt: new Date().toISOString(),
            isSystemMessage: true
          };
          
          io.to('room:'+roomId).emit('chat:message', botMessage);
        }, 1000);
      }
    } catch (e) {
      console.error('Chat error:', e);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });
};
