function dice(value) {
  return (Math.floor(Math.random() * value) + 1).toString();
}

function pokemonLevelDice() {
  return (Math.floor(Math.random() * 20) + 1).toString();
}

function isShiny() {
  const chance = (Math.floor(Math.random() * 200) + 1).toString();
  if (chance == 1) {
    return true;
  }
  return false;
}
module.exports = { dice, pokemonLevelDice, isShiny };
