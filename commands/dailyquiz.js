const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quizdiario')
    .setDescription('Quiz diário. Jogue para receber premios!'),
  async execute(interaction) {
    await interaction.reply('Quiz diário sobre pokémon para ganhar premiação');
    await interaction.followUp('Calma lá amigão, tamo em desenvolvimento!');
  },
};
