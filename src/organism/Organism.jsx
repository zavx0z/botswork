import {inject, observer} from "mobx-react"
import {Outlet, useMatches} from "react-router-dom"
import React, {useMemo} from "react"
import {findMatchWithHandleKey} from "../shared/layout/utils/route"
import {infoOrg} from "./info"
import {Body, CenterBar, Content, LeftBar, RightBar, Root, TopBar} from "../shared/layout/AppLayout"
import PWA from "../shared/pwa/PWA"
import {ButtonLogo} from "../shared/layout/components/ButtonLogo"
import Wordmark from "../shared/layout/components/ButtonWordMark"
import ButtonProfile from "../shared/layout/components/ButtonProfile"
import ButtonLogin from "../shared/layout/components/ButtonLogIn"
import LeftMenu from "../shared/layout/containers/LeftMenu"
import {isMobile} from "react-device-detect"

const RightButton = inject('quantum')(observer(({quantum}) => {
    return quantum.neutron.sso.isAuthenticated ? <ButtonProfile to={'/'}/> : <ButtonLogin/>
}))

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
            <LeftBar>
                <ButtonLogo to={routeLogo}/>
            </LeftBar>
            <CenterBar>
                <Wordmark to={routeLogo}/>
            </CenterBar>
            <RightBar>
                <RightButton/>
            </RightBar>
        </TopBar>
        <Body>
            <Menu menuItems={menuItems}/>
            <Content>
                <Outlet/>
            </Content>
        </Body>
    </Root>
}