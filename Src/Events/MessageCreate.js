module.exports = {
    name: "messageCreate",
    run: async(message, client, container) => {
        const loadCommandOptions = require("../Structures/CommandOptions/loadCommandOptions")

        // Booster Script
        if (message.channel.id == "952479734141423646" && !message.author.bot) {
            const embed = new container.Discord.MessageEmbed()
            .setTimestamp()
            .setTitle("<a:boost:952642975580700733> New Boost!")
            .setDescription(`<a:boost:952642975580700733> **${message.author.tag}** (${message.author}) has just boosted the server! Thank you for boosting!`)
            .setFooter({ text: "<3" })
            message.channel.send({
                embeds: [embed]
            })
        }

        // Suggestion Script
        if (message.channel.id == "934351514707853314" && !message.author.bot) {
            if (message.content.includes("@comment")) return;
            message.react('<a:suggest_yes:861876314896859136>')
            message.react('<a:suggest_no:861876395863834624>')
        }

        container.Config.prefix.forEach(prefix => {
            if (!message.content.toLowerCase().startsWith(prefix)) return;
            const cmdName = message.content.toString().toLowerCase().slice(prefix.length).trim().split(" ")[0]
            const command = client.commands.messageCommands.get(cmdName) ?? client.commands.messageCommands.get(client.commands.messageCommands.aliases.get(cmdName))
            if (!command) return;
            if (command.allowBots) loadCommandOptions(client, message, command, false)
            else if (message.author.bot) return;
            else if (command.guildOnly == false) loadCommandOptions(client, message, command, false)
            else if (!message.guild) return;
            else loadCommandOptions(client, message, command, false)
        })
    }
}