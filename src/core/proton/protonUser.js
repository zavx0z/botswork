import {applyPatch, getRoot, types} from "mobx-state-tree"
import {sioAfterConnect} from "../neutron/sio/sioMiddleware"
import channel from "../../shared/chat/channels"

const protonUser = types
    .model('protonUser', {
        id: types.identifierNumber,
        name: types.string,
    })
const protonsUser = types
    .model('protonsUser', {
        user: types.map(protonUser)
    })
    .actions(self => {
        const everything = getRoot(self)
        sioAfterConnect(everything, sio => sio
            .emitWithAck(
                channel.USERS,
                {}
            )
            .then(data =>
                applyPatch(everything, {
                    op: 'replace',
                    value: data,
                    path: '/proton/user'
                }))
            .then(count => console.log(
                '/proton/message',
                'replace',
                `получено ${count} сообщени[е|й]`)
            )
            .catch(error => console.log(
                '/proton/message',
                'replace',
                error
            ))
        )
        return {}
    })
export default protonsUser