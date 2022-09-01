const { DataTypes } = require('sequelize');
const db = require('../db/conn.js');
const Player = require('./Player.js');

const Pokemon = db.define(
  'Pokemon',
  {
    name: {
      type: DataTypes.STRING,
    },
    pokedex_id: {
      type: DataTypes.STRING,
    },
    growth_rate: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

Pokemon.belongsTo(Player);

module.exports = Pokemon;
// export default Pokemon;
