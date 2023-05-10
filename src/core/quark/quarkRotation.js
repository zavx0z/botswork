import {types} from "mobx-state-tree"
import quarkSpring from "./quarkSpring"

const quarkRotation = types
    .model("position", {
        x: 0,
        y: 0,
        z: 0,
        config: types.optional(quarkSpring,{}),
    })
    .volatile(self => ({
        api: null
    }))
    .actions(self => ({
        setAPI(controller) {
            console.log('rotation', controller)
            self.api = controller
        },
        start(x, y, z) {
            if (self.api) {
                self.api.update({rotationX: x, rotationY: y, rotationZ: z})
                return self.api.start()
                    .then(result => {
                        const {rotationX, rotationY, rotationZ} = result.value
                        this.set(rotationX, rotationY, rotationZ)
                    })
            }
        },
        startX(x) {
            if (self.api) {
                self.api.update({rotationX: x, rotationY: self.y, rotationZ: self.z})
                return self.api.start()
                    .then(result => {
                        const {rotationX, rotationY, rotationZ} = result.value
                        this.set(rotationX, rotationY, rotationZ)
                    })
            }
        },
        startY(y) {
            if (self.api) {
                self.api.update({rotationX: self.x, rotationY: y, rotationZ: self.z})
                return self.api.start()
                    .then(result => {
                        const {rotationX, rotationY, rotationZ} = result.value
                        this.set(rotationX, rotationY, rotationZ)
                    })
            }
        },
        startZ(z) {
            if (self.api) {
                self.api.update({rotationX: self.x, rotationY: self.y, rotationZ: z})
                // this.set(x, y, z)
                return self.api.start()
                    .then(result => {
                        const {rotationX, rotationY, rotationZ} = result.value
                        this.set(rotationX, rotationY, rotationZ)
                    })
            }
        },
        setX(x) {
            self.x = x
        },
        setY(y) {
            self.y = y
        },
        setZ(z) {
            self.z = z
        },
        setAll(number) {
            self.x = self.y = self.z = number
        },
        set(x, y, z) {
            self.x = x
            self.y = y
            self.z = z
        }
    }))
export default quarkRotation