module.exports = {
    name: "loop",
    ignoreFile: true,
    run: async(client, interaction, container) => {
        const queue = client.Distube.getQueue(interaction.guild.id)
        const loopStatus = interaction.options.getString("option")
        let loop;
        if (loopStatus == "disabled") loop = 0
        else if (loopStatus == "song") loop = 1
        else loop = 2
        queue.setRepeatMode(loop)
        const embed = new container.Discord.MessageEmbed()
        .setColor("RANDOM")
        .setFooter({
            text: `Requested by ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })
        .setTimestamp()
        .setTitle("Music Player Settings")
        .setDescription(`The player loop status has been changed to **${loopStatus}**.`)
        interaction.reply({
            embeds: [embed]
        })
    }
}