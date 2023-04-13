import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import {Logo} from "./elements/Logo"
import {MobileProfile} from "../components/Profile"
import * as React from "react"
import {Fade} from "@mui/material"
// import {Slide} from "@mui/material"

const MobileToolBar = () =>
    <Fade in={true} timeout={888}>
        <Toolbar sx={{
            display: 'flex',
            flexGrow: 1
        }}>
            <Box sx={{display: "flex"}}>
                <Logo/>
            </Box>
            <Box sx={{flexGrow: 1, display: {xs: 'flex'}}}>
            </Box>
            <MobileProfile/>
        </Toolbar>
    </Fade>
export default MobileToolBar