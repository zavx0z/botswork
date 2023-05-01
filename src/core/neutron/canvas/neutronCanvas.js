import {types} from "mobx-state-tree"

const neutronCanvas = types
    .model('neutronCanvas', {
        id: types.optional(types.identifier, 'canvas'),
    })
    .volatile(self => ({
        _gl: null,
    }))
    .actions(self => ({
        init(gl) {
            self._gl = gl
        },
        setFrameLoop(status) {
            self._gl && self._gl().set({frameloop: status})
        },
        getVisibleSize(depth) {
            // const vFOV = fov * Math.PI / 180
            // const distance = position.z
            // const height = 2 * Math.tan(vFOV / 2) * distance
            // const x = (spaceX * height * aspect) / 2
            // const y = (spaceY * height) / 2
            return [0, 0]
        }
    }))
    .views(self => ({
        get gl() {
            const {_gl} = self
            return _gl ? _gl().gl : null
        },
        get scene() {
            const {_gl} = self
            return _gl ? _gl().scene : null
        },
        get viewport() {
            const {_gl} = self
            return _gl ? _gl().viewport : {width: 16, height: 9}
        },
        get camera() {
            const {_gl} = self
            return _gl ? _gl().camera : null
        }

    }))
export default neutronCanvas