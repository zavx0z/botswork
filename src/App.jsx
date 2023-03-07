import * as React from 'react'
import {Route, Routes} from "react-router-dom"
import ProfilePage from "./views/Profile"
import Contacts from "./views/Contacts"
import Box from '@mui/material/Box'
import AppBar from "@mui/material/AppBar"
import ToolBar from "./layouts/ToolBar"
import Home from "./views/Home"
import PrivateRoute from "./features/secure/PrivateRoute"
import routes from "./routes/routes"
import Auth from "./features/secure/Auth"
import BottomNavigation from "./layouts/BottomBar"
import {BrowserView, isBrowser, MobileView} from "react-device-detect"
import DrawerMenu from "./layouts/DrawerMenu"


const App = () => {

    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: "100%",
        overflow: "hidden"
    }}>
        <AppBar position="static" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <ToolBar/>
        </AppBar>
        <BrowserView>
            <DrawerMenu/>
        </BrowserView>
        <Box component="main" sx={{
            ml: {md: isBrowser ? "240px" : 0},
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "hidden",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 1,
        }}>
            <Routes>
                <Route path={routes.home} element={<Home/>}/>
                <Route path={routes.auth} element={<Auth/>}/>
                <Route path={routes.profile} element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
                <Route path={'/'} element={<Contacts/>}/>
            </Routes>
        </Box>
        <MobileView>
            <BottomNavigation/>
        </MobileView>
    </Box>
}
export default App