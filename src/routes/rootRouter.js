import React, {useMemo} from "react"
import {Body, CenterBar, Content, LeftBar, RightBar, Root, TopBar} from "../shared/layout/AppLayout"
import PWA from "../shared/pwa/PWA"
import {Outlet, redirect, useLoaderData, useMatches} from "react-router-dom"
import infoRoutes from "../molecule/info/routes"
import {ssoRoutes} from "../shared/sso/routes"
import {ButtonLogo} from "../shared/layout/components/ButtonLogo"
import Wordmark from "../shared/layout/components/ButtonWordMark"
import LeftMenu from "../shared/layout/containers/LeftMenu"
import {isMobile} from "react-device-detect"
import quantum from "../stores/rootStore"
import {AccountBox, Api, Chat, Computer, Feed, Public, Smartphone, Workspaces} from "@mui/icons-material"
import ButtonLogin from "../shared/layout/components/ButtonLogIn"
import ButtonProfile from "../shared/layout/components/ButtonProfile"

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
        route: 'updates',
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
    loader: async () => quantum.neutron.sso.isAuth(),
    Component: () => {
        const isAuth = useLoaderData()
        const match = useMatches()
        // useEffect(() => console.log(match), [match])
        const routeLogo = useMemo(() => findMatchWithHandleKey(match, 'routeLogo'), [match])
        const menuItems = useMemo(() => {
            const handleMenu = findMatchWithHandleKey(match, 'menuItems')
            if (handleMenu && isAuth)
                return handleMenu
            else if (handleMenu)
                return anonymousMenu
            else return null
        }, [isAuth, match])
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
                    {isAuth ? <ButtonProfile to={'/'}/> : <ButtonLogin/>}
                </RightBar>
            </TopBar>
            <Body>
                {menuItems && <LeftMenu items={menuItems} opened={!isMobile} visibleCloseButton={!isMobile}/>}
                <Content>
                    <Outlet/>
                </Content>
            </Body>
        </Root>
    },
    children: [
        {
            path: '/',
            handle: {
                routeLogo: 'info',
                menuItems: userMenu,
            },
            children: [
                {
                    index: true,
                    loader: async () => quantum.neutron.sso.isAuth(),
                    Component: () => useLoaderData() ? <ProfilePage/> : <Home/>,
                },
                {
                    path: 'support',
                    loader: async () => quantum.neutron.sso.isAuth().then(user => {
                        !Boolean(user) && redirect('/')
                        return {user}
                    }),
                    Component: () => <>Support</>
                },
                {
                    path: 'workspace',
                    loader: async () => quantum.neutron.sso.isAuth().then(user => {
                        !Boolean(user) && redirect('/')
                        return {user}
                    }),
                    Component: () => <>Workspace</>
                },
                {
                    path: 'updates',
                    loader: async () => quantum.neutron.sso.isAuth().then(user => {
                        !Boolean(user) && redirect('/')
                        return {user}
                    }),
                    Component: () => <>News</>
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
                routeLogo: '/info',
                menuItems: anonymousMenu,
            },
            children: [...infoRoutes,
                {
                    index: true,
                    element: <Home/>
                }
            ]
        },
    ]
}