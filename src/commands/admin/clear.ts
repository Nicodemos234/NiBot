import { MyClient } from '../../customTypes'
import { Message } from 'discord.js'

module.exports = {
    name: "clear",
    run: async (client: MyClient, message: Message, args: any) => {
        
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send("Você precisar ser administrador para isso :(")
            return;
        }
        await message.channel.send("Deletando mensagems (limite 100)");
        const allMessages = await message.channel.messages.fetch({ limit: 99 })
        message.channel.messages.channel.bulkDelete(allMessages)
    }
}