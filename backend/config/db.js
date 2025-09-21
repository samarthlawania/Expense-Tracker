const { Sequelize } = require("sequelize");
require("dotenv").config();

const isDev = process.env.NODE_ENV === "development";

const sequelize = process.env.DATABASE_URL 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        },
        connectTimeout: 60000,
        family: 4
      },
      pool: {
        max: 3,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      logging: console.log,
      retry: {
        max: 3
      }
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
