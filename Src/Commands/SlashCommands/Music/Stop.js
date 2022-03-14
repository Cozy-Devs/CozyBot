module.exports = {
    name: "stop",
    ignoreFile: true,
    run: async(client, interaction, container) => {
        client.Distube.getQueue(interaction.guild.id).stop()
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