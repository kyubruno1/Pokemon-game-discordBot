const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const { createImagePokemon } = require('../helpers/image');

module.exports = {
  data: new SlashCommandBuilder().setName('inicial').setDescription('Escolha um Pokémon inicial!'),
  async execute(interaction) {
    const charmander = await createImagePokemon('charmander');
    const bulbasaur = await createImagePokemon('bulbasaur');
    const squirtle = await createImagePokemon('squirtle');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('charmander')
        .setLabel('Charmander')
        .setStyle(ButtonStyle.Danger)
    );
    const row2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('bulbasaur')
        .setLabel('Bulbasaur')
        .setStyle(ButtonStyle.Success)
    );
    const row3 = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('squirtle').setLabel('Squirtle').setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({
      content: 'Escolha seu Pokémon',
      ephemeral: true,
    });
    await interaction.followUp({
      content: '',
      files: [charmander],
      components: [row],
      ephemeral: true,
    });
    await interaction.followUp({
      content: '',
      files: [bulbasaur],
      components: [row2],
      ephemeral: true,
    });
    await interaction.followUp({
      content: '',
      files: [squirtle],
      components: [row3],
      ephemeral: true,
    });
  },
};
