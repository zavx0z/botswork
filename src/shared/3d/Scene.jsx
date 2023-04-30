import {PerspectiveCamera, useGLTF} from "@react-three/drei"
import React from "react"
import Human from "./Human"
import LightAppBar from "../light/LightAppBar"

export const Scene = props => {
    const {nodes, materials} = useGLTF("/logo..glb")
    return (
        <group {...props} dispose={null}>
            <LightAppBar/>
            {/*<Human/>*/}
            {/*<PerspectiveCamera*/}
            {/*    far={111}*/}
            {/*    near={70}*/}
            {/*    fov={3.61}*/}
            {/*    position={[0, 2.21, 74.44]}*/}
            {/*    makeDefault={true}*/}
            {/*    shadowMap // Включение shadow map*/}
            {/*    shadowMapWidth={2048} // Ширина карты теней*/}
            {/*    shadowMapHeight={2048} // Высота карты теней*/}
            {/*/>*/}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Head.geometry}
                material={materials.Material}
                position={[-9.86, 2.68, 0]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={0.65}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.BodyTopLeft.geometry}
                material={materials.Material}
                position={[-9.86, 1.88, 0]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={0.65}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.BodyTopRight.geometry}
                material={materials.Material}
                position={[-10.58, 1.88, 0]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={0.65}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.WristRight.geometry}
                material={materials.Material}
                position={[-11.39, 1.88, 0]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={0.65}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.WristLeft.geometry}
                material={materials.Material}
                position={[-9.05, 1.15, 0]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={0.65}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.BodyBottomLeft.geometry}
                material={materials.Material}
                position={[-9.86, 1.15, 0]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={0.65}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.BodyBottomRight.geometry}
                material={materials.Material}
                position={[-10.58, 1.15, 0]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={0.65}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.LegRight.geometry}
                material={materials.Material}
                position={[-10.58, 0.35, 0]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={0.65}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.LegLeft.geometry}
                material={materials.Material}
                position={[-9.86, 0.35, 0]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={0.65}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.ShoulderLeft.geometry}
                material={materials.Material}
                position={[-9.39, 1.82, 0]}
                scale={[0.39, 0.15, 0.16]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.ShoulderRight.geometry}
                material={materials.Material}
                position={[-11.12, 1.14, 0]}
                rotation={[0, 0, Math.PI]}
                scale={[0.39, 0.15, 0.16]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Neck.geometry}
                material={materials.Material}
                position={[-10.59, 2.34, 0]}
                rotation={[0, 0, Math.PI / 2]}
                scale={[0.39, 0.15, 0.16]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Scene_1.geometry}
                material={materials["Material.001"]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Text.geometry}
                material={materials.Material}
                position={[0, 0.03, 0]}
                rotation={[Math.PI / 2, 0, 0]}
            />
        </group>
    )
}