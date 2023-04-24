import {createBrowserRouter, Outlet, redirect, RouterProvider, useLoaderData, useMatches} from "react-router-dom"
import React, {useMemo} from "react"
import {AccountBox, Api, Chat, Computer, Feed, Public, Smartphone, Workspaces} from "@mui/icons-material"
import {Body, CenterBar, Content, LeftBar, RightBar, Root, TopBar} from "./shared/layout/AppLayout"
import PWA from "./shared/pwa/PWA"
import {ButtonLogo} from "./shared/layout/components/ButtonLogo"
import Wordmark from "./shared/layout/components/ButtonWordMark"
import ButtonProfile from "./shared/layout/components/ButtonProfile"
import ButtonLogin from "./shared/layout/components/ButtonLogIn"
import LeftMenu from "./shared/layout/containers/LeftMenu"
import {isMobile} from "react-device-detect"
import {ssoRoutes} from "./shared/sso/routes"
import Info, {MainInfo} from "./molecule/Info"
import quantum from "./store"

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

const App = () => <RouterProvider router={createBrowserRouter([{
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
                    Component: () => useLoaderData() ? <>ProfilePage</> : <MainInfo/>,
                },
                {
                    path: 'support',
                    loader: async () => quantum.neutron.sso.isAuth()
                        .then(user => !Boolean(user) ? redirect('/') : {user}),
                    Component: () => <>Support</>
                },
                {
                    path: 'workspace',
                    loader: async () => quantum.neutron.sso.isAuth()
                        .then(user => !Boolean(user) ? redirect('/') : {user}),
                    Component: () => <>Workspace</>
                },
                {
                    path: 'updates',
                    loader: async () => quantum.neutron.sso.isAuth()
                        .then(user => !Boolean(user) ? redirect('/') : {user}),
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
            children: [
                {
                    index: true,
                    element: <MainInfo/>
                },
                {
                    path: ':electron',
                    loader: ({params}) => quantum.atom['info'].get(params.electron),
                    Component: () => {
                        const electron = useLoaderData()
                        return <Info>{electron.description}</Info>
                    }
                }
            ]
        },
    ]
}])}/>
export default App
