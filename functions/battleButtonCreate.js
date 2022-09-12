const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

function createButtons() {
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId('a-e').setLabel('A-E').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('f-j').setLabel('F-J').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('k-o').setLabel('K-O').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('p-t').setLabel('P-T').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('u-z').setLabel('U-Z').setStyle(ButtonStyle.Primary)
  );
  return row;
}

function coletor(interaction, row) {
  const collector = interaction.channel.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: 4000,
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
}

module.exports = { createButtons, coletor };
