import React from "react"
import {useGLTF} from "@react-three/drei"

const BotsWork = props => {
    const {nodes, materials} = useGLTF("/glb/BotsWork.glb")
    const scale = 1.4
    return <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        position={[0, 0, -41]}
        scale={[scale, scale, scale]}
        material={materials.Material}
        rotation={[Math.PI / 2, 0, 0]}
    />
}

useGLTF.preload("/glb/BotsWork.glb")

export default BotsWork