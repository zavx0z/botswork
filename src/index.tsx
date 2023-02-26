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
import theme from "./theme"

i18next.on('languageChanged', (lng) => {
    document.documentElement.setAttribute('lang', lng)
})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <React.StrictMode>
        <Router>
            <Provider root={rootStore}>
                <ThemeProvider theme={theme}>
                    <App/>
                </ThemeProvider>
            </Provider>
        </Router>
    </React.StrictMode>
)
reportWebVitals()
