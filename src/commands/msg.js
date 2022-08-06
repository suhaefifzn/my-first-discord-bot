const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('msg')
    .setDescription('Send message')
    .addSubcommand(subcommand =>
      subcommand
        .setName('ch')
        .setDescription('Send message to a specific text channel')
        .addChannelOption(option =>
          option
            .setName('channel')
            .setDescription('Select text channel')
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName('content')
            .setDescription('Your message')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('dm')
        .setDescription('Send direct message to user')
        .addUserOption(option =>
          option
            .setName('user')
            .setDescription('Select user who will receive this message')
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName('content')
            .setDescription('Your message')
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    const subCommand = interaction.options.getSubcommand();

    if (subCommand === 'ch') {
      const channel = interaction.options.getChannel('channel');;
      const msgContent = interaction.options.getString('content');
      channel.send(msgContent)
      await interaction.deferReply({
        fetchReply: true
      });
      await interaction.editReply({
        content: `The message was successfully sent to the ${channel} channel`
      });
    }

    if (subCommand === 'dm') {
      const user = interaction.options.getUser('user');
      const msgContent = interaction.options.getString('content')
      user.send(msgContent);
      await interaction.deferReply({
        fetchReply: true
      })
      await interaction.editReply({
        content: `The message was successfully sent to ${user}`
      })
    }
  }
}