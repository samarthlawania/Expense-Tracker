'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    static associate(models) {
      Budget.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Budget.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
    month: { type: DataTypes.INTEGER, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at' }
  }, {
    sequelize,
    modelName: 'Budget',
    tableName: 'budgets',
    timestamps: false,
    indexes: [{ unique: true, fields: ['user_id', 'month', 'year'] }]
  });
  return Budget;
};