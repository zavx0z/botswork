import Box from "@mui/material/Box"
import {isMobile} from "react-device-detect"
import * as React from "react"
import logo from "../../images/logo.png"
import {useNavigate} from "react-router-dom"
import routes from "../../routes/routes"

export const Logo = () => {
    const navigate = useNavigate()
    return <>
        <Box
            onClick={() => navigate(routes.home)}
            component="img"
            alt="logo"
            sx={{
                maxHeight: isMobile ? 30 : 30,
                cursor: 'pointer'
            }}
            src={logo}
        />
    </>
}