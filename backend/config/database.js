const { Sequelize } = require("sequelize");

module.exports = db = new Sequelize("demoDB", "postgres", "RESt321", {
  host: "localhost",
  dialect: "postgres",
});
