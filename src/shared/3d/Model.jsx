import {folder, useControls} from "leva"
import {PerspectiveCamera, useGLTF} from "@react-three/drei"
import {degToRad} from "three/src/math/MathUtils"
import React from "react"

export const Model = props => {
    const {
        lamp1,
        lamp2,
        lamp1intensity,
        lamp2intensity,
        rotateY
    } = useControls('Свет',
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
            'Лампа 1': folder({
                lamp1: {
                    value: [-8, 2, 14.44],
                    label: 'Свет1',
                },
                lamp1intensity: {
                    value: .3,
                    min: 0,
                    max: 2,
                    step: .01,
                    joystick: true,
                    label: 'мощность'
                },
            }),
            'Лампа 2': folder({
                lamp2: {
                    value: [28.5, -2, -18],
                    label: 'Свет2',
                },
                lamp2intensity: {
                    value: .44,
                    min: 0,
                    max: 2,
                    step: .01,
                    joystick: true,
                    label: 'мощность'
                },
            })
        })
    const {nodes, materials} = useGLTF("/logo..glb")
    return (
        <group {...props} dispose={null}>
            <PerspectiveCamera
                makeDefault={true}
                far={443.7}
                near={4.4}
                fov={8.65}
                position={[20.26, 6.81, 74.04]}
                rotation={[-0.02, -0.01, 0]}
            />
            <pointLight
                intensity={lamp1intensity}
                decay={2}
                position={lamp1}
            />
            <pointLight
                intensity={lamp2intensity}
                decay={2}
                position={lamp2}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube001.geometry}
                material={materials["Material.001"]}
                position={[0, 5.12, 0]}
                scale={[7.17, 5.37, 4.44]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Text.geometry}
                material={materials.Material}
                position={[5.98, 0, -0.35]}
                rotation={[Math.PI / 2, 0, 0]}
            />
            <group
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
        </group>
    )
}