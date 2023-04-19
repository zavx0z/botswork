import {Route, Routes} from "react-router-dom"
import ProfilePage from "./views/Profile"
import PrivateRoute from "./shared/secure/routes/PrivateRoute"
import routes from "./routes/routes"
import Auth from "./shared/secure/Auth"
import Settings from "./views/Settings"
import ChatView from "./shared/chat/views/ChatView"
import AnonRoute from "./shared/secure/routes/AnonRoute"
import Posts from "./features/posts/Posts"
import Logo from "./shared/layout/components/Logo"
import ButtonBackHistory from "./shared/layout/components/ButtonBackHistory"
import ProfileButton from "./shared/layout/components/ProfileButton"
import {isBrowser, isMobile} from "react-device-detect"
import NetworkStatusCompanion from "./shared/chat/layout/NetworkStatusCompanion"
import {Body, CenterBar, Content, LeftBar, LeftPanel, RightBar, Root, TopBar} from "./shared/layout/AppLayout"
import React from "react"
import DialogList from "./shared/chat/views/DialogList"
import PostsLeftPanel from "./features/posts/PostsLeftPanel"

const Profile = () => <ProfileButton profileRoute={isMobile ? routes.profile : routes.profile} authRoute={routes.login}/>

const App = () =>
    <Root>
        <TopBar>
            <LeftBar>
                <Routes>
                    <Route path={"/*"} element={<Logo/>}/>
                    <Route path={routes.chat + '/:dialogId'} element={isMobile ? <ButtonBackHistory/> : <Logo/>}/>
                </Routes>
            </LeftBar>
            <CenterBar>
                <Routes>
                    <Route path={"/*"} element={<div/>}/>
                </Routes>
            </CenterBar>
            <RightBar>
                <Routes>
                    <Route path={"/*"} element={<Profile/>}/>
                    <Route path={routes.auth + '/*'} element={<div/>}/>
                    <Route path={routes.chat + '/:dialogId'} element={isMobile ? <NetworkStatusCompanion/> : <Profile/>}/>
                </Routes>
            </RightBar>
        </TopBar>
        <Body>
            <LeftPanel>
                <Routes>
                    <Route path={'*'} element={<div/>}/>
                    <Route path={routes.post + '*'} element={<PostsLeftPanel/>}/>
                    <Route path={routes.chat} element={<DialogList/>}/>
                    <Route path={routes.chat + '/:dialogId'} element={isBrowser && <DialogList/>}/>
                </Routes>
            </LeftPanel>
            <Content>
                <Routes>
                    <Route path={routes.post + '*'} element={<AnonRoute redirect={routes.chat}><Posts/></AnonRoute>}/>
                    <Route path={routes.auth + '/*'} element={<Auth/>}/>
                    <Route path={routes.settings} element={<PrivateRoute><Settings/></PrivateRoute>}/>
                    <Route path={routes.chat + '/*'} element={<PrivateRoute><ChatView/></PrivateRoute>}/>
                    <Route path={routes.profile} element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
                </Routes>
            </Content>
        </Body>
    </Root>

export default App

