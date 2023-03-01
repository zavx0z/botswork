import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {BrowserRouter as Router} from "react-router-dom"
import rootStore from "./stores/rootStore"
import {Provider} from "mobx-react"
import './i18n.js'
import i18next from "i18next"
import {ThemeProvider} from "@mui/material/styles"
import theme from "./theme/theme"
import {SnackbarProvider} from "notistack"
import userStore from "./features/secure/userStore"
import {middlewareNetworkError} from "./middleware/network"

i18next.on('languageChanged', (lng) => void document.documentElement.setAttribute('lang', lng))

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

middlewareNetworkError(rootStore)

root.render(
    <React.StrictMode>
        <Router>
            <ThemeProvider theme={theme}>
                <SnackbarProvider anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                    <Provider root={rootStore} user={userStore}>
                        <App/>
                    </Provider>
                </SnackbarProvider>
            </ThemeProvider>
        </Router>
    </React.StrictMode>
)
reportWebVitals()
