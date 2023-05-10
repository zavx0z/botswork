import {flow, types} from "mobx-state-tree"
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import neutronCanvas from "../core/neutron/canvas/neutronCanvas"
import {degToRad} from "three/src/math/MathUtils"

const atomChelik = types
    .model("atomChelik", {
        core: types.model({
            canvas: types.safeReference(neutronCanvas),
        }),
        glbPath: types.string,
        uuid: types.maybeNull(types.string),
        position: types.optional(types.array(types.number), [10, 0, 0]),
        rotation: types.optional(types.array(types.number), [Math.PI / 2, 0, degToRad(90)]),
        scale: 0.014,
    })
    .volatile(self => ({
        run: types.frozen(),
        bone: types.frozen(),
        skinnedMesh: types.frozen(),
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

            // console.log('atomChelik', 'object', object)
            let bone = {}
            let skinnedMesh = []
            object.children.forEach(item => {
                if (item.type === 'Bone') {
                    self.uuid = bone.uuid
                    bone = item
                } else {
                    item.key = item.uuid
                    skinnedMesh.push(item)
                }
            })
            bone.position.setX(10)
            // console.log('atomChelik', 'init', object)
            self.bone = bone
            self.skinnedMesh = skinnedMesh
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
