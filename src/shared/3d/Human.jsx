import React, {useEffect, useRef} from "react"
import {useAnimations, useGLTF} from "@react-three/drei"
import {degToRad} from "three/src/math/MathUtils"

const Human = ({...props}) => {
    const group = useRef()
    const {nodes, materials, animations} = useGLTF("/Human.glb")
    const {actions} = useAnimations(animations, group)
    useEffect(() => {
        Object.keys(actions).forEach((key) => {
            actions[key].play()
        })
    }, [])
    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Armature" position={[28, 2.24, 2]} rotation={[0, degToRad(65), 0]}>
                <primitive object={nodes.Bone}/>
                <skinnedMesh
                    geometry={nodes.Cube008.geometry}
                    material={nodes.Cube008.material}
                    skeleton={nodes.Cube008.skeleton}
                    castShadow
                    receiveShadow
                />
                <skinnedMesh
                    geometry={nodes.Cube009.geometry}
                    material={nodes.Cube009.material}
                    skeleton={nodes.Cube009.skeleton}
                    castShadow
                    receiveShadow
                />
            </group>
        </group>
    )
}

useGLTF.preload("/Human.glb")
export default Human