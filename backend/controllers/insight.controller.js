const { Expense } = require('../models');
const aiService = require('../services/ai.service');

exports.getInsights = async (req,res,next) => {
  try {
    // gather recent transactions for user (e.g., last 90 days)
    const userId = req.user.id;
    const expenses = await Expense.findAll({ where: { userId }, order: [['date','DESC']], limit: 200 });
    const descriptions = expenses.map(e => `${e.date} ${e.amount} ${e.description}`);
    // send to AI summarizer call
    const insights = await aiService.summarizeSpendingPatterns(descriptions);
    res.json({ insights });
  } catch (err) { next(err); }
};
