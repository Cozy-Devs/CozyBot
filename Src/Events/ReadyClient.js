const chalk = require("chalk")
const Box = require("cli-box")
const { exec } = require("child_process")
const mongoose = require("mongoose")
module.exports = {
    name: "ready",
    once: true,
    run: async (client) => {
        client.user.setActivity('CozyDevs.', {
            type: `WATCHING`,
        })
        const ClientBox = new Box({
            w: Math.floor(client.user.tag.length + 27),
            h: 7,
            stringify: false,
            marks: {
                nw: '╭',
                n: '─',
                ne: '╮',
                e: '│',
                se: '╯',
                s: '─',
                sw: '╰',
                w: '│'
            },
            hAlign: 'left',
        }, `C L I E N T   I N F O R M A T I O N

Client Details    ::    ${client.user.tag}
Guilds Count      ::    ${client.guilds.cache.size}
User Count        ::    ${client.users.cache.size}
NodeJS Version    ::    ${process.version}
MongoDB           ::    ${mongoose.connection.readyState.toString().replace("0", "Disconnected").replace("1", "Connected").replace("2", "Connecting").replace("3", "Disconnecting")}
`).stringify()

        const CommandsBox = new Box({
            w: Math.floor(`Initiating ${client.commands.messageCommands.aliases.size} messageCommands Aliases.`.length + 37),
            h: 8,
            stringify: false,
            marks: {
                nw: '╭',
                n: '─',
                ne: '╮',
                e: '│',
                se: '╯',
                s: '─',
                sw: '╰',
                w: '│'
            },
            hAlign: "left",
        }, `C O M M A N D S   I N F O R M A T I O N

MessageCommands            ::    Initiating ${client.commands.messageCommands.size} messageCommands.
MessageCommands Aliases    ::    Initiating ${client.commands.messageCommands.aliases.size} messageCommands Aliases.
SlashCommands              ::    Initiating ${client.commands.slashCommands.size} slashCommands.
SelectMenus                ::    Initiating ${client.commands.selectMenus.size} selectMenus.
ContextMenus               ::    Initiating ${client.commands.contextMenus.size} contextMenus.
ButtonCommands             ::    Initiating ${client.commands.buttonCommands.size} buttonCommands.
Client Events              ::    Initiating ${client.events.size} events.
`).stringify()

        console.log(chalk.bold.greenBright(ClientBox))
        console.log(chalk.bold.blueBright(CommandsBox))

        //Automatic 30second git pull.
        setInterval(() => {
            exec(`git pull`, (error, stdout) => {
                let response = (error || stdout);
                if (!error) {
                    if (!response.includes("Already up to date.")) {
                        client.channels.cache.get('952637547023061012').send('**[AUTOMATIC]** \nNew update on GitHub. Pulling. \n\nLogs: \n```' + response + "```" + "\n\n\n**Restarting bot**")
                        setTimeout(() => {
                            process.exit();
                        }, 1000)
                    }
                }
            })
        }, 30000)
    }
}