import {useGesture} from "@use-gesture/react"
import {useEffect} from "react"

const ElectronBotsWork = ({mesh}) => {
    useEffect(() => {
        console.log(mesh)
    }, [mesh])
    const bind = useGesture({
        onPointerDown: ({event: {stopPropagation}}) => {
            stopPropagation()
            console.log('click')
        },
        onPointerEnter: () => {
            document.body.style.cursor = 'pointer'
        },
        onPointerLeave: () => {
            document.body.style.cursor = 'auto'
        },
    })
    return <mesh
        {...bind()}
        {...mesh}
        castShadow
        receiveShadow
    />
}
export default ElectronBotsWork