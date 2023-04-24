import ssoModel from "./shared/sso/ssoModel"
import {applyPatch, types} from "mobx-state-tree"
import {interEntanglement, supportAtom} from "./atom/supportAtom"
import {messageProtons} from "./core/proton/messageProton"
import {dialogProtons} from "./core/proton/dialogProton"
import {userProtons} from "./core/proton/userProton"
import {sioAfterConnect} from "./shared/sio/sioMiddleware"
import channel from "./shared/chat/channels"
import {infoAtoms, infoData} from "./atom/infoAtom"

const neutron = types.model('neutron', {
    sso: types.maybeNull(ssoModel),
})
const proton = types.compose(
    userProtons,
    dialogProtons,
    messageProtons,
).named('proton')
const atom = types.model('atom', {
    support: types.maybeNull(supportAtom),
    info: infoAtoms
})
const quantumModel = types.model("root", {
    atom: atom,
    proton: proton,
    neutron: neutron
})
export const quantum = quantumModel.create({
    atom: {
        info: infoAtoms.create(infoData)
    },
    proton: {},
    neutron: {sso: {}},
})
interEntanglement(quantum)
// sioModel,
sioAfterConnect(quantum, (sio, store) => {
    sio.emitWithAck(channel.USERS, {})
        .then(data => applyPatch(store, {op: 'replace', value: data, path: '/proton/user'}))
    sio.emitWithAck(channel.DIALOG, {})
        .then(data => applyPatch(store, {op: 'replace', value: data, path: '/proton/dialog'}))
    sio.emitWithAck(channel.MESSAGE, {})
        .then(data => applyPatch(store, {op: 'replace', value: data, path: '/proton/message'}))
})
export default quantum