import {inject, observer} from "mobx-react"
import {Outlet, useMatches} from "react-router-dom"
import React, {useMemo} from "react"
import {findMatchWithHandleKey} from "../shared/layout/utils/route"
import {infoOrg} from "./info"
import {Body, Content, Root, TopBar} from "../shared/layout/AppLayout"
import PWA from "../shared/pwa/PWA"
import LeftMenu from "../shared/layout/containers/LeftMenu"
import {isMobile} from "react-device-detect"
import Box from "@mui/material/Box"
import Canvas from "../core/neutron/canvas/Canvas"
import Camera from "../atom/camera/Camera"
import Area from "../atom/area/Area"
import LightAppBar from "../shared/light/LightAppBar"
import {Leva} from "leva"
import BotsWork from "../atom/BotsWork/BotsWork"

const Menu = inject('everything')(observer(({menuItems, everything}) => {
    const open = useMemo(() => Boolean(!isMobile), [])
    return <LeftMenu items={menuItems && everything.neutron.sso.isAuthenticated ? menuItems : infoOrg} opened={open} visibleCloseButton={open}/>
}))

export const Organism = () => {
    const match = useMatches()
    // const routeLogo = useMemo(() => findMatchWithHandleKey(match, 'routeLogo'), [match])
    const menuItems = useMemo(() => findMatchWithHandleKey(match, 'menuItems'), [match])
    return <Root>
        <PWA/>
        <TopBar>
            <Box sx={theme => ({
                zIndex: 444444,
                height: theme.spacing(5),
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            })}>
                <Canvas>
                    <Leva hidden={true}/>
                    <Area/>
                    <BotsWork/>
                    <Camera/>
                    <LightAppBar/>
                    {/*<BotsWorkRoom/>*/}
                    {/*<Scene/>*/}
                </Canvas>
            </Box>
        </TopBar>
        <Body>
            <Menu menuItems={menuItems}/>
            <Content>
                <Outlet/>
            </Content>
        </Body>
    </Root>
}