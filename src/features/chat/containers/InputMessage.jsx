import Box from "@mui/material/Box"
import {IconButton, TextField} from "@mui/material"
import {Telegram} from "@mui/icons-material"
import React, {useState} from "react"
import {inject, observer} from "mobx-react"

const InputMessage = ({user: {sendMessage}}) => {
    const [message, setMessage] = useState('')
    const handleMessageChange = (event) => setMessage(event.target.value)
    const handleSendMessage = () => {
        if (message.length) {
            sendMessage(message)
            setMessage('')
        }
    }
    const handleKeyPress = (e) => {
        if (e.keyCode === 13 && e.ctrlKey)
            handleSendMessage()
    }
    return <Box sx={{display: 'flex', alignItems: 'center'}}>
        <TextField
            label="Написать сообщение"
            multiline
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKeyPress}
            autoComplete={'off'}
            sx={{flexGrow: 1}}
        />
        <IconButton
            variant="contained"
            color="primary"
            size={"large"}
            onClick={handleSendMessage}
            sx={{marginLeft: 1}}
        >
            <Telegram color={"action"} fontSize={'large'}/>
        </IconButton>
    </Box>
}
export default inject('user')(observer(InputMessage))