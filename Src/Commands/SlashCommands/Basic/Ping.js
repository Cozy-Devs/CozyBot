const pingSchema = require("../../../Models/Cooldown")
module.exports = {
	name: "ping",
	guilds: ["861138548328366100"],
	description: "Run this to see my ping.",
	run: async(client, interaction, container) => {
		const oldDate = Date.now()
		await pingSchema.findOne({ userID: interaction.user.id })
		const newDate = Date.now()
        const ping = new container.Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTimestamp()
        .setTitle('🏓╎ Pong!')
		.setDescription(`🏠╎Websocket Latency: ${client.ws.ping}ms\n🤖╎Bot Latency: ${Date.now() - interaction.createdTimestamp}ms\n🎲╎Database Ping: ${Math.floor(newDate - oldDate)}ms`);
		interaction.reply({
			embeds: [ping]
		})
	}
}