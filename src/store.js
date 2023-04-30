import {applyPatch, types} from "mobx-state-tree"
import atomSupport, {entanglementSupport} from "./atom/atomSupport"
import protonsMessage, {protonsMessagesInit} from "./core/proton/protonMessage"
import protonsDialog from "./core/proton/protonDialog"
import protonsUser from "./core/proton/protonUser"
import {sioAfterConnect} from "./core/neutron/sio/sioMiddleware"
import channel from "./shared/chat/channels"
import {atomsInfo} from "./atom/atomInfo"
import {neutronLogging} from "./core/neutron/neutronLogging"
import {organismInfo} from "./organism/info"
import neutronSSO from "./core/neutron/sso/neutronSSO"
import atomProfile, {entanglementProfile} from "./atom/atomProfile"
import neutronSIO from "./core/neutron/sio/neutronSIO"
import neutronCanvas from "./core/neutron/canvas/neutronCanvas"
import neutronCamera from "./core/neutron/camera/neutronCamera"

const model = types
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
        neutron: types.model({
            sso: neutronSSO,
            logging: neutronLogging,
            sio: neutronSIO,
            canvas: neutronCanvas,
            camera: neutronCamera,
        }),
    })
const quantum = model.create({
    atom: {
        info: atomsInfo.create(organismInfo),
    },
    proton: {},
    neutron: {
        canvas: {},
        camera: {
            far: 111,
            near: 70,
            fov: 3.61,
            position: {
                x: 0,
                y: 2.21,
                z: 74.44,
                config: {}
            }
        },
        sio: {
            host: process.env.REACT_APP_HOST_WSS,
        },
        sso: {},
        logging: {
            nameLength: 10,
            itemLength: 15,
        }
    },
})
entanglementSupport(quantum)
entanglementProfile(quantum)

protonsMessagesInit(quantum)

const protonsUsersInit = quantum => sioAfterConnect(quantum, sio => sio
    .emitWithAck(
        channel.USERS,
        {}
    )
    .then(data =>
        applyPatch(quantum, {
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

const protonsDialogsInit = quantum => sioAfterConnect(quantum, sio => sio
    .emitWithAck(
        channel.DIALOG,
        {}
    )
    .then(data => applyPatch(quantum, {
        op: 'replace',
        value: data,
        path: '/proton/dialog'
    }))
    .then(channel.DIALOG)
)
protonsUsersInit(quantum)
protonsDialogsInit(quantum)
export default quantum