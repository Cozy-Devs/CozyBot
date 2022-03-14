module.exports = {
    name: 'nowplaying',
    ignoreFile: true,
    run: async (client, interaction, container) => {
        const queue = client.Distube.getQueue(interaction.guild.id);
        const song = client.Distube.getQueue(interaction.guild.id)?.songs[0]
        if (!song) return interaction.reply({
            content: "No song is currently playing.",
            ephemeral: true
        })
        let loopStatus = queue.repeatMode
        if (loopStatus == 0) loopStatus = "Disabled"
        else if (loopStatus == 1) loopStatus = "Song Loop Enabled"
        else loopStatus = "Queue Loop Enabled"
        const embed = new container.Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor({
                name: song.user.tag,
                iconURL: song.user.displayAvatarURL({
                    dynamic: true
                })
            })
            .setTimestamp()
            .setTitle("Currently Playing")
            .setThumbnail(song.thumbnail)
            .addFields({
                name: "Name",
                value: `[${song.name}](${song.url})`,
                inline: true
            }, {
                name: "Duration",
                value: `${client.Distube.getQueue(interaction.guild.id).formattedCurrentTime} - ${song.formattedDuration}`,
                inline: true
            }, {
                name: "Uploader",
                value: song.uploader.name,
                inline: true
            }, {
                name: "Queue Status",
                value: `Volume: \`${queue.volume}%\` | Loop Status: \`${loopStatus}\``,
                inline: true
            }
            )
        interaction.reply({
            embeds: [embed]
        })
    }
}