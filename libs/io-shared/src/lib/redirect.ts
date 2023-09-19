import {type Socket} from "socket.io"
import {type Redis} from "ioredis"
import {Io} from "channels"

const errorCallback = (err: any, channel: Io, message: any) => {
    err ?
        console.error(`${channel} publish: error`, err) :
        console.log(`${channel} publish: success`, message)
}

export const redirect = (to: Io, socket: Socket, redis: Redis): void => {
    socket.on(to, (message) => {
        redis.publish(to, message, (err: any) => errorCallback(err, to, message))
    })
}
