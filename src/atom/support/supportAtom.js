import {types} from "mobx-state-tree"
import dialogProton from "../../core/proton/dialogProton"
import {messageProtons} from "../../core/proton/messageProton"
import {userProtons} from "../../core/proton/userProton"

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
        sender: types.maybeNull(senderElectron),
    })

