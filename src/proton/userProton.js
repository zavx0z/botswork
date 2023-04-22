import {types} from "mobx-state-tree"

const userProton = types
    .model( {
        id: types.identifierNumber,
        name: types.string,
    })
export default userProton