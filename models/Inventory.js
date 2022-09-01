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
      defaultValue: 0,
    },
    evo_item_1: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    evo_item_2: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    evo_item_3: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    insignia_pedregulho: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    insignia_alma: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    insignia_arco_iris: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    insignia_cascata: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    insignia_pantano: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    insignia_terra: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    insignia_trovao: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    insignia_vulcao: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

InventoryDB.belongsTo(Player);

module.exports = InventoryDB;
