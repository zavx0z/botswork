import React from "react"
import {flow, types} from "mobx-state-tree"
import neutronCanvas from "../core/neutron/canvas/neutronCanvas"
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import {Controller} from "@react-spring/three"

const atomBotsWork = types
    .model("atomBotsWork", {
        core: types.model({
            canvas: types.safeReference(neutronCanvas),
        }),
        glbPath: types.string,
        uuid: types.maybeNull(types.string),
    })

    .actions(self => ({

        init: flow(function* () {
            const {glbPath} = self
            let result = yield new GLTFLoader().loadAsync(glbPath)
            let mesh = result.scene.children[0]
            self.uuid = mesh.uuid
            console.log(self.uuid)
            return mesh
        }),
    }))
    .views(self => ({
        get ObjectTreeJS() {
            const {core, uuid} = self
            return core.canvas.scene.getObjectByProperty('uuid', uuid)
        },
    }))
export default atomBotsWork
