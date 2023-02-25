import * as React from 'react'
import {Route, Routes} from "react-router-dom"
import Profile from "./views/Profile"
import Contacts from "./views/Contacts"
import SignUp from "./views/SignUp"
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import AppBar from "@mui/material/AppBar"
import ToolBar from "./layouts/ToolBar"
import DrawerMenu from "./layouts/DrawerMenu"
import SignIn from "./views/SignIn"
import Home from "./views/Home"

const App = () =>
    <Box sx={{display: 'flex'}}>
        <CssBaseline/>
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <ToolBar/>
        </AppBar>
        <DrawerMenu/>
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
            <Toolbar/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/signup'} element={<SignUp/>}/>
                <Route path={'/signin'} element={<SignIn/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/contacts'} element={<Contacts/>}/>
            </Routes>
        </Box>
    </Box>

export default App