const cooldown = new Set(); //cria o cooldown
const cooldownTime = 300000; //60000 é igual a 1 minuto

module.exports = function cooldownFunction(userID) {
  if (cooldown.has(userID)) {
    return true;
  } else {
    cooldown.add(userID);
    setTimeout(() => {
      cooldown.delete(userID);
    }, cooldownTime);
  }
};
