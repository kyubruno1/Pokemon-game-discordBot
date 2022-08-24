const PlayerDB = require('../models/Player.js');

async function savePlayer(username, usernameId) {
  await PlayerDB.create({ name: username, discord_id: usernameId });
}

async function checkIfExistsAndCreate(username, usernameId) {
  return await PlayerDB.findOrCreate({ where: { name: username, discord_id: usernameId } });
}

module.exports = { savePlayer, checkIfExistsAndCreate };
