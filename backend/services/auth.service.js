const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const saltRounds = 10;

async function signup({name, email, password}) {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error('Email already in use');
  const hash = await bcrypt.hash(password, saltRounds);
  const user = await User.create({ name, email, password: hash });
  return user;
}

async function login({email, password}) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid credentials');
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials');
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
  return { user, token };
}

module.exports = { signup, login };
