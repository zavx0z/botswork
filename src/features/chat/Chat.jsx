import {inject, observer} from "mobx-react"
import React, {useState} from 'react'
import {Container, IconButton, List, TextField} from "@mui/material"
import ListItem from "@mui/material/ListItem"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import {Telegram} from "@mui/icons-material"

const Chat = ({user}) => {
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
            <List>
                {user.messages.map(({id, senderName, text}) => (
                    <ListItem key={id} sx={{display: 'flex', alignItems: 'center'}}>
                        <Avatar color={"red"} sx={{marginRight: 1}}>
                            {senderName[0]}
                        </Avatar>
                        {text}
                    </ListItem>
                ))}
            </List>
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
export default inject('user')(observer(Chat))