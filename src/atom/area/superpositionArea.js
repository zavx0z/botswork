import confusion from "../../shared/middleware/confusion"

const superpositionArea = everything => confusion(everything, [
    {
        particle: 'atomArea',
        action: 'setGLTF',
        before: ({args, particle}) => {
            const gltf = args[0]
            const {boundingBox} = gltf.geometry
            const depth = Math.abs(boundingBox.max.z) + Math.abs(boundingBox.min.z)
            particle.core.canvas
                .getGlPromise()
                .then(gl => {
                    const el = gl.scene.getObjectByProperty('uuid', gltf.uuid)
                    el.scale.x = everything.atom.camera.getVisibleWidth(depth / 2 + gltf.position.z)
                })
        }
    }
])
export default superpositionArea