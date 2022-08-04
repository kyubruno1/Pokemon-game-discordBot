import { Client, GatewayIntentBits, AttachmentBuilder, EmbedBuilder, Routes } from 'discord.js';
import { config } from 'dotenv';
import { REST } from '@discordjs/rest';
import catchCommand from './commands/catch.js';
import { fetchPokemon, pokemonEvo } from './controllers/CatchController.js';
import conn from './db/conn.js';

config();

const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID_SINDICATO = process.env.GUILD_ID_SINDICATO;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () => console.log(`${client.user.tag} has logged in`));

client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'capturar') {
            try {
                let pokemonName = await fetchPokemon();
                const author = interaction.user;

                interaction.reply(`${pokemonName.name}, ${pokemonName.id}, ${author} `);
            } catch (error) {
                console.log(error);
            }
        }
    }
});

async function main() {
    const commands = [catchCommand];
    try {
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
        });
        client.login(TOKEN);
    } catch (error) {
        console.log(error);
    }
}
main();

conn.sync()
    .then(console.log('Conectado ao banco Agumon'))
    .catch((err) => console.log(err));
