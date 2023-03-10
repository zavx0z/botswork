import React, {useRef} from 'react'
import {VncScreen} from 'react-vnc'

const App = () => {
    const ref = useRef()

    return (
        <VncScreen
            // url="ws://194.67.104.130:80/websockify"
            url="ws://192.168.88.44:8080/websockify"
            scaleViewport
            // showDotCursor
            background="#fff"
            style={{
                width: '100%',
                height: '75vh',
            }}
            ref={ref}
        />
    )
}

export default App