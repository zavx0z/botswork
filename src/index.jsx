import React from 'react'
import ReactDOM from 'react-dom/client'
import './shared/layout/theme/index.css'
import {Provider} from "mobx-react"
import './i18n.js'
import i18next from "i18next"
import {ThemeProvider} from "@mui/material/styles"
import theme from "./shared/layout/theme/theme"
import {SnackbarProvider} from "notistack"
import middlewareNetworkError from "./shared/sso/middleware/network"
import {isMobile} from "react-device-detect"
import store from "./store"
import * as serviceWorkerRegistration from './shared/pwa/serviceWorkerRegistration'
import dialogsStore from "./shared/chat/dialogsStore"
import loggingStore, {logSioMiddleware} from "./features/logging/loggingStore"
import usersStore from "./shared/users/usersStore"
import {sioConnect} from "./shared/sio/sioMiddleware"
import pwaModel from "./shared/pwa/pwaModel"
import logo from './media/images/logo.png'
import pwaNotificationMiddleware from "./shared/pwa/pwaStore"
import App from "./App"

i18next.on('languageChanged', lng => void document.documentElement.setAttribute('lang', lng))

export const pwaStore = pwaModel.create({iconMessage: logo})
serviceWorkerRegistration.register({
    onUpdate: (serviceWorker) => pwaStore.setNewVersionExist(serviceWorker),
    onSuccess: (serviceWorker) => pwaStore.setServiceWorker(serviceWorker)
})

sioConnect(store)
dialogsStore(store)
usersStore(store)
middlewareNetworkError(store)
logSioMiddleware(store)
pwaNotificationMiddleware(store)

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <SnackbarProvider anchorOrigin={{vertical: 'bottom', horizontal: isMobile ? 'center' : 'left'}}>
            <Provider root={store} pwa={pwaStore} log={loggingStore}>
                <App/>
            </Provider>
        </SnackbarProvider>
    </ThemeProvider>
)
