const Joi = require('joi');

const listMessagesParams = Joi.object({
  id: Joi.number().integer().required()
});

const listMessagesQuery = Joi.object({
  cursor: Joi.string().isoDate().optional(),
  limit: Joi.number().integer().min(1).max(100).default(30)
});

module.exports = { listMessagesParams, listMessagesQuery };
