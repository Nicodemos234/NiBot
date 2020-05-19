const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

client.on('ready', () => {
    console.log('O PAI TA ON!');
});

client.login(config.token);
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.on('message', (message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

    if(command === 'twitch'){
        client.commands.get('twitch').execute(message, args);
    }
    if(command === 'play'){
        client.commands.get('play').execute(message, args);
    }
});