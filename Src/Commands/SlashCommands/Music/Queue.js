module.exports = {
    name : 'queue',
    ignoreFile: true,
    run : async(client, interaction, container) => {
        const queue = client.Distube.getQueue(interaction.guild.id);
        if (!queue) return interaction.reply({ content: "There is currently no queue in this server."})
        let CP = 1
        let maxSize = []
        let row;
        let num = 1
        if (queue.songs.slice(0, 10).length > 0) maxSize.push(1)
        if (queue.songs.slice(11, 20).length > 0)maxSize.push(1)
        if (queue.songs.slice(21, 30).length > 0) maxSize.push(1)
        if (queue.songs.slice(31, 40).length > 0) maxSize.push(1)
        if (queue.songs.slice(41, 50).length > 0) maxSize.push(1)
        maxSize = maxSize.length
        let ss;
        const embed = new container.Discord.MessageEmbed()
        .setTitle("Current Music Queue")
        .setDescription(queue.songs.slice(0, 10).map(song => `**${num++}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\` - <@${song.user.id}>`).join("\n"))
        .setColor("RANDOM")
        .setFooter({
            text: `Page ${CP} / ${maxSize}`
        })
        .setTimestamp();
        if (queue.songs.length >= 50) {
            row = new container.Discord.MessageActionRow().addComponents(
                new container.Discord.MessageButton()
                .setLabel("Next Page")
                .setStyle("PRIMARY")
                .setCustomId("nextPage"));
            const message = await interaction.reply({
            embeds: [embed],
            components: [row],
            fetchReply: true
        })
        num = 1
        const filter = (a) => a.user.id == interaction.user.id
        const collector = message.createMessageComponentCollector({ filter, componentType: "BUTTON", time: 30000})
        collector.on("collect", msg => {
            if (msg.customId == "nextPage") {
                CP++
                if (CP == 2) ss = queue.songs.slice(11, 20)
                else if (CP == 3) ss = queue.songs.slice(21, 30)
                else if (CP == 4) ss = queue.songs.slice(31, 40)
                else if (CP == 5) ss = queue.songs.slice(41, 50)
                const embed = new container.Discord.MessageEmbed()
                .setTitle("Current Music Queue")
                .setDescription(ss.map(song => `**${Math.floor(num++ + CP * 10)}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\` - <@${song.user.id}>`).join("\n"))
                .setColor("RANDOM")
                .setFooter(`Page ${CP} / ${maxSize}`)
                .setTimestamp();
                if (CP == maxSize) row = new container.Discord.MessageActionRow().addComponents(new container.Discord.MessageButton().setLabel("Last Page").setStyle("PRIMARY").setCustomId("leftPage"))
                else if (CP == 1) row = new container.Discord.MessageActionRow().addComponents(new container.Discord.MessageButton().setLabel("Next Page").setStyle("PRIMARY").setCustomId("nextPage"))
                else row = new container.Discord.MessageActionRow().addComponents(new container.Discord.MessageButton().setLabel("Last Page").setStyle("PRIMARY").setCustomId("leftPage"),new container.Discord.MessageButton().setLabel("Next Page").setStyle("PRIMARY").setCustomId("nextPage"))
                msg.update({
                    embeds: [embed],
                    components: [row]
                })
                num = 1
            }
            else {
                CP = Math.floor(CP - 1)
                if (CP == 1) ss = queue.songs.slice(0, 10)
                else if (CP == 2) ss = queue.songs.slice(11, 20)
                else if (CP == 3) ss = queue.songs.slice(21, 30)
                else if (CP == 4) ss = queue.songs.slice(31, 40)
                else if (CP == 5) ss = queue.songs.slice(41, 50)
                const embed = new container.Discord.MessageEmbed()
                .setTitle("Current Music Queue")
                .setDescription(ss.map(song => `**${Math.floor(num++ + CP * 10)}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\` - <@${song.user.id}>`).join("\n"))
                .setColor("RANDOM")
                .setFooter(`Page ${CP} / ${maxSize}`)
                .setTimestamp();
                if (CP == maxSize) row = new container.Discord.MessageActionRow().addComponents(new container.Discord.MessageButton().setLabel("Last Page").setStyle("PRIMARY").setCustomId("leftPage"))
                else if (CP == 1) row = new container.Discord.MessageActionRow().addComponents(new container.Discord.MessageButton().setLabel("Next Page").setStyle("PRIMARY").setCustomId("nextPage"))
                else row = new container.Discord.MessageActionRow().addComponents(new container.Discord.MessageButton().setLabel("Last Page").setStyle("PRIMARY").setCustomId("leftPage"),new container.Discord.MessageButton().setLabel("Next Page").setStyle("PRIMARY").setCustomId("nextPage"))
                msg.update({
                    embeds: [embed],
                    components: [row]
                })
                num = 1
            }
        })
        collector.on('end', collected => {
            if (CP == 1) ss = queue.songs.slice(0, 10)
            else if (CP == 2) ss = queue.songs.slice(11, 20)
            else if (CP == 3) ss = queue.songs.slice(21, 30)
            else if (CP == 4) ss = queue.songs.slice(31, 40)
            else if (CP == 5) ss = queue.songs.slice(41, 50)
            const embed = new container.Discord.MessageEmbed()
            .setTitle("Current Music Queue")
            .setFooter(`Page ${CP} / ${maxSize}`)
            .setDescription(ss.map(song => `**${Math.floor(num++ + CP * 10)}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\` - <@${song.user.id}>`).join("\n"))
            .setColor("RANDOM")
            .setTimestamp();
            if (CP == maxSize) row = new container.Discord.MessageActionRow().addComponents(new container.Discord.MessageButton().setLabel("Last Page").setStyle("PRIMARY").setCustomId("leftPage"))
            else if (CP == 1) row = new container.Discord.MessageActionRow().addComponents(new container.Discord.MessageButton().setLabel("Next Page").setStyle("PRIMARY").setCustomId("nextPage"))
            else row = new container.Discord.MessageActionRow().addComponents(new container.Discord.MessageButton().setLabel("Last Page").setStyle("PRIMARY").setCustomId("leftPage"),new container.Discord.MessageButton().setLabel("Next Page").setStyle("PRIMARY").setCustomId("nextPage"))
            interaction.editReply({
                embeds: [embed],
                components: [row]
            })
        })
    }
    else await interaction.reply({
            embeds: [embed]
        })
        
    }
}