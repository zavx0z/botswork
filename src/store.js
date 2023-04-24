import ssoModel from "./shared/sso/ssoModel"
import {applyPatch, types} from "mobx-state-tree"
import {supportAtom} from "./atom/support/supportAtom"
import {messageProtons} from "./core/proton/messageProton"
import {dialogProtons} from "./core/proton/dialogProton"
import {userProtons} from "./core/proton/userProton"
import {interEntanglement} from "./atom/support/supportAtom"
import {sioAfterConnect} from "./shared/sio/sioMiddleware"
import channel from "./shared/chat/channels"

const protons = types.compose(
    userProtons,
    dialogProtons,
    messageProtons,
)

const atoms = types.model({
    support: types.maybeNull(supportAtom),
})

const neutrons = types.model({
    sso: types.maybeNull(ssoModel),
})

const quantumModel = types
    .model("root", {
        atom: atoms,
        proton: protons,
        neutron: neutrons,
    })

const store = quantumModel.create({
    proton: {},
    atom: {},
    neutron: {sso: {}},
})

interEntanglement(store)

// sioModel,

sioAfterConnect(store, (sio, store) => {
    sio.emitWithAck(channel.USERS, {})
        .then(data => applyPatch(store, {op: 'replace', value: data, path: '/proton/user'}))
    sio.emitWithAck(channel.DIALOG, {})
        .then(data => applyPatch(store, {op: 'replace', value: data, path: '/proton/dialog'}))
    sio.emitWithAck(channel.MESSAGE, {})
        .then(data => applyPatch(store, {op: 'replace', value: data, path: '/proton/message'}))
})

export default store
