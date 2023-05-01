import {inject, observer} from "mobx-react"
import {PerspectiveCamera} from "@react-three/drei"
import React, {useEffect} from "react"
import {animated, useSpring, useSpringRef} from "@react-spring/three"

const AnimatedCamera = animated(PerspectiveCamera)
const Camera = ({everything: {atom: {camera}}}) => {
    const positionAPI = useSpringRef()
    const [{positionX, positionY, positionZ}] = useSpring(() => ({
        ref: positionAPI,
        positionX: camera.position.x,
        positionY: camera.position.y,
        positionZ: camera.position.z,
        config: camera.position.config
    }))
    useEffect(() => {
        camera.position.setAPI(positionAPI.current[0])
    }, [camera.position, positionAPI])
    // useEffect(() => console.log(positionZ), [positionZ])
    return <>
        <AnimatedCamera
            far={camera.far}
            near={camera.near}
            position-x={positionX}
            position-y={positionY}
            position-z={positionZ}
            fov={camera.fov}
            makeDefault
        />
    </>
}
export default inject('everything')(observer(Camera))