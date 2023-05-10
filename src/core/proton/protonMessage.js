import {applyPatch, getRoot, types} from "mobx-state-tree"
import {sioAfterConnect} from "../neutron/sio/sioMiddleware"
import channel from "../../shared/chat/channels"

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
const protonsMessage = types
    .model({
        message: types.maybeNull(types.map(protonMessage))
    })
    .actions(self => {
        const everything = getRoot(self)
        const op = 'replace'
        const mstPath = '/proton/message'
        sioAfterConnect(everything, sio => sio
            .emitWithAck(channel.MESSAGE, {})
            .then(data => {
                if (!data)
                    return Promise.reject(new Error('Сообщения не получены'))
                applyPatch(everything, {op: op, value: data, path: mstPath})
                return Promise.resolve(data.length)
            })
            .then(count => console.log(mstPath, op, `получено ${count} сообщени[е|й]`))
            .catch(error => console.log(mstPath, op, error))
        )
        return {}
    })
export default protonsMessage
