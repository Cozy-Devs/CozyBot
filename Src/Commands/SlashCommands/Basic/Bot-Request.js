module.exports = {
    name: "bot-request",
    description: "Bot Requests Center.",
    options: [{
            name: "request-type",
            type: "STRING",
            required: true,
            description: "What type of bot request you making?",
            choices: [{
                    name: "add-bot",
                    description: "Get your bot added to this server.",
                    value: "add-bot"
                },
                {
                    name: "remove-bot",
                    description: "Get your bot kicked from this server.",
                    value: "remove-bot"
                }
            ]
        },
        {
            name: "bot-id",
            type: "STRING",
            required: true,
            description: "What is the ID of the bot you want to add or remove?"
        }
    ],
    guilds: ["861138548328366100"],
    run: async (client, interaction, container) => {
        const requestType = interaction.options.getString("request-type");
        const botId = interaction.options.getString("bot-id");
        let msg;
        const channel = interaction.guild.channels.cache.get("952826685630320700");

        if (requestType === "add-bot") msg = `${interaction.user.tag} (${interaction.user}) has requested to add bot ${botId} (<@${botId}>) to this server.`;
        else msg = `${interaction.user.tag} (${interaction.user}) has requested to remove bot ${botId} (<@${botId}>) from this server.`;

        const embed = new container.Discord.MessageEmbed()
            .setTitle("Bot Request")
            .setDescription(msg)
            .setColor("RANDOM")
            .setTimestamp();

        channel.send({
            embeds: [embed]
        })

        interaction.reply({
            content: "Your request has been sent, please wait for a response from the staff team."
        })
    }
}