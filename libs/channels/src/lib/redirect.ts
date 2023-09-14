import {type Socket} from "socket.io"
import {Io} from "./io"
import {type Redis} from "ioredis"

const errorCallback = (err: any, channel: Io, message: any) => {
    err ?
        console.error(`${channel} publish: error`, err) :
        console.log(`${channel} publish: success`, message)
}

interface Redirect {
    to: Io
    socket: Socket,
    redis: Redis,
}

export const redirect = ({to, socket, redis}: Redirect): void => {
    socket.on(to, (message) => {
        redis.publish(to, message, (err: any) => errorCallback(err, to, message))
    })
}
