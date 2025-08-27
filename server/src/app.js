const express = require('express');
const cors = require('cors');
const config = require('./config');
const { authMiddleware } = require('./middlewares/auth');

const app = express();
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => res.json({ ok: true }));

// Public
app.use('/api', require('./modules/auth/auth.routes'));

// Protected
app.use('/api', authMiddleware, require('./modules/rooms/rooms.routes'));
app.use('/api', authMiddleware, require('./modules/chat/chat.routes'));
app.use('/api', authMiddleware, require('./modules/share/share.routes'));
app.use('/api/insights', authMiddleware, require('./modules/insights/insights.routes'));

module.exports = app;
