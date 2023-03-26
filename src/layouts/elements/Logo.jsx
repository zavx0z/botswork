import Box from "@mui/material/Box"
import {isMobile} from "react-device-detect"
import * as React from "react"
import logo from "../../images/logo.png"

export const Logo = () => {
    return <>
        <Box
            component="img"
            alt="logo"
            sx={{maxHeight: isMobile ? 30 : 30,}}
            src={logo}
        />
    </>
}