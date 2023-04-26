import {types} from "mobx-state-tree"

const protonMessage = types
    .model('protonMessage', {
        id: types.identifierNumber,
        text: types.string,
        senderId: types.integer,
        created: types.string,
        read: types.boolean,
        sent: types.maybe(types.boolean),
        dialogId: types.integer
    })
export default  types.model({message: types.maybeNull(types.map(protonMessage))})