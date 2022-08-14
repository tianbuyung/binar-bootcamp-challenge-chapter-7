require("dotenv").config();

const { DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env;

module.exports = {
  development: {
    username: DATABASE_USERNAME || "postgres",
    password: DATABASE_PASSWORD || "admin",
    database: "challenge_chapter_7_database_development",
    host: DATABASE_HOST,
    dialect: "postgres",
  },
  test: {
    username: DATABASE_USERNAME || "postgres",
    password: DATABASE_PASSWORD || "admin",
    database: "challenge_chapter_7_database_staging",
    host: DATABASE_HOST,
    dialect: "postgres",
  },
  production: {
    username: DATABASE_USERNAME || "postgres",
    password: DATABASE_PASSWORD || "admin",
    database: "challenge_chapter_7_database_production",
    host: DATABASE_HOST,
    dialect: "postgres",
  },
};
