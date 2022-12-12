require("dotenv").config();
const env = process.env;
module.exports = {
  development: {
    storage: "city_archive.sqlite",
    dialect: "sqlite",
    seedStorage: true,
  },
  test: {
    storage: "city_archive.test.sqlite",
    dialect: "sqlite",
  },
  production: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
    storage: env.DB_STORAGE,
    seedStorage: true,
  },
};
