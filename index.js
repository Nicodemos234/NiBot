const Discord = require('discord.js');
const client = new Discord.Client();

const token = "NzEyMDcyMzE1MDY3ODI2Mjc3.XsP6cQ.Ay8qXo_nJY8RJgaIIyLvULc4rPQ";

client.on('ready', () => {
    console.log('O PAI TA ON!');
});

client.login(token);