import {types} from "mobx-state-tree"
import neutronCanvas from "../../core/neutron/canvas/neutronCanvas"
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'

const loader = new GLTFLoader()

const atomArea = types
    .model('atomArea', {
        core: types.model({
            canvas: types.safeReference(neutronCanvas),
        }),
        path: types.string,
    })
    .volatile(self => ({
        gltf: types.frozen()
    }))
    .actions(self => ({
        setGLTF(gltf) {
            self.gltf = gltf
        },
        afterCreate() {
            loader.load(self['path'], ({scene}) => this.setGLTF(scene.children[0]))
        }
    }))
    .views(self => ({
        get ObjectTreeJS() {
            return self['core'].canvas.getObjectByProperty('uuid', self['gltf'].uuid)
        }
    }))
export default atomArea