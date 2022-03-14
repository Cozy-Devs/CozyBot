module.exports = {
    name : 'skip',
    ignoreFile: true,
    run : async(client, interaction, container) => {
    if (interaction.guild.me.voice.channel && interaction.guild.me.voice.channel?.id != interaction.member.voice.channel?.id) return interaction.reply({ content: "You need to be in same VC as the bot.", ephemeral: true })
    const song = client.Distube.getQueue(interaction.guild.id)?.songs[0]
    if (!song) return interaction.reply({ content: "Nothing is currently playing.", ephemeral: true })
    const embed = new container.Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription(`Skipped the song **[${song.name}](${song.url})** by the request of **${song.user.tag}** (<@${song.user.id}>)`)
    interaction.reply({ embeds: [embed] })
    client.Distube.skip(interaction.guild.id)
    }
}