import {Canvas as FiberCanvas, useThree} from "@react-three/fiber"
// import {ACESFilmicToneMapping, PCFSoftShadowMap} from "three"
import React, {useEffect} from "react"
import {inject} from "mobx-react"
import Box from "@mui/material/Box"
import {Stats} from "@react-three/drei"
import {Leva} from "leva"


export const MobxGlProvider = inject('everything')(({everything: {neutron: {canvas: {init, backgroundColor}}}}) => {
    const get = useThree((state) => state.get)
    useEffect(() => {
        init(get)
    }, [init, get])
    return <color attach="background" args={[backgroundColor]}/>
})
const Canvas = ({onCreated, leva, stats, children, fullScreen, ...other}) =>
    <Box sx={theme => ({
        zIndex: 444444,
        height: fullScreen ? '100vh' : theme.spacing(5),
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        bgColor: theme.palette.primary.main
    })}>
        <FiberCanvas
            {...other}
            onCreated={({gl}) => {
                Math.min(gl['setPixelRatio'](window.devicePixelRatio), 2)
                // gl['shadowMap'].enabled = true
                // gl['shadowMap'].type = PCFSoftShadowMap
                // gl.toneMapping = ACESFilmicToneMapping
                // typeof onCreated !== "undefined" && onCreated()
            }}
        >
            {stats && <Stats showPanel={0} className="stats"/>}
            <Leva hidden={!leva}/>
            <MobxGlProvider/>
            {children}
        </FiberCanvas>
    </Box>
export default Canvas