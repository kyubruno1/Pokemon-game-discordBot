const ms = require('ms');
const cooldown = new Set(); //cria o cooldown
// const cooldownTime = 60000; //60000 é igual a 1 minuto
const cooldownTime = ms('5min');
const cdtime = cooldownTime / 1000 / 60;

let today = new Date();
let cooldownCD = new Date(today);
cooldownCD.setMinutes(today.getMinutes() + cdtime);

module.exports = function cooldownFind(userID) {
  if (cooldown.has(userID)) {
    return cooldownCD;
  } else {
    cooldown.add(userID);
    setTimeout(() => {
      cooldown.delete(userID);
      today = new Date();
    }, cooldownTime);
  }
};
