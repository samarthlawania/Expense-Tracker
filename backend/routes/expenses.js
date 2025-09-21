const express = require('express');
const multer = require('multer');
const expenseController = require('../controllers/expense.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.use(authMiddleware);

router.get('/', expenseController.list);
router.post('/', expenseController.create);
router.post('/upload', upload.single('file'), expenseController.upload);
router.post('/extract-receipt', upload.single('receipt'), expenseController.extractReceipt);
router.get('/export', expenseController.export);

module.exports = router;