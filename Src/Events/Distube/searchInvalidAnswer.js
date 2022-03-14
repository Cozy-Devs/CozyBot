module.exports = {
	customEvent: true,
	run: async(client) => {
        client.Distube.on("searchInvalidAnswer", (message) => message.channel.send(`You answered an invalid number!`));
    }
}