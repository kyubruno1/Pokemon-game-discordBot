const { SlashCommandBuilder } = require('discord.js');
const cooldown = require('../helpers/cooldown');
const { getOnePokemon } = require('../controllers/CatchController');

module.exports = {
  data: new SlashCommandBuilder().setName('evoluir').setDescription('Evolui um pokémon'),
  async execute(interaction) {
    // console.log('Funcionou o evoluir!');
    // getOnePokemon(27, interaction.user.id);
    // interaction.reply(getOnePokemon('27', interaction.user.id));
  },
};
