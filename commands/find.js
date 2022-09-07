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
const cooldownFind = require('../helpers/cooldownFind');
const { findWildPokemon } = require('../controllers/PokemonController');
const { pokemonLevelDice, isShinyDice, dice } = require('../helpers/dice');
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
      const cooldown = cooldownFind(interaction.user.id);
      if (cooldown) {
        // const agora = new Date();
        const now = Date.now();
        console.log(now);
        const diffMs = cooldown - now;

        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

        await interaction.reply({
          content: `Apressadinho hein? Espera o cooldown aí! Faltam: ${minutes}m ${seconds}s`,
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
        const pokemonIsShiny = isShinyDice();
        let pokemonSprite = pokemon.sprites.other.home.front_default;
        if (pokemonIsShiny) {
          pokemon.name = `🌟 ${pokemon.name}`;
          pokemonSprite = pokemon.sprites.other.home.front_shiny;
        }
        const growthRate = ['Muito lento', 'Lento', 'Normal', 'Rápido', 'Muito rápido'];
        const growthRandom = Math.floor(Math.random() * growthRate.length);
        //cria os botoes
        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('catch')
            .setLabel('Capturar')
            .setEmoji('🔴')
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId('battle')
            .setLabel('Batalhar')
            .setEmoji('⚔️')
            .setStyle(ButtonStyle.Danger)
        );

        //cria o embed
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
            { name: '\u200B', value: '\u200B' },
            { name: 'Nome', value: `${pokemon.name}`, inline: true },
            { name: 'N. Pokédex', value: `#${pokemon.id}`, inline: true },
            { name: 'Level', value: `${pokemonLevel}`, inline: true },
            { name: 'Shiny', value: `${pokemonIsShiny}`, inline: true },
            { name: 'Taxa de cresc.', value: `${growthRate[growthRandom]}`, inline: true },
            { name: 'Exp ao derrotar', value: `${pokemon.base_experience}`, inline: true }
          )
          .setImage(`${pokemonSprite}`)
          .setTimestamp();

        //cria coletor para saber se usuário já clicou no botão
        const collector = interaction.channel.createMessageComponentCollector({
          componentType: ComponentType.Button,
          time: 30000,
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
        collector.on('end', async (i) => {
          row.components[0].setDisabled(true); //desabilita botão capturar
          row.components[1].setDisabled(true); //desabilita botão batalhar
          interaction.editReply({ content: 'Acabou o tempo!', components: [row] });
        });
        // if (acabou == true) {
        // }
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
