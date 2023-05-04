import {types} from "mobx-state-tree"

const neutronCanvas = types
    .model("neutronCanvas", {
        id: types.optional(types.identifier, "canvas"),
        backgroundColor: types.optional(types.string, '#000000'),
    })
    .volatile(self => ({
        _gl: null,
        glPromise: null,
    }))
    .actions(self => ({
        init(gl) {
            self._gl = gl
        },
        setFrameLoop(status) {
            self._gl && self._gl().set({frameloop: status})
        },
        getVisibleSize(depth) {
            return [0, 0]
        },
        getGl() {
            if (self.glPromise) {
                return self.glPromise
            }
            self.glPromise = new Promise(resolve => {
                const checkForGl = () => {
                    if (self._gl) {
                        resolve(self._gl())
                    } else {
                        setTimeout(checkForGl, 100)
                    }
                }
                checkForGl()
            })
            return self.glPromise
        },
    }))
    .views(self => ({
        get gl() {
            return self._gl ? self._gl().gl : null
        },
        get scene() {
            return self._gl ? self._gl().scene : null
        },
        get viewport() {
            return self._gl ? self._gl().viewport : {width: 16, height: 9}
        },
        get camera() {
            return self._gl ? self._gl().camera : null
        },
    }))

export default neutronCanvas
