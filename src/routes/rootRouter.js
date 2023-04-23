import {inject, observer} from "mobx-react"
import Profile from "../views/Profile"
import React from "react"
import {Root} from "../shared/layout/AppLayout"
import PWA from "../shared/pwa/PWA"
import {Outlet} from "react-router-dom"
import postRoutes from "../molecule/posts/routes"

export const rootRouter = {
    element:
        <Root>
            <PWA/>
            <Outlet/>
        </Root>,
    children: [
        {
            path: "/",
            element: <h4>Катя, я тебя люблю!</h4>,
            children: [
                {
                    path: "team",
                    element: <h6>h6</h6>,
                },
                {
                    path: "team",
                    element: <h5>h5</h5>,
                },
            ],
        },
        {
            path: "/profile",
            Component: inject('root', 'pwa')(observer(Profile))
        },
        postRoutes,
    ]
}