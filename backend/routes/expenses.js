const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');
const auth = require('../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.use(auth);

router.get('/', expenseController.list); // GET /expenses
router.post('/', expenseController.create); // POST /expenses
router.post('/upload', upload.single('file'), expenseController.upload); // POST /expenses/upload
router.get('/export', expenseController.export); // GET /expenses/export?format=xlsx|csv

module.exports = router;
