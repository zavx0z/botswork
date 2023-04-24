import React, {useMemo} from "react"
import {Body, CenterBar, Content, LeftBar, RightBar, Root, TopBar} from "../shared/layout/AppLayout"
import PWA from "../shared/pwa/PWA"
import {Outlet, useLoaderData, useMatches, useNavigate} from "react-router-dom"
import infoRoutes from "../molecule/info/routes"
import {ssoRoutes} from "../shared/sso/routes"
import {ButtonLogo} from "../shared/layout/components/ButtonLogo"
import Wordmark from "../shared/layout/components/ButtonWordMark"
import LeftMenu from "../shared/layout/containers/LeftMenu"
import {isMobile} from "react-device-detect"
import quantum from "../stores/rootStore"
import {AccountBox, Api, Chat, Computer, Feed, Login, Public, Smartphone, Workspaces} from "@mui/icons-material"
import IconButton from "@mui/material/IconButton"

const Home = () => {
    return <>Home</>
}
const ProfilePage = () => <>ProfilePage</>

const anonymousMenu = [[
    {
        title: 'Браузер',
        route: 'info/browser',
        Icon: Public,
    },
    {
        title: 'Десктоп',
        route: 'info/desktop',
        Icon: Computer,
    },
    {
        title: 'Мобильный',
        route: 'info/mobile',
        Icon: Smartphone,
    },
    {
        title: 'Окружение',
        route: 'info/workspace',
        Icon: Workspaces,
    },
    {
        title: 'Интеграция',
        route: 'info/api',
        Icon: Api,
    }
]]
const userMenu = [[
    {
        title: 'Профиль',
        route: '/',
        Icon: AccountBox,
    },
    {
        title: 'Окружение',
        route: 'workspace',
        Icon: Workspaces,
    },
], [
    {
        title: 'Поддержка',
        route: 'support',
        Icon: Chat,
    },
    {
        title: 'Новости',
        route: 'news',
        Icon: Feed,
    }
]]

const findMatchWithHandleKey = (matches, key) => {
    for (let i = matches.length - 1; i >= 0; i--) {
        const match = matches[i]
        if (match.handle && key in match.handle) {
            return match.handle[key]
        }
    }
    return null
}

export const rootRouter = {
    loader: async () => quantum.neutron.sso.isAuth().then(() => true).catch(() => false),
    Component: () => {
        const isAuth = useLoaderData()
        const navigate = useNavigate()
        const match = useMatches()
        // useEffect(() => console.log(match), [match])
        const routeLogo = useMemo(() => findMatchWithHandleKey(match, 'routeLogo'), [match])
        const menuItems = useMemo(() => findMatchWithHandleKey(match, 'menuItems'), [match])
        return <Root>
            <PWA/>
            <TopBar>
                <LeftBar>
                    <ButtonLogo to={routeLogo}/>
                </LeftBar>
                <CenterBar>
                    <Wordmark to={routeLogo}/>
                </CenterBar>
                <RightBar>
                    <IconButton onClick={() => navigate('profile')}>
                        {isAuth ? <AccountBox fontSize={'medium'} alt="Profile" color={"secondary"}/> : <Login color={"secondary"}/>}
                    </IconButton>
                </RightBar>
            </TopBar>
            <Body>
                <LeftMenu items={menuItems} opened={!isMobile} visibleCloseButton={!isMobile}/>
                <Content>
                    <Outlet/>
                </Content>
            </Body>
        </Root>
    },
    children: [
        {
            path: '/',
            loader: async () => quantum.neutron.sso.isAuth().then(() => true).catch(() => false),
            Component: () => useLoaderData() ? <ProfilePage/> : <Home/>,
            children: [
                {
                    index: true,
                    handle: {
                        routeLogo: 'info/browser',
                        menuItems: userMenu,
                    },
                    element: <Home/>
                },
            ],
        },
        {
            path: 'auth',
            ...ssoRoutes,
            element: <Outlet/>
        },
        {
            path: 'info',
            handle: {
                menuItems: anonymousMenu,
            },
            children: infoRoutes
        },
    ]
}