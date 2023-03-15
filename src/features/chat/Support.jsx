import React, {useEffect} from 'react'
import Box from "@mui/material/Box"
import Chat from "./components/Chat"
import InputMessage from "./components/InputMessage"
import {inject} from "mobx-react"

const Support = ({user: {id, messages, getMessages, sendMessage}}) => {
    useEffect(() => {
        getMessages()
    }, [getMessages])
    return <Box
        sx={{
            height: '100%',
            display: "flex",
            flexDirection: 'column',
            overflow: 'hidden',
        }}>
        <Chat userId={id} messages={messages}/>
        <InputMessage sendMessage={sendMessage}/>
    </Box>
}
export default inject('user')(Support)