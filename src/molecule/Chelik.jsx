import {useAnimations} from "@react-three/drei"
import {useEffect, useRef, useState} from "react"

export const Chelik = ({molecule}) => {
    const group = useRef()
    const {actions} = useAnimations(molecule.run, group)
    const [running, setRunning] = useState(true)
    useEffect(() => {
        // actions.wait.play()
        running && actions.run.play()
    }, [actions, running])
    return <group
        ref={group}
        name="Armature"
        rotation={[...molecule.rotation]}
        scale={molecule.scale}
        position={[...molecule.position]}
    >
        <primitive object={molecule.bone}/>
        {molecule.skinnedMesh.map(item => <skinnedMesh key={item.uuid} {...item}/>)}
    </group>
}
