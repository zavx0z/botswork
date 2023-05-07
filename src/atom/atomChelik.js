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
    .volatile(self => ({
        run: types.frozen(),
    }))
    .actions(self => ({
        init: flow(function* () {
            const {glbPath} = self
            console.log('atomChelik', 'init', glbPath)

            let {animations} = yield new GLTFLoader().loadAsync("/glb/run.glb")
            const animation = animations[0]
            // console.log('atomChelik', 'animation', animation.name, animation)
            self.run = animations

            let result = yield new GLTFLoader().loadAsync(glbPath)
            let object = result.scene.children[0]
            // console.log('atomChelik', 'init', result, animation)

            self.uuid = object.uuid
            // console.log('atomChelik', 'object', object)
            let bone = {}
            let skinnedMesh = []
            object.children.forEach(item => {
                if (item.type === 'Bone')
                    bone = item
                else {
                    item.key = item.uuid
                    skinnedMesh.push(item)
                }
            })
            // bone.scale.set(object.scale.x, object.scale.y, object.scale.z)
            bone.position.setX(10)
            // console.log('atomChelik', 'init', object)
            return self
        }),
    }))
    .views(self => ({
        get ObjectTreeJS() {
            return self['core'].canvas
            .getObjectByProperty('uuid', self['gltf'].uuid)
        },
    }))
export default atomChelik
