const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('agumon', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
