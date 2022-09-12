const { getAllPokemons } = require('../../controllers/CatchController');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
  data: {
    name: `battle`,
  },
  async execute(interaction) {
    try {
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('a-e').setLabel('A-E').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId('f-j').setLabel('F-J').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId('k-o').setLabel('K-O').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId('p-t').setLabel('P-T').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId('u-z').setLabel('U-Z').setStyle(ButtonStyle.Primary)
      );

      //cria coletor para saber se usuário já clicou no botão
      const collector = interaction.channel.createMessageComponentCollector({
        componentType: ComponentType.Button,
        time: 30000,
      });

      collector.on('collect', async (i) => {
        if (i.user.id === interaction.user.id) {
          row.components[0].setDisabled(true);
          row.components[1].setDisabled(true);
          row.components[2].setDisabled(true);
          row.components[3].setDisabled(true);
          row.components[4].setDisabled(true);

          interaction.editReply({ components: [row] });
        }
      });
      collector.on('end', async (i) => {
        row.components[0].setDisabled(true);
        row.components[1].setDisabled(true);
        row.components[2].setDisabled(true);
        row.components[3].setDisabled(true);
        row.components[4].setDisabled(true);
        interaction.editReply({ content: 'Acabou o tempo!', components: [row] });
      });

      await interaction.reply({
        content: 'Escolha a inicial do pokemon que deseja escolher',
        components: [row],
      });
    } catch (error) {
      console.log(error);
    }
  },
};
