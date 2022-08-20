// import { DataTypes } from 'sequelize';
const { DataTypes } = require('sequelize');
const db = require('../db/conn.js');
// import db from '../db/conn.js';

const Player = db.define('Player', {
  name: {
    type: DataTypes.STRING,
  },
  discord_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
});

module.exports = Player;
// export default Player;
