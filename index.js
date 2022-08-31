require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const conn = require('./db/conn');
const TOKEN = process.env.TOKEN;

//Criar uma nova instância do client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// const client = new Client({ intents: 32767 });

//cria uma nova coleção
client.commands = new Collection();
client.buttons = new Collection();

//path dos componentes
const componentsPath = path.join(__dirname, 'components');
const componentsFolders = fs.readdirSync(componentsPath);

for (const folder of componentsFolders) {
  const componentsFilesPath = path.join(componentsPath, folder);
  const componentsFiles = fs
    .readdirSync(componentsFilesPath)
    .filter((file) => file.endsWith('.js'));

  switch (folder) {
    case 'buttons':
      for (const file of componentsFiles) {
        const filePath = path.join(componentsFilesPath, file);
        const button = require(filePath);
        client.buttons.set(button.data.name, button);
      }
      break;
  }
}

//path dos comandos
const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

for (const file of commandsFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  //Define um novo item na coleção com a chave como nome do comando e o valor como módulo exportado
  client.commands.set(command.data.name, command);
}

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
