const PlayerDB = require('../models/Player.js');

async function savePlayer(name, discord_id) {
  await PlayerDB.create({ name, discord_id });
}

async function checkIfExistsAndCreate(name, discord_id) {
  const user = await PlayerDB.findOne({
    where: { name, discord_id },
  });

  if (user) {
    return user;
  } else {
    return await PlayerDB.create({ name, discord_id });
    // return console.log('não existe mas ja foi criado');
  }
}

async function checkifGotInitial(name, discord_id) {
  const user = await PlayerDB.findOne({ where: { name, discord_id } }).then((res) => res.toJSON());

  if (!user.got_initial) {
    console.log('nulo');
  } else {
    console.log('not null');
  }
}

module.exports = { savePlayer, checkIfExistsAndCreate, checkifGotInitial };
