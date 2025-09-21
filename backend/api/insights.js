const insightController = require('../controllers/insight.controller');
const authMiddleware = require('../middlewares/auth.middleware');

module.exports = async (req, res) => {
  // Apply auth middleware
  await authMiddleware(req, res, () => {});
  
  if (req.method === 'GET') {
    return insightController.getInsights(req, res);
  }
  res.status(404).json({ message: 'Not found' });
};