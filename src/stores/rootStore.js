import ssoModel from "../shared/secure/ssoModel"
import {types} from "mobx-state-tree"
import dialogsModel from "../shared/chat/models/dialogsModel"
import usersModel from "../shared/users/models/modelUsers"
import sioModel from "../shared/sio/sioModel"
import {interEntanglement, supportAtom} from "../atom/atomsModel"
import {dialogProtons, intraEntanglement, messageProtons, userProtons} from "../proton/protonsModel"

const protons = types.compose(
    userProtons,
    dialogProtons,
    messageProtons,
).named('proton')

const atoms = types
    .model('atom', {
        support: types.maybeNull(supportAtom),
    })

const rootStore = types
    .compose(
        types.model('atom', {atom: atoms}),
        types.model('proton', {proton: protons}),

        ssoModel,
        sioModel,
        usersModel,
        dialogsModel,
    )
    .named("root")
    .create({
        atom: atoms.create({}),
        proton: protons.create({support: {}}),
    })

intraEntanglement(rootStore)
interEntanglement(rootStore)

export default rootStore
