import React, {useEffect} from 'react'
import Box from "@mui/material/Box"
import Chat from "./components/Chat"
import InputMessage from "./components/InputMessage"
import {inject} from "mobx-react"

const Support = ({user: {id, messages, getMessages, sendMessage, readMessages}}) => {
    useEffect(() => {
        getMessages()
    }, [getMessages])
    return <Box
        sx={{
            display: "flex",
            flexGrow: 1,
            flexDirection: 'column',
            overflow: 'hidden',
            touchAction: 'none',
            // backgroundColor: 'yellow',
        }}>
        <Chat userId={id} messages={messages}/>
        <InputMessage sendMessage={sendMessage} readMessages={readMessages}/>
    </Box>
}
export default inject('user')(Support)