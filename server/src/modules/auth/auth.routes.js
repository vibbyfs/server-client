const express = require('express');
const router = express.Router();
const { validate } = require('../../middlewares/validate');
const { registerSchema, loginSchema } = require('./auth.schema');
const { register, login } = require('./auth.controller');

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

module.exports = router;
