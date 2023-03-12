import {applyPatch, getEnv, getRoot, types} from 'mobx-state-tree'
import axios from "axios"
import {ACCESS_TOKEN} from "../secure/const"
import moment from "moment"

const Message = types.model({
    id: types.identifierNumber,
    text: types.string,
    senderId: types.integer,
    created: types.string,
})
    .views(self => ({
        get date() {
            return moment(self['created']).format('DD.MM.YYYY HH:mm:ss')
        },
        get senderName() {
            const {id, username} = getRoot(self)
            if (self['senderId'] === id)
                return username[0]
            return "Ad"
        }
    }))

const chatModel = types
    .model({
        messages: types.array(Message),
    })
    .actions((self) => {
        const {socket} = getEnv(self)
        return {
            afterCreate() {
                socket.on('support', (data) => {
                    self.addMessage(data)
                })
            },
            sendMessage(text) {
                console.log(self.id)
                socket.emit('message', {text, senderId: self.id})
            },
            addMessage(data) {
                self.messages.push(Message.create(data))
            },
            async getMessages() {
                await axios
                    .get('/chat/support/' + self['id'], {headers: {Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
                    .then((response) => applyPatch(self, {op: 'replace', path: '/messages', value: response.data}))
            },
        }
    })

export default chatModel
