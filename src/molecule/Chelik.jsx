import {useAnimations, useGLTF} from "@react-three/drei"
import {useEffect, useRef, useState} from "react"
import {degToRad} from "three/src/math/MathUtils"
// import {useGesture} from "@use-gesture/react"

export const Chelik = ({molecule}) => {
    const group = useRef()
    const {nodes, materials} = useGLTF("/glb/chelik.glb")
    const {actions} = useAnimations(molecule.run, group)
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
    // const bind = useGesture({
    //     onPointerDown: ({event: {stopPropagation}}) => {
    //         stopPropagation()
    //         console.log('click')
    //     },
    //     onPointerEnter: () => {
    //         document.body.style.cursor = 'pointer'
    //     },
    //     onPointerLeave: () => {
    //         document.body.style.cursor = 'auto'
    //     },
    // })
    const [running, setRunning] = useState(true)
    useEffect(() => {
        // actions.wait.play()
        running && actions.run.play()
        !running && actions.run.stop()
    }, [actions, running])
    return <group
        ref={group}
        dispose={null}
        onClick={() => {
            console.log("click")
            setRunning(!running)
        }}
    >
        <group
            name="Armature"
            rotation={[Math.PI / 2, 0, degToRad(90)]}
            scale={.014}
            position-x={10}
        >
            <primitive
                object={nodes.mixamorigHips}
            />
            <skinnedMesh
                onClick={() => {
                    console.log("click")
                    setRunning(!running)
                }}
                name="Beta_Joints"
                geometry={nodes.Beta_Joints.geometry}
                material={materials.Beta_Joints_MAT1}
                skeleton={nodes.Beta_Joints.skeleton}
            />
            <skinnedMesh
                onClick={() => {
                    console.log("click")
                    setRunning(!running)
                }}
                name="Beta_Surface"
                geometry={nodes.Beta_Surface.geometry}
                material={materials.Beta_HighLimbsGeoSG3}
                skeleton={nodes.Beta_Surface.skeleton}
            />
        </group>
    </group>
}
