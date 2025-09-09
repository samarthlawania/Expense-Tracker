const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // make sure this is your sequelize instance

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

module.exports = User;
