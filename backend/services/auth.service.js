const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.signup = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email already in use');
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({
    name,
    email,
    password: hashedPassword
  });
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  console.log(user);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }
  
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
  
  return { token, user };
};