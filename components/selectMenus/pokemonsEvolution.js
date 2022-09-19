const fs = require('fs');
const path = require('path');
const { getWinChance } = require('../../functions/evolutionWinChanceDecider');
const PokemonDB = require('../../models/Pokemon');
module.exports = {
  data: {
    name: `pokemon-evolution-select`,
  },
  async execute(interaction) {
    // pega os dados do pokemon que veio na interação
    const values = interaction.values.toString().split(', ');
    const pokemonId = values[0].slice(3);
    const pokemonName = values[1].slice(5);
    const pokemonLevel = values[2].slice(6);
    const pokemonDbId = values[3].slice(5);

    //procura o pokemon no arquivo base de pokemons
    const dataPath = path.join(__dirname, '..', '..', 'assets', 'data', 'pokemon_infos.json');
    const data = fs.readFileSync(dataPath, { encoding: 'utf8', flag: 'r' });
    const pokemonInfos = JSON.parse(data);

    const foundPokemon = pokemonInfos.find((pokemon) => pokemon.name == pokemonName);

    // pega qual o nivel da evolução
    const content = interaction.message.content.indexOf('evolução');
    const evolucao = interaction.message.content.slice(content);

    const dice = Math.floor(Math.random() * 100) + 1;

    const winChance = getWinChance(evolucao);
    /* Tanto dado quanto a porcentagem são numeros de 0 a 100
        a porcentagem indica o número limite 
        exemplo: dado saiu valor 30, significa 30% de chance
        assim que rolar o dado, será dado um valor de 0 a 100. .
        Caso o número do dado for maior que a porcentagem, indica que não capturou o pokemon
    */

    if (dice < winChance) {
      // const growthRate = ['Muito lento', 'Lento', 'Normal', 'Rápido', 'Muito rápido'];
      const growthRate = [
        {
          name: 'Muito lento',
          rate: 0.5,
        },
        {
          name: 'Lento',
          rate: 0.8,
        },
        {
          name: 'Normal',
          rate: 1,
        },
        {
          name: 'Rápido',
          rate: 1.5,
        },
        {
          name: 'Muito rápido',
          rate: 2,
        },
      ];
      const random = Math.floor(Math.random() * growthRate.length);
      const rate = growthRate.find((element) => element.name == growthRate[random].name);
      const foundPokemonEvo = pokemonInfos.find(
        (pokemon) => pokemon.name == foundPokemon.evolves_to
      );

      PokemonDB.update(
        {
          name: foundPokemonEvo.name,
          pokedex_id: foundPokemonEvo.id,
          growth_rate: rate.rate,
        },
        { where: { id: pokemonDbId, PlayerDiscordId: interaction.user.id } }
      );

      await interaction.reply({
        content: `${interaction.user} Seu **${pokemonName}** conseguiu evoluir e agora é um **${foundPokemon.evolves_to}**`,
        // ephemeral: true,
      });
      await interaction.followUp({
        content: `${interaction.user} Confira o que mudou em seu pokémon:\n Agora ele é um **${foundPokemonEvo.name}**, \n o número de pokédex dele é **#${foundPokemonEvo.id}** \n e sua taxa de crescimento é **${rate.name}**`,
        ephemeral: true,
      });
    } else {
      PokemonDB.destroy({
        where: {
          id: pokemonDbId,
          name: pokemonName,
          pokedex_id: pokemonId,
          PlayerDiscordId: interaction.user.id,
        },
      });

      interaction.reply({
        content: `${interaction.user} Infelizmente seu pokémon não conseguiu evoluir e faleceu...`,
        ephemeral: true,
      });
    }
  },
};
