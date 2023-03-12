import React from 'react'
import {Container} from "@mui/material"
import Box from "@mui/material/Box"
import Chat from "./containers/Chat"
import InputMessage from "./containers/InputMessage"

const Support = ({user}) =>
    <Box component={Container} sx={{
        height: '100vh',
        display: "flex",
        flexDirection: 'column',
    }}>
        <Box sx={{flexGrow: 1}}>
            <Chat/>
        </Box>
        <Box>
            <InputMessage/>
        </Box>
    </Box>
export default Support