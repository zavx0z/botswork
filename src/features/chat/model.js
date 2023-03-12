import {applyPatch, types} from 'mobx-state-tree'
import axios from "axios"
import {ACCESS_TOKEN} from "../secure/const"
import {messageModel} from "./models/messageModel"

const chatModel = types
    .model({
        messages: types.array(messageModel),
    })
    .actions((self) => ({
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

export default chatModel
