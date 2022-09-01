const { SlashCommandBuilder } = require('discord.js');
const PlayerDB = require('../models/Player');
const dailyCooldown = require('../helpers/dailyCooldown');
const dayjs = require('dayjs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quizdiario')
    .setDescription('Quiz diário. Jogue para receber premios!'),
  async execute(interaction) {
    const player = await PlayerDB.findOne({ where: { discord_id: interaction.user.id } });
    if (!player) {
      console.log(player);
    } else {
      const cooldown = dailyCooldown(interaction.user.id);
      if (cooldown) {
        const agora = new Date();
        const diffMs = cooldown - agora;

        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

        await interaction.reply({
          content: `Apressadinho hein? Espera o cooldown aí! Faltam: ${hours}h ${minutes}m ${seconds}s`,
          ephemeral: true,
        });
      }
    }
    // await interaction.reply('Quiz diário sobre pokémon para ganhar premiação');
    // await interaction.followUp('Calma lá amigão, tamo em desenvolvimento!');
  },
};
