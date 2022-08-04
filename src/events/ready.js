const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.user.setActivity('Holy Grail War', { type: ActivityType.Competing });
        console.log(`Ready! Logged in as ${client.user.tag}`);
    }
}