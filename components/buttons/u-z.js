const PokemonDB = require('../../models/Pokemon');
const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const {
  createButtons,
  collector,
  selectMenuCollector,
} = require('../../functions/battleButtonCreate');

module.exports = {
  data: {
    name: `u-z`,
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
        dbId: `${item.id}`,
        name: `${item.name}`,
        level: `${item.level}`,
        exp_to_next_level: `${item.exp_to_next_level}`,
        growth: `${item.growth_rate}`,
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
      collector(interaction, botoes);
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
        value: `id:${item.id}, name:${item.name}, level:${item.level}, dbId:${item.dbId}, levelExp:${item.exp_to_next_level}, growth:${item.growth}`,
        // value: { id: item.id },
      };
      options.push(items);
    });

    const row = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId('pokemon-select')
        .setPlaceholder('Nenhum selecionado')
        .addOptions(options)
    );

    selectMenuCollector(interaction, row);
    await interaction.reply({
      content: 'Escolha um pokémon com as iniciais entre U-Z',
      components: [row],
      ephemeral: true,
    });
  },
};
