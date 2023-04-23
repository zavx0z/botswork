import {inject, observer} from "mobx-react"
import Profile from "../views/Profile"
import React from "react"
import {Body, CenterBar, Content, LeftBar, Root, TopBar} from "../shared/layout/AppLayout"
import PWA from "../shared/pwa/PWA"
import {Outlet} from "react-router-dom"
import postRoutes from "../molecule/posts/routes"
import {ssoRoutes} from "../shared/sso/routes"
import {ButtonLogo} from "../shared/layout/components/ButtonLogo"
import Wordmark from "../shared/layout/components/ButtonWordMark"

export const rootRouter = {
    element: <Root><PWA/><Outlet/></Root>,
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
        {
            path: 'auth',
            ...ssoRoutes,
            element: <>
                <TopBar>
                    <LeftBar>
                        <ButtonLogo/>
                    </LeftBar>
                    <CenterBar>
                        <Wordmark to={'/'}/>
                    </CenterBar>
                </TopBar>
                <Body>
                    <Content>
                        <Outlet/>
                    </Content>
                </Body>
            </>
        },
        postRoutes,
    ]
}