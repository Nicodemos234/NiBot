const Discord = require('discord.js');
const client = new Discord.Client();

const token = "TOKEN";

client.on('ready', () => {
    console.log('O PAI TA ON!');
});

client.login(token);