import { MyClient } from '../../customTypes'
import { Message } from 'discord.js'

module.exports = {
    name: "avatar",
    run: async (client: MyClient, message: Message, args: any) => {
        
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send("Você precisar ser administrador para isso :(")
            return
        }
        const userMentioned = message.mentions.users.first();
        if(userMentioned == undefined) {
            message.channel.send("Você precisa mencionar um usuário para isso...")
            return
        }
        message.channel.send(userMentioned.displayAvatarURL({ size: 2048, dynamic: true }))
        message.delete()
    }
}