import * as React from 'react'
import {Route, Routes} from "react-router-dom"
import ProfilePage from "./views/Profile"
import Contacts from "./views/Contacts"
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import AppBar from "@mui/material/AppBar"
import ToolBar from "./layouts/ToolBar"
import DrawerMenu from "./layouts/DrawerMenu"
import Home from "./views/Home"
import PrivateRoute from "./routes/PrivateRoute"
import routes from "./routes/routes"
import Auth from "./features/secure/Auth"


const App = () => {
    return <Box sx={{display: 'flex'}}>
        <CssBaseline/>
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <ToolBar/>
        </AppBar>
        <DrawerMenu/>
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
            <Toolbar/>
            <Routes>
                <Route path={routes.home} element={<Home/>}/>
                <Route path={routes.auth} element={<Auth/>}/>
                <Route path={routes.profile} element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
                <Route path={'/'} element={<Contacts/>}/>
            </Routes>
        </Box>
    </Box>
}
export default App