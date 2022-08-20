/*
Este arquivo só é necessário executar uma vez toda vez que adicionar um comando novo
*/
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const GUILD_ID_SINDICATO = process.env.GUILD_ID_SINDICATO;
const TOKEN = process.env.TOKEN;

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(TOKEN);

rest
  .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
  .then(() => console.log('Comandos registrados com sucesso.'))
  .catch(console.error);

rest
  .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID_SINDICATO), { body: commands })
  .then(() => console.log('Comandos registrados com sucesso.'))
  .catch(console.error);
//remove um comando (ir em config do server -> integrações -> ícone de "/" -> botão direito em cima do comando desejado e copiar ID),
//também não esquecer de tirar ele do método acima
// rest
//   .delete(Routes.applicationGuildCommand(CLIENT_ID, GUILD_ID), 'commandId'))
//   .then(() => console.log('Successfully deleted guild command'))
//   .catch(console.error);

//deletar todos os comandos
// rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })
// 	.then(() => console.log('Successfully deleted all guild commands.'))
// 	.catch(console.error);
