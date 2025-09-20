const sequelize = require('../config/db');
const User = require('./User');
const Expense = require('./Expense');
const Budget = require('./Budget');

// Define associations
User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Budget, { foreignKey: 'userId' });
Budget.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Expense,
  Budget
};