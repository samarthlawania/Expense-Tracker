const { Sequelize } = require("sequelize");
require("dotenv").config();

const isDev = process.env.NODE_ENV === "development";

const sequelize =
  process.env.USE_SQLITE === "true"
    ? new Sequelize({
        dialect: "sqlite",
        storage: "./database.sqlite",
        logging: false,
      })
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        {
          host: process.env.DB_HOST || "127.0.0.1",
          port: process.env.DB_PORT || 5432,
          dialect: "postgres",
          logging: false,
        }
      );

module.exports = sequelize;
