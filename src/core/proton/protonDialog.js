import {applyPatch, getRoot, types} from "mobx-state-tree"
import {sioAfterConnect} from "../neutron/sio/sioMiddleware"
import channel from "../../shared/chat/channels"

export const protonDialog = types
    .model('protonDialog', {
        id: types.identifierNumber,
        name: types.string,
        ownerId: types.number,
    })

export default types
    .model({
        dialog: types.map(protonDialog)
    })
    .actions(self => {
        const everything = getRoot(self)
        sioAfterConnect(everything, sio => sio
            .emitWithAck(
                channel.DIALOG,
                {}
            )
            .then(data => applyPatch(everything, {
                op: 'replace',
                value: data,
                path: '/proton/dialog'
            }))
            .then(channel.DIALOG)
        )
        return {}
    })

