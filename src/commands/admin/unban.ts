import { MyClient } from '../../customTypes'
import { CollectorFilter, GuildMemberManager, Message, User } from 'discord.js'

module.exports = {
    name: "unban",
    run: async (client: MyClient, message: Message, args: any) => {

        if (!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send("Você precisar ser administrador para isso :(")
            return
        }
        const usersMentioned = message.mentions.users
        if (args[0] == undefined) {
            await message.channel.send("Você precisa mencionar um usuário para isso...")
            return
        }
        const confirmMessage = await message.channel.send("Tem certeza disso?")
        await confirmMessage.react("👍")
        await confirmMessage.react("👎")
        const filter: CollectorFilter = (reaction) => reaction.emoji.name === '👍' || reaction.emoji.name === '👎'
        const collected = await confirmMessage.awaitReactions(filter, { time: 3000 })
        const guildMemberManager =  new GuildMemberManager(message.guild)
        if (collected.first().emoji.name == '👍') {
            guildMemberManager.unban(args[0])
            message.channel.send("Desbaniu oloco")
            message.delete()
            confirmMessage.delete()
        }else {
            const messageNoBan = await message.channel.send("Ok, não vou banir então :)")
            await message.delete()
            await confirmMessage.delete()
            messageNoBan.delete()
        }
        // message.delete()
    }
}