'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    static associate(models) {
      Expense.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Expense.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    description: DataTypes.TEXT,
    amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    category: DataTypes.STRING,
    isRecurring: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_recurring' },
    type: { type: DataTypes.ENUM('expense', 'income'), allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at' }
  }, {
    sequelize,
    modelName: 'Expense',
    tableName: 'expenses',
    timestamps: false
  });
  return Expense;
};