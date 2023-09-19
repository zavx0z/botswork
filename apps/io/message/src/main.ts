import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import {createAdapter} from '@socket.io/redis-adapter'
import {Redis} from 'ioredis'
import {Io} from 'channels'
import {receive, redirect} from "io-shared"
import * as process from "process"
// ========================================= PROJECT ENV =============================================
const channel = Io.MESSAGE
const port = process.env.SOCKET_PORT
// ========================================= CONNECTIONS =============================================
const app = express()
const server = http.createServer(app)
const io = new Server(server, {cors: {origin: "*"}})
const pubClient = new Redis({host: process.env.REDIS_HOST, port: parseInt(process.env.REDIS_PORT)})
const subClient = pubClient.duplicate()
io.adapter(createAdapter(pubClient, subClient))
// ================================ SOCKET.IO + REDIS PUBLICATION ====================================
io.on('connection', (socket) => {
    console.log("Connected:", socket.id)
    socket.on('disconnect', () => console.log("Disconnected:", socket.id))

    redirect(Io.CHAT, socket, pubClient)
    redirect(Io.DIALOG, socket, pubClient)
    redirect(Io.CONNECT, socket, pubClient)

    socket.on(channel, (message) => {
        console.log(`main.ts:27-${message}`)
    })
})
// ======================================= REDIS SUBSCRIBE ===========================================
receive(channel, subClient, (message) => {
    console.log(`main.ts:30-${message}`)
})
// ========================================== REST API ================================================
app.get(`/io/${channel}`, (req, res) => {
    res.send({message: 'Welcome to io-chat!'})
})
// ============================================ RUN ====================================================
server.listen(port, () => console.log(`Listening at http://localhost:${port}/io/${channel}`))
server.on('error', console.error)
