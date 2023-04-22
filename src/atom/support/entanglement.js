import {applyPatch, onPatch, resolvePath} from "mobx-state-tree"
import {matchPath} from "react-router-dom"

export const interEntanglement = store => onPatch(store, snapshot => {
    let match
    match = matchPath('/proton/dialog/:id', snapshot.path)
    if (match && snapshot.value.name === 'support') {
        const item = resolvePath(store, match.pathname)
        applyPatch(store, {op: 'replace', path: '/atom/support', value: {core: {dialog: item}}})
    }

})