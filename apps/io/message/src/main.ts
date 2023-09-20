import {Io} from 'channels'
import {SioRedisRestAPI} from "io-shared"
import * as process from "process"

const channelName = Io.MESSAGE
const port = parseInt(process.env.IO_MESSAGE_PORT)

SioRedisRestAPI({
    channelName,
    port,
    redisHost: process.env.REDIS_HOST,
    redisPort: parseInt(process.env.REDIS_PORT),
    channelHandler: (io, message) => {
        io.emit(channelName, message)
        console.log("main.ts:17-", message)
    }
})
