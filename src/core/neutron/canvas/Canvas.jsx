import {Canvas as FiberCanvas, useThree} from "@react-three/fiber"
// import {ACESFilmicToneMapping, PCFSoftShadowMap} from "three"
import {useEffect} from "react"
import {inject} from "mobx-react"


export const MobxGlProvider = inject('everything')(({everything: {neutron: {canvas: {init}}}}) => {
    const get = useThree((state) => state.get)
    useEffect(() => {
        init(get)
    }, [init, get])
    return <></>
})
const Canvas = ({onCreated, children, ...other}) =>
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
        <MobxGlProvider/>
        {children}
    </FiberCanvas>
export default Canvas