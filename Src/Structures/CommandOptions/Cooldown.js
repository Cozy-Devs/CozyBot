const cooldownModel = require("../../Models/Cooldown")
module.exports = async function (client, message, command, isInteraction, interactionType, Discord) {
    if (!command.cooldown) return false;
    const currentTime = Date.now()
    let oldTime = await cooldownModel.findOne({
        userID: String(message.member.user.id),
        cmdType: interactionType ?? "Normal",
        cmdName: command.name
    })
    oldTime = oldTime?.timestamp ?? 0
    if (Math.floor(currentTime - oldTime) >= command.cooldown || oldTime == 0) {
        await cooldownModel.findOneAndUpdate({
            userID: String(message.member.user.id),
            cmdType: interactionType ?? "Normal",
            cmdName: command.name
        }, {
            userID: String(message.member.user.id),
            cmdType: interactionType ?? "Normal",
            cmdName: command.name,
            timestamp: currentTime
        }, {
            upsert: true
        })
        return false;
    } else {
            const embed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor("RANDOM")
            .setDescription(`You are currently at cooldown until <t:${Math.floor(Math.floor(oldTime + command.cooldown) / 1000)}>`)
           message.reply({
               embeds: [embed], 
               allowedMentions: {
                repliedUser: false
            }
        })
    }
}