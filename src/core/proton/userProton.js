import {types} from "mobx-state-tree"

const userProton = types
    .model( {
        id: types.identifierNumber,
        name: types.string,
    })
export default userProton
export const userProtons = types.model({user: types.map(userProton)})