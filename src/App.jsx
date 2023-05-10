import {Await, createBrowserRouter, defer, Outlet, redirect, RouterProvider, useLoaderData, useNavigate} from "react-router-dom"
import React from "react"
import {ssoRoutes} from "./core/neutron/sso/routes"
import Info, {MainInfo} from "./molecule/Info"
import {infoOrg} from "./organism/info"
import {userMenu} from "./organism/user"
import Profile from "./molecule/Profile"
import BotsWork from "./molecule/BotsWork"
import {Chelik} from "./molecule/Chelik"
import {Body, Content, Root} from "./shared/layout/AppLayout"
import PWA from "./shared/pwa/PWA"
import Light from "./shared/light/LightAppBar"
import {Menu} from "./shared/layout/Menu"
import {Botik} from "./molecule/Botik"
import Area from "./molecule/Area"
import {Leva} from "leva"
import {useCurrentHandle} from "./shared/layout/hooks/useCurrentHandle"
import {inject} from "mobx-react"


const App = ({everything: ev}) => <RouterProvider router={createBrowserRouter([{
    loader: async () => defer({
        user: await ev.neutron.sso.waitUser(),
        area: ev.atom.area.init(),
        botik: ev.atom.botik.init(),
        botsWork: ev.atom.botsWork.init(),
        chelik: ev.atom.chelik.init(),
    }),
    shouldRevalidate: ({defaultShouldRevalidate}) => {
        // ev.atom.area.ObjectTreeJS.visible = true
        ev.neutron.canvas.container.action.start({height: ev.neutron.canvas.height})
        ev.neutron.canvas.camera.rotation.action.start({x: 0, y: 0, z: 0, config: {precision: .00001}})
        ev.neutron.canvas.camera.position.action.start({x: 0, y: 2.21, z: 72, config: {precision: .00001}})
        return defaultShouldRevalidate
    },
    Component: () => {
        const data = useLoaderData()
        const navigate = useNavigate()
        const menuItems = useCurrentHandle('menuItems')
        ev.neutron.canvas.render(<>
            <Leva hidden={true}/>
            <Light/>
            <Await resolve={data.area}>
                {area => <Area molecule={area}/>}
            </Await>
            <Await resolve={data.botik}>
                {botik => <Botik molecule={botik}/>}
            </Await>
            <Await resolve={data.botsWork}>
                {botswork => <BotsWork molecule={botswork} onClick={() => navigate('/admin')}/>}
            </Await>
            <Await resolve={data.chelik}>
                {chelik => <Chelik molecule={chelik}/>}
            </Await>
        </>)
        return <>
            <PWA/>
            <Root>
                <Body>
                    <Menu menuItems={menuItems}/>
                    <Content>
                        <Outlet/>
                    </Content>
                </Body>
            </Root>
        </>
    },
    children: [
        {
            path: '/admin',
            loader: () => {
                console.log(ev.atom.area.ObjectTreeJS)
                ev.atom.area.ObjectTreeJS.visible = false
                ev.neutron.canvas.container.action.start({height: window.innerHeight})
                ev.neutron.canvas.camera.rotation.action.start({x: -1.56, y: 0, z: 0, config: {precision: .00001}})
                ev.neutron.canvas.camera.position.action.start({x: 0, y: 1444, z: -10, config: {precision: .00001}})
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
                    loader: async () => ev.neutron.sso.waitUser(),
                    Component: () => useLoaderData() ? <Profile/> : <MainInfo/>,
                },
                {
                    path: 'support',
                    loader: async () => ev.neutron.sso.waitUser().then(user => !user ? redirect('/') : {user}),
                    Component: () => <>Support</>
                },
                {
                    path: 'workspace',
                    loader: async () => ev.neutron.sso.waitUser().then(user => !user ? redirect('/') : {user}),
                    Component: () => <>Workspace</>
                },
                {
                    path: 'updates',
                    loader: async () => ev.neutron.sso.waitUser().then(user => !user ? redirect('/') : {user}),
                    Component: () => <>News</>
                },
            ],
        },
        {
            path: 'auth',
            ...ssoRoutes(ev),
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
                    loader: ({params}) => ev.atom['info'].get(params.electron),
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
