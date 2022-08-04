const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('../config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

['commandsHandler', 'eventsHandler'].forEach(file =>
    require(`./handlers/${file}`)(client)
);

client.login(token);