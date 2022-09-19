const fs = require('fs');
const path = require('path');

function getWinChance(pokemon, enemy) {
  const diff = pokemon - enemy;
  let counter = 0;
  let winChance = 50;
  let losePercentagePerLvl = 1;
  let winPercentagePerLvl = 1;

  if (diff > 0) {
    while (counter < diff) {
      counter++;
      if (winChance < 85) {
        winChance = winChance + winPercentagePerLvl;
      }
    }
    return winChance;
  } else if (diff < 0) {
    while (counter > diff) {
      if (winChance > 0) {
        winChance = winChance - losePercentagePerLvl;
      }
      counter--;
    }
    return winChance;
  } else {
    return winChance;
  }
}

function calculatePrizes(pokemon, enemy) {
  let prize = {
    pokebolas: 3,
    moedas: 120,
    exp: 0,
  };

  if (+pokemon.lvl >= +enemy.level) {
    const calcPerc = 1;
    const expPrize = +enemy.gainExp * +enemy.level * +calcPerc * +pokemon.growth;
    prize.exp = +expPrize.toFixed(0);
  }
  if (+pokemon.lvl < +enemy.level) {
    const diffLevel = +enemy.level - +pokemon.lvl;
    const calcPerc = '1.' + diffLevel;

    for (i = 1; i <= diffLevel; i++) {
      prize.moedas = prize.moedas + 10;
      if (i % 10 == 0) {
        prize.pokebolas = prize.pokebolas + 1;
      }
    }
    /*
    calculo = exp base inimiga * nivel inimiga * diferença de nivel % * crescimento do seu pokemon
    exemplo:  65 * 20 * 1,10 (seu pokémon 10 lvl menor = 10%, caso seu pokemon seja lvl maior, sempre valor 1) * 2 (muito rapido) = 2860 exp
    */
    const expPrize = +enemy.gainExp * +enemy.level * +calcPerc * +pokemon.growth;
    prize.exp = +expPrize.toFixed(0);
  }
  return prize;
}

function checkLevelUp(prizeExp, pokemon) {
  const dataPath = path.join(__dirname, '..', 'assets', 'data', `exp_table.json`);
  // const dataPath = path.join(__dirname, 'assets', 'data', `exp_table.json`);
  const data = fs.readFileSync(dataPath, { encoding: 'utf8', flag: 'r' });
  const expData = JSON.parse(data);

  const diff = +pokemon.expToNextLevel - prizeExp;

  if (diff <= 0) {
    const pokelvl = expData.find((item) => item.lvl == +pokemon.lvl + 1);
    pokelvl.dbId = pokemon.dbId;
    pokemon = pokelvl;
    return checkLevelUp(-diff, pokemon);
  } else if (diff > 0) {
    pokemon.expToNextLevel = diff;
    return pokemon;
  }
}

module.exports = { getWinChance, calculatePrizes, checkLevelUp };
