const { SlashCommandBuilder } = require('discord.js');
const { getAllPokemons } = require('../controllers/CatchController');

module.exports = {
  data: new SlashCommandBuilder().setName('pokedex').setDescription('Mostra seus pokémons'),
  async execute(interaction) {
    try {
      const pokemons = await getAllPokemons(interaction.user.id);

      //Preenche o array
      const pokeArray = [];
      pokemons.forEach((item) => {
        const clean = item.pokedex_id.replace('#', '');
        // console.log(item);
        let pokemon = {
          pokedex_id: `${clean}`,
          pokemon_name: `${item.name}`,
          pokemon_level: `${item.total_exp}`,
        };
        pokeArray.push(pokemon);
        // pokeArray.push(`\n**Pokedex**: #${clean}\n - ${item.name} - LVL ${item.total_exp}\n`);
      });

      //Organiza o array do menor id para o maior
      pokeArray.sort(function (a, b) {
        return a.pokedex_id - b.pokedex_id;
      });

      arrayFinal = [];
      pokeArray.forEach((item) => {
        arrayFinal.push(
          `\n**Pokedex**: #${item.pokedex_id}\n ${item.pokemon_name} - LVL ${item.pokemon_level}\n`
        );
      });
      interaction.reply({ content: `${arrayFinal.join('--------------')}`, ephemeral: true });
    } catch (error) {
      console.log(error);
    }
  },
};
