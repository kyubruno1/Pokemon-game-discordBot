const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('roubar').setDescription('Rouba algo de alguém'),
  async execute(interaction) {
    await interaction.reply('Rouba algo de alguém');
    await interaction.followUp('Calma lá amigão, tamo em desenvolvimento!');
  },
};
