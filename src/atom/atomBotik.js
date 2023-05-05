import React from "react"
import {flow, types} from "mobx-state-tree"
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import neutronCanvas from "../core/neutron/canvas/neutronCanvas"

const atomBotik = types
    .model("atomBotik", {
        core: types.model({
            canvas: types.safeReference(neutronCanvas),
        }),
        glbPath: types.string,
        uuid: types.maybeNull(types.string),
    })
    .actions(self => ({
        init: flow(function* () {
            const {glbPath} = self
            console.log('atomBotik', 'init', glbPath)
            let result = yield new GLTFLoader().loadAsync(glbPath)
            console.log('atomBotik', 'init', result)
            let mesh = result.scene.children[0]
            self.uuid = mesh.uuid
            mesh.children.map(m => {
                m.key = m.id
                m.castShadow = true
                m.receiveShadow = true
            })
            mesh.position.setX(-10)
            console.log('atomBotik', 'init', mesh)
            return mesh
        }),
    }))
    .views(self => ({
        get ObjectTreeJS() {
            return self['core'].canvas.getObjectByProperty('uuid', self['gltf'].uuid)
        },
    }))
export default atomBotik
