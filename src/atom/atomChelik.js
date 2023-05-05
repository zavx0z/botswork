import React from "react"
import {flow, types} from "mobx-state-tree"
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import neutronCanvas from "../core/neutron/canvas/neutronCanvas"

const atomChelik = types
    .model("atomChelik", {
        core: types.model({
            canvas: types.safeReference(neutronCanvas),
        }),
        glbPath: types.string,
        uuid: types.maybeNull(types.string),
    })
    .actions(self => ({
        init: flow(function* () {
            const {glbPath} = self
            console.log('atomChelik', 'init', glbPath)
            let result = yield new GLTFLoader().loadAsync(glbPath)
            console.log('atomChelik', 'init', result)
            let group = result.scene
            self.uuid = group.uuid
            let objects = []
            let meshes = []
            group.children.map(m => {
                switch (m.type) {
                    case 'Mesh':
                        meshes.push(m)
                        m.castShadow = true
                        m.receiveShadow = true
                        break
                    case 'Object3D':
                        objects.push(m)
                    default:
                        break
                }
                console.log(m.type)
                m.key = m.id
            })
            group.position.setX(10)
            group.objects = objects
            group.meshes = meshes
            group.scale.set(0.7, 0.7, 0.7)
            console.log('atomChelik', 'init', group)
            return group
        }),
    }))
    .views(self => ({
        get ObjectTreeJS() {
            return self['core'].canvas
            .getObjectByProperty('uuid', self['gltf'].uuid)
        },
    }))
export default atomChelik
