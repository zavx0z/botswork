import React from 'react'
import ReactDOM from 'react-dom/client'
import './shared/layout/theme/index.css'
import {Provider} from "mobx-react"
import './i18n.js'
import i18next from "i18next"
import {ThemeProvider} from "@mui/material/styles"
import theme from "./shared/layout/theme/theme"
import {SnackbarProvider} from "notistack"
import middlewareNetworkError from "./core/neutron/sso/middleware/network"
import {isMobile} from "react-device-detect"
import * as serviceWorkerRegistration from './shared/pwa/serviceWorkerRegistration'
import {entanglement_SIO_SSO} from "./core/neutron/sio/sioMiddleware"
import pwaModel from "./shared/pwa/pwaModel"
import logo from './resource/images/logo.png'
import pwaNotificationMiddleware from "./shared/pwa/pwaStore"
import App from "./App"
import {entanglement_Logging_SIO} from "./core/neutron/neutronLogging"
import neutronCanvas from "./core/neutron/canvas/neutronCanvas"
import {themeColor} from "./shared/layout/theme/palette"
import {atomsInfo} from "./atom/atomInfo"
import {organismInfo} from "./organism/info"
import model from "./model"

i18next.on('languageChanged', lng => void document.documentElement.setAttribute('lang', lng))

export const pwaStore = pwaModel.create({iconMessage: logo})
serviceWorkerRegistration.register({
    onUpdate: (serviceWorker) => pwaStore.setNewVersionExist(serviceWorker),
    onSuccess: (serviceWorker) => pwaStore.setServiceWorker(serviceWorker)
})

const canvas = neutronCanvas.create({
    containerId: '#metafor',
    bgColor: themeColor.palette.primary.main,
    height: 7 * 8,
    confGL: {
        alpha: true,
        shadow: true,
        antialias: true
    },
    confCamera: {
        fov: 5,
        near: 70,
        far: 4444,
        position: [0, 2.21, 72]
    }
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
        area: {
            core: {canvas},
            glbPath: '/glb/area.glb',
            paddingX: 0,
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
entanglement_SIO_SSO(everything)
middlewareNetworkError(everything)
entanglement_Logging_SIO(everything)
pwaNotificationMiddleware(everything)

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <SnackbarProvider anchorOrigin={{vertical: 'bottom', horizontal: isMobile ? 'center' : 'left'}}>
            <Provider everything={everything} pwa={pwaStore}>
                <App/>
            </Provider>
        </SnackbarProvider>
    </ThemeProvider>
)
