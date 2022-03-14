module.exports = {
    name : 'play',
    ignoreFile: true,
    run : async(client, interaction, container) => {
    	const txt = interaction.options.getString("song")
        if (client.Distube.getQueue(interaction.guild.id)?.songs?.length > 50) return interaction.reply({ content: "The queue is already at 50 songs so you cannot add more songs to it." })
        if (!interaction.member.voice.channel) return interaction.reply({ content: "You need to join a VC first.", ephemeral: true })
        if (interaction.guild.me?.voice.channel) {
            if (interaction.guild.me.voice.channel?.id != interaction.member.voice.channel?.id && interaction.guild?.me?.voice?.channel?.members?.filter(x => !x.user.bot).size > 1) return interaction.reply({ content: "You need to be in same VC as the bot.", ephemeral: true })
            else {
                client.Distube.play(interaction.member.voice.channel, txt, {
                    member: interaction.member,
                    textChannel: interaction.channel
            })
                interaction.reply({ content: "Playing your song now!", ephemeral: true })
            }
        }
        else {
            client.Distube.play(interaction.member.voice.channel, txt, {
                member: interaction.member,
                textChannel: interaction.channel
        })
            interaction.reply({ content: "Playing your song now!", ephemeral: true })
        }
    }
}