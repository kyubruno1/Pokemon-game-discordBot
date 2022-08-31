const PokemonDB = require('../../models/Pokemon');
const { PokemonId } = require('../../commands/find');
module.exports = {
  data: {
    name: `catch`,
  },
  async execute(interaction) {
    // console.log(interaction);
    console.log(interaction.message.embeds[0].data);
  },
};
