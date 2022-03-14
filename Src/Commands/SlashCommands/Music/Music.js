module.exports = {
    name: 'music',
    description: "Music Manager.",
    options: [{
            name: "play",
            options: [{
                name: "song",
                type: "STRING",
                required: true,
                description: "Provide your song"
            }],
            type: "SUB_COMMAND",
            description: "Start playing your favoruite songs."
        },
        {
            name: "loop",
            type: "SUB_COMMAND",
            description: "Loop the specified field",
            options: [
                {
                    name: "option",
                    required: true,
                    type: "STRING",
                    description: "Choose what to do.",
                    choices: [
                        {
                            name: "disable",
                            description: "Disable the loop",
                            value: "disable"
                        },
                        {
                            name: "song",
                            description: "Loop the ongoing song.",
                            value: "song"
                        },
                        {
                            name: "queue",
                            description: "Loop the entire queue.",
                            value: "queue"
                        }
                    ]
                }
        ]
        },
        {
            name: "queue",
            type: "SUB_COMMAND",
            description: "Get the ongoing queued songs."
        },
        {
            name: "setvolume",
            type: "SUB_COMMAND",
            description: "Set the volume for the player",
            options: [{
                name: "volume",
                type: "INTEGER",
                description: "Provide the volume amount",
                required: true
            }]
        },
        {
            name: "stop",
            type: "SUB_COMMAND",
            description: "Stop the ongoing music player"
        },
        {
            name: "nowplaying",
            type: "SUB_COMMAND",
            description: "Get the song which is currently playing."
        },
        {
            name: "skip",
            type: "SUB_COMMAND",
            description: "Skip the currently playing son."
        }
    ],
    guilds: ["861138548328366100"],
    run: async (client, interaction, container) => {
        const subcmd = interaction.options.getSubcommand()
        if (subcmd == "play") require(`${__dirname}/Play`).run(client, interaction, container)
        else if (subcmd == "skip") require(`${__dirname}/Skip`).run(client, interaction, container)
        else if (subcmd == "loop") require(`${__dirname}/Loop`).run(client, interaction, container)
        else if (subcmd == "setvolume") require(`${__dirname}/SetVolume`).run(client, interaction, container)
        else if (subcmd == "stop") require(`${__dirname}/Stop`).run(client, interaction, container)
        else if (subcmd == "queue") require(`${__dirname}/Queue`).run(client, interaction, container)
        else if (subcmd == "nowplaying") require(`${__dirname}/NowPlaying`).run(client, interaction, container)
    }
}