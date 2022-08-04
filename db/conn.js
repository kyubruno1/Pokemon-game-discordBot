import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('agumon', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
// modules.exports = sequelize;
