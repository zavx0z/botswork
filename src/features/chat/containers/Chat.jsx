import {List, ListItemAvatar, ListItemText, Typography} from "@mui/material"
import ListItem from "@mui/material/ListItem"
import Avatar from "@mui/material/Avatar"
import React, {useEffect} from "react"
import {inject, observer} from "mobx-react"

const Chat = ({user: {messages, getMessages}}) => {
    useEffect(() => {
        getMessages()
    }, [getMessages])

    return <List>
        {messages.map(({id, text, date, senderName}) => (
            <ListItem
                key={id}
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}
                secondaryAction={
                    <Typography>
                        {date}
                    </Typography>
                }
            >
                <ListItemAvatar>
                    <Avatar
                        color={"red"}
                        sx={{marginRight: 1}}
                    >
                        {senderName}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText>
                    {text}
                </ListItemText>
            </ListItem>
        ))}
    </List>
}
export default inject('user')(observer(Chat))