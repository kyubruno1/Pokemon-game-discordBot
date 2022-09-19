const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('info').setDescription('Informações sobre o jogo'),
  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        // .setCustomId('info')
        .setLabel('Informações sobre o jogo')
        .setStyle(ButtonStyle.Link)
        .setURL(
          'https://reinvented-manager-4d6.notion.site/Informa-es-sobre-o-Agumon-o-pokebot-5161d47c33764f829e05a4d644750099'
        )
    );

    await interaction.reply({ content: '🤓', components: [row] });
    // await interaction.reply('Informações sobre o jogo');
    // await interaction.followUp('Calma lá amigão, tamo em desenvolvimento!');
  },
};
