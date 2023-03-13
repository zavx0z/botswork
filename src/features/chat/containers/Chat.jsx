import React, {useEffect, useRef} from "react"
import {inject, observer} from "mobx-react"
import Message from "../components/Message"
import Box from "@mui/material/Box"

const list = {
    flexGrow: 1,
    overflow: 'auto'
}
const listItem = {
    display: 'flex',
    alignItems: 'center',
    // backgroundColor: "#e3f6f6"
}
const Chat = ({user: {id: userId, messages, getMessages}}) => {
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
    return <Box sx={list} ref={listRef}>
        {messages.map(({id, text, date, senderName, senderId}) =>
            <Message
                key={id}
                author={senderName}
                content={text}
                isSentByMe={senderId === userId}
                sentTime={date}
            />
        )}

        {/*    <List ref={listRef} >*/}
        {/*    {messages.map(({id, text, date, senderName}) => (*/}
        {/*        <ListItem key={id} sx={listItem} divider secondaryAction={<Chip label={date}/>}>*/}
        {/*            <ListItemAvatar>*/}
        {/*                <Avatar sx={{marginRight: 1}}>*/}
        {/*                    {senderName}*/}
        {/*                </Avatar>*/}
        {/*            </ListItemAvatar>*/}
        {/*            <ListItemText*/}
        {/*                primary={text}*/}
        {/*                sx={{*/}
        {/*                    whiteSpace: 'break-spaces',*/}
        {/*                    wordWrap: "break-word"*/}
        {/*                }}*/}
        {/*            />*/}
        {/*        </ListItem>*/}
        {/*    ))}*/}
        {/*</List>*/}
    </Box>
}
export default inject('user')(observer(Chat))