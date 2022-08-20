const { SlashCommandBuilder } = require('discord.js');
const cooldown = require('../helpers/cooldown');
const { catchPokemon } = require('../controllers/CatchController');

module.exports = {
  data: new SlashCommandBuilder().setName('capturar').setDescription('Capturar um pokémon'),
  async execute(interaction) {
    if (cooldown(interaction.user.id)) {
      await interaction.reply({
        content: 'Apressadinho hein? Espera o cooldown aí!',
        ephemeral: true,
      });
    } else {
      const pokemon = await catchPokemon(interaction.user.id);
      await interaction.reply(`${pokemon.name}, ${interaction.user}`);
    }
  },
};
