import { MyClient } from '../../customTypes'
import { Message } from 'discord.js'

module.exports = {
    name: "renamechannel",
    run: async (client: MyClient, message: Message, args: any) => {
        const channel = message.channel
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            channel.send("Você precisar ser administrador para isso :(")
            return
        }
        const userMentioned = message.mentions.users.first();
        if(!args[0]) {
            channel.send("Você precisa dizer qual o novo nome do canal que você deseja!")
            return
        }
        const channelGuild = message.guild.channels.cache.get(channel.id)
        channelGuild.setName(args[0])
        message.delete()
    }
}