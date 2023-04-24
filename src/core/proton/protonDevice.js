import {types} from "mobx-state-tree"

const protonDevice = types
    .model('device', {
        id: types.identifierNumber,
        name: types.string,
        ownerId: types.number,
    })
export default types.model('device', {devices: types.map(protonDevice)})
