const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require('discord.js');
const fs = require('fs');
const path = require('path');
const cooldown = require('../helpers/cooldown');
const { findWildPokemon } = require('../controllers/PokemonController');
const { pokemonLevelDice, isShiny, dice } = require('../helpers/dice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('encontrar')
    .setDescription('Encontra um pokémon no mundo'),
  async execute(interaction) {
    if (cooldown(interaction.user.id)) {
      await interaction.reply({
        content: 'Apressadinho hein? Espera o cooldown aí!',
        ephemeral: true,
      });
    } else {
      //encontro do pokemon
      const encounterPath = path.join(__dirname, '..', 'assets', 'data', 'encounter_method.json');
      let encounter = fs.readFileSync(encounterPath, { encoding: 'utf8', flag: 'r' });
      const encounterJson = JSON.parse(encounter);
      const returnEncounter = (index) => {
        return encounterJson[index];
      };

      //pokemon status
      const pokemon = await findWildPokemon();
      const pokemonLevel = pokemonLevelDice();
      const pokemonIsShiny = isShiny();
      let pokemonSprite = pokemon.sprites.other.home.front_default;
      if (pokemonIsShiny) {
        pokemon.name = `🌟 ${pokemon.name}`;
        pokemonSprite = pokemon.sprites.other.home.front_shiny;
      }

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('catch').setLabel('Capturar').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId('battle').setLabel('Batalhar').setStyle(ButtonStyle.Danger)
      );

      const EmbedPokemon = new EmbedBuilder()
        .setColor('EE1515')
        .setTitle('Encontrou um pokémon')
        .setAuthor({
          name: 'Escolha nos botões abaixo a ação a tomar',
          iconURL: 'https://pngimg.com/uploads/pokeball/pokeball_PNG8.png',
        })
        .setDescription(
          `Encontrou um ${pokemon.name} ${returnEncounter(dice(encounterJson.length - 1))}`
        )
        .addFields(
          { name: 'Nome', value: `${pokemon.name}` },
          // { name: '\u200B', value: '\u200B' },
          { name: 'N. Pokédex', value: `#${pokemon.id}`, inline: true },
          { name: 'Level', value: `${pokemonLevel}`, inline: true },
          { name: 'Shiny?', value: `${pokemonIsShiny}`, inline: true },
          { name: 'Exp ao derrotar', value: `${pokemon.base_experience}`, inline: true }
        )
        .setImage(`${pokemonSprite}`)
        .setTimestamp();

      await interaction.reply({
        // content: `${pokemon.name}, ${pokemon.id}, ${interaction.user}`,
        // ephemeral: true,
        components: [row],
        embeds: [EmbedPokemon],
      });
    }
  },
};
