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
import {Canvas} from "@react-three/fiber"
import {Model} from "../shared/3d/Model"

const Menu = inject('quantum')(observer(({menuItems, quantum}) => {
    const open = useMemo(() => Boolean(!isMobile), [isMobile])
    return <LeftMenu items={menuItems && quantum.neutron.sso.isAuthenticated ? menuItems : infoOrg} opened={open} visibleCloseButton={open}/>
}))

export const Organism = () => {
    const match = useMatches()
    const routeLogo = useMemo(() => findMatchWithHandleKey(match, 'routeLogo'), [match])
    const menuItems = useMemo(() => findMatchWithHandleKey(match, 'menuItems'), [match])
    return <Root>
        <PWA/>
        <TopBar>
            <Box sx={theme => ({
                zIndex: 444444,
                height: theme.spacing(4.4),
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            })}>
                <Canvas>
                    <ambientLight intensity={.44}/>
                    <Model/>
                </Canvas>
            </Box>
        </TopBar>
        {/*<TopBar>*/}
        {/*    <LeftBar>*/}
        {/*        <ButtonLogo to={routeLogo}/>*/}
        {/*    </LeftBar>*/}
        {/*    <CenterBar>*/}
        {/*        <Wordmark to={routeLogo}/>*/}
        {/*    </CenterBar>*/}
        {/*    <RightBar>*/}
        {/*        <RightButton/>*/}
        {/*    </RightBar>*/}
        {/*</TopBar>*/}
        <Body>
            <Menu menuItems={menuItems}/>
            <Content>
                <Outlet/>
            </Content>
        </Body>
    </Root>
}