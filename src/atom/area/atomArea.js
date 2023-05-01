import {types} from "mobx-state-tree"
import neutronCanvas from "../../core/neutron/canvas/neutronCanvas"

const atomArea = types
    .model('atomArea', {
        core: types.model({
            canvas: types.safeReference(neutronCanvas),
        }),
        id: types.maybeNull(types.integer),
        path: types.string,
    })
    .actions(self => ({
        init(id) {
            self.id = id
        }
    }))
    .views(self => ({
        get ObjectTreeJS() {
            const {core, id} = self
            return core.canvas.scene.getObjectById(id)
        }
    }))
export default atomArea