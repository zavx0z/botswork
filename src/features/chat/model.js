import {getEnv, types} from 'mobx-state-tree'

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
        const {socket} = getEnv(self)
        return {
            afterCreate() {
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
