const expenseController = require('../controllers/expense.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');

const upload = multer({ dest: '/tmp/' });

module.exports = async (req, res) => {
  // Apply auth middleware
  await authMiddleware(req, res, () => {});
  
  if (req.method === 'GET') {
    return expenseController.list(req, res);
  }
  if (req.method === 'POST' && req.url.includes('/upload')) {
    return upload.single('file')(req, res, () => expenseController.upload(req, res));
  }
  if (req.method === 'POST' && req.url.includes('/extract-receipt')) {
    return upload.single('receipt')(req, res, () => expenseController.extractReceipt(req, res));
  }
  if (req.method === 'POST') {
    return expenseController.create(req, res);
  }
  if (req.method === 'GET' && req.url.includes('/export')) {
    return expenseController.export(req, res);
  }
  res.status(404).json({ message: 'Not found' });
};