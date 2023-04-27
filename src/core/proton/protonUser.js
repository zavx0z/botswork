import {types} from "mobx-state-tree"

const protonUser = types
    .model('protonUser', {
        id: types.identifierNumber,
        name: types.string,
    })
const protonsUser = types.model('protonsUser', {user: types.map(protonUser)})
export default protonsUser