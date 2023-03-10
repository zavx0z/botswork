import {types} from 'mobx-state-tree'
import io from 'socket.io-client'

const Message = types.model({
    id: types.identifierNumber,
    text: types.string,
    sender: types.integer,
    senderName: types.string,
})

const chatModel = types
    .model({
        messages: types.array(Message),
    })
    .actions((self) => {
        let socket
        return {
            afterCreate() {
                socket = io(process.env.REACT_APP_HOST, {transports: ['polling']})
                    .on("connect", socket => {
                        console.log("Connected")
                    })
                socket.on('message', (data) => {
                    self.addMessage(data)
                })
            },
            sendMessage(text) {
                socket.emit('message', {text, sender: self.id})
            },
            addMessage(data) {
                self.messages.push(Message.create(data))
            },
        }
    })

export default chatModel
