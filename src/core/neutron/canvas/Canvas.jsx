import {Canvas as FiberCanvas, useThree} from "@react-three/fiber"
// import {ACESFilmicToneMapping, PCFSoftShadowMap} from "three"
import {useEffect} from "react"


export const MobxGlProvider = ({store}) => {
    const get = useThree((state) => state.get)
    useEffect(() => store.setGl(get), [get])
    return <></>
}
const Canvas = ({onCreated, store, children, ...other}) =>
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
        <MobxGlProvider store={store}/>
        {children}
    </FiberCanvas>
export default Canvas