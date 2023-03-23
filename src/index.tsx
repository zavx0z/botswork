import React from 'react'
import ReactDOM from 'react-dom/client'
import './theme/index.css'
import App from './App'
import {BrowserRouter as Router} from "react-router-dom"
import {Provider} from "mobx-react"
import './i18n.js'
import i18next from "i18next"
import {ThemeProvider} from "@mui/material/styles"
import theme from "./theme/theme"
import {SnackbarProvider} from "notistack"
import {middlewareNetworkError} from "./middleware/network"
import {isMobile} from "react-device-detect"
import userStore from "./stores/userStore"
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import {sioConnect} from "./middleware/sioMiddleware"
import chatStore from "./features/chat/chatStore"

serviceWorkerRegistration.register()

i18next.on('languageChanged', (lng) => void document.documentElement.setAttribute('lang', lng))

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

sioConnect(userStore)
chatStore(userStore)
middlewareNetworkError(userStore)

root.render(
    <Router>
        <ThemeProvider theme={theme}>
            <SnackbarProvider anchorOrigin={{
                vertical: isMobile ? 'top' : 'bottom',
                horizontal: isMobile ? 'center' : 'left',
            }}>
                <Provider user={userStore}>
                    <App/>
                </Provider>
            </SnackbarProvider>
        </ThemeProvider>
    </Router>
)
