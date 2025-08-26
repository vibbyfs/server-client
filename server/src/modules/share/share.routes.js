const express = require('express');
const router = express.Router();

router.post('/winners/:winnerId/share', (req, res, next) => {
  next();
}, require('./share.controller').postShare);

module.exports = router;
