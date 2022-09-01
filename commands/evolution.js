const { SlashCommandBuilder } = require('discord.js');
const cooldownFind = require('../helpers/cooldownFind');
const { getOnePokemon } = require('../controllers/CatchController');

module.exports = {
  data: new SlashCommandBuilder().setName('evoluir').setDescription('Evolui um pokémon'),
  async execute(interaction) {
    interaction.reply('Calma lá amigão, tamo em desenvolvimento!');
    // getOnePokemon(27, interaction.user.id);
    // interaction.reply(getOnePokemon('27', interaction.user.id));
  },
};
