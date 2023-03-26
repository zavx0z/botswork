import Box from "@mui/material/Box"
import * as React from "react"
import logo from "../../images/logo.png"

export const Logo = () =>
    <Box
        component="img"
        alt="logo"
        sx={{maxHeight: 30}}
        src={logo}
    />