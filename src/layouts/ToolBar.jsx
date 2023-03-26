import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import * as React from "react"
import {useEffect} from "react"
import LanguageSelect from "../components/Lang"
import Profile, {MobileProfile} from "../components/Profile"
import {BrowserView, MobileView} from "react-device-detect"
import {inject, observer} from "mobx-react"
import {Logo} from "./elements/Logo"
import {StatusAvatar} from "../features/chat/components/StatusAvatar"

const ToolBar = ({'user': {joinedDialog}}) => {
    useEffect(() => {
        console.log(joinedDialog)
    }, [joinedDialog])
    return <Toolbar>
        <MobileView>
            {joinedDialog ?
                    <StatusAvatar
                        username={joinedDialog.username[0]}
                        isMobile={joinedDialog.owner.isMobile}
                        isConnected={joinedDialog.owner.isConnected}
                        deviceModel={joinedDialog.owner.deviceModel}
                    />
                : <Logo/>
            }
        </MobileView>
        <BrowserView>
            <Box sx={{display: "flex"}}>
                <Logo/>
            </Box>
        </BrowserView>
        <Box sx={{flexGrow: 1, display: {xs: 'flex'}}}>
        </Box>
        <BrowserView>
            <Box sx={{mr: 2, flexGrow: 0}}>
                <LanguageSelect/>
            </Box>
        </BrowserView>
        <Box sx={{flexGrow: 0}}>
            <MobileView>
                <MobileProfile/>
            </MobileView>
            <BrowserView>
                <Profile/>
            </BrowserView>
        </Box>
    </Toolbar>
}
export default inject('user')(observer(ToolBar))
