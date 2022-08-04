const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('member')
    .setDescription('Manage members')
    .addSubcommand(subcommand =>
      subcommand
        .setName('kick')
        .setDescription('Select a member and kick them')
        .addUserOption(option =>
          option
            .setName('target')
            .setDescription('The member to kick')
        )
    ),
  async execute(interaction) {
    const member = interaction.options.getMember('target');
    member.kick();

    const message = `${member} just got kicked out of Server.`;

    await interaction.deferReply({
      fetchReply: true
    });

    await interaction.editReply({
      content: message,
    });
  }
}