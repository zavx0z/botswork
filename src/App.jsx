import {Await, createBrowserRouter, defer, Outlet, redirect, RouterProvider, useLoaderData} from "react-router-dom"
import React from "react"
import {ssoRoutes} from "./core/neutron/sso/routes"
import Info, {MainInfo} from "./molecule/Info"
import {infoOrg} from "./organism/info"
import {userMenu} from "./organism/user"
import Profile from "./molecule/Profile"
import {BlackHole} from "./molecule/blackHole"
import {inject, observer} from "mobx-react"
import {ElectronBotik} from "./electrons/ElectronBotik"
import ElectronBotsWork from "./molecule/ElectronBotsWork"
import {MoleculeChelik} from "./molecule/MoleculeChelik"

const App = ({everything}) => <RouterProvider router={createBrowserRouter([{
    loader: async () => {
        return defer({
            user: await everything.neutron.sso.waitUser(),
            botsWork: everything.atom.botsWork.init(),
            botik: everything.atom.botik.init(),
            chelik: everything.atom.chelik.init(),
        })
    },
    Component: () => {
        const data = useLoaderData()
        return <>
            <BlackHole everything={observer(everything)}>
                <Await resolve={data.botik}>
                    {botik => <ElectronBotik molecule={botik}/>}
                </Await>
                <Await resolve={data.botsWork}>
                    {botsWork => <ElectronBotsWork molecule={botsWork}/>}
                </Await>
                <Await resolve={data.chelik}>
                    {Object3D => <MoleculeChelik molecule={Object3D}/>}
                </Await>
            </BlackHole>
        </>
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
