import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import * as React from "react"
import LanguageSelect from "../components/Lang"
import Profile, {MobileProfile} from "../components/Profile"
import {BrowserView, MobileView} from "react-device-detect"
import {inject, observer} from "mobx-react"
import {Logo} from "./elements/Logo"

const ToolBar = () => {
    return <Toolbar sx={{
        display: 'flex',
        flexGrow: 1
    }}>
        <Box sx={{display: "flex"}}>
            <Logo/>
        </Box>
        <Box sx={{flexGrow: 1, display: {xs: 'flex'}}}>
        </Box>
        <BrowserView>
            <Box sx={{mr: 2, flexGrow: 0}}><LanguageSelect/></Box>
        </BrowserView>
        <MobileView>
            <MobileProfile/>
        </MobileView>
        <BrowserView>
            <Profile/>
        </BrowserView>
    </Toolbar>
}
export default inject('user')(observer(ToolBar))
