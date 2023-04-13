import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import {Logo} from "./elements/Logo"
import LanguageSelect from "../components/Lang"
import Profile from "../components/Profile"
import * as React from "react"

const BrowserToolBar = () =>
    <Toolbar sx={{
        display: 'flex',
        flexGrow: 1,
    }}>
        <Box sx={{display: "flex"}}>
            <Logo/>
        </Box>
        <Box sx={{flexGrow: 1, display: {xs: 'flex'}}}>
        </Box>
        <Box sx={{mr: 2, flexGrow: 0}}><LanguageSelect/></Box>
        <Profile/>
    </Toolbar>
export default BrowserToolBar