const express = require('express');
const budgetController = require('../controllers/budget.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', budgetController.getBudget);
router.post('/', budgetController.setBudget);

module.exports = router;