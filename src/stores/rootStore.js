import ssoModel from "../features/secure/ssoModel"
import {types} from "mobx-state-tree"
import {sioMiddleware} from "../middleware/sioMiddleware"
import chatModel from "../features/chat/models/chatModel"
import usersModel from "../features/users/models/modelUsers"
import sioModel from "../features/sio/sioModel"

const rootStore = types
    .compose(
        ssoModel,
        sioModel,
        usersModel,
        chatModel,
    )
    .named("root")
    .create({})
export default rootStore

sioMiddleware(rootStore, [
    {
        action: 'sendMessage',
        cb: ({args}) => console.log(args[0])
    }
])
