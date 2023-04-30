import {types} from "mobx-state-tree"
import quarkSpring from "./quarkSpring"

const quarkScale = types
    .model({
        x: 1,
        y: 1,
        z: 1,
        config: types.optional(quarkSpring, {})
    })
    .volatile(_ => ({
        api: null
    }))
    .actions(self => ({
        setAPI(controller) {
            self.api = controller
        },
        set(x, y, z) {
            self.x = x
            self.y = y
            self.z = z
        },
        start(x, y, z) {
            return self.api.start({scaleX: x, scaleY: y, scaleZ: z, config: {...self['config']}})
        },
    }))

export default quarkScale