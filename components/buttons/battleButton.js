const { getAllPokemons } = require('../../controllers/CatchController');
const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');

module.exports = {
  data: {
    name: `battle`,
  },
  async execute(interaction) {
    console.log('botão battle');
    try {
      const pokemons = await getAllPokemons(interaction.user.id);

      // console.log(pokemons);

      let optionsArray = [];

      pokemons.forEach((el) => {
        option = {
          label: el.name,
          description: el.name,
          value: el.name,
        };
        // optionsArray.push(`#${el.id} - ${el.name}\n`);
        optionsArray.push(option);
      });
      console.log(optionsArray);
      const row = new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
          .setCustomId('select')
          .setPlaceholder('Escolha o pokémon para a batalha')
          .addOptions(optionsArray)
      );
      await interaction.reply({ components: [row] });
    } catch (error) {
      console.log(error);
    }
  },
};
