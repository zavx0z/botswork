import {useAnimations, useGLTF} from "@react-three/drei"
import {useEffect, useRef, useState} from "react"
import {degToRad} from "three/src/math/MathUtils"

export const Chelik = ({molecule}) => {
    const group = useRef()
    const {nodes, materials} = useGLTF("/glb/chelik.glb")
    const {actions} = useAnimations(molecule.run, group)
    const [running, setRunning] = useState(true)
    useEffect(() => {
        // actions.wait.play()
        running && actions.run.play()
    }, [actions, running])
    return <group
        ref={group}
        name="Armature"
        rotation={[Math.PI / 2, 0, degToRad(90)]}
        scale={.014}
        position-x={10}
    >
        <primitive object={nodes.mixamorigHips}/>
        <skinnedMesh
            name="Beta_Joints"
            geometry={nodes.Beta_Joints.geometry}
            material={materials.Beta_Joints_MAT1}
            skeleton={nodes.Beta_Joints.skeleton}
        />
        <skinnedMesh
            name="Beta_Surface"
            geometry={nodes.Beta_Surface.geometry}
            material={materials.Beta_HighLimbsGeoSG3}
            skeleton={nodes.Beta_Surface.skeleton}
        />
    </group>
}
