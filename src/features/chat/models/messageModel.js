import {getRoot, types} from "mobx-state-tree"
import moment from "moment/moment"

export const messageModel = types.model({
    id: types.identifierNumber,
    text: types.string,
    senderId: types.integer,
    created: types.string,
})
    .views(self => ({
        get date() {
            return moment(self['created']).format('HH:mm')
        },
        get senderName() {
            const {id, username} = getRoot(self)
            if (self['senderId'] === id)
                return username
            return "Admin"
        }
    }))