const authService = require('../services/auth.service');

exports.signup = async (req, res, next) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json({ id: user.id, email: user.email, name: user.name });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.json({ token: result.token, user: { id: result.user.id, email: result.user.email, name: result.user.name }});
  } catch (err) { next(err); }
};
