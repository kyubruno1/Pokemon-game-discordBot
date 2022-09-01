const ms = require('ms');
const cooldown = new Set(); //cria o cooldown
// const cooldownTime = 60000; //60000 é igual a 1 minuto
const cooldownTime = ms('1day');

let today = new Date();
let tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

module.exports = function dailyCooldown(userID) {
  if (cooldown.has(userID)) {
    return tomorrow;
  } else {
    cooldown.add(userID);
    setTimeout(() => {
      cooldown.delete(userID);
      today = new Date();
    }, cooldownTime);
  }
};
