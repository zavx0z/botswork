import React from "react"
import {flow, getRoot, types} from "mobx-state-tree"
import neutronCanvas from "../core/neutron/canvas/neutronCanvas"
import confusion from "../shared/middleware/confusion"
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'

const superposition = [{
    particle: 'neutronCanvas',
    action: 'init',
    after: ({particle}) => getRoot(particle)['atom'].botsWork.init()
}]

const atomBotsWork = types
    .model("atomBotsWork", {
        core: types.model({
            canvas: types.safeReference(neutronCanvas),
        }),
        glbPath: types.string,
        uuid: types.maybeNull(types.string),
    })
    .actions(self => {
        confusion(getRoot(self), superposition)
        return {
            init: flow(function* () {
                const {glbPath, core: {canvas: {scene}}} = self
                let result = yield new GLTFLoader().loadAsync(glbPath)
                let mesh = result.scene.children[0]
                scene.add(mesh)
                self.uuid = mesh.uuid
            }),
        }
    })
    .views(self => ({
        get ObjectTreeJS() {
            return self['core'].canvas.getObjectByProperty('uuid', self['gltf'].uuid)
        },
    }))
export default atomBotsWork
