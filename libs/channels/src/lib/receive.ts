import {Io} from "./io"
import {Redis} from "ioredis"

const errorCallback = (err: any, channel: Io) => {
    err ? console.error(`${channel} subscription: error`, err) : console.log(`${channel} subscription: success`)
}

export const receive = (channel: Io, redis: Redis, handler: (message: any) => void): void => {
    redis.subscribe(channel, (err) => errorCallback(err, channel))
    redis.on('message', (channel: keyof Io, message: any) => {
        console.log(`Получено сообщение для ${channel as string}: ${message}`)
        try {
            handler(message)
        } catch (err) {
            console.error(`Сообщение в канале ${channel as string}, не обработано: ${err}`)
        }
    })
}
