import {applyPatch, types} from 'mobx-state-tree'
import axios from "axios"
import {ACCESS_TOKEN} from "../secure/const"
import {messageModel} from "./models/messageModel"

const chatModel = types
    .model({
        messages: types.array(messageModel),
    })
    .volatile(self => ({
        totalMessages: types.integer,
        unreadMessages: types.integer,
        dialogId: types.integer,
    }))
    .actions((self) => ({
        setDialogId(id) {
            self.dialogId = id
        },
        setTotalMessages(count) {
            self.totalMessages = count
        },
        setUnreadMessages(count) {
            self.unreadMessages = count
        },
        readMessages() {
            if (self.unreadMessages) {
                const unreadMessages = self['messages'].map(message => {
                    if (!message.isSentByMe && !message.read)
                        message.read = true
                    return message.id
                })
                // self.setUnreadMessages(0)
                self['sio'].emit('chat', {
                    action: 'read',
                    data: {
                        dialogId: self.dialogId,
                        messageIds: unreadMessages
                    }
                })
            }
        },
        sendMessage(text) {
            self['sio'].emit('support', {
                ownerId: self['id'],
                senderId: self['id'],
                text: text,
            })
        },
        addMessage(data) {
            self.messages.push(messageModel.create(data))
        },
        async getMessages() {
            await axios
                .get('/chat/support/' + self['id'], {headers: {Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
                .then((response) => applyPatch(self, {op: 'replace', path: '/messages', value: response.data}))
        },
    }))
// .views(self => ({
//     get supportNotReadMessage() {
//         const msgs = self['messages'].filter(message => message.readTime === null)
//         return msgs.length
//     }
// }))

export default chatModel
