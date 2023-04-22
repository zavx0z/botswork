import {types} from "mobx-state-tree"

const messageProton = types
    .model({
        id: types.identifierNumber,
        text: types.string,
        senderId: types.integer,
        created: types.string,
        read: types.boolean,
        sent: types.maybe(types.boolean),
        dialogId: types.integer
    })
export default messageProton