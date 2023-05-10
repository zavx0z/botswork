import {Canvas as FiberCanvas} from "@react-three/fiber"
import React from "react"
import {inject} from "mobx-react"
import {Stats} from "@react-three/drei"
import {Leva} from "leva"
import {a, useSpring} from "@react-spring/web"
import {useTheme} from "@mui/material"

const Canvas = ({leva, stats, children, fullScreen, everything, ...other}) => {
    const theme = useTheme()
    const [props] = useSpring(() => ({height: fullScreen ? window.innerHeight + 'px' : theme.spacing(7)}), [fullScreen])
    return <a.div
        style={{
            zIndex: theme.zIndex.drawer + 2,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: theme.palette.primary.main,
            ...props
        }}>
        <FiberCanvas
            onCreated={({get}) => {
                everything.neutron.canvas.init(get)
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