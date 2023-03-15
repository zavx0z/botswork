import React, {useEffect, useRef} from "react"
import {observer} from "mobx-react"
import Message from "./Message"
import Box from "@mui/material/Box"

const Chat = ({userId, messages}) => {
    const containerRef = useRef(null)
    useEffect(() => {
        scrollDown()
    }, [messages.length])
    const scrollDown = () => {
        const container = containerRef.current
        container.scrollTo({
            top: container.scrollHeight - container.clientHeight,
            behavior: 'smooth'
        })
    }
    return <Box
        ref={containerRef}
        sx={{
            flexGrow: 1,
            overflow: 'auto'
        }}
    >
        {messages.map(({id, text, date, senderName, senderId}) =>
            <Message
                key={id}
                author={senderName}
                content={text}
                isSentByMe={senderId === userId}
                sentTime={date}
            />)}
    </Box>
}
export default observer(Chat)