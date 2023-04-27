import React from "react"
import {folder, useControls} from "leva"

const LightAppBar = () => {
    const {
        lamp1,
        lamp2,
        lamp1intensity,
        lamp2intensity,
        ambientLight,
    } = useControls({
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
        }),
        ambientLight: {
            value: .44,
            min: 0,
            max: 2,
            step: .01
        }
    })
    return <>
        <ambientLight intensity={ambientLight}/>
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
    </>
}
export default LightAppBar