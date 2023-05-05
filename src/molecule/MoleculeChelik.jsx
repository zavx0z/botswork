import {useGesture} from "@use-gesture/react"
import {useEffect} from "react"

export const MoleculeChelik = ({molecule}) => {
    useEffect(() => {
        console.log(molecule)
    }, [molecule])
    const bind = useGesture({
        onPointerDown: ({event: {stopPropagation}}) => {
            stopPropagation()
            console.log('click', molecule)

        },
        onPointerEnter: () => {
            document.body.style.cursor = 'pointer'
        },
        onPointerLeave: () => {
            document.body.style.cursor = 'auto'
        },
    })
    return <group
        position={molecule.position}
        rotation={molecule.rotation}
        scale={molecule.scale}
        // geometry={molecule.geometry}
        // material={molecule.material}
        {...bind()}
    >
        {molecule.meshes.map((child) => <mesh {...child}/>)}
        {molecule.objects.map((child) => <object3D {...child}/>)}
    </group>
}
