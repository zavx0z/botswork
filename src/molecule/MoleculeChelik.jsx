import {useAnimations, useGLTF} from "@react-three/drei"
import {useEffect, useRef} from "react"
import {degToRad} from "three/src/math/MathUtils"

export const MoleculeChelik = ({molecule}) => {
    const group = useRef()
    const {nodes, materials, animations} = useGLTF("/glb/chelik.glb")
    const {actions} = useAnimations(animations, group)
    // return <group dispose={null}>
    //     <primitive object={molecule.bone}/>
    //     {molecule.skinnedMesh.map((child) =>
    //         <skinnedMesh
    //             key={child.uuid}
    //             uuid={child.uuid}
    //             name={child.name}
    //             geometry={child.geometry}
    //             material={child.material}
    //             skeleton={child.skeleton}
    //         />
    //     )}
    // </group>
    useEffect(() => {
        console.log(actions)
        actions.wait.play()
    }, [actions])
    return <group ref={group} dispose={null}>
        <group name="Scene">
            <group name="Armature" rotation={[Math.PI / 2, 0, degToRad(90)]} scale={.014} position-x={10}>
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
        </group>
    </group>
}
