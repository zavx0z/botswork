import {types} from "mobx-state-tree"

const deviceProton = types
    .model('device', {
        id: types.identifierNumber,
        name: types.string,
        ownerId: types.number,
    })
export default deviceProton