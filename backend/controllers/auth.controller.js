const authService = require('../services/auth.service');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    const user = await authService.signup({ name, email, password });
    res.status(201).json({ 
      message: 'User created successfully',
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (err) { 
    if (err.message === 'Email already in use') {
      return res.status(400).json({ message: err.message });
    }
    next(err); 
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const result = await authService.login({ email, password });
    res.json({ 
      token: result.token, 
      user: { id: result.user.id, email: result.user.email, name: result.user.name }
    });
  } catch (err) { 
    if (err.message === 'Invalid credentials') {
      return res.status(401).json({ message: err.message });
    }
    next(err); 
  }
};
