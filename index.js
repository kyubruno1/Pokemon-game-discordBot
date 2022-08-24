require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const conn = require('./db/conn');
const TOKEN = process.env.TOKEN;

//Criar uma nova instância do client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

//path dos comandos
const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

for (const file of commandsFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  //Define um novo item na coleção com a chave como nome do comando e o valor como módulo exportado
  client.commands.set(command.data.name, command);
}

//Quando o client estiver pronto, este código vai rodar uma vez
// client.once('ready', () => {
//   console.log(`${client.user.tag} logou com sucesso!`);
// });

//Cria as interações
// client.on('interactionCreate', async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   const command = client.commands.get(interaction.commandName);

//   if (!command) return;

//   try {
//     await command.execute(interaction);
//   } catch (error) {
//     console.log(error);
//     await interaction.reply({
//       content: 'Ocorreu um erro executando este comando.',
//       ephemeral: true,
//     });
//   }
// });

//path dos eventos
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(TOKEN);

//Realiza conexão com o banco de dados
conn
  .sync()
  .then(console.log('Conectado ao banco Agumon'))
  .catch((err) => console.log(err));
