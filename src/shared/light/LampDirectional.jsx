import React from "react"
import {folder, useControls} from "leva"

const LampDirectional = () => {
    const {position, intensity} = useControls('Свет', {
        'Направленный': folder({
            position: {
                value: [25, 1.5, 5],
                label: 'Позиция',
            },
            intensity: {
                value: .3,
                min: 0,
                max: 2,
                step: .01,
                joystick: true,
                label: 'мощность'
            },
        }),
    })
    return <directionalLight
        // penumbra={1}
        shadow-mapSize-width={2048} // Ширина карты теней
        shadow-mapSize-height={2048} // Высота карты теней
        castShadow={true}
        intensity={intensity}
        decay={2}
        position={position}
    />
}
export default LampDirectional