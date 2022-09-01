const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('info').setDescription('Informações sobre o jogo'),
  async execute(interaction) {
    await interaction.reply('Informações sobre o jogo');
    await interaction.followUp('Calma lá amigão, tamo em desenvolvimento!');
  },
};
