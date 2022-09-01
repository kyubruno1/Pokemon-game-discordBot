const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ComponentType,
} = require('discord.js');
const fs = require('fs');
const path = require('path');
const cooldown = require('../helpers/cooldown');
const { findWildPokemon } = require('../controllers/PokemonController');
const { pokemonLevelDice, isShiny, dice } = require('../helpers/dice');
const InventoryDB = require('../models/Inventory');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('encontrar')
    .setDescription('Encontra um pokémon no mundo'),
  async execute(interaction) {
    const playerInventory = await InventoryDB.findOne({
      where: { PlayerDiscordId: interaction.user.id },
    });

    //se nao existir envia reply
    if (!playerInventory) {
      interaction.reply({
        content: `Digite /inicial para escolher seu pokémon inicial primeiro!`,
        ephemeral: true,
      });
    } else {
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

        //descrição do encontro
        const locationPath = path.join(__dirname, '..', 'assets', 'data', 'location.json');
        let location = fs.readFileSync(locationPath, { encoding: 'utf8', flag: 'r' });
        const locationJson = JSON.parse(location);
        const returnLocation = (index) => {
          return locationJson[index];
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
          new ButtonBuilder()
            .setCustomId('catch')
            .setLabel('Capturar')
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId('battle')
            .setLabel('Batalhar')
            .setStyle(ButtonStyle.Danger)
        );

        const EmbedPokemon = new EmbedBuilder()
          .setColor('EE1515')
          .setTitle('Encontrou um pokémon')
          .setAuthor({
            name: 'Escolha nos botões abaixo a ação a tomar',
            iconURL: 'https://pngimg.com/uploads/pokeball/pokeball_PNG8.png',
          })
          .setDescription(
            `Encontrou um ${pokemon.name} em ${returnLocation(
              dice(locationJson.length - 1)
            )} ${returnEncounter(dice(encounterJson.length - 1))}`
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

        //cria coletor para saber se usuário já clicou no botão
        const collector = interaction.channel.createMessageComponentCollector({
          componentType: ComponentType.Button,
          time: 15000,
        });
        collector.on('collect', async (i) => {
          if (i.user.id === interaction.user.id) {
            if (i.customId === 'catch') {
              row.components[0].setDisabled(true); //desabilita botão capturar
              row.components[1].setDisabled(true); //desabilita botão batalhar
            }
            if (i.customId === 'battle') {
              row.components[0].setDisabled(true); //desabilita botão capturar
              row.components[1].setDisabled(true); //desabilita botão batalhar
            }
            interaction.editReply({ components: [row] });
          }
        });

        await interaction.reply({
          content: `${interaction.user}`,
          // ephemeral: true,
          components: [row],
          embeds: [EmbedPokemon],
        });
      }
    }
  },
};
