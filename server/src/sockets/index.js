const jwt = require('jsonwebtoken');
const config = require('../config');
const roomChannel = require('./roomChannel');

function attachSockets(io) {
  io.use((socket, next) => {
    const token = socket.handshake.auth && socket.handshake.auth.token;
    if (!token) return next(new Error('No token'));
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      socket.user = { id: payload.id, name: payload.name, email: payload.email };
      next();
    } catch (e) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    roomChannel(io, socket);
  });
}

module.exports = { attachSockets };
