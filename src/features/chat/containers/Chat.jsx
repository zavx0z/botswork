import {Chip, List, ListItemAvatar, ListItemText, Typography} from "@mui/material"
import ListItem from "@mui/material/ListItem"
import Avatar from "@mui/material/Avatar"
import React, {useEffect, useRef} from "react"
import {inject, observer} from "mobx-react"

const list = {
    flexGrow: 1,
    overflow: 'auto'
}
const listItem = {
    display: 'flex',
    alignItems: 'center',
    // backgroundColor: "#e3f6f6"
}
const Chat = ({user: {messages, getMessages}}) => {
    useEffect(() => {
        getMessages()
    }, [getMessages])

    useEffect(() => {
        scrollDown()
    }, [messages.length])
    const listRef = useRef(null)
    const scrollDown = () => {
        const myElement = listRef.current
        myElement.scrollTo({
            top: myElement.scrollHeight - myElement.clientHeight,
            behavior: 'smooth'
        })
    }
    return <List ref={listRef} sx={list}>
        {messages.map(({id, text, date, senderName}) => (
            <ListItem key={id} sx={listItem} divider secondaryAction={<Chip label={date}/>}>
                <ListItemAvatar>
                    <Avatar sx={{marginRight: 1}}>
                        {senderName}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={text}
                    sx={{
                        whiteSpace: 'break-spaces',
                        wordWrap: "break-word"
                    }}
                />
            </ListItem>
        ))}
    </List>
}
export default inject('user')(observer(Chat))