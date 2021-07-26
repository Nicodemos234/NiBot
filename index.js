const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

client.on('ready', () => {
    console.log('O PAI TA ON!');
});

client.login(process.env.token);
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.on('message', (message) => {
    
    if (!message.content.startsWith(process.env.prefix) || message.author.bot) return;

    const args = message.content.slice(process.env.prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

    if(command === 'twitch'){
    }
    if(command === 'play'){
    }
    switch(command) {
        case "twitch":
            client.commands.get('twitch').execute(message, args);
            break;
        case "play":
            client.commands.get('play').execute(message, args);
            break;
        case "menu":
            client.commands.get('menu').execute(message, args);
            break;
    }
    
});

