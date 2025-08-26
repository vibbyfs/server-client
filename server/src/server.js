const http = require('http');
const app = require('./app');
const { sequelize } = require('./db/models');
const { Server } = require('socket.io');
const config = require('./config');
const { attachSockets } = require('./sockets');

async function start() {
  try {
    await sequelize.authenticate();
  } catch (e) {
    console.error('DB connection failed:', e.message);
    process.exit(1);
  }

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: { origin: config.corsOrigin, credentials: true }
  });

  attachSockets(io);

  server.listen(config.port, () => {
    console.log('Server listening on', config.port);
  });
}

start();
