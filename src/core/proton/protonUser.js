import {types} from "mobx-state-tree"

const protonUser = types
    .model('protonUser',{
        id: types.identifierNumber,
        name: types.string,
    })
export default types.model({user: types.map(protonUser)})