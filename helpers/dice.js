function dice(value) {
  //Dado padrão, retorna um valor aleatório dentro do estabelecido no argumento da função
  return (Math.floor(Math.random() * value) + 1).toString();
}

function pokemonLevelDice() {
  //Dado que retorna aleatório de um à 20 (padrão inicial) para o spawn de pokémon
  return (Math.floor(Math.random() * 20) + 1).toString();
}

function isShinyDice() {
  //Chance de 0,5%
  const chance = (Math.floor(Math.random() * 200) + 1).toString();
  if (chance == 1) {
    return true;
  }
  return false;
}
module.exports = { dice, pokemonLevelDice, isShinyDice };
