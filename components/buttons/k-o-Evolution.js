const fs = require('fs');
const path = require('path');
const PokemonDB = require('../../models/Pokemon');
const { Op } = require('sequelize');
const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const { createButtons, collector } = require('../../functions/battleButtonCreate');

module.exports = {
  data: {
    name: `evolution-ko`,
  },
  async execute(interaction) {
    // pega qual o nivel da evolução
    const content = interaction.message.content.indexOf('evolução');
    const evolucao = interaction.message.content.slice(content);

    let level = '';
    if (evolucao == 'evolução 1') {
      level = 35;
    } else if (evolucao == 'evolução 2') {
      level = 75;
    }

    const pokemons = await PokemonDB.findAll({
      where: {
        PlayerDiscordId: interaction.user.id,
        level: {
          [Op.gte]: level,
        },
      },
    });

    const pokeArray = [];
    pokemons.forEach((item) => {
      const clean = item.pokedex_id.replace('#', '');
      let pokemon = {
        dbId: `${item.id}`,
        id: `${item.pokedex_id}`,
        name: `${item.name}`,
        level: `${item.level}`,
      };
      pokeArray.push(pokemon);
    });
    //busca se pokemon é evolução 1 ou 2
    const dataPath = path.join(__dirname, '..', '..', 'assets', 'data', `pokemon_infos.json`);
    const data = fs.readFileSync(dataPath, { encoding: 'utf8', flag: 'r' });
    const pokemonData = JSON.parse(data);

    //Organiza o array em ordem alfabética
    pokeArray.sort((a, b) => a.name.localeCompare(b.name));

    //Filtra o array pelas iniciais
    const newArr = [];
    pokeArray.forEach((item) => {
      if (
        item.name.startsWith('k') ||
        item.name.startsWith('l') ||
        item.name.startsWith('m') ||
        item.name.startsWith('n') ||
        item.name.startsWith('o')
      ) {
        if (evolucao == 'evolução 1') {
          const pokemonFindEvoOne = pokemonData.find(
            (pokemon) => pokemon.name == item.name && pokemon.evolved_from == ''
          );
          if (pokemonFindEvoOne) {
            newArr.push(item);
          }
        } else if (evolucao == 'evolução 2') {
          const pokemonFindEvoOne = pokemonData.find(
            (pokemon) =>
              pokemon.name == item.name && pokemon.evolved_from != '' && pokemon.evolves_to != ''
          );
          if (pokemonFindEvoOne) {
            newArr.push(item);
          }
        }
      }
    });
    // console.log(newArr);

    const botoes = createButtons();
    if (newArr.length == 0) {
      collector(interaction, botoes);
      await interaction.reply({
        content: 'Você não tem pokemons nesta categoria, escolha outra',
        components: [botoes],
        ephemeral: true,
      });
      return;
    }

    //cria a proxima interação
    const options = [];
    newArr.forEach((item) => {
      let items = {
        label: item.name,
        description: `Level: ${item.level}`,
        value: `id:${item.id}, name:${item.name}, level:${item.level}, dbId:${item.dbId}`,
        // value: { id: item.id },
      };

      options.push(items);
    });
    // console.log(interaction.message.components[0].components[0]);
    const row = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId('pokemon-evolution-select')
        .setPlaceholder('Nenhum selecionado')
        .addOptions(options)
    );
    await interaction.reply({
      content: `Escolha o pokémon base para tentar chegar à ${evolucao}`,
      components: [row],
      ephemeral: true,
    });
  },
};
