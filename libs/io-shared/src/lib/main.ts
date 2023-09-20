import express, {Express} from 'express'
import http from 'http'
import {Server} from 'socket.io'
import {createAdapter} from '@socket.io/redis-adapter'
import {Redis} from 'ioredis'
import {Io} from "channels"
import {DefaultEventsMap, EventsMap} from "socket.io/dist/typed-events"
// import {redirect} from "./redirect"
// import {receive} from "./receive"


export const SioRedisRestAPI = <
    ListenEvents extends EventsMap = DefaultEventsMap,
    EmitEvents extends EventsMap = ListenEvents,
    ServerSideEvents extends EventsMap = DefaultEventsMap,
    SocketData = any
>({channelName, channelHandler, port, redisHost, redisPort}: {
    channelName: Io
    channelHandler: (io: Server<ListenEvents, EmitEvents, ServerSideEvents, SocketData>, message: any) => void
    port: number
    redisHost: string
    redisPort: number
    // redirectChannels: Io[]
}): {
    app: Express
    io: Server<ListenEvents, EmitEvents, ServerSideEvents, SocketData>
    pub: Redis
    sub: Redis
} => {
    const app = express()
    const server = http.createServer(app)
    const io = new Server<ListenEvents, EmitEvents, ServerSideEvents, SocketData>(server, {cors: {origin: "*"}})

    const pubClient = new Redis({host: redisHost, port: redisPort})
    pubClient.on("error", (err) => {
        console.log(err)
    })

    const subClient = pubClient.duplicate()
    subClient.on("error", (err) => {
        console.log(err)
    })
    io.adapter(createAdapter(pubClient, subClient))
    io.use((socket, next) => {
        // const header = socket.handshake.headers['authorization']
        // console.log(socket)
        // if (!header) {
        //     console.log('not authorized')
        //     return next(new Error('authentication error'))
        // }
        // const token = header.split(' ')[1]
        // const uuid = jwt_decode(token)['uuid']
        // console.log(uuid)
        return next()
    })

    io.on('connection', async (socket) => {
        socket.join(Io.CONNECT)
        // const userAgent = socket.handshake.headers['user-agent']
        console.log("Connected:", socket.id)
        const sockets = await io.fetchSockets()
        console.log("FetchSockets:", sockets.length)

        socket.on('disconnect', () => console.log("Disconnected:", socket.id))
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        io.emit(Io.CONNECT, "Connection")
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore`
        socket.on(channelName, (message) => {
            channelHandler(io, message)
        })
        // redirectChannels.forEach(ch => redirect(ch, socket, pubClient))
    })

    // receive(channelName, subClient, (message) => {
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     // @ts-ignore
    //     channelHandler(io, message)
    // })

    app.get(`/io/${channelName}`, (req, res) => {
        res.send({message: `Welcome to io-${channelName}!`})
    })

    server.on('error', console.error)
    server.listen(port, () => console.log(`Listening at http://localhost:${port}/io/${channelName}`))

    return {app, io, pub: pubClient, sub: subClient}
}