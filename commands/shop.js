const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('loja')
    .setDescription('Loja para comprar pokebolas e itens de evolução'),
  async execute(interaction) {
    await interaction.reply('Loja para comprar pokebolas e itens de evolução');
    await interaction.followUp('Calma lá amigão, tamo em desenvolvimento!');
  },
};
