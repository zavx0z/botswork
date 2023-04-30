import {types} from "mobx-state-tree"
import quarkSpring from "./quarkSpring"

const quarkMaterial = types
    .model({
        opacity: 1,
        color: '',
        doubleSide: false,
        config: types.optional(quarkSpring, {})
    })
    .volatile(_ => ({
        api: null
    }))
    .actions(self => ({
        setAPI(controller) {
            self.api = controller
        },
        setColor(str) {
            self.color = str
        },
        setOpacity(float) {
            self.opacity = float
            self.api && self.api.set({opacity: float})
        },
        startOpacity(value, config) {
            self.api.update({opacity: value, config: typeof config !== "undefined" ? config : {...self['config']}})
            return self.api.start()
        },
        setDoubleSide(bool) {
            self.doubleSide = bool
        }
    }))
export default quarkMaterial