import {types} from 'mobx-state-tree'
import io from 'socket.io-client'
import userStore from "../secure/userStore"

const Message = types.model({
    id: types.identifierNumber,
    text: types.string,
    userId: types.integer,
}).views(self => ({
    get user() {
        if (userStore.id === self.userId)
            return userStore.username[0]
        else return 'A'
    }
}))

const chatModel = types
    .model({
        messages: types.array(Message),
    })
    .actions((self) => {
        let socket

        return {
            afterCreate() {
                // подключение к серверу по WebSocket-соединению
                socket = io(process.env.REACT_APP_HOST, {transports: ['polling']})
                    .on("connect", socket => {
                        console.log("Connected")
                        // socket.emit('join', 'manager')
                    })

                // обработчик нового сообщения
                socket.on('message', (data) => {
                    self.addMessage(data)
                })
            },
            sendMessage(text, userId) {
                socket.emit('message', {text, userId})
            },
            addMessage(data) {
                self.messages.push(Message.create({id: data.id, text: data.text, userId: data.userId}))
                console.log([...self.messages])
            },
        }
    })

export default chatModel
