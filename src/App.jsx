import {Await, createBrowserRouter, defer, Outlet, redirect, RouterProvider, useLoaderData, useMatches} from "react-router-dom"
import React, {useMemo} from "react"
import {ssoRoutes} from "./core/neutron/sso/routes"
import Info, {MainInfo} from "./molecule/Info"
import {infoOrg} from "./organism/info"
import {userMenu} from "./organism/user"
import Profile from "./molecule/Profile"
import {inject, observer} from "mobx-react"
import {ElectronBotik} from "./electrons/ElectronBotik"
import ElectronBotsWork from "./molecule/ElectronBotsWork"
import {MoleculeChelik} from "./molecule/MoleculeChelik"
import {findMatchWithHandleKey} from "./shared/layout/utils/route"
import {Body, Content, Root, TopBar} from "./shared/layout/AppLayout"
import PWA from "./shared/pwa/PWA"
import Canvas from "./core/neutron/canvas/Canvas"
import Camera from "./atom/camera/Camera"
import LightAppBar from "./shared/light/LightAppBar"
import {isMobile} from "react-device-detect"
import LeftMenu from "./shared/layout/containers/LeftMenu"

const Menu = inject('everything')(observer(({menuItems, everything}) => {
    const open = useMemo(() => Boolean(!isMobile), [])
    const superposition = useMemo(() => menuItems &&
        everything.neutron.sso.isAuthenticated ?
            menuItems :
            infoOrg,
        [menuItems, everything.neutron.sso.isAuthenticated])
    return <LeftMenu items={superposition} opened={open} visibleCloseButton={open}/>
}))

const App = ({everything}) => <RouterProvider router={createBrowserRouter([{
    loader: async () => defer({
        user: await everything.neutron.sso.waitUser(),
        botsWork: everything.atom.botsWork.init(),
        botik: everything.atom.botik.init(),
        chelik: everything.atom.chelik.init(),
    }),
    Component: () => {
        const data = useLoaderData()
        console.log(data.user)
        const match = useMatches()
        // const routeLogo = useMemo(() => findMatchWithHandleKey(match, 'routeLogo'), [match])
        const menuItems = useMemo(() => findMatchWithHandleKey(match, 'menuItems'), [match])
        return <Root>
            <PWA/>
            <TopBar>
                <Canvas leva={false} stats={false}>
                    <Camera/>
                    <LightAppBar/>
                    <Await resolve={data.botik}>
                        {atomBotik => <ElectronBotik molecule={atomBotik}/>}
                    </Await>
                    <Await resolve={data.botsWork}>
                        {atomBotsWork => <ElectronBotsWork molecule={atomBotsWork}/>}
                    </Await>
                    <Await resolve={data.chelik}>
                        {atomChelik => <MoleculeChelik molecule={atomChelik}/>}
                    </Await>
                </Canvas>
            </TopBar>
            <Body>
                <Menu menuItems={menuItems}/>
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
                    loader: async () => everything.neutron.sso.waitUser(),
                    Component: () => useLoaderData() ? <Profile/> : <MainInfo/>,
                },
                {
                    path: 'support',
                    loader: async () => everything.neutron.sso.waitUser()
                        .then(user => !Boolean(user) ? redirect('/') : {user}),
                    Component: () => <>Support</>
                },
                {
                    path: 'workspace',
                    loader: async () => everything.neutron.sso.waitUser()
                        .then(user => !Boolean(user) ? redirect('/') : {user}),
                    Component: () => <>Workspace</>
                },
                {
                    path: 'updates',
                    loader: async () => everything.neutron.sso.waitUser()
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
                menuItems: infoOrg,
            },
            children: [
                {
                    index: true,
                    element: <MainInfo/>
                },
                {
                    path: ':electron',
                    loader: ({params}) => everything.atom['info'].get(params.electron),
                    Component: () => {
                        const electron = useLoaderData()
                        return <Info>{electron.description}</Info>
                    }
                }
            ]
        },
    ]
}])}/>
export default inject('everything')(App)
