import {applyPatch, types} from "mobx-state-tree"
import atomSupport, {superpositionSupport} from "./atom/atomSupport"
import protonsMessage, {protonsMessagesInit} from "./core/proton/protonMessage"
import protonsDialog from "./core/proton/protonDialog"
import protonsUser from "./core/proton/protonUser"
import {sioAfterConnect} from "./core/neutron/sio/sioMiddleware"
import channel from "./shared/chat/channels"
import {atomsInfo} from "./atom/atomInfo"
import {neutronLogging} from "./core/neutron/neutronLogging"
import {organismInfo} from "./organism/info"
import neutronSSO from "./core/neutron/sso/neutronSSO"
import atomProfile, {superpositionProfile} from "./atom/atomProfile"
import neutronSIO from "./core/neutron/sio/neutronSIO"
import neutronCanvas from "./core/neutron/canvas/neutronCanvas"
import atomCamera from "./atom/camera/atomCamera"
import atomArea from "./atom/atomArea"
import atomBotsWork from "./atom/atomBotsWork"
import {themeColor} from "./shared/layout/theme/palette"
import atomBotik from "./atom/atomBotik"
import atomChelik from "./atom/atomChelik"

const model = types
    .model("everything", {
        atom: types.model('atom', {
            support: types.maybeNull(atomSupport),
            info: atomsInfo,
            profile: types.maybeNull(atomProfile),
            camera: atomCamera,
            area: atomArea,
            botsWork: atomBotsWork,
            botik: atomBotik,
            chelik: atomChelik,
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
const canvas = neutronCanvas.create({
    backgroundColor: themeColor.palette.primary.main
})
const everything = model.create({
    proton: {},
    neutron: {
        sio: {host: process.env.REACT_APP_HOST_WSS},
        sso: {},
        logging: {
            nameLength: 10,
            itemLength: 15,
            include: [
                'atomBotsWork',
                'atomArea',
                'atomBotik',
                'atomCamera',
            ],
            exclude: [
                'atomChelik',
            ]
        },
        canvas: canvas
    },
    atom: {
        info: atomsInfo.create(organismInfo),
        camera: {
            core: {canvas},
            far: 4444,
            near: 70,
            fov: 3.61,
            position: {
                x: 0,
                y: 2.21,
                z: 74.44,
            }
        },
        area: {
            core: {canvas},
            glbPath: '/glb/area.glb',
            paddingX: 20,
        },
        botsWork: {
            core: {canvas},
            glbPath: '/glb/BotsWork.glb',
        },
        botik: {
            core: {canvas},
            glbPath: '/glb/botik.glb',
        },

        chelik: {
            core: {canvas},
            glbPath: '/glb/chelik.glb'
        }
    },
})

superpositionSupport(everything)
superpositionProfile(everything)

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