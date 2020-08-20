module.exports = {
    name: "menu",
    description: "menu list",
    execute(message, args) {
        const Discord = require('discord.js');
        let pages = ['Olá', 'Acho que', 'Consegui', 'mais ou menos :)'];
        let page = 1;
        const embed = new Discord.MessageEmbed()
            .setColor(0xffffff)
            .setFooter("Página " + page + " de " + pages.length)
            .setDescription(pages[page - 1]);

        message.channel.send(embed).then(msg => {
            msg.react('◀').then(r => {
                msg.react('▶');

                const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
                const fowardsFilter = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;

                const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
                const forwards = msg.createReactionCollector(fowardsFilter, { time: 60000 });

                backwards.on('collect', r => {
                    if (page === 1) return;
                    page--;
                    embed.setDescription(pages[page - 1]);
                    embed.setFooter("Página " + page + " de " + pages.length);
                    msg.edit(embed);
                });
                forwards.on('collect', r => {
                    if (page === pages.length) return;
                    page++;
                    embed.setDescription(pages[page - 1]);
                    embed.setFooter("Página " + page + " de " + pages.length);
                    msg.edit(embed);
                });
            });
        });
    }
}