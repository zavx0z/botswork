import {types} from "mobx-state-tree"
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
        }
    }))
export default atomCamera