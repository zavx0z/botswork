import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {BrowserRouter as Router} from "react-router-dom"
import rootStore from "./stores/rootStore"
import {Provider} from "mobx-react"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <React.StrictMode>
        <Router>
            <Provider root={rootStore}>
                <App/>
            </Provider>
        </Router>
    </React.StrictMode>
)
reportWebVitals()
