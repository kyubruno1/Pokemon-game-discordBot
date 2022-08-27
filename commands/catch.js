const { SlashCommandBuilder } = require('discord.js');
const cooldown = require('../helpers/cooldown');
const PlayerDB = require('../models/Player.js');
const { catchPokemon } = require('../controllers/CatchController');
// const { savePlayer, checkIfExists } = require('../controllers/PlayerController');

module.exports = {
  data: new SlashCommandBuilder().setName('capturar').setDescription('Capturar um pokémon'),
  async execute(interaction) {
    await PlayerDB.findOrCreate({
      where: { name: interaction.user.tag, discord_id: interaction.user.id },
    });

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
