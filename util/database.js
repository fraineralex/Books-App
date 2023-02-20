const Sequelize = require("sequelize");
const path = require("path");

const sequelize = new Sequelize("sqlite::memory:", {
  dialect: "sqlite",
  logging: false,
  storage: path.join(
    path.dirname(require.main.filename),
    "database",
    "booksApp.sqlite"
  ),
});


module.exports = sequelize;
