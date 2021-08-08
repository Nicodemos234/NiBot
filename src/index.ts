import * as DisTube from 'distube'
import { Collection } from "discord.js"
import { Client } from "@typeit/discord"
import * as fs from 'fs'
import { ClientConfig, MyClient } from './customTypes'
require('dotenv').config()



const config: ClientConfig = {
    "prefix": process.env.prefix,
    "token": process.env.token,
    "emoji": {
        "play": "▶️",
        "stop": "⏹️",
        "queue": "📄",
        "success": "☑️",
        "repeat": "🔁",
        "error": "❌"
    }
}

const client: MyClient = new Client()

client.config = config
client.distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: true })
client.commands = new Collection()
client.aliases = new Collection()
client.emotes = config.emoji

fs.readdir("./build/commands/", (err, folders) => {
    folders.forEach(folder => {
        fs.readdir(`./build/commands/${folder}/`, (err, files) => {

            if (err) return console.log("Could not find any commands!")
            const jsFiles = files.filter(f => f.split(".").pop() === "js")
            if (jsFiles.length <= 0) return console.log("Could not find any commands!")
            jsFiles.forEach(file => {
                const cmd = require(`./commands/${folder}/${file}`)
                console.log(`Loaded ${file}`)
                client.commands.set(cmd.name, cmd)
                if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
            })
        })
    })
})
client.on("ready", () => {
    console.log(`${client.user.tag} is ready.`)
    const server = client.guilds.cache.size
    client.user.setActivity({ type: "PLAYING", name: `Existindo em ${server} servidores` })
})

client.on("message", async message => {
    const prefix = config.prefix
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return
    if (cmd.inVoiceChannel && !message.member.voice.channel) return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
    try {
        cmd.run(client, message, args)
    } catch (e) {
        console.error(e)
        message.reply(`Error: ${e}`)
    }
})

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `${client.emotes.play} | Tocando \`${song.name}\` - \`${song.formattedDuration}\`\nQuem botou para tocar: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `${client.emotes.success} | Adicionado ${song.name} - \`${song.formattedDuration}\` para a fila por ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `${client.emotes.play} | Tocando \`${playlist.title}\` playlist (${playlist.total_items} músicas).\nRequisitado por: ${song.user}\nTocando: \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `${client.emotes.success} | Adicionado \`${playlist.title}\` playlist (${playlist.total_items} músicas) a fila\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0
        message.channel.send(`**Escolha uma opção a baixo**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Digite qualquer outra coisa ou aguarde 60 segundos para cancelar*`)
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Pesquisa cancelada`))
    .on("error", (message, err) => message.channel.send(`${client.emotes.error} | Aconteceu um erro: ${err}`))

client.login(config.token)