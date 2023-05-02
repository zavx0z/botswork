import confusion from "../../shared/middleware/confusion"
import {fitObjectToView} from "../../shared/utils/fitObjectToView"

const superpositionArea = everything => confusion(everything, [
    {
        particle: 'atomArea',
        action: 'setGLTF',
        before: ({args, particle}) => particle.core.canvas.getGl()
            .then(gl => gl.scene.add(fitObjectToView(gl.camera, args[0], 20)))
    }
])
export default superpositionArea