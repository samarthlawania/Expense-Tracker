const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
const expenseRoutes = require('./expenses');
const budgetRoutes = require('./budgets');
const insightsRoutes = require('./insights');
const alertRoutes = require('./alerts');

// Mount route modules
router.use('/auth', authRoutes);
router.use('/expenses', expenseRoutes);
router.use('/budget', budgetRoutes);
router.use('/insights', insightsRoutes);
router.use('/alerts', alertRoutes);

module.exports = router;
