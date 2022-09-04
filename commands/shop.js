const { SlashCommandBuilder } = require('discord.js');
const InventoryDB = require('../models/Inventory');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('loja')
    .setDescription('Loja para comprar pokebolas e itens de evolução')
    .addStringOption((option) =>
      option
        .setName('item')
        .setDescription('Escolha o item para comprar')
        .setRequired(true)
        .addChoices(
          { name: 'Pokebola - 100 moedas', value: 'pokeball' },
          { name: 'Item de evolução tier 1 - 250 moedas', value: 'itemEvo1' },
          { name: 'Item de evolução tier 2 - 500 moedas', value: 'itemEvo2' },
          { name: 'Item de evolução tier 3 - 750 moedas', value: 'itemEvo3' }
        )
    )
    .addStringOption((option) =>
      option.setName('quantidade').setDescription('Adicione a quantidade').setRequired(true)
    ),
  async execute(interaction) {
    //resgata inventario
    const playerInventory = await InventoryDB.findOne({
      where: { PlayerDiscordId: interaction.user.id },
    }).then((res) => res.toJSON());

    if (!playerInventory) {
      interaction.reply({
        content: `Digite /inicial para escolher seu pokémon inicial primeiro!`,
        ephemeral: true,
      });
      return;
    }

    let moedas = playerInventory.moedas;
    let pokeball = playerInventory.pokeball;
    let evo_item_1 = playerInventory.evo_item_1;
    let evo_item_2 = playerInventory.evo_item_2;
    let evo_item_3 = playerInventory.evo_item_3;

    const prices = [100, 250, 500, 750];

    const shopItem = interaction.options._hoistedOptions[0].value;
    const quantity = interaction.options._hoistedOptions[1].value;

    let price = moedas - prices[0] * quantity;

    if (shopItem == 'pokeball') {
      if (price < 0) {
        await interaction.reply({ content: `Você não tem saldo suficiente` });
      } else {
        pokeball += +quantity;
        await InventoryDB.update(
          { moedas: price, pokeball: pokeball },
          { where: { PlayerDiscordId: interaction.user.id } }
        );
        await interaction.reply({
          content: `Você comprou ${quantity} pokebolas por ${prices[0] * quantity} moedas`,
          ephemeral: true,
        });
      }
    } else if (shopItem == 'itemEvo1') {
      if (price < 0) {
        await interaction.reply({ content: `Você não tem saldo suficiente` });
      } else {
        evo_item_1 += +quantity;
        await InventoryDB.update(
          { moedas: price, evo_item_1: evo_item_1 },
          { where: { PlayerDiscordId: interaction.user.id } }
        );
        await interaction.reply({
          content: `Você comprou ${quantity} item de evolução tier 1 por ${
            prices[1] * quantity
          } moedas`,
          ephemeral: true,
        });
      }
    } else if (shopItem == 'itemEvo2') {
      if (price < 0) {
        await interaction.reply({ content: `Você não tem saldo suficiente` });
      } else {
        evo_item_2 += +quantity;
        await InventoryDB.update(
          { moedas: price, evo_item_2: evo_item_2 },
          { where: { PlayerDiscordId: interaction.user.id } }
        );
        await interaction.reply({
          content: `Você comprou ${quantity} item de evolução tier 2 por ${
            prices[2] * quantity
          } moedas`,
          ephemeral: true,
        });
      }
    } else if (shopItem == 'itemEvo3') {
      if (price < 0) {
        await interaction.reply({ content: `Você não tem saldo suficiente` });
      } else {
        evo_item_3 += +quantity;
        await InventoryDB.update(
          { moedas: price, evo_item_3: evo_item_3 },
          { where: { PlayerDiscordId: interaction.user.id } }
        );
        await interaction.reply({
          content: `Você comprou ${quantity} item de evolução tier 2 por ${
            prices[3] * quantity
          } moedas`,
          ephemeral: true,
        });
      }
    }
  },
};
