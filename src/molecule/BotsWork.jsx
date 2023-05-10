import {useGesture} from "@use-gesture/react"
import {useNavigate} from "react-router-dom"

const BotsWork = ({molecule, onClick}) => {
    // const navigate = useNavigate()
    const bind = useGesture({
        onPointerDown: ({event: {stopPropagation}}) => {
            stopPropagation()
            onClick()
            // navigate('/admin')
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
export default BotsWork