import {flow, getRoot, types} from "mobx-state-tree"
import neutronCanvas from "../core/neutron/canvas/neutronCanvas"
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import confusion from "../shared/middleware/confusion"
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
        confusion(getRoot(self), superposition)
        return {
            init: flow(function* () {
                const {glbPath, paddingX, core: {canvas: {scene, camera}}} = self
                let result = yield new GLTFLoader().loadAsync(glbPath)
                let mesh = result.scene.children[0]
                scene.add(fitObjectToView(camera, mesh, paddingX))
                self.uuid = mesh.uuid
                window.addEventListener('resize', () => fitObjectToView(camera, mesh, paddingX))
                window.addEventListener('orientationchange', () => fitObjectToView(camera, mesh, paddingX))
                window.visualViewport.addEventListener('resize', () => fitObjectToView(camera, mesh, paddingX))
            }),
        }
    })
    .views(self => ({
        get ObjectTreeJS() {
            return self['core'].canvas.getObjectByProperty('uuid', self['gltf'].uuid)
        },
    }))
export default atomArea