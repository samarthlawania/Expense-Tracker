const { Budget } = require('../models');

exports.setBudget = async (req,res,next) => {
  try {
    const { month, year, amount } = req.body;
    const userId = req.user.id;
    // upsert
    let budget = await Budget.findOne({ where: { userId, month, year }});
    if (budget) {
      budget.amount = amount;
      await budget.save();
    } else {
      budget = await Budget.create({ userId, month, year, amount });
    }
    res.json(budget);
  } catch (err) { next(err); }
};

exports.getBudget = async (req,res,next) => {
  try {
    const { month, year } = req.query;
    const userId = req.user.id;
    const budget = await Budget.findOne({ where: { userId, month, year }});
    res.json(budget);
  } catch (err) { next(err); }
};
