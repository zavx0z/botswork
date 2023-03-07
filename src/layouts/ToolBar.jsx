import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import * as React from "react"
import LanguageSelect from "../components/Lang"
import Profile, {MobileProfile} from "../components/Profile"
import {BrowserView, isMobile, MobileView} from "react-device-detect"

const Logo = () => {
    return <>
        <Box
            component="img"
            alt="logo"
            sx={{
                maxHeight: isMobile ? 30 : 44,
            }}
            src={process.env.PUBLIC_URL + "/img/apple-icon-180.png"}
        />
        <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
                mb: -.9,
                ml: .5,
                mr: 2,
                display: "flex",
                fontWeight: 400,
                color: "inherit",
                textDecoration: "none",
                fontSize: isMobile ? 19 : 24,
                letterSpacing: '0.01em',
                fontFamily: 'monospace'
            }}
            // letterSpacing={2}
        >
            BotsWork
        </Typography>
    </>
}

const ToolBar = () => {
    return <Toolbar>
        <Logo/>
        <Box sx={{flexGrow: 1, display: {xs: 'flex'}}}>
        </Box>
        <Box sx={{mr: 2, flexGrow: 0}}>
            <BrowserView>
                <LanguageSelect/>
            </BrowserView>
        </Box>
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
export default ToolBar