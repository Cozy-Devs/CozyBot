module.exports = {
	customEvent: true,
	run: async(client) => {
        client.Distube.on("searchCancel", (message) => message.channel.send(`Searching canceled`));
    }
}