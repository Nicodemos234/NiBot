
module.exports = {
	name: 'play',
	description: 'Toca um vídeo do youtube',
	async execute(message, args) {
		if(!args[0]) {
            message.channel.send("Você precisa inserir um link.");
            return;
        }


   	},
};
