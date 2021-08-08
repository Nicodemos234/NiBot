import { Client } from "@typeit/discord"
import DisTube = require("distube")


export interface ClientConfig {
    prefix: string,
    token: string,
    emoji: Emotes
}

export interface MyClient extends Client {
    config?: ClientConfig,
    distube?: DisTube,
    commands?: any,
    aliases?: any,
    emotes?: Emotes,
}

export interface Emotes {
    play: string,
    stop: string,
    queue: string,
    success: string,
    repeat: string,
    error: string
}