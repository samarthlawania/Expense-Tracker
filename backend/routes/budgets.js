const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const budgetController = require('../controllers/budget.controller');

router.use(auth);
router.post('/', budgetController.setBudget);
router.get('/', budgetController.getBudget);

module.exports = router;
