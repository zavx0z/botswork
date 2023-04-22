import {types} from "mobx-state-tree"

const dialogProton = types
    .model({
        id: types.identifierNumber,
        name: types.string,
        ownerId: types.number,
    })
export default dialogProton