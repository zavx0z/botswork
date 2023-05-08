import {types} from "mobx-state-tree"
import neutronCanvas from "../../core/neutron/canvas/neutronCanvas"
import quarkRotation from "../../core/quark/quarkRotation"
import {Controller} from "@react-spring/three"

const atomCamera = types
    .model({
        core: types.model({
            canvas: types.safeReference(neutronCanvas),
        }),
        // position: quarkPosition,
        // rotation: quarkRotation,
        fov: types.number,
        far: types.number,
        near: types.number,
    })
    .volatile(self => ({
        position: types.frozen({}),
        rotation: types.frozen({}),
    }))
    .actions(self => ({
        afterCreate() {
            self.position = new Controller({
                x: 0,
                y: 0,
                z: 0,
                onChange: ({value: {x, y, z}}) => {
                    self.ObjectTreeJS.position.set(x, y, z)
                    self.ObjectTreeJS.updateMatrixWorld()
                },
            })
            self.rotation = new Controller({
                x: 0,
                y: 0,
                z: 0,
                onChange: ({value: {x, y, z}}) => {
                    self.ObjectTreeJS.rotation.set(x, y, z)
                    self.ObjectTreeJS.updateMatrixWorld()
                }
            })
        },
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
    .views(self => ({
        get ObjectTreeJS() {
            const {core} = self
            return core.canvas.camera
        },
    }))
export default atomCamera