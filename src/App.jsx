import {Await, createBrowserRouter, defer, Outlet, redirect, RouterProvider, useLoaderData, useMatches} from "react-router-dom"
import React, {useMemo} from "react"
import {ssoRoutes} from "./core/neutron/sso/routes"
import Info, {MainInfo} from "./molecule/Info"
import {infoOrg} from "./organism/info"
import {userMenu} from "./organism/user"
import Profile from "./molecule/Profile"
import {inject} from "mobx-react"
import BotsWork from "./molecule/BotsWork"
import {Chelik} from "./molecule/Chelik"
import {findMatchWithHandleKey} from "./shared/layout/utils/route"
import {Body, Content, Root, TopBar} from "./shared/layout/AppLayout"
import PWA from "./shared/pwa/PWA"
import Canvas from "./core/neutron/canvas/Canvas"
import Camera from "./atom/camera/Camera"
import LightAppBar from "./shared/light/LightAppBar"
import {Menu} from "./shared/layout/Menu"
import {Botik} from "./molecule/Botik"
import Area from "./molecule/Area"

const App = ({everything}) => <RouterProvider router={createBrowserRouter([{
    loader: async () => defer({
        user: await everything.neutron.sso.waitUser(),
        area: everything.atom.area.init(),
        botik: everything.atom.botik.init(),
        botsWork: everything.atom.botsWork.init(),
        chelik: everything.atom.chelik.init(),
    }),
    Component: () => {
        const data = useLoaderData()
        const match = useMatches()
        // const routeLogo = useMemo(() => findMatchWithHandleKey(match, 'routeLogo'), [match])
        const menuItems = useMemo(() => findMatchWithHandleKey(match, 'menuItems'), [match])
        const fullScreen = useMemo(() => findMatchWithHandleKey(match, 'fullScreen'), [match])
        return <Root>
            <PWA/>
            <TopBar>
                <Canvas leva={false} stats={false} fullScreen={fullScreen}>
                    <Camera/>
                    <LightAppBar/>
                    <Await resolve={data.botik}>
                        {botik => <Botik molecule={botik}/>}
                    </Await>
                    <Await resolve={data.botsWork}>
                        {botswork => <BotsWork molecule={botswork}/>}
                    </Await>
                    <Await resolve={data.chelik}>
                        {chelik => <Chelik molecule={chelik}/>}
                    </Await>
                    <Await resolve={data.area}>
                        {area => !fullScreen && <Area molecule={area}/>}
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
            handle: {
                fullScreen: true,
            },
            path: '/admin',
            loader: () => {
                everything.neutron.canvas.getGl().then(({camera}) => {
                    camera.position.set(0, 1444, -10)
                    camera.rotation.set(-1.56, 0, 0)
                })
                return true
            },
            element: <div/>,
        },
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
