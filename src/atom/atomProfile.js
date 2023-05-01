import {applyPatch, onAction, onPatch, types} from "mobx-state-tree"
import {matchPath} from "react-router-dom"
import neutronSSO from "../core/neutron/sso/neutronSSO"

export default types
    .model('atomProfile',{
        core: types.model({
            sso: types.safeReference(neutronSSO),
        })
    })
    .views(self => ({
        get username() {
            return self['core']?.sso.username
        }
    }))

export const entanglementProfile = everything => {
    onPatch(everything, snapshot => {

    })
    onAction(everything, ({name, path, args}) => {
        if (matchPath('/neutron/sso', path) && name === 'initialize') {
            applyPatch(everything, {op: 'replace', path: '/atom/profile', value: {core: {sso: everything.neutron.sso}}})
        }
    }, true)
}