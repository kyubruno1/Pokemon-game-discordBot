const { SlashCommandBuilder, codeBlock, bold, blockQuote } = require('discord.js');
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
      interaction.reply(
        `${bold('SEU INVENTÁRIO:')} 
      \n<:pokeball:1014715573571166280> Pokebolas:  ${inventory.pokeball} un.
      \n<:moedas:1014715230993010759> Moedas:  ${inventory.moedas} un.
      \n<:evo_1:1014713796230656030> Item de evolução tier 1:  ${inventory.evo_item_1} un.
      \n<:evo_2:1014713911670493184> Item de evolução tier 2:  ${inventory.evo_item_2} un.
      \n<:evo_3:1014713940678283365> Item de evolução tier 3:  ${inventory.evo_item_3} un.
    \n\n${bold('SUAS INSIGNIAS:')}
    \n<:Insigniarocha:1014717728206098472> Insignia do pedregulho:  ${inventory.insignia_pedregulho}
    \n<:insigniaalma:1014718728245612605> Insignia da alma:  ${inventory.insignia_alma}
    \n<:insigniaarcoiris:1014718729445183518> Insignia do arco-íris:  ${
      inventory.insignia_arco_iris
    }
    \n<:insigniacascata:1014718730657353828> Insignia da cascata:  ${inventory.insignia_cascata}
    \n<:insignialama:1014718731835936858> Insignia do pântano:  ${inventory.insignia_pantano}
    \n<:insigniaterra:1014718733295562812> Insignia da terra:  ${inventory.insignia_terra}
    \n<:insigniatrovao:1014718734616760380> Insignia do trovão:  ${inventory.insignia_trovao}
    \n<:insigniavulcao:1014718735958933575> Insignia do vulcão:  ${inventory.insignia_vulcao}`
      );
      // await interaction.reply('seu inventário');
      // await interaction.followUp('Calma lá amigão, tamo em desenvolvimento!');
    }
  },
};
