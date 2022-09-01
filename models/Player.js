const { DataTypes } = require('sequelize');
const db = require('../db/conn.js');

const Player = db.define('Player', {
  name: {
    type: DataTypes.STRING,
  },
  discord_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  got_initial: {
    type: DataTypes.BOOLEAN,
  },
  daily_rewards: {
    type: DataTypes.DATE,
  },
});

module.exports = Player;
