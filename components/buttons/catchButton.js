const InventoryDB = require('../../models/Inventory');

module.exports = {
  data: {
    name: `catch`,
  },
  async execute(interaction) {
    const cleanUserId = interaction.message.content.replace(/[^0-9]/g, '');

    if (cleanUserId === interaction.user.id) {
      //busca inventário do usuário
      const playerInventory = await InventoryDB.findOne({
        where: { PlayerDiscordId: cleanUserId },
      });

      /* 
        AQUI É ONDE A LÓGICA DE CAPTURA VAI FICAR 
        */
      if (playerInventory.pokeball <= 0) {
        interaction.reply({
          content: `Infelizmente você não tem pokébolas, ganhe batalhas de outros pokémons e compre pokebolas na loja`,
          ephemeral: true,
        });
      } else {
        interaction.reply({
          content: `Logo menos vai funcionar belezinha`,
          ephemeral: true,
        });
      }

      // console.log(interaction.message.embeds[0].data);
    } else {
      interaction.reply({
        content: `Pavor parar de clicar no botão do amiguinho`,
        ephemeral: true,
      });
    }
  },
};
