const express = require('express');
const router = express.Router();
const { validate } = require('../../middlewares/validate');
const { listMessagesParams, listMessagesQuery } = require('./chat.schema');
const { getMessages } = require('./chat.controller');

router.get('/rooms/:id/messages', validate(listMessagesParams, 'params'), validate(listMessagesQuery, 'query'), getMessages);

module.exports = router;
