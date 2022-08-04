import { DataTypes } from 'sequelize';
import db from '../db/conn.js';
import Player from './Player.js';

const Pokemon = db.define('Pokemon', {
    name: {
        type: DataTypes.STRING,
    },
    pokemon_id: {
        type: DataTypes.STRING,
    },
});

Pokemon.belongsTo(Player);

export default Pokemon;
