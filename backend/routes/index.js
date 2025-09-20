const express = require('express');
const authRoutes = require('./auth');
const expenseRoutes = require('./expenses');
const budgetRoutes = require('./budgets');
const insightRoutes = require('./insights');
const alertRoutes = require('./alerts');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/expenses', expenseRoutes);
router.use('/budget', budgetRoutes);
router.use('/insights', insightRoutes);
router.use('/alerts', alertRoutes);

module.exports = router;