import React from 'react'
import Box from "@mui/material/Box"
import Chat from "./containers/Chat"
import InputMessage from "./containers/InputMessage"

const Support = ({user}) =>
    <Box
        sx={{
            height: '100vh',
            display: "flex",
            flexDirection: 'column',
            overflow: 'hidden',
        }}>
        <Chat/>
        <Box>
            <InputMessage/>
        </Box>
    </Box>
export default Support