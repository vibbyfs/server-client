const Joi = require('joi');

const listRoomsQuery = Joi.object({
  status: Joi.string().valid('waiting','ongoing','complete').optional(),
  minDues: Joi.number().min(0).optional(),
  maxDues: Joi.number().min(0).optional(),
  freqUnit: Joi.string().valid('daily','weekly','monthly').optional(),
  freqValue: Joi.number().integer().min(1).optional(),
  tenorMin: Joi.number().integer().min(1).optional(),
  tenorMax: Joi.number().integer().min(1).optional(),
  sort: Joi.string().valid('dues','capacity','startAt','createdAt').default('createdAt'),
  order: Joi.string().valid('asc','desc').default('desc')
});

const createRoomBody = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  capacity: Joi.number().integer().min(2).max(100).required(),
  dues: Joi.number().min(0).required(),
  drawFrequencyValue: Joi.number().integer().min(1).max(365).required(),
  drawFrequencyUnit: Joi.string().valid('daily','weekly','monthly').required(),
  tenorRounds: Joi.number().integer().min(1).max(1000).optional().default(10),
  allowSpectator: Joi.boolean().optional().default(true),
  pin: Joi.string().min(4).max(20).optional().allow('')
});

const joinParams = Joi.object({
  id: Joi.number().integer().required()
});

const joinBody = Joi.object({
  pin: Joi.string().optional().allow('')
});

const idParam = Joi.object({
  id: Joi.number().integer().required()
});

module.exports = { 
  listRoomsQuery, 
  createRoomBody,
  joinParams, 
  joinBody,
  idParam 
};
