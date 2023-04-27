import {degToRad} from "three/src/math/MathUtils"
import {folder, useControls} from "leva"

const Botik = ({nodes, materials}) => {
    const {rotateY} = useControls(
        {
            'Ботик': folder({
                rotateY: {
                    value: 161,
                    min: 144,
                    max: 177,
                    step: .01,
                    label: 'Угол'
                }
            }),
        })
    return <group
        // dispose={null}
        rotation={[Math.PI, degToRad(rotateY), Math.PI]}
    >
        < mesh
            castShadow
            receiveShadow
            geometry={nodes.instance_xlgtz_0.geometry}
            material={materials.Material}
            position={[0.79, 6.24, 0]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={0.68}
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.instance_xlgtz_1.geometry}
            material={materials.Material}
            position={[0.79, 4.26, 0]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={0.68}
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.instance_xlgtz_2.geometry}
            material={materials.Material}
            position={[-0.82, 4.26, 0]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={0.68}
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.instance_xlgtz_3.geometry}
            material={materials.Material}
            position={[-2.79, 4.26, 0]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={0.68}
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.instance_xlgtz_4.geometry}
            material={materials.Material}
            position={[2.76, 2.65, 0]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={0.68}
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.instance_xlgtz_5.geometry}
            material={materials.Material}
            position={[0.79, 2.65, 0]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={0.68}
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.instance_xlgtz_6.geometry}
            material={materials.Material}
            position={[-0.82, 2.65, 0]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={0.68}
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.instance_xlgtz_7.geometry}
            material={materials.Material}
            position={[-0.82, 0.68, 0]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={0.68}
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.instance_xlgtz_8.geometry}
            material={materials.Material}
            position={[0.79, 0.68, 0]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={0.68}
        />
    </group>
}
export default Botik