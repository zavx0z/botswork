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
import Settings from "./views/Settings"
import Viewer from "./views/Viewer"
import Chat from "./features/chat/Support"
import useVH from 'react-viewport-height'
import Projects from "./views/Projects"
import {Home as HomeIcon, QuestionAnswer} from '@mui/icons-material'
import BotsWorkIcon from "./icons/BotsWorkIcon"
import ContactsIcon from "@mui/icons-material/Contacts"

const App = () => {
    const vh = useVH()
    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: `${100 * vh}px`,
        overflow: "hidden"
    }}>
        <AppBar position="static" sx={{zIndex: (theme) => theme.zIndex.drawer + 1, overflow: 'hidden'}}>
            <ToolBar/>
        </AppBar>
        <Box component="main" sx={{
            ml: {md: isBrowser ? "240px" : 0},
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "hidden",
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Routes>
                <Route path={routes.home} element={<Home/>}/>
                <Route path={routes.auth} element={<Auth/>}/>
                <Route path={routes.contacts} element={<Contacts/>}/>
                <Route path={routes.settings} element={<Settings/>}/>
                <Route path={routes.viewer} element={<Viewer/>}/>
                <Route path={routes.profile} element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
                <Route path={routes.chat} element={<PrivateRoute><Chat/></PrivateRoute>}/>
                <Route path={routes.projects} element={<PrivateRoute><Projects/></PrivateRoute>}/>
            </Routes>
        </Box>
        <BrowserView>
            <DrawerMenu
                width={222}
                items={[
                    {
                        text: "главная",
                        route: routes.home,
                        itemIcon: <HomeIcon/>
                    },
                    // {
                    //     text: "профиль",
                    //     route: routes.profile,
                    //     itemIcon: <Avatar/>
                    // },
                    {
                        text: "Проекты",
                        route: routes.projects,
                        itemIcon: <BotsWorkIcon/>
                    },
                    {
                        text: "чат",
                        route: routes.chat,
                        itemIcon: <QuestionAnswer/>
                    },
                    {
                        text: "контакты",
                        route: routes.contacts,
                        itemIcon: <ContactsIcon/>
                    },

                ]}/>
        </BrowserView>
        <MobileView>
            <BottomNavigation
                items={[
                    {
                        title: 'главная',
                        route: routes.home,
                        icon: <HomeIcon/>
                    },
                    {
                        title: 'Проекты',
                        route: routes.projects,
                        icon: <BotsWorkIcon/>
                    },
                    {
                        title: 'чат',
                        route: routes.chat,
                        icon: <QuestionAnswer/>
                    },
                ]}/>
        </MobileView>
    </Box>
}
export default App