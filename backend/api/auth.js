const authController = require('../controllers/auth.controller');

module.exports = async (req, res) => {
  if (req.method === 'POST' && req.url.includes('/signup')) {
    return authController.signup(req, res);
  }
  if (req.method === 'POST' && req.url.includes('/login')) {
    return authController.login(req, res);
  }
  res.status(404).json({ message: 'Not found' });
};