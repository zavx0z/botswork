import {useGesture} from "@use-gesture/react"

const Metaverse = ({mesh}) => {
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
export default Metaverse