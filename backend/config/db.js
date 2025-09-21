const { Sequelize } = require("sequelize");
require("dotenv").config();

const isDev = process.env.NODE_ENV === "development";

const sequelize = new Sequelize(
  process.env.DATABASE_URL || process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    },
    logging: false,
  }
);

module.exports = sequelize;
