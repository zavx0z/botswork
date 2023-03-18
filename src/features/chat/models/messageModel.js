import {getRoot, types} from "mobx-state-tree"
import moment from "moment-timezone"

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

export const messageModel = types.model({
    id: types.identifierNumber,
    text: types.string,
    senderId: types.integer,
    created: types.string,
    read: types.boolean
})
    .actions(self => ({
        setRead() {
            self.read = true
        }
    }))
    .views(self => ({
        get date() {
            return moment.utc(self['created']).tz(timezone).format('HH:mm')
        },
        get senderName() {
            if (this.isSentByMe)
                return getRoot(self)['username']
            return "Admin"
        },
        get isSentByMe() {
            return self['senderId'] === getRoot(self)['id']
        }
    }))