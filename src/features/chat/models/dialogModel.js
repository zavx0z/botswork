import {getRoot, types} from "mobx-state-tree"
import {messageModel} from "./messageModel"
import moment from "moment-timezone"
import {timezone} from "../utils/date"

export const Dialog = types
    .model('dialog', {
        id: types.identifierNumber,
        name: types.string,
        ownerId: types.number,
        messages: types.array(messageModel),

        totalMessages: types.number,
        unreadMessages: types.number,
        lastMessageText: types.string,
        lastMessageTime: types.string,
        lastMessageSenderId: types.number,
    })
    .actions(self => ({
        addMessage(data) {
            self['messages'].push(messageModel.create(data))
        },
        sendMessage(text) {
            self['messages'].push(messageModel.create({
                id: -1,
                text: text,
                senderId: getRoot(self)['id'],
                created: moment().toISOString(),
                read: false,
                sent: true
            }))
        },
        readMessage() {
            if (self['unreadMessages']) {
                console.log('readMessage')
                let unread = []
                self['messages'].forEach(message => (!message.isSentByMe && !message.read && unread.push(message.id)))
                return {dialogId: self['id'], messageIds: unread}
            }
        }
    }))
    .views(self => ({
        get messagesByDay() {
            return self['messages'].reduce((acc, message) => {
                const date = moment.utc(message.created).tz(timezone).startOf("day").format('DD.MM.YYYY')
                if (!acc[date])
                    acc[date] = []
                acc[date].push(message)
                return acc
            }, {})
        },
        get username() {
            const {users} = getRoot(self)
            if (!self.ownerId || !users.length) return ''
            const user = users.find(user => user.id === self['ownerId'])
            return user.name
        },
        get lastMessage() {
            const msg = self['messages'].length ? self['messages'].slice(-1)[0].text : self['lastMessageText']
            const dt = moment.utc(self['lastMessageTime']).tz(timezone).format('DD.MM HH:mm')
            return `${dt} ${msg}`
        },
    }))