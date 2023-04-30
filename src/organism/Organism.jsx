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
import {Scene} from "../shared/3d/Scene"
import Canvas from "../core/neutron/canvas/Canvas"

const Menu = inject('quantum')(observer(({menuItems, quantum}) => {
    const open = useMemo(() => Boolean(!isMobile), [])
    return <LeftMenu items={menuItems && quantum.neutron.sso.isAuthenticated ? menuItems : infoOrg} opened={open} visibleCloseButton={open}/>
}))

export const Organism = inject('quantum')(({quantum: {neutron: {canvas}}}) => {
    const match = useMatches()
    // const routeLogo = useMemo(() => findMatchWithHandleKey(match, 'routeLogo'), [match])
    const menuItems = useMemo(() => findMatchWithHandleKey(match, 'menuItems'), [match])
    console.log(canvas)
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
                <Canvas store={canvas}>
                    <Scene/>
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
})