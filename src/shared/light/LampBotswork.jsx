import {folder, useControls} from "leva"
import {animated, useSpring} from "@react-spring/three"


const LampBotswork = () => {

    const {leftRight: {left, right}, ...animation} = useControls('Свет', animationLeva)
    const {x} = useSpring({
        from: {x: left},
        to: {x: right},
        config: {
            mass: animation['mass'],
            precision: animation['precision'],
            tension: animation['tension'],
            friction: animation['friction'],
        },
        loop: {reverse: true},
        reset: true,
        delay: animation['delay'],
        speed: animation['speed'],
    })
    const {intensity, position} = useControls(
        'Свет', {
            'Лампа BotsWork': folder({
                position: {
                    value: [28.5, -2, -18],
                    label: 'Положение',
                },
                intensity: {
                    value: 0.44,
                    min: 0,
                    max: 2,
                    step: 0.01,
                    label: 'Мощность'
                },
            })
        })
    return <animated.pointLight
        position-x={x}
        intensity={intensity}
        position={position}
        castShadow
        shadow-mapSize-width={444}
        shadow-mapSize-height={88}
    />
}
const animationLeva = {
    'Лампа BotsWork': folder({
        speed: {
            value: 2,
            min: 0,
            max: 20,
            label: 'Скорость'
        },
        leftRight: {
            value: {
                left: 5,
                right: 40
            },
            step: 0.01,
            joystick: false,
            label: 'Диапазон'
        },
        tension: {
            value: 7.4,
            min: 0,
            max: 15,
            step: 0.01,
            label: 'Напряжение'
        },
        friction: {
            value: 8.5,
            min: 0,
            max: 15,
            step: 0.01,
            label: 'Трение'
        },
        delay: {
            value: 0,
            min: 0,
            max: 2000,
            step: 0.01,
            label: 'Задержка'
        },
        mass: {
            value: 5,
            min: 0,
            max: 15,
            step: 0.01,
            label: 'Масса',
        },
        precision: {
            value: .5,
            min: 0.01,
            max: 1,
            step: 0.0001,
            label: 'Точность'
        }
    })
}
export default LampBotswork
