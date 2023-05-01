import React from "react"
import {useControls} from "leva"
import LampBotswork from "./LampBotswork"
import LampDirectional from "./LampDirectional"

const LightAppBar = () => {
    const {ambientLight} = useControls( 'Свет', {
        ambientLight: {
            value: .44,
            min: 0,
            max: 2,
            step: .01,
            label: 'Общий'
        }
    })
    return <>
        <ambientLight intensity={ambientLight}/>
        <LampBotswork/>
        <LampDirectional/>
    </>
}
export default LightAppBar