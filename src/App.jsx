import * as React from 'react'
import {lazy, Suspense, useMemo} from 'react'
import {Route, Routes} from "react-router-dom"
import ProfilePage from "./views/Profile"
import Box from '@mui/material/Box'
import PrivateRoute from "./shared/secure/routes/PrivateRoute"
import routes from "./routes/routes"
import Auth from "./shared/secure/Auth"
import Settings from "./views/Settings"
import useViewportHeight from "./layouts/hooks/useViewportHeight"
import ChatView from "./shared/chat/views/ChatView"
import AnonRoute from "./shared/secure/routes/AnonRoute"
import Posts from "./features/posts/Posts"
import MainSuspenseFallback from "./shared/layout/MainSuspenseFallback"
import {LinearProgress} from "@mui/material"
import AppBarContent from "./shared/layout/AppBarContent"
import Logo from "./shared/layout/Logo"
import ButtonBackHistory from "./shared/layout/ButtonBackHistory"
import ProfileButton from "./shared/layout/profile/ProfileButton"
import {isMobile} from "react-device-detect"

const AppBar = lazy(() => import("./shared/layout/AppBar"))

const contentStyles = {
    flexGrow: 1,
    overflow: "hidden",
    display: 'flex',
    flexDirection: 'column',
}

const AppBarLogo = () => <AppBarContent left={<Logo/>} right={<ProfileButton/>}/>

const App = () => {
    const {viewportHeight} = useViewportHeight()
    const mainStyle = useMemo(() => ({height: `${viewportHeight}px`, display: 'flex', flexDirection: 'column', overflow: "hidden", position: 'relative'}), [viewportHeight])
    return <Box sx={mainStyle}>
        <Suspense fallback={<LinearProgress/>}>
            <AppBar>
                <Routes>
                    <Route path={routes.post} element={<AppBarLogo/>}/>
                    <Route path={routes.chat} element={<AppBarLogo/>}/>
                    <Route path={routes.chat + '/:dialogId'} element={<AppBarContent left={isMobile ? <ButtonBackHistory/> : <Logo/>} right={<ProfileButton/>}/>}/>
                    <Route path={"/*"} element={<div/>}/>
                </Routes>
            </AppBar>
        </Suspense>
        <MainSuspenseFallback>
            <Box sx={contentStyles}>
                <Routes>
                    <Route path={routes.post + '*'} element={<AnonRoute redirect={routes.chat}><Posts/></AnonRoute>}/>
                    <Route path={routes.auth + '/*'} element={<Auth/>}/>
                    <Route path={routes.chat + '/*'} element={<PrivateRoute><ChatView/></PrivateRoute>}/>
                    <Route path={routes.settings} element={<PrivateRoute><Settings/></PrivateRoute>}/>
                    <Route path={routes.profile} element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
                </Routes>
            </Box>
        </MainSuspenseFallback>
    </Box>
}
export default App