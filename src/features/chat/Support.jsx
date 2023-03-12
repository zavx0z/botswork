import {inject, observer} from "mobx-react"
import React, {useState} from 'react'
import {Container, IconButton, TextField} from "@mui/material"
import Box from "@mui/material/Box"
import {Telegram} from "@mui/icons-material"
import Chat from "./containers/Chat"

const Support = ({user}) => {
    const [message, setMessage] = useState('')
    const handleMessageChange = (event) => {
        setMessage(event.target.value)
    }
    const handleSendMessage = () => {
        user.sendMessage(message)
        setMessage('')
    }
    const handleKeyPress = (e) => e.key === "Enter" && handleSendMessage()
    return <Box component={Container} sx={{
        height: '100vh',
        display: "flex",
        flexDirection: 'column',
    }}>
        <Box sx={{flexGrow: 1}}>
            <Chat/>
        </Box>
        <Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <TextField
                    label="Type a message"
                    value={message}
                    onChange={handleMessageChange}
                    onKeyDown={handleKeyPress}
                    autoComplete={'off'}
                    sx={{
                        flexGrow: 1
                    }}
                />
                <IconButton
                    variant="contained"
                    color="primary"
                    size={"large"}
                    onClick={handleSendMessage}
                    sx={{marginLeft: 1}}
                >
                    <Telegram
                        color={"action"}
                        fontSize={'large'}
                    />
                </IconButton>
            </Box>
        </Box>
    </Box>
}
export default inject('user')(observer(Support))