import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import {createAdapter} from '@socket.io/redis-adapter'
import {Redis} from 'ioredis'
import {Io} from 'channels'
import {receive, redirect} from "io-shared"
import * as process from "process"
// ========================================= PROJECT ENV =============================================
const channel = Io.CONNECT
const port = process.env.SOCKET_PORT
// ========================================= CONNECTIONS =============================================
const app = express()
const server = http.createServer(app)
const io = new Server(server, {cors: {origin: "*"}})
const pubClient = new Redis({host: process.env.REDIS_HOST, port: parseInt(process.env.REDIS_PORT)})
pubClient.on("error", (err) => {
    console.log(err)
})
const subClient = pubClient.duplicate()

io.adapter(createAdapter(pubClient, subClient))
// ================================ SOCKET.IO + REDIS PUBLICATION ====================================
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
    const userAgent = socket.handshake.headers['user-agent']
    const sid = socket.id
    console.log("Connected:", sid)

    const sockets = await io.fetchSockets()
    console.log("FetchSockets:", sockets.length)
    socket.on('disconnect', () => console.log("Disconnected:", socket.id))

    redirect(Io.CHAT, socket, pubClient)
    redirect(Io.DIALOG, socket, pubClient)
    redirect(Io.MESSAGE, socket, pubClient)

    socket.on(channel, (message) => {
        io.emit(channel, message)
        console.log(`main.ts:27-${message}`)
    })
})
// ======================================= REDIS SUBSCRIBE ===========================================
receive(channel, subClient, (message) => {
    io.emit(channel, message)
    console.log(`main.ts:30-${message}`)
})
// ========================================== REST API ================================================
app.get(`/io/${channel}`, (req, res) => {
    res.send({message: 'Welcome to io-chat!'})
})
// ============================================ RUN ====================================================
server.listen(port, () => console.log(`Listening at http://localhost:${port}/io/${channel}`))
server.on('error', console.error)
