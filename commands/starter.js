const { SlashCommandBuilder } = require('discord.js');

const choseInitial = [];
module.exports = {
  data: new SlashCommandBuilder().setName('inicial').setDescription('Escolha um Pokémon inicial!'),
  async execute(interaction) {
    if (choseInitial.includes(interaction.user.id)) {
      interaction.reply({
        content: 'Não é permitido escolher dois pokémons iniciais.',
        ephemeral: true,
      });
    } else {
      choseInitial.push(interaction.user.id);
      console.log(choseInitial);
      interaction.reply('Parabens pelo seu pokémon');
    }
  },
};
