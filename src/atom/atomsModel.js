import {applyPatch, onPatch, resolvePath, types} from "mobx-state-tree"
import {matchPath} from "react-router-dom"
import dialogProton from "../proton/dialogProton"
import {messageProtons, userProtons} from "../proton/protonsModel"

const coreProton = types
    .model({
        dialog: types.safeReference(dialogProton),
        users: types.safeReference(userProtons),
        messages: types.safeReference(messageProtons),
    })

const senderElectron = types
    .model({
        id: types.identifierNumber,
        name: types.string,

    })

const messageElectron = types
    .model({
        id: types.identifierNumber,
        text: types.string,
        sender: senderElectron
    })

export const supportAtom = types
    .model('support', {
        core: types.maybe(coreProton),
        messages: types.array(messageElectron),
    })

export const interEntanglement = store => onPatch(store, snapshot => {
    let match

    match = matchPath('/proton/dialog/:id', snapshot.path)
    if (match && snapshot.value.name === 'support') {
        const item = resolvePath(store, match.pathname)
        applyPatch(store, {op: 'replace', path: '/atom/support', value: {core: {dialog: item}}})
    }

})