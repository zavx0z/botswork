import {applyPatch, types} from "mobx-state-tree"
import {sioAfterConnect} from "../../shared/sio/sioMiddleware"
import channel from "../../shared/chat/channels"

const dialogProton = types
    .model({
        id: types.identifierNumber,
        name: types.string,
        ownerId: types.number,
    })
export default dialogProton

export const dialogProtons = types.model({dialog: types.map(dialogProton)})

