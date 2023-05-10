import {types} from "mobx-state-tree"
import atomSupport from "./atom/atomSupport"
import protonsMessage from "./core/proton/protonMessage"
import protonsDialog from "./core/proton/protonDialog"
import protonsUser from "./core/proton/protonUser"
import {atomsInfo} from "./atom/atomInfo"
import {neutronLogging} from "./core/neutron/neutronLogging"
import neutronSSO from "./core/neutron/sso/neutronSSO"
import atomProfile from "./atom/atomProfile"
import neutronSIO from "./core/neutron/sio/neutronSIO"
import neutronCanvas from "./core/neutron/canvas/neutronCanvas"
import atomArea from "./atom/atomArea"
import atomBotsWork from "./atom/atomBotsWork"
import atomBotik from "./atom/atomBotik"
import atomChelik from "./atom/atomChelik"

const model = types
    .model("everything", {
        atom: types.model('atom', {
            support: types.maybeNull(atomSupport),
            info: atomsInfo,
            profile: types.maybeNull(atomProfile),
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

export default model