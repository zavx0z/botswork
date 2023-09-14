import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import {createAdapter} from '@socket.io/redis-adapter'
import {Redis} from 'ioredis'
import {Io, receive, redirect} from 'channels'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {cors: {origin: "*"}})
const redisClient = new Redis({host: 'localhost', port: 6379})
const pubClient = redisClient.duplicate()
const subClient = redisClient.duplicate()


io.adapter(createAdapter(pubClient, subClient))

io.on('connection', (socket) => {
    console.log(`Client connected on ${Io.CHAT}:`, socket.id)

    redirect({to: Io.DIALOG, socket, redis: pubClient})
    redirect({to: Io.MESSAGE, socket, redis: pubClient})
    redirect({to: Io.CONNECTION, socket, redis: pubClient})

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
    })
})
const handler = (message) => {
    console.log(`main.ts:28-${message}`)
}
receive({channel: Io.CHAT, redis: subClient, handler})


app.get('/api', (req, res) => {
    res.send({message: 'Welcome to io-chat!'})
})


const port = process.env.IO_CHAT_PORT
server.listen(port, () => console.log(`Listening at http://localhost:${port}/api`))
server.on('error', console.error)
