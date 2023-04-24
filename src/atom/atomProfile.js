import {applyPatch, onAction, onPatch, types} from "mobx-state-tree"
import neutronSSO from "../core/neutron/neutronSSO"
import {matchPath} from "react-router-dom"

export default types
    .model({
        core: types.model({
            sso: types.safeReference(neutronSSO),
        })
    })
    .views(self => ({
        get username() {
            return self['core']?.sso.username
        }
    }))

export const entanglementProfile = quantum => {
    onPatch(quantum, snapshot => {

    })
    onAction(quantum, ({name, path, args}) => {
        if (matchPath('/neutron/sso', path) && name === 'initialize') {
            applyPatch(quantum, {op: 'replace', path: '/atom/profile', value: {core: {sso: quantum.neutron.sso}}})
        }
    }, true)
}