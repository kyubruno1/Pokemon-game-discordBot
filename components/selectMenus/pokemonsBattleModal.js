const fs = require('fs');
const path = require('path');
const { getWinChance, calculatePrizes, checkLevelUp } = require('../../functions/battleDecider');
const InventoryDB = require('../../models/Inventory');
const PokemonDB = require('../../models/Pokemon');
const { selectMenuCollector } = require('../../functions/battleButtonCreate');
module.exports = {
  data: {
    name: `pokemon-select`,
  },
  async execute(interaction) {
    const values = interaction.values.toString().split(', ');

    // console.log(values);
    const pokemonId = values[0].slice(3);
    const pokemonName = values[1].slice(5);
    const pokemonLevel = values[2].slice(6);
    const pokemonDbId = values[3].slice(5);
    const pokemonTotalExp = values[4].slice(9);
    const pokemonGrowth = values[5].slice(7);
    // console.log(pokemonGrowth);

    //seu pokemon
    const pokemon = {
      id: values[0].slice(3),
      dbId: values[3].slice(5),
      name: values[1].slice(5),
      lvl: values[2].slice(6),
      expToNextLevel: values[4].slice(9),
      growth: values[5].slice(7),
    };

    const dataPath = path.join(
      __dirname,
      '..',
      '..',
      'assets',
      'data',
      'playerBattlePokemon',
      `${interaction.user.id}.json`
    );

    const data = fs.readFileSync(dataPath, { encoding: 'utf8', flag: 'r' });
    const enemyPokemon = JSON.parse(data);
    // console.log(enemyPokemon);

    const winChance = getWinChance(pokemon.lvl, enemyPokemon.level);

    const dice = Math.floor(Math.random() * 100) + 1;

    /* Tanto dado quanto a porcentagem são numeros de 0 a 100
        a porcentagem indica o número limite 
        exemplo: dado saiu valor 30, significa 30% de chance
        assim que rolar o dado, será dado um valor de 0 a 100. .
        Caso o número do dado for maior que a porcentagem, indica que não capturou o pokemon
    */

    if (dice < winChance) {
      const prizes = calculatePrizes(pokemon, enemyPokemon);

      //busca e atualiza inventario
      const inventory = await InventoryDB.findOne({
        where: { PlayerDiscordId: interaction.user.id },
      });

      let inventoryUpdate = {
        pokeball: prizes.pokebolas + inventory.pokeball,
        moedas: prizes.moedas + inventory.moedas,
      };

      await InventoryDB.update(
        { pokeball: inventoryUpdate.pokeball, moedas: inventoryUpdate.moedas },
        { where: { PlayerDiscordId: interaction.user.id } }
      );

      //busca arquivo de exp
      const dataPath = path.join(__dirname, '..', '..', 'assets', 'data', `exp_table.json`);
      const data = fs.readFileSync(dataPath, { encoding: 'utf8', flag: 'r' });
      const expData = JSON.parse(data);

      //busca o pokemon no banco
      const pokedb = await PokemonDB.findOne({
        where: { PlayerDiscordId: interaction.user.id, id: pokemon.dbId },
      });
      // console.log(pokedb);

      const prizeExp = prizes.exp;
      const checkLevel = await checkLevelUp(prizes.exp, pokemon);

      await PokemonDB.update(
        { level: checkLevel.lvl, exp_to_next_level: checkLevel.expToNextLevel },
        { where: { PlayerDiscordId: interaction.user.id, id: checkLevel.dbId } }
      );

      await interaction.reply({
        content: `${interaction.user} Venceu de um ${enemyPokemon.name} level ${enemyPokemon.level} com ${winChance}% chance de vitória usando um ${pokemon.name} level ${pokemon.lvl}`,
        ephemeral: true,
      });
      await interaction.followUp({
        content: `Resultados da batalha: 
        ${pokemon.name} level: **${pokemon.lvl}** → **${checkLevel.lvl}**
        Pokebolas: **${prizes.pokebolas}**
        Moedas: **${prizes.moedas}**`,
        ephemeral: true,
      });
    } else {
      interaction.reply({
        content: `Perdeu para um ${enemyPokemon.name} lvl ${enemyPokemon.level} com ${winChance}% chance de vitória usando um ${pokemon.name} level ${pokemon.lvl}`,
        ephemeral: true,
      });
    }

    // fs.unlinkSync(dataPath);
  },
};
