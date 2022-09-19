const { SlashCommandBuilder } = require('discord.js');
const { getAllPokemons } = require('../controllers/CatchController');
const { createButtonsEvolution, collector } = require('../functions/evolutionButtonCreate');

module.exports = {
  data: new SlashCommandBuilder().setName('evoluir').setDescription('Evolui um pokémon'),
  async execute(interaction) {
    const row = createButtonsEvolution();

    //cria coletor para saber se usuário já clicou no botão
    // collector(interaction, row);

    await interaction.reply({
      content: `Escolha o nível de evolução que deseja fazer.
            Exemplos:
            Base → Evolução 1 = **Bulbasaur → Ivysaur**
            Evolução 1 → Evolução 2 = **Ivysaur → Venusaur**

    Requisitos:
            Base → Evolução 1 = **Level 35**
            Evolução 1 → Evolução 2 = **level 75**`,
      components: [row],
      ephemeral: true,
    });
  },
};
