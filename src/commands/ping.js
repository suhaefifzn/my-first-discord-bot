const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Return your ping'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });
        const newMessage = `**Latency:** ${client.ws.ping}ms\n**Client Ping:** ${message.createdTimestamp - interaction.createdTimestamp}ms`;
        // console.log(message);
        await interaction.editReply({
            content: newMessage
        });
    }
}