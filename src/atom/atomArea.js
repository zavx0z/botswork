import {flow, getRoot, types} from "mobx-state-tree"
import neutronCanvas from "../core/neutron/canvas/neutronCanvas"
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import {fitObjectToView} from "../shared/utils/fitObjectToView"

const superposition = [{
    particle: 'neutronCanvas',
    action: 'init',
    after: ({particle}) => getRoot(particle)['atom'].area.init()
}]

const atomArea = types
    .model('atomArea', {
        core: types.model({
            canvas: types.safeReference(neutronCanvas),
        }),
        uuid: types.maybeNull(types.string),
        glbPath: types.string,
        paddingX: types.optional(types.number, 0),
    })
    .actions(self => {
        // confusion(getRoot(self), superposition)
        return {
            init: flow(function* () {
                const {glbPath, paddingX, core: {canvas: {camera}}} = self
                let result = yield new GLTFLoader().loadAsync(glbPath)
                let mesh = result.scene.children[0]
                self.uuid = mesh.uuid
                mesh = fitObjectToView(camera, mesh, paddingX)
                window.addEventListener('resize', () => fitObjectToView(camera, self.ObjectTreeJS, paddingX))
                window.addEventListener('orientationchange', () => fitObjectToView(camera, self.ObjectTreeJS, paddingX))
                window.visualViewport.addEventListener('resize', () => fitObjectToView(camera, self.ObjectTreeJS, paddingX))
                return {model: self, gltf: mesh}
            }),
        }
    })
    .views(self => ({
        get ObjectTreeJS() {
            return self['core'].canvas.scene.getObjectByProperty('uuid', self['uuid'])
        },
    }))
export default atomArea