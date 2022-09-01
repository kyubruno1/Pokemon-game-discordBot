const PlayerDB = require('../models/Player.js');
const InventoryDB = require('../models/Inventory');
const { Player } = require('./Player');

async function savePlayer(name, discord_id) {
  await PlayerDB.create({ name, discord_id });
}

async function checkIfExistsAndCreate(name, discord_id) {
  const user = await PlayerDB.findOne({
    where: { discord_id },
  });

  if (user) {
    return user.toJSON();
  } else {
    const player = new Player(name, discord_id);

    const pokeball = player.inventory.items[0].qnt;
    const moedas = player.inventory.items[1].qnt;
    const evo_item_1 = player.inventory.items[2].qnt;
    const evo_item_2 = player.inventory.items[3].qnt;
    const evo_item_3 = player.inventory.items[4].qnt;

    await PlayerDB.create({ name: name, discord_id: discord_id });
    await InventoryDB.create({
      pokeball,
      moedas,
      evo_item_1,
      evo_item_2,
      evo_item_3,
      PlayerDiscordId: discord_id,
    });
    return player;
  }
}

async function checkifGotInitial(discord_id) {
  const user = await PlayerDB.findOne({ where: { discord_id } }).then((res) => res.toJSON());

  if (!user.got_initial) {
    console.log('nulo');
  } else {
    console.log('not null');
  }
}

module.exports = { savePlayer, checkIfExistsAndCreate, checkifGotInitial };
