const { Inventory } = require('./Inventory');
class Player {
  constructor(name, discord_id) {
    this.name = name;
    this.discord_id = discord_id;
    this.got_initial = false;
    this.inventory = new Inventory();
  }
}

// const player = new Player('Bruno', 500);

module.exports = { Player };
