const PlayerDB = require('../../models/Player');
const { starterPokemon } = require('../../controllers/CatchController');
const { checkIfExistsAndCreate } = require('../../controllers/PlayerController');

module.exports = {
  data: {
    name: `charmander`,
  },
  async execute(interaction) {
    try {
      const user = await checkIfExistsAndCreate(interaction.user.tag, interaction.user.id).then(
        (result) => result.toJSON()
      );

      if (!user.got_initial) {
        await starterPokemon(interaction.customId, interaction.user.id);
        await PlayerDB.update(
          { got_initial: true },
          { where: { discord_id: interaction.user.id } }
        );
        interaction.reply('Parabéns, você escolheu Charmander como pokémon inicial');
      } else {
        interaction.reply(`Já recebeu um inicial né seu espertinho!! ${interaction.user}`);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
