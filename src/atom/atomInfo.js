import {types} from "mobx-state-tree"

export const atomInfo = types
    .model('atomInfo', {
        path: types.identifier,
        description: types.string
    })

export const atomsInfo = types.map(atomInfo)
