module.exports = {
	customEvent: true,
	run: async(client, container) => {
		client.Distube.on("playSong", (queue, song) => {
			const emoji = "<:froggy_arrow:901026084060028998>"
			let loopStatus = queue.repeatMode
			if (loopStatus == 0) loopStatus = "Disabled"
			else if (loopStatus == 1) loopStatus = "Song Loop Enabled"
			else loopStatus = "Queue Loop Enabled"
			const row = new container.Discord.MessageActionRow().addComponents(
                new container.Discord.MessageButton()
                .setStyle("LINK")
                .setURL(song.url)
                .setLabel("Visit the song")
                .setEmoji("<:youtube:935237982800212008>")
            )
			const embed = new container.Discord.MessageEmbed()
			.setColor("RANDOM")
			.setFooter({
				text: `Requested by ${song.user.tag}`,
				iconURL: song.user.displayAvatarURL({ dynamic: true })
			})
			.setTimestamp()
			.setAuthor({
				name: "Now Playing"
			})
			.setThumbnail(song.thumbnail)
			.addFields(
			{
				name: `${emoji} Name`,
				value: `\`${song.name}\``,
				inline: true
				},
				{
					name: `${emoji} Duration`,
					value: `\`${song.formattedDuration}\``,
					inline: true
					},
					{
						name: `${emoji} Uploader`,
						value: `\`${song.uploader.name}\``,
						inline: true
						},
						{
							name: `${emoji} Queue Status`,
							value: `Volume: \`${queue.volume}%\` | Loop Status: \`${loopStatus}\``,
							inline: true
						}
			)
			queue.textChannel.send({
				embeds: [embed],
			components: [row]
		})
			})
		}
}