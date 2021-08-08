import { MyClient } from '../../customTypes'
import { CollectorFilter, GuildMember, GuildMemberManager, Message } from 'discord.js'

module.exports = {
    name: "kick",
    run: async (client: MyClient, message: Message, args: any) => {

        if (!message.member.hasPermission('KICK_MEMBERS')) {
            message.channel.send("Você precisar ser administrador para isso :(")
            return
        }
        const usersMentioned = message.mentions.users
        if (usersMentioned.first() == undefined) {
            await message.channel.send("Você precisa mencionar um usuário para isso...")
            return
        }
        const confirmMessage = await message.channel.send("Tem certeza disso?")
        await confirmMessage.react("👍")
        await confirmMessage.react("👎")
        const filter: CollectorFilter = (reaction) => reaction.emoji.name === '👍' || reaction.emoji.name === '👎'
        const collected = await confirmMessage.awaitReactions(filter, { time: 3000 })
        const guildMemberManager = new GuildMemberManager(message.guild)
        if (collected.first().emoji.name == '👍') {
            usersMentioned.map(async user => {
                const gmUser: GuildMember = await guildMemberManager.fetch(user)
                if (gmUser.kickable)
                    gmUser.kick()
                else
                    message.channel.send("Este usuário não pode ser kickado")

            })
            message.channel.send("Kickou oloco")
            message.delete()
            confirmMessage.delete()
        } else {
            const messageNoBan = await message.channel.send("Ok, não vou kickar então :)")
            await message.delete()
            await confirmMessage.delete()
            messageNoBan.delete()
        }
        // message.delete()
    }
}