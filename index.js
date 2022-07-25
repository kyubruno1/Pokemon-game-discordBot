import { Client, GatewayIntentBits } from 'discord.js'
import { config } from 'dotenv'

config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})
const TOKEN = process.env.TOKEN
client.login(TOKEN)

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`)
})

client.on('messageCreate', (message) => {
    console.log(message.content)
    if (message.content === 'ping') {
        message.reply('Pong!')
        .then(() => console.log(`Respondendo a mensagem: ${message.content}`))
        .catch((err) => console.log(err))
    }
})