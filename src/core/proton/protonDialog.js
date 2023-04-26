import {types} from "mobx-state-tree"

export const protonDialog = types
    .model('protonDialog', {
        id: types.identifierNumber,
        name: types.string,
        ownerId: types.number,
    })

export default types.model({dialog: types.map(protonDialog)})

