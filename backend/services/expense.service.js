const { Expense, Budget, sequelize } = require('../models');
const aiService = require('./ai.service');
const mailService = require('./mail.service');
const { Op } = require('sequelize');

async function listExpenses(userId, filters = {}) {
  const where = { userId };

  if (filters.category) where.category = filters.category;
  if (filters.dateFrom || filters.dateTo) {
    where.date = {};
    if (filters.dateFrom) where.date[Op.gte] = filters.dateFrom;
    if (filters.dateTo) where.date[Op.lte] = filters.dateTo;
  }

  return Expense.findAll({ where, order: [['date','DESC']] });
}

async function addExpense(userId, expPayload) {
  // run inside transaction to safely check budget
  return sequelize.transaction(async (t) => {
    const expense = await Expense.create({ userId, ...expPayload }, { transaction: t });

    // After insert check budget for the month
    const date = new Date(expense.date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const budget = await Budget.findOne({ where: { userId, month, year } , transaction: t});
    if (budget) {
      // calculate total expenses this month
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0);
      const totals = await Expense.findAll({
        attributes: [[sequelize.fn('SUM', sequelize.col('amount')), 'total']],
        where: { userId, date: { [Op.between]: [start, end] } },
        transaction: t
      });
      const totalSpent = parseFloat(totals[0].get('total') || 0);
      if (totalSpent > parseFloat(budget.amount)) {
        // send email alert asynchronously (but triggered now)
        await mailService.sendBudgetAlert(userId, budget, totalSpent);
      }
    }
    return expense;
  });
}

async function bulkCreateFromParsed(userId, expensesArray) {
  // expensesArray: [{date, description, amount, category, isRecurring}]
  return sequelize.transaction(async (t) => {
    const created = await Expense.bulkCreate(
      expensesArray.map(e => ({ ...e, userId })),
      { transaction: t }
    );
    // After creation, you may check budgets per month - omitted for brevity.
    return created;
  });
}

module.exports = { listExpenses, addExpense, bulkCreateFromParsed };
