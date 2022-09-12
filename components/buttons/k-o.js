const PokemonDB = require('../../models/Pokemon');
const { Op } = require('sequelize');
const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const { createButtons, coletor } = require('../../functions/battleButtonCreate');

module.exports = {
  data: {
    name: `k-o`,
  },
  async execute(interaction) {
    const pokemons = await PokemonDB.findAll({
      where: {
        PlayerDiscordId: interaction.user.id,
      },
    });

    const pokeArray = [];
    pokemons.forEach((item) => {
      const clean = item.pokedex_id.replace('#', '');
      let pokemon = {
        id: `${clean}`,
        name: `${item.name}`,
        level: `${item.total_exp}`,
      };
      pokeArray.push(pokemon);
      // pokeArray.push(`\n**Pokedex**: #${clean}\n - ${item.name} - LVL ${item.total_exp}\n`);
    });

    //Organiza o array em ordem alfabética
    pokeArray.sort((a, b) => a.name.localeCompare(b.name));

    const newArr = [];
    pokeArray.forEach((item) => {
      if (
        item.name.startsWith('k') ||
        item.name.startsWith('l') ||
        item.name.startsWith('m') ||
        item.name.startsWith('n') ||
        item.name.startsWith('o')
      ) {
        newArr.push(item);
      }
    });

    const botoes = createButtons();

    if (newArr.length == 0) {
      coletor(interaction, botoes);
      await interaction.reply({
        content: 'Você não tem pokemons nesta categoria, escolha outra',
        components: [botoes],
        ephemeral: true,
      });

      return;
    }

    const options = [];
    newArr.forEach((item) => {
      let items = {
        label: item.name,
        description: `Level: ${item.level}`,
        value: `${item.name}${item.level}${item.id}`,
      };
      options.push(items);
    });

    const row = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId('pokemon-select')
        .setPlaceholder('Nenhum selecionado')
        .addOptions(options)
    );
    await interaction.reply({
      content: 'k-o',
      components: [row],
      ephemeral: true,
    });
  },
};
