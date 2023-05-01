import React, {useEffect, useRef} from "react"
import {useGLTF} from "@react-three/drei"
import {inject, observer} from "mobx-react"

const Area = ({everything: {atom: {area: {init, path}}}}) => {
    const ref = useRef(null)
    const {nodes, materials} = useGLTF(path)
    // const three = useThree()
    // const scale = 2
    // const [scaleX, setX] = useState(0)
    // useEffect(() => {
    //     const {boundingBox} = nodes.Room.geometry
    //     const depthRoom = Math.abs(boundingBox.max.z) + Math.abs(boundingBox.min.z)
    //     const visibleWidth = camera.getVisibleWidth(depthRoom / 2 + nodes.Room.position.z)
    //     setX(visibleWidth -2)
    // }, [camera])
    useEffect(() => {
        ref.current && init(ref.current.id)
    }, [ref, init])
    return <mesh
        ref={ref}
        castShadow
        receiveShadow
        geometry={nodes.Room.geometry}
        material={materials.appBar}
        // scale-x={scaleX}
        position-x={nodes.Room.position.x}
        position-y={nodes.Room.position.y}
        position-z={nodes.Room.position.z}
    />
}
export default inject('everything')(observer(Area))