import React, {useEffect, useRef} from "react"
import {observer} from "mobx-react"
import Message from "./Message"
import Box from "@mui/material/Box"
import useViewportHeight from "../../../layouts/hooks/useViewportHeight"

const Chat = ({userId, messages}) => {
    const containerRef = useRef(null)
    const {isKeyboardOpen} = useViewportHeight()
    useEffect(() => {
        if (isKeyboardOpen)
            setTimeout(() => {
                scrollDown('smooth')
            }, 0)
    }, [isKeyboardOpen])

    useEffect(() => {
        scrollDown()
    }, [messages.length])
    const scrollDown = (behavior='auto') => {
        const container = containerRef.current
        container.scrollTo({
            top: container.scrollHeight - container.clientHeight,
            behavior: behavior
        })
    }
    return <Box
        ref={containerRef}
        onTouchMove={e => e.stopPropagation()}
        sx={{
            flexGrow: 1,
            overflowY: 'scroll',
        }}
    >
        {messages.map(({id, text, date, senderName, senderId, read}) =>
            <Message
                key={id}
                author={senderName}
                content={text}
                isSentByMe={senderId === userId}
                sentTime={date}
                isRead={read}
            />)}
    </Box>
}
export default observer(Chat)