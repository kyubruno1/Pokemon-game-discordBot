const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('inicial').setDescription('Escolha um Pokémon inicial!'),
  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('charmander')
        .setLabel('Charmander')
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId('bulbasaur')
        .setLabel('Bulbasaur')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('squirtle').setLabel('Squirtle').setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({ content: 'Escolha seu Pokémon', components: [row] });
  },
};
