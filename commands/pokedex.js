const { SlashCommandBuilder } = require('discord.js');
const cooldown = require('../helpers/cooldown');
const { getAllPokemons } = require('../controllers/CatchController');

module.exports = {
  data: new SlashCommandBuilder().setName('pokedex').setDescription('Mostra seus pokémons'),
  async execute(interaction) {
    try {
      const pokemons = await getAllPokemons(interaction.user.id);

      let array = [];
      pokemons.forEach((el) => {
        array.push(el.name);
      });
      interaction.reply(array.toString());
    } catch (error) {
      console.log(error);
    }
  },
};
