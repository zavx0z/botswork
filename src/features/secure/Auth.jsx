import React from 'react'
import {Route, Routes} from "react-router-dom"
import routes from "../../routes/routes"
import Join from "./views/Join"
import Login from "./views/Login"
import Logout from "./views/Logout"
import ResetPassword from "./views/ResetPassword"
import {inject} from "mobx-react"

const Auth = ({user: {login, join, logout}}) =>
    <Routes>
        <Route path={'/' + routes.join.split('/').slice(-1)} element={<Join submit={join} redirect={routes.profile}/>}/>
        <Route path={'/' + routes.login.split('/').slice(-1)} element={<Login submit={login} redirect={routes.profile}/>}/>
        <Route path={'/' + routes.logout.split('/').slice(-1)} element={<Logout submit={logout} redirect={routes.login}/>}/>
        <Route path={'/' + routes.reset.split('/').slice(-1)} element={<ResetPassword/>}/>
    </Routes>
export default inject('user')(Auth)