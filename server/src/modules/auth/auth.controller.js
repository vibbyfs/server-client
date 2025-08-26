const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const { User } = require('../../db/models');

function sign(user) {
  const payload = { id: user.id, name: user.name, email: user.email };
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ where: { email } });
    if (exist) return res.status(400).json({ message: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    return res.status(201).json({ id: user.id, email: user.email });
  } catch (e) {
    return res.status(500).json({ message: 'Register failed' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const access_token = sign(user);
    res.json({ access_token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (e) {
    res.status(500).json({ message: 'Login failed' });
  }
}

module.exports = { register, login };
