import {folder, useControls} from "leva"
import {animated, useSpring} from "@react-spring/three"
import {useRef} from "react"

const LampBotswork = () => {
    const meshRef = useRef()
    const {lamp2intensity, lamp2, mass, speed, precision, delay, tension, friction, leftRight: [left, right],} = useControls({'Лампа BotsWork': folder(schema),})
    const {x} = useSpring({
        from: {x: left},
        to: {x: right},
        config: {
            mass: mass,
            precision: precision,
            tension: tension,
            friction: friction,
        },
        loop: {reverse: true},
        reset: true,
        delay: delay,
        speed: speed,
    })
    return <animated.pointLight
        ref={meshRef}
        position-x={x}
        intensity={lamp2intensity}
        position={lamp2}
        // castShadow
        // shadow-mapSize-width={444}
        // shadow-mapSize-height={88}
    />
}
const schema = {
    lamp2: {
        value: [28.5, -2, -18],
        label: 'Положение',
    },
    lamp2intensity: {
        value: 0.44,
        min: 0,
        max: 2,
        step: 0.01,
        joystick: true,
        label: 'Мощность'
    },
    speed: {
        value: 2,
        min: 0,
        max: 20,
        label: 'Скорость'
    },
    leftRight: {
        value: [5, 40],
        min: 0,
        max: 50,
        step: 0.01,
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
}
export default LampBotswork
