const fs = require('fs');
const path = require('path');
const InventoryDB = require('../../models/Inventory');
const { catchPercentage } = require('../../controllers/CatchController');
const PokemonDB = require('../../models/Pokemon');

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

      let playerPokeball = playerInventory.pokeball;
      if (playerPokeball <= 0) {
        interaction.reply({
          content: `Infelizmente você não tem pokébolas, ganhe batalhas de outros pokémons e compre pokebolas na loja`,
          ephemeral: true,
        });
      } else {
        //pokemon info
        const pokemonName = interaction.message.embeds[0].fields[1].value;
        const pokemonId = interaction.message.embeds[0].fields[2].value;
        const cleanPokemonId = pokemonId.replace('#', '');
        const pokemonLevel = interaction.message.embeds[0].fields[3].value;
        const pokemonShiny = interaction.message.embeds[0].fields[4].value;
        const pokemonGrowth = interaction.message.embeds[0].fields[5].value;
        const growthRate = [
          {
            name: 'Muito lento',
            rate: 0.5,
          },
          {
            name: 'Lento',
            rate: 0.8,
          },
          {
            name: 'Normal',
            rate: 1,
          },
          {
            name: 'Rápido',
            rate: 1.5,
          },
          {
            name: 'Muito rápido',
            rate: 2,
          },
        ];
        const rate = growthRate.find((element) => element.name == pokemonGrowth);

        //modifica a quantidade de pokebola no banco de dados
        playerPokeball = playerPokeball - 1;
        playerInventory.update({ pokeball: playerPokeball });

        //recupera a tabela de exp
        const dataPath = path.join(__dirname, '..', '..', 'assets', 'data', `exp_table.json`);
        const data = fs.readFileSync(dataPath, { encoding: 'utf8', flag: 'r' });
        const expData = JSON.parse(data);

        const nextLevelExp = expData.find((item) => item.lvl == pokemonLevel);

        /* Tanto dado quanto a porcentagem são numeros de 0 a 100
        a porcentagem indica o número limite 
        exemplo: dado saiu valor 30, significa 30% de chance
        assim que rolar o dado, será dado um valor de 0 a 100. .
        Caso o número do dado for maior que a porcentagem, indica que não capturou o pokemon
        */
        const porcentagem = catchPercentage(pokemonLevel);
        const dice = Math.floor(Math.random() * 100) + 1;

        if (dice <= porcentagem) {
          await PokemonDB.create({
            name: pokemonName,
            pokedex_id: cleanPokemonId,
            growth_rate: rate.rate,
            is_shiny: pokemonShiny,
            level: pokemonLevel,
            exp_to_next_level: nextLevelExp.expToNextLevel,
            PlayerDiscordId: interaction.user.id,
          });

          interaction.reply({
            content: `${interaction.user} capturou um ${pokemonName} level ${pokemonLevel}, parabéns!`,
          });
        } else {
          interaction.reply({
            content: 'Pokemon escapou... que pena',
            ephemeral: true,
          });
        }
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
