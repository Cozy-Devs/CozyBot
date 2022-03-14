module.exports = {
    name: "setVolume",
    ignoreFile: true,
    run: async(client, interaction, container) => {
        const volume = interaction.options.getInteger("volume")
        const queue = client.Distube.getQueue(interaction.guild.id)
        if (volume < 0) return interaction.reply({ content: "You must provide volume greater than 0%", ephemeral: true })
        if (volume > 100) return interaction.reply({ content: "You must provide volume less than 100%", ephemeral: true })
        queue.setVolume(volume)

        const embed = new container.Discord.MessageEmbed()
        .setColor("RANDOM")
        .setFooter({
            text: `Requested by ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })
        .setTimestamp()
        .setTitle("Music Player Settings")
        .setDescription(`The player volume has been changed to ${volume}% successfully.`)
        interaction.reply({
            embeds: [embed]
        })
    }
}