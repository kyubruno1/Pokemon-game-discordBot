const fs = require('fs');
const path = require('path');
const {
  SlashCommandBuilder,
  ActionRowBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require('discord.js');
const InventoryDB = require('../models/Inventory');
const dailyCooldown = require('../helpers/dailyCooldown');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quizdiario')
    .setDescription('Quiz diário. Jogue para receber premios!'),
  async execute(interaction) {
    //
    //busca player na db
    const player = await InventoryDB.findOne({ where: { PlayerDiscordId: interaction.user.id } });

    //recompensa por ter acertado a questão

    if (!player) {
      interaction.reply({
        content: `Digite /inicial para escolher seu pokémon inicial primeiro!`,
        ephemeral: true,
      });
    } else {
      const cooldown = dailyCooldown(interaction.user.id);
      const playerJSON = player.toJSON();
      const premio = [playerJSON.pokeball + 5, playerJSON.moedas + 100];
      if (cooldown) {
        const agora = new Date();
        const now = Date.now();
        const diffMs = cooldown - now;

        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

        await interaction.reply({
          content: `Apressadinho hein? Espera o cooldown aí! Faltam: ${hours}h ${minutes}m ${seconds}s`,
          ephemeral: true,
        });
      } else {
        // busca o arquivo com as perguntas e realiza o parse e cria a chance randomica
        const quizPath = path.join(__dirname, '..', 'assets', 'data', 'quiz.json');
        const quizFile = fs.readFileSync(quizPath, { encoding: 'utf8', flag: 'r' });
        const quizJSON = JSON.parse(quizFile);
        const random = Math.floor(Math.random() * quizJSON.length);

        //funções helpers
        function answerQuiz(answer) {
          if (answer == quizJSON[random].answer) {
            return true;
          }
          return false;
        }

        async function atualizaBd() {
          await InventoryDB.update(
            { pokeball: premio[0], moedas: premio[1] },
            { where: { PlayerDiscordId: interaction.user.id } }
          );
        }

        // cria o embed da pergunta
        const file = new AttachmentBuilder('assets/images/pokemonquiz.jpg');
        const embedQuiz = new EmbedBuilder()
          .setColor('EE1515')
          .setTitle(quizJSON[random].question)
          .setAuthor({
            name: 'Você tem 1 minuto para responder e receber prêmios',
            iconURL: 'https://pngimg.com/uploads/pokeball/pokeball_PNG8.png',
          })
          .setDescription(
            `1- ${quizJSON[random].choices[0]}\n\n2- ${quizJSON[random].choices[1]}\n\n3- ${quizJSON[random].choices[2]}`
          )
          .setImage(`attachment://pokemonquiz.jpg`)
          .setTimestamp();

        // responde o comando
        const message = await interaction.reply({
          embeds: [embedQuiz],
          files: [file],
          fetchReply: true,
          // ephemeral: true,
        });

        // cria as primeiras reações na mensagem
        try {
          await message.react('1️⃣');
          await message.react('2️⃣');
          await message.react('3️⃣');
        } catch (error) {
          console.error('Um dos emojis falhou ao reagir: ', error);
        }

        // cria o filtro dos emojis
        const botId = 1001171937705336954;
        const filter = (reaction, user) => {
          //verifica se o usuario que reagiu é o autor da interação, se não for, remove a reação dele
          const sorter =
            (['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) && user.id === interaction.user.id) ||
            botId === reaction.message.author.id;
          if (sorter) {
            return sorter;
          } else {
            const userReactions = message.reactions.cache.filter((reaction) =>
              reaction.users.cache.has(user.id)
            );
            try {
              for (const reaction of userReactions.values()) {
                reaction.users.remove(user.id);
              }
            } catch (error) {
              console.error('Falhou ao remover reação.');
            }
          }
        };

        // espera receber a reação
        message
          .awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
          .then((collected) => {
            const reaction = collected.first();

            if (reaction.emoji.name === '1️⃣') {
              if (answerQuiz(quizJSON[random].choices[0])) {
                atualizaBd();
                message.reply(
                  `Parabéns ${interaction.user}! Você recebeu: 5 pokebolas e 100 moedas por ter acertado o quiz de hoje\nAgora você tem: ${premio[0]} pokebolas e ${premio[1]} moedas`
                );
              } else {
                message.reply({
                  content: 'Infelizmente você errou, tente novamente amanhã ',
                  ephemeral: true,
                });
              }
            } else if (reaction.emoji.name === '2️⃣') {
              if (answerQuiz(quizJSON[random].choices[1])) {
                atualizaBd();
                message.reply(
                  `Parabéns ${interaction.user}! Você recebeu: 5 pokebolas e 100 moedas por ter acertado o quiz de hoje\nAgora você tem: ${premio[0]} pokebolas e ${premio[1]} moedas`
                );
              } else {
                message.reply({
                  content: 'Infelizmente você errou, tente novamente amanhã ',
                  ephemeral: true,
                });
              }
            } else if (reaction.emoji.name === '3️⃣') {
              if (answerQuiz(quizJSON[random].choices[2])) {
                atualizaBd();
                message.reply(
                  `Parabéns ${interaction.user}! Você recebeu: 5 pokebolas e 100 moedas por ter acertado o quiz de hoje\nAgora você tem: ${premio[0]} pokebolas e ${premio[1]} moedas`
                );
              } else {
                message.reply({
                  content: 'Infelizmente você errou, tente novamente amanhã ',
                  ephemeral: true,
                });
              }
            }
          })
          .catch((collected) => {
            message.reply({ content: 'Você não respondeu a tempo... ', ephemeral: true });
          });
      }
    }
  },
};
