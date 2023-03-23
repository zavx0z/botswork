import React, {useCallback, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react"
import useViewportHeight from "../../../layouts/hooks/useViewportHeight"
import {Fab, Slide} from "@mui/material"
import List from "@mui/material/List"
import ArrowDown from "@mui/icons-material/ArrowDropDown"
import Box from "@mui/material/Box"
import MessageList from "./MessageList"
import {useGesture} from "@use-gesture/react"

let timeoutId

const Chat = ({userId, messages, readMessage}) => {
    const listRef = useRef(null)
    const {isKeyboardOpen} = useViewportHeight()
    const scrollDown = useCallback((behavior = 'auto') => {
        const container = listRef.current
        container.scrollTo({top: container.scrollHeight - container.clientHeight, behavior: behavior})
        readMessage()
    }, [readMessage, listRef])

    useEffect(() => {
        isKeyboardOpen && setTimeout(() => scrollDown('smooth'), 0)
    }, [isKeyboardOpen, scrollDown])
    useEffect(() => {
        setTimeout(() => scrollDown(), 4)
    }, [messages.length, scrollDown])
    const [isScrollDown, setIsScrollDown] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const bind = useGesture({
        onScroll: ({xy: [x, y], target, delta: [dx, dy]}) => {
            setIsScrolled(true)
            clearTimeout(timeoutId)
            // для кнопки
            const {scrollHeight, clientHeight} = target
            const bottomPosition = scrollHeight - (y + clientHeight)
            if (!bottomPosition)
                setIsScrollDown(false)
            else if (Math.abs(dy) > Math.abs(dx))
                setIsScrollDown(dy > 0 && bottomPosition > 400)

            timeoutId = setTimeout(() => {
                setIsScrolled(false)
                timeoutId = null
            }, 1000)
        }
    })
    return <Box sx={{
        width: '100%',
        position: "relative",
        display: "flex",
        overflowY: "inherit",
    }}>
        <List
            {...bind()}
            onTouchMove={e => e.stopPropagation()}
            sx={{
                overflowY: "auto",
                width: "100%",
                bgcolor: "background.paper",
                pt: 1,
            }}
            ref={listRef}
            dense
            disablePadding
            component="nav"
            aria-label="message list"
        >
            <MessageList userId={userId} messages={messages} sticked={!isScrolled}/>
        </List>
        <Slide in={isScrollDown} direction={'up'}>
            <Fab
                onClick={() => scrollDown('smooth')}
                sx={{
                    position: 'absolute',
                    bottom: 12,
                    right: 12
                }}
                size="small"
                color="secondary"
                aria-label="add"
            >
                <ArrowDown/>
            </Fab>
        </Slide>
    </Box>
}
export default observer(Chat)