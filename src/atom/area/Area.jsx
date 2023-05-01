import React from "react"
import {inject, observer} from "mobx-react"

const Area = ({everything: {atom: {area: {gltf}}}}) => {
    console.log(gltf.scale)
    return <mesh
        uuid={gltf.uuid}
        name={gltf.name}
        castShadow
        receiveShadow
        scale={gltf.scale}
        geometry={gltf.geometry}
        material={gltf.material}
        position={gltf.position}
    />
}
export default inject('everything')(observer(Area))