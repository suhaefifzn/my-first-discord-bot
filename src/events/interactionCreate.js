module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const client = interaction.client;
        const commands = interaction.client.commands;
        const command = commands.get(interaction.commandName);

        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

        if (!interaction.isChatInputCommand()) return;
        if (!command) return;

        try {
            await command.execute(interaction, client);
        } catch (err) {
            console.error(err);
            const message = await interaction.deferReply({
                fetchReply: true
            });

            await interaction.editReply({
                content: 'There was an error while executing this command!',
            });
        }
    }
}