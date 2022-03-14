module.exports = {
	customEvent: true,
	run: async(client, container) => {
		client.Distube.on("addList", (queue, list) => {
            if (queue?.songs?.length > 50) queue.songs = queue.songs.slice(0, 50)
            const emoji = "<:froggy_arrow:901026084060028998>"
            const row = new container.Discord.MessageActionRow().addComponents(
                new container.Discord.MessageButton()
                .setStyle("LINK")
                .setURL(list.url)
                .setLabel("Visit the playlist")
                .setEmoji("<:youtube:935237982800212008>")
            )
            const embed = new container.Discord.MessageEmbed()
			.setColor("RANDOM")
			.setFooter({
                text: `Requested by ${list.user.tag}`,
                iconURL: list.user.displayAvatarURL({ dynamic: true })
            })
			.setTimestamp()
            .setTitle(list.name)
			.setAuthor({
                name: "Loaded Playlist"
            })
			.setThumbnail(list.thumbnail)
			.addFields(
			{
                name: `${emoji} Songs Amount`,
                value: String(list.songs.length)
            },
            {
                name: `${emoji} Duration`,
                value: `\`${list.formattedDuration}\``
            }
			)
			queue.textChannel.send({
                embeds: [embed],
                components: [row]
            })
        })
		}
}