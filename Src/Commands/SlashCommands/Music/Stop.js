module.exports = {
    name: "stop",
    ignoreFile: true,
    run: async(client, interaction, container) => {
        const queue = client.Distube.getQueue(interaction.guild.id)
        if (!queue) return interaction.reply({ content: "There is no music playing in this server." })
        queue.stop()
        const embed = new container.Discord.MessageEmbed()
        .setColor("RANDOM")
        .setFooter({
            text: `Requested by ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })
        .setTimestamp()
        .setTitle("Music Player Settings")
        .setDescription(`The music player of this guild has been stopped successfully.`)
        interaction.reply({
            embeds: [embed]
        })
    }
}