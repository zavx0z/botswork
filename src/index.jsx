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
import everything from "./store"
import * as serviceWorkerRegistration from './shared/pwa/serviceWorkerRegistration'
import {entanglement_SIO_SSO} from "./core/neutron/sio/sioMiddleware"
import pwaModel from "./shared/pwa/pwaModel"
import logo from './resource/images/logo.png'
import pwaNotificationMiddleware from "./shared/pwa/pwaStore"
import App from "./App"
import {entanglement_Logging_SIO} from "./core/neutron/neutronLogging"

i18next.on('languageChanged', lng => void document.documentElement.setAttribute('lang', lng))

export const pwaStore = pwaModel.create({iconMessage: logo})
serviceWorkerRegistration.register({
    onUpdate: (serviceWorker) => pwaStore.setNewVersionExist(serviceWorker),
    onSuccess: (serviceWorker) => pwaStore.setServiceWorker(serviceWorker)
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
