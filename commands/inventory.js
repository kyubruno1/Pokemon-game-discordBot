const { SlashCommandBuilder, EmbedBuilder, bold } = require('discord.js');
const InventoryDB = require('../models/Inventory');

module.exports = {
  data: new SlashCommandBuilder().setName('inventario').setDescription('Veja seu inventário!'),
  async execute(interaction) {
    //busca inventario
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
      //se existir, salva para json e cria o reply
      inventory = await playerInventory.toJSON();

      //--construir embed

      const exampleEmbed = new EmbedBuilder()
        .setColor('EE1515')
        .setTitle('Inventário')
        .addFields(
          {
            name: '<:moedas:1014715230993010759> Moedas ',
            value: `${inventory.moedas}`,
            inline: true,
          },
          {
            name: '<:pokeball:1014715573571166280> Pokebolas ',
            value: `${inventory.pokeball}`,
            inline: true,
          },
          {
            name: '<:evo_1:1014713796230656030> Item de evo. 1 ',
            value: `${inventory.evo_item_1}`,
            inline: true,
          },
          {
            name: '<:evo_2:1014713911670493184> Item de evo. 2 ',
            value: `${inventory.evo_item_2}`,
            inline: true,
          },
          {
            name: '<:evo_3:1014713940678283365> Item de evo. 3 ',
            value: `${inventory.evo_item_3}`,
            inline: true,
          },
          {
            name: ' <:pokeball:1014715573571166280>',
            value: ' <:pokeball:1014715573571166280>',
            inline: true,
          },
          { name: '\u200B', value: '\u200B' },
          {
            name: '<:Insigniarocha:1014717728206098472> Insignia do pedregulho',
            value: `${inventory.insignia_pedregulho}`,
            inline: true,
          },
          {
            name: '<:insigniaalma:1014718728245612605> Insignia da alma',
            value: `${inventory.insignia_alma}`,
            inline: true,
          },
          {
            name: '<:insigniaarcoiris:1014718729445183518> Insignia do arco-íris',
            value: `${inventory.insignia_arco_iris}`,
            inline: true,
          },
          {
            name: '<:insigniacascata:1014718730657353828> Insignia da cascata',
            value: `${inventory.insignia_cascata}`,
            inline: true,
          },
          {
            name: '<:insignialama:1014718731835936858> Insignia do pântano',
            value: `${inventory.insignia_pantano}`,
            inline: true,
          },
          {
            name: '<:insigniaterra:1014718733295562812> Insignia da terra',
            value: `${inventory.insignia_terra}`,
            inline: true,
          },
          {
            name: '<:insigniatrovao:1014718734616760380> Insignia do trovão',
            value: `${inventory.insignia_trovao}`,
            inline: true,
          },
          {
            name: '<:insigniavulcao:1014718735958933575> Insignia do vulcão',
            value: `${inventory.insignia_vulcao}`,
            inline: true,
          },
          {
            name: ' <:pokeball:1014715573571166280>',
            value: ' <:pokeball:1014715573571166280>',
            inline: true,
          }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [exampleEmbed] });
    }
  },
};
