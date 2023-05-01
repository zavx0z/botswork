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
import atomCamera from "./atom/camera/atomCamera"
import atomArea from "./atom/area/atomArea"
import superpositionArea from "./atom/area/superpositionArea"

const model = types
    .model("everything", {
        atom: types.model('atom', {
            support: types.maybeNull(atomSupport),
            info: atomsInfo,
            profile: types.maybeNull(atomProfile),
            camera: atomCamera,
            area: atomArea,
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
        }),
    })
const canvas = neutronCanvas.create({})
const everything = model.create({
    atom: {
        info: atomsInfo.create(organismInfo),
        camera: {
            core: {
                canvas: canvas,
            },
            far: 120,
            near: 70,
            fov: 3.61,
            position: {
                x: 0,
                y: 2.21,
                z: 74.44,
            }
        },
        area: {
            core: {
                canvas: canvas,
            },
            path: '/glb/area.glb',
        },
    },
    proton: {},
    neutron: {
        sio: {
            host: process.env.REACT_APP_HOST_WSS,
        },
        sso: {},
        logging: {
            nameLength: 10,
            itemLength: 15,
        },
        canvas: canvas
    },
})
superpositionArea(everything)

entanglementSupport(everything)
entanglementProfile(everything)

protonsMessagesInit(everything)

const protonsUsersInit = everything => sioAfterConnect(everything, sio => sio
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

const protonsDialogsInit = everything => sioAfterConnect(everything, sio => sio
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
protonsUsersInit(everything)
protonsDialogsInit(everything)
export default everything