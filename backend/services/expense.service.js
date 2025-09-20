const { Expense } = require('../models');
const { Op } = require('sequelize');

exports.listExpenses = async (userId, filters = {}) => {
  const where = { userId };
  
  if (filters.category) {
    where.category = filters.category;
  }
  
  if (filters.dateFrom || filters.dateTo) {
    where.date = {};
    if (filters.dateFrom) where.date[Op.gte] = filters.dateFrom;
    if (filters.dateTo) where.date[Op.lte] = filters.dateTo;
  }
  
  return await Expense.findAll({
    where,
    order: [['date', 'DESC']]
  });
};

exports.addExpense = async (userId, expenseData) => {
  return await Expense.create({
    ...expenseData,
    userId
  });
};

exports.bulkCreateFromParsed = async (userId, parsedTransactions) => {
  const expenses = parsedTransactions.map(tx => ({
    ...tx,
    userId
  }));
  return await Expense.bulkCreate(expenses);
};