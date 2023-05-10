import {applyPatch, getRoot, onAction, types} from "mobx-state-tree"
import {matchPath} from "react-router-dom"
import neutronSSO from "../core/neutron/sso/neutronSSO"

export default types
    .model('atomProfile', {
        core: types.model({
            sso: types.safeReference(neutronSSO),
        })
    })
    .views(self => {
        const everything = getRoot(self)
        onAction(everything, ({name, path, args}) => {
            if (matchPath('/neutron/sso', path) && name === 'initialize') {
                applyPatch(everything, {op: 'replace', path: '/atom/profile', value: {core: {sso: everything.neutron.sso}}})
            }
        }, true)
        return {
            get username() {
                return self['core']?.sso.username
            }
        }
    })