const ytdl = require('ytdl-core');

module.exports = {
	name: 'play',
	description: 'Toca um vídeo do youtube',
	async execute(message, args) {
		if(!message.member.voiceChannel) return message.channel.send("Erro, BIP BOP, Entre em algum canal de voz BIP BOP");

        if(message.guild.me.voiceChannel) return message.channel.send('Ops, o bot já está conectado');

        if(!args[0]) return message.channel.send('Por favor, insira o link do vídeo');

        let validate = await ytdl.validateURL(args[0]);

        if(!validate) return message.channel.send('Por favor, insira um link válido');

        let info = await ytdl.getInfo(args[0]);

        let connection = await message.member.voiceChannel.join();

        let dispatcher = await connection.play(ytdl(args[0], { filter: 'audioonly'}));

        message.channel.send(`Tocando agora: ${info.title}`);
	},
};
