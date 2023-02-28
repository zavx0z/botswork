import React from 'react'
import {Route, Routes} from "react-router-dom"
import routes from "../../routes/routes"
import Join from "./views/Join"
import Login from "./views/Login"
import Logout from "./views/Logout"
import ResetPassword from "./views/ResetPassword"

const Auth = () =>
    <Routes>
        <Route path={'/' + routes.join.split('/').slice(-1)} element={<Join redirect={routes.profile}/>}/>
        <Route path={'/' + routes.login.split('/').slice(-1)} element={<Login redirect={routes.profile}/>}/>
        <Route path={'/' + routes.logout.split('/').slice(-1)} element={<Logout redirect={routes.login}/>}/>
        <Route path={'/' + routes.reset.split('/').slice(-1)} element={<ResetPassword/>}/>
    </Routes>
export default Auth