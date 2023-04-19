import {Route, Routes} from "react-router-dom"
import ProfileView from "./views/Profile"
import PrivateRoute from "./shared/secure/routes/PrivateRoute"
import routes from "./routes/routes"
import Auth from "./shared/secure/Auth"
import Settings from "./views/Settings"
import ChatView from "./shared/chat/views/ChatView"
import AnonRoute from "./shared/secure/routes/AnonRoute"
import Posts from "./features/posts/Posts"
import ButtonBackHistory from "./shared/layout/components/ButtonBackHistory"
import ProfileButton from "./shared/layout/components/ProfileButton"
import {isBrowser, isMobile} from "react-device-detect"
import NetworkStatusCompanion from "./shared/chat/layout/NetworkStatusCompanion"
import {Body, CenterBar, Content, LeftBar, LeftPanel, RightBar, Root, TopBar} from "./shared/layout/AppLayout"
import React from "react"
import DialogList from "./shared/chat/views/DialogList"
import PostsLeftPanel from "./features/posts/PostsLeftPanel"
import Wordmark from "./shared/layout/components/ButtonWordMark"
import {ButtonLogo} from "./shared/layout/components/ButtonLogo"


const App = () =>
    <Root>
        <TopBar>
            <LeftBar>
                <Routes>
                    <Route path={"/*"} element={<ButtonLogo/>}/>
                    <Route path={routes.chat + '/:dialogId'} element={isMobile ? <ButtonBackHistory/> : <ButtonLogo/>}/>
                </Routes>
            </LeftBar>
            <CenterBar>
                <Routes>
                    <Route path={"/*"} element={<Wordmark fullWidth={isMobile} to={routes.home}/>}/>
                    <Route path={routes.auth + '/*'} element={<Wordmark fullWidth={isMobile} to={routes.home}/>}/>
                </Routes>
            </CenterBar>
            <RightBar>
                <Routes>
                    <Route path={"/*"} element={<ProfileButton/>}/>
                    <Route path={routes.auth + '/*'} element={<div/>}/>
                    <Route path={routes.chat + '/:dialogId'} element={isMobile ? <NetworkStatusCompanion/> : <ProfileButton/>}/>
                </Routes>
            </RightBar>
        </TopBar>
        <Body>
            <LeftPanel>
                <Routes>
                    <Route path={'*'} element={<PostsLeftPanel/>}/>
                    <Route path={routes.auth + '/*'} element={<div/>}/>
                    <Route path={routes.post} element={<PostsLeftPanel/>}/>
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
                    <Route path={routes.profile} element={<PrivateRoute><ProfileView/></PrivateRoute>}/>
                </Routes>
            </Content>
        </Body>
    </Root>

export default App

