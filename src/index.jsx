import React from 'react'
import ReactDOM from 'react-dom/client'
import './theme/index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Provider} from "mobx-react"
import './i18n.js'
import i18next from "i18next"
import {ThemeProvider} from "@mui/material/styles"
import theme from "./theme/theme"
import {SnackbarProvider} from "notistack"
import middlewareNetworkError from "./shared/sso/middleware/network"
import {isMobile} from "react-device-detect"
import rootStore from "./stores/rootStore"
import * as serviceWorkerRegistration from './shared/pwa/serviceWorkerRegistration'
import dialogsStore from "./shared/chat/dialogsStore"
import loggingStore, {logSioMiddleware} from "./features/logging/loggingStore"
import usersStore from "./shared/users/usersStore"
import {sioConnect} from "./shared/sio/sioMiddleware"
import pwaModel from "./shared/pwa/pwaModel"
import logo from './images/logo.png'
import pwaNotificationMiddleware from "./shared/pwa/pwaStore"
import {rootRouter} from "./routes/rootRouter"

i18next.on('languageChanged', lng => void document.documentElement.setAttribute('lang', lng))

export const pwaStore = pwaModel.create({iconMessage: logo})
serviceWorkerRegistration.register({
    onUpdate: (serviceWorker) => pwaStore.setNewVersionExist(serviceWorker),
    onSuccess: (serviceWorker) => pwaStore.setServiceWorker(serviceWorker)
})

sioConnect(rootStore)
dialogsStore(rootStore)
usersStore(rootStore)
middlewareNetworkError(rootStore)
logSioMiddleware(rootStore)
pwaNotificationMiddleware(rootStore)

const router = createBrowserRouter([rootRouter])
ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <SnackbarProvider anchorOrigin={{vertical: 'bottom', horizontal: isMobile ? 'center' : 'left'}}>
            <Provider root={rootStore} pwa={pwaStore} log={loggingStore}>
                <RouterProvider router={router}/>
            </Provider>
        </SnackbarProvider>
    </ThemeProvider>
)
