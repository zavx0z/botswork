import * as React from 'react'
import {Route, Routes} from "react-router-dom"
import ProfilePage from "./views/Profile"
import Contacts from "./views/Contacts"
import Box from '@mui/material/Box'
import AppBar from "@mui/material/AppBar"
import Home from "./views/Home"
import PrivateRoute from "./features/secure/routes/PrivateRoute"
import routes from "./routes/routes"
import Auth from "./features/secure/Auth"
import Settings from "./views/Settings"
import Viewer from "./views/Viewer"
import useViewportHeight from "./layouts/hooks/useViewportHeight"
import ChatView from "./features/chat/views/ChatView"
import ToolbarMobileDialog from "./features/chat/layout/ToolbarMobileDialog"
import {isMobile} from "react-device-detect"
import {MobileProject} from "./views/MobileProject"
import {BrowserProject} from "./views/BrowserProject"
import MobileToolBar from "./layouts/MobileToolBar"
import BrowserToolBar from "./layouts/BrowserToolBar"
import AnonRoute from "./features/secure/routes/AnonRoute"
import useWakeLock from "./hooks/WakeLoc"


const App = () => {
    const {viewportHeight} = useViewportHeight()
    useWakeLock()
    return <Box
        sx={{
            height: viewportHeight,
            display: 'flex',
            flexDirection: 'column',
            overflow: "hidden",
            position: 'relative',
        }}>
        <AppBar position="static" sx={{zIndex: (theme) => theme.zIndex.drawer + 1, overflow: 'hidden'}}>
            <Routes>
                <Route path={routes.home} element={isMobile ? <MobileToolBar/> : <BrowserToolBar/>}/>
                <Route path={routes.auth} element={isMobile ? <MobileToolBar/> : <BrowserToolBar/>}/>
                <Route path={routes.profile} element={isMobile ? <MobileToolBar/> : <BrowserToolBar/>}/>
                <Route path={routes.projects} element={isMobile ? <MobileToolBar/> : <BrowserToolBar/>}/>
                <Route path={routes.chat} element={isMobile ? <MobileToolBar/> : <BrowserToolBar/>}/>
                <Route path={routes.chat + '/*'} element={isMobile ? <ToolbarMobileDialog/> : <BrowserToolBar/>}/>
            </Routes>
        </AppBar>
        <Box component="main" sx={{
            flexGrow: 1,
            overflow: "hidden",
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Routes>
                <Route path={routes.home} element={<AnonRoute redirectRoute={routes.chat}><Home/></AnonRoute>}/>
                <Route path={routes.auth} element={<Auth/>}/>
                <Route path={routes.contacts} element={<Contacts/>}/>
                <Route path={routes.settings} element={<Settings/>}/>

                <Route path={routes.chat + '/*'} element={<PrivateRoute><ChatView/></PrivateRoute>}/>

                <Route path={routes.profile} element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
                <Route path={routes.projects} element={<PrivateRoute>{isMobile ? <MobileProject/> : <BrowserProject/>}</PrivateRoute>}/>


                <Route path={routes.viewer} element={<Viewer/>}/>
            </Routes>
        </Box>
    </Box>
}
export default App