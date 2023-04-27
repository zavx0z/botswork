import {Leva} from "leva"
import {PerspectiveCamera, useGLTF} from "@react-three/drei"
import React from "react"
import LightAppBar from "./LightAppBar"
import Botik from "./Botik"

export const Model = props => {

    const {nodes, materials} = useGLTF("/logo..glb")
    return (
        <group {...props} dispose={null}>
            <LightAppBar/>
            <Leva
                hidden={true}
            />
            <PerspectiveCamera
                makeDefault={true}
                far={443.7}
                near={4.4}
                fov={8.65}
                position={[20.26, 6.81, 74.04]}
                rotation={[-0.02, -0.01, 0]}
            />
            <Botik nodes={nodes} materials={materials}/>
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

        </group>
    )
}