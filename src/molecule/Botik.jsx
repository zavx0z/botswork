import {useGesture} from "@use-gesture/react"

export const Botik = ({molecule}) => {
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
    return <mesh
        position={molecule.position}
        rotation={molecule.rotation}
        scale={molecule.scale}
        geometry={molecule.geometry}
        material={molecule.material}
        {...bind()}
    >
        {molecule.children.map((child) => <mesh key={child.uuid} {...child}/>)}
    </mesh>
}