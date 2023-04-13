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
import userStore from "./stores/userStore"
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import {sioConnect} from "./middleware/sioMiddleware"
import chatStore from "./features/chat/chatStore"
import BotLoader from "./components/BotLoader/BotLoader"
import Box from "@mui/material/Box"
import pwaStore from "./features/pwa/pwaStore"
import PWA from "./features/pwa/PWA"

const onUpdate = (registration) => {
    pwaStore.setNewVersionExist(registration)
}
serviceWorkerRegistration.register({onUpdate: onUpdate})

i18next.on('languageChanged', (lng) => void document.documentElement.setAttribute('lang', lng))

const root = ReactDOM.createRoot(document.getElementById('root'))

sioConnect(userStore)
chatStore(userStore)
middlewareNetworkError(userStore)

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
                        <Provider user={userStore} pwa={pwaStore}>
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
