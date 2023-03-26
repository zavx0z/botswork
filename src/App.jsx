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
import Settings from "./views/Settings"
import Viewer from "./views/Viewer"
import Projects from "./views/Projects"
import useViewportHeight from "./layouts/hooks/useViewportHeight"
import Supports from "./features/chat/views/ChatView"
import MobileToolbar from "./features/chat/layout/MobileToolbar"
import {isMobile} from "react-device-detect"


const App = () => {
    const {viewportHeight} = useViewportHeight()
    return <Box
        sx={{
            height: viewportHeight,
            display: 'flex',
            flexDirection: 'column',
            overflow: "hidden",
            position: 'relative',
            touchAction: 'none',
            overscrollBehavior: "contain",
            // backgroundColor: "red"
        }}>
        <AppBar position="static" sx={{zIndex: (theme) => theme.zIndex.drawer + 1, overflow: 'hidden'}}>
            <Routes>
                <Route path={routes.chat + '/*'} element={isMobile ? <MobileToolbar/> : <ToolBar/>}/>
            </Routes>
        </AppBar>
        <Box component="main" sx={{
            flexGrow: 1,
            overflow: "hidden",
            touchAction: 'none',
            display: 'flex',
            flexDirection: 'column',
            overscrollBehavior: "contain",
        }}>
            <Routes>
                <Route path={routes.home} element={<Home/>}/>
                <Route path={routes.auth} element={<Auth/>}/>
                <Route path={routes.contacts} element={<Contacts/>}/>
                <Route path={routes.settings} element={<Settings/>}/>
                <Route path={routes.chat + '/*'} element={<PrivateRoute><Supports/></PrivateRoute>}/>

                <Route path={routes.profile} element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
                <Route path={routes.projects} element={<PrivateRoute><Projects/></PrivateRoute>}/>


                <Route path={routes.viewer} element={<Viewer/>}/>
            </Routes>
        </Box>
    </Box>
}
export default App