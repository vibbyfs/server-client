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

const joinParams = Joi.object({
  id: Joi.number().integer().required()
});

const idParam = Joi.object({
  id: Joi.number().integer().required()
});

module.exports = { listRoomsQuery, joinParams, idParam };
