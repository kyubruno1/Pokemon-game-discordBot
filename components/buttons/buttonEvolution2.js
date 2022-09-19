const PokemonDB = require('../../models/Pokemon');
const { Op } = require('sequelize');
const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const { createButtonsLettersEvolution } = require('../../functions/evolutionButtonCreate');
module.exports = {
  data: {
    name: `evo_two`,
  },
  async execute(interaction) {
    const botoes = createButtonsLettersEvolution();
    await interaction.reply({
      content: 'Escolha a inicial do pokémon base para tentar chegar à evolução 2',
      components: [botoes],
      ephemeral: true,
    });
  },
};
