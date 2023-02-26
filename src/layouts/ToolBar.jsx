import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import * as React from "react"
import LanguageSelect from "../components/Lang"
import Profile from "../components/Profile"

const Logo = () => <>
    <Box component="img" alt="logo"
         sx={{maxHeight: 44, md: "flex"}}
         src={"./img/apple-icon-180.png"}
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
            display: {xs: "flex"},
            fontWeight: 400,
            color: "inherit",
            textDecoration: "none",
            fontSize: 24,
            letterSpacing: '0.01em',
            fontFamily: 'monospace'
        }}
        // letterSpacing={2}
    >
        BotsWork
    </Typography>
</>

const ToolBar = () => {
    return <Box sx={{"xs": 'flex'}}>
        <Toolbar>
            <Logo/>
            <Box sx={{flexGrow: 1, display: {xs: 'flex'}}}>
            </Box>
            <Box sx={{mr: 2, flexGrow: 0}}>
                <LanguageSelect/>
            </Box>
            <Box sx={{flexGrow: 0}}>
                <Profile/>
            </Box>
        </Toolbar>
    </Box>
}
export default ToolBar