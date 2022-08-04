const { SlashCommandBuilder } = require('discord.js');
const { cleanDateTime } = require('../my_js/dateTime.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('See information about server, user, or this bot')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('View user information on this server')
                .addUserOption(option =>
                    option
                        .setName('target')
                        .setDescription('Please mention a member on this server')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('View server information')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('bot')
                .setDescription('Information about this bot')
        ),
    async execute(interaction) {
        const userSubcommand = interaction.options.getSubcommand();
        let message;

        if (userSubcommand === 'user') {
            const member = interaction.options.getMember('target');
            const usertag = member.user.tag;
            const username = member.user.username;
            const userDiscriminator = member.user.discriminator;
            const userCreated = cleanDateTime(member.user.createdAt);
            const userJoined = cleanDateTime(member.joinedAt);
            let userNickname = member.nickname;

            if (!userNickname) userNickname = 'none';

            message =
                '> -------------------- **USER INFORMATIONS* --------------------' + '\n'
                + '> **Usertag:** ' + `_${usertag}_` + '\n'
                + '> **Username:** ' + `_${username}_` + '\n'
                + '> **Discriminator:** ' + `_${userDiscriminator}_` + '\n'
                + '> **Joined Discord at:** ' + `_${userCreated}_` + '\n'
                + '> \n'
                + '> **Nickname:** ' + `_${userNickname}_` + '\n'
                + '> **Joined Server at:** ' + `_${userJoined}_` + '\n'
                + '> -------------------------------------------------------------------';

        }

        if (userSubcommand === 'server') {
            const serverName = interaction.guild.name;
            const memberCount = interaction.guild.memberCount;
            const createdAt = cleanDateTime(interaction.guild.createdAt);

            message =
                '> ------------------ **SERVER INFORMATION** -----------------' + '\n'
                + '> **Servername:** ' + `_${serverName}_` + '\n'
                + '> **Members:** ' + `_${memberCount}_` + '\n'
                + '> **Created at:** ' + `_${createdAt}_` + '\n'
                + '> ------------------------------------------------------------------';
        }

        if (userSubcommand === 'bot') {
            const isBot = interaction.client.user.bot ? 'Bot' : '-';
            const createdAt = cleanDateTime(interaction.client.user.createdAt);

            message =
                '> ---------------------- **BOT INFORMATION** ---------------------' + '\n'
                + '> **Type:** ' + `_${isBot}_` + '\n'
                + '> **Bot Tag:** ' + `_${interaction.client.user.tag}_` + '\n'
                + '> **Bot Name:** ' + `_${interaction.client.user.username}_` + '\n'
                + '> **Bot Discriminator:** ' + `_${interaction.client.user.discriminator}_` + '\n'
                + '> **Created at:** ' + `_${createdAt}_` + '\n'
                + '> ---------------------------------------------------------------------';
        }

        await interaction.deferReply({
            fetchReply: true
        });

        await interaction.editReply({
            content: message
        });
    },

}