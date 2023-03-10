import {inject, observer} from "mobx-react"
import React, {useState} from 'react'
import {Button, List, TextField} from "@mui/material"
import ListItem from "@mui/material/ListItem"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import chatStore from "./chatStore"

const Chat = ({user: {username, id}}) => {
    const [message, setMessage] = useState('')
    const handleMessageChange = (event) => {
        setMessage(event.target.value)
    }
    const handleSendMessage = () => {
        chatStore.sendMessage(message, id)
        setMessage('')
    }
    return <Box sx={{
        width: '100%',
    }}>
        <List>
            {chatStore.messages.map(({id, user, text}, idx) => (
                <ListItem
                    key={id}
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                    <Avatar
                        sx={{
                            marginRight: 1
                        }}
                    >
                        {user}
                    </Avatar>
                    {text}
                </ListItem>
            ))}
        </List>
        <Box sx={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <TextField
                label="Type a message"
                value={message}
                onChange={handleMessageChange}
                sx={{
                    flexGrow: 1
                }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
                sx={{
                    marginLeft: 1
                }}
            >
                Send
            </Button>
        </Box>
    </Box>
}
export default inject('user')(observer(Chat))