import {types} from 'mobx-state-tree'
import {Dialog} from "./dialogModel"


const User = types
    .model({
        id: types.identifierNumber,
        name: types.string,
    })

const chatModel = types
    .model({
        dialogs: types.array(Dialog),
        users: types.array(User),
        joinedDialog: types.safeReference(Dialog)
    })
    .volatile(self => ({
        sio: undefined,
    }))
    .actions(self => ({
        getDialog(dialog) {
            const {dialogs} = self
            if (parseInt(dialog))
                return dialogs.find(item => item.id === parseInt(dialog))
            else if (typeof dialog == 'string' && dialog.length > 0)
                return dialogs.find(item => item.name === dialog)
        },
        dialogJoin(dialog) {
            return this.getDialog(dialog)
        },
        dialogLeave(dialog) {
            return this.getDialog(dialog)
        }
    }))

export default chatModel