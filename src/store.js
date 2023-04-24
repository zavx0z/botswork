import {applyPatch, types} from "mobx-state-tree"
import atomSupport, {entanglementSupport} from "./atom/atomSupport"
import protonsMessage from "./core/proton/protonMessage"
import protonsDialog from "./core/proton/protonDialog"
import protonsUser from "./core/proton/protonUser"
import {sioAfterConnect} from "./shared/sio/sioMiddleware"
import channel from "./shared/chat/channels"
import {atomsInfo} from "./atom/atomInfo"
import {neutronLogging} from "./core/neutron/neutronLogging"
import {organismInfo} from "./organism/info"
import neutronSSO from "./core/neutron/neutronSSO"
import atomProfile, {entanglementProfile} from "./atom/atomProfile"

const quantum = types
    .model("quantum", {
        atom: types.model('atom', {
            support: types.maybeNull(atomSupport),
            info: atomsInfo,
            profile: types.maybeNull(atomProfile),
        }),
        proton: types.compose(
            protonsUser,
            protonsDialog,
            protonsMessage,
        ).named('proton'),
        neutron: types.model('neutron', {
            sso: neutronSSO,
            logging: neutronLogging,
        })
    })
    .create({
        atom: {
            info: atomsInfo.create(organismInfo),
        },
        proton: {},
        neutron: {
            sso: {},
            logging: {
                nameLength: 10,
                itemLength: 15,
            }
        },
    })

entanglementSupport(quantum)
entanglementProfile(quantum)

sioAfterConnect(quantum, (sio, store) => {
    sio.emitWithAck(channel.USERS, {})
        .then(data => applyPatch(store, {op: 'replace', value: data, path: '/proton/user'}))
    sio.emitWithAck(channel.DIALOG, {})
        .then(data => applyPatch(store, {op: 'replace', value: data, path: '/proton/dialog'}))
    sio.emitWithAck(channel.MESSAGE, {})
        .then(data => applyPatch(store, {op: 'replace', value: data, path: '/proton/message'}))
})
export default quantum