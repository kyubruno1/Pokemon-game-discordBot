const { DataTypes } = require('sequelize');
const db = require('../db/conn.js');
const Player = require('./Player.js');

const InventoryDB = db.define(
  'Inventory',
  {
    pokeball: {
      type: DataTypes.INTEGER,
    },
    moedas: {
      type: DataTypes.INTEGER,
    },
    evo_item_1: {
      type: DataTypes.INTEGER,
    },
    evo_item_2: {
      type: DataTypes.INTEGER,
    },
    evo_item_3: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

InventoryDB.belongsTo(Player);

module.exports = InventoryDB;
