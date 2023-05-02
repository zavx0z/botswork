import {applyPatch, onPatch, resolvePath, types} from "mobx-state-tree"
import {protonDialog} from "../core/proton/protonDialog"
import protonsMessage from "../core/proton/protonMessage"
import protonsUser from "../core/proton/protonUser"
import {matchPath} from "react-router-dom"

export default types
    .model('atomSupport', {
        core: types.model('supportCore', {
            dialog: types.safeReference(protonDialog),
            users: types.safeReference(protonsUser),
            messages: types.safeReference(protonsMessage),
        }),
        messages: types.array(types.model('supportMessages', {
            id: types.identifierNumber,
            text: types.string,
            sender: types.model('supportMessageSender', {
                id: types.identifierNumber,
                name: types.string,
            })
        }))
    })

export const superpositionSupport = everything => onPatch(everything, snapshot => {
    let match
    match = matchPath('/proton/dialog/:id', snapshot.path)
    if (match && snapshot.value.name === 'support') {
        const item = resolvePath(everything, match.pathname)
        applyPatch(everything, {op: 'replace', path: '/atom/support', value: {core: {dialog: item}}})
    }

})