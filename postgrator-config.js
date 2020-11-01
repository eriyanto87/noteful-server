require("dotenv").config();

console.log("from postgrator config", process.env.DB_URL);

module.exports = {
  migrationsDirectory: "migrations",
  driver: "pg",
  connectionString: process.env.DB_URL,
};
