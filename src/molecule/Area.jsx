const Area = ({molecule: {gltf}}) => {
    return <mesh {...gltf} castShadow receiveShadow/>
}
export default Area