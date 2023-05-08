import {Canvas as FiberCanvas} from "@react-three/fiber"
import React, {useEffect} from "react"
import {inject} from "mobx-react"
import {Stats} from "@react-three/drei"
import {Leva} from "leva"
import {a, useSpring} from "@react-spring/web"
import {useTheme} from "@mui/material"

const Canvas = ({onCreated, leva, stats, children, fullScreen, everything, ...other}) => {
    const theme = useTheme()
    const [props] = useSpring(() => ({
        height: Boolean(fullScreen) ? window.innerHeight + 'px' : theme.spacing(7)
    }), [fullScreen])
    useEffect(() => {
        console.log(fullScreen)
    }, [fullScreen])
    return <a.div
        style={{
            zIndex: 444444,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: theme.palette.primary.main,
            ...props
        }}>
        <FiberCanvas
            onCreated={({get, viewport,}) => {
                everything.neutron.canvas.init(get)
                console.log(viewport)
            }}
            {...other}
        >
            {stats && <Stats showPanel={0} className="stats"/>}
            <Leva hidden={!leva}/>
            <color attach="background" args={[theme.palette.primary.main]}/>
            {children}
        </FiberCanvas>
    </a.div>
}
export default inject('everything')((Canvas))