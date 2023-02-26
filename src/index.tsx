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
import {SnackbarUtilsConfigurator} from "./utils/SnackbarUtils"
import userStore from "./features/secure/stores/userStore"

i18next.on('languageChanged', (lng) => {
    document.documentElement.setAttribute('lang', lng)
})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <React.StrictMode>
        <Router>
            <Provider root={rootStore} user={userStore}>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}>
                        <SnackbarUtilsConfigurator/>
                        <App/>
                    </SnackbarProvider>
                </ThemeProvider>
            </Provider>
        </Router>
    </React.StrictMode>
)
reportWebVitals()
