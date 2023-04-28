import React from "react"
import {folder, useControls} from "leva"
import LampBotswork from "./LampBotswork"

const LightAppBar = () => {
    const {lamp1, lamp1intensity, ambientLight} = useControls({
        'Лампа 1': folder({
            lamp1: {
                value: [25, 1.5, 5],
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
            ambientLight: {
                value: .44,
                min: 0,
                max: 2,
                step: .01
            }
        }),
    })
    return <>
        <ambientLight intensity={ambientLight}/>
        <directionalLight
            // penumbra={1}
            shadow-mapSize-width={2048} // Ширина карты теней
            shadow-mapSize-height={2048} // Высота карты теней
            castShadow={true}
            intensity={lamp1intensity}
            decay={2}
            position={lamp1}
        />
        {/*<Leva hidden={true}/>*/}
        <LampBotswork/>
    </>
}
export default LightAppBar