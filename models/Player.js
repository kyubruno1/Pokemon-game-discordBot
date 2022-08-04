import { DataTypes } from 'sequelize';
import db from '../db/conn.js';

const Player = db.define('Player', {
    name: {
        type: DataTypes.STRING,
    },
    pokemon: {
        type: DataTypes.JSON,
    },
});
export default Player;
