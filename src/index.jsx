import React, {Suspense} from 'react'
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
import rootStore from "./stores/rootStore"
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import chatStore from "./features/chat/chatStore"
import BotLoader from "./components/BotLoader/BotLoader"
import Box from "@mui/material/Box"
import pwaStore from "./features/pwa/pwaStore"
import PWA from "./features/pwa/PWA"
import logStore, {logSioMiddleware} from "./features/remoteLogClient/logStore"
import usersStore from "./features/users/usersStore"
import {sioConnect} from "./features/sio/sioMiddleware"


const config = {
    onUpdate: (serviceWorker) => pwaStore.setNewVersionExist(serviceWorker),
    onSuccess: (serviceWorker) => pwaStore.setServiceWorker(serviceWorker)
}
serviceWorkerRegistration.register(config)
i18next.on('languageChanged', (lng) => void document.documentElement.setAttribute('lang', lng))
const root = ReactDOM.createRoot(document.getElementById('root'))

sioConnect(rootStore)
chatStore(rootStore)
usersStore(rootStore)
middlewareNetworkError(rootStore)
logSioMiddleware(rootStore)

const Index = () => {
    return <>
        <Suspense fallback={
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "8px",
                    p: 2,
                }}
            >
                <BotLoader/>
            </Box>
        }>
            <Router>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: isMobile ? 'center' : 'left',
                    }}>
                        <Provider root={rootStore} pwa={pwaStore} log={logStore}>
                            <PWA/>
                            <App/>
                        </Provider>
                    </SnackbarProvider>
                </ThemeProvider>
            </Router>
        </Suspense>
    </>
}

root.render(<Index/>)
