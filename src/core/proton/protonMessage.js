import {applyPatch, types} from "mobx-state-tree"
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

const mstPath = '/proton/message'
const op = 'replace'

export const protonsMessagesInit = quantum => sioAfterConnect(quantum, sio => sio
    .emitWithAck(
        channel.MESSAGE,
        {}
    )
    .then(data => {
        if (data) {
            applyPatch(quantum, {
                op: op,
                value: data,
                path: mstPath
            })
            return Promise.resolve(data.length)
        }
        return Promise.reject(new Error('Сообщения не получены'))
    })
    .then(count => console.log(mstPath, op, `получено ${count} сообщени[е|й]`))
    .catch(error => console.log(mstPath, op, error))
)

export default protonsMessage
