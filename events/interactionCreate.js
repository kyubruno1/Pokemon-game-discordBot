module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.log(error);
        await interaction.reply({
          content: 'Ocorreu um erro executando este comando.',
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const button = interaction.client.buttons.get(interaction.customId);

      if (!button) return;
      try {
        await button.execute(interaction);
      } catch (error) {
        console.log(error);
      }
    }
  },
};
