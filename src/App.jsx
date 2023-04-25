import {createBrowserRouter, Outlet, redirect, RouterProvider, useLoaderData} from "react-router-dom"
import React from "react"
import {ssoRoutes} from "./shared/sso/routes"
import Info, {MainInfo} from "./molecule/Info"
import quantum from "./store"
import {infoOrg} from "./organism/info"
import {userMenu} from "./organism/user"
import Profile from "./molecule/Profile"

const App = () => <RouterProvider router={createBrowserRouter([{
    async lazy() {
        let {Organism} = await import("./organism/Organism")
        return {
            loader: quantum.neutron.sso.waitUser,
            Component: Organism,
        }
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
                    loader: async () => quantum.neutron.sso.waitUser(),
                    Component: () => useLoaderData() ? <Profile atom={quantum.atom.profile}/> : <MainInfo/>,
                },
                {
                    path: 'support',
                    loader: async () => quantum.neutron.sso.waitUser()
                        .then(user => !Boolean(user) ? redirect('/') : {user}),
                    Component: () => <>Support</>
                },
                {
                    path: 'workspace',
                    loader: async () => quantum.neutron.sso.waitUser()
                        .then(user => !Boolean(user) ? redirect('/') : {user}),
                    Component: () => <>Workspace</>
                },
                {
                    path: 'updates',
                    loader: async () => quantum.neutron.sso.waitUser()
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
