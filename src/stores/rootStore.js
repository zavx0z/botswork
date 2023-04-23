import ssoModel from "../shared/secure/ssoModel"
import {applyPatch, types} from "mobx-state-tree"
import dialogsModel from "../shared/chat/models/dialogsModel"
import usersModel from "../shared/users/models/modelUsers"
import sioModel from "../shared/sio/sioModel"
import {supportAtom} from "../atom/support/supportAtom"
import {messageProtons} from "../core/proton/messageProton"
import {dialogProtons} from "../core/proton/dialogProton"
import {userProtons} from "../core/proton/userProton"
import {interEntanglement} from "../atom/support/entanglement"
import {sioAfterConnect} from "../shared/sio/sioMiddleware"
import channel from "../shared/chat/channels"

const protons = types.compose(
    userProtons,
    dialogProtons,
    messageProtons,
)

const atoms = types.model({
    support: types.maybeNull(supportAtom),
})

const neutrons = types.model({
    user: ssoModel,
})

const rootStore = types
    .compose(
        types.model('atom', {atom: atoms}),
        types.model('proton', {proton: protons}),
        // types.model('neutron', {neutron: neutrons}),

        ssoModel,
        sioModel,
        usersModel,
        dialogsModel,
    )
    .named("root")
    .create({})

interEntanglement(rootStore)

sioAfterConnect(rootStore, (sio, store) => {
    sio.emitWithAck(channel.USERS, {})
        .then(data => applyPatch(store, {op: 'replace', value: data, path: '/proton/user'}))
    sio.emitWithAck(channel.DIALOG, {})
        .then(data => applyPatch(store, {op: 'replace', value: data, path: '/proton/dialog'}))
    sio.emitWithAck(channel.MESSAGE, {})
        .then(data => applyPatch(store, {op: 'replace', value: data, path: '/proton/message'}))
})

export default rootStore
