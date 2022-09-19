const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

function createButtonsEvolution() {
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('evo_one')
      .setLabel('Base → Evolução 1')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('evo_two')
      .setLabel('Evolução 1 → Evolução 2')
      .setStyle(ButtonStyle.Primary)
  );
  return row;
}

function createButtonsLettersEvolution() {
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId('evolution-ae').setLabel('A-E').setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId('evolution-fj').setLabel('F-J').setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId('evolution-ko').setLabel('K-O').setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId('evolution-pt').setLabel('P-T').setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId('evolution-uz').setLabel('U-Z').setStyle(ButtonStyle.Success)
  );
  return row;
}

function collector(interaction, row) {
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
}

module.exports = { collector, createButtonsEvolution, createButtonsLettersEvolution };
