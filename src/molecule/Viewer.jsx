import React, {useRef} from 'react'
import {VncScreen} from 'react-vnc'

const App = () => {
    const ref = useRef()

    return (
        <VncScreen
            url={`${process.env.REACT_APP_HOST_WSS}/ws/213.189.201.210`}
            // url="ws://192.168.88.44:8080/websockify"
            scaleViewport
            // showDotCursor
            background="src/views#fff"
            style={{
                width: '100%',
                height: '75vh',
            }}
            ref={ref}
        />
    )
}

export default App