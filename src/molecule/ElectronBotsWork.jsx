import {useGesture} from "@use-gesture/react"

const ElectronBotsWork = ({molecule}) => {
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
        {...molecule}
        castShadow
        receiveShadow
    />
}
export default ElectronBotsWork