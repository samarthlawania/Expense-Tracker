const { Expense } = require('../models');
const aiService = require('../services/ai.service');

exports.getInsights = async (req,res,next) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.findAll({ where: { userId }, order: [['date','DESC']], limit: 200 });
    
    // Format expense data with categories for better AI analysis
    const descriptions = expenses.map(e => {
      const category = e.category || 'Other';
      const type = e.type || 'expense';
      return `${e.date} - ${category} - $${e.amount} - ${e.description || 'No description'} (${type})`;
    });
    
    const insights = await aiService.summarizeSpendingPatterns(descriptions);
    res.json({ insights });
  } catch (err) { next(err); }
};
