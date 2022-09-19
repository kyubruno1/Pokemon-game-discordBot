const { createButtons, collector } = require('../../functions/battleButtonCreate');
const fs = require('fs');
const path = require('path');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
  data: {
    name: `battle`,
  },
  async execute(interaction) {
    try {
      const row = createButtons();

      //cria coletor para saber se usuário já clicou no botão
      collector(interaction, row);

      const expPath = path.join(
        __dirname,
        '..',
        '..',
        'assets',
        'data',
        'playerBattlePokemon',
        `${interaction.user.id}.json`
      );

      const pokeName = interaction.message.embeds[0].data.fields[1].value;
      const pokeLvl = interaction.message.embeds[0].data.fields[3].value;
      const pokeId = interaction.message.embeds[0].data.fields[2].value;
      const pokeDefeatExp = interaction.message.embeds[0].data.fields[6].value;

      const data = {
        id: pokeId,
        name: pokeName,
        level: pokeLvl,
        gainExp: pokeDefeatExp,
      };

      fs.writeFileSync(expPath, JSON.stringify(data), (err) => {
        console.log('criou');
        if (err) throw err;
      });

      await interaction.reply({
        content: 'Escolha a inicial do pokemon que deseja escolher',
        components: [row],
        ephemeral: true,
        // values: 'teste',
      });
    } catch (error) {
      console.log(error);
    }
  },
};
