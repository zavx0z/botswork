import {types} from "mobx-state-tree"
import {MathUtils} from "three"
import quarkPosition from "../../core/quark/quarkPosition"
import neutronCanvas from "../../core/neutron/canvas/neutronCanvas"

const atomCamera = types
    .model({
        core: types.model({
            canvas: types.safeReference(neutronCanvas),
        }),
        position: quarkPosition,
        fov: types.number,
        far: types.number,
        near: types.number,
    })
    .actions(self => ({
        setFov(fov) {
            self.fov = fov
        },
        setX(num) {
            self.x = num
        },
        setY(num) {
            self.y = num
        },
        setZ(num) {
            self.z = num
        },
        getVisibleHeight(depth) {
            const {camera} = self['core'].canvas
            console.log(self['core'].canvas)
            const cameraOffset = camera.position.z
            if (depth < cameraOffset) depth -= cameraOffset
            else depth += cameraOffset
            const vFOV = MathUtils.degToRad(camera.fov)
            return 2 * Math.tan(vFOV * 0.5) * Math.abs(depth)
        },
        computeDepth(fov, size) {
            return size / 2 / Math.tan(MathUtils.degToRad(fov) * 0.5)
        },
        getWidthAtDepth(depth, width) {
            const {camera} = self['core'].canvas
            const visibleHeight = self['getVisibleHeight'](camera, depth)
            const visibleWidth = visibleHeight * camera.aspect
            const widthAtDepth = width * (visibleWidth / camera.viewportWidth)
            return widthAtDepth
        }
    }))
export default atomCamera