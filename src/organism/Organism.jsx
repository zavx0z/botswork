import {inject, observer} from "mobx-react"
import {Await, Outlet, useLoaderData, useMatches} from "react-router-dom"
import React, {useMemo, useState} from "react"
import {findMatchWithHandleKey} from "../shared/layout/utils/route"
import {infoOrg} from "./info"
import {Body, Content, Root, TopBar} from "../shared/layout/AppLayout"
import PWA from "../shared/pwa/PWA"
import LeftMenu from "../shared/layout/containers/LeftMenu"
import {isMobile} from "react-device-detect"
import Box from "@mui/material/Box"
import Canvas from "../core/neutron/canvas/Canvas"
import Camera from "../atom/camera/Camera"
import LightAppBar from "../shared/light/LightAppBar"
import {Leva} from "leva"
import Metaverse from "../molecule/Metaverse"
import {Stats} from "@react-three/drei"

const Menu = inject('everything')(observer(({menuItems, everything}) => {
    const open = useMemo(() => Boolean(!isMobile), [])
    return <LeftMenu items={menuItems && everything.neutron.sso.isAuthenticated ? menuItems : infoOrg} opened={open} visibleCloseButton={open}/>
}))

export const Organism = inject('everything')(observer(({everything: {atom: {botsWork}}}) => {
    const match = useMatches()
    const data = useLoaderData()
    // const routeLogo = useMemo(() => findMatchWithHandleKey(match, 'routeLogo'), [match])
    const menuItems = useMemo(() => findMatchWithHandleKey(match, 'menuItems'), [match])
    const [visibleStat, setVisibleStat] = useState(false)
    const [visibleLeva, setVisibleLeva] = useState(true)
    return <Root>
        <PWA/>
        <TopBar>
            <Box sx={theme => ({
                zIndex: 444444,
                height: theme.spacing(5),
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                bgColor: theme.palette.primary.main
            })}>
                <Canvas>
                    {visibleStat && <Stats showPanel={0} className="stats"/>}
                    <Leva hidden={visibleLeva}/>
                    <Camera/>
                    <LightAppBar/>
                    <Await
                        resolve={data.botsWork}
                    >
                        {botsWork => <Metaverse mesh={botsWork}/>}
                    </Await>
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
}))
